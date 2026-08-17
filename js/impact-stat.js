// =========================================================
// Kūkulu ʻIke — Impact stat count-up (index.html only)
// Counts each ".impact-stat-number" up from 0 once it scrolls
// into view, instead of just appearing. Add data-suffix="+" on
// an element to append a "+" after the counted number.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".impact-stat-number");
  if (!elements.length) return;

  var duration = 1500;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(function (el) { observer.observe(el); });
  } else {
    elements.forEach(animateCount);
  }
});
