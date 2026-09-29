/* =========================================================
   NIJOK — GAME ENGINE FOUNDATION
   Step 3
   ========================================================= */

"use strict";

/* =========================================================
   NIJOK SETTINGS
========================================================= */

const NIJOK = {
  days: 100,

  limits: {
    quiz: 20,
    guess: 10,
    match: 5,
    time: 10,
    puzzle: 10
  },

  score: {
    quiz: 10,
    guess: 10,
    match: 15,
    time: 20,
    puzzle: 15
  }
};


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "nijokPlayer";

const defaultPlayer = {
  name: "Guest Explorer",
  email: "",

  totalScore: 0,
  gamesPlayed: 0,
  correctAnswers: 0,

  level: 1,
  streak: 0,

  today: {
    date: "",
    quiz: 0,
    guess: 0,
    match: 0,
    time: 0,
    puzzle: 0
  }
};


function loadPlayer() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredClone(defaultPlayer);
    }

    const player = JSON.parse(saved);

    return {
      ...structuredClone(defaultPlayer),
      ...player,
      today: {
        ...structuredClone(defaultPlayer.today),
        ...(player.today || {})
      }
    };

  } catch (error) {

    console.error("NIJOK storage error:", error);

    return structuredClone(defaultPlayer);
  }
}


let player = loadPlayer();


function savePlayer() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(player)
  );
}


/* =========================================================
   DATE SYSTEM
========================================================= */

function getTodayKey() {

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function resetDailyProgressIfNeeded() {

  const today = getTodayKey();

  if (player.today.date !== today) {

    player.today = {
      date: today,
      quiz: 0,
      guess: 0,
      match: 0,
      time: 0,
      puzzle: 0
    };

    savePlayer();
  }
}


/* =========================================================
   ELEMENTS
========================================================= */

const gameOverlay =
  document.getElementById("gameOverlay");

const closeGameButton =
  document.getElementById("closeGame");

const gameModeLabel =
  document.getElementById("gameModeLabel");

const gameTitle =
  document.getElementById("gameTitle");

const gameDescription =
  document.getElementById("gameDescription");

const gameQuestion =
  document.getElementById("gameQuestion");

const gameAnswers =
  document.getElementById("gameAnswers");

const nextQuestion =
  document.getElementById("nextQuestion");

const profileButton =
  document.getElementById("profileButton");

const loginModal =
  document.getElementById("loginModal");

const closeModal =
  document.querySelector(".close-modal");

const loginButton =
  document.getElementById("loginButton");

const loginName =
  document.getElementById("loginName");

const loginEmail =
  document.getElementById("loginEmail");

const commentInput =
  document.getElementById("commentInput");

const commentButton =
  document.getElementById("commentButton");

const commentsList =
  document.getElementById("commentsList");


/* =========================================================
   GAME STATE
========================================================= */

const gameState = {
  active: false,
  mode: "",
  questionNumber: 0,
  score: 0,
  answered: false
};


/* =========================================================
   GAME INFORMATION
========================================================= */

const gameInfo = {

  quiz: {
    label: "FOOD QUIZ",
    title: "Food Quiz",
    description:
      "Test your knowledge about food, ingredients, culture and traditions."
  },

  guess: {
    label: "GUESS THE FOOD",
    title: "Guess the Food",
    description:
      "Look carefully and identify the food."
  },

  match: {
    label: "MATCH THE PAIR",
    title: "Match the Pair",
    description:
      "Connect the correct food with its matching pair."
  },

  time: {
    label: "TIME CHALLENGE",
    title: "Time Challenge",
    description:
      "Think fast. Answer quickly. Score more."
  },

  puzzle: {
    label: "FOOD PUZZLE",
    title: "Food Puzzle",
    description:
      "Solve the puzzle and discover the answer."
  },

  daily: {
    label: "DAILY CHALLENGE",
    title: "Today's Food Challenge",
    description:
      "A fresh food question for today."
  }
};


/* =========================================================
   SAMPLE QUESTIONS
   FOUNDATION ONLY
   ========================================================= */

const sampleQuestions = {

  quiz: [
    {
      question: "Which fruit is traditionally associated with Kashmir?",
      answers: [
        "Apple",
        "Banana",
        "Pineapple",
        "Papaya"
      ],
      correct: 0
    },

    {
      question: "Which ingredient gives turmeric its yellow colour?",
      answers: [
        "Curcumin",
        "Caffeine",
        "Lycopene",
        "Pectin"
      ],
      correct: 0
    },

    {
      question: "Which grain is commonly used to make idli?",
      answers: [
        "Rice",
        "Corn",
        "Barley",
        "Oats"
      ],
      correct: 0
    }
  ],


  guess: [
    {
      question: "🍛 Which food is shown?",
      answers: [
        "Biryani",
        "Pizza",
        "Sushi",
        "Pasta"
      ],
      correct: 0
    },

    {
      question: "🥭 Which fruit is this?",
      answers: [
        "Mango",
        "Apple",
        "Orange",
        "Pear"
      ],
      correct: 0
    }
  ],


  match: [
    {
      question: "Match the food with its famous association.",
      answers: [
        "Darjeeling — Tea",
        "Kashmir — Coconut",
        "Kerala — Saffron",
        "Punjab — Sushi"
      ],
      correct: 0
    }
  ],


  time: [
    {
      question: "Which one is a spice?",
      answers: [
        "Turmeric",
        "Apple",
        "Rice",
        "Milk"
      ],
      correct: 0
    },

    {
      question: "Which one is a fruit?",
      answers: [
        "Mango",
        "Salt",
        "Rice",
        "Lentil"
      ],
      correct: 0
    }
  ],


  puzzle: [
    {
      question:
        "I am yellow, often used in curries and known as a spice. What am I?",
      answers: [
        "Turmeric",
        "Sugar",
        "Rice",
        "Tea"
      ],
      correct: 0
    }
  ],


  daily: [
    {
      question:
        "Which country is traditionally associated with sushi?",
      answers: [
        "Japan",
        "India",
        "Mexico",
        "Italy"
      ],
      correct: 0
    }
  ]

};


/* =========================================================
   OPEN GAME
========================================================= */

function openGame(mode) {

  resetDailyProgressIfNeeded();

  if (!gameInfo[mode]) {
    console.warn("Unknown NIJOK game:", mode);
    return;
  }

  const limit = getDailyLimit(mode);

  if (mode !== "daily" && getPlayedToday(mode) >= limit) {

    showLimitMessage(mode, limit);

    return;
  }

  gameState.active = true;
  gameState.mode = mode;
  gameState.questionNumber = 0;
  gameState.score = 0;
  gameState.answered = false;

  const info = gameInfo[mode];

  gameModeLabel.textContent = info.label;
  gameTitle.textContent = info.title;
  gameDescription.textContent = info.description;

  gameOverlay.classList.add("active");
  gameOverlay.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  showQuestion();
}


/* =========================================================
   CLOSE GAME
========================================================= */

function closeGame() {

  gameState.active = false;

  gameOverlay.classList.remove("active");
  gameOverlay.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  updateDashboard();
}


if (closeGameButton) {
  closeGameButton.addEventListener(
    "click",
    closeGame
  );
}


if (gameOverlay) {

  gameOverlay.addEventListener(
    "click",
    function(event) {

      if (event.target === gameOverlay) {
        closeGame();
      }

    }
  );
}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

  const mode = gameState.mode;

  const questions =
    sampleQuestions[mode] || [];

  if (!questions.length) {
    showComingSoon();
    return;
  }

  const question =
    questions[
      gameState.questionNumber %
      questions.length
    ];

  gameState.answered = false;

  gameQuestion.innerHTML = `
    <div class="question-number">
      Question ${gameState.questionNumber + 1}
    </div>

    <h3>
      ${escapeHTML(question.question)}
    </h3>
  `;

  gameAnswers.innerHTML = "";

  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className = "answer-button";

      button.textContent = answer;

      button.addEventListener(
        "click",
        function() {

          selectAnswer(
            button,
            index,
            question.correct
          );

        }
      );

      gameAnswers.appendChild(button);

    }
  );

  nextQuestion.style.display = "none";
}


/* =========================================================
   ANSWER
========================================================= */

function selectAnswer(
  button,
  selectedIndex,
  correctIndex
) {

  if (gameState.answered) {
    return;
  }

  gameState.answered = true;

  const buttons =
    gameAnswers.querySelectorAll(
      ".answer-button"
    );

  buttons.forEach(
    (item, index) => {

      item.disabled = true;

      if (index === correctIndex) {
        item.classList.add("correct");
      }

    }
  );


  if (selectedIndex === correctIndex) {

    button.classList.add("correct");

    gameState.score +=
      NIJOK.score[
        gameState.mode
      ] || 10;

    player.correctAnswers++;

  } else {

    button.classList.add("wrong");

  }


  player.gamesPlayed++;

  increaseDailyCount(
    gameState.mode
  );

  savePlayer();

  nextQuestion.style.display =
    "inline-flex";

  nextQuestion.textContent =
    "Next Question →";

  updateDashboard();
}


/* =========================================================
   NEXT QUESTION
========================================================= */

if (nextQuestion) {

  nextQuestion.addEventListener(
    "click",
    function() {

      gameState.questionNumber++;

      showQuestion();

    }
  );

}


/* =========================================================
   CHALLENGE BUTTONS
========================================================= */

document
  .querySelectorAll("[data-game]")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        function() {

          const mode =
            button.dataset.game;

          openGame(mode);

        }
      );

    }
  );


/* =========================================================
   DAILY LIMIT HELPERS
========================================================= */

function getDailyLimit(mode) {

  return (
    NIJOK.limits[mode] ||
    1
  );

}


function getPlayedToday(mode) {

  if (mode === "daily") {
    return 0;
  }

  return player.today[mode] || 0;

}


function increaseDailyCount(mode) {

  if (
    mode === "daily" ||
    !player.today.hasOwnProperty(mode)
  ) {
    return;
  }

  player.today[mode]++;

  savePlayer();

}


/* =========================================================
   LIMIT MESSAGE
========================================================= */

function showLimitMessage(
  mode,
  limit
) {

  const info =
    gameInfo[mode];

  gameModeLabel.textContent =
    info.label;

  gameTitle.textContent =
    "Today's Limit Reached";

  gameDescription.textContent =
    `You have completed ${limit} ${info.title} challenges for today. Come back tomorrow for fresh challenges.`;

  gameQuestion.innerHTML = `
    <div class="limit-message">
      🌿 Great job, Food Explorer!
      <br><br>
      Your daily limit is complete.
    </div>
  `;

  gameAnswers.innerHTML = "";

  nextQuestion.style.display =
    "none";

  gameOverlay.classList.add("active");

  gameOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";
}


/* =========================================================
   COMING SOON
========================================================= */

function showComingSoon() {

  gameQuestion.innerHTML = `
    <div class="limit-message">
      🚧
      <br><br>
      This challenge is being prepared.
    </div>
  `;

  gameAnswers.innerHTML = "";

  nextQuestion.style.display =
    "none";
}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

  const totalScore =
    document.getElementById(
      "totalScore"
    );

  const gamesPlayed =
    document.getElementById(
      "gamesPlayed"
    );

  const correctAnswers =
    document.getElementById(
      "correctAnswers"
    );

  const userLevel =
    document.getElementById(
      "userLevel"
    );

  const profileName =
    document.getElementById(
      "profileName"
    );

  const badgesEarned =
    document.getElementById(
      "badgesEarned"
    );


  if (totalScore) {
    totalScore.textContent =
      player.totalScore;
  }

  if (gamesPlayed) {
    gamesPlayed.textContent =
      player.gamesPlayed;
  }

  if (correctAnswers) {
    correctAnswers.textContent =
      player.correctAnswers;
  }

  if (userLevel) {
    userLevel.textContent =
      calculateLevel(
        player.totalScore
      );
  }

  if (profileName) {
    profileName.textContent =
      player.name;
  }

  if (badgesEarned) {

    badgesEarned.textContent =
      calculateBadges(
        player.totalScore
      );

  }

}


/* =========================================================
   LEVEL SYSTEM
========================================================= */

function calculateLevel(score) {

  return Math.max(
    1,
    Math.floor(score / 100) + 1
  );

}


/* =========================================================
   BADGE SYSTEM FOUNDATION
========================================================= */

function calculateBadges(score) {

  if (score >= 1000) {
    return 5;
  }

  if (score >= 500) {
    return 4;
  }

  if (score >= 250) {
    return 3;
  }

  if (score >= 100) {
    return 2;
  }

  if (score >= 50) {
    return 1;
  }

  return 0;
}


/* =========================================================
   PROFILE / LOGIN
========================================================= */

function openLogin() {

  if (!loginModal) {
    return;
  }

  loginModal.classList.add("active");

  loginModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeLogin() {

  if (!loginModal) {
    return;
  }

  loginModal.classList.remove(
    "active"
  );

  loginModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


if (profileButton) {

  profileButton.addEventListener(
    "click",
    openLogin
  );

}


if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeLogin
  );

}


if (loginModal) {

  loginModal.addEventListener(
    "click",
    function(event) {

      if (
        event.target === loginModal
      ) {
        closeLogin();
      }

    }
  );

}


/* =========================================================
   CREATE ACCOUNT — LOCAL FOUNDATION
========================================================= */

if (loginButton) {

  loginButton.addEventListener(
    "click",
    function() {

      const name =
        loginName.value.trim();

      const email =
        loginEmail.value.trim();

      if (!name) {

        alert(
          "Please enter your name."
        );

        return;
      }

      player.name =
        name;

      player.email =
        email;

      savePlayer();

      updateDashboard();

      closeLogin();

      alert(
        `Welcome to NIJOK, ${name}! 🌿`
      );

    }
  );

}


/* =========================================================
   COMMUNITY COMMENTS
========================================================= */

if (commentButton) {

  commentButton.addEventListener(
    "click",
    addComment
  );

}


function addComment() {

  if (!commentInput) {
    return;
  }

  const text =
    commentInput.value.trim();

  if (!text) {

    alert(
      "Write something first."
    );

    return;
  }


  const card =
    document.createElement("div");

  card.className =
    "comment-card";


  const avatar =
    document.createElement("div");

  avatar.className =
    "comment-avatar";

  avatar.textContent =
    "🌿";


  const content =
    document.createElement("div");


  const name =
    document.createElement("strong");

  name.textContent =
    player.name;


  const message =
    document.createElement("span");

  message.textContent =
    text;


  content.appendChild(name);

  content.appendChild(message);

  card.appendChild(avatar);

  card.appendChild(content);

  commentsList.prepend(card);

  commentInput.value = "";

}


/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const now =
    new Date();

  const tomorrow =
    new Date();

  tomorrow.setDate(
    now.getDate() + 1
  );

  tomorrow.setHours(
    0,
    0,
    0,
    0
  );

  const difference =
    tomorrow - now;


  const hours =
    Math.floor(
      difference /
      (1000 * 60 * 60)
    );

  const minutes =
    Math.floor(
      (difference %
        (1000 * 60 * 60)) /
      (1000 * 60)
    );

  const seconds =
    Math.floor(
      (difference %
        (1000 * 60)) /
      1000
    );


  const hoursElement =
    document.getElementById(
      "hours"
    );

  const minutesElement =
    document.getElementById(
      "minutes"
    );

  const secondsElement =
    document.getElementById(
      "seconds"
    );


  if (hoursElement) {

    hoursElement.textContent =
      String(hours).padStart(
        2,
        "0"
      );

  }

  if (minutesElement) {

    minutesElement.textContent =
      String(minutes).padStart(
        2,
        "0"
      );

  }

  if (secondsElement) {

    secondsElement.textContent =
      String(seconds).padStart(
        2,
        "0"
      );

  }

}


setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   HTML SAFETY
========================================================= */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      if (
        gameOverlay &&
        gameOverlay.classList.contains(
          "active"
        )
      ) {

        closeGame();

      }

      if (
        loginModal &&
        loginModal.classList.contains(
          "active"
        )
      ) {

        closeLogin();

      }

    }

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

resetDailyProgressIfNeeded();

updateDashboard();

updateCountdown();

console.log(
  "NIJOK Game Engine loaded successfully 🌿"
);
