import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeWedding from "@/assets/cake-wedding.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import cakeRedvelvet from "@/assets/cake-redvelvet.jpg";
import cakeStrawberry from "@/assets/cake-strawberry.jpg";
import pastries from "@/assets/pastries.jpg";
import cakePhoto from "@/assets/cake-photo.jpg";
import cakeDesigner from "@/assets/cake-designer.jpg";
import cakeFestival from "@/assets/cake-festival.jpg";
import cakeButterscotch from "@/assets/cake-butterscotch.jpg";
import cakeMango from "@/assets/cake-mango.jpg";
import cakeBlackforest from "@/assets/cake-blackforest.jpg";
import cake1 from "@/assets/cakes/Cake 1.jpg";
import cake2 from "@/assets/cakes/Cake 2.jpg";
import cake3 from "@/assets/cakes/Cake 3.jpg";
import cake4 from "@/assets/cakes/Cake 4.jpg";
import cake5 from "@/assets/cakes/Cake 5.jpg";
import cake6 from "@/assets/cakes/Cake 6.jpg";
import cake7 from "@/assets/cakes/Cake 7.jpg";
import cake8 from "@/assets/cakes/Cake 8.jpg";
import cake9 from "@/assets/cakes/Cake 9.jpg";
import cake10 from "@/assets/cakes/Cake 10.jpg";
import cake11 from "@/assets/cakes/Cake 11.jpg";
import cake12 from "@/assets/cakes/Cake 12.jpg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Chocolate Truffle",
    description: "Rich Belgian chocolate layers with ganache drip and gold sprinkles",
    price: "799",
    category: "Birthday Cakes",
    image: cakeChocolate,
  },
  {
    id: "2",
    name: "Elegant Floral Wedding Cake",
    description: "Three-tier white fondant cake adorned with handcrafted sugar flowers and gold leaves",
    price: "4,999",
    category: "Wedding Cakes",
    image: cakeWedding,
  },
  {
    id: "3",
    name: "Rainbow Cupcake Box (6 pcs)",
    description: "Assorted vanilla cupcakes with colorful buttercream swirls and sprinkles",
    price: "450",
    category: "Cupcakes",
    image: cupcakes,
  },
  {
    id: "4",
    name: "Red Velvet Dream",
    description: "Classic red velvet with layers of cream cheese frosting",
    price: "899",
    category: "Birthday Cakes",
    image: cakeRedvelvet,
  },
  {
    id: "5",
    name: "Fresh Strawberry Delight",
    description: "Light sponge cake with fresh strawberries and whipped cream frosting",
    price: "999",
    category: "Birthday Cakes",
    image: cakeStrawberry,
  },
  {
    id: "6",
    name: "French Pastry Platter",
    description: "Assorted croissants, eclairs, and cream puffs baked fresh daily",
    price: "599",
    category: "Pastries",
    image: pastries,
  },
  {
    id: "7",
    name: "Custom Photo Cake",
    description: "Edible printed photo on a soft vanilla or chocolate sponge cake",
    price: "1,199",
    category: "Photo Cakes",
    image: cakePhoto,
  },
  {
    id: "8",
    name: "Designer Handbag Cake",
    description: "Sculpted fondant cake crafted into any designer item of your choice",
    price: "2,499",
    category: "Designer Cakes",
    image: cakeDesigner,
  },
  {
    id: "9",
    name: "Diwali Festival Special",
    description: "Festive cake with traditional motifs, served with assorted mithai",
    price: "1,499",
    category: "Festival Specials",
    image: cakeFestival,
  },
  {
    id: "10",
    name: "Butterscotch Bliss",
    description: "Vanilla sponge with caramel butterscotch drip and crunchy praline",
    price: "749",
    category: "Birthday Cakes",
    image: cakeButterscotch,
  },
  {
    id: "11",
    name: "Mango Mousse Cake",
    description: "Seasonal Alphonso mango mousse layered on a light sponge base",
    price: "1,099",
    category: "Designer Cakes",
    image: cakeMango,
  },
  {
    id: "12",
    name: "Black Forest Classic",
    description: "Chocolate sponge, whipped cream, cherry compote and chocolate shavings",
    price: "699",
    category: "Birthday Cakes",
    image: cakeBlackforest,
  },
  {
    id: "13",
    name: "Royal Rose Garden Cake",
    description: "Elegant three-tier cake decorated with handcrafted sugar roses and gold leaf accents",
    price: "899",
    category: "Special Collection",
    image: cake1,
  },
  {
    id: "14",
    name: "Chocolate Cascade Dream",
    description: "Decadent chocolate cake with flowing ganache drip and chocolate decorations",
    price: "899",
    category: "Special Collection",
    image: cake2,
  },
 
  {
    id: "16",
    name: "Vanilla Cloud Paradise",
    description: "Light and fluffy vanilla cake with cloud-like buttercream swirls",
    price: "899",
    category: "Special Collection",
    image: cake4,
  },
  {
    id: "17",
    name: "Caramel Drizzle Delight",
    description: "Rich caramel cake with golden drizzle and crunchy praline toppings",
    price: "899",
    category: "Special Collection",
    image: cake5,
  },
  {
    id: "18",
    name: "Ocean Blue Wonder",
    description: "Stunning blue ombre cake with wave-like patterns and pearl accents",
    price: "899",
    category: "Special Collection",
    image: cake6,
  },
  {
    id: "19",
    name: "Sunset Gradient Cake",
    description: "Beautiful sunset-inspired gradient cake with warm orange and pink tones",
    price: "899",
    category: "Special Collection",
    image: cake7,
  },
  {
    id: "20",
    name: "Forest Fantasy Cake",
    description: "Nature-inspired cake with moss green frosting and mushroom decorations",
    price: "899",
    category: "Special Collection",
    image: cake8,
  },
  {
    id: "21",
    name: "Purple Majesty Cake",
    description: "Regal purple cake with silver dust and elegant floral arrangements",
    price: "899",
    category: "Special Collection",
    image: cake9,
  },
  {
    id: "22",
    name: "Golden Celebration Cake",
    description: "Luxurious gold-accented cake perfect for milestone celebrations",
    price: "899",
    category: "Special Collection",
    image: cake10,
  },
  {
    id: "23",
    name: "Pink Princess Dream",
    description: "Delicate pink cake with crown topper and sparkling sugar jewels",
    price: "899",
    category: "Special Collection",
    image: cake11,
  },
];

export const galleryImages = menuItems.map((item) => ({
  src: item.image,
  alt: item.name,
  caption: item.name,
}));
