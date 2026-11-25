// Put your photos in public/images/ named after the dish (see public/images/README.txt).
// If a photo is missing, a drawn illustration of the dish is shown instead.
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const photo = (n) => `/images/${slug(n)}.jpg`;

export const CATS = ["All", "Starters", "Mains", "Breads & Rice", "Desserts", "Drinks"];

export const DISHES = [
  { id: 1, name: "Smoked Tandoori Chicken", cat: "Starters", price: 420, veg: false, spicy: 2, rating: 4.8, desc: "Marinated overnight, charred in the clay oven.", img: photo("Smoked Tandoori Chicken") },
  { id: 2, name: "Paneer Tikka", cat: "Starters", price: 340, veg: true, spicy: 1, rating: 4.6, desc: "Cottage cheese, bell peppers and mint chutney.", img: photo("Paneer Tikka") },
  { id: 3, name: "Dahi ke Kebab", cat: "Starters", price: 310, veg: true, spicy: 1, rating: 4.5, desc: "Hung-curd patties with a crisp golden crust.", img: photo("Dahi ke Kebab") },
  { id: 4, name: "Dum Biryani", cat: "Mains", price: 460, veg: false, spicy: 2, rating: 4.9, desc: "Basmati sealed and slow-cooked with saffron.", img: photo("Dum Biryani") },
  { id: 5, name: "Butter Chicken", cat: "Mains", price: 440, veg: false, spicy: 1, rating: 4.7, desc: "Tandoori chicken in a silky tomato-butter gravy.", img: photo("Butter Chicken") },
  { id: 6, name: "Dal Makhani", cat: "Mains", price: 320, veg: true, spicy: 0, rating: 4.7, desc: "Black lentils simmered for 12 hours with cream.", img: photo("Dal Makhani") },
  { id: 7, name: "Garlic Naan", cat: "Breads & Rice", price: 90, veg: true, spicy: 0, rating: 4.6, desc: "Soft, blistered and brushed with garlic butter.", img: photo("Garlic Naan") },
  { id: 8, name: "Saffron Pulao", cat: "Breads & Rice", price: 220, veg: true, spicy: 0, rating: 4.4, desc: "Fragrant rice with whole spices and saffron.", img: photo("Saffron Pulao") },
  { id: 9, name: "Gulab Jamun", cat: "Desserts", price: 160, veg: true, spicy: 0, rating: 4.8, desc: "Warm milk dumplings in cardamom syrup.", img: photo("Gulab Jamun") },
  { id: 10, name: "Rasmalai", cat: "Desserts", price: 190, veg: true, spicy: 0, rating: 4.6, desc: "Soft cheese discs in chilled saffron milk.", img: photo("Rasmalai") },
  { id: 11, name: "Mango Lassi", cat: "Drinks", price: 150, veg: true, spicy: 0, rating: 4.5, desc: "Thick yoghurt blended with ripe mango.", img: photo("Mango Lassi") },
  { id: 12, name: "Masala Chai", cat: "Drinks", price: 90, veg: true, spicy: 0, rating: 4.4, desc: "Strong tea simmered with ginger and cardamom.", img: photo("Masala Chai") },
];

export const SIGNATURE_IDS = [4, 1, 5, 9, 2];
export const inr = (n) => "₹" + n.toLocaleString("en-IN");

// Ingredients shown on the back of each menu card.
const ING = {1:["Chicken","Yoghurt","Kashmiri chilli","Ginger","Lemon"],2:["Paneer","Bell pepper","Mint chutney","Ajwain","Lemon"],3:["Hung curd","Chickpea flour","Green chilli","Coriander","Ghee"],4:["Basmati rice","Saffron","Mint","Fried onion","Whole spices"],5:["Chicken","Tomato","Butter","Cream","Fenugreek"],6:["Black lentils","Kidney beans","Butter","Cream","Garlic"],7:["Flour","Yoghurt","Garlic","Butter","Coriander"],8:["Basmati rice","Saffron","Cardamom","Clove","Cinnamon"],9:["Milk solids","Sugar syrup","Cardamom","Rose water","Pistachio"],10:["Fresh cheese","Milk","Saffron","Cardamom","Almonds"],11:["Yoghurt","Mango","Cardamom","Honey","Ice"],12:["Black tea","Ginger","Cardamom","Milk","Clove"]};
DISHES.forEach((d) => { d.ing = ING[d.id]; });
