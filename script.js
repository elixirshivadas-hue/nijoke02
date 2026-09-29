/* =========================================================
   NIJOK - FOOD & CULTURE EXPERIENCE
   SINGLE CLEAN JAVASCRIPT FILE
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
     TODAY'S CHALLENGE - 100 QUESTIONS
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
    ["Falafel","Middle East","Falafel is a popular food across which region?"],
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
    ["Hainanese Chicken Rice","Singapore","Hainanese chicken rice is a famous dish in which country?"],
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
    ["Goi Cuon","Vietnam","Goi cuon is a Vietnamese type of what?"],
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
    ["Pani Puri","India","Pani puri is a famous Indian street food."],
    ["Rajma Chawal","India","Rajma chawal is associated with which cuisine?"]
  ];

  /* =========================================================
     DO YOU KNOW - 50 FACTS
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
     FOOD MUSEUM - 50
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
    ["Xiaolongbao","China","Dough, pork, broth","Soup-filled Chinese dumplings."],
    ["Banh Mi","Vietnam","Bread, meat, herbs","A famous Vietnamese sandwich."],
    ["Doner Kebab","Turkey","Meat, bread, vegetables","A well-known Turkish-style dish."],
    ["Koshari","Egypt","Rice, pasta, lentils, chickpeas","A famous Egyptian street food."],
    ["Pastel de Nata","Portugal","Pastry, custard","A famous Portuguese custard tart."],
    ["Hangi","New Zealand","Meat, vegetables, earth oven","A traditional Maori cooking method."],
    ["Arepa","Venezuela","Corn flour, cheese, meat","A corn-based food popular in Venezuela and Colombia."]
  ];

  /* =========================================================
     100 EXPLORE FOOD PLACES
     ========================================================= */

  const EXPLORE_FOOD = [
    ["Hyderabad","India","Biryani","Rice, meat, spices","Hyderabad is famous for its aromatic biryani tradition."],
    ["Mumbai","India","Vada Pav","Potato, bread, chili","A popular Mumbai street food."],
    ["Delhi","India","Chole Bhature","Chickpeas, flour, spices","A famous North Indian combination."],
    ["Kolkata","India","Kathi Roll","Flatbread, meat, vegetables","A popular Kolkata street food."],
    ["Chennai","India","Dosa","Rice, lentils","A South Indian staple."],
    ["Bengaluru","India","Bisi Bele Bath","Rice, lentils, vegetables","A Karnataka specialty."],
    ["Lucknow","India","Galouti Kebab","Meat, spices","Lucknow is famous for Awadhi cuisine."],
    ["Amritsar","India","Amritsari Kulcha","Flour, potato, spices","A famous Punjabi bread."],
    ["Jaipur","India","Dal Baati Churma","Lentils, wheat, ghee","A classic Rajasthani meal."],
    ["Goa","India","Fish Curry","Fish, coconut, spices","Goan cuisine is known for seafood and coconut."],
    ["Kochi","India","Appam","Rice, coconut","A popular Kerala food."],
    ["Mysuru","India","Mysore Pak","Gram flour, ghee, sugar","A famous Karnataka sweet."],
    ["Pune","India","Misal Pav","Sprouts, spices, bread","A popular Maharashtrian dish."],
    ["Ahmedabad","India","Dhokla","Gram flour, yogurt","A famous Gujarati snack."],
    ["Surat","India","Locho","Gram flour, spices","A popular Surat snack."],
    ["Varanasi","India","Tamatar Chaat","Tomato, potato, spices","A distinctive Varanasi street food."],
    ["Agra","India","Petha","Ash gourd, sugar","One of Agra's famous sweets."],
    ["Jodhpur","India","Mirchi Vada","Chili, gram flour","A spicy Rajasthani snack."],
    ["Nagpur","India","Tarri Poha","Flattened rice, sprouts, spices","Nagpur is known for spicy poha."],
    ["Indore","India","Poha","Flattened rice, onion, sev","A famous breakfast in Indore."],
    ["Amritsar","India","Kulcha","Flour, potato, butter","A famous Punjabi bread."],
    ["Srinagar","India","Rogan Josh","Meat, spices","A Kashmiri specialty."],
    ["Leh","India","Thukpa","Noodles, vegetables, broth","Popular Himalayan comfort food."],
    ["Darjeeling","India","Momos","Dough, vegetables, meat","A popular Himalayan food."],
    ["Shillong","India","Jadoh","Rice, meat, spices","A traditional Meghalaya rice dish."],
    ["Panaji","India","Bebinca","Coconut milk, flour, sugar","A famous Goan layered dessert."],
    ["Thiruvananthapuram","India","Sadya","Rice, vegetables, coconut","A traditional Kerala feast."],
    ["Madurai","India","Jigarthanda","Milk, almond gum, syrup","A famous cooling drink."],
    ["Visakhapatnam","India","Royyala Iguru","Prawns, onion, spices","A coastal Andhra seafood dish."],
    ["Vijayawada","India","Gongura Pachadi","Gongura leaves, chili","A popular Andhra preparation."],
    ["Warangal","India","Sarva Pindi","Rice flour, peanuts, chili","A traditional Telangana snack."],
    ["Chandigarh","India","Chole Bhature","Chickpeas, flour, spices","A popular North Indian food."],
    ["Kathmandu","Nepal","Momos","Dough, vegetables, meat","Momos are a major part of Nepali food culture."],
    ["Dhaka","Bangladesh","Kacchi Biryani","Rice, meat, spices","A famous Bangladeshi rice dish."],
    ["Colombo","Sri Lanka","Kottu Roti","Roti, vegetables, meat","A famous Sri Lankan street food."],
    ["Bangkok","Thailand","Pad Thai","Rice noodles, tamarind, egg","A signature Thai dish."],
    ["Tokyo","Japan","Sushi","Rice, seafood, vinegar","A global symbol of Japanese cuisine."],
    ["Osaka","Japan","Takoyaki","Octopus, batter, sauce","A famous Osaka street food."],
    ["Kyoto","Japan","Kaiseki","Seasonal ingredients","Traditional Japanese dining."],
    ["Seoul","South Korea","Bibimbap","Rice, vegetables, egg","A popular Korean dish."],
    ["Beijing","China","Peking Duck","Duck, pancakes, sauce","A famous Beijing dish."],
    ["Shanghai","China","Xiaolongbao","Dough, pork, broth","Famous Shanghai soup dumplings."],
    ["Hanoi","Vietnam","Pho","Noodles, broth, herbs","A famous Vietnamese noodle soup."],
    ["Ho Chi Minh City","Vietnam","Banh Mi","Bread, meat, herbs","A famous Vietnamese sandwich."],
    ["Kuala Lumpur","Malaysia","Nasi Lemak","Rice, coconut, sambal","Malaysia's famous national dish."],
    ["Jakarta","Indonesia","Nasi Goreng","Rice, spices, vegetables","A classic Indonesian dish."],
    ["Bali","Indonesia","Babi Guling","Pork, spices","A famous Balinese dish."],
    ["Manila","Philippines","Adobo","Meat, vinegar, soy sauce","A signature Filipino preparation."],
    ["Singapore","Singapore","Hainanese Chicken Rice","Chicken, rice, sauces","A famous Singaporean dish."],
    ["Istanbul","Turkey","Doner Kebab","Meat, bread, vegetables","A famous Turkish food."],
    ["Athens","Greece","Moussaka","Eggplant, meat, béchamel","A classic Greek dish."],
    ["Rome","Italy","Carbonara","Pasta, egg, cheese","A famous Roman pasta."],
    ["Naples","Italy","Pizza Margherita","Tomato, mozzarella, basil","The birthplace associated with classic pizza."],
    ["Milan","Italy","Risotto","Rice, stock, cheese","A famous northern Italian dish."],
    ["Paris","France","Croissant","Flour, butter, yeast","A symbol of French baking."],
    ["Lyon","France","Quenelle","Fish, flour, sauce","A traditional Lyon specialty."],
    ["Barcelona","Spain","Tapas","Small plates, varied ingredients","Tapas are central to Spanish food culture."],
    ["Valencia","Spain","Paella","Rice, saffron, vegetables","A famous Spanish rice dish."],
    ["Lisbon","Portugal","Pastel de Nata","Pastry, custard","A famous Portuguese pastry."],
    ["Berlin","Germany","Currywurst","Sausage, curry sauce","A popular German street food."],
    ["Vienna","Austria","Wiener Schnitzel","Veal, breadcrumbs","A classic Austrian dish."],
    ["Zurich","Switzerland","Fondue","Cheese, wine, bread","A famous Swiss dish."],
    ["Warsaw","Poland","Pierogi","Dough, potato, cheese","Traditional Polish dumplings."],
    ["Budapest","Hungary","Goulash","Beef, paprika, onions","A famous Hungarian dish."],
    ["London","United Kingdom","Fish and Chips","Fish, potatoes, batter","A classic British meal."],
    ["Dublin","Ireland","Irish Stew","Lamb, potatoes, vegetables","A traditional Irish dish."],
    ["Copenhagen","Denmark","Smorrebrod","Rye bread, toppings","A classic Danish open sandwich."],
    ["Oslo","Norway","Fiskesuppe","Fish, cream, vegetables","A traditional Norwegian soup."],
    ["Stockholm","Sweden","Meatballs","Meat, breadcrumbs, sauce","A famous Swedish dish."],
    ["Helsinki","Finland","Karjalanpiirakka","Rye, rice, butter","A traditional Finnish pastry."],
    ["Moscow","Russia","Pelmeni","Dough, meat","Traditional Russian dumplings."],
    ["Cairo","Egypt","Koshari","Rice, pasta, lentils","A famous Egyptian street food."],
    ["Marrakesh","Morocco","Tagine","Meat, vegetables, spices","A famous Moroccan cooking tradition."],
    ["Addis Ababa","Ethiopia","Doro Wat","Chicken, spices, berbere","A famous Ethiopian dish."],
    ["Nairobi","Kenya","Nyama Choma","Grilled meat, spices","A popular Kenyan food."],
    ["Cape Town","South Africa","Bobotie","Minced meat, spices, egg","A famous South African dish."],
    ["Lagos","Nigeria","Jollof Rice","Rice, tomato, spices","A popular West African dish."],
    ["Accra","Ghana","Waakye","Rice, beans, spices","A famous Ghanaian meal."],
    ["New York","USA","New York Pizza","Dough, tomato, cheese","A famous American pizza style."],
    ["Chicago","USA","Deep Dish Pizza","Dough, tomato, cheese","A distinctive Chicago pizza."],
    ["New Orleans","USA","Gumbo","Seafood, sausage, vegetables","A famous Louisiana dish."],
    ["Montreal","Canada","Poutine","Fries, cheese curds, gravy","A famous Quebec comfort food."],
    ["Mexico City","Mexico","Tacos","Tortilla, meat, salsa","A major center of Mexican street food."],
    ["Lima","Peru","Ceviche","Fish, lime, onion","A signature Peruvian dish."],
    ["Buenos Aires","Argentina","Asado","Beef, salt, fire","A famous Argentine barbecue tradition."],
    ["Sao Paulo","Brazil","Feijoada","Beans, meat, spices","A famous Brazilian stew."],
    ["Bogota","Colombia","Ajiaco","Potatoes, chicken, corn","A traditional Colombian soup."],
    ["Quito","Ecuador","Locro de Papa","Potatoes, cheese, avocado","A traditional Ecuadorian soup."],
    ["Havana","Cuba","Ropa Vieja","Beef, peppers, tomato","A famous Cuban dish."],
    ["Sydney","Australia","Meat Pie","Pastry, meat, gravy","A famous Australian food."],
    ["Auckland","New Zealand","Hangi","Meat, vegetables, earth oven","A traditional Maori cooking method."]
  ];

  /* =========================================================
     GENERIC FOOD DATA FOR EXTRA GAMES
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
    ["Fish and Chips","United Kingdom"]
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

    start.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

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
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }

  function showToast(message) {
    let toast = document.getElementById("nijokToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "nijokToast";

      Object.assign(toast.style,{
        position:"fixed",
        left:"50%",
        bottom:"30px",
        transform:"translateX(-50%)",
        padding:"14px 22px",
        borderRadius:"30px",
        background:"#183c2b",
        color:"#fff",
        zIndex:"99999",
        boxShadow:"0 10px 30px rgba(0,0,0,.18)"
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(window.nijokToastTimer);

    window.nijokToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
    },2500);
  }

  function getOverlay() {
    return document.getElementById("gameOverlay");
  }

  function openOverlay() {
    const overlay = getOverlay();

    if (!overlay) {
      console.error("NIJOK: gameOverlay not found");
      return false;
    }

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden","false");

    return true;
  }

  function closeGame() {
    const overlay = getOverlay();

    if (overlay) {
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden","true");
    }

    stopTimer();
    answerLocked = false;
  }

  window.closeGame = closeGame;

  function setGameHeader(title,description) {
    const mode = document.getElementById("gameModeLabel");
    const titleEl = document.getElementById("gameTitle");
    const desc = document.getElementById("gameDescription");

    if (mode) mode.textContent = currentMode;
    if (titleEl) titleEl.textContent = title;
    if (desc) desc.textContent = description;
  }

  function clearGameContent() {
    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");

    if (q) q.innerHTML = "";
    if (a) a.innerHTML = "";
  }

  /* =========================================================
     OPTIONS
     ========================================================= */

  function randomItems(arr,count,exclude) {
    const copy = arr.filter(x => x !== exclude);
    copy.sort(() => Math.random() - 0.5);
    return copy.slice(0,count);
  }

  function countryOptions(correct) {
    const countries = [
      "Italy","Japan","Mexico","India","France",
      "China","Thailand","Spain","Turkey","Brazil",
      "South Korea","Vietnam","Greece","Canada",
      "Germany","Portugal","Peru","Egypt"
    ];

    const options = [correct];

    randomItems(countries,20,correct).some(item => {
      if (!options.includes(item)) {
        options.push(item);
      }

      return options.length >= 4;
    });

    return options.sort(() => Math.random() - 0.5);
  }

  function addAnswerButton(text,correct,callback) {
    const box = document.getElementById("gameAnswers");

    if (!box) return;

    const button = document.createElement("button");

    button.className = "game-answer";
    button.textContent = text;

    button.addEventListener("click",() => {
      if (answerLocked) return;

      answerLocked = true;

      const buttons = box.querySelectorAll("button");

      buttons.forEach(b => {
        b.disabled = true;
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

      if (callback) callback(correct,button);
    });

    box.appendChild(button);
  }

  /* =========================================================
     KNOWLEDGE MESSAGE
     ========================================================= */

  function showKnowledgeMessage(correct) {
    const q = document.getElementById("gameQuestion");

    if (!q) return;

    let popup = document.getElementById("nijokKnowledgePopup");

    if (!popup) {
      popup = document.createElement("div");
      popup.id = "nijokKnowledgePopup";

      Object.assign(popup.style,{
        marginTop:"18px",
        padding:"15px 18px",
        borderRadius:"16px",
        background:"#eef3e9",
        color:"#183c2b",
        lineHeight:"1.5"
      });

      q.appendChild(popup);
    }

    popup.innerHTML = correct
      ? "🌿 <strong>Knowledge gained!</strong><br>Great job. You discovered something new."
      : "🌎 <strong>Knowledge gained!</strong><br>Every answer helps you discover something new.";
  }

  /* =========================================================
     DAILY CHALLENGE
     ========================================================= */

  function showTodayChallenge() {
    const item = TODAY_CHALLENGE[getDayIndex(TODAY_CHALLENGE.length)];

    currentItems = [item];
    currentQuestion = 0;
    currentScore = 0;

    setGameHeader(
      "Today's Challenge",
      "One photo. One question. Complete the challenge and earn 10 points."
    );

    const [food,country,question] = item;

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img src="${photoUrl(escapeHTML(food))}" alt="${escapeHTML(food)}">
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(100)} / 100
      </div>

      <h3>${escapeHTML(question)}</h3>

      <p class="nijok-points">
        Complete the challenge = +10 points
      </p>
    `;

    a.innerHTML = "";

    countryOptions(country).forEach(option => {
      addAnswerButton(option,option === country,(correct) => {
        if (next) {
          next.style.display = "block";
          next.textContent = "Finish Challenge";

          next.onclick = () => {
            if (correct) finishDailyChallenge();
            else finishDailyChallenge();
          };
        }
      });
    });

    if (next) next.style.display = "none";
  }

  function finishDailyChallenge() {
    const today = new Date().toISOString().slice(0,10);

    localStorage.setItem(STORAGE.completed,today);

    setNumber(
      STORAGE.score,
      getNumber(STORAGE.score) + 10
    );

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    if (next) next.style.display = "none";

    q.innerHTML = `
      <div class="nijok-complete">
        <div class="nijok-complete-icon">🎉</div>
        <h3>Today's Challenge Complete!</h3>
        <p>You earned</p>
        <strong class="nijok-big-points">10 Points</strong>
        <p>Come back tomorrow for a new photo and question.</p>
      </div>
    `;

    a.innerHTML = `
      <button class="nijok-primary-action">
        Continue
      </button>
    `;

    a.querySelector("button").onclick = closeGame;

    updateScoreDisplay();
  }

  /* =========================================================
     DO YOU KNOW
     ========================================================= */

  function showFact() {
    const item = FOOD_FACTS[getDayIndex(FOOD_FACTS.length)];

    const [title,fact,place] = item;

    setGameHeader(
      "Do You Know?",
      "One beautiful food fact from around the world."
    );

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img src="${photoUrl(escapeHTML(title))}" alt="${escapeHTML(title)}">
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(50)} / 50
      </div>

      <h3>Did You Know?</h3>
      <h4>${escapeHTML(title)}</h4>
      <p>${escapeHTML(fact)}</p>

      <div class="nijok-fact-box">
        🌍 ${escapeHTML(place)}
      </div>
    `;

    a.innerHTML = `
      <button class="nijok-primary-action">
        Nice! Explore More
      </button>
    `;

    a.querySelector("button").onclick = closeGame;
  }

  /* =========================================================
     FOOD MUSEUM
     ========================================================= */

  function showMuseum() {
    const item = FOOD_MUSEUM[getDayIndex(FOOD_MUSEUM.length)];

    const [dish,country,ingredients,fact] = item;

    setGameHeader(
      "Food Museum",
      "Discover today's famous or unique dish."
    );

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img src="${photoUrl(escapeHTML(dish))}" alt="${escapeHTML(dish)}">
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(50)} / 50
      </div>

      <h3>${escapeHTML(dish)}</h3>

      <p><strong>Origin:</strong> ${escapeHTML(country)}</p>
      <p><strong>Ingredients:</strong> ${escapeHTML(ingredients)}</p>

      <div class="nijok-fact-box">
        ${escapeHTML(fact)}
      </div>
    `;

    a.innerHTML = `
      <button class="nijok-primary-action">
        Continue Exploring
      </button>
    `;

    a.querySelector("button").onclick = closeGame;
  }

  /* =========================================================
     EXPLORE FOOD
     ========================================================= */

  function showExplore() {
    const item = EXPLORE_FOOD[getDayIndex(EXPLORE_FOOD.length)];

    const [place,country,food,ingredients,fact] = item;

    setGameHeader(
      "Explore Food",
      "Explore one place, one food and its story."
    );

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img src="${photoUrl(escapeHTML(place + " food"))}" alt="${escapeHTML(place)}">
      </div>

      <div class="nijok-day-label">
        DAY ${getTodayNumber(100)} / 100
      </div>

      <h3>📍 ${escapeHTML(place)}</h3>

      <p><strong>Country:</strong> ${escapeHTML(country)}</p>

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

    a.innerHTML = `
      <button class="nijok-primary-action">
        Explore Another Place
      </button>
    `;

    a.querySelector("button").onclick = closeGame;
  }

  /* =========================================================
     FOOD QUIZ
     500 QUESTIONS
     ========================================================= */

  function buildFoodQuizBank() {
    const questions = [];

    FOOD_ITEMS.forEach((item,index) => {
      const [food,country] = item;

      questions.push({
        question:`Which country is ${food} associated with?`,
        answer:country,
        type:"country"
      });

      questions.push({
        question:`${food} is traditionally connected with which country or region?`,
        answer:country,
        type:"country"
      });

      questions.push({
        question:`Where would you most likely find traditional ${food}?`,
        answer:country,
        type:"country"
      });

      questions.push({
        question:`Which food is associated with ${country}?`,
        answer:food,
        type:"food"
      });

      questions.push({
        question:`Which dish is a famous part of ${country} food culture?`,
        answer:food,
        type:"food"
      });

      questions.push({
        question:`Identify the food associated with ${country}.`,
        answer:food,
        type:"food"
      });

      questions.push({
        question:`Food Quiz ${index + 1}: ${food} belongs to which cuisine?`,
        answer:country,
        type:"country"
      });

      questions.push({
        question:`Food Quiz: Which place is connected with ${food}?`,
        answer:country,
        type:"country"
      });

      questions.push({
        question:`Which traditional food is represented by ${food}?`,
        answer:food,
        type:"food"
      });

      questions.push({
        question:`Which country is known for ${food}?`,
        answer:country,
        type:"country"
      });
    });

    return questions.slice(0,500);
  }

  const FOOD_QUIZ = buildFoodQuizBank();

  /* =========================================================
     GUESS THE FOOD
     500 QUESTIONS
     ========================================================= */

  function buildGuessBank() {
    const questions = [];

    FOOD_ITEMS.forEach((item,index) => {
      const [food,country] = item;

      questions.push({
        clue:`This food is associated with ${country}. What is it?`,
        answer:food
      });

      questions.push({
        clue:`Guess the food: It is famous in ${country}.`,
        answer:food
      });

      questions.push({
        clue:`Can you identify this dish from ${country}?`,
        answer:food
      });

      questions.push({
        clue:`Food mystery #${index + 1}: Which food is linked to ${country}?`,
        answer:food
      });

      questions.push({
        clue:`Which famous food comes from ${country}?`,
        answer:food
      });

      questions.push({
        clue:`Guess this traditional food connected with ${country}.`,
        answer:food
      });

      questions.push({
        clue:`Your clue: ${country}. Guess the food.`,
        answer:food
      });

      questions.push({
        clue:`One country, one food. Country: ${country}.`,
        answer:food
      });

      questions.push({
        clue:`What food would you associate with ${country}?`,
        answer:food
      });

      questions.push({
        clue:`Mystery dish from ${country} — what is it?`,
        answer:food
      });
    });

    return questions.slice(0,500);
  }

  const GUESS_FOOD = buildGuessBank();

  /* =========================================================
     TIME CHALLENGE
     500 QUESTIONS
     ========================================================= */

  function buildTimeBank() {
    const questions = [];

    FOOD_ITEMS.forEach((item,index) => {
      const [food,country] = item;

      questions.push({
        question:`${food} is associated with which country?`,
        answer:country
      });

      questions.push({
        question:`Which country is famous for ${food}?`,
        answer:country
      });

      questions.push({
        question:`Where is ${food} traditionally popular?`,
        answer:country
      });

      questions.push({
        question:`Identify the country connected to ${food}.`,
        answer:country
      });

      questions.push({
        question:`Quick question #${index + 1}: ${food} belongs to which cuisine?`,
        answer:country
      });

      questions.push({
        question:`Fast round: Which country is linked to ${food}?`,
        answer:country
      });

      questions.push({
        question:`Time Challenge: ${food} comes from which food culture?`,
        answer:country
      });

      questions.push({
        question:`Beat the clock: ${food} is associated with?`,
        answer:country
      });

      questions.push({
        question:`Quick food knowledge: ${food} is from?`,
        answer:country
      });

      questions.push({
        question:`Final clue: Which place is known for ${food}?`,
        answer:country
      });
    });

    return questions.slice(0,500);
  }

  const TIME_CHALLENGE = buildTimeBank();

  /* =========================================================
     MATCH THE PAIR - 100
     ========================================================= */

  function buildPairs() {
    const pairs = [];

    FOOD_ITEMS.forEach((item,index) => {
      pairs.push({
        food:item[0],
        country:item[1],
        number:index + 1
      });
    });

    return pairs.slice(0,100);
  }

  const MATCH_PAIRS = buildPairs();

  /* =========================================================
     FOOD QUIZ GAME
     ========================================================= */

  function startFoodQuiz() {
    currentMode = "Food Quiz";
    currentScore = 0;
    currentQuestion = 0;

    currentItems = FOOD_QUIZ
      .slice(0,10)
      .sort(() => Math.random() - 0.5);

    setGameHeader(
      "Food Quiz",
      "Test your food and culture knowledge."
    );

    showQuizQuestion();
  }

  function showQuizQuestion() {
    stopTimer();

    const item = currentItems[currentQuestion];

    if (!item) {
      finishExtraGame("Food Quiz");
      return;
    }

    answerLocked = false;

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    next.style.display = "none";

    const options = item.type === "country"
      ? countryOptions(item.answer)
      : foodOptions(item.answer);

    q.innerHTML = `
      <div class="nijok-day-label">
        QUESTION ${currentQuestion + 1} / ${currentItems.length}
      </div>

      <h3>${escapeHTML(item.question)}</h3>
    `;

    a.innerHTML = "";

    options.forEach(option => {
      addAnswerButton(
        option,
        option === item.answer,
        () => {
          next.style.display = "block";
          next.textContent =
            currentQuestion === currentItems.length - 1
              ? "Finish Quiz"
              : "Next Question";

          next.onclick = nextExtraQuestion;
        }
      );
    });
  }

  function foodOptions(correct) {
    const foods = FOOD_ITEMS.map(x => x[0]);

    return [
      correct,
      ...randomItems(foods,3,correct)
    ].sort(() => Math.random() - 0.5);
  }

  /* =========================================================
     GUESS THE FOOD
     ========================================================= */

  function startGuessFood() {
    currentMode = "Guess the Food";
    currentScore = 0;
    currentQuestion = 0;

    currentItems = GUESS_FOOD
      .slice(0,10)
      .sort(() => Math.random() - 0.5);

    setGameHeader(
      "Guess the Food",
      "Read the clue and identify the food."
    );

    showGuessQuestion();
  }

  function showGuessQuestion() {
    const item = currentItems[currentQuestion];

    if (!item) {
      finishExtraGame("Guess the Food");
      return;
    }

    answerLocked = false;

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    next.style.display = "none";

    q.innerHTML = `
      <div class="nijok-game-photo">
        <img src="${photoUrl(escapeHTML(item.answer))}" alt="Food">
      </div>

      <div class="nijok-day-label">
        GUESS ${currentQuestion + 1} / ${currentItems.length}
      </div>

      <h3>${escapeHTML(item.clue)}</h3>
    `;

    a.innerHTML = "";

    foodOptions(item.answer).forEach(option => {
      addAnswerButton(
        option,
        option === item.answer,
        () => {
          next.style.display = "block";
          next.textContent =
            currentQuestion === currentItems.length - 1
              ? "Finish Game"
              : "Next";

          next.onclick = nextExtraQuestion;
        }
      );
    });
  }

  /* =========================================================
     MATCH THE PAIR
     ========================================================= */

  function startMatchPair() {
    currentMode = "Match the Pair";
    currentScore = 0;

    setGameHeader(
      "Match the Pair",
      "Match each food with its country."
    );

    const selected = MATCH_PAIRS
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0,5);

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    next.style.display = "none";

    q.innerHTML = `
      <div class="nijok-day-label">
        MATCH THE PAIRS
      </div>

      <h3>Match each food with the correct country</h3>

      <p>Select a food, then select its matching country.</p>
    `;

    a.innerHTML = "";

    let selectedFood = null;
    let matched = 0;

    const foods = selected
      .map(x => x.food)
      .sort(() => Math.random() - 0.5);

    const countries = selected
      .map(x => x.country)
      .sort(() => Math.random() - 0.5);

    const wrapper = document.createElement("div");

    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = "1fr 1fr";
    wrapper.style.gap = "10px";

    const left = document.createElement("div");
    const right = document.createElement("div");

    foods.forEach(food => {
      const btn = document.createElement("button");

      btn.className = "game-answer";
      btn.textContent = food;

      btn.onclick = () => {
        selectedFood = food;

        document
          .querySelectorAll(".pair-food")
          .forEach(x => x.classList.remove("correct"));

        btn.classList.add("correct");
      };

      btn.classList.add("pair-food");

      left.appendChild(btn);
    });

    countries.forEach(country => {
      const btn = document.createElement("button");

      btn.className = "game-answer";
      btn.textContent = country;

      btn.onclick = () => {
        if (!selectedFood) {
          showToast("Select a food first.");
          return;
        }

        const pair = selected.find(x => x.food === selectedFood);

        if (pair && pair.country === country) {
          btn.classList.add("correct");
          matched++;

          showToast("Matched! 🌿");

          const foodButton = [...left.children]
            .find(x => x.textContent === selectedFood);

          if (foodButton) {
            foodButton.disabled = true;
            foodButton.style.opacity = ".5";
          }

          btn.disabled = true;
          selectedFood = null;

          if (matched === selected.length) {
            currentScore = selected.length;

            next.style.display = "block";
            next.textContent = "Finish";

            next.onclick = () => {
              finishExtraGame("Match the Pair");
            };
          }
        } else {
          btn.classList.add("wrong");
          showToast("Try again.");
        }
      };

      right.appendChild(btn);
    });

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    a.appendChild(wrapper);
  }

  /* =========================================================
     TIME CHALLENGE
     ========================================================= */

  function startTimeChallenge() {
    currentMode = "Time Challenge";
    currentScore = 0;
    currentQuestion = 0;

    currentItems = TIME_CHALLENGE
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0,10);

    setGameHeader(
      "Time Challenge",
      "Answer before the timer reaches zero."
    );

    showTimeQuestion();
  }

  function showTimeQuestion() {
    const item = currentItems[currentQuestion];

    if (!item) {
      finishExtraGame("Time Challenge");
      return;
    }

    answerLocked = false;

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    next.style.display = "none";

    q.innerHTML = `
      <div class="nijok-day-label">
        TIME CHALLENGE
      </div>

      <div id="nijokTimer"
           style="font-size:24px;font-weight:bold;margin:10px 0;">
        30
      </div>

      <h3>${escapeHTML(item.question)}</h3>
    `;

    a.innerHTML = "";

    countryOptions(item.answer).forEach(option => {
      addAnswerButton(
        option,
        option === item.answer,
        () => {
          stopTimer();

          next.style.display = "block";
          next.textContent =
            currentQuestion === currentItems.length - 1
              ? "Finish"
              : "Next";

          next.onclick = nextExtraQuestion;
        }
      );
    });

    startTimer();
  }

  function startTimer() {
    stopTimer();

    timeLeft = 30;

    const timer = document.getElementById("nijokTimer");

    if (timer) timer.textContent = timeLeft;

    timerInterval = setInterval(() => {
      timeLeft--;

      const el = document.getElementById("nijokTimer");

      if (el) el.textContent = timeLeft;

      if (timeLeft <= 0) {
        stopTimer();

        if (!answerLocked) {
          answerLocked = true;

          showToast("Time's up!");

          const next = document.getElementById("nextQuestion");

          if (next) {
            next.style.display = "block";
            next.textContent =
              currentQuestion === currentItems.length - 1
                ? "Finish"
                : "Next";

            next.onclick = nextExtraQuestion;
          }
        }
      }
    },1000);
  }

  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  /* =========================================================
     NEXT EXTRA QUESTION
     ========================================================= */

  function nextExtraQuestion() {
    currentQuestion++;

    if (currentQuestion >= currentItems.length) {
      finishExtraGame(currentMode);
      return;
    }

    if (currentMode === "Food Quiz") {
      showQuizQuestion();
    } else if (currentMode === "Guess the Food") {
      showGuessQuestion();
    } else if (currentMode === "Time Challenge") {
      showTimeQuestion();
    }
  }

  window.nextQuestion = nextExtraQuestion;

  /* =========================================================
     FINISH EXTRA GAME
     ========================================================= */

  function finishExtraGame(title) {
    stopTimer();

    const q = document.getElementById("gameQuestion");
    const a = document.getElementById("gameAnswers");
    const next = document.getElementById("nextQuestion");

    if (next) next.style.display = "none";

    q.innerHTML = `
      <div class="nijok-complete">
        <div class="nijok-complete-icon">🎉</div>

        <h3>${escapeHTML(title)} Complete!</h3>

        <p>Your score</p>

        <strong class="nijok-big-points">
          ${currentScore}
        </strong>

        <p>
          Keep exploring food and culture around the world.
        </p>
      </div>
    `;

    a.innerHTML = `
      <button class="nijok-primary-action">
        Continue
      </button>
    `;

    a.querySelector("button").onclick = closeGame;
  }

  /* =========================================================
     START GAME
     ========================================================= */

  function startGame(type) {
    currentScore = 0;
    currentQuestion = 0;

    switch (String(type || "").toLowerCase()) {

      case "today":
      case "challenge":
      case "today's challenge":
        currentMode = "Today's Challenge";
        openOverlay();
        showTodayChallenge();
        break;

      case "fact":
      case "do you know":
      case "do you know?":
        currentMode = "Do You Know?";
        openOverlay();
        showFact();
        break;

      case "museum":
      case "food museum":
        currentMode = "Food Museum";
        openOverlay();
        showMuseum();
        break;

      case "explore":
      case "explore food":
        currentMode = "Explore Food";
        openOverlay();
        showExplore();
        break;

      case "quiz":
      case "food quiz":
        openOverlay();
        startFoodQuiz();
        break;

      case "guess":
      case "guess the food":
        openOverlay();
        startGuessFood();
        break;

      case "pair":
      case "match":
      case "match the pair":
        openOverlay();
        startMatchPair();
        break;

      case "time":
      case "time challenge":
        openOverlay();
        startTimeChallenge();
        break;

      default:
        currentMode = "Today's Challenge";
        openOverlay();
        showTodayChallenge();
    }
  }

  window.startGame = startGame;
  window.openGame = startGame;

  window.openTodayChallenge = () => startGame("today");
  window.openDoYouKnow = () => startGame("fact");
  window.openFoodMuseum = () => startGame("museum");
  window.openExploreFood = () => startGame("explore");
  window.openFoodQuiz = () => startGame("quiz");
  window.openGuessFood = () => startGame("guess");
  window.openMatchPair = () => startGame("pair");
  window.openTimeChallenge = () => startGame("time");

  /* =========================================================
     SCORE
     ========================================================= */

  function updateScoreDisplay() {
    const score = getNumber(STORAGE.score);

    document
      .querySelectorAll("[data-score],#score,.score-value,.user-score")
      .forEach(el => {
        el.textContent = score;
      });
  }

  /* =========================================================
     LOGIN
     ========================================================= */

  function openLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
      modal.classList.add("show");
      modal.style.display = "flex";
    }
  }

  function closeLogin() {
    const modal = document.getElementById("loginModal");

    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "";
    }
  }

  function continueAsGuest() {
    localStorage.setItem(STORAGE.guest,"true");
    closeLogin();
    showToast("Welcome to NIJOK! 🌿");
  }

  window.openLogin = openLogin;
  window.closeLogin = closeLogin;
  window.continueAsGuest = continueAsGuest;

  function setupLogin() {
    const button = document.getElementById("loginButton");

    if (!button) return;

    button.addEventListener("click",() => {
      const name = document
        .getElementById("loginName")
        ?.value
        .trim();

      const email = document
        .getElementById("loginEmail")
        ?.value
        .trim();

      if (!name || !email) {
        showToast("Please enter your name and email.");
        return;
      }

      localStorage.setItem(
        STORAGE.user,
        JSON.stringify({
          name:name,
          email:email
        })
      );

      closeLogin();
      showToast(`Welcome ${name}! 🌿`);
    });
  }

  /* =========================================================
     BUTTON CONNECTION
     ========================================================= */

  function connectButtons() {
    document
      .querySelectorAll("button,a")
      .forEach(button => {

        if (button.dataset.nijokConnected) return;

        const text = (
          button.textContent || ""
        ).trim().toLowerCase();

        if (button.getAttribute("onclick")) return;

        if (text.includes("today's challenge") ||
            text.includes("today challenge")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("today");
          });

        } else if (text.includes("do you know")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("fact");
          });

        } else if (text.includes("food museum")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("museum");
          });

        } else if (text.includes("explore food")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("explore");
          });

        } else if (text.includes("food quiz")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("quiz");
          });

        } else if (text.includes("guess the food")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("guess");
          });

        } else if (text.includes("match the pair")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("pair");
          });

        } else if (text.includes("time challenge")) {

          button.addEventListener("click",e => {
            e.preventDefault();
            startGame("time");
          });
        }

        button.dataset.nijokConnected = "true";
      });
  }

  /* =========================================================
     CLOSE BUTTONS
     ========================================================= */

  function setupCloseButtons() {
    const closeGameButton =
      document.getElementById("closeGame");

    if (closeGameButton) {
      closeGameButton.addEventListener(
        "click",
        closeGame
      );
    }

    const closeLoginButton =
      document.getElementById("close-modal");

    if (closeLoginButton) {
      closeLoginButton.addEventListener(
        "click",
        closeLogin
      );
    }
  }

  /* =========================================================
     OUTSIDE CLICK + ESCAPE
     ========================================================= */

  function setupGlobalEvents() {
    document.addEventListener("click",event => {

      const overlay = getOverlay();

      if (
        overlay &&
        event.target === overlay
      ) {
        closeGame();
      }

      const login =
        document.getElementById("loginModal");

      if (
        login &&
        event.target === login
      ) {
        closeLogin();
      }
    });

    document.addEventListener("keydown",event => {

      if (event.key === "Escape") {
        closeGame();
        closeLogin();
      }
    });
  }

  /* =========================================================
     INITIALIZE
     ========================================================= */

  document.addEventListener("DOMContentLoaded",() => {

    setupCloseButtons();
    setupLogin();
    connectButtons();
    setupGlobalEvents();
    updateScoreDisplay();

    console.log("NIJOK loaded successfully.");
    console.log("Today's Challenge:",TODAY_CHALLENGE.length);
    console.log("Food Facts:",FOOD_FACTS.length);
    console.log("Food Museum:",FOOD_MUSEUM.length);
    console.log("Explore Food:",EXPLORE_FOOD.length);
    console.log("Food Quiz:",FOOD_QUIZ.length);
    console.log("Guess Food:",GUESS_FOOD.length);
    console.log("Match Pairs:",MATCH_PAIRS.length);
    console.log("Time Challenge:",TIME_CHALLENGE.length);
  });

})();
