// =========================================================
// Kūkulu ʻIke — STEM Path Quiz engine (stem-path-quiz.html only)
// Reads questions/domains from js/quiz-data.js (loaded first) and
// handles all the interaction: one question at a time, a progress
// bar, going back to change answers, scoring, and building the
// results screen. No quiz content lives in this file, edit
// quiz-data.js instead.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  var quiz = document.getElementById("stemPathQuiz");
  if (!quiz || typeof QUIZ_QUESTIONS === "undefined" || typeof QUIZ_DOMAINS === "undefined") return;

  var panels = {
    intro: quiz.querySelector('[data-quiz-panel="intro"]'),
    quiz: quiz.querySelector('[data-quiz-panel="quiz"]'),
    results: quiz.querySelector('[data-quiz-panel="results"]')
  };

  var progressFill = document.getElementById("quizProgressFill");
  var progressLabel = document.getElementById("quizProgressLabel");
  var backBtn = document.getElementById("quizBackBtn");
  var questionText = document.getElementById("quizQuestionText");
  var optionsWrap = document.getElementById("quizOptions");

  // answers[i] holds the chosen option object for question i, or
  // null if that question hasn't been answered yet.
  var answers = QUIZ_QUESTIONS.map(function () { return null; });
  var currentIndex = 0;

  function showPanel(name) {
    Object.keys(panels).forEach(function (key) {
      panels[key].hidden = key !== name;
    });
    // The results panel has a lot more to show (score breakdown +
    // up to 8 career cards), so it gets a wider card than the
    // single-question quiz flow.
    quiz.classList.toggle("is-results", name === "results");
  }

  function renderQuestion() {
    var question = QUIZ_QUESTIONS[currentIndex];
    var stepNum = currentIndex + 1;
    var total = QUIZ_QUESTIONS.length;

    progressFill.style.width = ((stepNum - 1) / total * 100) + "%";
    progressLabel.textContent = "Question " + stepNum + " of " + total;
    backBtn.hidden = currentIndex === 0;

    questionText.textContent = question.text;
    optionsWrap.innerHTML = "";

    var selected = answers[currentIndex];

    question.options.forEach(function (option) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "path-quiz-option";
      btn.textContent = option.text;
      if (selected && selected.text === option.text) {
        btn.classList.add("is-selected");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.setAttribute("aria-pressed", "false");
      }

      btn.addEventListener("click", function () {
        answers[currentIndex] = option;
        btn.classList.add("is-selected");

        // Small delay so the student sees their answer highlight
        // before the quiz advances, feels more responsive than an
        // instant jump.
        window.setTimeout(function () {
          if (currentIndex < QUIZ_QUESTIONS.length - 1) {
            currentIndex++;
            renderQuestion();
          } else {
            showResults();
          }
        }, 200);
      });

      optionsWrap.appendChild(btn);
    });

    questionText.focus();
  }

  backBtn.addEventListener("click", function () {
    if (currentIndex === 0) return;
    currentIndex--;
    renderQuestion();
  });

  function scoreDomains() {
    var scores = {};
    Object.keys(QUIZ_DOMAINS).forEach(function (key) { scores[key] = 0; });

    answers.forEach(function (answer) {
      if (answer) scores[answer.domain] += answer.weight;
    });

    return scores;
  }

  // Picks the top domain, plus a close second if the student's
  // answers were fairly split between two areas.
  function topDomains(scores) {
    var ranked = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
    var top = [ranked[0]];
    var topScore = scores[ranked[0]];
    var secondScore = scores[ranked[1]];

    if (secondScore > 0 && secondScore >= topScore * 0.75) {
      top.push(ranked[1]);
    }

    return top;
  }

  function buildCareerCard(path) {
    var card = document.createElement("div");
    card.className = "card path-quiz-career-card";
    card.innerHTML =
      '<div class="icon-circle"><span class="emoji">' + path.icon + '</span></div>' +
      '<h4>' + path.name + '</h4>' +
      '<p>' + path.description + '</p>' +
      '<p class="path-quiz-career-line"><strong>What you’d actually do:</strong> ' + path.dayToDay + '</p>' +
      '<p class="path-quiz-career-line"><strong>In Hawaiʻi:</strong> ' + path.hawaii + '</p>' +
      '<p class="path-quiz-career-line"><strong>Next step with Kūkulu ʻIke:</strong> ' + path.nextStep + '</p>' +
      '<a class="btn btn-outline btn-block" href="opportunities.html?field=' + path.fieldKey + '">See Related Opportunities</a>';
    return card;
  }

  function buildDomainGroup(domainKey) {
    var domain = QUIZ_DOMAINS[domainKey];
    var group = document.createElement("div");
    group.className = "path-quiz-domain-group";

    var heading = document.createElement("div");
    heading.className = "path-quiz-domain-heading";
    heading.innerHTML =
      '<span class="path-quiz-domain-icon" aria-hidden="true">' + domain.icon + '</span>' +
      '<div><h3>' + domain.label + '</h3><p>' + domain.blurb + '</p></div>';
    group.appendChild(heading);

    var grid = document.createElement("div");
    grid.className = "card-grid path-quiz-career-grid";
    domain.paths.forEach(function (path) {
      grid.appendChild(buildCareerCard(path));
    });
    group.appendChild(grid);

    return group;
  }

  function buildBreakdown(scores, topScore) {
    var wrap = document.createElement("div");
    wrap.className = "path-quiz-breakdown";

    var ranked = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; });
    ranked.forEach(function (key) {
      var row = document.createElement("div");
      row.className = "path-quiz-breakdown-row";
      var pct = topScore === 0 ? 0 : Math.round((scores[key] / topScore) * 100);
      row.innerHTML =
        '<span class="path-quiz-breakdown-label">' + QUIZ_DOMAINS[key].icon + ' ' + QUIZ_DOMAINS[key].label + '</span>' +
        '<span class="path-quiz-breakdown-track"><span class="path-quiz-breakdown-fill" style="width:' + pct + '%"></span></span>';
      wrap.appendChild(row);
    });

    return wrap;
  }

  function showResults() {
    progressFill.style.width = "100%";

    var scores = scoreDomains();
    var top = topDomains(scores);
    var topScore = scores[top[0]];

    var summaryEl = document.getElementById("quizResultsSummary");
    if (top.length === 1) {
      summaryEl.textContent = "Your strongest match is " + QUIZ_DOMAINS[top[0]].label + ". Here are specific paths worth exploring.";
    } else {
      summaryEl.textContent = "Your answers were split pretty evenly between " + QUIZ_DOMAINS[top[0]].label +
        " and " + QUIZ_DOMAINS[top[1]].label + ". Here are specific paths in both.";
    }

    var groupsWrap = document.getElementById("quizResultsGroups");
    groupsWrap.innerHTML = "";
    groupsWrap.appendChild(buildBreakdown(scores, topScore));
    top.forEach(function (domainKey) {
      groupsWrap.appendChild(buildDomainGroup(domainKey));
    });

    showPanel("results");
    document.getElementById("quizResultsHeading").focus();
  }

  document.getElementById("quizStartBtn").addEventListener("click", function () {
    showPanel("quiz");
    renderQuestion();
  });

  document.getElementById("quizRetakeBtn").addEventListener("click", function () {
    answers = QUIZ_QUESTIONS.map(function () { return null; });
    currentIndex = 0;
    showPanel("quiz");
    renderQuestion();
  });

  showPanel("intro");
});
