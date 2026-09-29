/* =========================================================
   NIJOK 2.0 — PART 2
   LOGIN • PROFILE • STATS • STORAGE • FOOD QUEST
   ========================================================= */

/* =========================
   1. STORAGE
   ========================= */

const NIJOK_STORAGE_KEY = "nijokUserData";

const defaultUserData = {
  name: "",
  loggedIn: false,
  score: 0,
  bestScore: 0,
  streak: 0,
  badges: [],
  completedToday: false,
  lastPlayedDate: "",
  todayQuestions: [],
  todayAnswered: 0
};

let userData = loadUserData();

function loadUserData() {
  try {
    const saved = localStorage.getItem(NIJOK_STORAGE_KEY);

    if (saved) {
      return {
        ...defaultUserData,
        ...JSON.parse(saved)
      };
    }
  } catch (error) {
    console.log("NIJOK storage error:", error);
  }

  return { ...defaultUserData };
}

function saveUserData() {
  localStorage.setItem(
    NIJOK_STORAGE_KEY,
    JSON.stringify(userData)
  );
}


/* =========================
   2. DATE SYSTEM
   ========================= */

function getTodayKey() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");
}


/* =========================
   3. DAILY RESET
   ========================= */

function prepareDailyGame() {

  const today = getTodayKey();

  if (userData.lastPlayedDate !== today) {

    userData.todayQuestions = [];
    userData.todayAnswered = 0;
    userData.completedToday = false;

    userData.lastPlayedDate = today;

    saveUserData();
  }
}


/* =========================
   4. FOOD QUESTION BANK
   TEMPORARY FOUNDATION
   ========================= */

const foodQuestions = [

  {
    question: "Which nutrient mainly provides energy to the body?",
    options: [
      "Carbohydrates",
      "Water",
      "Vitamins",
      "Minerals"
    ],
    answer: 0
  },

  {
    question: "Which vitamin is commonly associated with sunlight?",
    options: [
      "Vitamin C",
      "Vitamin D",
      "Vitamin B12",
      "Vitamin K"
    ],
    answer: 1
  },

  {
    question: "Which mineral is important for strong bones and teeth?",
    options: [
      "Iron",
      "Calcium",
      "Sodium",
      "Zinc"
    ],
    answer: 1
  },

  {
    question: "Which of these is a source of protein?",
    options: [
      "Lentils",
      "Sugar",
      "Salt",
      "Soft drink"
    ],
    answer: 0
  },

  {
    question: "What should you check first when reading a packaged food label?",
    options: [
      "Ingredients",
      "Package colour",
      "Advertisement",
      "Celebrity name"
    ],
    answer: 0
  },

  {
    question: "Which ingredient is a form of added sugar?",
    options: [
      "Glucose syrup",
      "Water",
      "Salt",
      "Citric acid"
    ],
    answer: 0
  },

  {
    question: "Which nutrient is important for normal body functions but does not provide calories?",
    options: [
      "Vitamins",
      "Sugar",
      "Fat",
      "Protein"
    ],
    answer: 0
  },

  {
    question: "Which food is naturally high in dietary fibre?",
    options: [
      "Whole grains",
      "Refined sugar",
      "Cooking oil",
      "Salt"
    ],
    answer: 0
  },

  {
    question: "What does a food ingredient list generally show?",
    options: [
      "Ingredients used in the product",
      "Only the price",
      "Only the brand history",
      "Only advertisements"
    ],
    answer: 0
  },

  {
    question: "Why is it useful to compare nutrition labels?",
    options: [
      "To understand differences between products",
      "To choose the biggest package",
      "To identify the brightest package",
      "To follow advertisements"
    ],
    answer: 0
  }

];


/* =========================
   5. DAILY QUESTION SELECTION
   ========================= */

function generateDailyQuestions() {

  prepareDailyGame();

  if (
    userData.todayQuestions &&
    userData.todayQuestions.length > 0
  ) {
    return;
  }

  const shuffled = [...foodQuestions]
    .map(value => ({
      value,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value);

  userData.todayQuestions = shuffled
    .slice(0, Math.min(20, shuffled.length))
    .map(question => ({
      ...question
    }));

  userData.todayAnswered = 0;
  userData.completedToday = false;

  saveUserData();
}


/* =========================
   6. GAME STATE
   ========================= */

let currentQuestionIndex = 0;
let currentGameScore = 0;
let selectedAnswer = null;


/* =========================
   7. OPEN GAME
   ========================= */

function openGame(gameName) {

  if (gameName === "food") {
    startFoodQuest();
    return;
  }

  alert(gameName + " game is coming soon 🌿");
}


/* =========================
   8. START FOOD QUEST
   ========================= */

function startFoodQuest() {

  prepareDailyGame();
  generateDailyQuestions();

  currentQuestionIndex = userData.todayAnswered;
  currentGameScore = 0;
  selectedAnswer = null;

  if (userData.completedToday) {
    showDailyComplete();
    return;
  }

  showFoodQuestion();
}


/* =========================
   9. SHOW QUESTION
   ========================= */

function showFoodQuestion() {

  const questions = userData.todayQuestions;

  if (!questions || questions.length === 0) {
    generateDailyQuestions();
  }

  if (currentQuestionIndex >= questions.length) {
    finishFoodQuest();
    return;
  }

  const question = questions[currentQuestionIndex];

  const questionNumber = currentQuestionIndex + 1;

  const message =
    "Food Quest 🌿\n\n" +
    "Question " +
    questionNumber +
    " / " +
    questions.length +
    "\n\n" +
    question.question +
    "\n\n" +
    question.options
      .map((option, index) =>
        `${index + 1}. ${option}`
      )
      .join("\n") +
    "\n\nEnter option number:";

  const answer = prompt(message);

  if (answer === null) {
    return;
  }

  const answerNumber = Number(answer);

  if (
    !Number.isInteger(answerNumber) ||
    answerNumber < 1 ||
    answerNumber > question.options.length
  ) {
    alert("Please select a valid option.");
    showFoodQuestion();
    return;
  }

  selectedAnswer = answerNumber - 1;

  answerFoodQuestion(selectedAnswer);
}


/* =========================
   10. ANSWER QUESTION
   ========================= */

function answerFoodQuestion(answerIndex) {

  const question =
    userData.todayQuestions[currentQuestionIndex];

  if (!question) {
    finishFoodQuest();
    return;
  }

  if (answerIndex === question.answer) {

    currentGameScore += 10;

    alert("Correct! 🌿 +10 points");

  } else {

    alert(
      "Not quite.\n\n" +
      "Correct answer: " +
      question.options[question.answer]
    );
  }

  currentQuestionIndex++;

  userData.todayAnswered = currentQuestionIndex;

  saveUserData();

  if (
    currentQuestionIndex >=
    userData.todayQuestions.length
  ) {

    finishFoodQuest();
    return;
  }

  showFoodQuestion();
}


/* =========================
   11. FINISH FOOD QUEST
   ========================= */

function finishFoodQuest() {

  userData.completedToday = true;

  userData.score += currentGameScore;

  if (currentGameScore > userData.bestScore) {
    userData.bestScore = currentGameScore;
  }

  updateStreak();

  checkBadges();

  saveUserData();

  showDailyComplete();
}


/* =========================
   12. DAILY COMPLETE
   ========================= */

function showDailyComplete() {

  alert(
    "🌿 NIJOK FOOD QUEST COMPLETE!\n\n" +
    "Today's Score: " +
    currentGameScore +
    "\n\n" +
    "Total Score: " +
    userData.score +
    "\n\n" +
    "Best Score: " +
    userData.bestScore +
    "\n\n" +
    "Come back tomorrow for your next Food Quest."
  );

  updateProfileUI();
}


/* =========================
   13. STREAK
   ========================= */

function updateStreak() {

  const lastDate =
    localStorage.getItem("nijokLastCompletedDate");

  const today = getTodayKey();

  if (lastDate === today) {
    return;
  }

  if (lastDate) {

    const previous = new Date(lastDate);
    const current = new Date(today);

    const difference =
      Math.round(
        (current - previous) /
        (1000 * 60 * 60 * 24)
      );

    if (difference === 1) {
      userData.streak += 1;
    } else {
      userData.streak = 1;
    }

  } else {

    userData.streak = 1;
  }

  localStorage.setItem(
    "nijokLastCompletedDate",
    today
  );
}


/* =========================
   14. BADGES
   ========================= */

function checkBadges() {

  if (
    userData.score >= 100 &&
    !userData.badges.includes("Food Explorer")
  ) {

    userData.badges.push("Food Explorer");

    alert("🏅 New Badge: Food Explorer!");
  }

  if (
    userData.streak >= 7 &&
    !userData.badges.includes("7 Day Learner")
  ) {

    userData.badges.push("7 Day Learner");

    alert("🏅 New Badge: 7 Day Learner!");
  }
}


/* =========================
   15. LOGIN / PROFILE
   ========================= */

function loginUser() {

  const name = prompt(
    "Welcome to NIJOK 🌿\n\nEnter your name:"
  );

  if (!name || !name.trim()) {
    return;
  }

  userData.name = name.trim();
  userData.loggedIn = true;

  saveUserData();

  updateProfileUI();

  alert(
    "Welcome to NIJOK, " +
    userData.name +
    "! 🌿"
  );
}


function logoutUser() {

  userData.loggedIn = false;

  saveUserData();

  updateProfileUI();

  alert("Logged out successfully.");
}


/* =========================
   16. PROFILE
   ========================= */

function showProfile() {

  if (!userData.loggedIn) {
    loginUser();
    return;
  }

  alert(
    "🌿 NIJOK PROFILE\n\n" +
    "Name: " +
    userData.name +
    "\n\n" +
    "Total Score: " +
    userData.score +
    "\n" +
    "Best Score: " +
    userData.bestScore +
    "\n" +
    "Streak: " +
    userData.streak +
    "\n\n" +
    "Badges: " +
    (
      userData.badges.length
        ? userData.badges.join(", ")
        : "No badges yet"
    )
  );
}


/* =========================
   17. UPDATE PROFILE UI
   ========================= */

function updateProfileUI() {

  const profileButtons =
    document.querySelectorAll(
      "[data-profile], .profile-btn, #profileBtn"
    );

  profileButtons.forEach(button => {

    if (userData.loggedIn) {

      button.textContent =
        userData.name;

    } else {

      button.textContent =
        "Login";
    }
  });
}


/* =========================
   18. GLOBAL BUTTON SUPPORT
   ========================= */

document.addEventListener(
  "click",
  function(event) {

    const target =
      event.target.closest(
        "[data-login], [data-profile]"
      );

    if (!target) {
      return;
    }

    if (userData.loggedIn) {
      showProfile();
    } else {
      loginUser();
    }
  }
);


/* =========================
   19. INITIALIZE
   ========================= */

prepareDailyGame();
updateProfileUI();

console.log(
  "NIJOK Part 2 JS loaded successfully 🌿"
);
