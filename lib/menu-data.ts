export type Availability = "available" | "partial" | "unavailable";

export interface MenuItem {
  name: string;
  img: string; // file under /menu-thumbnails
  internal: string;
  skuLink: string;
  skuId: string;
  price: string;
  usedIn: string;
  contains: string;
  locations: string;
  stations: string;
  channels: string;
  avail: Availability;
  availText: string;
}

/** Menu Items — ported from the menu-prototype (Breakfast Beauties brand). */
export const MENU_ITEMS: MenuItem[] = [
  { name: "Coke Can", img: "cola.jpg", internal: "Coke Can", skuLink: "coke-can", skuId: "COK-001", price: "$2.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Sprite Can", img: "sprite.jpg", internal: "Sprite Can", skuLink: "sprite-can", skuId: "SPR-001", price: "$2.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Kool-Aid", img: "juice.jpg", internal: "Kool-Aid", skuLink: "kool-aid", skuId: "KOO-001", price: "$3.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Cakes", img: "cake.jpg", internal: "Cakes", skuLink: "cakes", skuId: "CAK-001", price: "$5.49", usedIn: "1 category", contains: "1 modifier group", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Salsa", img: "salsa.jpg", internal: "Salsa", skuLink: "salsa", skuId: "SAL-001", price: "$0.49", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Toast (Two)", img: "toast.jpg", internal: "Toast (Two)", skuLink: "toast-two", skuId: "TST-002", price: "$1.49", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Hash Brown", img: "hashbrown.jpg", internal: "Hash Brown", skuLink: "hash-brown", skuId: "HSH-001", price: "$2.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "partial", availText: "1/4 Unavailable" },
  { name: "Bacon (Two)", img: "bacon.jpg", internal: "Bacon (Two)", skuLink: "bacon-two", skuId: "BAC-002", price: "$2.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Sausage", img: "sausage.jpg", internal: "Sausage", skuLink: "sausage", skuId: "SAU-001", price: "$2.99", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Pancake", img: "pancake.jpg", internal: "Pancake", skuLink: "pancake", skuId: "PAN-001", price: "$3.49", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Waffle", img: "waffle.jpg", internal: "Waffle", skuLink: "waffle", skuId: "WAF-001", price: "$3.49", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "French Toast", img: "french-toast.jpg", internal: "French Toast", skuLink: "french-toast", skuId: "FRT-001", price: "$3.49", usedIn: "1 category", contains: "0 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Waffle Breakfast Plate", img: "waffle.jpg", internal: "Waffle Breakfast Plate", skuLink: "waffle-brkfst", skuId: "WBP-001", price: "$15.49", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Chicken and Waffles Plate", img: "waffle.jpg", internal: "Chicken and Waffles Plate", skuLink: "chkn-waffles", skuId: "CWP-001", price: "$15.49", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Pancake Breakfast Plate", img: "pancake.jpg", internal: "Pancake Breakfast Plate", skuLink: "pancake-brkfst", skuId: "PBP-001", price: "$15.49", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "partial", availText: "Today" },
  { name: "Big Breakfast Plate", img: "breakfast-plate.jpg", internal: "Big Breakfast Plate", skuLink: "big-brkfst", skuId: "BBP-001", price: "$15.49", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "French Toast Plate", img: "french-toast.jpg", internal: "French Toast Plate", skuLink: "fr-toast-plate", skuId: "FTP-001", price: "$15.49", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Eggy Taco", img: "taco.jpg", internal: "Eggy Taco", skuLink: "eggy-taco", skuId: "EGT-001", price: "$4.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Hammy Eggy Taco", img: "taco.jpg", internal: "Hammy Eggy Taco", skuLink: "hammy-eggy", skuId: "HET-001", price: "$4.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Porky Eggy Taco", img: "taco.jpg", internal: "Porky Eggy Taco", skuLink: "porky-eggy", skuId: "PET-001", price: "$4.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Eggy Sausage Taco", img: "taco.jpg", internal: "Eggy Sausage Taco", skuLink: "eggy-sausage", skuId: "EST-001", price: "$4.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Veggie Eggy Taco", img: "taco.jpg", internal: "Veggie Eggy Taco", skuLink: "veggie-eggy", skuId: "VET-001", price: "$4.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
  { name: "Biggy Eggy Taco", img: "taco.jpg", internal: "Biggy Eggy Taco", skuLink: "biggy-eggy", skuId: "BET-001", price: "$5.99", usedIn: "1 category", contains: "2 modifier groups", locations: "10 locations", stations: "3 station profiles", channels: "3 channels", avail: "available", availText: "Available" },
];

export interface Menu {
  name: string;
  internal: string;
  contains: string;
  items: string;
  locations: string;
  channels: string;
}

/** Menus list — ported from the menu-prototype (Breakfast Beauties brand). */
export const MENUS: Menu[] = [
  { name: "All Day Menu", internal: "All Day Menu", contains: "5 categories", items: "23 menu items", locations: "1 location", channels: "2 channels" },
  { name: "Drink Menu", internal: "Drink Menu", contains: "1 category", items: "3 menu items", locations: "1 location", channels: "2 channels" },
];

export const MENU_TABS = [
  "Menus",
  "Menu items",
  "Modifier items",
  "Categories",
  "Modifier groups",
] as const;
