/* =========================================================
   NIJOK - FOOD & CULTURE EXPERIENCE
   COMPLETE JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     SETTINGS
     ========================================================= */

  const START_DATE = "2026-09-29";

  const STORAGE = {
    score: "nijok_score",
    completed: "nijok_daily_completed",
    user: "nijokUser",
    guest: "nijokGuest"
  };

  let currentMode = "";
  let currentQuestion = 0;
  let currentItems = [];
  let currentScore = 0;
  let answerLocked = false;

  let timerInterval = null;
  let timeLeft = 30;


  /* =========================================================
     100 DAILY CHALLENGE QUESTIONS
     ========================================================= */

  const TODAY_CHALLENGE = [
    ["Pizza Margherita","Italy","Which country is Pizza Margherita traditionally associated with?"],
    ["Sushi","Japan","Which country is famous for sushi?"],
    ["Tacos","Mexico","Tacos are strongly associated with which country?"],
    ["Biryani","India","Which country is widely known for biryani?"],
    ["Croissant","France","Which country is famous for the croissant?"],
    ["Paella","Spain","Paella originated in which country?"],
    ["Peking Duck","China","Peking Duck is a famous dish from which country?"],
    ["Kimchi","South Korea","Kimchi is a traditional food of which country?"],
    ["Pho","Vietnam","Pho is a famous noodle soup from which country?"],
    ["Moussaka","Greece","Moussaka is strongly associated with which country?"],
    ["Couscous","Morocco","Couscous is a famous food of which North African country?"],
    ["Feijoada","Brazil","Feijoada is a traditional dish of which country?"],
    ["Goulash","Hungary","Goulash is traditionally associated with which country?"],
    ["Pad Thai","Thailand","Pad Thai is a famous dish from which country?"],
    ["Ramen","Japan","Ramen is especially associated with which country?"],
    ["Falafel","Middle East","Falafel is popular across which region?"],
    ["Hummus","Middle East","Hummus is a popular dish from which region?"],
    ["Poutine","Canada","Poutine is especially associated with which country?"],
    ["Fish and Chips","United Kingdom","Fish and chips is traditionally associated with which country?"],
    ["Lasagna","Italy","Lasagna is traditionally associated with which country?"],
    ["Gnocchi","Italy","Gnocchi is a traditional food from which country?"],
    ["Ratatouille","France","Ratatouille is a vegetable dish from which country?"],
    ["Samosa","South Asia","Samosas are especially popular across which region?"],
    ["Dosa","India","Dosa is a famous dish from which country?"],
    ["Idli","India","Idli is a traditional dish from which country?"],
    ["Gulab Jamun","India","Gulab jamun is a popular sweet from which country?"],
    ["Baklava","Turkey","Baklava is strongly associated with which country?"],
    ["Shakshuka","North Africa","Shakshuka is popular across which region?"],
    ["Tagine","Morocco","Tagine is a famous dish from which country?"],
    ["Arepas","Venezuela","Arepas are especially associated with which country?"],
    ["Empanadas","Latin America","Empanadas are popular across which region?"],
    ["Churros","Spain","Churros are traditionally associated with which country?"],
    ["Tiramisu","Italy","Tiramisu originated in which country?"],
    ["Gelato","Italy","Gelato is a famous frozen dessert from which country?"],
    ["Bratwurst","Germany","Bratwurst is traditionally associated with which country?"],
    ["Pretzel","Germany","Pretzels are strongly associated with which country?"],
    ["Wiener Schnitzel","Austria","Wiener schnitzel is a famous dish from which country?"],
    ["Fondue","Switzerland","Fondue is traditionally associated with which country?"],
    ["Pierogi","Poland","Pierogi are traditional dumplings from which country?"],
    ["Ceviche","Peru","Ceviche is especially associated with which country?"],
    ["Lomo Saltado","Peru","Lomo saltado is a famous dish from which country?"],
    ["Jollof Rice","West Africa","Jollof rice is popular across which region?"],
    ["Injera","Ethiopia","Injera is a traditional food from which country?"],
    ["Doro Wat","Ethiopia","Doro wat is a famous dish from which country?"],
    ["Bobotie","South Africa","Bobotie is a traditional dish from which country?"],
    ["Bunny Chow","South Africa","Bunny chow is associated with which country?"],
    ["Nasi Goreng","Indonesia","Nasi goreng is a famous dish from which country?"],
    ["Satay","Indonesia","Satay is strongly associated with which country?"],
    ["Laksa","Malaysia","Laksa is a popular dish from which country?"],
    ["Rendang","Indonesia","Rendang is traditionally associated with which country?"],
    ["Hainanese Chicken Rice","Singapore","Hainanese chicken rice is famous in which country?"],
    ["Char Kway Teow","Singapore","Char kway teow is popular in which country?"],
    ["Adobo","Philippines","Adobo is a famous dish from which country?"],
    ["Lechon","Philippines","Lechon is traditionally associated with which country?"],
    ["Mango Sticky Rice","Thailand","Mango sticky rice is a famous dessert from which country?"],
    ["Tom Yum","Thailand","Tom yum is a famous soup from which country?"],
    ["Green Curry","Thailand","Green curry is associated with which country?"],
    ["Bibimbap","South Korea","Bibimbap is a famous dish from which country?"],
    ["Bulgogi","South Korea","Bulgogi is associated with which country?"],
    ["Mandu","South Korea","Mandu are traditional dumplings from which country?"],
    ["Okonomiyaki","Japan","Okonomiyaki is a popular dish from which country?"],
    ["Tempura","Japan","Tempura is associated with which country?"],
    ["Takoyaki","Japan","Takoyaki is a popular street food from which country?"],
    ["Udon","Japan","Udon is a type of noodle associated with which country?"],
    ["Miso Soup","Japan","Miso soup is traditionally associated with which country?"],
    ["Dim Sum","China","Dim sum is strongly associated with which country?"],
    ["Xiaolongbao","China","Xiaolongbao are famous soup dumplings from which country?"],
    ["Mapo Tofu","China","Mapo tofu is a famous dish from which country?"],
    ["Kung Pao Chicken","China","Kung Pao chicken is associated with which country?"],
    ["Spring Rolls","China","Spring rolls are widely associated with which cuisine?"],
    ["Hot Pot","China","Hot pot is a famous communal dining style from which country?"],
    ["Banh Mi","Vietnam","Banh mi is a famous food from which country?"],
    ["Bun Cha","Vietnam","Bun cha is a traditional dish from which country?"],
    ["Goi Cuon","Vietnam","Goi cuon is a Vietnamese food from which country?"],
    ["Manti","Turkey","Manti are small dumplings popular in which country?"],
    ["Doner Kebab","Turkey","Doner kebab is strongly associated with which country?"],
    ["Menemen","Turkey","Menemen is a traditional breakfast dish from which country?"],
    ["Harira","Morocco","Harira is a traditional soup from which country?"],
    ["Mansaf","Jordan","Mansaf is a traditional dish from which country?"],
    ["Kabsa","Saudi Arabia","Kabsa is a famous rice dish from which country?"],
    ["Koshari","Egypt","Koshari is a famous street food from which country?"],
    ["Ful Medames","Egypt","Ful medames is a traditional dish from which country?"],
    ["Pastel de Nata","Portugal","Pastel de nata is a famous pastry from which country?"],
    ["Bacalhau","Portugal","Bacalhau is traditionally associated with which country?"],
    ["Escargot","France","Escargot is associated with which country's cuisine?"],
    ["Quiche","France","Quiche is traditionally associated with which country?"],
    ["Coq au Vin","France","Coq au vin is a traditional dish from which country?"],
    ["Risotto","Italy","Risotto is traditionally associated with which country?"],
    ["Carbonara","Italy","Pasta carbonara is associated with which country?"],
    ["Arancini","Italy","Arancini are fried rice balls from which country?"],
    ["Focaccia","Italy","Focaccia is a traditional bread from which country?"],
    ["Ravioli","Italy","Ravioli are traditionally associated with which country?"],
    ["Pavlova","Australia","Pavlova is especially associated with which country?"],
    ["Hangi","New Zealand","Hangi is a traditional cooking method from which country?"],
    ["Meat Pie","Australia","Australian meat pies are associated with which country?"],
    ["Larb","Laos","Larb is a traditional dish from which country?"],
    ["Naan","India","Naan is a famous flatbread from which country?"],
    ["Butter Chicken","India","Butter chicken is associated with which country?"],
    ["Chole Bhature","India","Chole bhature is a popular dish from which country?"],
    ["Pani Puri","India","Pani puri is a famous street food from which country?"],
    ["Rajma Chawal","India","Rajma chawal is associated with which cuisine?"]
  ];


  /* =========================================================
     50 DAILY FOOD FACTS
     ========================================================= */

  const FOOD_FACTS = [
    ["Pizza","Pizza has become one of the world's most recognized foods, with countless regional variations.","Italy"],
    ["Sushi","Traditional sushi developed in Japan and includes many styles beyond familiar rolls.","Japan"],
    ["Biryani","Biryani has many regional versions across South Asia.","South Asia"],
    ["Chocolate","Cacao was consumed as a drink in Mesoamerica long before modern chocolate bars.","Mesoamerica"],
    ["Tea","Tea is one of the most widely consumed beverages in the world.","Asia"],
    ["Coffee","Coffee culture has developed into very different traditions across countries.","Global"],
    ["Kimchi","Kimchi refers to a broad family of fermented vegetable dishes.","Korea"],
    ["Couscous","Couscous is made from semolina and is important across North African cuisines.","North Africa"],
    ["Pasta","Italy has hundreds of pasta shapes.","Italy"],
    ["Tacos","Tacos vary greatly by region in Mexico.","Mexico"],
    ["Pho","Pho is known for aromatic broth, rice noodles and herbs.","Vietnam"],
    ["Paella","Traditional paella is associated with Valencia.","Spain"],
    ["Miso","Miso is a fermented paste commonly made from soybeans and koji.","Japan"],
    ["Olive Oil","Olive oil has been important around the Mediterranean for thousands of years.","Mediterranean"],
    ["Naan","Naan is found in several Central and South Asian cuisines.","South Asia"],
    ["Falafel","Falafel is commonly made from ground legumes and herbs.","Middle East"],
    ["Mango","Mango has been cultivated in South Asia for thousands of years.","South Asia"],
    ["Vanilla","Vanilla comes from an orchid.","Mesoamerica"],
    ["Saffron","Saffron comes from the dried stigmas of the saffron crocus.","West Asia"],
    ["Cinnamon","Cinnamon is obtained from the inner bark of certain trees.","Asia"],
    ["Wasabi","Authentic wasabi is made from the grated rhizome of a Japanese plant.","Japan"],
    ["Maple Syrup","Maple syrup is strongly associated with Canada and northeastern USA.","North America"],
    ["Poutine","Poutine combines fries, cheese curds and gravy.","Canada"],
    ["Gelato","Gelato generally contains less air than many commercial ice creams.","Italy"],
    ["Croissant","The modern croissant is strongly associated with French baking culture.","France"],
    ["Ceviche","Ceviche uses seafood prepared with acidic citrus juice and seasonings.","Latin America"],
    ["Injera","Injera is a spongy fermented flatbread.","East Africa"],
    ["Jollof Rice","Jollof rice has many regional styles in West Africa.","West Africa"],
    ["Nasi Goreng","Nasi goreng means fried rice and is important in Indonesian food culture.","Indonesia"],
    ["Ramen","Ramen developed into many regional styles in Japan.","Japan"],
    ["Dosa","Dosa batter is traditionally fermented.","India"],
    ["Idli","Idli is a steamed fermented food.","India"],
    ["Gulab Jamun","Gulab jamun is a popular South Asian sweet.","South Asia"],
    ["Baklava","Baklava uses layered pastry, nuts and sweet syrup or honey.","West Asia"],
    ["Tiramisu","Tiramisu is a coffee-flavored Italian dessert.","Italy"],
    ["Pretzel","Pretzels have a long history in European baking.","Europe"],
    ["Fondue","Fondue is strongly associated with Swiss food culture.","Switzerland"],
    ["Empanada","Empanadas are found across Latin America and beyond.","Latin America"],
    ["Arepa","Arepas are especially important in Colombian and Venezuelan cuisine.","South America"],
    ["Kebab","Kebab describes many different grilled and cooked meat dishes.","West Asia"],
    ["Hummus","Hummus traditionally includes chickpeas, tahini, lemon and garlic.","Middle East"],
    ["Tagine","Tagine refers both to a cooking vessel and dishes cooked in it.","Morocco"],
    ["Koshari","Koshari combines rice, pasta, lentils and chickpeas.","Egypt"],
    ["Dim Sum","Dim sum includes many small dishes traditionally enjoyed with tea.","China"],
    ["Bibimbap","Bibimbap combines rice with vegetables and other toppings.","Korea"],
    ["Satay","Satay consists of skewered pieces of meat with sauces and seasonings.","Southeast Asia"],
    ["Tempura","Tempura is known for its light, crisp batter.","Japan"],
    ["Churros","Churros are fried dough pastries.","Spain"],
    ["Pancake","Versions of pancakes exist in food cultures around the world.","Global"],
    ["Honey","Honey has been used as a food and sweetener for thousands of years.","Global"]
  ];


  /* =========================================================
     50 FOOD MUSEUM ITEMS
     ========================================================= */

  const FOOD_MUSEUM = [
    ["Pizza Margherita","Italy","Tomato, mozzarella, basil","A classic Italian pizza known for its simple combination."],
    ["Biryani","India","Rice, spices, meat or vegetables","A layered rice dish with many regional styles."],
    ["Sushi","Japan","Rice, seafood, vinegar","A Japanese food tradition with many styles."],
    ["Tacos","Mexico","Tortilla, meat or vegetables, salsa","One of Mexico's best-known foods."],
    ["Pho","Vietnam","Rice noodles, broth, herbs","A fragrant Vietnamese noodle soup."],
    ["Paella","Spain","Rice, saffron, vegetables, seafood","A famous rice dish associated with Valencia."],
    ["Peking Duck","China","Duck, pancakes, sauce","A celebrated Chinese dish."],
    ["Kimchi","South Korea","Vegetables, chili, garlic, salt","Fermented vegetables important to Korean food culture."],
    ["Croissant","France","Flour, butter, yeast","A famous laminated French pastry."],
    ["Moussaka","Greece","Eggplant, meat, béchamel","A layered baked dish popular in Greek cuisine."],
    ["Couscous","Morocco","Semolina, vegetables, meat","A North African staple."],
    ["Feijoada","Brazil","Beans, pork, spices","A hearty Brazilian stew."],
    ["Goulash","Hungary","Beef, paprika, onions","A Hungarian dish associated with paprika."],
    ["Pad Thai","Thailand","Rice noodles, egg, tofu, tamarind","A famous Thai noodle dish."],
    ["Ramen","Japan","Noodles, broth, toppings","A noodle dish with regional Japanese styles."],
    ["Falafel","Middle East","Chickpeas or fava beans, herbs","A popular Middle Eastern street food."],
    ["Poutine","Canada","Fries, cheese curds, gravy","A comfort food associated with Quebec."],
    ["Fish and Chips","United Kingdom","Fish, potatoes, batter","A classic British takeaway food."],
    ["Lasagna","Italy","Pasta, sauce, cheese","A layered baked pasta dish."],
    ["Ratatouille","France","Eggplant, zucchini, tomato","A vegetable dish associated with southern France."],
    ["Dosa","India","Rice, lentils, oil","A fermented South Indian dish."],
    ["Idli","India","Rice, black gram","A steamed fermented food."],
    ["Gulab Jamun","India","Milk solids, sugar, cardamom","A famous South Asian sweet."],
    ["Baklava","Turkey","Pastry, nuts, syrup","A layered pastry with nuts and sweet syrup."],
    ["Tiramisu","Italy","Mascarpone, coffee, cocoa","A famous Italian dessert."],
    ["Bratwurst","Germany","Pork, spices","A traditional German sausage."],
    ["Fondue","Switzerland","Cheese, wine, bread","A famous Swiss dish."],
    ["Pierogi","Poland","Dough, potato, cheese","Traditional Polish dumplings."],
    ["Ceviche","Peru","Fish, lime, onion","A famous Peruvian dish."],
    ["Injera","Ethiopia","Teff flour, water","A fermented Ethiopian flatbread."],
    ["Jollof Rice","West Africa","Rice, tomato, spices","A popular West African rice dish."],
    ["Nasi Goreng","Indonesia","Rice, vegetables, spices","Indonesian fried rice."],
    ["Satay","Indonesia","Meat, skewers, sauce","Skewered meat served with sauce."],
    ["Laksa","Malaysia","Noodles, coconut, spices","A flavorful Southeast Asian noodle dish."],
    ["Rendang","Indonesia","Beef, coconut, spices","A slow-cooked Indonesian dish."],
    ["Adobo","Philippines","Meat, vinegar, soy sauce","A famous Filipino preparation."],
    ["Mango Sticky Rice","Thailand","Mango, sticky rice, coconut","A popular Thai dessert."],
    ["Bibimbap","South Korea","Rice, vegetables, egg","A Korean rice dish."],
    ["Bulgogi","South Korea","Beef, soy sauce, sesame","Korean marinated grilled beef."],
    ["Tempura","Japan","Seafood or vegetables, batter","Japanese light-battered food."],
    ["Takoyaki","Japan","Octopus, batter, sauce","A famous Japanese street food."],
    ["Dim Sum","China","Dumplings, buns, tea","A collection of small Chinese dishes."],
    ["Banh Mi","Vietnam","Bread, meat, herbs","A Vietnamese sandwich tradition."],
    ["Kebab","Turkey","Meat, spices, bread","A widely known grilled food tradition."],
    ["Koshari","Egypt","Rice, pasta, lentils","A famous Egyptian comfort food."],
    ["Arepa","Venezuela","Cornmeal, cheese, meat","A staple in parts of northern South America."],
    ["Hummus","Middle East","Chickpeas, tahini, lemon","A popular Middle Eastern dish."],
    ["Tagine","Morocco","Meat, vegetables, spices","A slow-cooked Moroccan dish."],
    ["Churros","Spain","Flour, water, sugar","A famous fried pastry."],
    ["Risotto","Italy","Rice, stock, cheese","A creamy Italian rice dish."]
  ];


  /* =========================================================
     FOOD DATABASE
     ========================================================= */

  const FOOD_ITEMS = [
    ["Pizza","Italy"],
    ["Sushi","Japan"],
    ["Tacos","Mexico"],
    ["Biryani","India"],
    ["Croissant","France"],
    ["Paella","Spain"],
    ["Ramen","Japan"],
    ["Kimchi","South Korea"],
    ["Pho","Vietnam"],
    ["Moussaka","Greece"],
    ["Couscous","Morocco"],
    ["Feijoada","Brazil"],
    ["Goulash","Hungary"],
    ["Pad Thai","Thailand"],
    ["Poutine","Canada"],
    ["Lasagna","Italy"],
    ["Dosa","India"],
    ["Idli","India"],
    ["Gulab Jamun","India"],
    ["Baklava","Turkey"],
    ["Tiramisu","Italy"],
    ["Gelato","Italy"],
    ["Pretzel","Germany"],
    ["Fondue","Switzerland"],
    ["Pierogi","Poland"],
    ["Ceviche","Peru"],
    ["Jollof Rice","West Africa"],
    ["Injera","Ethiopia"],
    ["Nasi Goreng","Indonesia"],
    ["Satay","Indonesia"],
    ["Laksa","Malaysia"],
    ["Adobo","Philippines"],
    ["Bibimbap","South Korea"],
    ["Bulgogi","South Korea"],
    ["Tempura","Japan"],
    ["Takoyaki","Japan"],
    ["Dim Sum","China"],
    ["Banh Mi","Vietnam"],
    ["Kebab","Turkey"],
    ["Koshari","Egypt"],
    ["Arepa","Venezuela"],
    ["Hummus","Middle East"],
    ["Tagine","Morocco"],
    ["Churros","Spain"],
    ["Schnitzel","Austria"],
    ["Risotto","Italy"],
    ["Carbonara","Italy"],
    ["Focaccia","Italy"],
    ["Mango Sticky Rice","Thailand"],
    ["Fish and Chips","United Kingdom"],
    ["Butter Chicken","India"]
  ];


  /* =========================================================
     100 EXPLORE PLACES
     ========================================================= */

  const EXPLORE_FOOD = [
    ["Rome","Italy","Pizza Margherita","Tomato, mozzarella, basil","A classic Italian pizza tradition."],
    ["Tokyo","Japan","Sushi","Rice, seafood, vinegar","A famous Japanese food tradition."],
    ["Mexico City","Mexico","Tacos","Tortilla, meat, salsa","A major center of Mexican food culture."],
    ["Hyderabad","India","Hyderabadi Biryani","Rice, spices, meat","A famous rice dish from Hyderabad."],
    ["Paris","France","Croissant","Flour, butter, yeast","A classic French pastry."],
    ["Valencia","Spain","Paella","Rice, saffron, vegetables","Paella is strongly associated with Valencia."],
    ["Seoul","South Korea","Bibimbap","Rice, vegetables, egg","A popular Korean rice dish."],
    ["Hanoi","Vietnam","Pho","Rice noodles, broth, herbs","A famous Vietnamese noodle soup."],
    ["Athens","Greece","Moussaka","Eggplant, meat, béchamel","A famous Greek baked dish."],
    ["Marrakesh","Morocco","Tagine","Meat, vegetables, spices","A famous Moroccan cooking tradition."],
    ["Cairo","Egypt","Koshari","Rice, pasta, lentils","A famous Egyptian street food."],
    ["Lima","Peru","Ceviche","Fish, lime, onion","A signature Peruvian dish."],
    ["Rio de Janeiro","Brazil","Feijoada","Beans, meat, spices","A famous Brazilian stew."],
    ["Budapest","Hungary","Goulash","Beef, paprika, onions","A traditional Hungarian dish."],
    ["Bangkok","Thailand","Pad Thai","Rice noodles, tofu, egg","A famous Thai noodle dish."],
    ["Toronto","Canada","Poutine","Fries, cheese curds, gravy","A famous Canadian comfort food."],
    ["Berlin","Germany","Bratwurst","Pork, spices","A traditional German sausage."],
    ["Vienna","Austria","Schnitzel","Meat, breadcrumbs","A famous Austrian dish."],
    ["Zurich","Switzerland","Fondue","Cheese, wine, bread","A famous Swiss food."],
    ["Warsaw","Poland","Pierogi","Dough, potato, cheese","Traditional Polish dumplings."],
    ["Addis Ababa","Ethiopia","Doro Wat","Chicken, spices, berbere","A famous Ethiopian dish."],
    ["Jakarta","Indonesia","Nasi Goreng","Rice, vegetables, spices","Indonesian fried rice."],
    ["Kuala Lumpur","Malaysia","Laksa","Noodles, coconut, spices","A flavorful Malaysian dish."],
    ["Manila","Philippines","Adobo","Meat, vinegar, soy sauce","A famous Filipino preparation."],
    ["Singapore","Singapore","Chicken Rice","Rice, chicken, sauce","A famous Singaporean dish."],
    ["Osaka","Japan","Takoyaki","Octopus, batter, sauce","A famous Japanese street food."],
    ["Beijing","China","Peking Duck","Duck, pancakes, sauce","A celebrated Chinese dish."],
    ["Istanbul","Turkey","Doner Kebab","Meat, bread, vegetables","A famous Turkish food."],
    ["Amman","Jordan","Mansaf","Rice, lamb, yogurt","A traditional Jordanian dish."],
    ["Riyadh","Saudi Arabia","Kabsa","Rice, meat, spices","A famous Saudi rice dish."],
    ["Lisbon","Portugal","Pastel de Nata","Pastry, custard, sugar","A famous Portuguese pastry."],
    ["New York","USA","New York Pizza","Dough, tomato, cheese","A famous American pizza style."],
    ["Chicago","USA","Deep Dish Pizza","Dough, tomato, cheese","A distinctive Chicago pizza."],
    ["New Orleans","USA","Gumbo","Seafood, sausage, vegetables","A famous Louisiana dish."],
    ["Montreal","Canada","Poutine","Fries, cheese curds, gravy","A Quebec comfort food."],
    ["Buenos Aires","Argentina","Asado","Beef, salt, fire","A famous Argentine barbecue tradition."],
    ["Bogota","Colombia","Ajiaco","Potatoes, chicken, corn","A traditional Colombian soup."],
    ["Quito","Ecuador","Locro de Papa","Potatoes, cheese, avocado","A traditional Ecuadorian soup."],
    ["Havana","Cuba","Ropa Vieja","Beef, peppers, tomato","A famous Cuban dish."],
    ["Sydney","Australia","Meat Pie","Pastry, meat, gravy","A famous Australian food."],
    ["Auckland","New Zealand","Hangi","Meat, vegetables, earth oven","A traditional Maori cooking method."],
    ["Kathmandu","Nepal","Momo","Dough, vegetables or meat","Popular Nepalese dumplings."],
    ["Colombo","Sri Lanka","Kottu","Flatbread, vegetables, meat","A famous Sri Lankan street food."],
    ["Dhaka","Bangladesh","Bhuna Khichuri","Rice, lentils, spices","A popular Bangladeshi dish."],
    ["Karachi","Pakistan","Nihari","Beef, spices, gravy","A famous Pakistani slow-cooked dish."],
    ["Amritsar","India","Amritsari Kulcha","Flour, potato, spices","A famous Punjabi bread."],
    ["Kolkata","India","Kathi Roll","Flatbread, filling, sauces","A popular Kolkata street food."],
    ["Chennai","India","Idli","Rice, lentils","A classic South Indian food."],
    ["Kochi","India","Appam","Rice, coconut","A popular Kerala food."],
    ["Goa","India","Goan Fish Curry","Fish, coconut, spices","A famous coastal Indian dish."],
    ["Jaipur","India","Dal Baati Churma","Lentils, wheat, ghee","A traditional Rajasthani meal."],
    ["Lucknow","India","Galouti Kebab","Meat, spices","A famous Lucknow dish."],
    ["Varanasi","India","Kachori Sabzi","Wheat, lentils, spices","A popular North Indian breakfast."],
    ["Ahmedabad","India","Dhokla","Gram flour, spices","A famous Gujarati steamed snack."],
    ["Bengaluru","India","Masala Dosa","Rice, lentils, potato","A popular South Indian dish."],
    ["Mysuru","India","Mysore Pak","Gram flour, ghee, sugar","A famous Karnataka sweet."],
    ["Pune","India","Misal Pav","Sprouts, spices, bread","A popular Maharashtrian dish."],
    ["Mumbai","India","Vada Pav","Potato, bread, chutney","A famous Mumbai street food."],
    ["Amalfi","Italy","Limoncello","Lemon, sugar, alcohol","A famous Italian lemon drink."],
    ["Naples","Italy","Neapolitan Pizza","Tomato, mozzarella, basil","A famous pizza tradition."],
    ["Bologna","Italy","Tagliatelle","Pasta, sauce","A classic Italian pasta."],
    ["Milan","Italy","Risotto","Rice, stock, cheese","A famous northern Italian dish."],
    ["Florence","Italy","Bistecca","Beef, salt, fire","A Tuscan grilled steak tradition."],
    ["Barcelona","Spain","Tapas","Bread, seafood, vegetables","A famous Spanish food tradition."],
    ["Seville","Spain","Gazpacho","Tomato, cucumber, olive oil","A classic Spanish cold soup."],
    ["Porto","Portugal","Francesinha","Bread, meat, cheese, sauce","A famous Porto sandwich."],
    ["Athens","Greece","Souvlaki","Meat, pita, vegetables","A popular Greek street food."],
    ["Thessaloniki","Greece","Bougatsa","Pastry, cream or cheese","A famous Greek pastry."],
    ["Istanbul","Turkey","Baklava","Pastry, nuts, syrup","A famous Turkish dessert."],
    ["Izmir","Turkey","Boyoz","Flour, oil","A traditional Izmir pastry."],
    ["Beirut","Lebanon","Tabbouleh","Parsley, bulgur, tomato","A famous Levantine salad."],
    ["Damascus","Syria","Kibbeh","Bulgur, meat, spices","A traditional Levantine dish."],
    ["Tehran","Iran","Ghormeh Sabzi","Herbs, beans, meat","A famous Persian stew."],
    ["Tbilisi","Georgia","Khachapuri","Bread, cheese, egg","A famous Georgian cheese bread."],
    ["Yerevan","Armenia","Dolma","Grape leaves, rice, meat","A popular Armenian dish."],
    ["Baku","Azerbaijan","Plov","Rice, meat, dried fruit","A famous Azerbaijani rice dish."],
    ["Moscow","Russia","Pelmeni","Dough, meat","Traditional Russian dumplings."],
    ["Stockholm","Sweden","Meatballs","Meat, breadcrumbs, sauce","A famous Swedish dish."],
    ["Helsinki","Finland","Karjalanpiirakka","Rye, rice, butter","A traditional Finnish pastry."],
    ["Oslo","Norway","Fiskesuppe","Fish, cream, vegetables","A traditional Norwegian soup."],
    ["Copenhagen","Denmark","Smorrebrod","Rye bread, toppings","A famous Danish open sandwich."],
    ["Amsterdam","Netherlands","Stroopwafel","Waffles, caramel","A famous Dutch snack."],
    ["Brussels","Belgium","Waffles","Flour, eggs, sugar","A famous Belgian food."],
    ["Dublin","Ireland","Irish Stew","Lamb, potatoes, vegetables","A traditional Irish dish."],
    ["London","United Kingdom","Fish and Chips","Fish, potatoes, batter","A classic British food."],
    ["Edinburgh","Scotland","Haggis","Oats, meat, spices","A traditional Scottish dish."],
    ["Nairobi","Kenya","Nyama Choma","Grilled meat, spices","A popular Kenyan food."],
    ["Cape Town","South Africa","Bobotie","Minced meat, spices, egg","A famous South African dish."],
    ["Lagos","Nigeria","Jollof Rice","Rice, tomato, spices","A popular West African dish."],
    ["Accra","Ghana","Waakye","Rice, beans, spices","A famous Ghanaian meal."],
    ["Marrakesh","Morocco","Couscous","Semolina, vegetables, meat","A North African staple."],
    ["Tunis","Tunisia","Brik","Pastry, egg, tuna","A famous Tunisian food."],
    ["Algiers","Algeria","Couscous","Semolina, vegetables, meat","A traditional Algerian staple."],
    ["Dakar","Senegal","Thieboudienne","Rice, fish, vegetables","A famous Senegalese dish."],
    ["Lima","Peru","Lomo Saltado","Beef, onion, tomato","A popular Peruvian dish."],
    ["Santiago","Chile","Empanada","Pastry, meat, onion","A popular Chilean food."],
    ["La Paz","Bolivia","Saltena","Pastry, meat, vegetables","A famous Bolivian pastry."],
    ["Montevideo","Uruguay","Chivito","Bread, beef, cheese","A famous Uruguayan sandwich."],
    ["Caracas","Venezuela","Arepa","Cornmeal, cheese, meat","A Venezuelan staple."]
  ];


  /* =========================================================
     HELPERS
     ========================================================= */

  function getNumber(key) {
    return Number(localStorage.getItem(key) || 0);
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function getDayIndex(total) {
    const start = new Date(START_DATE + "T00:00:00");
    const today = new Date();

    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const days = Math.floor(
      (today.getTime() - start.getTime()) / 86400000
    );

    return ((days % total) + total) % total;
  }

  function getTodayNumber(total) {
    return getDayIndex(total) + 1;
  }

  function photoUrl(keyword) {
    return (
      "https://loremflickr.com/1000/650/" +
      encodeURIComponent(keyword) +
      "?lock=" +
      encodeURIComponent(keyword)
    );
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "30px",
        transform: "translateX(-50%)",
        padding: "14px 22px",
        borderRadius: "30px",
        background: "#075a43",
        color: "#fff",
        zIndex: "99999",
        boxShadow: "0 10px 30px rgba(0,0,0,.18)",
        transition: "opacity .3s"
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(window.nijokToastTimer);

    window.nijokToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
    }, 2200);
  }


  /* =========================================================
     GAME MODAL
     ========================================================= */

  function getGameModal() {
    return document.getElementById("gameModal");
  }

  function openGameModal() {

    const modal = getGameModal();

    if (!modal) {
      console.error("NIJOK: #gameModal not found");
      return false;
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    return true;
  }

  function closeGame() {

    const modal = getGameModal();

    if (modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }

    stopTimer();

    answerLocked = false;
  }

  window.closeGame = closeGame;


  function setGameHeader(title, description) {

    const mode = document.getElementById("gameMode");
    const titleEl = document.getElementById("gameTitle");
    const desc = document.getElementById("gameDescription");

    if (mode) mode.textContent = currentMode;
    if (titleEl) titleEl.textContent = title;
    if (desc) desc.textContent = description;
  }


  function clearGameContent() {

    const question = document.getElementById("gameQuestion");
    const answers = document.getElementById("gameAnswers");

    if (question) question.innerHTML = "";
    if (answers) answers.innerHTML = "";
  }


  function updateQuestionCounter() {

    const counter = document.getElementById("questionCounter");
    const progress = document.getElementById("gameProgress");

    if (counter) {
      counter.textContent =
        `${currentQuestion + 1} / ${currentItems.length}`;
    }

    if (progress && currentItems.length) {

      const percent =
        ((currentQuestion + 1) / currentItems.length) * 100;

      progress.style.width = percent + "%";
    }
  }


  function updateGameScore() {

    const score = document.getElementById("gameScore");

    if (score) {
      score.textContent = currentScore;
    }
  }


  /* =========================================================
     OPTIONS
     ========================================================= */

  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
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
      "Australia"
    ];

    const result = [correct];

    shuffle(countries).forEach(country => {

      if (
        country !== correct &&
        !result.includes(country) &&
        result.length < 4
      ) {
        result.push(country);
      }

    });

    return shuffle(result);
  }


  function foodOptions(correct) {

    const foods = FOOD_ITEMS.map(item => item[0]);

    const result = [correct];

    shuffle(foods).forEach(food => {

      if (
        food !== correct &&
        !result.includes(food) &&
        result.length < 4
      ) {
        result.push(food);
      }

    });

    return shuffle(result);
  }


  /* =========================================================
     ANSWER BUTTON
     ========================================================= */

  function addAnswerButton(text, correct, callback) {

    const box = document.getElementById("gameAnswers");

    if (!box) return;

    const button = document.createElement("button");

    button.className = "game-answer";
    button.type = "button";
    button.textContent = text;

    button.addEventListener("click", () => {

      if (answerLocked) return;

      answerLocked = true;

      const buttons = box.querySelectorAll("button");

      buttons.forEach(btn => {
        btn.disabled = true;
      });

      if (correct) {

        button.classList.add("correct");

        currentScore += 1;

        showToast("Correct! 🌿");

        showKnowledgeMessage(true);

      } else {

        button.classList.add("wrong");

        showToast("Not quite — keep learning!");

        showKnowledgeMessage(false);

      }

      updateGameScore();

      if (callback) {
        callback(correct, button);
      }

    });

    box.appendChild(button);
  }


  /* =========================================================
     KNOWLEDGE POPUP
     ========================================================= */

  function showKnowledgeMessage(correct) {

    const modal = document.getElementById("knowledgeModal");

    const title = document.getElementById("knowledgeTitle");

    const text = document.getElementById("knowledgeText");

    if (modal && title && text) {

      title.textContent = "Knowledge Gained 🌿";

      text.textContent = correct
        ? "Great job! You discovered something new."
        : "Every answer teaches you something new.";

      modal.classList.add("show");

      modal.setAttribute("aria-hidden", "false");

      return;
    }

    showToast(
      correct
        ? "Knowledge gained! 🌿"
        : "Knowledge gained! 🌎"
    );
  }


  function closeKnowledgeModal() {

    const modal = document.getElementById("knowledgeModal");

    if (modal) {

      modal.classList.remove("show");

      modal.setAttribute("aria-hidden", "true");
    }
  }


  /* =========================================================
     TODAY'S CHALLENGE
     ========================================================= */

  function startTodayChallenge() {

    currentMode = "TODAY'S CHALLENGE";

    currentItems = [
      TODAY_CHALLENGE[getDayIndex(TODAY_CHALLENGE.length)]
    ];

    currentQuestion = 0;
    currentScore = 0;

    openGameModal();

    setGameHeader(
      "Today's Challenge",
      "One photo. One question. Complete the challenge and earn 10 points."
    );

    renderTodayChallenge();
  }


  function renderTodayChallenge() {

    const item = currentItems[0];

    const [food, country, question] = item;

    const q = document.getElementById("gameQuestion");

    const answers = document.getElementById("gameAnswers");

    const nextBtn = document.getElementById("nextBtn");

    updateQuestionCounter();

    updateGameScore();

    answerLocked = false;

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img
          src="${photoUrl(food)}"
          alt="${escapeHTML(food)}"
          onerror="this.style.display='none'"
        >
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(100)} / 100
      </div>

      <h3>${escapeHTML(question)}</h3>

      <p class="nijok-points">
        Complete the challenge = +10 points
      </p>
    `;

    answers.innerHTML = "";

    countryOptions(country).forEach(option => {

      addAnswerButton(
        option,
        option === country,
        () => {

          if (nextBtn) {

            nextBtn.style.display = "block";

            nextBtn.textContent = "Finish Challenge";

            nextBtn.onclick = finishDailyChallenge;
          }

        }
      );

    });
  }


  function finishDailyChallenge() {

    const today =
      new Date().toISOString().slice(0, 10);

    const alreadyCompleted =
      localStorage.getItem(STORAGE.completed) === today;

    if (!alreadyCompleted) {

      localStorage.setItem(
        STORAGE.completed,
        today
      );

      setNumber(
        STORAGE.score,
        getNumber(STORAGE.score) + 10
      );

    }

    const q = document.getElementById("gameQuestion");

    const answers = document.getElementById("gameAnswers");

    const nextBtn = document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div class="nijok-complete">

        <div class="nijok-complete-icon">
          🎉
        </div>

        <h3>
          Today's Challenge Complete!
        </h3>

        <p>
          You earned
        </p>

        <strong class="nijok-big-points">
          10 Points
        </strong>

        <p>
          Come back tomorrow for a new photo and question.
        </p>

      </div>
    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="continueAfterChallenge"
      >
        Continue
      </button>
    `;

    const continueBtn =
      document.getElementById("continueAfterChallenge");

    if (continueBtn) {
      continueBtn.onclick = closeGame;
    }

    updateScoreDisplay();

    showToast("10 points added! 🎉");
  }


  /* =========================================================
     DO YOU KNOW
     ========================================================= */

  function startFact() {

    currentMode = "DO YOU KNOW?";

    openGameModal();

    setGameHeader(
      "Do You Know?",
      "One beautiful food fact from around the world."
    );

    renderFact();
  }


  function renderFact() {

    const item =
      FOOD_FACTS[getDayIndex(FOOD_FACTS.length)];

    const [title, fact, place] = item;

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `

      <div class="nijok-game-photo">
        <img
          src="${photoUrl(title)}"
          alt="${escapeHTML(title)}"
          onerror="this.style.display='none'"
        >
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(50)} / 50
      </div>

      <h3>
        Did You Know?
      </h3>

      <h4>
        ${escapeHTML(title)}
      </h4>

      <p>
        ${escapeHTML(fact)}
      </p>

      <div class="nijok-fact-box">
        🌍 ${escapeHTML(place)}
      </div>

    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="factDone"
      >
        Nice! Explore More
      </button>
    `;

    document
      .getElementById("factDone")
      ?.addEventListener("click", closeGame);
  }


  /* =========================================================
     FOOD MUSEUM
     ========================================================= */

  function startMuseum() {

    currentMode = "FOOD MUSEUM";

    openGameModal();

    setGameHeader(
      "Food Museum",
      "Discover today's famous or unique dish."
    );

    renderMuseum();
  }


  function renderMuseum() {

    const item =
      FOOD_MUSEUM[getDayIndex(FOOD_MUSEUM.length)];

    const [
      dish,
      country,
      ingredients,
      fact
    ] = item;

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `

      <div class="nijok-game-photo">
        <img
          src="${photoUrl(dish)}"
          alt="${escapeHTML(dish)}"
          onerror="this.style.display='none'"
        >
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(50)} / 50
      </div>

      <h3>
        ${escapeHTML(dish)}
      </h3>

      <p>
        <strong>Origin:</strong>
        ${escapeHTML(country)}
      </p>

      <p>
        <strong>Ingredients:</strong>
        ${escapeHTML(ingredients)}
      </p>

      <div class="nijok-fact-box">
        ${escapeHTML(fact)}
      </div>

    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="museumDone"
      >
        Continue Exploring
      </button>
    `;

    document
      .getElementById("museumDone")
      ?.addEventListener("click", closeGame);
  }


  /* =========================================================
     EXPLORE FOOD
     ========================================================= */

  function startExplore() {

    currentMode = "EXPLORE FOOD";

    openGameModal();

    setGameHeader(
      "Explore Food",
      "Explore one place, one food and its story."
    );

    renderExplore();
  }


  function renderExplore() {

    const item =
      EXPLORE_FOOD[getDayIndex(EXPLORE_FOOD.length)];

    const [
      place,
      country,
      food,
      ingredients,
      fact
    ] = item;

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `

      <div class="nijok-game-photo">
        <img
          src="${photoUrl(place + " food")}"
          alt="${escapeHTML(place)}"
          onerror="this.style.display='none'"
        >
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(100)} / 100
      </div>

      <h3>
        📍 ${escapeHTML(place)}
      </h3>

      <p>
        <strong>Country:</strong>
        ${escapeHTML(country)}
      </p>

      <p>
        <strong>Famous Food:</strong>
        ${escapeHTML(food)}
      </p>

      <p>
        <strong>Main Ingredients:</strong>
        ${escapeHTML(ingredients)}
      </p>

      <div class="nijok-fact-box">
        ${escapeHTML(fact)}
      </div>

    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="exploreDone"
      >
        Explore More
      </button>
    `;

    document
      .getElementById("exploreDone")
      ?.addEventListener("click", closeGame);
  }


  /* =========================================================
     500 FOOD QUIZ QUESTIONS
     ========================================================= */

  function buildFoodQuizBank() {

    const bank = [];

    const templates = [

      {
        q: food => `Which country is ${food[0]} associated with?`,
        answer: item => item[1],
        type: "country"
      },

      {
        q: food => `Which country is famous for ${food[0]}?`,
        answer: item => item[1],
        type: "country"
      },

      {
        q: food => `${food[0]} is traditionally connected with which place?`,
        answer: item => item[1],
        type: "country"
      },

      {
        q: food => `Where would you most likely find traditional ${food[0]}?`,
        answer: item => item[1],
        type: "country"
      },

      {
        q: food => `Which food is associated with ${food[1]}?`,
        answer: item => item[0],
        type: "food"
      },

      {
        q: food => `Which dish is connected with ${food[1]} food culture?`,
        answer: item => item[0],
        type: "food"
      },

      {
        q: food => `Identify the food associated with ${food[1]}.`,
        answer: item => item[0],
        type: "food"
      },

      {
        q: food => `Which traditional food is linked with ${food[1]}?`,
        answer: item => item[0],
        type: "food"
      },

      {
        q: food => `Food Quiz: Which place is connected with ${food[0]}?`,
        answer: item => item[1],
        type: "country"
      },

      {
        q: food => `Can you identify the cuisine connected with ${food[0]}?`,
        answer: item => item[1],
        type: "country"
      }

    ];

    FOOD_ITEMS.forEach(item => {

      templates.forEach(template => {

        bank.push({
          question: template.q(item),
          answer: template.answer(item),
          type: template.type
        });

      });

    });

    return bank.slice(0, 500);
  }

  const FOOD_QUIZ = buildFoodQuizBank();


  /* =========================================================
     500 GUESS THE FOOD QUESTIONS
     ========================================================= */

  function buildGuessBank() {

    const bank = [];

    const templates = [

      item => `This food is associated with ${item[1]}. What is it?`,

      item => `Guess the food: It is famous in ${item[1]}.`,

      item => `Can you identify this dish from ${item[1]}?`,

      item => `Which famous food comes from ${item[1]}?`,

      item => `Guess this traditional food connected with ${item[1]}.`,

      item => `Your clue is ${item[1]}. Guess the food.`,

      item => `One country, one food. Country: ${item[1]}.`,

      item => `Which dish is strongly connected with ${item[1]}?`,

      item => `Food mystery: Which food belongs to ${item[1]}?`,

      item => `Can you guess the famous food from ${item[1]}?`

    ];

    FOOD_ITEMS.forEach(item => {

      templates.forEach(template => {

        bank.push({
          clue: template(item),
          answer: item[0]
        });

      });

    });

    return bank.slice(0, 500);
  }

  const GUESS_BANK = buildGuessBank();


  /* =========================================================
     START FOOD QUIZ
     ========================================================= */

  function startQuiz() {

    currentMode = "FOOD QUIZ";

    currentItems =
      shuffle(FOOD_QUIZ).slice(0, 10);

    currentQuestion = 0;

    currentScore = 0;

    openGameModal();

    setGameHeader(
      "Food Quiz",
      "Test your knowledge of food and culture."
    );

    renderQuizQuestion();
  }


  function renderQuizQuestion() {

    if (currentQuestion >= currentItems.length) {

      finishRegularGame("Food Quiz");

      return;
    }

    answerLocked = false;

    const item =
      currentItems[currentQuestion];

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    updateQuestionCounter();

    updateGameScore();

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    const options =
      item.type === "country"
        ? countryOptions(item.answer)
        : foodOptions(item.answer);

    q.innerHTML = `
      <h3>
        ${escapeHTML(item.question)}
      </h3>
    `;

    answers.innerHTML = "";

    options.forEach(option => {

      addAnswerButton(
        option,
        option === item.answer,
        () => {

          if (nextBtn) {

            nextBtn.style.display = "block";

            nextBtn.textContent =
              currentQuestion === currentItems.length - 1
                ? "Finish Quiz"
                : "Next Question";

          }

        }
      );

    });
  }


  /* =========================================================
     START GUESS THE FOOD
     ========================================================= */

  function startGuess() {

    currentMode = "GUESS THE FOOD";

    currentItems =
      shuffle(GUESS_BANK).slice(0, 10);

    currentQuestion = 0;

    currentScore = 0;

    openGameModal();

    setGameHeader(
      "Guess the Food",
      "Read the clue and identify the food."
    );

    renderGuessQuestion();
  }


  function renderGuessQuestion() {

    if (currentQuestion >= currentItems.length) {

      finishRegularGame("Guess the Food");

      return;
    }

    answerLocked = false;

    const item =
      currentItems[currentQuestion];

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    updateQuestionCounter();

    updateGameScore();

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img
          src="${photoUrl(item.answer)}"
          alt="${escapeHTML(item.answer)}"
          onerror="this.style.display='none'"
        >
      </div>

      <h3>
        ${escapeHTML(item.clue)}
      </h3>
    `;

    answers.innerHTML = "";

    foodOptions(item.answer).forEach(option => {

      addAnswerButton(
        option,
        option === item.answer,
        () => {

          if (nextBtn) {

            nextBtn.style.display = "block";

            nextBtn.textContent =
              currentQuestion === currentItems.length - 1
                ? "Finish Game"
                : "Next Question";

          }

        }
      );

    });
  }


  /* =========================================================
     100 MATCH PAIRS
     ========================================================= */

  function buildPairs() {

    const extraFoods = [
      ["Pavlova","Australia"],
      ["Hangi","New Zealand"],
      ["Kottu","Sri Lanka"],
      ["Momo","Nepal"],
      ["Nihari","Pakistan"],
      ["Dhokla","India"],
      ["Vada Pav","India"],
      ["Misal Pav","India"],
      ["Kachori","India"],
      ["Aloo Paratha","India"],
      ["Appam","India"],
      ["Pongal","India"],
      ["Poha","India"],
      ["Upma","India"],
      ["Dhokla","India"],
      ["Kheer","India"],
      ["Jalebi","India"],
      ["Rasgulla","India"],
      ["Pani Puri","India"],
      ["Chole Bhature","India"],
      ["Dal Baati","India"],
      ["Aloo Gobi","India"],
      ["Palak Paneer","India"],
      ["Paneer Tikka","India"],
      ["Rajma Chawal","India"],
      ["Pav Bhaji","India"],
      ["Kathi Roll","India"],
      ["Samosa","India"],
      ["Litti Chokha","India"],
      ["Sarson Saag","India"],
      ["Thukpa","Tibet"],
      ["Chow Mein","China"],
      ["Mapo Tofu","China"],
      ["Hot Pot","China"],
      ["Spring Rolls","China"],
      ["Xiaolongbao","China"],
      ["Kung Pao Chicken","China"],
      ["Char Siu","China"],
      ["Mooncake","China"],
      ["Udon","Japan"],
      ["Okonomiyaki","Japan"],
      ["Miso Soup","Japan"],
      ["Mochi","Japan"],
      ["Onigiri","Japan"],
      ["Yakitori","Japan"],
      ["Shakshuka","North Africa"],
      ["Harira","Morocco"],
      ["Mansaf","Jordan"],
      ["Kabsa","Saudi Arabia"],
      ["Ful Medames","Egypt"]
    ];

    return [
      ...FOOD_ITEMS,
      ...extraFoods
    ];
  }


  const MATCH_PAIRS = buildPairs();


  function startMatch() {

    currentMode = "MATCH THE PAIR";

    openGameModal();

    setGameHeader(
      "Match the Pair",
      "Match each food with its country."
    );

    currentScore = 0;

    renderMatchGame();
  }


  function renderMatchGame() {

    const pairs =
      shuffle(MATCH_PAIRS).slice(0, 5);

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    updateGameScore();

    q.innerHTML = `
      <h3>
        Match the Food with the Correct Country
      </h3>

      <p>
        Choose the country for each food.
      </p>
    `;

    answers.innerHTML = "";

    pairs.forEach((pair, index) => {

      const wrapper =
        document.createElement("div");

      wrapper.style.marginBottom = "16px";

      const label =
        document.createElement("div");

      label.textContent =
        `${index + 1}. ${pair[0]}`;

      label.style.fontWeight = "700";

      label.style.marginBottom = "7px";

      wrapper.appendChild(label);

      const select =
        document.createElement("select");

      select.style.width = "100%";

      select.style.padding = "12px";

      select.style.borderRadius = "12px";

      select.style.border = "1px solid #d8dfd0";

      const defaultOption =
        document.createElement("option");

      defaultOption.value = "";

      defaultOption.textContent =
        "Choose country";

      select.appendChild(defaultOption);

      const options =
        countryOptions(pair[1]);

      options.forEach(country => {

        const option =
          document.createElement("option");

        option.value = country;

        option.textContent = country;

        select.appendChild(option);

      });

      select.dataset.answer = pair[1];

      wrapper.appendChild(select);

      answers.appendChild(wrapper);

    });

    const checkButton =
      document.createElement("button");

    checkButton.className =
      "nijok-primary-action";

    checkButton.type = "button";

    checkButton.textContent =
      "Check Matches";

    checkButton.addEventListener(
      "click",
      () => {

        let score = 0;

        answers
          .querySelectorAll("select")
          .forEach(select => {

            if (
              select.value ===
              select.dataset.answer
            ) {

              score++;

            }

          });

        currentScore = score;

        updateGameScore();

        showToast(
          `${score}/5 matches correct!`
        );

        checkButton.textContent =
          "Done";

        checkButton.disabled = true;

      }
    );

    answers.appendChild(checkButton);
  }


  /* =========================================================
     500 TIME CHALLENGE QUESTIONS
     ========================================================= */

  function buildTimeBank() {

    const bank = [];

    const templates = [

      item =>
        `You have 30 seconds! Which country is ${item[0]} associated with?`,

      item =>
        `Quick! ${item[0]} is connected with which country?`,

      item =>
        `Beat the clock: Where is ${item[0]} famous?`,

      item =>
        `Speed question: Which country is known for ${item[0]}?`,

      item =>
        `Time Challenge: ${item[0]} belongs to which cuisine?`,

      item =>
        `Fast food fact: Which country is linked with ${item[0]}?`,

      item =>
        `30-second challenge: Identify the country for ${item[0]}.`,

      item =>
        `Quick food challenge: ${item[0]} is from where?`,

      item =>
        `Race the clock: Which country is associated with ${item[0]}?`,

      item =>
        `Final speed question: ${item[0]} belongs to which food culture?`

    ];

    FOOD_ITEMS.forEach(item => {

      templates.forEach(template => {

        bank.push({
          question: template(item),
          answer: item[1]
        });

      });

    });

    return bank.slice(0, 500);
  }

  const TIME_BANK = buildTimeBank();


  /* =========================================================
     TIME CHALLENGE
     ========================================================= */

  function startTimeChallenge() {

    currentMode = "TIME CHALLENGE";

    currentItems =
      shuffle(TIME_BANK).slice(0, 10);

    currentQuestion = 0;

    currentScore = 0;

    openGameModal();

    setGameHeader(
      "Time Challenge",
      "Answer as many questions as you can before time runs out."
    );

    renderTimeQuestion();
  }


  function startTimer() {

    stopTimer();

    timeLeft = 30;

    updateTimerDisplay();

    timerInterval =
      setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

          stopTimer();

          finishTimeChallenge();

        }

      }, 1000);
  }


  function stopTimer() {

    if (timerInterval) {

      clearInterval(timerInterval);

      timerInterval = null;

    }
  }


  function updateTimerDisplay() {

    const q =
      document.getElementById("gameQuestion");

    if (!q) return;

    let timer =
      document.getElementById("nijokTimer");

    if (!timer) {

      timer =
        document.createElement("div");

      timer.id =
        "nijokTimer";

      timer.style.fontWeight = "700";

      timer.style.marginBottom = "15px";

      q.prepend(timer);

    }

    timer.textContent =
      `⏱️ ${timeLeft} seconds`;
  }


  function renderTimeQuestion() {

    if (currentQuestion >= currentItems.length) {

      finishTimeChallenge();

      return;
    }

    answerLocked = false;

    const item =
      currentItems[currentQuestion];

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    updateQuestionCounter();

    updateGameScore();

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div id="nijokTimer"
           style="font-weight:700;margin-bottom:15px;">
        ⏱️ 30 seconds
      </div>

      <h3>
        ${escapeHTML(item.question)}
      </h3>
    `;

    answers.innerHTML = "";

    countryOptions(item.answer).forEach(option => {

      addAnswerButton(
        option,
        option === item.answer,
        () => {

          currentQuestion++;

          renderTimeQuestion();

        }
      );

    });

    startTimer();
  }


  function finishTimeChallenge() {

    stopTimer();

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div class="nijok-complete">

        <div class="nijok-complete-icon">
          ⏱️
        </div>

        <h3>
          Time's Up!
        </h3>

        <p>
          Your score
        </p>

        <strong class="nijok-big-points">
          ${currentScore}
        </strong>

        <p>
          Great effort! Try again and beat your score.
        </p>

      </div>
    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="timeDone"
      >
        Continue
      </button>
    `;

    document
      .getElementById("timeDone")
      ?.addEventListener("click", closeGame);
  }


  /* =========================================================
     REGULAR GAME FINISH
     ========================================================= */

  function finishRegularGame(gameName) {

    stopTimer();

    const q =
      document.getElementById("gameQuestion");

    const answers =
      document.getElementById("gameAnswers");

    const nextBtn =
      document.getElementById("nextBtn");

    if (nextBtn) {
      nextBtn.style.display = "none";
    }

    q.innerHTML = `
      <div class="nijok-complete">

        <div class="nijok-complete-icon">
          🎉
        </div>

        <h3>
          ${escapeHTML(gameName)} Complete!
        </h3>

        <p>
          Your score
        </p>

        <strong class="nijok-big-points">
          ${currentScore}
        </strong>

        <p>
          Keep exploring food and culture!
        </p>

      </div>
    `;

    answers.innerHTML = `
      <button
        type="button"
        class="nijok-primary-action"
        id="gameDone"
      >
        Continue
      </button>
    `;

    document
      .getElementById("gameDone")
      ?.addEventListener("click", closeGame);
  }


  /* =========================================================
     NEXT BUTTON
     ========================================================= */

  function handleNext() {

    if (
      currentMode === "FOOD QUIZ"
    ) {

      currentQuestion++;

      renderQuizQuestion();

      return;
    }

    if (
      currentMode === "GUESS THE FOOD"
    ) {

      currentQuestion++;

      renderGuessQuestion();

      return;
    }

  }


  /* =========================================================
     START GAME
     ========================================================= */

  function startGame(type) {

    if (!type) return;

    type =
      String(type)
        .toLowerCase()
        .trim();

    switch (type) {

      case "today":
      case "today-challenge":
        startTodayChallenge();
        break;

      case "fact":
      case "do-you-know":
        startFact();
        break;

      case "museum":
      case "food-museum":
        startMuseum();
        break;

      case "explore":
      case "explore-food":
        startExplore();
        break;

      case "quiz":
      case "food-quiz":
        startQuiz();
        break;

      case "guess":
      case "guess-food":
      case "guess-the-food":
        startGuess();
        break;

      case "match":
      case "pair":
      case "match-pair":
      case "match-the-pair":
        startMatch();
        break;

      case "time":
      case "time-challenge":
        startTimeChallenge();
        break;

      default:
        console.warn(
          "NIJOK: Unknown game:",
          type
        );

    }
  }

  window.startGame = startGame;


  /* =========================================================
     SCORE
     ========================================================= */

  function updateScoreDisplay() {

    const score =
      getNumber(STORAGE.score);

    const totalScore =
      document.getElementById("totalScore");

    if (totalScore) {
      totalScore.textContent = score;
    }

    const scoreElements =
      document.querySelectorAll(
        "[data-score], .score-value, .user-score"
      );

    scoreElements.forEach(element => {
      element.textContent = score;
    });

    const progressBar =
      document.getElementById("progressBar");

    if (progressBar) {

      const percent =
        Math.min(100, score);

      progressBar.style.width =
        percent + "%";

    }

    const level =
      document.getElementById("level");

    if (level) {

      if (score >= 100) {
        level.textContent = "Food Master";
      } else if (score >= 50) {
        level.textContent = "Food Explorer";
      } else if (score >= 20) {
        level.textContent = "Food Learner";
      } else {
        level.textContent = "Beginner";
      }

    }
  }


  /* =========================================================
     HEADER AUTH
     ========================================================= */

  function openAuthModal() {

    const modal =
      document.getElementById("authModal");

    if (!modal) return;

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  function closeAuthModal() {

    const modal =
      document.getElementById("authModal");

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  function setupLogin() {

    const registerButtons =
      document.querySelectorAll(
        "button, a"
      );

    registerButtons.forEach(button => {

      const text =
        button.textContent
          .trim()
          .toLowerCase();

      if (
        text === "register" ||
        text === "sign up"
      ) {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            openAuthModal();

          }
        );

      }

    });


    const save =
      document.getElementById(
        "registerSave"
      );

    if (save) {

      save.addEventListener(
        "click",
        () => {

          const name =
            document
              .getElementById("registerName")
              ?.value
              .trim();

          const email =
            document
              .getElementById("registerEmail")
              ?.value
              .trim();

          if (!name || !email) {

            showToast(
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

          showToast(
            `Welcome ${name}! 🌿`
          );

          closeAuthModal();

        }
      );

    }


    const guest =
      document.getElementById(
        "continueGuest"
      );

    if (guest) {

      guest.addEventListener(
        "click",
        () => {

          localStorage.setItem(
            STORAGE.guest,
            "true"
          );

          showToast(
            "Continuing as Guest 🌿"
          );

          closeAuthModal();

        }
      );

    }
  }


  /* =========================================================
     HOW IT WORKS
     ========================================================= */

  function openHowModal() {

    const modal =
      document.getElementById(
        "howModal"
      );

    if (!modal) return;

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  function closeHowModal() {

    const modal =
      document.getElementById(
        "howModal"
      );

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  /* =========================================================
     FACT MODAL
     ========================================================= */

  function closeFactModal() {

    const modal =
      document.getElementById(
        "factModal"
      );

    if (!modal) return;

    modal.classList.remove("show");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  /* =========================================================
     COMMUNITY COMMENTS
     ========================================================= */

  function setupComments() {

    const input =
      document.getElementById(
        "commentInput"
      );

    const button =
      document.getElementById(
        "commentBtn"
      );

    const list =
      document.getElementById(
        "commentList"
      );

    if (!input || !button || !list) {
      return;
    }

    button.addEventListener(
      "click",
      () => {

        const value =
          input.value.trim();

        if (!value) {

          showToast(
            "Write a comment first."
          );

          return;
        }

        const comment =
          document.createElement("div");

        comment.className =
          "nijok-comment";

        comment.innerHTML = `
          <strong>
            Food Explorer
          </strong>

          <p>
            ${escapeHTML(value)}
          </p>
        `;

        list.prepend(comment);

        input.value = "";

        showToast(
          "Comment added! 🌿"
        );

      }
    );
  }


  /* =========================================================
     CARD BUTTONS
     ========================================================= */

  function connectGameCards() {

    document
      .querySelectorAll("[data-game]")
      .forEach(card => {

        card.addEventListener(
          "click",
          event => {

            event.preventDefault();

            const game =
              card.dataset.game;

            startGame(game);

          }
        );

      });
  }


  /* =========================================================
     HERO BUTTONS
     ========================================================= */

  function connectTextButtons() {

    document
      .querySelectorAll("button, a")
      .forEach(element => {

        if (
          element.dataset.game
        ) {
          return;
        }

        const text =
          element.textContent
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

        if (
          text === "start playing" ||
          text === "play now"
        ) {

          element.addEventListener(
            "click",
            event => {

              event.preventDefault();

              startGame("quiz");

            }
          );

        }


        if (
          text === "how it works"
        ) {

          element.addEventListener(
            "click",
            event => {

              event.preventDefault();

              openHowModal();

            }
          );

        }

      });
  }


  /* =========================================================
     CLOSE BUTTONS
     ========================================================= */

  function setupCloseButtons() {

    const closeGameBtn =
      document.getElementById(
        "closeGame"
      );

    if (closeGameBtn) {

      closeGameBtn.addEventListener(
        "click",
        closeGame
      );

    }


    const closeAuthBtn =
      document.getElementById(
        "closeAuth"
      );

    if (closeAuthBtn) {

      closeAuthBtn.addEventListener(
        "click",
        closeAuthModal
      );

    }


    const closeHowBtn =
      document.getElementById(
        "closeHow"
      );

    if (closeHowBtn) {

      closeHowBtn.addEventListener(
        "click",
        closeHowModal
      );

    }


    const closeFactBtn =
      document.getElementById(
        "closeFact"
      );

    if (closeFactBtn) {

      closeFactBtn.addEventListener(
        "click",
        closeFactModal
      );

    }


    const closeKnowledgeBtn =
      document.getElementById(
        "closeKnowledge"
      );

    if (closeKnowledgeBtn) {

      closeKnowledgeBtn.addEventListener(
        "click",
        closeKnowledgeModal
      );

    }


    const knowledgeClose =
      document.getElementById(
        "knowledgeClose"
      );

    if (knowledgeClose) {

      knowledgeClose.addEventListener(
        "click",
        closeKnowledgeModal
      );

    }
  }


  /* =========================================================
     MODAL BACKDROP
     ========================================================= */

  function setupGlobalEvents() {

    const gameModal =
      document.getElementById(
        "gameModal"
      );

    if (gameModal) {

      gameModal.addEventListener(
        "click",
        event => {

          if (
            event.target === gameModal
          ) {

            closeGame();

          }

        }
      );

    }


    const authModal =
      document.getElementById(
        "authModal"
      );

    if (authModal) {

      authModal.addEventListener(
        "click",
        event => {

          if (
            event.target === authModal
          ) {

            closeAuthModal();

          }

        }
      );

    }


    const howModal =
      document.getElementById(
        "howModal"
      );

    if (howModal) {

      howModal.addEventListener(
        "click",
        event => {

          if (
            event.target === howModal
          ) {

            closeHowModal();

          }

        }
      );

    }


    const knowledgeModal =
      document.getElementById(
        "knowledgeModal"
      );

    if (knowledgeModal) {

      knowledgeModal.addEventListener(
        "click",
        event => {

          if (
            event.target === knowledgeModal
          ) {

            closeKnowledgeModal();

          }

        }
      );

    }


    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {

          closeGame();

          closeAuthModal();

          closeHowModal();

          closeFactModal();

          closeKnowledgeModal();

        }

      }
    );
  }


  /* =========================================================
     NEXT BUTTON
     ========================================================= */

  function setupNextButton() {

    const nextBtn =
      document.getElementById(
        "nextBtn"
      );

    if (!nextBtn) return;

    nextBtn.addEventListener(
      "click",
      handleNext
    );
  }


  /* =========================================================
     NAVIGATION
     ========================================================= */

  function setupNavigation() {

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(link => {

        link.addEventListener(
          "click",
          event => {

            const targetId =
              link.getAttribute("href");

            if (
              !targetId ||
              targetId === "#"
            ) {
              return;
            }

            const target =
              document.querySelector(
                targetId
              );

            if (target) {

              event.preventDefault();

              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }

          }
        );

      });
  }


  /* =========================================================
     INITIALIZE
     ========================================================= */

  function init() {

    setupCloseButtons();

    setupGlobalEvents();

    setupNextButton();

    setupLogin();

    setupComments();

    connectGameCards();

    connectTextButtons();

    setupNavigation();

    updateScoreDisplay();

    console.log(
      "NIJOK loaded successfully 🌿"
    );

    console.log(
      "Food Quiz:",
      FOOD_QUIZ.length,
      "questions"
    );

    console.log(
      "Guess the Food:",
      GUESS_BANK.length,
      "questions"
    );

    console.log(
      "Time Challenge:",
      TIME_BANK.length,
      "questions"
    );

    console.log(
      "Match pairs:",
      MATCH_PAIRS.length
    );

    console.log(
      "Daily Facts:",
      FOOD_FACTS.length
    );

    console.log(
      "Food Museum:",
      FOOD_MUSEUM.length
    );

    console.log(
      "Explore Food:",
      EXPLORE_FOOD.length
    );
  }


  /* =========================================================
     GLOBAL FUNCTIONS
     ========================================================= */

  window.startGame = startGame;
  window.openGame = startGame;

  window.openTodayChallenge =
    () => startGame("today");

  window.openDoYouKnow =
    () => startGame("fact");

  window.openFoodMuseum =
    () => startGame("museum");

  window.openExploreFood =
    () => startGame("explore");

  window.openFoodQuiz =
    () => startGame("quiz");

  window.openGuessFood =
    () => startGame("guess");

  window.openMatchPair =
    () => startGame("match");

  window.openTimeChallenge =
    () => startGame("time");


  /* =========================================================
     START
     ========================================================= */

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      init
    );

  } else {

    init();

  }

})();
