/* =========================================================
   NIJOK - FINAL WORKING JAVASCRIPT
   Replace your complete script.js
   ========================================================= */

(() => {
  "use strict";

  const START_DATE = "2026-09-29";

  const STORAGE = {
    score: "nijok_score",
    completed: "nijok_daily_completed",
    user: "nijokUser",
    guest: "nijokGuest"
  };

  let currentMode = "";
  let currentItems = [];
  let currentQuestion = 0;
  let currentScore = 0;
  let answerLocked = false;
  let timerInterval = null;
  let timeLeft = 30;

  /* =========================================================
     HELPERS
     ========================================================= */

  const $ = id => document.getElementById(id);

  function getScore() {
    return Number(localStorage.getItem(STORAGE.score) || 0);
  }

  function setScore(value) {
    localStorage.setItem(STORAGE.score, String(value));
    updateScoreDisplay();
  }

  function addScore(value) {
    setScore(getScore() + value);
  }

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function dayIndex(total) {
    const start = new Date(START_DATE + "T00:00:00");
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const days = Math.floor(
      (today.getTime() - start.getTime()) / 86400000
    );

    return ((days % total) + total) % total;
  }

  function photoUrl(food) {
    return (
      "https://loremflickr.com/1000/650/" +
      encodeURIComponent(food) +
      "?lock=" +
      encodeURIComponent(food)
    );
  }

  function toast(message) {
    const toastBox = $("toast");

    if (!toastBox) {
      alert(message);
      return;
    }

    toastBox.textContent = message;
    toastBox.classList.add("show");

    clearTimeout(window.nijokToastTimer);

    window.nijokToastTimer = setTimeout(() => {
      toastBox.classList.remove("show");
    }, 2200);
  }

  /* =========================================================
     MODALS
     ========================================================= */

  function openModal(id) {
    const modal = $(id);

    if (!modal) {
      console.error("NIJOK modal not found:", id);
      return;
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    const modal = $(id);

    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  function openGame() {
    openModal("gameModal");
  }

  function closeGame() {
    stopTimer();
    closeModal("gameModal");
    answerLocked = false;
  }

  window.openGame = openGame;
  window.closeGame = closeGame;

  /* =========================================================
     GAME HEADER
     ========================================================= */

  function setGameHeader(title, description, mode) {

    if ($("gameMode")) {
      $("gameMode").textContent = mode || "";
    }

    if ($("gameTitle")) {
      $("gameTitle").textContent = title || "";
    }

    if ($("gameDescription")) {
      $("gameDescription").textContent = description || "";
    }
  }

  function resetGame() {

    if ($("gameQuestion")) {
      $("gameQuestion").innerHTML = "";
    }

    if ($("gameAnswers")) {
      $("gameAnswers").innerHTML = "";
    }

    if ($("nextBtn")) {
      $("nextBtn").style.display = "none";
    }

    if ($("gameProgress")) {
      $("gameProgress").style.width = "0%";
    }

    if ($("gameScore")) {
      $("gameScore").textContent = "0";
    }
  }

  function updateCounter() {

    if ($("questionCounter")) {
      $("questionCounter").textContent =
        currentItems.length
          ? `Question ${currentQuestion + 1} of ${currentItems.length}`
          : "";
    }

    if ($("gameProgress")) {

      const percentage =
        currentItems.length
          ? ((currentQuestion + 1) / currentItems.length) * 100
          : 0;

      $("gameProgress").style.width = percentage + "%";
    }

    if ($("gameScore")) {
      $("gameScore").textContent = currentScore;
    }
  }

  /* =========================================================
     DATA
     ========================================================= */

  const FOOD_ITEMS = [
    ["Pizza", "Italy"],
    ["Sushi", "Japan"],
    ["Tacos", "Mexico"],
    ["Biryani", "India"],
    ["Croissant", "France"],
    ["Paella", "Spain"],
    ["Ramen", "Japan"],
    ["Kimchi", "South Korea"],
    ["Pho", "Vietnam"],
    ["Moussaka", "Greece"],
    ["Couscous", "Morocco"],
    ["Feijoada", "Brazil"],
    ["Goulash", "Hungary"],
    ["Pad Thai", "Thailand"],
    ["Poutine", "Canada"],
    ["Lasagna", "Italy"],
    ["Dosa", "India"],
    ["Idli", "India"],
    ["Gulab Jamun", "India"],
    ["Baklava", "Turkey"],
    ["Tiramisu", "Italy"],
    ["Gelato", "Italy"],
    ["Pretzel", "Germany"],
    ["Fondue", "Switzerland"],
    ["Pierogi", "Poland"],
    ["Ceviche", "Peru"],
    ["Jollof Rice", "West Africa"],
    ["Injera", "Ethiopia"],
    ["Nasi Goreng", "Indonesia"],
    ["Satay", "Indonesia"],
    ["Laksa", "Malaysia"],
    ["Adobo", "Philippines"],
    ["Bibimbap", "South Korea"],
    ["Bulgogi", "South Korea"],
    ["Tempura", "Japan"],
    ["Takoyaki", "Japan"],
    ["Dim Sum", "China"],
    ["Banh Mi", "Vietnam"],
    ["Kebab", "Turkey"],
    ["Koshari", "Egypt"],
    ["Arepa", "Venezuela"],
    ["Hummus", "Middle East"],
    ["Tagine", "Morocco"],
    ["Churros", "Spain"],
    ["Schnitzel", "Austria"],
    ["Risotto", "Italy"],
    ["Carbonara", "Italy"],
    ["Focaccia", "Italy"],
    ["Mango Sticky Rice", "Thailand"],
    ["Fish and Chips", "United Kingdom"],
    ["Butter Chicken", "India"],
    ["Samosa", "India"],
    ["Tom Yum", "Thailand"],
    ["Green Curry", "Thailand"],
    ["Okonomiyaki", "Japan"],
    ["Udon", "Japan"],
    ["Miso Soup", "Japan"],
    ["Spring Rolls", "China"],
    ["Hot Pot", "China"],
    ["Doner Kebab", "Turkey"],
    ["Menemen", "Turkey"],
    ["Harira", "Morocco"],
    ["Mansaf", "Jordan"],
    ["Kabsa", "Saudi Arabia"],
    ["Ful Medames", "Egypt"],
    ["Bacalhau", "Portugal"],
    ["Quiche", "France"],
    ["Coq au Vin", "France"],
    ["Arancini", "Italy"],
    ["Ravioli", "Italy"],
    ["Pavlova", "Australia"],
    ["Hangi", "New Zealand"],
    ["Meat Pie", "Australia"],
    ["Larb", "Laos"],
    ["Chole Bhature", "India"],
    ["Pani Puri", "India"],
    ["Rajma Chawal", "India"],
    ["Bunny Chow", "South Africa"],
    ["Bobotie", "South Africa"],
    ["Doro Wat", "Ethiopia"],
    ["Lomo Saltado", "Peru"],
    ["Lechon", "Philippines"],
    ["Mandu", "South Korea"],
    ["Xiaolongbao", "China"],
    ["Mapo Tofu", "China"],
    ["Kung Pao Chicken", "China"],
    ["Bun Cha", "Vietnam"],
    ["Goi Cuon", "Vietnam"],
    ["Pastel de Nata", "Portugal"],
    ["Escargot", "France"],
    ["Wiener Schnitzel", "Austria"],
    ["Char Kway Teow", "Singapore"],
    ["Hainanese Chicken Rice", "Singapore"],
    ["Rendang", "Indonesia"],
    ["Gnocchi", "Italy"],
    ["Ratatouille", "France"],
    ["Falafel", "Middle East"],
    ["Naan", "India"]
  ];

  const TODAY_CHALLENGE = FOOD_ITEMS.map(item => [
    item[0],
    item[1],
    `Which country is ${item[0]} traditionally associated with?`
  ]);

  const FOOD_FACTS = [
    ["Pizza", "Pizza has countless regional variations around the world.", "Italy"],
    ["Sushi", "Traditional sushi developed in Japan and has many styles.", "Japan"],
    ["Biryani", "Biryani has many regional versions across South Asia.", "South Asia"],
    ["Chocolate", "Cacao was consumed as a drink in Mesoamerica.", "Mesoamerica"],
    ["Tea", "Tea is one of the world's most widely consumed beverages.", "Asia"],
    ["Coffee", "Coffee culture has developed differently across countries.", "Global"],
    ["Kimchi", "Kimchi refers to a broad family of fermented vegetable dishes.", "Korea"],
    ["Couscous", "Couscous is important across North African cuisines.", "North Africa"],
    ["Pasta", "Italy has hundreds of different pasta shapes.", "Italy"],
    ["Tacos", "Tacos vary greatly by region in Mexico.", "Mexico"],
    ["Pho", "Pho is known for aromatic broth, rice noodles and herbs.", "Vietnam"],
    ["Paella", "Traditional paella is associated with Valencia.", "Spain"],
    ["Miso", "Miso is a fermented paste commonly made from soybeans and koji.", "Japan"],
    ["Olive Oil", "Olive oil has been important around the Mediterranean for thousands of years.", "Mediterranean"],
    ["Naan", "Naan is found in several Central and South Asian cuisines.", "South Asia"],
    ["Falafel", "Falafel is commonly made from ground legumes and herbs.", "Middle East"],
    ["Mango", "Mango has been cultivated in South Asia for thousands of years.", "South Asia"],
    ["Vanilla", "Vanilla comes from an orchid.", "Mesoamerica"],
    ["Saffron", "Saffron comes from the dried stigmas of the saffron crocus.", "West Asia"],
    ["Cinnamon", "Cinnamon comes from the inner bark of certain trees.", "Asia"],
    ["Wasabi", "Authentic wasabi is made from a Japanese plant rhizome.", "Japan"],
    ["Maple Syrup", "Maple syrup is strongly associated with Canada.", "Canada"],
    ["Poutine", "Poutine combines fries, cheese curds and gravy.", "Canada"],
    ["Gelato", "Gelato generally contains less air than many commercial ice creams.", "Italy"],
    ["Croissant", "The modern croissant is strongly associated with French baking.", "France"],
    ["Ceviche", "Ceviche uses seafood prepared with acidic citrus juice.", "Latin America"],
    ["Injera", "Injera is a spongy fermented flatbread.", "East Africa"],
    ["Jollof Rice", "Jollof rice has many regional styles in West Africa.", "West Africa"],
    ["Nasi Goreng", "Nasi goreng means fried rice in Indonesian.", "Indonesia"],
    ["Ramen", "Ramen developed into many regional styles in Japan.", "Japan"],
    ["Dosa", "Dosa batter is traditionally fermented.", "India"],
    ["Idli", "Idli is a steamed fermented food.", "India"],
    ["Gulab Jamun", "Gulab jamun is a popular South Asian sweet.", "South Asia"],
    ["Baklava", "Baklava uses layered pastry, nuts and sweet syrup.", "West Asia"],
    ["Tiramisu", "Tiramisu is a coffee-flavored Italian dessert.", "Italy"],
    ["Pretzel", "Pretzels have a long history in European baking.", "Europe"],
    ["Fondue", "Fondue is strongly associated with Swiss food culture.", "Switzerland"],
    ["Empanada", "Empanadas are found across Latin America and beyond.", "Latin America"],
    ["Arepa", "Arepas are especially important in Colombia and Venezuela.", "South America"],
    ["Kebab", "Kebab describes many different grilled and cooked dishes.", "West Asia"],
    ["Hummus", "Hummus traditionally includes chickpeas, tahini, lemon and garlic.", "Middle East"],
    ["Tagine", "Tagine refers to both a cooking vessel and dishes cooked in it.", "Morocco"],
    ["Koshari", "Koshari combines rice, pasta, lentils and chickpeas.", "Egypt"],
    ["Dim Sum", "Dim sum includes many small dishes traditionally enjoyed with tea.", "China"],
    ["Bibimbap", "Bibimbap combines rice with vegetables and other toppings.", "Korea"],
    ["Satay", "Satay consists of skewered pieces of meat.", "Southeast Asia"],
    ["Tempura", "Tempura is known for its light, crisp batter.", "Japan"],
    ["Churros", "Churros are fried dough pastries.", "Spain"],
    ["Pancake", "Versions of pancakes exist around the world.", "Global"],
    ["Honey", "Honey has been used as food and sweetener for thousands of years.", "Global"]
  ];

  /* =========================================================
     ANSWER BUTTON
     ========================================================= */

  function addAnswer(text, correct, callback) {

    const box = $("gameAnswers");

    if (!box) return;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "game-answer";
    button.textContent = text;

    button.addEventListener("click", () => {

      if (answerLocked) return;

      answerLocked = true;

      box.querySelectorAll("button").forEach(btn => {
        btn.disabled = true;
      });

      if (correct) {

        button.classList.add("correct");

        currentScore++;

        toast("Correct! 🌿");

      } else {

        button.classList.add("wrong");

        toast("Not quite — keep learning!");

      }

      if ($("gameScore")) {
        $("gameScore").textContent = currentScore;
      }

      if (callback) {
        callback(correct);
      }

    });

    box.appendChild(button);
  }

  function countryOptions(correct) {

    const countries = [
      "Italy",
      "Japan",
      "Mexico",
      "India",
      "France",
      "China",
      "Thailand",
      "Spain",
      "Turkey",
      "Brazil",
      "South Korea",
      "Vietnam",
      "Greece",
      "Canada",
      "Germany",
      "Portugal",
      "Peru",
      "Egypt",
      "Indonesia",
      "Morocco",
      "Australia",
      "Poland"
    ];

    return shuffle([
      correct,
      ...countries.filter(x => x !== correct)
    ]).slice(0, 4);
  }

  /* =========================================================
     TODAY'S CHALLENGE
     ========================================================= */

  function showTodayChallenge() {

    const item =
      TODAY_CHALLENGE[
        dayIndex(TODAY_CHALLENGE.length)
      ];

    currentMode = "Today's Challenge";
    currentItems = [item];
    currentQuestion = 0;
    currentScore = 0;
    answerLocked = false;

    setGameHeader(
      "Today's Challenge",
      "One photo. One question. Complete the challenge and earn 10 points.",
      "TODAY"
    );

    resetGame();

    const food = item[0];
    const country = item[1];
    const question = item[2];

    $("gameQuestion").innerHTML = `
      <img
        class="nijok-game-photo"
        src="${photoUrl(food)}"
        alt="${food}"
      >

      <div class="nijok-day-label">
        DAY ${dayIndex(100) + 1} / 100
      </div>

      <h3>${question}</h3>

      <p class="nijok-points">
        Complete the challenge = +10 points
      </p>
    `;

    countryOptions(country).forEach(option => {

      addAnswer(
        option,
        option === country,
        () => {

          $("nextBtn").style.display = "block";

          $("nextBtn").textContent =
            "Finish Challenge";

          $("nextBtn").onclick =
            finishDailyChallenge;

        }
      );

    });

    updateCounter();

    openGame();
  }

  function finishDailyChallenge() {

    const today =
      new Date().toISOString().slice(0, 10);

    const completed =
      localStorage.getItem(STORAGE.completed);

    if (completed !== today) {

      localStorage.setItem(
        STORAGE.completed,
        today
      );

      addScore(10);
    }

    $("gameQuestion").innerHTML = `
      <div class="nijok-complete">

        <div class="nijok-complete-icon">
          🎉
        </div>

        <h3>
          Today's Challenge Complete!
        </h3>

        <p>You earned</p>

        <strong class="nijok-big-points">
          10 Points
        </strong>

        <p>
          Come back tomorrow for a new photo and question.
        </p>

      </div>
    `;

    $("gameAnswers").innerHTML = "";

    $("nextBtn").style.display = "none";

    updateScoreDisplay();
  }

  /* =========================================================
     DO YOU KNOW
     ========================================================= */

  function showFact() {

    const item =
      FOOD_FACTS[
        dayIndex(FOOD_FACTS.length)
      ];

    currentMode = "Do You Know?";

    setGameHeader(
      "Do You Know?",
      "One beautiful food fact from around the world.",
      "DAILY FACT"
    );

    resetGame();

    $("gameQuestion").innerHTML = `

      <img
        class="nijok-game-photo"
        src="${photoUrl(item[0])}"
        alt="${item[0]}"
      >

      <div class="nijok-day-label">
        DAY ${dayIndex(50) + 1} / 50
      </div>

      <h3>
        Did You Know?
      </h3>

      <h4>
        ${item[0]}
      </h4>

      <p>
        ${item[1]}
      </p>

      <div class="nijok-fact-box">
        🌍 ${item[2]}
      </div>
    `;

    $("gameAnswers").innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="factContinue"
      >
        Nice! Explore More
      </button>
    `;

    $("factContinue").onclick = closeGame;

    openGame();
  }

  /* =========================================================
     FOOD MUSEUM
     ========================================================= */

  function showMuseum() {

    const item =
      FOOD_ITEMS[
        dayIndex(FOOD_ITEMS.length)
      ];

    setGameHeader(
      "Food Museum",
      "Discover today's famous or unique dish.",
      "FOOD MUSEUM"
    );

    resetGame();

    $("gameQuestion").innerHTML = `

      <img
        class="nijok-game-photo"
        src="${photoUrl(item[0])}"
        alt="${item[0]}"
      >

      <div class="nijok-day-label">
        DAY ${dayIndex(50) + 1} / 50
      </div>

      <h3>
        ${item[0]}
      </h3>

      <p>
        <strong>Origin:</strong>
        ${item[1]}
      </p>

      <p>
        <strong>Food Culture:</strong>
        A famous food associated with ${item[1]}.
      </p>

      <div class="nijok-fact-box">
        Discover the story and culture behind ${item[0]}.
      </div>
    `;

    $("gameAnswers").innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="museumContinue"
      >
        Continue Exploring
      </button>
    `;

    $("museumContinue").onclick = closeGame;

    openGame();
  }

  /* =========================================================
     EXPLORE FOOD
     ========================================================= */

  function showExplore() {

    const item =
      FOOD_ITEMS[
        dayIndex(FOOD_ITEMS.length)
      ];

    setGameHeader(
      "Explore Food",
      "Explore one place, one food and its story.",
      "EXPLORE FOOD"
    );

    resetGame();

    $("gameQuestion").innerHTML = `

      <img
        class="nijok-game-photo"
        src="${photoUrl(item[1] + " food")}"
        alt="${item[1]}"
      >

      <div class="nijok-day-label">
        DAY ${dayIndex(100) + 1} / 100
      </div>

      <h3>
        📍 ${item[1]}
      </h3>

      <p>
        <strong>Famous Food:</strong>
        ${item[0]}
      </p>

      <p>
        <strong>Main Ingredients:</strong>
        Traditional ingredients
      </p>

      <div class="nijok-fact-box">
        Explore the food culture of ${item[1]}.
      </div>
    `;

    $("gameAnswers").innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="exploreContinue"
      >
        Explore Another Place
      </button>
    `;

    $("exploreContinue").onclick = closeGame;

    openGame();
  }

  /* =========================================================
     FOOD QUIZ - 500 QUESTIONS
     ========================================================= */

  function buildQuizBank() {

    const bank = [];

    FOOD_ITEMS.forEach(([food, country]) => {

      bank.push(
        {
          question:
            `Which country is ${food} associated with?`,
          answer: country
        },

        {
          question:
            `Where would you most likely find traditional ${food}?`,
          answer: country
        },

        {
          question:
            `Which food is associated with ${country}?`,
          answer: food
        },

        {
          question:
            `Which dish is a famous part of ${country} food culture?`,
          answer: food
        },

        {
          question:
            `Identify the food associated with ${country}.`,
          answer: food
        },

        {
          question:
            `Which country is known for ${food}?`,
          answer: country
        },

        {
          question:
            `${food} belongs to which cuisine?`,
          answer: country
        },

        {
          question:
            `Which traditional food is represented by ${food}?`,
          answer: food
        },

        {
          question:
            `Food clue: ${country}. What food fits?`,
          answer: food
        },

        {
          question:
            `Food clue: ${food}. Which place fits?`,
          answer: country
        }
      );

    });

    return bank.slice(0, 500);
  }

  const QUIZ_BANK = buildQuizBank();

  function startQuiz() {

    currentMode = "Food Quiz";

    currentItems =
      shuffle(QUIZ_BANK).slice(0, 10);

    currentQuestion = 0;
    currentScore = 0;
    answerLocked = false;

    setGameHeader(
      "Food Quiz",
      "Test your food and culture knowledge.",
      "FOOD QUIZ"
    );

    openGame();

    renderQuizQuestion();
  }

  function renderQuizQuestion() {

    if (
      currentQuestion >=
      currentItems.length
    ) {
      return finishGame(
        "Food Quiz Complete!"
      );
    }

    answerLocked = false;

    const item =
      currentItems[currentQuestion];

    const possible = FOOD_ITEMS.flatMap(
      x => [x[0], x[1]]
    );

    const options =
      shuffle([
        item.answer,
        ...shuffle(
          possible.filter(
            x => x !== item.answer
          )
        )
      ])
      .filter(
        (x, i, arr) =>
          arr.indexOf(x) === i
      )
      .slice(0, 4);

    $("gameQuestion").innerHTML = `
      <h3>
        ${item.question}
      </h3>
    `;

    $("gameAnswers").innerHTML = "";

    options.forEach(option => {

      addAnswer(
        option,
        option === item.answer,
        () => {

          $("nextBtn").style.display =
            "block";

          $("nextBtn").textContent =
            currentQuestion ===
            currentItems.length - 1
              ? "Finish"
              : "Next";
        }
      );

    });

    $("nextBtn").onclick = () => {

      currentQuestion++;

      $("nextBtn").style.display =
        "none";

      renderQuizQuestion();

    };

    updateCounter();
  }

  /* =========================================================
     GUESS THE FOOD - 500 QUESTIONS
     ========================================================= */

  function buildGuessBank() {

    const bank = [];

    FOOD_ITEMS.forEach(([food, country]) => {

      bank.push(
        {
          question:
            `This food is associated with ${country}. What is it?`,
          answer: food
        },

        {
          question:
            `Guess the food: It is famous in ${country}.`,
          answer: food
        },

        {
          question:
            `Can you identify this dish from ${country}?`,
          answer: food
        },

        {
          question:
            `Which famous food comes from ${country}?`,
          answer: food
        },

        {
          question:
            `Guess this traditional food connected with ${country}.`,
          answer: food
        },

        {
          question:
            `Your clue is ${country}. Guess the food.`,
          answer: food
        },

        {
          question:
            `One country, one food. Country: ${country}.`,
          answer: food
        },

        {
          question:
            `Which dish would you connect with ${country}?`,
          answer: food
        },

        {
          question:
            `Food mystery from ${country}: identify it.`,
          answer: food
        },

        {
          question:
            `Final clue: ${country}. Which food is it?`,
          answer: food
        }
      );

    });

    return bank.slice(0, 500);
  }

  const GUESS_BANK = buildGuessBank();

  function startGuess() {

    currentMode = "Guess the Food";

    currentItems =
      shuffle(GUESS_BANK).slice(0, 10);

    currentQuestion = 0;
    currentScore = 0;
    answerLocked = false;

    setGameHeader(
      "Guess the Food",
      "Read the clue and identify the food.",
      "GUESS"
    );

    openGame();

    renderGuessQuestion();
  }

  function renderGuessQuestion() {

    if (
      currentQuestion >=
      currentItems.length
    ) {
      return finishGame(
        "Guess the Food Complete!"
      );
    }

    answerLocked = false;

    const item =
      currentItems[currentQuestion];

    const options =
      shuffle([
        item.answer,
        ...shuffle(
          FOOD_ITEMS.map(x => x[0])
            .filter(x => x !== item.answer)
        )
      ]).slice(0, 4);

    $("gameQuestion").innerHTML = `

      <div class="nijok-fact-box">
        🔎 ${item.question}
      </div>

      <img
        class="nijok-game-photo"
        src="${photoUrl(item.answer)}"
        alt="${item.answer}"
      >

    `;

    $("gameAnswers").innerHTML = "";

    options.forEach(option => {

      addAnswer(
        option,
        option === item.answer,
        () => {

          $("nextBtn").style.display =
            "block";

          $("nextBtn").textContent =
            currentQuestion ===
            currentItems.length - 1
              ? "Finish"
              : "Next";
        }
      );

    });

    $("nextBtn").onclick = () => {

      currentQuestion++;

      $("nextBtn").style.display =
        "none";

      renderGuessQuestion();

    };

    updateCounter();
  }

  /* =========================================================
     MATCH THE PAIR
     ========================================================= */

  function startMatch() {

    currentMode = "Match the Pair";

    currentItems =
      shuffle(FOOD_ITEMS).slice(0, 5);

    currentQuestion = 0;
    currentScore = 0;

    setGameHeader(
      "Match the Pair",
      "Match each food with its correct country.",
      "MATCH"
    );

    openGame();

    renderMatch();
  }

  function renderMatch() {

    $("gameQuestion").innerHTML = `
      <h3>
        Match the food with its country
      </h3>

      <p>
        Choose the correct country for each food.
      </p>
    `;

    $("gameAnswers").innerHTML = "";

    currentItems.forEach(([food, country]) => {

      const row =
        document.createElement("div");

      row.style.cssText =
        "margin:12px 0;display:flex;gap:8px;align-items:center;flex-wrap:wrap;";

      const label =
        document.createElement("strong");

      label.textContent = food;
      label.style.minWidth = "140px";

      row.appendChild(label);

      countryOptions(country).forEach(option => {

        const button =
          document.createElement("button");

        button.type = "button";
        button.className = "game-answer";
        button.textContent = option;

        button.onclick = () => {

          if (row.dataset.done) return;

          row.dataset.done = "yes";

          row
            .querySelectorAll("button")
            .forEach(btn =>
              btn.disabled = true
            );

          if (option === country) {

            button.classList.add(
              "correct"
            );

            currentScore++;

            toast(
              "Correct match! 🌿"
            );

          } else {

            button.classList.add(
              "wrong"
            );

            toast(
              "Try another match!"
            );
          }

          $("gameScore").textContent =
            currentScore;

          const rows =
            document.querySelectorAll(
              "[data-match-row]"
            );

          const complete =
            [...rows].every(
              r => r.dataset.done
            );

          if (complete) {

            $("nextBtn").style.display =
              "block";

            $("nextBtn").textContent =
              "Finish";
          }

        };

        row.appendChild(button);

      });

      row.dataset.matchRow = "yes";

      $("gameAnswers")
        .appendChild(row);
    });

    $("nextBtn").style.display =
      "none";

    $("nextBtn").onclick = () =>
      finishGame(
        "Match Challenge Complete!"
      );

    updateCounter();
  }

  /* =========================================================
     TIME CHALLENGE - 500 QUESTIONS
     ========================================================= */

  function startTimeChallenge() {

    currentMode = "Time Challenge";

    currentItems =
      shuffle(QUIZ_BANK).slice(0, 10);

    currentQuestion = 0;
    currentScore = 0;
    timeLeft = 30;

    setGameHeader(
      "Time Challenge",
      "Answer as many food questions as you can in 30 seconds.",
      "TIME"
    );

    openGame();

    renderTimeQuestion();

    startTimer();
  }

  function renderTimeQuestion() {

    if (timeLeft <= 0) {
      return finishGame(
        "Time Challenge Complete!"
      );
    }

    answerLocked = false;

    const item =
      currentItems[
        currentQuestion %
        currentItems.length
      ];

    const options =
      shuffle([
        item.answer,
        ...shuffle(
          FOOD_ITEMS.flatMap(
            x => [x[0], x[1]]
          )
        )
      ])
      .filter(
        (x, i, arr) =>
          arr.indexOf(x) === i
      )
      .slice(0, 4);

    $("gameQuestion").innerHTML = `

      <div class="nijok-fact-box">
        ⏱️ Time left:
        <strong id="timeLeft">
          ${timeLeft}s
        </strong>
      </div>

      <h3>
        ${item.question}
      </h3>
    `;

    $("gameAnswers").innerHTML = "";

    options.forEach(option => {

      addAnswer(
        option,
        option === item.answer,
        () => {

          currentQuestion++;

          if (timeLeft > 0) {
            renderTimeQuestion();
          }

        }
      );

    });

    $("nextBtn").style.display =
      "none";

    updateCounter();
  }

  function startTimer() {

    stopTimer();

    timerInterval =
      setInterval(() => {

        timeLeft--;

        const timer =
          $("timeLeft");

        if (timer) {
          timer.textContent =
            timeLeft + "s";
        }

        if (timeLeft <= 0) {

          stopTimer();

          finishGame(
            "Time Challenge Complete!"
          );

        }

      }, 1000);
  }

  function stopTimer() {

    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = null;
  }

  /* =========================================================
     FINISH GAME
     ========================================================= */

  function finishGame(title) {

    stopTimer();

    addScore(currentScore);

    $("gameQuestion").innerHTML = `

      <div class="nijok-complete">

        <div class="nijok-complete-icon">
          🎉
        </div>

        <h3>
          ${title}
        </h3>

        <p>
          Your score
        </p>

        <strong class="nijok-big-points">
          ${currentScore} Points
        </strong>

        <p>
          Keep playing to discover more food and culture.
        </p>

      </div>
    `;

    $("gameAnswers").innerHTML = `

      <button
        class="nijok-primary-action"
        type="button"
        id="finishClose"
      >
        Continue
      </button>
    `;

    $("finishClose").onclick =
      closeGame;

    $("nextBtn").style.display =
      "none";

    updateScoreDisplay();
  }

  /* =========================================================
     START GAME - IMPORTANT
     ========================================================= */

  function startGame(type) {

    type =
      String(type || "")
        .toLowerCase()
        .trim();

    console.log(
      "NIJOK startGame:",
      type
    );

    switch (type) {

      case "today":
        return showTodayChallenge();

      case "fact":
      case "dailyfact":
        return showFact();

      case "museum":
        return showMuseum();

      case "explore":
        return showExplore();

      case "quiz":
        return startQuiz();

      case "guess":
        return startGuess();

      case "match":
      case "pair":
        return startMatch();

      case "time":
        return startTimeChallenge();

      default:
        toast(
          "Game not found: " + type
        );
    }
  }

  window.startGame = startGame;

  /* =========================================================
     AUTH
     ========================================================= */

  function openAuth() {
    openModal("authModal");
  }

  function saveRegister() {

    const name =
      $("registerName")?.value.trim();

    const email =
      $("registerEmail")?.value.trim();

    if (!name || !email) {

      toast(
        "Please enter your name and email."
      );

      return;
    }

    localStorage.setItem(
      STORAGE.user,
      JSON.stringify({
        name,
        email
      })
    );

    localStorage.removeItem(
      STORAGE.guest
    );

    closeModal("authModal");

    toast(
      "Welcome to NIJOK, " +
      name +
      " 🌿"
    );
  }

  function continueGuest() {

    localStorage.setItem(
      STORAGE.guest,
      "true"
    );

    closeModal("authModal");

    toast(
      "Continuing as Guest 🌿"
    );
  }

  /* =========================================================
     HOW IT WORKS
     ========================================================= */

  function openHow() {
    openModal("howModal");
  }

  /* =========================================================
     SCORE
     ========================================================= */

  function updateScoreDisplay() {

    const value = getScore();

    if ($("totalScore")) {
      $("totalScore").textContent =
        value;
    }

    if ($("score")) {
      $("score").textContent =
        value;
    }

    if ($("progressBar")) {

      $("progressBar").style.width =
        Math.min(
          100,
          value % 100
        ) + "%";
    }

    if ($("level")) {

      const level =
        Math.floor(value / 100) + 1;

      $("level").textContent =
        "Level " + level;
    }

    document
      .querySelectorAll(
        "[data-score]"
      )
      .forEach(el => {
        el.textContent = value;
      });
  }

  /* =========================================================
     HOME BUTTONS
     ========================================================= */

  function connectButtons() {

    /*
      THIS IS THE IMPORTANT PART.
      It reads data-game directly from your HTML.
    */

    document
      .querySelectorAll(
        "[data-game]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            const game =
              button.getAttribute(
                "data-game"
              );

            startGame(game);
          }
        );

      });

    /* Start Playing */

    document
      .querySelectorAll(
        "#startPlaying, .start-playing"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            startGame("today");
          }
        );

      });

    /* How It Works */

    document
      .querySelectorAll(
        "#howItWorks, .how-it-works"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            openHow();
          }
        );

      });

    /* Register */

    document
      .querySelectorAll(
        "#registerButton, .register-btn"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            openAuth();
          }
        );

      });

    /* Guest */

    $("guestButton")
      ?.addEventListener(
        "click",
        continueGuest
      );

    /* Register Save */

    $("registerSave")
      ?.addEventListener(
        "click",
        saveRegister
      );

    /* Continue Guest */

    $("continueGuest")
      ?.addEventListener(
        "click",
        continueGuest
      );

    /* How Start */

    $("howStart")
      ?.addEventListener(
        "click",
        () => {

          closeModal(
            "howModal"
          );

          startGame(
            "today"
          );

        }
      );

    /* Daily Fact */

    $("factBtn")
      ?.addEventListener(
        "click",
        showFact
      );

    /* Museum */

    $("museumBtn")
      ?.addEventListener(
        "click",
        () => startGame(
          "museum"
        )
      );

    /* Explore */

    $("exploreBtn")
      ?.addEventListener(
        "click",
        () => startGame(
          "explore"
        )
      );

    /* Close buttons */

    $("closeGame")
      ?.addEventListener(
        "click",
        closeGame
      );

    $("closeAuth")
      ?.addEventListener(
        "click",
        () => closeModal(
          "authModal"
        )
      );

    $("closeHow")
      ?.addEventListener(
        "click",
        () => closeModal(
          "howModal"
        )
      );

    $("closeFact")
      ?.addEventListener(
        "click",
        () => closeModal(
          "factModal"
        )
      );

    $("closeKnowledge")
      ?.addEventListener(
        "click",
        () => closeModal(
          "knowledgeModal"
        )
      );

    $("knowledgeClose")
      ?.addEventListener(
        "click",
        () => closeModal(
          "knowledgeModal"
        )
      );

    /* Comments */

    $("commentBtn")
      ?.addEventListener(
        "click",
        addComment
      );

    $("commentInput")
      ?.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter"
          ) {
            addComment();
          }

        }
      );
  }

  /* =========================================================
     COMMENTS
     ========================================================= */

  function addComment() {

    const input =
      $("commentInput");

    const list =
      $("commentList");

    if (!input || !list) {
      return;
    }

    const text =
      input.value.trim();

    if (!text) {

      toast(
        "Write a comment first."
      );

      return;
    }

    const comment =
      document.createElement(
        "div"
      );

    comment.className =
      "comment-item";

    comment.textContent =
      text;

    list.prepend(comment);

    input.value = "";

    toast(
      "Comment added 🌿"
    );
  }

  /* =========================================================
     GLOBAL EVENTS
     ========================================================= */

  function setupGlobalEvents() {

    [
      "gameModal",
      "authModal",
      "howModal",
      "factModal",
      "knowledgeModal"
    ].forEach(id => {

      const modal = $(id);

      if (!modal) return;

      modal.addEventListener(
        "click",
        event => {

          if (
            event.target === modal
          ) {
            closeModal(id);
          }

        }
      );

    });

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape"
        ) {

          closeGame();

          closeModal(
            "authModal"
          );

          closeModal(
            "howModal"
          );

          closeModal(
            "factModal"
          );

          closeModal(
            "knowledgeModal"
          );

        }

      }
    );
  }

  /* =========================================================
     INIT
     ========================================================= */

  document.addEventListener(
    "DOMContentLoaded",
    () => {

      updateScoreDisplay();

      connectButtons();

      setupGlobalEvents();

      console.log(
        "NIJOK JavaScript loaded successfully."
      );

    }
  );

})();
