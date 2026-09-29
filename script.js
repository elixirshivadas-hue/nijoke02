/* =========================================================
   NIJOK - FOOD & CULTURE EXPERIENCE
   Daily Challenge + Do You Know + Food Museum + Explore Food
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

  /* =========================================================
     100 TODAY'S CHALLENGE QUESTIONS
     ========================================================= */

  const TODAY_CHALLENGE = [
    ["Pizza Margherita", "Italy", "Which country is Pizza Margherita traditionally associated with?"],
    ["Sushi", "Japan", "Which country is famous for sushi?"],
    ["Tacos", "Mexico", "Tacos are strongly associated with which country?"],
    ["Biryani", "India", "Which country is widely known for biryani?"],
    ["Croissant", "France", "Which country is famous for the croissant?"],
    ["Paella", "Spain", "Paella originated in which country?"],
    ["Peking Duck", "China", "Peking Duck is a famous dish from which country?"],
    ["Kimchi", "South Korea", "Kimchi is a traditional food of which country?"],
    ["Pho", "Vietnam", "Pho is a famous noodle soup from which country?"],
    ["Moussaka", "Greece", "Moussaka is strongly associated with which country?"],
    ["Couscous", "Morocco", "Couscous is a famous food of which North African country?"],
    ["Feijoada", "Brazil", "Feijoada is a traditional dish of which country?"],
    ["Goulash", "Hungary", "Goulash is traditionally associated with which country?"],
    ["Pad Thai", "Thailand", "Pad Thai is a famous dish from which country?"],
    ["Ramen", "Japan", "Ramen is especially associated with which country?"],
    ["Falafel", "Middle East", "Falafel is a popular food across which region?"],
    ["Hummus", "Middle East", "Hummus is a popular dish from which region?"],
    ["Poutine", "Canada", "Poutine is especially associated with which country?"],
    ["Fish and Chips", "United Kingdom", "Fish and chips is traditionally associated with which country?"],
    ["Lasagna", "Italy", "Lasagna is traditionally associated with which country?"],
    ["Gnocchi", "Italy", "Gnocchi is a traditional food from which country?"],
    ["Ratatouille", "France", "Ratatouille is a vegetable dish from which country?"],
    ["Samosa", "South Asia", "Samosas are especially popular across which region?"],
    ["Dosa", "India", "Dosa is a famous dish from which country?"],
    ["Idli", "India", "Idli is a traditional dish from which country?"],
    ["Gulab Jamun", "India", "Gulab jamun is a popular sweet from which country?"],
    ["Baklava", "Turkey", "Baklava is strongly associated with which country?"],
    ["Shakshuka", "North Africa", "Shakshuka is popular across which region?"],
    ["Tagine", "Morocco", "Tagine is a famous dish from which country?"],
    ["Arepas", "Venezuela/Colombia", "Arepas are especially associated with which region?"],
    ["Empanadas", "Latin America", "Empanadas are popular across which region?"],
    ["Churros", "Spain", "Churros are traditionally associated with which country?"],
    ["Tiramisu", "Italy", "Tiramisu originated in which country?"],
    ["Gelato", "Italy", "Gelato is a famous frozen dessert from which country?"],
    ["Bratwurst", "Germany", "Bratwurst is traditionally associated with which country?"],
    ["Pretzel", "Germany", "Pretzels are strongly associated with which country?"],
    ["Wiener Schnitzel", "Austria", "Wiener schnitzel is a famous dish from which country?"],
    ["Fondue", "Switzerland", "Fondue is traditionally associated with which country?"],
    ["Pierogi", "Poland", "Pierogi are traditional dumplings from which country?"],
    ["Ceviche", "Peru", "Ceviche is especially associated with which country?"],
    ["Lomo Saltado", "Peru", "Lomo saltado is a famous dish from which country?"],
    ["Jollof Rice", "West Africa", "Jollof rice is popular across which region?"],
    ["Injera", "Ethiopia", "Injera is a traditional food from which country?"],
    ["Doro Wat", "Ethiopia", "Doro wat is a famous dish from which country?"],
    ["Bobotie", "South Africa", "Bobotie is a traditional dish from which country?"],
    ["Bunny Chow", "South Africa", "Bunny chow is associated with which country?"],
    ["Nasi Goreng", "Indonesia", "Nasi goreng is a famous dish from which country?"],
    ["Satay", "Indonesia", "Satay is strongly associated with which country?"],
    ["Laksa", "Malaysia", "Laksa is a popular dish from which country?"],
    ["Rendang", "Indonesia", "Rendang is traditionally associated with which country?"],
    ["Hainanese Chicken Rice", "Singapore", "Hainanese chicken rice is a famous dish in which country?"],
    ["Char Kway Teow", "Singapore", "Char kway teow is popular in which Southeast Asian country?"],
    ["Adobo", "Philippines", "Adobo is a famous dish from which country?"],
    ["Lechon", "Philippines", "Lechon is traditionally associated with which country?"],
    ["Mango Sticky Rice", "Thailand", "Mango sticky rice is a famous dessert from which country?"],
    ["Tom Yum", "Thailand", "Tom yum is a famous soup from which country?"],
    ["Green Curry", "Thailand", "Green curry is associated with which country?"],
    ["Khao Pad", "Thailand", "Khao pad is a Thai-style version of what type of food?"],
    ["Kimchi Jjigae", "South Korea", "Kimchi jjigae is a traditional dish from which country?"],
    ["Bibimbap", "South Korea", "Bibimbap is a famous dish from which country?"],
    ["Bulgogi", "South Korea", "Bulgogi is associated with which country?"],
    ["Mandu", "South Korea", "Mandu are traditional dumplings from which country?"],
    ["Okonomiyaki", "Japan", "Okonomiyaki is a popular dish from which country?"],
    ["Tempura", "Japan", "Tempura is associated with which country?"],
    ["Takoyaki", "Japan", "Takoyaki is a popular street food from which country?"],
    ["Udon", "Japan", "Udon is a type of noodle associated with which country?"],
    ["Miso Soup", "Japan", "Miso soup is traditionally associated with which country?"],
    ["Dim Sum", "China", "Dim sum is strongly associated with which country?"],
    ["Xiaolongbao", "China", "Xiaolongbao are famous soup dumplings from which country?"],
    ["Mapo Tofu", "China", "Mapo tofu is a famous dish from which country?"],
    ["Kung Pao Chicken", "China", "Kung Pao chicken is associated with which country?"],
    ["Spring Rolls", "China", "Spring rolls are widely associated with which cuisine?"],
    ["Hot Pot", "China", "Hot pot is a famous communal dining style from which country?"],
    ["Pho", "Vietnam", "Pho is mainly made with noodles and what type of broth?"],
    ["Banh Mi", "Vietnam", "Banh mi is a famous food from which country?"],
    ["Bun Cha", "Vietnam", "Bun cha is a traditional dish from which country?"],
    ["Goi Cuon", "Vietnam", "Goi cuon is a Vietnamese type of what?"],
    ["Manti", "Turkey", "Manti are small dumplings popular in which country?"],
    ["Doner Kebab", "Turkey", "Doner kebab is strongly associated with which country?"],
    ["Menemen", "Turkey", "Menemen is a traditional breakfast dish from which country?"],
    ["Mercimek Corbasi", "Turkey", "Mercimek corbasi is a lentil soup from which country?"],
    ["Pastilla", "Morocco", "Pastilla is a traditional dish from which country?"],
    ["Harira", "Morocco", "Harira is a traditional soup from which country?"],
    ["Bastilla", "Morocco", "Bastilla is a famous Moroccan pastry dish."],
    ["Mansaf", "Jordan", "Mansaf is a traditional dish from which country?"],
    ["Kabsa", "Saudi Arabia", "Kabsa is a famous rice dish from which country?"],
    ["Machboos", "Gulf Region", "Machboos is popular in which region?"],
    ["Koshari", "Egypt", "Koshari is a famous street food from which country?"],
    ["Ful Medames", "Egypt", "Ful medames is a traditional dish from which country?"],
    ["Molokhia", "Egypt", "Molokhia is popular in which cuisine?"],
    ["Baklava", "Turkey/Greece", "Baklava is famous across which region?"],
    ["Pastel de Nata", "Portugal", "Pastel de nata is a famous pastry from which country?"],
    ["Bacalhau", "Portugal", "Bacalhau is traditionally associated with which country?"],
    ["Escargot", "France", "Escargot is associated with which country's cuisine?"],
    ["Quiche", "France", "Quiche is traditionally associated with which country?"],
    ["Coq au Vin", "France", "Coq au vin is a traditional dish from which country?"],
    ["Bouillabaisse", "France", "Bouillabaisse is associated with which French city/region?"],
    ["Risotto", "Italy", "Risotto is traditionally associated with which country?"],
    ["Carbonara", "Italy", "Pasta carbonara is associated with which country?"],
    ["Arancini", "Italy", "Arancini are fried rice balls from which country?"],
    ["Focaccia", "Italy", "Focaccia is a traditional bread from which country?"],
    ["Ravioli", "Italy", "Ravioli are traditionally associated with which country?"],
    ["Pavlova", "Australia/New Zealand", "Pavlova is associated with which two countries?"],
    ["Hangi", "New Zealand", "Hangi is a traditional cooking method from which country?"],
    ["Meat Pie", "Australia", "Australian meat pies are associated with which country?"],
    ["Larb", "Laos", "Larb is a traditional dish from which country?"]
  ];

  /* =========================================================
     50 DO YOU KNOW FACTS
     ========================================================= */

  const FOOD_FACTS = [
    ["Pizza", "Pizza has become one of the world's most internationally recognized foods, with countless regional variations.", "Italy"],
    ["Sushi", "Traditional sushi developed in Japan and includes many styles beyond the familiar rolls.", "Japan"],
    ["Biryani", "Biryani combines rice, spices and other ingredients and has many regional versions across South Asia.", "South Asia"],
    ["Chocolate", "Cacao was consumed as a drink by ancient civilizations in Mesoamerica long before modern chocolate bars.", "Mesoamerica"],
    ["Tea", "Tea is one of the most widely consumed beverages in the world after water.", "Asia"],
    ["Coffee", "Coffee culture has developed into very different traditions across countries and cities.", "Global"],
    ["Kimchi", "Kimchi refers to a broad family of fermented vegetable dishes, not just one recipe.", "Korea"],
    ["Couscous", "Couscous is made from semolina and is an important food across North African cuisines.", "North Africa"],
    ["Pasta", "Italy has hundreds of pasta shapes, many designed to pair with particular sauces.", "Italy"],
    ["Tacos", "Tacos can contain an enormous range of fillings and vary greatly by region in Mexico.", "Mexico"],
    ["Pho", "Pho is known for its aromatic broth, rice noodles and herbs.", "Vietnam"],
    ["Paella", "Traditional paella is associated with Valencia on Spain's Mediterranean coast.", "Spain"],
    ["Miso", "Miso is a fermented paste commonly made using soybeans and koji.", "Japan"],
    ["Olive Oil", "Olive oil has been an important ingredient around the Mediterranean for thousands of years.", "Mediterranean"],
    ["Naan", "Naan is a leavened flatbread found in several Central and South Asian cuisines.", "South Asia"],
    ["Falafel", "Falafel is commonly made from ground legumes and seasoned with herbs and spices.", "Middle East"],
    ["Mango", "Mango has been cultivated in South Asia for thousands of years.", "South Asia"],
    ["Vanilla", "Vanilla comes from an orchid and is one of the world's most valuable flavor spices.", "Mesoamerica"],
    ["Saffron", "Saffron comes from the dried stigmas of the saffron crocus flower.", "West Asia"],
    ["Cinnamon", "Cinnamon is obtained from the inner bark of certain trees.", "Asia"],
    ["Wasabi", "Authentic wasabi is made from the grated rhizome of a Japanese plant.", "Japan"],
    ["Maple Syrup", "Maple syrup is strongly associated with Canada and the northeastern United States.", "North America"],
    ["Poutine", "Poutine combines fries, cheese curds and gravy and is strongly associated with Quebec.", "Canada"],
    ["Gelato", "Gelato generally contains less air than many commercial ice creams, giving it a dense texture.", "Italy"],
    ["Croissant", "The modern croissant is strongly associated with French baking culture.", "France"],
    ["Ceviche", "Ceviche uses seafood prepared with acidic citrus juice and seasonings.", "Latin America"],
    ["Injera", "Injera is a spongy fermented flatbread commonly used in Ethiopian and Eritrean cuisine.", "East Africa"],
    ["Jollof Rice", "Jollof rice has many regional styles and is especially popular in West Africa.", "West Africa"],
    ["Nasi Goreng", "Nasi goreng literally refers to fried rice and is a major part of Indonesian food culture.", "Indonesia"],
    ["Ramen", "Ramen developed into many regional styles in Japan.", "Japan"],
    ["Dosa", "Dosa batter is traditionally fermented and made mainly from rice and lentils.", "India"],
    ["Idli", "Idli is a steamed fermented food traditionally made from rice and black gram.", "India"],
    ["Gulab Jamun", "Gulab jamun is a popular milk-solid-based sweet in South Asian cuisine.", "South Asia"],
    ["Baklava", "Baklava consists of layered pastry, nuts and sweet syrup or honey.", "West Asia"],
    ["Tiramisu", "Tiramisu is a coffee-flavored Italian dessert made with layers of ingredients including mascarpone.", "Italy"],
    ["Pretzel", "Pretzels have a long history in European baking traditions.", "Europe"],
    ["Fondue", "Fondue is strongly associated with Swiss food culture.", "Switzerland"],
    ["Empanada", "Empanadas are filled pastries found in many countries across Latin America and beyond.", "Latin America"],
    ["Arepa", "Arepas are made from ground maize and are especially important in Colombian and Venezuelan cuisine.", "South America"],
    ["Kebab", "Kebab is a broad category containing many different grilled and cooked meat dishes.", "West Asia"],
    ["Hummus", "Hummus is traditionally made using chickpeas, tahini, lemon and garlic.", "Middle East"],
    ["Tagine", "Tagine refers both to a Moroccan cooking vessel and dishes cooked in it.", "Morocco"],
    ["Koshari", "Koshari combines rice, pasta, lentils, chickpeas and tomato-based sauce.", "Egypt"],
    ["Dim Sum", "Dim sum includes many small dishes traditionally enjoyed with tea.", "China"],
    ["Bibimbap", "Bibimbap combines rice with vegetables and other toppings in Korean cuisine.", "Korea"],
    ["Satay", "Satay consists of skewered pieces of meat served with sauces and seasonings.", "Southeast Asia"],
    ["Tempura", "Tempura is known for its light, crisp batter around seafood or vegetables.", "Japan"],
    ["Churros", "Churros are fried dough pastries commonly served with sugar and sometimes chocolate.", "Spain"],
    ["Pancake", "Versions of pancakes exist in food cultures on almost every continent.", "Global"],
    ["Honey", "Honey has been used as a food and sweetener for thousands of years.", "Global"]
  ];

  /* =========================================================
     50 FOOD MUSEUM DISHES
     ========================================================= */

  const FOOD_MUSEUM = [
    ["Pizza Margherita", "Italy", "Tomato, mozzarella, basil", "A classic Italian pizza known for its simple combination of tomato, cheese and basil."],
    ["Biryani", "India", "Rice, spices, meat or vegetables", "A layered rice dish with many regional styles."],
    ["Sushi", "Japan", "Rice, seafood, vinegar", "A Japanese food tradition with many distinct styles."],
    ["Tacos", "Mexico", "Tortilla, meat or vegetables, salsa", "One of Mexico's best-known foods, with countless regional varieties."],
    ["Pho", "Vietnam", "Rice noodles, broth, herbs", "A fragrant noodle soup that became a signature Vietnamese dish."],
    ["Paella", "Spain", "Rice, saffron, vegetables, seafood or meat", "A famous rice dish associated with Valencia."],
    ["Peking Duck", "China", "Duck, pancakes, sauce", "A celebrated Chinese dish known for its crisp skin and serving style."],
    ["Kimchi", "South Korea", "Vegetables, chili, garlic, salt", "Fermented vegetables are an important part of Korean food culture."],
    ["Croissant", "France", "Flour, butter, yeast", "A famous laminated pastry associated with French baking."],
    ["Moussaka", "Greece", "Eggplant, meat, béchamel", "A layered baked dish popular in Greek cuisine."],
    ["Couscous", "Morocco", "Semolina, vegetables, meat", "A North African staple traditionally steamed into tiny grains."],
    ["Feijoada", "Brazil", "Beans, pork, spices", "A hearty Brazilian stew traditionally built around beans and meat."],
    ["Goulash", "Hungary", "Beef, paprika, onions", "A Hungarian dish strongly associated with paprika and slow cooking."],
    ["Pad Thai", "Thailand", "Rice noodles, egg, tofu, tamarind", "A famous Thai stir-fried noodle dish."],
    ["Ramen", "Japan", "Noodles, broth, toppings", "A noodle dish with numerous regional styles in Japan."],
    ["Falafel", "Middle East", "Chickpeas or fava beans, herbs", "A popular street food across the Middle East."],
    ["Poutine", "Canada", "Fries, cheese curds, gravy", "A comfort food strongly associated with Quebec."],
    ["Fish and Chips", "United Kingdom", "Fish, potatoes, batter", "A classic British takeaway food."],
    ["Lasagna", "Italy", "Pasta sheets, sauce, cheese", "A layered baked pasta dish with many Italian variations."],
    ["Ratatouille", "France", "Eggplant, zucchini, tomato", "A vegetable dish associated with southern France."],
    ["Dosa", "India", "Rice, lentils, oil", "A thin fermented South Indian crepe."],
    ["Idli", "India", "Rice, black gram", "A soft steamed fermented South Indian food."],
    ["Gulab Jamun", "India", "Milk solids, sugar syrup, cardamom", "A popular South Asian sweet."],
    ["Baklava", "Turkey", "Phyllo, nuts, syrup", "A layered pastry found across West Asian and Mediterranean food traditions."],
    ["Ceviche", "Peru", "Fish, lime, onion, chili", "A famous Peruvian preparation of seafood with citrus and seasonings."],
    ["Jollof Rice", "West Africa", "Rice, tomato, spices", "A beloved rice dish with many regional versions."],
    ["Injera", "Ethiopia", "Teff flour, water", "A fermented flatbread used as both food and serving base."],
    ["Bobotie", "South Africa", "Minced meat, spices, egg custard", "A baked South African dish with distinctive sweet-spiced flavors."],
    ["Nasi Goreng", "Indonesia", "Rice, egg, vegetables, seasonings", "Indonesian-style fried rice."],
    ["Satay", "Indonesia", "Skewered meat, spices, peanut sauce", "Grilled skewers served with flavorful sauces."],
    ["Laksa", "Malaysia", "Noodles, coconut, spices", "A noodle soup with rich regional variations."],
    ["Adobo", "Philippines", "Meat, vinegar, soy sauce, garlic", "A famous Filipino cooking style and dish."],
    ["Tom Yum", "Thailand", "Lemongrass, chili, lime, broth", "A hot and sour Thai soup."],
    ["Bibimbap", "South Korea", "Rice, vegetables, egg, sauce", "A Korean mixed rice dish."],
    ["Bulgogi", "South Korea", "Beef, soy sauce, garlic", "Thinly sliced marinated meat cooked in Korean style."],
    ["Tempura", "Japan", "Seafood or vegetables, batter", "Lightly battered and fried Japanese food."],
    ["Takoyaki", "Japan", "Wheat batter, octopus, sauce", "A famous Japanese street food."],
    ["Dim Sum", "China", "Dumplings, buns, pastries", "A broad collection of small dishes traditionally served with tea."],
    ["Xiaolongbao", "China", "Dough, pork, broth", "Soup-filled dumplings associated with Chinese cuisine."],
    ["Banh Mi", "Vietnam", "Bread, meat, pickles, herbs", "A Vietnamese sandwich with French culinary influence."],
    ["Doner Kebab", "Turkey", "Meat, spices, flatbread", "Meat cooked on a vertical rotating spit."],
    ["Mansaf", "Jordan", "Lamb, rice, yogurt sauce", "A celebrated Jordanian dish often associated with hospitality."],
    ["Koshari", "Egypt", "Rice, pasta, lentils, chickpeas", "A filling Egyptian street food."],
    ["Ful Medames", "Egypt", "Fava beans, olive oil, lemon", "A traditional bean dish enjoyed widely in Egypt."],
    ["Pastel de Nata", "Portugal", "Pastry, custard, cinnamon", "A famous Portuguese custard tart."],
    ["Bacalhau", "Portugal", "Salted cod, potatoes, olive oil", "Salt cod is central to many Portuguese recipes."],
    ["Fondue", "Switzerland", "Cheese, wine, bread", "A communal Swiss dish traditionally eaten from a shared pot."],
    ["Pierogi", "Poland", "Dough, potato, cheese or meat", "Filled dumplings strongly associated with Polish cuisine."],
    ["Pavlova", "Australia/New Zealand", "Meringue, cream, fruit", "A crisp-soft meringue dessert associated with Australia and New Zealand."]
  ];

  /* =========================================================
     100 EXPLORE FOOD PLACES
     ========================================================= */

  const EXPLORE_FOOD = [
    ["Naples", "Italy", "Pizza Margherita", "Tomato, mozzarella, basil", "Naples is widely associated with the development of modern pizza."],
    ["Tokyo", "Japan", "Sushi", "Rice, seafood, vinegar", "Tokyo offers an enormous variety of Japanese food traditions."],
    ["Mexico City", "Mexico", "Tacos", "Tortilla, meat, onion, salsa", "Mexico City is one of the world's great street-food cities."],
    ["Hyderabad", "India", "Hyderabadi Biryani", "Rice, meat, saffron, spices", "Hyderabad is famous for its aromatic biryani tradition."],
    ["Paris", "France", "Croissant", "Flour, butter, yeast", "Paris is internationally famous for its bakeries and pastry culture."],
    ["Valencia", "Spain", "Paella", "Rice, saffron, vegetables", "Valencia is closely associated with traditional paella."],
    ["Beijing", "China", "Peking Duck", "Duck, pancakes, sauce", "Beijing is home to one of China's best-known culinary traditions."],
    ["Seoul", "South Korea", "Kimchi", "Cabbage, chili, garlic", "Seoul combines traditional Korean food with a modern food scene."],
    ["Hanoi", "Vietnam", "Pho", "Rice noodles, broth, herbs", "Hanoi is strongly associated with northern Vietnamese pho."],
    ["Athens", "Greece", "Moussaka", "Eggplant, meat, béchamel", "Greek cuisine features olive oil, vegetables and herbs prominently."],
    ["Marrakesh", "Morocco", "Tagine", "Meat, vegetables, spices", "Marrakesh is famous for colorful markets and Moroccan cuisine."],
    ["Rio de Janeiro", "Brazil", "Feijoada", "Beans, pork, spices", "Brazilian cuisine reflects Indigenous, African and European influences."],
    ["Budapest", "Hungary", "Goulash", "Beef, paprika, onions", "Paprika is a major part of Hungarian culinary identity."],
    ["Bangkok", "Thailand", "Pad Thai", "Rice noodles, egg, tamarind", "Bangkok is famous for vibrant street-food culture."],
    ["Montreal", "Canada", "Poutine", "Potatoes, cheese curds, gravy", "Quebec food culture includes the iconic poutine."],
    ["London", "United Kingdom", "Fish and Chips", "Fish, potatoes, batter", "London has a long history of fish-and-chip shops."],
    ["Rome", "Italy", "Carbonara", "Pasta, egg, cheese, pork", "Rome is known for simple but distinctive pasta traditions."],
    ["Lyon", "France", "Quenelle", "Fish or meat, flour, sauce", "Lyon has a strong reputation for traditional French cuisine."],
    ["Lima", "Peru", "Ceviche", "Fish, lime, onion, chili", "Lima is internationally recognized for Peruvian cuisine."],
    ["Addis Ababa", "Ethiopia", "Injera", "Teff flour, water", "Ethiopian meals often use injera as both food and serving base."],
    ["Lagos", "Nigeria", "Jollof Rice", "Rice, tomato, peppers", "West African food culture includes many styles of jollof rice."],
    ["Cape Town", "South Africa", "Bobotie", "Minced meat, spices, egg", "Cape Town reflects South Africa's diverse culinary history."],
    ["Jakarta", "Indonesia", "Nasi Goreng", "Rice, egg, vegetables", "Jakarta has a huge variety of Indonesian regional foods."],
    ["Kuala Lumpur", "Malaysia", "Laksa", "Noodles, coconut, spices", "Malaysia's food culture reflects Malay, Chinese and Indian influences."],
    ["Singapore", "Singapore", "Hainanese Chicken Rice", "Rice, chicken, ginger", "Singapore's hawker culture brings many food traditions together."],
    ["Manila", "Philippines", "Adobo", "Chicken or pork, vinegar, soy", "Adobo is one of the most recognizable Filipino dishes."],
    ["Istanbul", "Turkey", "Doner Kebab", "Meat, spices, bread", "Istanbul sits at a crossroads of European and Asian food traditions."],
    ["Cairo", "Egypt", "Koshari", "Rice, pasta, lentils, chickpeas", "Koshari is a popular and filling Egyptian street food."],
    ["Lisbon", "Portugal", "Pastel de Nata", "Pastry, custard, cinnamon", "Lisbon is famous for Portuguese pastries and seafood."],
    ["Zurich", "Switzerland", "Fondue", "Cheese, wine, bread", "Swiss food traditions include communal cheese dishes."],
    ["Krakow", "Poland", "Pierogi", "Dough, potato, cheese", "Pierogi are a well-known part of Polish food culture."],
    ["Auckland", "New Zealand", "Pavlova", "Meringue, cream, fruit", "New Zealand has a strong café and Pacific-influenced food culture."],
    ["Melbourne", "Australia", "Meat Pie", "Pastry, meat, gravy", "Melbourne is known for a highly diverse food scene."],
    ["Vientiane", "Laos", "Larb", "Meat, herbs, lime, chili", "Larb is an important dish in Lao food culture."],
    ["Amman", "Jordan", "Mansaf", "Lamb, rice, yogurt sauce", "Mansaf is strongly associated with Jordanian hospitality."],
    ["Riyadh", "Saudi Arabia", "Kabsa", "Rice, meat, spices", "Kabsa is a popular rice dish in Saudi Arabia."],
    ["Muscat", "Oman", "Shuwa", "Slow-cooked meat, spices", "Omani cuisine reflects centuries of Indian Ocean trade."],
    ["Doha", "Qatar", "Machboos", "Rice, meat, spices", "Machboos is a popular Gulf rice dish."],
    ["Tehran", "Iran", "Ghormeh Sabzi", "Herbs, beans, meat", "Persian cuisine makes extensive use of fresh herbs."],
    ["Tbilisi", "Georgia", "Khachapuri", "Bread, cheese, egg", "Georgia is famous for its cheese-filled breads."],
    ["Yerevan", "Armenia", "Dolma", "Grape leaves, rice, meat", "Dolma appears in many forms across the Caucasus and Middle East."],
    ["Baku", "Azerbaijan", "Plov", "Rice, meat, dried fruit", "Rice dishes are an important part of Azerbaijani cuisine."],
    ["Tashkent", "Uzbekistan", "Plov", "Rice, meat, carrots", "Uzbek plov is a celebrated national dish."],
    ["Kathmandu", "Nepal", "Momo", "Dough, vegetables or meat", "Momos are popular dumplings in Nepal."],
    ["Colombo", "Sri Lanka", "Kottu Roti", "Flatbread, vegetables, egg", "Kottu is a famous Sri Lankan street food prepared on a hot griddle."],
    ["Dhaka", "Bangladesh", "Hilsa Curry", "Hilsa fish, spices", "Hilsa is deeply connected with Bangladeshi food culture."],
    ["Kathmandu", "Nepal", "Dal Bhat", "Rice, lentils, vegetables", "Dal bhat is a staple meal in Nepal."],
    ["Kolkata", "India", "Mishti Doi", "Milk, sugar, yogurt culture", "Kolkata is famous for its Bengali sweets."],
    ["Amritsar", "India", "Amritsari Kulcha", "Flour, potato, spices", "Amritsar has a rich Punjabi food tradition."],
    ["Chennai", "India", "Sambar", "Lentils, vegetables, tamarind", "South Indian cuisine has many regional sambar variations."],
    ["Kochi", "India", "Appam", "Rice, coconut, yeast", "Kerala cuisine often combines rice, coconut and seafood."],
    ["Jaipur", "India", "Dal Baati Churma", "Lentils, wheat, ghee", "Rajasthani cuisine developed dishes suited to the region's climate."],
    ["Lucknow", "India", "Galouti Kebab", "Meat, spices", "Lucknow is famous for Awadhi culinary traditions."],
    ["Varanasi", "India", "Kachori Sabzi", "Wheat, lentils, spices", "Varanasi has a distinctive vegetarian street-food culture."],
    ["Goa", "India", "Fish Curry", "Fish, coconut, spices", "Goan food reflects coastal and Portuguese influences."],
    ["Mumbai", "India", "Vada Pav", "Potato, gram flour, bread", "Vada pav became one of Mumbai's best-known street foods."],
    ["Bengaluru", "India", "Bisi Bele Bath", "Rice, lentils, vegetables", "Karnataka cuisine includes many rice-and-lentil dishes."],
    ["Pune", "India", "Misal Pav", "Sprouts, spices, bread", "Misal pav is a popular Maharashtrian dish."],
    ["Ahmedabad", "India", "Dhokla", "Gram flour, fermentation", "Dhokla is a popular Gujarati steamed snack."],
    ["Delhi", "India", "Chole Bhature", "Chickpeas, flour, spices", "Delhi has one of India's most diverse street-food scenes."],
    ["Mysuru", "India", "Mysore Pak", "Gram flour, ghee, sugar", "Mysore Pak is a famous South Indian sweet."],
    ["Udaipur", "India", "Gatte Ki Sabzi", "Gram flour, yogurt, spices", "Rajasthani cuisine makes creative use of pulses and grains."],
    ["Srinagar", "India", "Rogan Josh", "Meat, yogurt, spices", "Kashmiri cuisine is known for aromatic spice blends."],
    ["Patna", "India", "Litti Chokha", "Wheat, gram flour, vegetables", "Litti chokha is a famous Bihari dish."],
    ["Bhubaneswar", "India", "Dalma", "Lentils, vegetables", "Dalma is a traditional Odia preparation."],
    ["Guwahati", "India", "Masor Tenga", "Fish, tomato, lemon", "Assamese cuisine often highlights light, fresh flavors."],
    ["Imphal", "India", "Eromba", "Vegetables, chili, fermented fish", "Manipuri cuisine uses local vegetables and fermented ingredients."],
    ["Shillong", "India", "Jadoh", "Rice, meat, spices", "Meghalaya has distinctive rice-based food traditions."],
    ["Panaji", "India", "Bebinca", "Coconut milk, flour, sugar", "Bebinca is a layered Goan dessert."],
    ["Thiruvananthapuram", "India", "Sadya", "Rice, vegetables, coconut", "Kerala sadya is a traditional vegetarian feast."],
    ["Madurai", "India", "Jigarthanda", "Milk, almond gum, syrup", "Jigarthanda is a popular cooling drink from Madurai."],
    ["Coimbatore", "India", "Kongunadu Cuisine", "Millets, meat, spices", "Kongunadu cuisine reflects western Tamil Nadu food traditions."],
    ["Visakhapatnam", "India", "Royyala Iguru", "Prawns, onion, spices", "Coastal Andhra cuisine features seafood and bold spices."],
    ["Vijayawada", "India", "Gongura Pachadi", "Gongura leaves, chili", "Gongura is an important souring ingredient in Andhra cuisine."],
    ["Warangal", "India", "Sarva Pindi", "Rice flour, peanuts, chili", "Telangana has many distinctive millet and rice-flour snacks."],
    ["Jodhpur", "India", "Mirchi Vada", "Green chili, gram flour", "Jodhpur is famous for spicy Rajasthani snacks."],
    ["Varanasi", "India", "Banarasi Tamatar Chaat", "Tomato, potato, spices", "Varanasi's street food has many distinctive chaat varieties."],
    ["Agra", "India", "Petha", "Ash gourd, sugar", "Petha is one of Agra's best-known sweets."],
    ["Surat", "India", "Locho", "Gram flour, spices", "Locho is a popular Gujarati snack from Surat."],
    ["Nagpur", "India", "Tarri Poha", "Flattened rice, sprouts, spices", "Nagpur has its own spicy style of poha."],
    ["Bhopal", "India", "Poha Jalebi", "Flattened rice, jalebi", "The combination is popular in parts of central India."],
    ["Indore", "India", "Poha", "Flattened rice, onion, sev", "Indore is famous for its breakfast and street-food culture."],
    ["Rajkot", "India", "Kathiawadi Food", "Millets, vegetables, spices", "Kathiawadi cuisine is known for bold flavors."],
    ["Vadodara", "India", "Sev Usal", "Peas, spices, sev", "Sev usal is a popular Gujarati street food."],
    ["Ranchi", "India", "Dhuska", "Rice, lentils, oil", "Dhuska is a traditional Jharkhand snack."],
    ["Raipur", "India", "Fara", "Rice flour, spices", "Chhattisgarh has many traditional rice-based foods."],
    ["Dehradun", "India", "Kandalee Ka Saag", "Local greens, spices", "Uttarakhand cuisine makes use of mountain greens and grains."],
    ["Leh", "India", "Thukpa", "Noodles, vegetables, broth", "Thukpa is popular across Himalayan food cultures."],
    ["Siliguri", "India", "Momos", "Dough, vegetables or meat", "Momos are popular across Himalayan and northeastern regions."],
    ["Darjeeling", "India", "Momos", "Dough, vegetables, meat", "Darjeeling's food culture reflects Himalayan influences."],
    ["Puducherry", "India", "Creole Cuisine", "Seafood, spices, coconut", "Puducherry combines South Indian and French culinary influences."],
    ["Aurangabad", "India", "Naan Qalia", "Meat, spices, bread", "The region has a rich Deccan culinary history."],
    ["Nashik", "India", "Misal", "Sprouts, spices, bread", "Maharashtrian food includes many regional forms of misal."],
    ["Kolhapur", "India", "Kolhapuri Misal", "Sprouts, chili, spices", "Kolhapuri cuisine is known for bold spice flavors."]
  ];

  /* =========================================================
     STATE
     ========================================================= */

  let currentQuestion = 0;
  let currentMode = "";
  let currentItems = [];
  let currentScore = 0;
  let answerLocked = false;

  function getNumber(key) {
    return Number(localStorage.getItem(key) || 0);
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function getDayIndex(total) {
    const start = new Date(START_DATE + "T00:00:00");
    const now = new Date();

    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const difference = Math.floor(
      (now.getTime() - start.getTime()) / 86400000
    );

    return ((difference % total) + total) % total;
  }

  function getTodayNumber(total) {
    return getDayIndex(total) + 1;
  }

  /* =========================================================
     PHOTO SYSTEM
     ========================================================= */

  function photoUrl(keyword) {
    return (
      "https://loremflickr.com/1000/650/" +
      encodeURIComponent(keyword) +
      "?lock=" +
      encodeURIComponent(keyword)
    );
  }

  function setImage(element, keyword) {
    if (!element) return;

    element.src = photoUrl(keyword);

    element.onerror = () => {
      element.src =
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80";
    };
  }

  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(message) {
    let toast = document.getElementById("nijokToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "nijokToast";

      Object.assign(toast.style, {
        position: "fixed",
        left: "50%",
        bottom: "30px",
        transform: "translateX(-50%)",
        padding: "14px 22px",
        borderRadius: "30px",
        background: "#183c2b",
        color: "#fff",
        zIndex: "99999",
        fontFamily: "inherit",
        fontSize: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,.18)",
        transition: "opacity .25s ease"
      });

      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(window.nijokToastTimer);

    window.nijokToastTimer = setTimeout(() => {
      toast.style.opacity = "0";
    }, 2500);
  }

  /* =========================================================
     GAME OVERLAY
     ========================================================= */

  function getOverlay() {
    return document.getElementById("gameOverlay");
  }

  function openOverlay() {
    const overlay = getOverlay();

    if (!overlay) {
      console.warn("NIJOK: #gameOverlay not found.");
      return false;
    }

    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");

    return true;
  }

  function closeGame() {
    const overlay = getOverlay();

    if (!overlay) return;

    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");

    answerLocked = false;
  }

  window.closeGame = closeGame;

  /* =========================================================
     GAME HEADER
     ========================================================= */

  function setGameHeader(title, description) {
    const mode = document.getElementById("gameModeLabel");
    const titleEl = document.getElementById("gameTitle");
    const descEl = document.getElementById("gameDescription");

    if (mode) mode.textContent = currentMode;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = description;
  }

  /* =========================================================
     GAME CONTENT
     ========================================================= */

  function clearGameContent() {
    const q = document.getElementById("gameQuestion");
    const answers = document.getElementById("gameAnswers");

    if (q) q.innerHTML = "";
    if (answers) answers.innerHTML = "";
  }

  function showQuestion() {
    const questionBox = document.getElementById("gameQuestion");
    const answersBox = document.getElementById("gameAnswers");
    const nextButton = document.getElementById("nextQuestion");

    if (!questionBox || !answersBox) return;

    answersBox.innerHTML = "";

    const item = currentItems[currentQuestion];

    if (!item) {
      finishGame();
      return;
    }

    answerLocked = false;

    if (nextButton) {
      nextButton.style.display = "none";
    }

    /* DAILY CHALLENGE */

    if (currentMode === "Today's Challenge") {
      const [food, country, question] = item;

      questionBox.innerHTML = `
        <div class="nijok-game-photo">
          <img
            src="${photoUrl(food)}"
            alt="${food}"
            onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80'"
          >
        </div>

        <div class="nijok-day-label">
          DAY ${getTodayNumber(100)} / 100
        </div>

        <h3>${question}</h3>
        <p class="nijok-points">Correct answer = +10 points</p>
      `;

      const options = makeOptions(country);

      options.forEach(answer => {
        addAnswerButton(answer, answer === country);
      });

      return;
    }

    /* FOOD MUSEUM */

    if (currentMode === "Food Museum") {
      const [dish, country, ingredients, fact] = item;

      questionBox.innerHTML = `
        <div class="nijok-game-photo">
          <img
            src="${photoUrl(dish)}"
            alt="${dish}"
            onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80'"
          >
        </div>

        <div class="nijok-day-label">
          DAY ${getTodayNumber(50)} / 50
        </div>

        <h3>${dish}</h3>

        <p><strong>Origin:</strong> ${country}</p>
        <p><strong>Ingredients:</strong> ${ingredients}</p>

        <div class="nijok-fact-box">
          ${fact}
        </div>
      `;

      answersBox.innerHTML = `
        <button class="nijok-primary-action" onclick="closeGame()">
          Continue Exploring
        </button>
      `;

      return;
    }

    /* DO YOU KNOW */

    if (currentMode === "Do You Know?") {
      const [title, fact, place] = item;

      questionBox.innerHTML = `
        <div class="nijok-game-photo">
          <img
            src="${photoUrl(title)}"
            alt="${title}"
            onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80'"
          >
        </div>

        <div class="nijok-day-label">
          DAY ${getTodayNumber(50)} / 50
        </div>

        <h3>Did You Know?</h3>

        <h4>${title}</h4>

        <p>${fact}</p>

        <div class="nijok-fact-box">
          🌍 ${place}
        </div>
      `;

      answersBox.innerHTML = `
        <button class="nijok-primary-action" onclick="closeGame()">
          Nice! Explore More
        </button>
      `;

      return;
    }

    /* EXPLORE FOOD */

    if (currentMode === "Explore Food") {
      const [place, country, food, ingredients, fact] = item;

      questionBox.innerHTML = `
        <div class="nijok-game-photo">
          <img
            src="${photoUrl(place + " food")}"
            alt="${place}"
            onerror="this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80'"
          >
        </div>

        <div class="nijok-day-label">
          DAY ${getTodayNumber(100)} / 100
        </div>

        <h3>📍 ${place}</h3>

        <p><strong>Country:</strong> ${country}</p>

        <p>
          <strong>Famous Food:</strong>
          ${food}
        </p>

        <p>
          <strong>Main Ingredients:</strong>
          ${ingredients}
        </p>

        <div class="nijok-fact-box">
          ${fact}
        </div>
      `;

      answersBox.innerHTML = `
        <button class="nijok-primary-action" onclick="closeGame()">
          Explore Another Place
        </button>
      `;

      return;
    }
  }

  /* =========================================================
     ANSWER OPTIONS
     ========================================================= */

  function makeOptions(correct) {
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
      "Vietnam"
    ];

    const result = [correct];

    while (result.length < 4) {
      const random =
        countries[Math.floor(Math.random() * countries.length)];

      if (!result.includes(random)) {
        result.push(random);
      }
    }

    return result.sort(() => Math.random() - 0.5);
  }

  function addAnswerButton(answer, correct) {
    const answersBox = document.getElementById("gameAnswers");

    if (!answersBox) return;

    const button = document.createElement("button");

    button.className = "game-answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(button, correct);
    });

    answersBox.appendChild(button);
  }

  function checkAnswer(button, correct) {
    if (answerLocked) return;

    answerLocked = true;

    const buttons =
      document.querySelectorAll("#gameAnswers .game-answer");

    buttons.forEach(btn => {
      btn.disabled = true;
    });

    if (correct) {
      button.classList.add("correct");

      currentScore += 10;

      setNumber(STORAGE.score, getNumber(STORAGE.score) + 10);

      showToast("Correct! +10 points 🌿");

      showKnowledgeMessage(true);
    } else {
      button.classList.add("wrong");

      buttons.forEach(btn => {
        if (
          btn.textContent ===
          currentItems[currentQuestion][1]
        ) {
          btn.classList.add("correct");
        }
      });

      showToast("Not quite — keep learning!");

      showKnowledgeMessage(false);
    }

    const nextButton = document.getElementById("nextQuestion");

    if (nextButton) {
      nextButton.style.display = "block";
      nextButton.textContent =
        currentQuestion >= currentItems.length - 1
          ? "Finish Challenge"
          : "Next";
    }
  }

  /* =========================================================
     KNOWLEDGE POPUP
     ========================================================= */

  function showKnowledgeMessage(correct) {
    let popup = document.getElementById("nijokKnowledgePopup");

    if (!popup) {
      popup = document.createElement("div");
      popup.id = "nijokKnowledgePopup";

      Object.assign(popup.style, {
        marginTop: "18px",
        padding: "15px 18px",
        borderRadius: "16px",
        background: "#eef3e9",
        color: "#183c2b",
        lineHeight: "1.5"
      });

      const questionBox =
        document.getElementById("gameQuestion");

      if (questionBox) {
        questionBox.appendChild(popup);
      }
    }

    popup.innerHTML = correct
      ? "🌿 <strong>Knowledge gained!</strong><br>Great job. You discovered something new about food and culture."
      : "🌎 <strong>Knowledge gained!</strong><br>Every wrong answer is another chance to discover the world.";
  }

  /* =========================================================
     NEXT
     ========================================================= */

  function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= currentItems.length) {
      finishGame();
      return;
    }

    showQuestion();
  }

  window.nextQuestion = nextQuestion;

  /* =========================================================
     FINISH
     ========================================================= */

  function finishGame() {
    const questionBox = document.getElementById("gameQuestion");
    const answersBox = document.getElementById("gameAnswers");
    const nextButton = document.getElementById("nextQuestion");

    if (nextButton) {
      nextButton.style.display = "none";
    }

    if (!questionBox || !answersBox) return;

    if (currentMode === "Today's Challenge") {
      const todayKey =
        new Date().toISOString().slice(0, 10);

      localStorage.setItem(
        STORAGE.completed,
        todayKey
      );

      questionBox.innerHTML = `
        <div class="nijok-complete">
          <div class="nijok-complete-icon">🎉</div>

          <h3>Today's Challenge Complete!</h3>

          <p>You earned</p>

          <strong class="nijok-big-points">
            ${currentScore} Points
          </strong>

          <p>
            Come back tomorrow for a new photo and question.
          </p>
        </div>
      `;

      answersBox.innerHTML = `
        <button class="nijok-primary-action" onclick="closeGame()">
          Continue
        </button>
      `;

      updateScoreDisplay();

      return;
    }

    questionBox.innerHTML = `
      <div class="nijok-complete">
        <div class="nijok-complete-icon">🌎</div>

        <h3>Discovery Complete!</h3>

        <p>
          Keep exploring food, culture and stories from around the world.
        </p>
      </div>
    `;

    answersBox.innerHTML = `
      <button class="nijok-primary-action" onclick="closeGame()">
        Continue
      </button>
    `;
  }

  /* =========================================================
     START GAME
     ========================================================= */

  function startGame(type) {
    currentQuestion = 0;
    currentScore = 0;

    switch (type) {
      case "today":
      case "challenge":
      case "Today's Challenge":
        currentMode = "Today's Challenge";

        currentItems = [
          TODAY_CHALLENGE[getDayIndex(100)]
        ];

        setGameHeader(
          "Today's Challenge",
          "One photo. One question. Earn 10 points."
        );

        break;

      case "museum":
      case "Food Museum":
        currentMode = "Food Museum";

        currentItems = [
          FOOD_MUSEUM[getDayIndex(50)]
        ];

        setGameHeader(
          "Food Museum",
          "Discover today's famous or unique dish."
        );

        break;

      case "fact":
      case "Do You Know?":
        currentMode = "Do You Know?";

        currentItems = [
          FOOD_FACTS[getDayIndex(50)]
        ];

        setGameHeader(
          "Do You Know?",
          "One beautiful food fact from around the world."
        );

        break;

      case "explore":
      case "Explore Food":
        currentMode = "Explore Food";

        currentItems = [
          EXPLORE_FOOD[getDayIndex(100)]
        ];

        setGameHeader(
          "Explore Food",
          "Explore one place, one food and its story."
        );

        break;

      default:
        currentMode = "Today's Challenge";

        currentItems = [
          TODAY_CHALLENGE[getDayIndex(100)]
        ];

        setGameHeader(
          "Today's Challenge",
          "One photo. One question. Earn 10 points."
        );
    }

    clearGameContent();

    if (!openOverlay()) return;

    showQuestion();
  }

  window.startGame = startGame;

  /* =========================================================
     OPEN GAME - COMPATIBILITY WITH OLD HTML
     ========================================================= */

  window.openGame = function (type) {
    startGame(type);
  };

  /* =========================================================
     QUICK FUNCTIONS
     ========================================================= */

  window.openTodayChallenge = function () {
    startGame("today");
  };

  window.openFoodMuseum = function () {
    startGame("museum");
  };

  window.openDoYouKnow = function () {
    startGame("fact");
  };

  window.openExploreFood = function () {
    startGame("explore");
  };

  /* =========================================================
     LOGIN
     ========================================================= */

  window.openLogin = function () {
    const modal = document.getElementById("loginModal");

    if (!modal) {
      showToast("Login window is not available.");
      return;
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  };

  window.closeLogin = function () {
    const modal = document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  };

  window.continueAsGuest = function () {
    localStorage.setItem(STORAGE.guest, "true");

    window.closeLogin();

    showToast(
      "Welcome to NIJOK! You are playing as a guest 🌿"
    );
  };

  /* =========================================================
     REGISTER
     ========================================================= */

  function setupLogin() {
    const loginButton =
      document.getElementById("loginButton");

    if (!loginButton) return;

    loginButton.addEventListener("click", () => {
      const name =
        document.getElementById("loginName")?.value.trim();

      const email =
        document.getElementById("loginEmail")?.value.trim();

      if (!name) {
        showToast("Please enter your name.");
        return;
      }

      if (!email || !email.includes("@")) {
        showToast("Please enter a valid email.");
        return;
      }

      const user = {
        name,
        email,
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem(
        STORAGE.user,
        JSON.stringify(user)
      );

      window.closeLogin();

      showToast("Account created successfully! 🌿");

      updateUserButton();
    });
  }

  function updateUserButton() {
    const userText =
      document.querySelector("[data-user-name]");

    if (!userText) return;

    const saved =
      localStorage.getItem(STORAGE.user);

    if (!saved) return;

    try {
      const user = JSON.parse(saved);

      if (user?.name) {
        userText.textContent = user.name;
      }
    } catch (error) {
      console.warn(error);
    }
  }

  /* =========================================================
     SCORE DISPLAY
     ========================================================= */

  function updateScoreDisplay() {
    const score = getNumber(STORAGE.score);

    document
      .querySelectorAll(
        "[data-score], #score, .score-value, .user-score"
      )
      .forEach(element => {
        element.textContent = score;
      });
  }

  /* =========================================================
     AUTO BUTTON CONNECTION
     ========================================================= */

  function connectButtons() {
    const buttons =
      document.querySelectorAll("button, a");

    buttons.forEach(button => {
      const text =
        button.textContent
          .trim()
          .toLowerCase();

      if (
        text.includes("today's challenge") ||
        text.includes("todays challenge")
      ) {
        button.addEventListener("click", event => {
          if (!button.getAttribute("onclick")) {
            event.preventDefault();
            startGame("today");
          }
        });
      }

      if (
        text.includes("food museum")
      ) {
        button.addEventListener("click", event => {
          if (!button.getAttribute("onclick")) {
            event.preventDefault();
            startGame("museum");
          }
        });
      }

      if (
        text.includes("do you know")
      ) {
        button.addEventListener("click", event => {
          if (!button.getAttribute("onclick")) {
            event.preventDefault();
            startGame("fact");
          }
        });
      }

      if (
        text.includes("explore food")
      ) {
        button.addEventListener("click", event => {
          if (!button.getAttribute("onclick")) {
            event.preventDefault();
            startGame("explore");
          }
        });
      }
    });
  }

  /* =========================================================
     CLOSE MODAL WHEN CLICKING OUTSIDE
     ========================================================= */

  function setupOutsideClick() {
    const overlay = getOverlay();

    if (overlay) {
      overlay.addEventListener("click", event => {
        if (event.target === overlay) {
          closeGame();
        }
      });
    }

    const loginModal =
      document.getElementById("loginModal");

    if (loginModal) {
      loginModal.addEventListener("click", event => {
        if (event.target === loginModal) {
          window.closeLogin();
        }
      });
    }
  }

  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeGame();
      window.closeLogin();
    }
  });

  /* =========================================================
     INIT
     ========================================================= */

  document.addEventListener("DOMContentLoaded", () => {
    setupLogin();
    connectButtons();
    setupOutsideClick();
    updateUserButton();
    updateScoreDisplay();

    console.log("🌿 NIJOK loaded successfully.");
    console.log("Today's Challenge:", TODAY_CHALLENGE.length);
    console.log("Do You Know:", FOOD_FACTS.length);
    console.log("Food Museum:", FOOD_MUSEUM.length);
    console.log("Explore Food:", EXPLORE_FOOD.length);
  });

})();
