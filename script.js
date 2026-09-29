/* ============================================================
   NIJOK - FINAL WORKING SCRIPT
   Food • Culture • People • Places
   ============================================================ */

"use strict";

/* ============================================================
   1. QUESTION DATA - 50 QUESTIONS
   ============================================================ */

const QUESTIONS = [

  {
    q: "Which country is most closely associated with sushi?",
    options: ["Japan", "Mexico", "France", "Brazil"],
    answer: 0,
    fact: "Sushi is strongly associated with Japanese culinary tradition."
  },

  {
    q: "Paella is strongly associated with which country?",
    options: ["Spain", "India", "Canada", "Japan"],
    answer: 0,
    fact: "Paella is especially associated with Valencia in Spain."
  },

  {
    q: "Tacos are a famous food from which cuisine?",
    options: ["Mexican", "French", "Japanese", "Greek"],
    answer: 0,
    fact: "Tacos are an important part of Mexican food culture."
  },

  {
    q: "Kimchi is traditionally associated with which country?",
    options: ["South Korea", "Italy", "Brazil", "Egypt"],
    answer: 0,
    fact: "Kimchi is a traditional Korean fermented food."
  },

  {
    q: "Which country is strongly associated with baguettes?",
    options: ["France", "India", "China", "Brazil"],
    answer: 0,
    fact: "The baguette is strongly associated with French baking culture."
  },

  {
    q: "Biryani is especially popular in which cuisine?",
    options: ["Indian", "Norwegian", "Japanese", "Mexican"],
    answer: 0,
    fact: "India has many regional styles of biryani."
  },

  {
    q: "Pho is a famous dish from which country?",
    options: ["Vietnam", "Italy", "Turkey", "Australia"],
    answer: 0,
    fact: "Pho is a Vietnamese noodle soup."
  },

  {
    q: "Pesto is traditionally associated with which country?",
    options: ["Italy", "Canada", "Japan", "Morocco"],
    answer: 0,
    fact: "Pesto alla Genovese is associated with Genoa, Italy."
  },

  {
    q: "Injera is strongly associated with which country?",
    options: ["Ethiopia", "France", "Mexico", "Korea"],
    answer: 0,
    fact: "Injera is a fermented flatbread commonly made using teff."
  },

  {
    q: "What is the main ingredient traditionally used for couscous?",
    options: ["Semolina", "Cocoa", "Potato", "Cheese"],
    answer: 0,
    fact: "Traditional couscous is made from semolina."
  },

  {
    q: "Maple syrup is strongly associated with which country?",
    options: ["Canada", "India", "Spain", "Japan"],
    answer: 0,
    fact: "Canada is one of the world's major maple syrup producers."
  },

  {
    q: "Miso is commonly used in which cuisine?",
    options: ["Japanese", "Mexican", "Brazilian", "Greek"],
    answer: 0,
    fact: "Miso is a fermented paste commonly used in Japanese cooking."
  },

  {
    q: "Saffron comes from which part of a flower?",
    options: ["Stigmas", "Roots", "Leaves", "Seeds"],
    answer: 0,
    fact: "Saffron comes from the dried stigmas of Crocus sativus."
  },

  {
    q: "Vanilla comes from what type of plant?",
    options: ["Orchid", "Fern", "Grass", "Pine"],
    answer: 0,
    fact: "Vanilla comes from orchids in the Vanilla genus."
  },

  {
    q: "Chocolate is made from which plant product?",
    options: ["Cacao beans", "Rice", "Potatoes", "Olives"],
    answer: 0,
    fact: "Chocolate is made from products derived from cacao beans."
  },

  {
    q: "Which herb is traditionally used in pesto?",
    options: ["Basil", "Mint", "Coriander", "Rosemary"],
    answer: 0,
    fact: "Fresh basil is the signature herb in Genovese pesto."
  },

  {
    q: "Which compound gives turmeric its yellow color?",
    options: ["Curcumin", "Caffeine", "Menthol", "Lactose"],
    answer: 0,
    fact: "Curcumin is the major yellow pigment in turmeric."
  },

  {
    q: "True wasabi comes from which type of plant family?",
    options: ["Mustard family", "Rose family", "Palm family", "Grass family"],
    answer: 0,
    fact: "Wasabi belongs to the Brassicaceae, or mustard, family."
  },

  {
    q: "Paneer is what type of food?",
    options: ["Fresh cheese", "Bread", "Pickle", "Soup"],
    answer: 0,
    fact: "Paneer is a fresh, non-aged cheese."
  },

  {
    q: "Feta is traditionally associated with which country?",
    options: ["Greece", "Brazil", "Japan", "Canada"],
    answer: 0,
    fact: "Feta is a brined cheese strongly associated with Greek cuisine."
  },

  {
    q: "Mozzarella is traditionally associated with which country?",
    options: ["Italy", "China", "Mexico", "India"],
    answer: 0,
    fact: "Mozzarella is an Italian cheese."
  },

  {
    q: "Parmigiano Reggiano comes from which country?",
    options: ["Italy", "France", "Japan", "Brazil"],
    answer: 0,
    fact: "Parmigiano Reggiano is a famous Italian hard cheese."
  },

  {
    q: "Gouda cheese is associated with which country?",
    options: ["Netherlands", "India", "Mexico", "Vietnam"],
    answer: 0,
    fact: "Gouda is named after the Dutch city of Gouda."
  },

  {
    q: "Gnocchi is associated with which cuisine?",
    options: ["Italian", "Korean", "Moroccan", "Brazilian"],
    answer: 0,
    fact: "Gnocchi are Italian dumplings."
  },

  {
    q: "Ramen is strongly associated with which country?",
    options: ["Japan", "Spain", "Egypt", "Canada"],
    answer: 0,
    fact: "Ramen is an important part of modern Japanese food culture."
  },

  {
    q: "Dim sum is strongly associated with which cuisine?",
    options: ["Chinese", "French", "Brazilian", "Indian"],
    answer: 0,
    fact: "Dim sum includes many small dishes traditionally enjoyed with tea."
  },

  {
    q: "Falafel is commonly associated with which region?",
    options: ["Middle East", "Scandinavia", "South America", "Oceania"],
    answer: 0,
    fact: "Falafel is a popular Middle Eastern food made from ground legumes."
  },

  {
    q: "Dosa is a popular food from which cuisine?",
    options: ["Indian", "French", "Japanese", "Mexican"],
    answer: 0,
    fact: "Dosa is a South Indian fermented crepe."
  },

  {
    q: "Arepas are especially associated with which countries?",
    options: [
      "Colombia and Venezuela",
      "Japan and Korea",
      "France and Italy",
      "Egypt and Morocco"
    ],
    answer: 0,
    fact: "Arepas are staple foods in Colombian and Venezuelan cuisine."
  },

  {
    q: "Tagine is strongly associated with which country?",
    options: ["Morocco", "Japan", "Canada", "Greece"],
    answer: 0,
    fact: "Tagine is associated with North African cuisine, especially Morocco."
  },

  {
    q: "Feijoada is a famous dish from which country?",
    options: ["Brazil", "India", "Italy", "Korea"],
    answer: 0,
    fact: "Feijoada is a Brazilian black-bean stew."
  },

  {
    q: "Jollof rice is strongly associated with which region?",
    options: ["West Africa", "Northern Europe", "East Asia", "South America"],
    answer: 0,
    fact: "Jollof rice is popular across West Africa."
  },

  {
    q: "Satay is strongly associated with which country?",
    options: ["Indonesia", "France", "Canada", "Egypt"],
    answer: 0,
    fact: "Satay is a popular Indonesian food of skewered grilled meat."
  },

  {
    q: "Laksa is a popular dish from which region?",
    options: [
      "Southeast Asia",
      "South America",
      "Northern Europe",
      "West Africa"
    ],
    answer: 0,
    fact: "Laksa is found in several Southeast Asian cuisines."
  },

  {
    q: "Rendang is strongly associated with which country?",
    options: ["Indonesia", "France", "Mexico", "Canada"],
    answer: 0,
    fact: "Rendang is strongly associated with Indonesian cuisine."
  },

  {
    q: "Poutine is strongly associated with which country?",
    options: ["Canada", "India", "Japan", "Brazil"],
    answer: 0,
    fact: "Poutine is a Canadian dish of fries, cheese curds and gravy."
  },

  {
    q: "Gelato is strongly associated with which country?",
    options: ["Italy", "Mexico", "China", "Morocco"],
    answer: 0,
    fact: "Gelato is an Italian-style frozen dessert."
  },

  {
    q: "Mochi is a traditional food from which country?",
    options: ["Japan", "Brazil", "France", "India"],
    answer: 0,
    fact: "Mochi is traditionally made from glutinous rice."
  },

  {
    q: "Tiramisu is a famous dessert from which country?",
    options: ["Italy", "Canada", "Korea", "Morocco"],
    answer: 0,
    fact: "Tiramisu is an Italian dessert."
  },

  {
    q: "Masala chai is strongly associated with which country?",
    options: ["India", "Japan", "France", "Brazil"],
    answer: 0,
    fact: "Masala chai combines tea with milk, spices and sweetener."
  },

  {
    q: "Espresso is strongly associated with which country?",
    options: ["Italy", "Canada", "Mexico", "Australia"],
    answer: 0,
    fact: "Espresso developed as a distinct coffee tradition in Italy."
  },

  {
    q: "Matcha is what?",
    options: [
      "Powdered green tea",
      "Cheese",
      "Bread",
      "Soup"
    ],
    answer: 0,
    fact: "Matcha is finely ground green tea."
  },

  {
    q: "Kombucha is traditionally made by fermenting what?",
    options: [
      "Sweetened tea",
      "Potatoes",
      "Rice flour",
      "Cocoa beans"
    ],
    answer: 0,
    fact: "Kombucha is a fermented tea beverage."
  },

  {
    q: "What is the fifth commonly recognized basic taste?",
    options: ["Umami", "Spicy", "Smoky", "Minty"],
    answer: 0,
    fact: "Umami describes a savory taste."
  },

  {
    q: "What makes sourdough rise?",
    options: [
      "Yeast and bacteria",
      "Only salt",
      "Only sugar",
      "Oil"
    ],
    answer: 0,
    fact: "Sourdough starters contain wild yeasts and lactic-acid bacteria."
  },

  {
    q: "Which spice is actually tree bark?",
    options: ["Cinnamon", "Pepper", "Saffron", "Cardamom"],
    answer: 0,
    fact: "Cinnamon comes from the inner bark of several tree species."
  },

  {
    q: "Black pepper comes from which part of the plant?",
    options: ["Fruit", "Root", "Flower", "Leaf"],
    answer: 0,
    fact: "Black pepper is made from the dried fruit of Piper nigrum."
  },

  {
    q: "Ginger is botanically what?",
    options: ["Rhizome", "Flower", "Seed", "Bark"],
    answer: 0,
    fact: "The ginger used in cooking is a rhizome, an underground stem."
  },

  {
    q: "A potato is botanically classified as what?",
    options: ["Tuber", "Fruit", "Flower", "Seed"],
    answer: 0,
    fact: "A potato is a modified underground stem called a tuber."
  },

  {
    q: "Which food is made through fermentation of milk?",
    options: ["Yogurt", "Rice", "Apple", "Carrot"],
    answer: 0,
    fact: "Yogurt is produced by fermenting milk with bacterial cultures."
  },

  {
    q: "White chocolate mainly contains which cocoa component?",
    options: ["Cocoa butter", "Cocoa roots", "Cocoa leaves", "Cocoa shells"],
    answer: 0,
    fact: "White chocolate contains cocoa butter but not cocoa solids."
  },

  {
    q: "Which guide began as a travel guide created by a tire company?",
    options: [
      "Michelin Guide",
      "Oxford Guide",
      "World Food Guide",
      "Chef Guide"
    ],
    answer: 0,
    fact: "The Michelin Guide began as a travel guide created by Michelin."
  }

];


/* ============================================================
   2. DAILY FOOD FACTS - 50
   ============================================================ */

const DAILY_FACTS = [

  "Sushi has many regional styles across Japan.",
  "Saffron comes from the dried stigmas of a crocus flower.",
  "Vanilla comes from an orchid.",
  "Cocoa beans are fermented before being processed into chocolate.",
  "Umami is commonly described as the savory fifth basic taste.",
  "Paneer is a fresh cheese and is not aged like many hard cheeses.",
  "Miso is traditionally produced through fermentation.",
  "Kimchi is a traditional fermented Korean food.",
  "Injera is commonly made using teff flour.",
  "Couscous is traditionally made from semolina.",
  "Pesto alla Genovese is associated with Genoa, Italy.",
  "Mozzarella is made using a stretching technique.",
  "Feta is traditionally a brined cheese.",
  "Matcha is powdered green tea.",
  "Espresso developed as a distinct coffee tradition in Italy.",
  "Sourdough starters contain yeast and bacteria.",
  "Turmeric gets much of its yellow color from curcumin.",
  "True wasabi comes from the mustard family.",
  "Maple syrup is produced from maple tree sap.",
  "Olive oil is produced from the fruit of olive trees.",
  "Rice is a type of grass seed.",
  "Corn is a cereal grain.",
  "Chickpeas are legumes.",
  "Lentils belong to the legume family.",
  "Cardamom comes from seed pods.",
  "Cinnamon is made from tree bark.",
  "Black pepper comes from dried fruit.",
  "Nutmeg is a seed.",
  "Cloves are dried flower buds.",
  "Star anise is a dried fruit.",
  "Ginger is a rhizome.",
  "Garlic grows as a bulb.",
  "Onions are bulbs.",
  "Potatoes are underground tubers.",
  "Carrots are roots.",
  "Beets are roots.",
  "Spinach is a leafy vegetable.",
  "Avocado is botanically a fruit.",
  "Pineapple is a multiple fruit.",
  "Yogurt is produced through bacterial fermentation.",
  "Cheese production generally begins with milk.",
  "Pickles can be fermented or vinegar-pickled.",
  "White chocolate contains cocoa butter.",
  "Bread can rise through yeast fermentation.",
  "Tiramisu is an Italian dessert.",
  "Mochi is traditionally made from glutinous rice.",
  "Poutine is associated with Canadian cuisine.",
  "Jollof rice is popular across West Africa.",
  "Rendang is strongly associated with Indonesian cuisine.",
  "The Michelin Guide began as a travel guide from a tire company."

];


/* ============================================================
   3. STATE
   ============================================================ */

let gameState = {
  mode: "quiz",
  questions: [],
  current: 0,
  score: 0,
  answered: false,
  timer: null,
  timeLeft: 15
};


/* ============================================================
   4. DOM HELPERS
   ============================================================ */

function $(id) {
  return document.getElementById(id);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


/* ============================================================
   5. STORAGE
   ============================================================ */

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Storage error:", error);
  }
}

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}


/* ============================================================
   6. TOAST
   ============================================================ */

function showToast(message) {

  let box = $("nijokToast");

  if (!box) {

    box = document.createElement("div");

    box.id = "nijokToast";

    box.style.cssText = `
      position:fixed;
      left:50%;
      bottom:30px;
      transform:translateX(-50%);
      background:#173f2b;
      color:white;
      padding:13px 20px;
      border-radius:999px;
      z-index:99999;
      font-family:inherit;
      box-shadow:0 12px 30px rgba(0,0,0,.18);
      transition:.25s;
    `;

    document.body.appendChild(box);
  }

  box.textContent = message;
  box.style.opacity = "1";

  clearTimeout(box._timer);

  box._timer = setTimeout(() => {
    box.style.opacity = "0";
  }, 2500);
}


/* ============================================================
   7. SCORE
   ============================================================ */

function getScore() {
  return Number(load("nijokScore", 0)) || 0;
}

function setScore(score) {

  save("nijokScore", score);

  updateScoreUI();
  renderLeaderboard();
}

function addScore(points) {
  setScore(getScore() + points);
}

function getLevel(score) {

  if (score >= 1000) return "Food Master";
  if (score >= 700) return "Food Expert";
  if (score >= 400) return "Food Explorer";
  if (score >= 200) return "Food Learner";

  return "Curious Explorer";
}

function updateScoreUI() {

  const score = getScore();

  const total = $("totalScore");

  if (total) {
    total.textContent = score;
  }

  const level = $("level");

  if (level) {
    level.textContent = getLevel(score);
  }

  const progress = $("progressBar");

  if (progress) {
    progress.style.width = `${Math.min((score % 200) / 2, 100)}%`;
  }
}


/* ============================================================
   8. GAME OVERLAY
   ============================================================ */

function openGameOverlay() {

  const overlay = $("gameOverlay");

  if (!overlay) {
    console.error("gameOverlay not found");
    return;
  }

  overlay.classList.add("show");
  overlay.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}


function closeGameModal() {

  stopTimer();

  const overlay = $("gameOverlay");

  if (!overlay) return;

  overlay.classList.remove("show");
  overlay.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}


/* Make function available to existing HTML */
window.closeGameModal = closeGameModal;


/* ============================================================
   9. START GAME
   ============================================================ */

function startGame(mode) {

  stopTimer();

  gameState = {
    mode: mode || "quiz",
    questions: shuffle(QUESTIONS).slice(0, 10),
    current: 0,
    score: 0,
    answered: false,
    timer: null,
    timeLeft: 15
  };

  openGameOverlay();

  renderGame();
}


/* ============================================================
   10. GAME TITLES
   ============================================================ */

function gameInfo(mode) {

  const data = {

    quiz: {
      title: "Food Quiz",
      label: "NIJOK FOOD QUIZ",
      description: "Test your food knowledge around the world."
    },

    guess: {
      title: "Guess the Food",
      label: "GUESS THE FOOD",
      description: "Read the clue and discover the answer."
    },

    match: {
      title: "Match the Pair",
      label: "MATCH THE PAIR",
      description: "Connect the food with the correct clue."
    },

    time: {
      title: "Time Challenge",
      label: "TIME CHALLENGE",
      description: "Think fast. Learn faster."
    }

  };

  return data[mode] || data.quiz;
}


/* ============================================================
   11. RENDER GAME
   ============================================================ */

function renderGame() {

  const q = gameState.questions[gameState.current];

  if (!q) {
    finishGame();
    return;
  }

  const info = gameInfo(gameState.mode);

  const title = $("gameTitle");
  const description = $("gameDescription");
  const modeLabel = $("gameModeLabel");
  const question = $("gameQuestion");
  const answers = $("gameAnswers");
  const next = $("nextQuestion");

  if (title) title.textContent = info.title;

  if (description) {
    description.textContent = info.description;
  }

  if (modeLabel) {
    modeLabel.textContent =
      `${info.label} • ${gameState.current + 1}/10`;
  }

  if (next) {
    next.style.display = "none";
  }

  gameState.answered = false;

  if (question) {

    question.innerHTML = `
      <div style="
        font-size:13px;
        letter-spacing:.12em;
        text-transform:uppercase;
        opacity:.65;
        margin-bottom:12px;
      ">
        QUESTION ${gameState.current + 1} OF 10
      </div>

      <h3 style="
        font-size:clamp(22px,3vw,34px);
        margin:0;
      ">
        ${escapeHTML(q.q)}
      </h3>
    `;
  }

  if (answers) {

    answers.innerHTML = "";

    q.options.forEach((option, index) => {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "game-answer";
      button.textContent =
        `${String.fromCharCode(65 + index)}. ${option}`;

      button.addEventListener("click", () => {
        answerGame(index);
      });

      answers.appendChild(button);
    });
  }

  if (gameState.mode === "time") {
    startTimer();
  }
}


/* ============================================================
   12. ANSWER
   ============================================================ */

function answerGame(selected) {

  if (gameState.answered) return;

  gameState.answered = true;

  stopTimer();

  const q = gameState.questions[gameState.current];

  const buttons =
    document.querySelectorAll(".game-answer");

  buttons.forEach((button, index) => {

    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    }

    if (index === selected && selected !== q.answer) {
      button.classList.add("wrong");
    }
  });

  const correct = selected === q.answer;

  if (correct) {

    gameState.score += 10;

    addScore(10);

    showKnowledge(
      "Knowledge Gained! 🎉",
      `Correct! ${q.fact}`
    );

  } else {

    showKnowledge(
      "Keep Learning 🌱",
      `The correct answer is "${q.options[q.answer]}". ${q.fact}`
    );
  }

  const next = $("nextQuestion");

  if (next) {
    next.style.display = "block";
  }
}


/* ============================================================
   13. KNOWLEDGE POPUP
   ============================================================ */

function showKnowledge(title, text) {

  let overlay = $("knowledgePopup");

  if (!overlay) {

    overlay = document.createElement("div");

    overlay.id = "knowledgePopup";

    overlay.innerHTML = `
      <div class="knowledge-popup-box">

        <button
          id="knowledgePopupClose"
          type="button">
          ×
        </button>

        <div class="knowledge-icon">
          🌿
        </div>

        <span>KNOWLEDGE GAINED</span>

        <h2 id="knowledgePopupTitle"></h2>

        <p id="knowledgePopupText"></p>

        <button
          id="knowledgePopupContinue"
          type="button">
          Continue →
        </button>

      </div>
    `;

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      background:rgba(16,45,31,.55);
      backdrop-filter:blur(7px);
      z-index:100000;
    `;

    document.body.appendChild(overlay);

    const style = document.createElement("style");

    style.textContent = `
      .knowledge-popup-box{
        position:relative;
        width:min(500px,100%);
        background:#f8f1df;
        color:#173f2b;
        padding:38px;
        border-radius:28px;
        text-align:center;
        box-shadow:0 30px 80px rgba(0,0,0,.25);
      }

      .knowledge-popup-box button{
        cursor:pointer;
      }

      #knowledgePopupClose{
        position:absolute;
        right:16px;
        top:12px;
        border:0;
        background:none;
        font-size:30px;
        color:#173f2b;
      }

      .knowledge-icon{
        font-size:40px;
        margin-bottom:8px;
      }

      .knowledge-popup-box span{
        font-size:12px;
        letter-spacing:.16em;
        font-weight:700;
      }

      .knowledge-popup-box h2{
        margin:12px 0;
        font-size:30px;
      }

      .knowledge-popup-box p{
        line-height:1.7;
      }

      #knowledgePopupContinue{
        margin-top:16px;
        border:0;
        background:#173f2b;
        color:white;
        padding:13px 22px;
        border-radius:999px;
        font-weight:700;
      }
    `;

    document.head.appendChild(style);

    $("knowledgePopupClose").addEventListener(
      "click",
      () => {
        overlay.remove();
        nextGameQuestion();
      }
    );

    $("knowledgePopupContinue").addEventListener(
      "click",
      () => {
        overlay.remove();
        nextGameQuestion();
      }
    );
  }

  $("knowledgePopupTitle").textContent = title;
  $("knowledgePopupText").textContent = text;
}


/* ============================================================
   14. NEXT QUESTION
   ============================================================ */

function nextGameQuestion() {

  gameState.current++;

  if (gameState.current >= gameState.questions.length) {
    finishGame();
    return;
  }

  renderGame();
}


/* ============================================================
   15. NEXT BUTTON
   ============================================================ */

function setupNextButton() {

  const button = $("nextQuestion");

  if (!button) return;

  button.addEventListener("click", () => {

    if (!gameState.answered) {

      showToast("Answer the question first.");

      return;
    }

    nextGameQuestion();
  });
}


/* ============================================================
   16. TIMER
   ============================================================ */

function startTimer() {

  stopTimer();

  gameState.timeLeft = 15;

  updateTimerText();

  gameState.timer = setInterval(() => {

    gameState.timeLeft--;

    updateTimerText();

    if (gameState.timeLeft <= 0) {

      stopTimer();

      if (!gameState.answered) {
        timeUp();
      }
    }

  }, 1000);
}


function updateTimerText() {

  let timerElement = $("gameTimer");

  if (!timerElement) {

    timerElement = document.createElement("div");

    timerElement.id = "gameTimer";

    timerElement.style.cssText = `
      margin:15px 0;
      font-weight:800;
      color:#a3482c;
      text-align:center;
    `;

    const description = $("gameDescription");

    if (description) {
      description.after(timerElement);
    }
  }

  timerElement.textContent =
    `⏱ ${gameState.timeLeft} seconds`;
}


function stopTimer() {

  if (gameState.timer) {

    clearInterval(gameState.timer);

    gameState.timer = null;
  }

  const timer = $("gameTimer");

  if (timer) {
    timer.remove();
  }
}


function timeUp() {

  gameState.answered = true;

  const q = gameState.questions[gameState.current];

  const buttons =
    document.querySelectorAll(".game-answer");

  buttons.forEach((button, index) => {

    button.disabled = true;

    if (index === q.answer) {
      button.classList.add("correct");
    }
  });

  showKnowledge(
    "Time's Up! ⏰",
    `The correct answer is "${q.options[q.answer]}". ${q.fact}`
  );

  const next = $("nextQuestion");

  if (next) {
    next.style.display = "block";
  }
}


/* ============================================================
   17. GAME COMPLETE
   ============================================================ */

function finishGame() {

  stopTimer();

  const question = $("gameQuestion");
  const answers = $("gameAnswers");
  const next = $("nextQuestion");

  const correct =
    Math.round(gameState.score / 10);

  if (question) {

    question.innerHTML = `
      <div style="text-align:center;padding:20px 0">

        <div style="font-size:55px">
          🌿
        </div>

        <h2>
          Challenge Complete!
        </h2>

        <div style="
          font-size:46px;
          font-weight:800;
          margin:15px 0;
        ">
          ${gameState.score}
        </div>

        <p>
          You answered
          <strong>${correct}</strong>
          out of
          <strong>${gameState.questions.length}</strong>
          correctly.
        </p>

        <p>
          Current level:
          <strong>${getLevel(getScore())}</strong>
        </p>

      </div>
    `;
  }

  if (answers) {

    answers.innerHTML = "";

    const playAgain =
      document.createElement("button");

    playAgain.className = "game-answer";
    playAgain.textContent = "Play Again";

    playAgain.addEventListener("click", () => {
      startGame(gameState.mode);
    });

    answers.appendChild(playAgain);
  }

  if (next) {
    next.style.display = "none";
  }
}


/* ============================================================
   18. DAILY FACT
   ============================================================ */

function getDayOfYear() {

  const now = new Date();

  const start =
    new Date(now.getFullYear(), 0, 0);

  const difference =
    now - start;

  return Math.floor(
    difference / 86400000
  );
}


function getTodayFact() {

  const index =
    (getDayOfYear() - 1) % DAILY_FACTS.length;

  return {
    number: index + 1,
    text: DAILY_FACTS[index]
  };
}


function renderDailyFact() {

  const fact = getTodayFact();

  const number = $("factNumber");
  const title = $("dailyFactTitle");
  const text = $("dailyFactText");

  if (number) {
    number.textContent =
      String(fact.number).padStart(2, "0");
  }

  if (title) {
    title.textContent =
      "Do You Know?";
  }

  if (text) {
    text.textContent =
      fact.text;
  }
}


/* ============================================================
   19. DAILY FACT BUTTON
   ============================================================ */

function openFact() {

  const fact = getTodayFact();

  let overlay = $("factPopup");

  if (!overlay) {

    overlay = document.createElement("div");

    overlay.id = "factPopup";

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(16,45,31,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
      z-index:99999;
    `;

    overlay.innerHTML = `
      <div style="
        max-width:520px;
        width:100%;
        background:#f8f1df;
        color:#173f2b;
        padding:40px;
        border-radius:28px;
        position:relative;
        text-align:center;
      ">

        <button
          id="factPopupClose"
          style="
            position:absolute;
            right:16px;
            top:10px;
            border:0;
            background:none;
            font-size:30px;
            cursor:pointer;
          ">
          ×
        </button>

        <div style="font-size:44px">
          💡
        </div>

        <span style="
          font-size:12px;
          letter-spacing:.15em;
          font-weight:800;
        ">
          DAILY FOOD FACT
        </span>

        <h2 id="factPopupTitle"></h2>

        <p
          id="factPopupText"
          style="line-height:1.7">
        </p>

        <button
          id="factPopupOk"
          style="
            border:0;
            background:#173f2b;
            color:white;
            padding:13px 24px;
            border-radius:999px;
            cursor:pointer;
            font-weight:700;
          ">
          Got It
        </button>

      </div>
    `;

    document.body.appendChild(overlay);

    $("factPopupClose").onclick =
      () => overlay.remove();

    $("factPopupOk").onclick =
      () => overlay.remove();
  }

  $("factPopupTitle").textContent =
    `Food Fact #${fact.number}`;

  $("factPopupText").textContent =
    fact.text;
}


/* ============================================================
   20. REGISTER / LOGIN
   ============================================================ */

function openLogin() {

  const modal = $("loginModal");

  if (!modal) {
    showToast("Login window not found.");
    return;
  }

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}


function closeLogin() {

  const modal = $("loginModal");

  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}


function saveUser() {

  const name =
    $("loginName")?.value.trim();

  const email =
    $("loginEmail")?.value.trim();

  if (!name) {

    showToast("Please enter your name.");

    return;
  }

  const user = {
    name,
    email,
    type: "registered"
  };

  save("nijokUser", user);

  closeLogin();

  updateUserButton();

  showToast(
    `Welcome to NIJOK, ${name}!`
  );
}


function continueAsGuest() {

  save("nijokUser", {
    name: "Guest",
    email: "",
    type: "guest"
  });

  closeLogin();

  updateUserButton();

  showToast(
    "Guest mode activated."
  );
}


function updateUserButton() {

  const button =
    document.querySelector(
      "#guestBtn"
    );

  if (!button) return;

  const user =
    load("nijokUser", null);

  if (user?.name) {

    button.textContent =
      `◉ ${user.name}`;

  } else {

    button.textContent =
      "◉ Guest";
  }
}


/* ============================================================
   21. COMMUNITY COMMENTS
   ============================================================ */

function getComments() {

  return load(
    "nijokComments",
    [
      {
        name: "Food Explorer",
        text: "NIJOK makes learning about food really fun!"
      },
      {
        name: "Taste Traveller",
        text: "I learned something new today."
      }
    ]
  );
}


function renderComments() {

  const container =
    $("commentList");

  if (!container) return;

  const comments =
    getComments();

  container.innerHTML = "";

  comments
    .slice(-10)
    .reverse()
    .forEach(comment => {

      const item =
        document.createElement("div");

      item.className =
        "community-comment";

      item.innerHTML = `
        <strong>
          ${escapeHTML(comment.name)}
        </strong>

        <p>
          ${escapeHTML(comment.text)}
        </p>
      `;

      container.appendChild(item);
    });
}


function addComment() {

  const input =
    $("commentInput");

  if (!input) return;

  const text =
    input.value.trim();

  if (!text) {

    showToast(
      "Write something before posting."
    );

    return;
  }

  const user =
    load("nijokUser", {
      name: "Guest"
    });

  const comments =
    getComments();

  comments.push({
    name: user.name || "Guest",
    text
  });

  save(
    "nijokComments",
    comments
  );

  input.value = "";

  renderComments();

  showToast(
    "Your comment was added!"
  );
}


/* ============================================================
   22. LEADERBOARD
   ============================================================ */

function renderLeaderboard() {

  const container =
    $("leaderboardList");

  if (!container) return;

  const userScore =
    getScore();

  const players = [

    {
      name: "Food Explorer",
      score: 980
    },

    {
      name: "Taste Traveller",
      score: 760
    },

    {
      name: "Spice Hunter",
      score: 620
    },

    {
      name: "You",
      score: userScore
    }

  ];

  players.sort(
    (a, b) => b.score - a.score
  );

  container.innerHTML = "";

  players.forEach(
    (player, index) => {

      const row =
        document.createElement("div");

      row.className =
        "leaderboard-row";

      row.innerHTML = `
        <span>
          ${index + 1}
        </span>

        <strong>
          ${escapeHTML(player.name)}
        </strong>

        <b>
          ${player.score}
        </b>
      `;

      container.appendChild(row);
    }
  );
}


/* ============================================================
   23. HOW IT WORKS
   ============================================================ */

function showHowItWorks() {

  let modal =
    $("howPopup");

  if (!modal) {

    modal =
      document.createElement("div");

    modal.id =
      "howPopup";

    modal.style.cssText = `
      position:fixed;
      inset:0;
      z-index:99999;
      background:rgba(16,45,31,.55);
      display:flex;
      align-items:center;
      justify-content:center;
      padding:20px;
    `;

    modal.innerHTML = `
      <div style="
        background:#f8f1df;
        color:#173f2b;
        width:min(600px,100%);
        padding:40px;
        border-radius:30px;
        position:relative;
      ">

        <button
          id="howPopupClose"
          style="
            position:absolute;
            right:18px;
            top:12px;
            border:0;
            background:none;
            font-size:30px;
            cursor:pointer;
          ">
          ×
        </button>

        <span style="
          font-size:12px;
          letter-spacing:.15em;
          font-weight:800;
        ">
          HOW IT WORKS
        </span>

        <h2>
          Play. Learn. Discover Food.
        </h2>

        <div style="
          display:grid;
          gap:18px;
          line-height:1.6;
        ">

          <div>
            <strong>01 · Choose</strong>
            <br>
            Pick a food challenge.
          </div>

          <div>
            <strong>02 · Answer</strong>
            <br>
            Select the answer you think is correct.
          </div>

          <div>
            <strong>03 · Learn</strong>
            <br>
            After every answer, NIJOK shows a knowledge fact.
          </div>

          <div>
            <strong>04 · Earn</strong>
            <br>
            Correct answers give you knowledge points.
          </div>

          <div>
            <strong>05 · Explore</strong>
            <br>
            Discover daily food facts and community comments.
          </div>

        </div>

        <button
          id="howStartButton"
          style="
            margin-top:24px;
            border:0;
            background:#173f2b;
            color:white;
            padding:14px 24px;
            border-radius:999px;
            cursor:pointer;
            font-weight:700;
          ">
          Start Playing →
        </button>

      </div>
    `;

    document.body.appendChild(modal);

    $("howPopupClose").onclick =
      () => modal.remove();

    $("howStartButton").onclick =
      () => {
        modal.remove();
        startGame("quiz");
      };
  }
}


/* ============================================================
   24. SEARCH
   ============================================================ */

function searchNIJOK() {

  const query =
    prompt(
      "What would you like to explore?\n\nTry: food, museum, map, countries, learn, quiz"
    );

  if (!query) return;

  const term =
    query.toLowerCase().trim();

  const sections =
    [...document.querySelectorAll(
      "section, main > div"
    )];

  const match =
    sections.find(section =>
      section.innerText
        ?.toLowerCase()
        .includes(term)
    );

  if (match) {

    match.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    showToast(
      `Found: ${query}`
    );

  } else {

    showToast(
      `No result found for "${query}".`
    );
  }
}


/* ============================================================
   25. MOBILE MENU
   ============================================================ */

function toggleMobileMenu() {

  const nav =
    document.querySelector(
      ".main-nav"
    );

  if (!nav) return;

  nav.classList.toggle(
    "mobile-open"
  );

  const open =
    nav.classList.contains(
      "mobile-open"
    );

  if (open) {

    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.position = "absolute";
    nav.style.top = "80px";
    nav.style.left = "20px";
    nav.style.right = "20px";
    nav.style.padding = "20px";
    nav.style.background = "#f8f1df";
    nav.style.borderRadius = "20px";
    nav.style.zIndex = "9999";

  } else {

    nav.removeAttribute("style");
  }
}


/* ============================================================
   26. LANGUAGE
   ============================================================ */

function toggleLanguage() {

  const button =
    $("langBtn");

  if (!button) return;

  const hindi =
    button.dataset.language !== "hi";

  button.dataset.language =
    hindi ? "hi" : "en";

  button.textContent =
    hindi ? "◉ HI⌄" : "◉ EN⌄";

  showToast(
    hindi
      ? "Hindi language selected."
      : "English language selected."
  );
}


/* ============================================================
   27. HTML ESCAPE
   ============================================================ */

function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* ============================================================
   28. EVENT CONNECTIONS
   ============================================================ */

function setupEvents() {

  /* Start / game buttons */

  document
    .querySelectorAll("[data-game]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          startGame(
            button.dataset.game
          );

        }
      );

    });


  /* Game close */

  $("closeGame")?.addEventListener(
    "click",
    closeGameModal
  );


  /* Next */

  setupNextButton();


  /* Login / register */

  $("registerBtn")?.addEventListener(
    "click",
    openLogin
  );


  $("loginButton")?.addEventListener(
    "click",
    saveUser
  );


  /* Guest */

  $("guestBtn")?.addEventListener(
    "click",
    continueAsGuest
  );


  /* Search */

  $("searchBtn")?.addEventListener(
    "click",
    searchNIJOK
  );


  /* Language */

  $("langBtn")?.addEventListener(
    "click",
    toggleLanguage
  );


  /* Menu */

  $("menuBtn")?.addEventListener(
    "click",
    toggleMobileMenu
  );


  /* How it works */

  $("howBtn")?.addEventListener(
    "click",
    showHowItWorks
  );


  /* Daily fact */

  $("factBtn")?.addEventListener(
    "click",
    openFact
  );


  /* Comments */

  $("commentBtn")?.addEventListener(
    "click",
    addComment
  );


  /* Close login */

  document
    .querySelectorAll(
      "#loginModal .close-modal"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closeLogin
      );

    });


  /* Click outside login */

  $("loginModal")?.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        $("loginModal")
      ) {
        closeLogin();
      }

    }
  );


  /* Escape */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      ) return;

      closeGameModal();
      closeLogin();

      $("factPopup")?.remove();
      $("howPopup")?.remove();
      $("knowledgePopup")?.remove();
    }
  );
}


/* ============================================================
   29. INITIALIZE
   ============================================================ */

function initializeNIJOK() {

  updateScoreUI();

  updateUserButton();

  renderDailyFact();

  renderComments();

  renderLeaderboard();

  setupEvents();

  console.log(
    "NIJOK initialized successfully."
  );
}


if (
  document.readyState ===
  "loading"
) {

 // =====================================
// PLAY BUTTON FIX
// =====================================

function openGame(type) {
  startGame(type);
}

// Make it available to HTML onclick=""
window.openGame = openGame; document.addEventListener(
    "DOMContentLoaded",
    initializeNIJOK
  );

} else {

  initializeNIJOK();
}
