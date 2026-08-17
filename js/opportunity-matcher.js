// =========================================================
// Kūkulu ʻIke — Opportunity Matcher quiz (opportunities.html only)
// A 3-question guided quiz that reads the same data-type / data-fields
// tags the chip filters use, plus a data-grade tag on each card, and
// shows matching cards. It never touches the chip filters' own state —
// it reads the cards independently and renders its own results.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var matcher = document.getElementById("opportunityMatcher");
  var grid = document.getElementById("opportunityGrid");
  if (!matcher || !grid || typeof FIELD_LABELS === "undefined") return;

  // FIELD_LABELS and FIELD_ICONS come from js/opportunities-data.js,
  // loaded before this file, they're the same lists opportunities.js
  // uses to build the field filter chips.
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".opportunity-card"));

  function tagsOf(card, attr) {
    return (card.getAttribute(attr) || "")
      .split(",")
      .map(function (t) { return t.trim(); })
      .filter(Boolean);
  }

  function cardFields(card) { return tagsOf(card, "data-fields"); }
  function cardGrades(card) { return tagsOf(card, "data-grade"); }

  // Build the "What are you into?" options from whichever fields are
  // actually present on the cards — same approach as the field filter.
  var fieldOptionsContainer = document.getElementById("matcherFieldOptions");
  var usedFields = [];
  Object.keys(FIELD_LABELS).forEach(function (key) {
    if (cards.some(function (card) { return cardFields(card).indexOf(key) !== -1; })) {
      usedFields.push(key);
    }
  });

  usedFields.forEach(function (key) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "matcher-option";
    btn.setAttribute("data-value", key);
    btn.setAttribute("aria-pressed", "false");

    var icon = document.createElement("span");
    icon.className = "matcher-option-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = FIELD_ICONS[key] || "🔬";
    btn.appendChild(icon);

    var label = document.createElement("span");
    label.textContent = FIELD_LABELS[key];
    btn.appendChild(label);

    fieldOptionsContainer.appendChild(btn);
  });

  var state = { grade: null, fields: [], type: null };
  var stepLabel = document.getElementById("matcherStepLabel");

  function showStep(step) {
    matcher.querySelectorAll(".matcher-step").forEach(function (el) {
      el.hidden = el.getAttribute("data-step") !== String(step);
    });

    matcher.querySelectorAll(".matcher-progress-dot").forEach(function (dot) {
      var dotStep = Number(dot.getAttribute("data-step"));
      var isDone = step === "results" || dotStep < step;
      dot.classList.toggle("is-current", step !== "results" && dotStep === step);
      dot.classList.toggle("is-done", isDone);
    });

    stepLabel.textContent = step === "results" ? "Your matches" : "Step " + step + " of 3";

    if (step !== "results") {
      var heading = matcher.querySelector('.matcher-step[data-step="' + step + '"] h3');
      if (heading) heading.setAttribute("tabindex", "-1");
    }
  }

  // ---- Step 1: grade (single-select, auto-advance) ----
  matcher.querySelectorAll('.matcher-step[data-step="1"] .matcher-option').forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.grade = btn.getAttribute("data-value");
      showStep(2);
    });
  });

  // ---- Step 2: field of interest (multi-select + continue) ----
  fieldOptionsContainer.addEventListener("click", function (event) {
    var btn = event.target.closest(".matcher-option");
    if (!btn) return;
    var value = btn.getAttribute("data-value");
    var isSelected = btn.classList.toggle("is-selected");
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");

    if (isSelected) {
      state.fields.push(value);
    } else {
      state.fields = state.fields.filter(function (f) { return f !== value; });
    }
  });

  document.getElementById("matcherFieldContinue").addEventListener("click", function () {
    showStep(3);
  });

  // ---- Step 3: type (single-select, auto-advance to results) ----
  matcher.querySelectorAll('.matcher-step[data-step="3"] .matcher-option').forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.type = btn.getAttribute("data-value");
      showResults();
    });
  });

  // ---- Back buttons ----
  matcher.querySelectorAll(".matcher-back").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var step = Number(btn.closest(".matcher-step").getAttribute("data-step"));
      showStep(step - 1);
    });
  });

  function computeMatches(useGrade, useType, useField) {
    return cards.filter(function (card) {
      var gradeOk = !useGrade || cardGrades(card).indexOf(state.grade) !== -1;
      var typeOk = !useType || card.getAttribute("data-type") === state.type;
      var fieldOk = !useField || state.fields.length === 0 ||
        state.fields.some(function (f) { return cardFields(card).indexOf(f) !== -1; });
      return gradeOk && typeOk && fieldOk;
    });
  }

  function showResults() {
    var matches = computeMatches(true, true, true);
    var note = "Based on your answers, here’s what we found.";

    if (matches.length === 0) {
      matches = computeMatches(true, true, false);
      note = "No exact matches for your interests, but these fit your grade and what you’re looking for.";
    }
    if (matches.length === 0) {
      matches = computeMatches(true, false, false);
      note = "Nothing matched exactly, but here’s what other students in your grade have tried.";
    }
    if (matches.length === 0) {
      matches = cards.slice(0, 3);
      note = "We couldn’t find a close match, here are a few opportunities to explore instead.";
    }

    var resultsGrid = document.getElementById("matcherResultsGrid");
    resultsGrid.innerHTML = "";

    matches.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.classList.remove("is-hidden");
      resultsGrid.appendChild(clone);
    });

    document.getElementById("matcherResultsNote").textContent = note;
    showStep("results");
  }

  // ---- Start over ----
  document.getElementById("matcherRestart").addEventListener("click", function () {
    state = { grade: null, fields: [], type: null };
    matcher.querySelectorAll(".matcher-option.is-selected").forEach(function (btn) {
      btn.classList.remove("is-selected");
      btn.setAttribute("aria-pressed", "false");
    });
    showStep(1);
  });

  showStep(1);
});
