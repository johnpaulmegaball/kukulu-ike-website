// =========================================================
// Kūkulu ʻIke — Opportunity Explorer (opportunities.html only)
// Renders every opportunity in js/opportunities-data.js into the
// grid, then wires up the search box, the five filter chip rows,
// and the reset button. Everything runs client-side, no backend.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("opportunityGrid");
  var emptyMessage = document.getElementById("opportunitiesEmpty");
  var countLabel = document.getElementById("opportunityCount");
  var searchInput = document.getElementById("opportunitySearch");
  var resetBtn = document.getElementById("opportunityResetBtn");

  if (!grid || typeof OPPORTUNITIES === "undefined") return;

  function buildCard(item) {
    var card = document.createElement("div");
    card.className = "card opportunity-card";
    card.setAttribute("data-type", item.type);
    card.setAttribute("data-fields", item.fields.join(","));
    card.setAttribute("data-grade", item.grades.join(","));
    card.setAttribute("data-location", item.location);
    card.setAttribute("data-cost", item.cost);
    card.setAttribute("data-season", item.season);
    card.setAttribute("data-status", item.status);

    var fieldTags = item.fields.map(function (f) { return FIELD_LABELS[f]; }).join(", ");

    card.innerHTML =
      '<div class="opp-card-top">' +
        '<div class="icon-circle"><span class="emoji">' + item.icon + '</span></div>' +
        '<span class="opp-status-badge is-' + item.status + '">' + STATUS_LABELS[item.status] + '</span>' +
      '</div>' +
      '<h3>' + item.name + '</h3>' +
      '<div class="opp-card-tags">' +
        '<span class="opp-tag">' + gradeRangeLabel(item.grades) + '</span>' +
        '<span class="opp-tag">' + TYPE_LABELS[item.type] + '</span>' +
        '<span class="opp-tag">' + fieldTags + '</span>' +
        '<span class="opp-tag">' + LOCATION_LABELS[item.location] + '</span>' +
        '<span class="opp-tag">' + COST_LABELS[item.cost] + '</span>' +
        '<span class="opp-tag">' + SEASON_LABELS[item.season] + '</span>' +
      '</div>' +
      '<p>' + item.description + '</p>' +
      '<p class="opp-card-deadline"><strong>Deadline:</strong> ' + item.deadline + '</p>' +
      '<a class="btn btn-outline btn-block" href="' + item.href + '" target="_blank" rel="noopener">' +
        TYPE_BUTTON_LABELS[item.type] +
      '</a>';

    return card;
  }

  // ---- Render every opportunity, pairing each DOM card with its data
  // so filtering/search can check the data directly instead of
  // re-reading it back out of the DOM. ----
  var entries = OPPORTUNITIES.map(function (item) {
    var el = buildCard(item);
    grid.appendChild(el);
    return { el: el, data: item };
  });

  // ---- Build the "Field of interest" chip row from whichever fields
  // are actually used, so it never lists an empty category. ----
  var fieldRow = document.getElementById("fieldFilterChips");
  var usedFields = [];
  Object.keys(FIELD_LABELS).forEach(function (key) {
    var isUsed = OPPORTUNITIES.some(function (item) { return item.fields.indexOf(key) !== -1; });
    if (isUsed) usedFields.push(key);
  });
  usedFields.forEach(function (key) {
    var chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.setAttribute("aria-pressed", "false");
    chip.setAttribute("data-filter-row", "field");
    chip.setAttribute("data-value", key);
    chip.textContent = FIELD_LABELS[key];
    fieldRow.appendChild(chip);
  });

  // ---- Filter state ----
  var active = { type: "all", field: "all", grade: "all", location: "all", cost: "all", season: "all" };
  var searchTerm = "";

  var filterRows = {
    type: document.getElementById("typeFilterChips"),
    field: fieldRow,
    grade: document.getElementById("gradeFilterChips"),
    location: document.getElementById("locationFilterChips"),
    cost: document.getElementById("costFilterChips"),
    season: document.getElementById("seasonFilterChips")
  };

  function setActiveChip(row, clickedChip) {
    row.querySelectorAll(".filter-chip").forEach(function (chip) {
      var isActive = chip === clickedChip;
      chip.classList.toggle("active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function matchesSearch(item) {
    if (!searchTerm) return true;
    var haystack = (item.name + " " + item.description).toLowerCase();
    return haystack.indexOf(searchTerm) !== -1;
  }

  function applyFilters() {
    var visibleCount = 0;

    entries.forEach(function (entry) {
      var item = entry.data;
      var show =
        (active.type === "all" || item.type === active.type) &&
        (active.field === "all" || item.fields.indexOf(active.field) !== -1) &&
        (active.grade === "all" || item.grades.indexOf(active.grade) !== -1) &&
        (active.location === "all" || item.location === active.location) &&
        (active.cost === "all" || item.cost === active.cost) &&
        (active.season === "all" || item.season === active.season) &&
        matchesSearch(item);

      entry.el.classList.toggle("is-hidden", !show);
      if (show) visibleCount++;
    });

    if (emptyMessage) emptyMessage.classList.toggle("show", visibleCount === 0);
    if (countLabel) {
      countLabel.textContent = "Showing " + visibleCount + " " +
        (visibleCount === 1 ? "opportunity" : "opportunities");
    }
  }

  function handleRowClick(row, key) {
    if (!row) return;
    row.addEventListener("click", function (event) {
      var chip = event.target.closest(".filter-chip");
      if (!chip || !row.contains(chip)) return;
      setActiveChip(row, chip);
      active[key] = chip.getAttribute("data-value");
      applyFilters();
    });
  }

  Object.keys(filterRows).forEach(function (key) { handleRowClick(filterRows[key], key); });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      active = { type: "all", field: "all", grade: "all", location: "all", cost: "all", season: "all" };
      searchTerm = "";
      if (searchInput) searchInput.value = "";
      Object.keys(filterRows).forEach(function (key) {
        var row = filterRows[key];
        if (!row) return;
        var allChip = row.querySelector('.filter-chip[data-value="all"]');
        if (allChip) setActiveChip(row, allChip);
      });
      applyFilters();
    });
  }

  // If we arrived here from a link like opportunities.html?field=robotics
  // (e.g. from the STEM Path Quiz results), pre-select that field chip.
  var urlField = new URLSearchParams(window.location.search).get("field");
  if (urlField) {
    var matchingChip = fieldRow.querySelector('.filter-chip[data-value="' + urlField + '"]');
    if (matchingChip) {
      setActiveChip(fieldRow, matchingChip);
      active.field = urlField;
    }
  }

  applyFilters();
});
