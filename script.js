const customers = {
  "tok90oyf": "ChIJFwoonUGN4TgR7-TSuWfvHSw"
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const placeId = customers[id];

if (!placeId) {
  document.body.innerHTML = "<h2 style='color:white'>Invalid QR ❌</h2>";
  throw new Error("Invalid QR");
}

document.querySelectorAll(".stars span").forEach(star => {
  star.addEventListener("click", () => {

    let rating = Number(star.dataset.rate);

    document.querySelectorAll(".stars span").forEach((s,i)=>{
      s.classList.toggle("active", i < rating);
    });

    if (rating <= 3) {
      document.getElementById("feedbackForm").style.display = "block";
      document.getElementById("goodReviews").style.display = "none";
    }

    if (rating >= 4) {
      document.getElementById("goodReviews").style.display = "block";
      document.getElementById("feedbackForm").style.display = "none";

      setTimeout(()=>{
        window.location.href =
        "https://search.google.com/local/writereview?placeid="+placeId;
      },800);
    }

  });
});

document.addEventListener("click", e=>{
  if(e.target.classList.contains("review-box")){
    navigator.clipboard.writeText(e.target.innerText);
    alert("Copied ✅");
  }
});

document.getElementById("feedbackForm").addEventListener("submit", e=>{
  e.preventDefault();
  document.body.innerHTML="<h2 style='color:white'>Thank You ❤️</h2>";
});
