// =========================================================
// Kūkulu ʻIke — Roadmap accordion (roadmap.html only)
// Click a stage to expand it; only one stage is open at a time.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var list = document.getElementById("roadmapList");
  if (!list) return;

  var items = Array.prototype.slice.call(list.querySelectorAll(".roadmap-item"));

  function openItem(target) {
    items.forEach(function (item) {
      var toggle = item.querySelector(".roadmap-toggle");
      var details = item.querySelector(".roadmap-details");
      var isTarget = item === target;

      item.classList.toggle("is-active", isTarget);
      toggle.setAttribute("aria-expanded", isTarget ? "true" : "false");
      details.hidden = !isTarget;
    });
  }

  items.forEach(function (item) {
    var toggle = item.querySelector(".roadmap-toggle");
    toggle.addEventListener("click", function () {
      openItem(item);
    });
  });
});
