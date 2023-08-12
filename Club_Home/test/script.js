let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

function showSlide(n) {
  if (n < 0) {
    currentSlide = slides.length - 1;
  } else if (n >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = n;
  }

  slides.forEach(slide => slide.style.opacity = 0);
  slides[currentSlide].style.opacity = 1;
  updateIndicators();
}

function changeSlide(n) {
  showSlide(currentSlide + n);
}

function updateIndicators() {
  indicators.forEach(indicator => indicator.textContent = "○");
  indicators[currentSlide].textContent = "●";
}

function autoSlide() {
  changeSlide(1);
}

// 5초마다 자동 슬라이드 실행
setInterval(autoSlide, 5000);

showSlide(currentSlide);
