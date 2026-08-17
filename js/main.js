// =========================================================
// Kūkulu ʻIke — Site Scripts
// Three small jobs:
//   1. Toggle the mobile menu open/closed
//   2. Highlight the current page in the nav
//   3. Submit forms to Formspree in the background (no page
//      reload) and show a "thanks!" message on success
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---- 1. Mobile menu toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close the menu after a link is tapped (nice on mobile)
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- 2. Highlight current page in nav ----
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // ---- 3. Form submission (sends to Formspree) ----
  // Submits via fetch so the page doesn't reload and our own
  // "thanks!" message can show in place. If the request fails for
  // any reason (offline, Formspree down, etc.), we fall back to a
  // normal form submission so the visitor's message still goes
  // through instead of silently disappearing.
  document.querySelectorAll("form[data-ajax-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var successBox = form.querySelector(".form-success");
      var submitBtn = form.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            if (successBox) {
              successBox.classList.add("show");
              successBox.setAttribute("tabindex", "-1");
              successBox.focus();
            }
            form.reset();
          } else {
            form.submit();
          }
        })
        .catch(function () {
          form.submit();
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });
});
