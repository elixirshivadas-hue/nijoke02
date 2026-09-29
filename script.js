/* =========================================================
   NIJOK - Food Knowledge Game
   50 Questions + 50 Daily Food Facts
   Register / Guest / Comments / Leaderboard / Modals
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. DATA
     ========================================================= */

  const questionBank = [
    {
      q: "Which country is most closely associated with sushi?",
      a: ["Japan", "Mexico", "Italy", "Brazil"],
      c: 0,
      fact: "Sushi is strongly associated with Japanese cuisine and has many regional styles.",
      img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Paella is a famous dish from which country?",
      a: ["Spain", "India", "Thailand", "Greece"],
      c: 0,
      fact: "Paella originated in the Valencia region of Spain.",
      img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Tacos are strongly associated with which cuisine?",
      a: ["Mexican", "Japanese", "French", "Greek"],
      c: 0,
      fact: "Tacos are a major part of Mexican cuisine and come in many regional varieties.",
      img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Kimchi is a traditional food of which country?",
      a: ["South Korea", "Brazil", "Egypt", "Canada"],
      c: 0,
      fact: "Kimchi is a traditional Korean fermented vegetable preparation.",
      img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which country is famous for its modern croissant tradition?",
      a: ["France", "India", "China", "Peru"],
      c: 0,
      fact: "The croissant is strongly associated with French baking culture.",
      img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Biryani is especially associated with which country's cuisine?",
      a: ["India", "Norway", "Japan", "Argentina"],
      c: 0,
      fact: "India has many regional styles of biryani, each with different ingredients and techniques.",
      img: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Pho is a famous dish from which country?",
      a: ["Vietnam", "Italy", "Turkey", "Australia"],
      c: 0,
      fact: "Pho is a Vietnamese noodle soup traditionally served with herbs and broth.",
      img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Pesto is traditionally associated with which country?",
      a: ["Italy", "Canada", "Japan", "Morocco"],
      c: 0,
      fact: "Pesto alla Genovese is a famous sauce from Genoa in Italy.",
      img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Injera is a traditional flatbread associated with which country?",
      a: ["Ethiopia", "France", "Mexico", "Korea"],
      c: 0,
      fact: "Injera is a fermented flatbread commonly made using teff flour.",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Couscous is especially associated with North African cuisine. Which is its main ingredient?",
      a: ["Semolina", "Cocoa", "Potato", "Corn syrup"],
      c: 0,
      fact: "Traditional couscous is made from semolina, usually from durum wheat.",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Maple syrup is strongly associated with which country?",
      a: ["Canada", "India", "Spain", "Japan"],
      c: 0,
      fact: "Canada is one of the world's major producers of maple syrup.",
      img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Miso is a fermented food commonly used in which cuisine?",
      a: ["Japanese", "Mexican", "Brazilian", "Greek"],
      c: 0,
      fact: "Miso is a fermented paste commonly made from soybeans and koji.",
      img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Saffron comes from which part of a flower?",
      a: ["Stigmas", "Roots", "Leaves", "Seeds"],
      c: 0,
      fact: "Saffron is harvested from the dried stigmas of Crocus sativus flowers.",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Vanilla comes from what type of plant?",
      a: ["Orchid", "Fern", "Grass", "Pine"],
      c: 0,
      fact: "Vanilla comes from orchids in the Vanilla genus.",
      img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which ingredient is used to make chocolate?",
      a: ["Cocoa beans", "Rice grains", "Potatoes", "Olives"],
      c: 0,
      fact: "Chocolate is made from cacao beans, which are fermented, dried, roasted and processed.",
      img: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "What is the main herb traditionally used in pesto alla Genovese?",
      a: ["Basil", "Mint", "Coriander", "Rosemary"],
      c: 0,
      fact: "Fresh basil is the signature herb in traditional Genovese pesto.",
      img: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which spice gives turmeric its characteristic yellow color?",
      a: ["Curcumin", "Caffeine", "Lycopene", "Menthol"],
      c: 0,
      fact: "Curcumin is the major yellow pigment in turmeric.",
      img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Wasabi is traditionally made from which plant?",
      a: ["Wasabia japonica", "Basil", "Vanilla", "Cocoa"],
      c: 0,
      fact: "True wasabi comes from a plant in the Brassicaceae family.",
      img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Paneer is what type of food?",
      a: ["Fresh cheese", "Bread", "Pickle", "Soup"],
      c: 0,
      fact: "Paneer is a fresh, non-aged cheese widely used in South Asian cooking.",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Feta is traditionally associated with which country?",
      a: ["Greece", "Brazil", "Japan", "Canada"],
      c: 0,
      fact: "Feta is a brined cheese strongly associated with Greek cuisine.",
      img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Mozzarella is traditionally associated with which country?",
      a: ["Italy", "China", "Mexico", "India"],
      c: 0,
      fact: "Mozzarella is an Italian cheese traditionally made using the pasta filata method.",
      img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Parmigiano Reggiano is a famous cheese from which country?",
      a: ["Italy", "France", "Japan", "Brazil"],
      c: 0,
      fact: "Parmigiano Reggiano is an Italian hard cheese with protected production rules.",
      img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Gouda cheese is associated with which country?",
      a: ["Netherlands", "India", "Mexico", "Vietnam"],
      c: 0,
      fact: "Gouda is named after the Dutch city of Gouda.",
      img: "https://images.unsplash.com/photo-1455124333638-3e1e7b8f7c8d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Gnocchi is a popular dish from which cuisine?",
      a: ["Italian", "Korean", "Moroccan", "Brazilian"],
      c: 0,
      fact: "Gnocchi are Italian dumplings that can be made from potatoes, flour and other ingredients.",
      img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Ramen is most strongly associated with which country?",
      a: ["Japan", "Spain", "Egypt", "Canada"],
      c: 0,
      fact: "Ramen is a major part of modern Japanese food culture.",
      img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Dim sum is strongly associated with which cuisine?",
      a: ["Chinese", "French", "Brazilian", "Indian"],
      c: 0,
      fact: "Dim sum includes a wide variety of small dishes traditionally enjoyed with tea.",
      img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Falafel is commonly associated with which region?",
      a: ["Middle East", "Scandinavia", "South America", "Oceania"],
      c: 0,
      fact: "Falafel is a popular Middle Eastern food made from ground legumes and spices.",
      img: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb8?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Dosa is a popular food from which cuisine?",
      a: ["Indian", "French", "Japanese", "Mexican"],
      c: 0,
      fact: "Dosa is a South Indian fermented crepe traditionally made from rice and lentils.",
      img: "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Arepas are especially associated with which countries?",
      a: ["Colombia and Venezuela", "Japan and Korea", "France and Italy", "Egypt and Morocco"],
      c: 0,
      fact: "Arepas are a staple food in both Colombian and Venezuelan cuisine.",
      img: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Tagine is especially associated with which country?",
      a: ["Morocco", "Japan", "Canada", "Greece"],
      c: 0,
      fact: "Tagine refers both to a North African cooking vessel and dishes prepared in it.",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Feijoada is a famous dish from which country?",
      a: ["Brazil", "India", "Italy", "Korea"],
      c: 0,
      fact: "Feijoada is a Brazilian black-bean stew traditionally served with various accompaniments.",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Jollof rice is strongly associated with which region?",
      a: ["West Africa", "Northern Europe", "East Asia", "South America"],
      c: 0,
      fact: "Jollof rice is a popular West African rice dish with many regional variations.",
      img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Satay is a famous food associated with which country?",
      a: ["Indonesia", "France", "Canada", "Egypt"],
      c: 0,
      fact: "Satay consists of skewered and grilled meat served with sauces and is strongly associated with Indonesia.",
      img: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Laksa is a popular dish from which part of the world?",
      a: ["Southeast Asia", "South America", "Northern Europe", "West Africa"],
      c: 0,
      fact: "Laksa is a spicy noodle soup found in several Southeast Asian cuisines.",
      img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Rendang is strongly associated with which country?",
      a: ["Indonesia", "France", "Mexico", "Canada"],
      c: 0,
      fact: "Rendang originated among the Minangkabau people of Indonesia and is now widely known across the region.",
      img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Poutine is strongly associated with which country?",
      a: ["Canada", "India", "Japan", "Brazil"],
      c: 0,
      fact: "Poutine is a Canadian dish of fries traditionally topped with cheese curds and gravy.",
      img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Gelato is a frozen dessert strongly associated with which country?",
      a: ["Italy", "Mexico", "China", "Morocco"],
      c: 0,
      fact: "Gelato is an Italian-style frozen dessert known for its dense, smooth texture.",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Mochi is a traditional food from which country?",
      a: ["Japan", "Brazil", "France", "India"],
      c: 0,
      fact: "Mochi is made from glutinous rice that is pounded into a sticky dough.",
      img: "https://images.unsplash.com/photo-1582176604856-e824b3b0d90d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Tiramisu is a famous dessert from which country?",
      a: ["Italy", "Canada", "Korea", "Morocco"],
      c: 0,
      fact: "Tiramisu is an Italian dessert commonly made with coffee-soaked ladyfingers and mascarpone.",
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Masala chai is strongly associated with which country?",
      a: ["India", "Japan", "France", "Brazil"],
      c: 0,
      fact: "Masala chai combines tea with milk, spices and sweetener and is popular across India.",
      img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Espresso is most strongly associated with which country?",
      a: ["Italy", "Canada", "Mexico", "Australia"],
      c: 0,
      fact: "Espresso developed as a distinct coffee-brewing tradition in Italy.",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Matcha is what type of food or drink?",
      a: ["Powdered green tea", "Cheese", "Bread", "Soup"],
      c: 0,
      fact: "Matcha is finely ground green tea traditionally used in Japanese tea culture.",
      img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Kombucha is traditionally made by fermenting what?",
      a: ["Sweetened tea", "Potatoes", "Rice flour", "Cocoa beans"],
      c: 0,
      fact: "Kombucha is a fermented tea beverage made using a culture of microorganisms.",
      img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "What is the fifth basic taste commonly recognized alongside sweet, sour, salty and bitter?",
      a: ["Umami", "Spicy", "Minty", "Smoky"],
      c: 0,
      fact: "Umami describes a savory taste associated with compounds such as glutamate.",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "What is traditionally used to make sourdough rise?",
      a: ["Yeast and bacteria", "Only salt", "Only sugar", "Oil"],
      c: 0,
      fact: "Sourdough starters contain wild yeasts and lactic-acid bacteria.",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which spice is actually the bark of a tree?",
      a: ["Cinnamon", "Pepper", "Saffron", "Cardamom"],
      c: 0,
      fact: "Cinnamon is obtained from the inner bark of several tree species.",
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Black pepper comes from which part of the plant?",
      a: ["Fruit", "Root", "Flower", "Leaf"],
      c: 0,
      fact: "Black pepper is made from the dried fruit of the Piper nigrum plant.",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which part of ginger is commonly eaten?",
      a: ["Rhizome", "Flower", "Seed", "Bark"],
      c: 0,
      fact: "The ginger used in cooking is a rhizome, an underground stem.",
      img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "A potato is botanically classified as what?",
      a: ["Tuber", "Fruit", "Flower", "Seed"],
      c: 0,
      fact: "The potato is a modified underground stem called a tuber.",
      img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which food is a fermented dairy product?",
      a: ["Yogurt", "Rice", "Apple", "Carrot"],
      c: 0,
      fact: "Yogurt is produced by fermenting milk with specific bacterial cultures.",
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "White chocolate is mainly made using which cocoa component?",
      a: ["Cocoa butter", "Cocoa shells", "Cocoa leaves", "Cocoa roots"],
      c: 0,
      fact: "White chocolate contains cocoa butter but does not contain the cocoa solids found in dark chocolate.",
      img: "https://images.unsplash.com/photo-1548907040-4d42fcaa0f56?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which guide was originally created by a French tire company?",
      a: ["Michelin Guide", "Oxford Guide", "World Food Guide", "Chef Guide"],
      c: 0,
      fact: "The Michelin Guide began as a travel guide created by the Michelin tire company.",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which food is made from fermented soybeans and koji?",
      a: ["Miso", "Gelato", "Taco", "Poutine"],
      c: 0,
      fact: "Miso is commonly produced by fermenting soybeans with koji and salt.",
      img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which fruit is commonly used to make guacamole?",
      a: ["Avocado", "Apple", "Pear", "Orange"],
      c: 0,
      fact: "Avocado is the main ingredient in traditional guacamole.",
      img: "https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which ingredient is traditionally used to make hummus?",
      a: ["Chickpeas", "Potatoes", "Apples", "Corn"],
      c: 0,
      fact: "Classic hummus is made from chickpeas, tahini, lemon and other seasonings.",
      img: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80"
    },
    {
      q: "Which spice is obtained from the seed of a fruit?",
      a: ["Nutmeg", "Cinnamon", "Saffron", "Basil"],
      c: 0,
      fact: "Nutmeg is the seed found inside the fruit of the Myristica fragrans tree.",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const dailyFacts = [
    "Sushi has many different regional styles across Japan.",
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
    "Mozzarella is made using a pasta filata stretching technique.",
    "Feta is traditionally a brined cheese associated with Greece.",
    "Matcha is powdered green tea.",
    "Espresso developed as a distinct coffee tradition in Italy.",
    "Sourdough starters contain yeast and bacteria.",
    "Turmeric gets much of its yellow color from curcumin.",
    "True wasabi comes from a plant in the mustard family.",
    "Maple syrup is produced from the sap of maple trees.",
    "Olive oil is produced from the fruit of the olive tree.",
    "Rice is a type of grass seed.",
    "Corn is classified botanically as a cereal grain.",
    "Chickpeas are legumes.",
    "Lentils belong to the legume family.",
    "Cardamom comes from the seed pods of several plants.",
    "Cinnamon is made from tree bark.",
    "Black pepper comes from dried fruit.",
    "Nutmeg is the seed inside a fruit.",
    "Cloves are dried flower buds.",
    "Star anise is the dried fruit of a tree.",
    "Ginger is a rhizome rather than a root.",
    "Garlic grows as a bulb.",
    "Onions are bulbs.",
    "Potatoes are underground tubers.",
    "Carrots are roots.",
    "Beets are roots.",
    "Spinach is a leafy vegetable.",
    "Avocado is botanically a fruit.",
    "Pineapple is a multiple fruit.",
    "Yogurt is made through bacterial fermentation.",
    "Cheese production generally begins with milk.",
    "Pickles can be made through fermentation or vinegar pickling.",
    "White chocolate uses cocoa butter but not cocoa solids.",
    "Bread can rise through yeast fermentation.",
    "Tiramisu is an Italian dessert.",
    "Mochi is traditionally made from glutinous rice.",
    "Poutine is associated with Canadian cuisine.",
    "Jollof rice is popular across West Africa.",
    "Rendang is strongly associated with Indonesian cuisine.",
    "The Michelin Guide began as a travel guide from a tire company."
  ];


  /* =========================================================
     2. ELEMENTS
     ========================================================= */

  const $ = (id) => document.getElementById(id);

  const gameModal = $("gameModal");
  const authModal = $("authModal");
  const howModal = $("howModal");
  const factModal = $("factModal");
  const knowledgeModal = $("knowledgeModal");

  const gameQuestion = $("gameQuestion");
  const gameAnswers = $("gameAnswers");
  const gameProgress = $("gameProgress");
  const gameScore = $("gameScore");
  const questionCounter = $("questionCounter");
  const gameTitle = $("gameTitle");
  const gameDescription = $("gameDescription");
  const gameMode = $("gameMode");

  const todayQuestion = $("todayQuestion");
  const todayOptions = $("todayOptions");
  const todayImage = $("todayImage");

  const toast = $("toast");

  let currentMode = "quiz";
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let currentScore = 0;
  let answered = false;
  let timer = null;
  let timeLeft = 15;

  /* =========================================================
     3. LOCAL STORAGE
     ========================================================= */

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    }
  };


  /* =========================================================
     4. TOAST
     ========================================================= */

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timeout);

    showToast.timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }


  /* =========================================================
     5. MODAL HELPERS
     ========================================================= */

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("show");
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");

    if (!document.querySelector(".modal.show")) {
      document.body.classList.remove("modal-open");
    }
  }


  /* =========================================================
     6. SCORE / LEVEL
     ========================================================= */

  function getScore() {
    return Number(storage.get("nijokScore", 0)) || 0;
  }

  function setScore(value) {
    storage.set("nijokScore", value);
    updateScoreUI();
  }

  function addScore(points) {
    const oldScore = getScore();
    const newScore = oldScore + points;

    setScore(newScore);

    showToast(`+${points} knowledge points!`);
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

    if ($("totalScore")) {
      $("totalScore").textContent = score;
    }

    if ($("level")) {
      $("level").textContent = getLevel(score);
    }

    if ($("progressBar")) {
      const progress = Math.min((score % 200) / 200 * 100, 100);
      $("progressBar").style.width = `${progress}%`;
    }
  }


  /* =========================================================
     7. REGISTER / GUEST
     ========================================================= */

  function updateUserUI() {
    const user = storage.get("nijokUser", null);

    if (!$("guestBtn")) return;

    if (user && user.name) {
      $("guestBtn").textContent = `◉ ${user.name}`;
    } else {
      $("guestBtn").textContent = "◉ Guest";
    }
  }

  function openAuth() {
    openModal(authModal);

    const user = storage.get("nijokUser", null);

    if (user) {
      if ($("registerName")) $("registerName").value = user.name || "";
      if ($("registerEmail")) $("registerEmail").value = user.email || "";
    }
  }

  $("registerBtn")?.addEventListener("click", openAuth);

  $("guestBtn")?.addEventListener("click", () => {
    storage.set("nijokUser", {
      name: "Guest",
      email: "",
      type: "guest"
    });

    updateUserUI();
    showToast("Guest mode activated. Have fun exploring food!");
  });

  $("registerSave")?.addEventListener("click", () => {
    const name = $("registerName")?.value.trim();
    const email = $("registerEmail")?.value.trim();

    if (!name) {
      showToast("Please enter your name.");
      return;
    }

    storage.set("nijokUser", {
      name,
      email,
      type: "registered"
    });

    updateUserUI();
    closeModal(authModal);

    showToast(`Welcome to NIJOK, ${name}!`);
  });

  $("continueGuest")?.addEventListener("click", () => {
    storage.set("nijokUser", {
      name: "Guest",
      email: "",
      type: "guest"
    });

    updateUserUI();
    closeModal(authModal);

    showToast("Continuing as Guest.");
  });


  /* =========================================================
     8. DAILY FOOD FACT
     ========================================================= */

  function getDayNumber() {
    const now = new Date();

    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;

    return Math.floor(diff / 86400000);
  }

  function getDailyFactNumber() {
    return ((getDayNumber() - 1) % dailyFacts.length + dailyFacts.length) %
      dailyFacts.length;
  }

  function updateDailyFact() {
    const index = getDailyFactNumber();
    const fact = dailyFacts[index];

    if ($("factNumber")) {
      $("factNumber").textContent = String(index + 1).padStart(2, "0");
    }

    if ($("dailyFactTitle")) {
      $("dailyFactTitle").textContent = "Do You Know?";
    }

    if ($("dailyFactText")) {
      $("dailyFactText").textContent = fact;
    }

    if ($("factModalTitle")) {
      $("factModalTitle").textContent = `Food Fact #${index + 1}`;
    }

    if ($("factModalText")) {
      $("factModalText").textContent = fact;
    }
  }

  $("factBtn")?.addEventListener("click", () => {
    updateDailyFact();
    openModal(factModal);
  });

  $("factCloseBtn")?.addEventListener("click", () => {
    closeModal(factModal);
  });

  $("closeFact")?.addEventListener("click", () => {
    closeModal(factModal);
  });


  /* =========================================================
     9. TODAY'S QUICK QUESTION
     ========================================================= */

  function loadTodayQuestion() {
    const index = getDayNumber() % questionBank.length;
    const q = questionBank[index];

    if (!q) return;

    if (todayQuestion) {
      todayQuestion.textContent = q.q;
    }

    if (todayImage && q.img) {
      todayImage.src = q.img;
    }

    if (!todayOptions) return;

    todayOptions.innerHTML = "";

    q.a.forEach((answer, answerIndex) => {
      const button = document.createElement("button");

      button.className = "today-option";
      button.textContent = answer;

      button.addEventListener("click", () => {
        if (todayOptions.dataset.done === "true") return;

        todayOptions.dataset.done = "true";

        const correct = answerIndex === q.c;

        button.classList.add(correct ? "correct" : "wrong");

        [...todayOptions.children].forEach((item, i) => {
          if (i === q.c) item.classList.add("correct");
          item.disabled = true;
        });

        if (correct) {
          addScore(10);

          showKnowledge(
            "Correct! 🎉",
            `${q.fact} You gained 10 knowledge points.`
          );
        } else {
          showKnowledge(
            "Keep Learning 🌱",
            `The correct answer is "${q.a[q.c]}". ${q.fact}`
          );
        }
      });

      todayOptions.appendChild(button);
    });
  }


  /* =========================================================
     10. KNOWLEDGE POPUP
     ========================================================= */

  function showKnowledge(title, text) {
    if ($("knowledgeTitle")) {
      $("knowledgeTitle").textContent = title;
    }

    if ($("knowledgeText")) {
      $("knowledgeText").textContent = text;
    }

    openModal(knowledgeModal);
  }

  $("closeKnowledge")?.addEventListener("click", () => {
    closeModal(knowledgeModal);
    continueAfterKnowledge();
  });

  $("knowledgeClose")?.addEventListener("click", () => {
    closeModal(knowledgeModal);
    continueAfterKnowledge();
  });


  /* =========================================================
     11. GAME SETUP
     ========================================================= */

  function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function prepareQuestions() {
    currentQuestions = shuffle(questionBank).slice(0, 10);
    currentQuestionIndex = 0;
    currentScore = 0;
  }

  function getModeInfo(mode) {
    const modes = {
      quiz: {
        title: "Food Quiz",
        description: "Test your global food knowledge.",
        label: "QUIZ"
      },

      guess: {
        title: "Guess the Food",
        description: "Look at the food and guess what it is.",
        label: "GUESS"
      },

      match: {
        title: "Match the Pair",
        description: "Choose the country or fact that matches the food.",
        label: "MATCH"
      },

      time: {
        title: "Time Challenge",
        description: "Answer before the clock runs out.",
        label: "TIME"
      }
    };

    return modes[mode] || modes.quiz;
  }


  /* =========================================================
     12. START GAME
     ========================================================= */

  function startGame(mode = "quiz") {
    clearTimer();

    currentMode = mode;
    prepareQuestions();

    const info = getModeInfo(mode);

    if (gameTitle) gameTitle.textContent = info.title;
    if (gameDescription) gameDescription.textContent = info.description;
    if (gameMode) gameMode.textContent = info.label;

    if (gameModal) {
      gameModal.classList.add("show");
      document.body.classList.add("modal-open");
    }

    renderQuestion();
  }


  /* =========================================================
     13. RENDER GAME QUESTION
     ========================================================= */

  function renderQuestion() {
    clearTimer();

    answered = false;

    const q = currentQuestions[currentQuestionIndex];

    if (!q) {
      finishGame();
      return;
    }

    const total = currentQuestions.length;
    const number = currentQuestionIndex + 1;

    if (questionCounter) {
      questionCounter.textContent = `${number} / ${total}`;
    }

    if (gameScore) {
      gameScore.textContent = currentScore;
    }

    if (gameProgress) {
      gameProgress.style.width = `${(number - 1) / total * 100}%`;
    }

    if (gameQuestion) {
      gameQuestion.innerHTML = "";

      if (currentMode === "guess" && q.img) {
        const image = document.createElement("img");

        image.src = q.img;
        image.alt = "Food question image";
        image.className = "game-food-image";

        gameQuestion.appendChild(image);
      }

      const text = document.createElement("div");
      text.className = "game-question-text";
      text.textContent = q.q;

      gameQuestion.appendChild(text);
    }

    if (!gameAnswers) return;

    gameAnswers.innerHTML = "";

    q.a.forEach((answer, index) => {
      const button = document.createElement("button");

      button.className = "answer-btn";
      button.textContent = answer;
      button.dataset.index = index;

      button.addEventListener("click", () => {
        answerQuestion(index);
      });

      gameAnswers.appendChild(button);
    });

    if (currentMode === "time") {
      startTimer();
    }
  }


  /* =========================================================
     14. ANSWER QUESTION
     ========================================================= */

  function answerQuestion(selectedIndex) {
    if (answered) return;

    answered = true;

    clearTimer();

    const q = currentQuestions[currentQuestionIndex];
    const buttons = [...gameAnswers.querySelectorAll(".answer-btn")];

    buttons.forEach((button) => {
      button.disabled = true;

      const index = Number(button.dataset.index);

      if (index === q.c) {
        button.classList.add("correct");
      }

      if (index === selectedIndex && index !== q.c) {
        button.classList.add("wrong");
      }
    });

    const correct = selectedIndex === q.c;

    if (correct) {
      currentScore += 10;
      addScore(10);

      showKnowledge(
        "Knowledge Gained! 🎉",
        `Correct answer! ${q.fact}`
      );
    } else {
      showKnowledge(
        "Learn Something New 🌱",
        `The correct answer is "${q.a[q.c]}". ${q.fact}`
      );
    }

    if (gameScore) {
      gameScore.textContent = currentScore;
    }
  }


  /* =========================================================
     15. CONTINUE AFTER KNOWLEDGE POPUP
     ========================================================= */

  function continueAfterKnowledge() {
    if (!answered) return;

    currentQuestionIndex++;

    if (currentQuestionIndex >= currentQuestions.length) {
      finishGame();
    } else {
      renderQuestion();
    }
  }


  /* =========================================================
     16. NEXT BUTTON
     ========================================================= */

  $("nextBtn")?.addEventListener("click", () => {
    if (!answered) {
      showToast("Please answer the question first.");
      return;
    }

    closeModal(knowledgeModal);
    continueAfterKnowledge();
  });


  /* =========================================================
     17. TIMER
     ========================================================= */

  function startTimer() {
    timeLeft = 15;

    updateTimerDisplay();

    timer = setInterval(() => {
      timeLeft--;

      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearTimer();

        if (!answered) {
          timeUp();
        }
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const existing = document.querySelector(".game-timer");

    if (existing) {
      existing.textContent = `⏱ ${timeLeft}s`;
    } else if (gameDescription && currentMode === "time") {
      const timerElement = document.createElement("span");

      timerElement.className = "game-timer";
      timerElement.textContent = `⏱ ${timeLeft}s`;

      gameDescription.appendChild(timerElement);
    }
  }

  function timeUp() {
    if (answered) return;

    const q = currentQuestions[currentQuestionIndex];

    answered = true;

    const buttons = [...gameAnswers.querySelectorAll(".answer-btn")];

    buttons.forEach((button) => {
      button.disabled = true;

      if (Number(button.dataset.index) === q.c) {
        button.classList.add("correct");
      }
    });

    showKnowledge(
      "Time's Up! ⏰",
      `The correct answer is "${q.a[q.c]}". ${q.fact}`
    );
  }

  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }


  /* =========================================================
     18. FINISH GAME
     ========================================================= */

  function finishGame() {
    clearTimer();

    if (!gameModal) return;

    const percentage = Math.round(
      currentScore / (currentQuestions.length * 10) * 100
    );

    if (gameQuestion) {
      gameQuestion.innerHTML = `
        <div class="game-result">
          <div class="result-icon">🌿</div>

          <h2>Challenge Complete!</h2>

          <p class="result-score">
            ${currentScore} / ${currentQuestions.length * 10}
          </p>

          <p>
            You answered ${Math.round(currentScore / 10)}
            out of ${currentQuestions.length} questions correctly.
          </p>

          <p>
            Knowledge progress: ${percentage}%
          </p>
        </div>
      `;
    }

    if (gameAnswers) {
      gameAnswers.innerHTML = `
        <button class="primary-btn result-btn" id="restartGameBtn">
          Play Again
        </button>

        <button class="secondary-btn result-btn" id="closeResultBtn">
          Back to NIJOK
        </button>
      `;

      $("restartGameBtn")?.addEventListener("click", () => {
        startGame(currentMode);
      });

      $("closeResultBtn")?.addEventListener("click", () => {
        closeModal(gameModal);
      });
    }

    if (questionCounter) {
      questionCounter.textContent = "DONE";
    }

    if (gameProgress) {
      gameProgress.style.width = "100%";
    }
  }


  /* =========================================================
     19. GAME BUTTONS
     ========================================================= */

  document.querySelectorAll("[data-game]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.game || "quiz";

      startGame(mode);
    });
  });


  /* =========================================================
     20. CLOSE GAME
     ========================================================= */

  $("closeGame")?.addEventListener("click", () => {
    clearTimer();
    closeModal(gameModal);
  });


  /* =========================================================
     21. HOW IT WORKS
     ========================================================= */

  $("howBtn")?.addEventListener("click", () => {
    openModal(howModal);
  });

  $("closeHow")?.addEventListener("click", () => {
    closeModal(howModal);
  });

  $("howStart")?.addEventListener("click", () => {
    closeModal(howModal);
    startGame("quiz");
  });


  /* =========================================================
     22. COMMUNITY COMMENTS
     ========================================================= */

  const defaultComments = [
    {
      name: "Food Explorer",
      text: "NIJOK makes learning about food really fun!",
      time: "Today"
    },
    {
      name: "Guest Explorer",
      text: "I learned something new about spices today.",
      time: "Today"
    },
    {
      name: "Food Lover",
      text: "The daily food facts are my favorite part.",
      time: "Yesterday"
    }
  ];

  function loadComments() {
    const saved = storage.get("nijokComments", []);

    return [...defaultComments, ...saved];
  }

  function renderComments() {
    if (!$("commentList")) return;

    const comments = loadComments();

    $("commentList").innerHTML = "";

    comments.slice(-8).reverse().forEach((comment) => {
      const item = document.createElement("div");

      item.className = "comment-item";

      item.innerHTML = `
        <div class="comment-avatar">
          ${escapeHTML((comment.name || "G").charAt(0).toUpperCase())}
        </div>

        <div class="comment-content">
          <strong>${escapeHTML(comment.name || "Guest")}</strong>

          <p>${escapeHTML(comment.text || "")}</p>

          <small>${escapeHTML(comment.time || "Just now")}</small>
        </div>
      `;

      $("commentList").appendChild(item);
    });
  }

  $("commentBtn")?.addEventListener("click", () => {
    const input = $("commentInput");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
      showToast("Write a comment first.");
      return;
    }

    const user = storage.get("nijokUser", {
      name: "Guest"
    });

    const comments = storage.get("nijokComments", []);

    comments.push({
      name: user.name || "Guest",
      text,
      time: "Just now"
    });

    storage.set("nijokComments", comments);

    input.value = "";

    renderComments();

    showToast("Comment added to the community!");
  });


  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  /* =========================================================
     23. LEADERBOARD
     ========================================================= */

  function renderLeaderboard() {
    if (!$("leaderboardList")) return;

    const score = getScore();

    const board = [
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
        score
      }
    ];

    board.sort((a, b) => b.score - a.score);

    $("leaderboardList").innerHTML = "";

    board.forEach((player, index) => {
      const row = document.createElement("div");

      row.className = "leaderboard-row";

      row.innerHTML = `
        <span class="leader-rank">${index + 1}</span>

        <span class="leader-name">
          ${escapeHTML(player.name)}
        </span>

        <strong>${player.score}</strong>
      `;

      $("leaderboardList").appendChild(row);
    });
  }


  /* =========================================================
     24. SEARCH
     ========================================================= */

  $("searchBtn")?.addEventListener("click", () => {

    const query = window.prompt(
      "What do you want to explore on NIJOK?\nExample: quiz, food map, museum, countries"
    );

    if (!query) return;

    const search = query.toLowerCase().trim();

    const sections = [...document.querySelectorAll("section")];

    const found = sections.find((section) => {
      return section.innerText.toLowerCase().includes(search);
    });

    if (found) {
      found.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      showToast(`Found "${query}"`);
    } else {
      showToast(`No section found for "${query}". Try another word.`);
    }
  });


  /* =========================================================
     25. LANGUAGE BUTTON
     ========================================================= */

  let hindiMode = false;

  $("langBtn")?.addEventListener("click", () => {
    hindiMode = !hindiMode;

    $("langBtn").textContent = hindiMode ? "◉ HI⌄" : "◉ EN⌄";

    showToast(
      hindiMode
        ? "Hindi mode selected."
        : "English mode selected."
    );
  });


  /* =========================================================
     26. MOBILE MENU
     ========================================================= */

  $("menuBtn")?.addEventListener("click", () => {
    const nav = document.querySelector(".main-nav");

    if (!nav) return;

    const isOpen = nav.classList.toggle("mobile-open");

    if (isOpen) {
      nav.style.display = "flex";
      nav.style.position = "absolute";
      nav.style.top = "76px";
      nav.style.left = "20px";
      nav.style.right = "20px";
      nav.style.flexDirection = "column";
      nav.style.padding = "20px";
      nav.style.borderRadius = "20px";
      nav.style.background = "#f6f0df";
      nav.style.boxShadow = "0 20px 50px rgba(0,0,0,.12)";
      nav.style.zIndex = "999";
    } else {
      nav.removeAttribute("style");
    }
  });


  /* =========================================================
     27. SMOOTH NAVIGATION
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================================================
     28. CLOSE MODALS ON BACKDROP
     ========================================================= */

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        clearTimer();
        closeModal(modal);
      }
    });
  });


  /* =========================================================
     29. ESCAPE KEY
     ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    document.querySelectorAll(".modal.show").forEach((modal) => {
      closeModal(modal);
    });

    clearTimer();
  });


  /* =========================================================
     30. INITIALIZE
     ========================================================= */

  updateScoreUI();
  updateUserUI();
  updateDailyFact();
  loadTodayQuestion();
  renderComments();
  renderLeaderboard();

  /* Refresh daily information when the page remains open */
  setInterval(() => {
    updateDailyFact();
    loadTodayQuestion();
  }, 60000);

});
