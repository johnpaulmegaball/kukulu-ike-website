// =========================================================
// Kūkulu ʻIke — "Opportunity of the Month" homepage spotlight
// (index.html only)
// Renders whichever opportunities are flagged "homeFeatured: true"
// in js/opportunities-data.js (loaded before this file). To change
// the spotlight, edit those flags, nothing here needs to change.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("opportunitySpotlightGrid");
  if (!grid || typeof OPPORTUNITIES === "undefined") return;

  var picks = OPPORTUNITIES.filter(function (item) { return item.homeFeatured; });

  picks.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "card opportunity-card";
    card.innerHTML =
      '<div class="opp-card-top">' +
        '<div class="icon-circle"><span class="emoji">' + item.icon + '</span></div>' +
        '<span class="opp-status-badge is-' + item.status + '">' + STATUS_LABELS[item.status] + '</span>' +
      '</div>' +
      '<h3>' + item.name + '</h3>' +
      '<p>' + item.description + '</p>' +
      '<p class="opp-card-deadline"><strong>Deadline:</strong> ' + item.deadline + '</p>' +
      '<a class="btn btn-outline btn-block" href="' + item.href + '" target="_blank" rel="noopener">' +
        TYPE_BUTTON_LABELS[item.type] +
      '</a>';
    grid.appendChild(card);
  });
});
