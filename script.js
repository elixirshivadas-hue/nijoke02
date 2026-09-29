"use strict";

/* =========================================================
   NIJOK 3.0 — PART 3A
   CORE GAME ENGINE
   ---------------------------------------------------------
   • Food Quiz
   • Guess the Food
   • Match the Pair
   • Time Challenge
   • Daily Challenge
   • Question rendering
   • Answer system
   • Score system foundation
   • Daily limits
   ========================================================= */


/* =========================================================
   1. NIJOK GAME CONFIGURATION
   ========================================================= */

const NIJOK = {

  version: "3.0",

  limits: {
    quiz: 20,
    guess: 10,
    match: 5,
    time: 10,
    daily: 1
  },

  points: {
    quiz: 10,
    guess: 10,
    match: 15,
    time: 20,
    daily: 20
  },

  timeLimit: 15

};


/* =========================================================
   2. PLAYER STORAGE
   ---------------------------------------------------------
   Part 3B will expand this system.
   ========================================================= */

const STORAGE_KEY = "nijokPlayer";

const defaultPlayer = {

  name: "Guest Explorer",

  email: "",

  loggedIn: false,

  totalScore: 0,

  gamesPlayed: 0,

  correctAnswers: 0,

  level: 1,

  streak: 0,

  badges: [],

  today: {

    date: "",

    quiz: 0,

    guess: 0,

    match: 0,

    time: 0,

    daily: 0

  }

};


function createDefaultPlayer() {

  return JSON.parse(
    JSON.stringify(defaultPlayer)
  );

}


function loadPlayer() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {

      return createDefaultPlayer();

    }

    const data =
      JSON.parse(saved);

    return {

      ...createDefaultPlayer(),

      ...data,

      today: {

        ...createDefaultPlayer().today,

        ...(data.today || {})

      }

    };

  } catch (error) {

    console.error(
      "NIJOK player storage error:",
      error
    );

    return createDefaultPlayer();

  }

}


let player = loadPlayer();


function savePlayer() {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(player)
    );

  } catch (error) {

    console.error(
      "NIJOK save error:",
      error
    );

  }

}


/* =========================================================
   3. DATE SYSTEM
   ========================================================= */

function todayKey() {

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


function resetDailyProgress() {

  const today =
    todayKey();


  if (
    player.today.date !==
    today
  ) {

    player.today = {

      date: today,

      quiz: 0,

      guess: 0,

      match: 0,

      time: 0,

      daily: 0

    };

    savePlayer();

  }

}


/* =========================================================
   4. GAME INFORMATION
   ========================================================= */

const gameInfo = {

  quiz: {

    label: "FOOD QUIZ",

    title: "Food Quiz",

    description:
      "Test your knowledge of food, culture and ingredients."

  },

  guess: {

    label: "GUESS THE FOOD",

    title: "Guess the Food",

    description:
      "Identify the food and discover its story."

  },

  match: {

    label: "MATCH THE PAIR",

    title: "Match the Pair",

    description:
      "Find the correct food connection."

  },

  time: {

    label: "TIME CHALLENGE",

    title: "Time Challenge",

    description:
      "Think fast, answer quickly and score more points."

  },

  daily: {

    label: "TODAY'S CHALLENGE",

    title: "Daily Challenge",

    description:
      "One special question to keep your Food Journey moving."

  }

};


/* =========================================================
   5. QUESTION BANK
   ---------------------------------------------------------
   Foundation bank.
   Later this structure can hold 100 days / 500+ questions.
   ========================================================= */

const questions = {


  /* =======================================================
     FOOD QUIZ
     ======================================================= */

  quiz: [

    {

      question:
        "Which fruit is strongly associated with Kashmir?",

      answers: [

        "Apple",

        "Banana",

        "Papaya",

        "Pineapple"

      ],

      correct: 0

    },

    {

      question:
        "Which compound gives turmeric its characteristic yellow colour?",

      answers: [

        "Curcumin",

        "Caffeine",

        "Pectin",

        "Lycopene"

      ],

      correct: 0

    },

    {

      question:
        "Which grain is commonly used in idli?",

      answers: [

        "Rice",

        "Barley",

        "Corn",

        "Oats"

      ],

      correct: 0

    },

    {

      question:
        "Which mineral is important for normal bones and teeth?",

      answers: [

        "Calcium",

        "Sodium",

        "Iron",

        "Iodine"

      ],

      correct: 0

    },

    {

      question:
        "Which food is a common source of plant protein?",

      answers: [

        "Lentils",

        "Sugar",

        "Salt",

        "Cooking oil"

      ],

      correct: 0

    },

    {

      question:
        "Which nutrient is the body's main quick source of energy?",

      answers: [

        "Carbohydrate",

        "Water",

        "Minerals",

        "Vitamins"

      ],

      correct: 0

    },

    {

      question:
        "Which vitamin is commonly produced by the body after sunlight exposure?",

      answers: [

        "Vitamin D",

        "Vitamin C",

        "Vitamin K",

        "Vitamin B1"

      ],

      correct: 0

    },

    {

      question:
        "Which food naturally contains dietary fibre?",

      answers: [

        "Whole grains",

        "Refined sugar",

        "Salt",

        "Cooking oil"

      ],

      correct: 0

    },

    {

      question:
        "What does an ingredient list tell you?",

      answers: [

        "Ingredients used in the product",

        "Only the price",

        "Only the advertisement",

        "Only the brand history"

      ],

      correct: 0

    },

    {

      question:
        "Why can comparing food labels be useful?",

      answers: [

        "To understand differences between products",

        "To choose the biggest package",

        "To follow advertisements",

        "To choose the brightest package"

      ],

      correct: 0

    },

    {

      question:
        "Which food is traditionally associated with Punjab?",

      answers: [

        "Sarson da saag",

        "Sushi",

        "Tacos",

        "Pasta"

      ],

      correct: 0

    },

    {

      question:
        "Which drink is strongly associated with Assam?",

      answers: [

        "Tea",

        "Cocoa",

        "Lassi",

        "Lemonade"

      ],

      correct: 0

    },

    {

      question:
        "Which ingredient is commonly used to make bread rise?",

      answers: [

        "Yeast",

        "Salt",

        "Turmeric",

        "Sugar syrup"

      ],

      correct: 0

    },

    {

      question:
        "Which food is made from fermented batter in many Indian cuisines?",

      answers: [

        "Idli",

        "French fries",

        "Chocolate",

        "Popcorn"

      ],

      correct: 0

    },

    {

      question:
        "Which spice is commonly known for its strong aroma and warm flavour?",

      answers: [

        "Cardamom",

        "Apple",

        "Rice",

        "Milk"

      ],

      correct: 0

    },

    {

      question:
        "Which of these is a legume?",

      answers: [

        "Chickpea",

        "Apple",

        "Rice",

        "Coconut water"

      ],

      correct: 0

    },

    {

      question:
        "Which food is traditionally associated with Kerala?",

      answers: [

        "Appam",

        "Sushi",

        "Croissant",

        "Tacos"

      ],

      correct: 0

    },

    {

      question:
        "Which ingredient gives chilli its heat?",

      answers: [

        "Capsaicin",

        "Curcumin",

        "Glucose",

        "Pectin"

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

        "Cooking oil"

      ],

      correct: 0

    },

    {

      question:
        "Which food is traditionally associated with Japan?",

      answers: [

        "Sushi",

        "Biryani",

        "Dhokla",

        "Pav bhaji"

      ],

      correct: 0

    }

  ],


  /* =======================================================
     GUESS THE FOOD
     ======================================================= */

  guess: [

    {

      question:
        "🍛 Which food is this?",

      answers: [

        "Biryani",

        "Pizza",

        "Sushi",

        "Pasta"

      ],

      correct: 0

    },

    {

      question:
        "🥭 Which fruit is this?",

      answers: [

        "Mango",

        "Apple",

        "Orange",

        "Pear"

      ],

      correct: 0

    },

    {

      question:
        "🍣 Which food is this?",

      answers: [

        "Sushi",

        "Biryani",

        "Noodles",

        "Dosa"

      ],

      correct: 0

    },

    {

      question:
        "🍕 Which food is this?",

      answers: [

        "Pizza",

        "Idli",

        "Samosa",

        "Biryani"

      ],

      correct: 0

    },

    {

      question:
        "🥥 Which food ingredient is this?",

      answers: [

        "Coconut",

        "Turmeric",

        "Cardamom",

        "Wheat"

      ],

      correct: 0

    },

    {

      question:
        "🌶️ Which ingredient is this?",

      answers: [

        "Chilli",

        "Apple",

        "Rice",

        "Milk"

      ],

      correct: 0

    },

    {

      question:
        "🍵 Which drink is this?",

      answers: [

        "Tea",

        "Coffee",

        "Soup",

        "Juice"

      ],

      correct: 0

    },

    {

      question:
        "🍚 Which staple food is this?",

      answers: [

        "Rice",

        "Bread",

        "Cheese",

        "Pasta"

      ],

      correct: 0

    },

    {

      question:
        "🥔 Which vegetable is this?",

      answers: [

        "Potato",

        "Carrot",

        "Tomato",

        "Onion"

      ],

      correct: 0

    },

    {

      question:
        "🍎 Which fruit is this?",

      answers: [

        "Apple",

        "Mango",

        "Banana",

        "Papaya"

      ],

      correct: 0

    }

  ],


  /* =======================================================
     MATCH THE PAIR
     ======================================================= */

  match: [

    {

      question:
        "Which pair is correct?",

      answers: [

        "Darjeeling — Tea",

        "Kashmir — Coconut",

        "Kerala — Saffron",

        "Punjab — Sushi"

      ],

      correct: 0

    },

    {

      question:
        "Which pair is correct?",

      answers: [

        "Assam — Tea",

        "Japan — Biryani",

        "Italy — Idli",

        "Punjab — Sushi"

      ],

      correct: 0

    },

    {

      question:
        "Which pair is correct?",

      answers: [

        "Kashmir — Apple",

        "Japan — Biryani",

        "Kerala — Tacos",

        "Italy — Dosa"

      ],

      correct: 0

    },

    {

      question:
        "Which pair is correct?",

      answers: [

        "Italy — Pizza",

        "Japan — Biryani",

        "India — Sushi",

        "Mexico — Idli"

      ],

      correct: 0

    },

    {

      question:
        "Which pair is correct?",

      answers: [

        "Mexico — Tacos",

        "Kerala — Sushi",

        "Punjab — Pizza",

        "Japan — Biryani"

      ],

      correct: 0

    }

  ],


  /* =======================================================
     TIME CHALLENGE
     ======================================================= */

  time: [

    {

      question:
        "Which one is a spice?",

      answers: [

        "Turmeric",

        "Apple",

        "Rice",

        "Milk"

      ],

      correct: 0

    },

    {

      question:
        "Which one is a fruit?",

      answers: [

        "Mango",

        "Salt",

        "Rice",

        "Lentil"

      ],

      correct: 0

    },

    {

      question:
        "Which one is a grain?",

      answers: [

        "Rice",

        "Apple",

        "Milk",

        "Salt"

      ],

      correct: 0

    },

    {

      question:
        "Which one is a legume?",

      answers: [

        "Lentil",

        "Mango",

        "Sugar",

        "Oil"

      ],

      correct: 0

    },

    {

      question:
        "Which one is a dairy food?",

      answers: [

        "Milk",

        "Rice",

        "Apple",

        "Chilli"

      ],

      correct: 0

    },

    {

      question:
        "Which one is commonly used as a cooking oil?",

      answers: [

        "Sunflower oil",

        "Rice",

        "Apple",

        "Salt"

      ],

      correct: 0

    },

    {

      question:
        "Which one is naturally sweet?",

      answers: [

        "Mango",

        "Salt",

        "Turmeric",

        "Black pepper"

      ],

      correct: 0

    },

    {

      question:
        "Which one is commonly used in Indian curries?",

      answers: [

        "Turmeric",

        "Apple",

        "Pear",

        "Yoghurt candy"

      ],

      correct: 0

    },

    {

      question:
        "Which one is a citrus fruit?",

      answers: [

        "Orange",

        "Rice",

        "Lentil",

        "Potato"

      ],

      correct: 0

    },

    {

      question:
        "Which one is commonly made from wheat flour?",

      answers: [

        "Roti",

        "Sushi",

        "Idli",

        "Coconut water"

      ],

      correct: 0

    }

  ],


  /* =======================================================
     DAILY CHALLENGE
     ======================================================= */

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
   6. GAME STATE
   ========================================================= */

const gameState = {

  active: false,

  mode: "",

  questions: [],

  questionIndex: 0,

  score: 0,

  correct: 0,

  answered: false,

  timer: null,

  timeLeft: 0

};


/* =========================================================
   7. HTML ELEMENTS
   ========================================================= */

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


/* =========================================================
   8. UTILITY
   ========================================================= */

function shuffle(array) {

  const copy =
    [...array];

  for (
    let i = copy.length - 1;
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


/* =========================================================
   9. GET DAILY LIMIT
   ========================================================= */

function getLimit(mode) {

  return (
    NIJOK.limits[mode] ||
    1
  );

}


function playedToday(mode) {

  resetDailyProgress();

  return (
    player.today[mode] ||
    0
  );

}


/* =========================================================
   10. PREPARE QUESTIONS
   ========================================================= */

function prepareQuestions(mode) {

  const bank =
    questions[mode] || [];

  if (!bank.length) {

    return [];

  }

  const shuffled =
    shuffle(bank);

  const limit =
    getLimit(mode);

  const amount =
    Math.min(
      limit,
      shuffled.length
    );

  return shuffled
    .slice(0, amount)
    .map(question => ({
      ...question,
      answers: [
        ...question.answers
      ]
    }));

}


/* =========================================================
   11. OPEN GAME
   ========================================================= */

function openGame(mode) {

  resetDailyProgress();


  if (!gameInfo[mode]) {

    console.error(
      "NIJOK: Unknown game mode:",
      mode
    );

    return;

  }


  if (
    playedToday(mode) >=
    getLimit(mode)
  ) {

    showLimit(mode);

    return;

  }


  const prepared =
    prepareQuestions(mode);


  if (!prepared.length) {

    console.error(
      "NIJOK: No questions available for",
      mode
    );

    return;

  }


  clearGameTimer();


  gameState.active =
    true;

  gameState.mode =
    mode;

  gameState.questions =
    prepared;

  gameState.questionIndex =
    0;

  gameState.score =
    0;

  gameState.correct =
    0;

  gameState.answered =
    false;


  const info =
    gameInfo[mode];


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


  if (gameOverlay) {

    gameOverlay.classList.add(
      "active"
    );

    gameOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  document.body.style.overflow =
    "hidden";


  showQuestion();

}


/* =========================================================
   12. SHOW QUESTION
   ========================================================= */

function showQuestion() {

  if (!gameState.active) {

    return;

  }


  const list =
    gameState.questions;


  if (
    !list ||
    !list.length
  ) {

    finishGame();

    return;

  }


  if (
    gameState.questionIndex >=
    list.length
  ) {

    finishGame();

    return;

  }


  clearGameTimer();


  const current =
    list[
      gameState.questionIndex
    ];


  gameState.answered =
    false;


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="question-number">

        Question
        ${gameState.questionIndex + 1}
        / ${list.length}

      </div>

      <h3>
        ${escapeHTML(
          current.question
        )}
      </h3>

    `;

  }


  if (gameAnswers) {

    gameAnswers.innerHTML =
      "";

  }


  current.answers.forEach(
    (answer, index) => {

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


      button.addEventListener(
        "click",
        () => {

          answerQuestion(
            button,
            index,
            current.correct
          );

        }
      );


      gameAnswers.appendChild(
        button
      );

    }
  );


  if (nextQuestion) {

    nextQuestion.style.display =
      "none";

  }


  if (
    gameState.mode ===
    "time"
  ) {

    startTimeChallenge();

  }

}


/* =========================================================
   13. ANSWER QUESTION
   ========================================================= */

function answerQuestion(
  selectedButton,
  selectedIndex,
  correctIndex
) {

  if (
    !gameState.active ||
    gameState.answered
  ) {

    return;

  }


  gameState.answered =
    true;


  clearGameTimer();


  const buttons =
    gameAnswers
      ? gameAnswers.querySelectorAll(
          ".answer-button"
        )
      : [];


  buttons.forEach(
    (button, index) => {

      button.disabled =
        true;


      if (
        index ===
        correctIndex
      ) {

        button.classList.add(
          "correct"
        );

      }

    }
  );


  const isCorrect =
    selectedIndex ===
    correctIndex;


  if (isCorrect) {

    selectedButton.classList.add(
      "correct"
    );


    gameState.correct++;


    const points =
      NIJOK.points[
        gameState.mode
      ] || 10;


    gameState.score +=
      points;

  } else {

    selectedButton.classList.add(
      "wrong"
    );

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      gameState.questionIndex ===
      gameState.questions.length - 1

        ? "See Results →"

        : "Next Question →";

  }

}


/* =========================================================
   14. NEXT QUESTION
   ========================================================= */

function goToNextQuestion() {

  if (
    !gameState.active ||
    !gameState.answered
  ) {

    return;

  }


  gameState.questionIndex++;


  if (
    gameState.questionIndex >=
    gameState.questions.length
  ) {

    finishGame();

    return;

  }


  showQuestion();

}


if (nextQuestion) {

  nextQuestion.addEventListener(
    "click",
    goToNextQuestion
  );

}


/* =========================================================
   15. FINISH GAME
   ========================================================= */

function finishGame() {

  if (!gameState.active) {

    return;

  }


  clearGameTimer();


  const mode =
    gameState.mode;


  const pointsEarned =
    gameState.score;


  player.totalScore +=
    pointsEarned;


  player.gamesPlayed++;


  player.correctAnswers +=
    gameState.correct;


  if (
    player.today[mode] !==
    undefined
  ) {

    player.today[mode]++;

  }


  updateLevel();


  savePlayer();


  gameState.active =
    false;


  showResults(
    mode,
    pointsEarned,
    gameState.correct,
    gameState.questions.length
  );


  updateDashboard();

}


/* =========================================================
   16. RESULT SCREEN
   ========================================================= */

function showResults(
  mode,
  score,
  correct,
  total
) {

  const info =
    gameInfo[mode];


  if (gameModeLabel) {

    gameModeLabel.textContent =
      "CHALLENGE COMPLETE";

  }


  if (gameTitle) {

    gameTitle.textContent =
      "Well Played, Food Explorer!";

  }


  if (gameDescription) {

    gameDescription.textContent =
      `${info.title} completed.`;

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="limit-message">

        <strong>
          🌿 Your Result
        </strong>

        <br><br>

        Score:
        <strong>${score}</strong>

        points

        <br>

        Correct:
        <strong>${correct}</strong>
        / ${total}

        <br><br>

        Keep exploring.
        Every question adds to your
        Food Journey.

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
      "Close Challenge →";

    nextQuestion.onclick =
      closeGameAfterResult;

  }

}


/* =========================================================
   17. RESULT CLOSE
   ========================================================= */

function closeGameAfterResult() {

  if (nextQuestion) {

    nextQuestion.onclick =
      null;

  }

  closeGame();

}


/* =========================================================
   18. DAILY LIMIT MESSAGE
   ========================================================= */

function showLimit(mode) {

  const info =
    gameInfo[mode];


  if (gameModeLabel) {

    gameModeLabel.textContent =
      info.label;

  }


  if (gameTitle) {

    gameTitle.textContent =
      "Daily Limit Reached";

  }


  if (gameDescription) {

    gameDescription.textContent =
      `You completed today's ${info.title} limit.`;

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="limit-message">

        🌿 Great job, Food Explorer!

        <br><br>

        Today's challenge is complete.

        <br><br>

        Come back tomorrow
        for a fresh challenge.

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
      closeGameAfterResult;

  }


  if (gameOverlay) {

    gameOverlay.classList.add(
      "active"
    );

    gameOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   19. TIME CHALLENGE
   ========================================================= */

function startTimeChallenge() {

  clearGameTimer();


  gameState.timeLeft =
    NIJOK.timeLimit;


  updateTimeDisplay();


  gameState.timer =
    setInterval(
      () => {

        gameState.timeLeft--;


        updateTimeDisplay();


        if (
          gameState.timeLeft <=
          0
        ) {

          clearGameTimer();

          timeExpired();

        }

      },
      1000
    );

}


function updateTimeDisplay() {

  if (!gameQuestion) {

    return;

  }


  const existing =
    gameQuestion.querySelector(
      ".question-number"
    );


  if (!existing) {

    return;

  }


  let timer =
    gameQuestion.querySelector(
      ".question-timer"
    );


  if (!timer) {

    timer =
      document.createElement(
        "div"
      );

    timer.className =
      "question-timer";

    gameQuestion.prepend(
      timer
    );

  }


  timer.textContent =
    `⏱️ ${gameState.timeLeft}s`;

}


function timeExpired() {

  if (
    !gameState.active ||
    gameState.answered
  ) {

    return;

  }


  gameState.answered =
    true;


  const buttons =
    gameAnswers
      ? gameAnswers.querySelectorAll(
          ".answer-button"
        )
      : [];


  buttons.forEach(
    (button, index) => {

      button.disabled =
        true;


      const current =
        gameState.questions[
          gameState.questionIndex
        ];


      if (
        current &&
        index ===
        current.correct
      ) {

        button.classList.add(
          "correct"
        );

      }

    }
  );


  if (gameQuestion) {

    const notice =
      document.createElement(
        "div"
      );

    notice.className =
      "limit-message";

    notice.innerHTML =
      "⏱️ Time's up!";

    gameQuestion.appendChild(
      notice
    );

  }


  if (nextQuestion) {

    nextQuestion.style.display =
      "inline-flex";

    nextQuestion.textContent =
      gameState.questionIndex ===
      gameState.questions.length - 1

        ? "See Results →"

        : "Next Question →";

  }

}


/* =========================================================
   20. CLEAR TIMER
   ========================================================= */

function clearGameTimer() {

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


/* =========================================================
   21. CLOSE GAME
   ========================================================= */

function closeGame() {

  clearGameTimer();


  if (gameOverlay) {

    gameOverlay.classList.remove(
      "active"
    );

    gameOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  document.body.style.overflow =
    "";


  gameState.active =
    false;


  gameState.mode =
    "";

  gameState.questions =
    [];

  gameState.questionIndex =
    0;

  gameState.score =
    0;

  gameState.correct =
    0;

  gameState.answered =
    false;


  if (nextQuestion) {

    nextQuestion.onclick =
      goToNextQuestion;

  }


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
    event => {

      if (
        event.target ===
        gameOverlay
      ) {

        closeGame();

      }

    }
  );

}


/* =========================================================
   22. CHALLENGE BUTTONS
   ========================================================= */

document
  .querySelectorAll(
    "[data-game]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          const mode =
            event.currentTarget
              .dataset
              .game;

          openGame(mode);

        }
      );

    }
  );


/* =========================================================
   23. LEVEL SYSTEM
   ========================================================= */

function updateLevel() {

  player.level =
    Math.max(

      1,

      Math.floor(
        player.totalScore / 100
      ) + 1

    );

}


/* =========================================================
   24. DASHBOARD
   ========================================================= */

function updateDashboard() {

  const score =
    document.getElementById(
      "totalScore"
    );

  const games =
    document.getElementById(
      "gamesPlayed"
    );

  const correct =
    document.getElementById(
      "correctAnswers"
    );

  const level =
    document.getElementById(
      "userLevel"
    );

  const name =
    document.getElementById(
      "profileName"
    );

  const badges =
    document.getElementById(
      "badgesEarned"
    );


  if (score) {

    score.textContent =
      player.totalScore;

  }


  if (games) {

    games.textContent =
      player.gamesPlayed;

  }


  if (correct) {

    correct.textContent =
      player.correctAnswers;

  }


  if (level) {

    level.textContent =
      player.level;

  }


  if (name) {

    name.textContent =
      player.name;

  }


  if (badges) {

    badges.textContent =
      calculateBadges();

  }

}


/* =========================================================
   25. BADGES FOUNDATION
   ========================================================= */

function calculateBadges() {

  let count = 0;


  if (
    player.totalScore >=
    50
  ) {

    count++;

  }


  if (
    player.totalScore >=
    100
  ) {

    count++;

  }


  if (
    player.totalScore >=
    250
  ) {

    count++;

  }


  if (
    player.totalScore >=
    500
  ) {

    count++;

  }


  if (
    player.totalScore >=
    1000
  ) {

    count++;

  }


  return count;

}


/* =========================================================
   26. HTML ESCAPE
   ========================================================= */

function escapeHTML(value) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    String(value);

  return div.innerHTML;

}


/* =========================================================
   27. INITIALIZATION
   ========================================================= */

resetDailyProgress();

updateLevel();

updateDashboard();


console.log(
  "NIJOK Game Engine Part 3A loaded successfully 🌿"
);
/* =========================================================
   NIJOK 3.0 — PART 3B
   PROFILE • LOGIN • DASHBOARD • DAILY • COMMUNITY
   ---------------------------------------------------------
   This part continues directly after Part 3A.
========================================================= */


/* =========================================================
   28. PROFILE / LOGIN ELEMENTS
========================================================= */

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


/* =========================================================
   29. OPEN LOGIN MODAL
========================================================= */

function openLoginModal() {

  if (!loginModal) {

    loginUserFallback();

    return;

  }


  loginModal.classList.add(
    "active"
  );

  loginModal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";


  if (loginName) {

    loginName.value =
      player.loggedIn
        ? player.name
        : "";

  }


  if (loginEmail) {

    loginEmail.value =
      player.email || "";

  }


  setTimeout(
    () => {

      if (loginName) {

        loginName.focus();

      }

    },
    100
  );

}


/* =========================================================
   30. CLOSE LOGIN MODAL
========================================================= */

function closeLoginModal() {

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


if (closeLoginButton) {

  closeLoginButton.addEventListener(
    "click",
    closeLoginModal
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

        closeLoginModal();

      }

    }
  );

}


/* =========================================================
   31. CREATE / LOGIN ACCOUNT
========================================================= */

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

    if (loginName) {

      loginName.focus();

    }

    showLoginMessage(
      "Please enter your name."
    );

    return;

  }


  if (
    email &&
    !isValidEmail(email)
  ) {

    if (loginEmail) {

      loginEmail.focus();

    }

    showLoginMessage(
      "Please enter a valid email address."
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

  updateLoginUI();

  closeLoginModal();


  showWelcomeMessage();

}


function isValidEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(email);

}


/* =========================================================
   32. LOGIN MESSAGE
========================================================= */

function showLoginMessage(message) {

  if (!loginModal) {

    return;

  }


  let messageBox =
    loginModal.querySelector(
      ".login-message"
    );


  if (!messageBox) {

    messageBox =
      document.createElement(
        "div"
      );

    messageBox.className =
      "login-message";


    const button =
      loginModal.querySelector(
        "#loginButton"
      );


    if (button) {

      button.before(
        messageBox
      );

    } else {

      loginModal.appendChild(
        messageBox
      );

    }

  }


  messageBox.textContent =
    message;


  setTimeout(
    () => {

      if (messageBox) {

        messageBox.textContent =
          "";

      }

    },
    3000
  );

}


/* =========================================================
   33. WELCOME MESSAGE
========================================================= */

function showWelcomeMessage() {

  if (!gameOverlay) {

    return;

  }


  if (gameModeLabel) {

    gameModeLabel.textContent =
      "WELCOME TO NIJOK";

  }


  if (gameTitle) {

    gameTitle.textContent =
      `Welcome, ${player.name}!`;

  }


  if (gameDescription) {

    gameDescription.textContent =
      "Your Food Journey is ready to begin.";

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="limit-message">

        🌿 Your profile has been created.

        <br><br>

        Your score, progress and
        achievements will be saved
        on this device.

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
      "Start Exploring →";

    nextQuestion.onclick =
      closeGameAfterResult;

  }


  gameOverlay.classList.add(
    "active"
  );

  gameOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   34. LOGIN BUTTON
========================================================= */

if (loginButton) {

  loginButton.addEventListener(
    "click",
    createAccount
  );

}


/* =========================================================
   35. LOGIN INPUT — ENTER KEY
========================================================= */

[loginName, loginEmail]
  .forEach(
    input => {

      if (!input) {

        return;

      }


      input.addEventListener(
        "keydown",
        event => {

          if (
            event.key ===
            "Enter"
          ) {

            event.preventDefault();

            createAccount();

          }

        }
      );

    }
  );


/* =========================================================
   36. FALLBACK LOGIN
   ---------------------------------------------------------
   Used only if login modal is unavailable.
========================================================= */

function loginUserFallback() {

  const name =
    window.prompt(
      "Welcome to NIJOK 🌿\n\nEnter your name:"
    );


  if (
    !name ||
    !name.trim()
  ) {

    return;

  }


  player.name =
    name.trim();

  player.loggedIn =
    true;


  savePlayer();

  updateDashboard();

  updateLoginUI();

}


/* =========================================================
   37. LOGIN UI
========================================================= */

function updateLoginUI() {

  const profileButtons =
    document.querySelectorAll(
      "[data-login], [data-profile], .profile-btn, #profileBtn"
    );


  profileButtons.forEach(
    button => {

      if (
        player.loggedIn
      ) {

        button.textContent =
          player.name;

        button.setAttribute(
          "aria-label",
          "Open profile"
        );

      } else {

        button.textContent =
          "Login";

        button.setAttribute(
          "aria-label",
          "Login to NIJOK"
        );

      }

    }
  );

}


/* =========================================================
   38. PROFILE
========================================================= */

function showProfile() {

  if (
    !player.loggedIn
  ) {

    openLoginModal();

    return;

  }


  if (!gameOverlay) {

    return;

  }


  clearGameTimer();


  if (gameModeLabel) {

    gameModeLabel.textContent =
      "YOUR FOOD JOURNEY";

  }


  if (gameTitle) {

    gameTitle.textContent =
      player.name;

  }


  if (gameDescription) {

    gameDescription.textContent =
      "Food Explorer Profile";

  }


  if (gameQuestion) {

    gameQuestion.innerHTML = `

      <div class="limit-message">

        <strong>🌿 Food Explorer</strong>

        <br><br>

        Score:
        <strong>
          ${player.totalScore}
        </strong>

        points

        <br><br>

        Level:
        <strong>
          ${player.level}
        </strong>

        <br><br>

        Games Played:
        <strong>
          ${player.gamesPlayed}
        </strong>

        <br><br>

        Correct Answers:
        <strong>
          ${player.correctAnswers}
        </strong>

        <br><br>

        Current Streak:
        <strong>
          ${player.streak}
        </strong>

        days

        <br><br>

        Badges:
        <strong>
          ${calculateBadges()}
        </strong>

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
      "Close Profile →";

    nextQuestion.onclick =
      closeGameAfterResult;

  }


  gameOverlay.classList.add(
    "active"
  );

  gameOverlay.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   39. LOGOUT
========================================================= */

function logoutUser() {

  player.loggedIn =
    false;


  savePlayer();

  updateDashboard();

  updateLoginUI();

}


/* =========================================================
   40. PROFILE BUTTON EVENTS
========================================================= */

document.addEventListener(
  "click",
  event => {

    const target =
      event.target.closest(
        "[data-login], [data-profile], .profile-btn, #profileBtn"
      );


    if (!target) {

      return;

    }


    event.preventDefault();


    if (
      player.loggedIn
    ) {

      showProfile();

    } else {

      openLoginModal();

    }

  }
);


/* =========================================================
   41. DASHBOARD UPDATE
========================================================= */

function updateDashboard() {

  updateLevel();


  const score =
    document.getElementById(
      "totalScore"
    );

  const games =
    document.getElementById(
      "gamesPlayed"
    );

  const correct =
    document.getElementById(
      "correctAnswers"
    );

  const level =
    document.getElementById(
      "userLevel"
    );

  const name =
    document.getElementById(
      "profileName"
    );

  const badges =
    document.getElementById(
      "badgesEarned"
    );

  const progress =
    document.getElementById(
      "scoreProgress"
    );


  if (score) {

    score.textContent =
      player.totalScore;

  }


  if (games) {

    games.textContent =
      player.gamesPlayed;

  }


  if (correct) {

    correct.textContent =
      player.correctAnswers;

  }


  if (level) {

    level.textContent =
      player.level;

  }


  if (name) {

    name.textContent =
      player.name ||
      "Guest Explorer";

  }


  if (badges) {

    badges.textContent =
      calculateBadges();

  }


  if (progress) {

    const levelStart =
      (player.level - 1) *
      100;

    const progressValue =
      player.totalScore -
      levelStart;


    const percentage =
      Math.min(
        100,
        Math.max(
          0,
          progressValue
        )
      );


    progress.style.width =
      `${percentage}%`;

  }


  updateLoginUI();

}


/* =========================================================
   42. DAILY COUNTDOWN
========================================================= */

let countdownTimer =
  null;


function startCountdown() {

  if (countdownTimer) {

    clearInterval(
      countdownTimer
    );

  }


  updateCountdown();


  countdownTimer =
    setInterval(
      updateCountdown,
      1000
    );

}


function updateCountdown() {

  const now =
    new Date();


  const tomorrow =
    new Date(
      now
    );


  tomorrow.setHours(
    24,
    0,
    0,
    0
  );


  const difference =
    Math.max(
      0,
      tomorrow - now
    );


  const totalSeconds =
    Math.floor(
      difference / 1000
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
      ) / 60
    );


  const seconds =
    totalSeconds %
    60;


  const hourElement =
    document.getElementById(
      "hours"
    );

  const minuteElement =
    document.getElementById(
      "minutes"
    );

  const secondElement =
    document.getElementById(
      "seconds"
    );


  if (hourElement) {

    hourElement.textContent =
      String(hours).padStart(
        2,
        "0"
      );

  }


  if (minuteElement) {

    minuteElement.textContent =
      String(minutes).padStart(
        2,
        "0"
      );

  }


  if (secondElement) {

    secondElement.textContent =
      String(seconds).padStart(
        2,
        "0"
      );

  }


  if (
    totalSeconds <=
    0
  ) {

    resetDailyProgress();

  }

}


/* =========================================================
   43. DAILY CHALLENGE BUTTON
========================================================= */

document
  .querySelectorAll(
    '[data-game="daily"]'
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openGame(
            "daily"
          );

        }
      );

    }
  );


/* =========================================================
   44. COMMUNITY COMMENTS
========================================================= */

const commentInput =
  document.getElementById(
    "commentInput"
  );

const commentButton =
  document.getElementById(
    "commentButton"
  );

const commentsList =
  document.getElementById(
    "commentsList"
  );


const COMMENTS_KEY =
  "nijokComments";


function loadComments() {

  try {

    const saved =
      localStorage.getItem(
        COMMENTS_KEY
      );


    if (!saved) {

      return [];

    }


    const data =
      JSON.parse(saved);


    return Array.isArray(data)
      ? data
      : [];

  } catch (error) {

    console.error(
      "NIJOK comments error:",
      error
    );

    return [];

  }

}


function saveComments(
  comments
) {

  try {

    localStorage.setItem(
      COMMENTS_KEY,
      JSON.stringify(
        comments
      )
    );

  } catch (error) {

    console.error(
      "NIJOK comment save error:",
      error
    );

  }

}


/* =========================================================
   45. POST COMMENT
========================================================= */

function postComment() {

  if (!commentInput) {

    return;

  }


  const text =
    commentInput.value.trim();


  if (!text) {

    commentInput.focus();

    return;

  }


  const comments =
    loadComments();


  comments.unshift({

    name:
      player.name ||
      "Food Explorer",

    text:
      text,

    date:
      new Date().toISOString()

  });


  saveComments(
    comments
  );


  commentInput.value =
    "";


  renderComments();

}


/* =========================================================
   46. RENDER COMMENTS
========================================================= */

function renderComments() {

  if (!commentsList) {

    return;

  }


  const comments =
    loadComments();


  commentsList.innerHTML =
    "";


  if (!comments.length) {

    const welcome =
      document.createElement(
        "div"
      );


    welcome.className =
      "comment-card";


    welcome.innerHTML = `

      <div class="comment-avatar">
        🌱
      </div>

      <div>

        <strong>
          Food Explorer
        </strong>

        <span>
          Welcome to NIJOK!
        </span>

      </div>

    `;


    commentsList.appendChild(
      welcome
    );

    return;

  }


  comments
    .slice(0, 20)
    .forEach(
      comment => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "comment-card";


        const avatar =
          document.createElement(
            "div"
          );


        avatar.className =
          "comment-avatar";


        avatar.textContent =
          "🌱";


        const content =
          document.createElement(
            "div"
          );


        const name =
          document.createElement(
            "strong"
          );


        name.textContent =
          comment.name ||
          "Food Explorer";


        const text =
          document.createElement(
            "span"
          );


        text.textContent =
          comment.text;


        content.appendChild(
          name
        );

        content.appendChild(
          text
        );


        card.appendChild(
          avatar
        );

        card.appendChild(
          content
        );


        commentsList.appendChild(
          card
        );

      }
    );

}


if (commentButton) {

  commentButton.addEventListener(
    "click",
    postComment
  );

}


if (commentInput) {

  commentInput.addEventListener(
    "keydown",
    event => {

      if (
        (
          event.ctrlKey ||
          event.metaKey
        ) &&
        event.key ===
        "Enter"
      ) {

        postComment();

      }

    }
  );

}


/* =========================================================
   47. PROFILE PREVIEW CLICK
========================================================= */

const profilePreview =
  document.querySelector(
    ".profile-preview"
  );


if (profilePreview) {

  profilePreview.style.cursor =
    "pointer";


  profilePreview.addEventListener(
    "click",
    showProfile
  );

}


/* =========================================================
   48. PROFILE BUTTON IN JOURNEY
========================================================= */

const profileButton =
  document.getElementById(
    "profileButton"
  );


if (profileButton) {

  profileButton.addEventListener(
    "click",
    showProfile
  );

}


/* =========================================================
   49. ESCAPE KEY
========================================================= */

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

      return;

    }


    if (
      loginModal &&
      loginModal.classList.contains(
        "active"
      )
    ) {

      closeLoginModal();

    }

  }
);


/* =========================================================
   50. RESET GAME RESULT BUTTON HANDLER
   ---------------------------------------------------------
   Part 3A temporarily changes onclick for result screens.
   This makes sure normal gameplay works again afterwards.
========================================================= */

function resetNextButtonHandler() {

  if (!nextQuestion) {

    return;

  }


  nextQuestion.onclick =
    goToNextQuestion;

}


/* =========================================================
   51. REFRESH DAILY STATE
========================================================= */

function refreshDailyState() {

  resetDailyProgress();

  updateDashboard();

}


/* =========================================================
   52. INITIALIZATION
========================================================= */

refreshDailyState();

renderComments();

startCountdown();

updateLoginUI();


/* =========================================================
   53. DEVELOPMENT STATUS
========================================================= */

console.log(
  "NIJOK 3.0 Part 3B loaded successfully 🌿"
);

console.log(
  "Player:",
  player
);

console.log(
  "Game modes:",
  Object.keys(gameInfo)
);
