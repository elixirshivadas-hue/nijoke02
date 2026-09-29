/* =========================================
   NIJOK — CHALLENGE SYSTEM
   STEP D
========================================= */


const challengeData = {

  guess: {
    title: "Guess the Food",
    description: "Identify food from beautiful food images.",
    limit: 10,
    symbol: "◉",
    eyebrow: "GUESS THE FOOD"
  },

  quiz: {
    title: "Food Quiz",
    description: "Test your knowledge about food and culture.",
    limit: 20,
    symbol: "?",
    eyebrow: "FOOD QUIZ"
  },

  match: {
    title: "Match the Pair",
    description: "Match foods with places, ingredients and stories.",
    limit: 5,
    symbol: "✦",
    eyebrow: "MATCH THE PAIR"
  },

  time: {
    title: "Time Challenge",
    description: "Think quickly before the clock runs out.",
    limit: 10,
    symbol: "◷",
    eyebrow: "TIME CHALLENGE"
  },

  puzzle: {
    title: "Puzzle Mode",
    description: "Think, connect and discover something new.",
    limit: 10,
    symbol: "◇",
    eyebrow: "PUZZLE MODE"
  }

};


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY = "nijok_daily_progress";


function getToday() {

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function createEmptyProgress() {

  return {
    date: getToday(),

    guess: 0,
    quiz: 0,
    match: 0,
    time: 0,
    puzzle: 0
  };

}


function getProgress() {

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {

    const fresh = createEmptyProgress();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(fresh)
    );

    return fresh;
  }


  try {

    const progress = JSON.parse(saved);


    if (progress.date !== getToday()) {

      const fresh = createEmptyProgress();

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(fresh)
      );

      return fresh;
    }


    return progress;

  } catch (error) {

    const fresh = createEmptyProgress();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(fresh)
    );

    return fresh;
  }

}


function saveProgress(progress) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(progress)
  );

}


/* =========================================
   PAGE ELEMENTS
========================================= */

const homePage =
  document.getElementById("homePage");

const challengePage =
  document.getElementById("challengePage");

const challengeCards =
  document.querySelectorAll(".challenge-card");

const backButton =
  document.getElementById("backButton");

const startButton =
  document.getElementById("startButton");

const howButton =
  document.getElementById("howButton");

const howModal =
  document.getElementById("howModal");

const closeHow =
  document.getElementById("closeHow");

const modalChallengeButton =
  document.getElementById("modalChallengeButton");

const beginChallengeButton =
  document.getElementById("beginChallengeButton");

const brandHome =
  document.getElementById("brandHome");


/* Challenge elements */

const challengeEyebrow =
  document.getElementById("challengeEyebrow");

const challengeTitle =
  document.getElementById("challengeTitle");

const challengeDescription =
  document.getElementById("challengeDescription");

const challengeLimit =
  document.getElementById("challengeLimit");

const challengeCompleted =
  document.getElementById("challengeCompleted");

const challengeRemaining =
  document.getElementById("challengeRemaining");

const startIcon =
  document.getElementById("startIcon");

const startHeading =
  document.getElementById("startHeading");

const startMessage =
  document.getElementById("startMessage");


/* =========================================
   CURRENT CHALLENGE
========================================= */

let currentChallenge = null;


/* =========================================
   OPEN CHALLENGE
========================================= */

function openChallenge(type) {

  const data = challengeData[type];

  if (!data) {
    return;
  }


  currentChallenge = type;


  challengeEyebrow.textContent =
    data.eyebrow;

  challengeTitle.textContent =
    data.title;

  challengeDescription.textContent =
    data.description;

  challengeLimit.textContent =
    data.limit;

  startIcon.textContent =
    data.symbol;


  updateChallengeProgress();


  homePage.classList.add("hidden");

  challengePage.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateChallengeProgress() {

  if (!currentChallenge) {
    return;
  }


  const data =
    challengeData[currentChallenge];

  const progress =
    getProgress();

  const completed =
    Math.min(
      progress[currentChallenge] || 0,
      data.limit
    );

  const remaining =
    Math.max(
      data.limit - completed,
      0
    );


  challengeCompleted.textContent =
    completed;

  challengeRemaining.textContent =
    remaining;


  if (remaining <= 0) {

    startHeading.textContent =
      "Today's challenge is complete!";

    startMessage.textContent =
      "Come back tomorrow for a new daily challenge.";

    beginChallengeButton.textContent =
      "Completed Today";

    beginChallengeButton.disabled =
      true;

  } else {

    startHeading.textContent =
      "Ready to play?";

    startMessage.textContent =
      `${remaining} challenge ${remaining === 1 ? "question" : "questions"} remaining today.`;

    beginChallengeButton.textContent =
      "Start Challenge →";

    beginChallengeButton.disabled =
      false;

  }

}


/* =========================================
   CHALLENGE CARDS
========================================= */

challengeCards.forEach(card => {

  card.addEventListener("click", () => {

    const type =
      card.dataset.challenge;

    openChallenge(type);

  });

});


/* =========================================
   START EXPLORING
========================================= */

startButton.addEventListener(
  "click",
  () => {

    document
      .getElementById("challenges")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);


/* =========================================
   HOW IT WORKS
========================================= */

howButton.addEventListener(
  "click",
  () => {

    howModal.classList.remove("hidden");

  }
);


closeHow.addEventListener(
  "click",
  () => {

    howModal.classList.add("hidden");

  }
);


howModal.addEventListener(
  "click",
  event => {

    if (event.target === howModal) {

      howModal.classList.add("hidden");

    }

  }
);


modalChallengeButton.addEventListener(
  "click",
  () => {

    howModal.classList.add("hidden");

    document
      .getElementById("challenges")
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);


/* =========================================
   BACK TO CHALLENGES
========================================= */

backButton.addEventListener(
  "click",
  () => {

    challengePage.classList.add("hidden");

    homePage.classList.remove("hidden");

    setTimeout(() => {

      document
        .getElementById("challenges")
        .scrollIntoView({
          behavior: "smooth"
        });

    }, 50);

  }
);


/* =========================================
   BEGIN CHALLENGE
========================================= */

beginChallengeButton.addEventListener(
  "click",
  () => {

    if (!currentChallenge) {
      return;
    }


    const progress =
      getProgress();

    const limit =
      challengeData[currentChallenge].limit;


    if (
      progress[currentChallenge] >= limit
    ) {
      return;
    }


    /*
      QUESTION ENGINE WILL BE CONNECTED
      IN THE NEXT STEP.

      For now this safely prepares
      the challenge session.
    */

    sessionStorage.setItem(
      "nijok_active_challenge",
      currentChallenge
    );


    startMessage.textContent =
      "Challenge session ready. Questions will load in the next stage.";

  }
);


/* =========================================
   BRAND HOME
========================================= */

brandHome.addEventListener(
  "click",
  event => {

    event.preventDefault();

    challengePage.classList.add("hidden");

    homePage.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================================
   INITIAL STATE
========================================= */

getProgress();


console.log(
  "NIJOK Challenge System loaded."
);
