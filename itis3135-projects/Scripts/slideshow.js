/*
 * slideshow.js
 * Interaction 1: Image slideshow for index.html.
 * Clicking prev/next buttons or dot indicators changes the visible slide.
 * Auto-advances every 4 seconds. Timer resets on manual navigation.
 * Author: K Bathily | ITIS 3135 Spring 2026
 */
(function () {
  var INTERVAL_MS = 4000;
  var current = 0;
  var timer = null;

  function init() {
    var slides = document.querySelectorAll('.slideshow-slide');
    var dots = document.querySelectorAll('.slideshow-dot');
    var prevBtn = document.getElementById('slideshow-prev');
    var nextBtn = document.getElementById('slideshow-next');

    if (!slides.length) { return; }

    function show(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle('slideshow-active', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('slideshow-dot-active', i === index);
      });
      current = index;
    }

    function advance() {
      show((current + 1) % slides.length);
    }

    function startTimer() {
      timer = setInterval(advance, INTERVAL_MS);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        show((current - 1 + slides.length) % slides.length);
        resetTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        show((current + 1) % slides.length);
        resetTimer();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        show(i);
        resetTimer();
      });
    });

    show(0);
    startTimer();
  }

  window.addEventListener('load', init);
}());
