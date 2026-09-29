"use strict";

/* =========================================================
   NIJOK — CLEAN GAME ENGINE
   Version 3.0
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURATION
--------------------------------------------------------- */

const NIJOK = {
  limits: {
    guess: 10,
    quiz: 20,
    match: 5,
    time: 10,
    daily: 1
  },

  points: {
    guess: 10,
    quiz: 10,
    match: 15,
    time: 20,
    daily: 20
  },

  timeLimit: 15,

  storageKey: "nijokPlayer"
};


/* ---------------------------------------------------------
   2. PLAYER
--------------------------------------------------------- */

const defaultPlayer = {
  name: "",
  email: "",
  loggedIn: false,

  totalScore: 0,
  gamesPlayed: 0,
  correctAnswers: 0,

  level: 1,
  streak: 0,

  today: {
    date: "",
    guess: 0,
    quiz: 0,
    match: 0,
    time: 0,
    daily: 0
  }
};


let player = loadPlayer();


/* ---------------------------------------------------------
   3. STORAGE
--------------------------------------------------------- */

function loadPlayer() {
  try {
    const saved =
      localStorage.getItem(
        NIJOK.storageKey
      );

    if (!saved) {
      return createFreshPlayer();
    }

    const data =
      JSON.parse(saved);

    return {
      ...defaultPlayer,
      ...data,
      today: {
        ...defaultPlayer.today,
        ...(data.today || {})
      }
    };

  } catch (error) {

    console.error(
      "NIJOK player loading error:",
      error
    );

    return createFreshPlayer();
  }
}


function createFreshPlayer() {

  return {
    ...defaultPlayer,

    today: {
      ...defaultPlayer.today
    }
  };
}


function savePlayer() {

  try {

    localStorage.setItem(
      NIJOK.storageKey,
      JSON.stringify(player)
    );

  } catch (error) {

    console.error(
      "NIJOK player save error:",
      error
    );

  }
}


/* ---------------------------------------------------------
   4. DAILY RESET
--------------------------------------------------------- */

function getTodayKey() {

  const date =
    new Date();

  return [
    date.getFullYear(),
    String(
      date.getMonth() + 1
    ).padStart(2, "0"),
    String(
      date.getDate()
    ).padStart(2, "0")
  ].join("-");

}


function checkDailyReset() {

  const today =
    getTodayKey();


  if (
    player.today.date !==
    today
  ) {

    player.today = {
      date: today,
      guess: 0,
      quiz: 0,
      match: 0,
      time: 0,
      daily: 0
    };

    savePlayer();

  }

}


/* ---------------------------------------------------------
   5. QUESTION BANK
--------------------------------------------------------- */

const QUESTION_BANK = {

  quiz: [

    {
      question:
        "Which nutrient is mainly responsible for building and repairing body tissues?",
      answers: [
        "Protein",
        "Sugar",
        "Water",
        "Salt"
      ],
      correct: 0
    },

    {
      question:
        "Which of these is naturally rich in vitamin C?",
      answers: [
        "Orange",
        "White rice",
        "Butter",
        "Salt"
      ],
      correct: 0
    },

    {
      question:
        "What does the ingredient list on packaged food show?",
      answers: [
        "Ingredients used in the product",
        "Only the price",
        "Only the brand name",
        "Only the expiry date"
      ],
      correct: 0
    },

    {
      question:
        "Which nutrient provides the most energy per gram?",
      answers: [
        "Fat",
        "Protein",
        "Water",
        "Minerals"
      ],
      correct: 0
    },

    {
      question:
        "Which of these is a whole grain?",
      answers: [
        "Brown rice",
        "Refined sugar",
        "Table salt",
        "Butter"
      ],
      correct: 0
    },

    {
      question:
        "What does the expiry date generally tell a consumer?",
      answers: [
        "The date after which the product should not be consumed",
        "The manufacturing cost",
        "The shop opening time",
        "The brand's age"
      ],
      correct: 0
    },

    {
      question:
        "Which mineral is commonly associated with strong bones and teeth?",
      answers: [
        "Calcium",
        "Sodium",
        "Sugar",
        "Caffeine"
      ],
      correct: 0
    },

    {
      question:
        "Which of these is a source of dietary fibre?",
      answers: [
        "Fruits and vegetables",
        "Refined oil",
        "Table salt",
        "Plain sugar"
      ],
      correct: 0
    },

    {
      question:
        "What does 'per 100 g' on a nutrition label help you do?",
      answers: [
        "Compare nutritional values between foods",
        "Find the shop location",
        "Find the brand owner",
        "Know the package colour"
      ],
      correct: 0
    },

    {
      question:
        "Which ingredient is a common source of sweetness in packaged foods?",
      answers: [
        "Sugar",
        "Water",
        "Fibre",
        "Calcium"
      ],
      correct: 0
    },

    {
      question:
        "Which macronutrient is found in foods such as rice, potatoes and grains?",
      answers: [
        "Carbohydrate",
        "Vitamin C",
        "Calcium",
        "Water"
      ],
      correct: 0
    },

    {
      question:
        "Which of these is a fermented food?",
      answers: [
        "Curd",
        "Table salt",
        "Refined sugar",
        "Cooking oil"
      ],
      correct: 0
    },

    {
      question:
        "What is sodium commonly found in?",
      answers: [
        "Salt",
        "Fruit fibre",
        "Vitamin C",
        "Water"
      ],
      correct: 0
    },

    {
      question:
        "Which food is generally a source of plant protein?",
      answers: [
        "Lentils",
        "Table sugar",
        "Salt",
        "Cooking oil"
      ],
      correct: 0
    },

    {
      question:
        "What should you check when buying packaged food?",
      answers: [
        "Ingredients, nutrition information and dates",
        "Only the package colour",
        "Only the logo",
        "Only the advertisement"
      ],
      correct: 0
    },

    {
      question:
        "Which of these contains naturally occurring dietary fibre?",
      answers: [
        "Apple",
        "Refined oil",
        "Salt",
        "Sugar"
      ],
      correct: 0
    },

    {
      question:
        "Which nutrient is essential for normal body functions but provides no calories?",
      answers: [
        "Vitamins",
        "Fat",
        "Carbohydrate",
        "Protein"
      ],
      correct: 0
    },

    {
      question:
        "Why is reading a food label useful?",
      answers: [
        "It helps you understand what you are buying",
        "It guarantees the food is perfect for everyone",
        "It tells you how popular the brand is",
        "It replaces all other food information"
      ],
      correct: 0
    },

    {
      question:
        "Which of these is a natural source of healthy fats?",
      answers: [
        "Nuts",
        "Table sugar",
        "Salt",
        "Soft drink"
      ],
      correct: 0
    },

    {
      question:
        "What is the main purpose of a nutrition information panel?",
      answers: [
        "To provide information about nutrients in the food",
        "To advertise another product",
        "To show the shop address only",
        "To show the brand history"
      ],
      correct: 0
    }

  ],


  guess: [

    {
      question:
        "I am yellow, curved and commonly eaten as a fruit. What am I?",
      answers: [
        "Banana",
        "Apple",
        "Carrot",
        "Coconut"
      ],
      correct: 0
    },

    {
      question:
        "I am a round red fruit often used in salads and cooking. What am I?",
      answers: [
        "Tomato",
        "Banana",
        "Rice",
        "Lentil"
      ],
      correct: 0
    },

    {
      question:
        "I am made from tea leaves and hot water. What am I?",
      answers: [
        "Tea",
        "Curd",
        "Rice",
        "Dal"
      ],
      correct: 0
    },

    {
      question:
        "I am a staple grain eaten across India and often cooked with water. What am I?",
      answers: [
        "Rice",
        "Apple",
        "Milk",
        "Almond"
      ],
      correct: 0
    },

    {
      question:
        "I am made by grinding wheat and am commonly used to make roti. What am I?",
      answers: [
        "Wheat flour",
        "Tea",
        "Sugar",
        "Salt"
      ],
      correct: 0
    },

    {
      question:
        "I am a green leafy vegetable often cooked as a sabzi. What am I?",
      answers: [
        "Spinach",
        "Banana",
        "Rice",
        "Sugar"
      ],
      correct: 0
    },

    {
      question:
        "I am small, brown or green and often used in dal. What am I?",
      answers: [
        "Lentil",
        "Orange",
        "Butter",
        "Salt"
      ],
      correct: 0
    },

    {
      question:
        "I am a tropical fruit with a hard shell and water inside. What am I?",
      answers: [
        "Coconut",
        "Apple",
        "Potato",
        "Carrot"
      ],
      correct: 0
    },

    {
      question:
        "I am orange and crunchy and commonly eaten raw or cooked. What am I?",
      answers: [
        "Carrot",
        "Rice",
        "Curd",
        "Tea"
      ],
      correct: 0
    },

    {
      question:
        "I am made from milk and commonly eaten with meals in India. What am I?",
      answers: [
        "Curd",
        "Sugar",
        "Rice",
        "Salt"
      ],
      correct: 0
    }

  ],


  match: [

    {
      question:
        "Match the food with its category.",
      left: "Apple",
      answers: [
        "Fruit",
        "Grain",
        "Pulse",
        "Spice"
      ],
      correct: 0
    },

    {
      question:
        "Match the food with its category.",
      left: "Rice",
      answers: [
        "Fruit",
        "Grain",
        "Dairy",
        "Nut"
      ],
      correct: 1
    },

    {
      question:
        "Match the food with its category.",
      left: "Lentil",
      answers: [
        "Pulse",
        "Fruit",
        "Oil",
        "Dairy"
      ],
      correct: 0
    },

    {
      question:
        "Match the food with its category.",
      left: "Curd",
      answers: [
        "Grain",
        "Dairy",
        "Fruit",
        "Spice"
      ],
      correct: 1
    },

    {
      question:
        "Match the food with its category.",
      left: "Almond",
      answers: [
        "Fruit",
        "Grain",
        "Nut",
        "Pulse"
      ],
      correct: 2
    }

  ],


  time: [

    {
      question:
        "Which nutrient is mainly used for building and repairing tissues?",
      answers: [
        "Protein",
        "Salt",
        "Water",
        "Sugar"
      ],
      correct: 0
    },

    {
      question:
        "Which food is commonly a source of vitamin C?",
      answers: [
        "Orange",
        "Butter",
        "Salt",
        "Rice"
      ],
      correct: 0
    },

    {
      question:
        "Which is a whole grain?",
      answers: [
        "Brown rice",
        "Sugar",
        "Salt",
        "Oil"
      ],
      correct: 0
    },

    {
      question:
        "Which food is a source of plant protein?",
      answers: [
        "Lentils",
        "Sugar",
        "Salt",
        "Water"
      ],
      correct: 0
    },

    {
      question:
        "Which nutrient provides the most energy per gram?",
      answers: [
        "Fat",
        "Water",
        "Vitamin C",
        "Minerals"
      ],
      correct: 0
    },

    {
      question:
        "What should you read to know what is inside a packaged food?",
      answers: [
        "Ingredient list",
        "Logo only",
        "Advertisement only",
        "Package colour"
      ],
      correct: 0
    },

    {
      question:
        "Which is a source of dietary fibre?",
      answers: [
        "Vegetables",
        "Salt",
        "Oil",
        "Sugar"
      ],
      correct: 0
    },

    {
      question:
        "Which mineral is important for bones and teeth?",
      answers: [
        "Calcium",
        "Sugar",
        "Caffeine",
        "Sodium"
      ],
      correct: 0
    },

    {
      question:
        "What can 'per 100 g' help you do?",
      answers: [
        "Compare foods",
        "Find a shop",
        "Find the manufacturer",
        "Know the package size only"
      ],
      correct: 0
    },

    {
      question:
        "Which food is fermented?",
      answers: [
        "Curd",
        "Salt",
        "Sugar",
        "Oil"
      ],
      correct: 0
    }

  ],


  daily: [

    {
      question:
        "NIJOK Daily Challenge: What is the first thing you should do when you want to understand a packaged food?",
      answers: [
        "Read the label",
        "Choose the brightest package",
        "Follow an advertisement",
        "Ignore the ingredients"
      ],
      correct: 0
    }

  ]

};


/* ---------------------------------------------------------
   6. GAME INFORMATION
--------------------------------------------------------- */

const GAME_INFO = {

  guess: {
    label: "GUESS THE FOOD",
    title: "Guess the Food",
    description:
      "Read the clues and identify the food."
  },

  quiz: {
    label: "FOOD QUIZ",
    title: "Food Quiz",
    description:
      "Test what you know about food and labels."
  },

  match: {
    label: "MATCH THE PAIR",
    title: "Match the Pair",
    description:
      "Connect the food with the right answer."
  },

  time: {
    label: "TIME CHALLENGE",
    title: "Time Challenge",
    description:
      "Answer before the clock runs out."
  },

  daily: {
    label: "DAILY CHALLENGE",
    title: "Today's Challenge",
    description:
      "One new food question every day."
  }

};


/* ---------------------------------------------------------
   7. DOM ELEMENTS
--------------------------------------------------------- */

const gameOverlay =
  document.getElementById(
    "gameOverlay"
  );

const closeGameButton =
  document.getElementById(
    "closeGame"
  );

const gameModeLabel =
  document.getElementById(
    "gameModeLabel"
  );

const gameTitle =
  document.getElementById(
    "gameTitle"
  );

const gameDescription =
  document.getElementById(
    "gameDescription"
  );

const gameQuestion =
  document.getElementById(
    "gameQuestion"
  );

const gameAnswers =
  document.getElementById(
    "gameAnswers"
  );

const nextQuestion =
  document.getElementById(
    "nextQuestion"
  );


/* ---------------------------------------------------------
   8. LOGIN DOM
--------------------------------------------------------- */

const loginModal =
  document.getElementById(
    "loginModal"
  );

const closeLoginButton =
  loginModal
    ? loginModal.querySelector(
        ".close-modal"
      )
    : null;

const loginName =
  document.getElementById(
    "loginName"
  );

const loginEmail =
  document.getElementById(
    "loginEmail"
  );

const loginButton =
  document.getElementById(
    "loginButton"
  );


/* ---------------------------------------------------------
   9. GAME STATE
--------------------------------------------------------- */

const gameState = {

  active: false,

  mode: "",

  questions: [],

  current: 0,

  score: 0,

  correct: 0,

  answered: false,

  timer: null,

  timeLeft: 0,

  gameCompleted: false

};


/* ---------------------------------------------------------
   10. UTILITY
--------------------------------------------------------- */

function shuffle(array) {

  const copy =
    [...array];


  for (
    let i =
      copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }


  return copy;

}


function clearTimer() {

  if (
    gameState.timer
  ) {

    clearInterval(
      gameState.timer
    );

    gameState.timer =
      null;

  }

}


/* ---------------------------------------------------------
   11. LIMIT SYSTEM
--------------------------------------------------------- */

function getPlayedToday(
  mode
) {

  checkDailyReset();

  return (
    player.today[mode] ||
    0
  );

}


function canPlay(
  mode
) {

  return (
    getPlayedToday(mode) <
    NIJOK.limits[mode]
  );

}


function increaseDailyCount(
  mode
) {

  checkDailyReset();

  player.today[mode] =
    (
      player.today[mode] ||
      0
    ) + 1;

}


/* ---------------------------------------------------------
   12. OPEN GAME
--------------------------------------------------------- */

function openGame(
  mode
) {

  checkDailyReset();


  if (
    !GAME_INFO[mode]
  ) {

    return;

  }


  if (
    !canPlay(mode)
  ) {

    showLimitScreen(
      mode
    );

    return;

  }


  const bank =
    QUESTION_BANK[mode];


  if (
    !bank ||
    !bank.length
  ) {

    return;

  }


  const limit =
    Math.min(
      NIJOK.limits[mode],
      bank.length
    );


  gameState.active =
    true;

  gameState.mode =
    mode;

  gameState.questions =
    shuffle(bank)
      .slice(
        0,
        limit
      );

  gameState.current =
    0;

  gameState.score =
    0;

  gameState.correct =
    0;

  gameState.answered =
    false;

  gameState.gameCompleted =
    false;


  showGameOverlay();

  showQuestion();

}


/* ---------------------------------------------------------
   13. SHOW GAME OVERLAY
--------------------------------------------------------- */

function showGameOverlay() {

  if (!gameOverlay) {

    return;

  }


  gameOverlay.classList.add(
    "active"
  );


  gameOverlay.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
    These inline properties make the overlay
    work even if the CSS active-state is missing.
  */

  gameOverlay.style.display =
    "flex";


  document.body.style.overflow =
    "hidden";

}


/* ---------------------------------------------------------
   14. CLOSE GAME
--------------------------------------------------------- */

function closeGame() {

  clearTimer();


  gameState.active =
    false;

  gameState.gameCompleted =
    false;


  if (gameOverlay) {

    gameOverlay.classList.remove(
      "active"
    );

    gameOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    gameOverlay.style.display =
      "";

  }


  document.body.style.overflow =
    "";

}


/* ---------------------------------------------------------
   15. SHOW QUESTION
--------------------------------------------------------- */

function showQuestion() {

  clearTimer();


  if (
    !gameState.active
  ) {

    return;

  }


  const question =
    gameState.questions[
      gameState.current
    ];


  if (!question) {

    finishGame();

    return;

  }


  gameState.answered =
    false;


  const info =
    GAME_INFO[
      gameState.mode
    ];


  if (gameModeLabel) {

    gameModeLabel.textContent =
      info.label;

  }


  if (gameTitle) {

    gameTitle.textContent =
      info.title;

  }


  if (gameDescription) {

    gameDescription.textContent =
      info.description;

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "none";

  }


  const total =
    gameState.questions.length;


  const number =
    gameState.current + 1;


  let questionHTML = `

    <div class="nijok-question-count">

      Question ${number} of ${total}

    </div>

    <div class="nijok-question-text">

      ${escapeHTML(
        question.question
      )}

    </div>

  `;


  if (
    gameState.mode ===
    "match"
  ) {

    questionHTML += `

      <div class="nijok-match-food">

        ${escapeHTML(
          question.left
        )}

      </div>

    `;

  }


  if (gameQuestion) {

    gameQuestion.innerHTML =
      questionHTML;

  }


  if (gameAnswers) {

    gameAnswers.innerHTML =
      "";

  }


  question.answers
    .forEach(
      (
        answer,
        index
      ) => {

        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.className =
          "answer-button";


        button.textContent =
          answer;


        button.dataset.index =
          index;


        button.addEventListener(
          "click",
          () => {

            answerQuestion(
              index
            );

          }
        );


        if (gameAnswers) {

          gameAnswers.appendChild(
            button
          );

        }

      }
    );


  if (
    gameState.mode ===
    "time"
  ) {

    startTimer();

  }

}


/* ---------------------------------------------------------
   16. ANSWER QUESTION
--------------------------------------------------------- */

function answerQuestion(
  selectedIndex
) {

  if (
    gameState.answered ||
    !gameState.active
  ) {

    return;

  }


  const question =
    gameState.questions[
      gameState.current
    ];


  if (!question) {

    return;

  }


  gameState.answered =
    true;


  clearTimer();


  const buttons =
    gameAnswers
      ? gameAnswers.querySelectorAll(
          ".answer-button"
        )
      : [];


  buttons.forEach(
    button => {

      button.disabled =
        true;


      const index =
        Number(
          button.dataset.index
        );


      if (
        index ===
        question.correct
      ) {

        button.classList.add(
          "correct"
        );

      }


      if (
        index ===
        selectedIndex &&
        index !==
        question.correct
      ) {

        button.classList.add(
          "wrong"
        );

      }

    }
  );


  const isCorrect =
    selectedIndex ===
    question.correct;


  if (isCorrect) {

    gameState.correct++;

    gameState.score +=
      NIJOK.points[
        gameState.mode
      ];

  }


  showAnswerFeedback(
    isCorrect
  );


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      gameState.current <
      gameState.questions.length - 1
        ? "Next Question →"
        : "See Result →";

  }

}


/* ---------------------------------------------------------
   17. ANSWER FEEDBACK
--------------------------------------------------------- */

function showAnswerFeedback(
  correct
) {

  if (!gameQuestion) {

    return;

  }


  const feedback =
    document.createElement(
      "div"
    );


  feedback.className =
    correct
      ? "nijok-feedback correct"
      : "nijok-feedback wrong";


  feedback.textContent =
    correct
      ? "✓ Correct!"
      : "✕ Not quite — the highlighted answer is correct.";


  gameQuestion.appendChild(
    feedback
  );

}


/* ---------------------------------------------------------
   18. NEXT QUESTION
--------------------------------------------------------- */

function goToNextQuestion() {

  if (
    !gameState.active
  ) {

    return;

  }


  if (
    !gameState.answered
  ) {

    return;

  }


  if (
    gameState.current <
    gameState.questions.length - 1
  ) {

    gameState.current++;

    showQuestion();

  } else {

    finishGame();

  }

}


/* ---------------------------------------------------------
   19. FINISH GAME
--------------------------------------------------------- */

function finishGame() {

  clearTimer();


  if (
    gameState.gameCompleted
  ) {

    return;

  }


  gameState.gameCompleted =
    true;


  increaseDailyCount(
    gameState.mode
  );


  player.totalScore +=
    gameState.score;


  player.correctAnswers +=
    gameState.correct;


  player.gamesPlayed++;


  updateLevel();


  updateStreak();


  savePlayer();

  updateDashboard();


  showResults();

}


/* ---------------------------------------------------------
   20. RESULT SCREEN
--------------------------------------------------------- */

function showResults() {

  const total =
    gameState.questions.length;


  const percentage =
    total
      ? Math.round(
          (
            gameState.correct /
            total
          ) * 100
        )
      : 0;


  if (gameModeLabel) {

    gameModeLabel.textContent =
      "CHALLENGE COMPLETE";

  }


  if (gameTitle) {

    gameTitle.textContent =
      getResultTitle(
        percentage
      );

  }


  if (gameDescription) {

    gameDescription.textContent =
      "Your Food Journey is growing.";

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="nijok-result">

        <div class="nijok-result-score">

          ${gameState.score}

        </div>

        <div class="nijok-result-label">

          POINTS

        </div>

        <div class="nijok-result-details">

          ${gameState.correct}
          / ${total}
          correct

          <br>

          ${percentage}% accuracy

        </div>

      </div>

    `;

  }


  if (gameAnswers) {

    gameAnswers.innerHTML = `

      <div class="nijok-result-extra">

        🌿 Level ${player.level}

        <br><br>

        Total Score:
        ${player.totalScore}

        <br><br>

        Current Streak:
        ${player.streak} day${
          player.streak === 1
            ? ""
            : "s"
        }

      </div>

    `;

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      "Play Again →";


    nextQuestion.onclick =
      () => {

        const mode =
          gameState.mode;

        closeGame();

        openGame(mode);

      };

  }

}


/* ---------------------------------------------------------
   21. RESULT TITLE
--------------------------------------------------------- */

function getResultTitle(
  percentage
) {

  if (
    percentage === 100
  ) {

    return "Perfect! 🌟";

  }


  if (
    percentage >= 80
  ) {

    return "Excellent! 🌿";

  }


  if (
    percentage >= 60
  ) {

    return "Great Work! 👏";

  }


  if (
    percentage >= 40
  ) {

    return "Keep Learning! 📚";

  }


  return "Every Question Counts! 🌱";

}


/* ---------------------------------------------------------
   22. LIMIT SCREEN
--------------------------------------------------------- */

function showLimitScreen(
  mode
) {

  const info =
    GAME_INFO[mode];


  if (gameModeLabel) {

    gameModeLabel.textContent =
      info.label;

  }


  if (gameTitle) {

    gameTitle.textContent =
      "Today's Limit Reached";

  }


  if (gameDescription) {

    gameDescription.textContent =
      "Come back tomorrow for a fresh challenge.";

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="nijok-limit">

        🌙

        <br><br>

        You have completed today's

        <strong>
          ${info.title}
        </strong>

        challenge limit.

        <br><br>

        New challenges will be
        available tomorrow.

      </div>

    `;

  }


  if (gameAnswers) {

    gameAnswers.innerHTML =
      "";

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      "Close →";

    nextQuestion.onclick =
      closeGame;

  }


  showGameOverlay();

}


/* ---------------------------------------------------------
   23. TIMER
--------------------------------------------------------- */

function startTimer() {

  gameState.timeLeft =
    NIJOK.timeLimit;


  updateTimerDisplay();


  gameState.timer =
    setInterval(
      () => {

        gameState.timeLeft--;

        updateTimerDisplay();


        if (
          gameState.timeLeft <=
          0
        ) {

          clearTimer();

          if (
            !gameState.answered
          ) {

            answerQuestion(
              -1
            );

          }

        }

      },
      1000
    );

}


function updateTimerDisplay() {

  if (!gameQuestion) {

    return;

  }


  let timer =
    gameQuestion.querySelector(
      ".nijok-timer"
    );


  if (!timer) {

    timer =
      document.createElement(
        "div"
      );

    timer.className =
      "nijok-timer";


    gameQuestion.prepend(
      timer
    );

  }


  timer.textContent =
    `⏱ ${gameState.timeLeft}s`;

}


/* ---------------------------------------------------------
   24. STREAK
--------------------------------------------------------- */

function updateStreak() {

  const lastDate =
    localStorage.getItem(
      "nijokLastCompletedDate"
    );


  const today =
    getTodayKey();


  if (
    lastDate ===
    today
  ) {

    return;

  }


  if (lastDate) {

    const previous =
      new Date(
        lastDate
      );

    const current =
      new Date(
        today
      );


    const difference =
      Math.round(
        (
          current -
          previous
        ) /
        86400000
      );


    if (
      difference ===
      1
    ) {

      player.streak++;

    } else {

      player.streak =
        1;

    }

  } else {

    player.streak =
      1;

  }


  localStorage.setItem(
    "nijokLastCompletedDate",
    today
  );

}


/* ---------------------------------------------------------
   25. LEVEL
--------------------------------------------------------- */

function updateLevel() {

  player.level =
    Math.floor(
      player.totalScore /
      100
    ) + 1;

}


/* ---------------------------------------------------------
   26. BADGES
--------------------------------------------------------- */

function getBadges() {

  const badges = [];


  if (
    player.gamesPlayed >=
    1
  ) {

    badges.push(
      "First Step"
    );

  }


  if (
    player.correctAnswers >=
    10
  ) {

    badges.push(
      "Food Learner"
    );

  }


  if (
    player.totalScore >=
    100
  ) {

    badges.push(
      "Food Explorer"
    );

  }


  if (
    player.streak >=
    7
  ) {

    badges.push(
      "7 Day Streak"
    );

  }


  if (
    player.totalScore >=
    500
  ) {

    badges.push(
      "Knowledge Builder"
    );

  }


  return badges;

}


/* ---------------------------------------------------------
   27. LOGIN
--------------------------------------------------------- */

function openLogin() {

  if (!loginModal) {

    return;

  }


  loginModal.classList.add(
    "active"
  );


  loginModal.setAttribute(
    "aria-hidden",
    "false"
  );


  loginModal.style.display =
    "flex";


  document.body.style.overflow =
    "hidden";


  if (loginName) {

    loginName.value =
      player.name || "";

  }


  if (loginEmail) {

    loginEmail.value =
      player.email || "";

  }

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


  loginModal.style.display =
    "";


  document.body.style.overflow =
    "";

}


function createAccount() {

  const name =
    loginName
      ? loginName.value.trim()
      : "";


  const email =
    loginEmail
      ? loginEmail.value.trim()
      : "";


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

  player.loggedIn =
    true;


  savePlayer();

  updateDashboard();

  closeLogin();


  alert(
    `Welcome to NIJOK, ${player.name}! 🌿`
  );

}


/* ---------------------------------------------------------
   28. PROFILE
--------------------------------------------------------- */

function showProfile() {

  if (
    !player.loggedIn
  ) {

    openLogin();

    return;

  }


  clearTimer();


  if (gameModeLabel) {

    gameModeLabel.textContent =
      "FOOD EXPLORER";

  }


  if (gameTitle) {

    gameTitle.textContent =
      player.name;

  }


  if (gameDescription) {

    gameDescription.textContent =
      "Your NIJOK Food Journey";

  }


  const badges =
    getBadges();


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="nijok-profile">

        <strong>
          Level ${player.level}
        </strong>

        <br><br>

        Score:
        ${player.totalScore}

        <br><br>

        Games:
        ${player.gamesPlayed}

        <br><br>

        Correct Answers:
        ${player.correctAnswers}

        <br><br>

        Streak:
        ${player.streak} days

        <br><br>

        Badges:
        ${
          badges.length
            ? badges.join(" • ")
            : "Keep exploring 🌱"
        }

      </div>

    `;

  }


  if (gameAnswers) {

    gameAnswers.innerHTML =
      "";

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      "Close →";

    nextQuestion.onclick =
      closeGame;

  }


  showGameOverlay();

}


/* ---------------------------------------------------------
   29. DASHBOARD
--------------------------------------------------------- */

function updateDashboard() {

  updateLevel();


  const possibleIds = {

    score: [
      "totalScore",
      "scoreValue",
      "dashboardScore"
    ],

    games: [
      "gamesPlayed",
      "gamesValue"
    ],

    correct: [
      "correctAnswers",
      "correctValue"
    ],

    level: [
      "userLevel",
      "levelValue"
    ],

    streak: [
      "streakValue",
      "currentStreak"
    ],

    name: [
      "profileName",
      "userName"
    ],

    badges: [
      "badgesEarned",
      "badgeCount"
    ]

  };


  setText(
    possibleIds.score,
    player.totalScore
  );

  setText(
    possibleIds.games,
    player.gamesPlayed
  );

  setText(
    possibleIds.correct,
    player.correctAnswers
  );

  setText(
    possibleIds.level,
    player.level
  );

  setText(
    possibleIds.streak,
    player.streak
  );

  setText(
    possibleIds.name,
    player.name ||
    "Food Explorer"
  );

  setText(
    possibleIds.badges,
    getBadges().length
  );


  updateProfileButtons();

}


function setText(
  ids,
  value
) {

  ids.forEach(
    id => {

      const element =
        document.getElementById(
          id
        );


      if (element) {

        element.textContent =
          value;

      }

    }
  );

}


/* ---------------------------------------------------------
   30. PROFILE BUTTONS
--------------------------------------------------------- */

function updateProfileButtons() {

  const buttons =
    document.querySelectorAll(
      "[data-login], [data-profile], #profileBtn, #profileButton"
    );


  buttons.forEach(
    button => {

      if (
        player.loggedIn
      ) {

        button.textContent =
          player.name;

      } else {

        button.textContent =
          "Login";

      }

    }
  );

}


/* ---------------------------------------------------------
   31. GAME BUTTONS
--------------------------------------------------------- */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-game]"
      );


    if (!button) {

      return;

    }


    event.preventDefault();


    const mode =
      button.dataset.game;


    if (
      mode ===
      "food"
    ) {

      openGame(
        "quiz"
      );

      return;

    }


    openGame(
      mode
    );

  }
);


/* ---------------------------------------------------------
   32. CLOSE GAME
--------------------------------------------------------- */

if (closeGameButton) {

  closeGameButton.addEventListener(
    "click",
    closeGame
  );

}


/* ---------------------------------------------------------
   33. NEXT QUESTION
--------------------------------------------------------- */

if (nextQuestion) {

  nextQuestion.addEventListener(
    "click",
    () => {

      if (
        nextQuestion.onclick
      ) {

        return;

      }


      goToNextQuestion();

    }
  );

}


/* ---------------------------------------------------------
   34. LOGIN EVENTS
--------------------------------------------------------- */

if (loginButton) {

  loginButton.addEventListener(
    "click",
    createAccount
  );

}


if (closeLoginButton) {

  closeLoginButton.addEventListener(
    "click",
    closeLogin
  );

}


if (loginModal) {

  loginModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        loginModal
      ) {

        closeLogin();

      }

    }
  );

}


/* ---------------------------------------------------------
   35. PROFILE EVENTS
--------------------------------------------------------- */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-login], [data-profile], #profileBtn, #profileButton"
      );


    if (!button) {

      return;

    }


    event.preventDefault();


    if (
      player.loggedIn
    ) {

      showProfile();

    } else {

      openLogin();

    }

  }
);


/* ---------------------------------------------------------
   36. ESCAPE
--------------------------------------------------------- */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !==
      "Escape"
    ) {

      return;

    }


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
);


/* ---------------------------------------------------------
   37. COUNTDOWN
--------------------------------------------------------- */

let countdownInterval =
  null;


function updateCountdown() {

  const now =
    new Date();


  const tomorrow =
    new Date(
      now
    );


  tomorrow.setDate(
    tomorrow.getDate() + 1
  );

  tomorrow.setHours(
    0,
    0,
    0,
    0
  );


  const difference =
    tomorrow -
    now;


  const totalSeconds =
    Math.max(
      0,
      Math.floor(
        difference /
        1000
      )
    );


  const hours =
    Math.floor(
      totalSeconds /
      3600
    );


  const minutes =
    Math.floor(
      (
        totalSeconds %
        3600
      ) /
      60
    );


  const seconds =
    totalSeconds %
    60;


  setText(
    ["hours"],
    String(
      hours
    ).padStart(
      2,
      "0"
    )
  );


  setText(
    ["minutes"],
    String(
      minutes
    ).padStart(
      2,
      "0"
    )
  );


  setText(
    ["seconds"],
    String(
      seconds
    ).padStart(
      2,
      "0"
    )
  );

}


function startCountdown() {

  updateCountdown();


  if (
    countdownInterval
  ) {

    clearInterval(
      countdownInterval
    );

  }


  countdownInterval =
    setInterval(
      updateCountdown,
      1000
    );

}


/* ---------------------------------------------------------
   38. ESCAPE HTML
--------------------------------------------------------- */

function escapeHTML(
  value
) {

  return String(
    value
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


/* ---------------------------------------------------------
   39. INITIALIZATION
--------------------------------------------------------- */

checkDailyReset();

updateLevel();

updateDashboard();

startCountdown();


console.log(
  "NIJOK Game Engine loaded successfully 🌿"
);

console.log(
  "NIJOK player:",
  player
);

console.log(
  "NIJOK game modes:",
  Object.keys(
    GAME_INFO
  )
);
