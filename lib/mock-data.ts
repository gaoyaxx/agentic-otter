import type { BrandDay } from "./types";

// April 10 brand data — anchored exactly to Chat examples.md
const apr10Brands: Omit<BrandDay, "date" | "channel">[] = [
  { brand: "Sunny & Fine's Breakfast Burritos", totalOrders: 189, promoOrders: 66, promoSpend: 455.88, totalSales: 5010.00, netPayout: 4583.02, storeCount: 18 },
  { brand: "Pasta Glory", totalOrders: 134, promoOrders: 37, promoSpend: 268.83, totalSales: 4540.00, netPayout: 4153.49, storeCount: 14 },
  { brand: "Brooklyn Calzones", totalOrders: 105, promoOrders: 13, promoSpend: 88.11, totalSales: 3090.00, netPayout: 2828.09, storeCount: 12 },
  { brand: "Birria Hands", totalOrders: 56, promoOrders: 16, promoSpend: 115.63, totalSales: 1370.00, netPayout: 1254.15, storeCount: 8 },
  { brand: "Bed & Breakfast Burrito Co", totalOrders: 42, promoOrders: 1, promoSpend: 8.00, totalSales: 1188.00, netPayout: 1087.43, storeCount: 6 },
  { brand: "Daydream Breakfast Burritos", totalOrders: 40, promoOrders: 17, promoSpend: 104.33, totalSales: 1225.00, netPayout: 1121.17, storeCount: 7 },
  { brand: "Brekkie Bagels", totalOrders: 65, promoOrders: 13, promoSpend: 74.15, totalSales: 1338.00, netPayout: 1224.98, storeCount: 10 },
  { brand: "Breakfast Beauties", totalOrders: 31, promoOrders: 10, promoSpend: 65.61, totalSales: 781.00, netPayout: 715.28, storeCount: 5 },
  { brand: "Copacabana Acai", totalOrders: 19, promoOrders: 10, promoSpend: 59.44, totalSales: 624.00, netPayout: 571.28, storeCount: 4 },
  { brand: "French Toast Feast", totalOrders: 11, promoOrders: 8, promoSpend: 44.46, totalSales: 266.00, netPayout: 243.55, storeCount: 3 },
  { brand: "Mediterranea Rice Bowls", totalOrders: 36, promoOrders: 12, promoSpend: 81.00, totalSales: 1020.00, netPayout: 934.09, storeCount: 6 },
  { brand: "Acai Aura", totalOrders: 13, promoOrders: 5, promoSpend: 30.00, totalSales: 351.00, netPayout: 321.84, storeCount: 3 },
  { brand: "FREAKING GOOD PIZZA", totalOrders: 10, promoOrders: 4, promoSpend: 14.89, totalSales: 265.00, netPayout: 242.48, storeCount: 3 },
  { brand: "Just Wing It.", totalOrders: 10, promoOrders: 4, promoSpend: 28.64, totalSales: 309.00, netPayout: 283.26, storeCount: 3 },
  { brand: "Pimp my Pasta", totalOrders: 8, promoOrders: 3, promoSpend: 24.00, totalSales: 240.00, netPayout: 220.27, storeCount: 2 },
  { brand: "Saint Pita", totalOrders: 17, promoOrders: 2, promoSpend: 16.00, totalSales: 468.00, netPayout: 428.62, storeCount: 4 },
  { brand: "Phuket I'm Vegan", totalOrders: 8, promoOrders: 1, promoSpend: 7.22, totalSales: 227.00, netPayout: 208.03, storeCount: 2 },
  { brand: "The Daily Egg", totalOrders: 6, promoOrders: 1, promoSpend: 3.00, totalSales: 124.00, netPayout: 113.89, storeCount: 2 },
  { brand: "Bullseye Bagels", totalOrders: 5, promoOrders: 1, promoSpend: 6.79, totalSales: 50.80, netPayout: 46.52, storeCount: 1 },
  { brand: "The Good Rice Bowls", totalOrders: 5, promoOrders: 1, promoSpend: 8.00, totalSales: 144.00, netPayout: 132.10, storeCount: 1 },
  { brand: "Egg the F*ck Out", totalOrders: 4, promoOrders: 1, promoSpend: 10.58, totalSales: 80.80, netPayout: 73.99, storeCount: 1 },
  { brand: "Philly Fresh Cheesesteaks", totalOrders: 4, promoOrders: 1, promoSpend: 2.67, totalSales: 73.10, netPayout: 66.97, storeCount: 1 },
  { brand: "Curry Home", totalOrders: 3, promoOrders: 1, promoSpend: 8.00, totalSales: 78.00, netPayout: 71.42, storeCount: 1 },
  { brand: "Matchstick Masala", totalOrders: 3, promoOrders: 1, promoSpend: 5.34, totalSales: 64.70, netPayout: 59.26, storeCount: 1 },
  { brand: "Lil Ghostie: Quesatacos", totalOrders: 3, promoOrders: 0, promoSpend: 0.00, totalSales: 177.30, netPayout: 162.36, storeCount: 1 },
  { brand: "Burger Town", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 20.40, netPayout: 18.68, storeCount: 1 },
  { brand: "Diner Universe", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 25.20, netPayout: 23.07, storeCount: 1 },
  { brand: "El Burrito Borracho", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 18.77, netPayout: 17.19, storeCount: 1 },
  { brand: "Grilled & Cheesy", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 15.83, netPayout: 14.49, storeCount: 1 },
  { brand: "Mothership Pizza", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 19.74, netPayout: 18.08, storeCount: 1 },
  { brand: "Nachos Muchachos", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 26.82, netPayout: 24.56, storeCount: 1 },
  { brand: "Smokey's BBQ Sandwiches", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 11.35, netPayout: 10.39, storeCount: 1 },
  { brand: "Tacos Cuatro Ruedas", totalOrders: 2, promoOrders: 0, promoSpend: 0.00, totalSales: 40.50, netPayout: 37.07, storeCount: 1 },
  // Remaining brands to reach 63 total and 921 orders
  { brand: "Wok This Way", totalOrders: 8, promoOrders: 4, promoSpend: 32.00, totalSales: 220.00, netPayout: 201.50, storeCount: 2 },
  { brand: "The Dumpling Bar", totalOrders: 7, promoOrders: 3, promoSpend: 18.00, totalSales: 192.00, netPayout: 175.80, storeCount: 2 },
  { brand: "Seoul Street Bowls", totalOrders: 6, promoOrders: 3, promoSpend: 21.00, totalSales: 165.00, netPayout: 151.10, storeCount: 1 },
  { brand: "Loaded Nachos Lab", totalOrders: 5, promoOrders: 2, promoSpend: 14.00, totalSales: 137.00, netPayout: 125.40, storeCount: 1 },
  { brand: "The Wrap Factory", totalOrders: 5, promoOrders: 2, promoSpend: 12.00, totalSales: 130.00, netPayout: 119.00, storeCount: 1 },
  { brand: "Harvest Grain Bowls", totalOrders: 4, promoOrders: 2, promoSpend: 10.00, totalSales: 108.00, netPayout: 98.90, storeCount: 1 },
  { brand: "BBQ Bros", totalOrders: 4, promoOrders: 2, promoSpend: 16.00, totalSales: 110.00, netPayout: 100.70, storeCount: 1 },
  { brand: "Falafel Republic", totalOrders: 3, promoOrders: 1, promoSpend: 8.00, totalSales: 82.00, netPayout: 75.10, storeCount: 1 },
  { brand: "Noodle Temple", totalOrders: 3, promoOrders: 1, promoSpend: 7.50, totalSales: 79.00, netPayout: 72.35, storeCount: 1 },
  { brand: "Smash City Burgers", totalOrders: 3, promoOrders: 1, promoSpend: 9.00, totalSales: 85.00, netPayout: 77.85, storeCount: 1 },
  { brand: "Pizza Bosses", totalOrders: 2, promoOrders: 1, promoSpend: 6.00, totalSales: 54.00, netPayout: 49.45, storeCount: 1 },
  { brand: "Chimi Changa Champs", totalOrders: 2, promoOrders: 1, promoSpend: 8.00, totalSales: 55.00, netPayout: 50.35, storeCount: 1 },
  { brand: "Szechuan Express", totalOrders: 2, promoOrders: 0, promoSpend: 0.00, totalSales: 48.00, netPayout: 43.95, storeCount: 1 },
  { brand: "The Flatbread Co.", totalOrders: 2, promoOrders: 0, promoSpend: 0.00, totalSales: 46.00, netPayout: 42.13, storeCount: 1 },
  { brand: "Greek Street Kitchen", totalOrders: 2, promoOrders: 1, promoSpend: 7.00, totalSales: 53.00, netPayout: 48.55, storeCount: 1 },
  { brand: "Cali Bowls", totalOrders: 2, promoOrders: 1, promoSpend: 9.00, totalSales: 56.00, netPayout: 51.30, storeCount: 1 },
  { brand: "Taco Tornado", totalOrders: 2, promoOrders: 0, promoSpend: 0.00, totalSales: 44.00, netPayout: 40.30, storeCount: 1 },
  { brand: "The Curry Pot", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 22.00, netPayout: 20.15, storeCount: 1 },
  { brand: "Sushi Bento Box", totalOrders: 1, promoOrders: 1, promoSpend: 7.00, totalSales: 24.00, netPayout: 21.98, storeCount: 1 },
  { brand: "Viet Street Eats", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 21.00, netPayout: 19.23, storeCount: 1 },
  { brand: "Morning Fuel Kitchen", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 19.00, netPayout: 17.40, storeCount: 1 },
  { brand: "The Protein Box", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 20.00, netPayout: 18.32, storeCount: 1 },
  { brand: "Nacho Average Nachos", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 18.00, netPayout: 16.48, storeCount: 1 },
  { brand: "The Salad Lab", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 17.00, netPayout: 15.57, storeCount: 1 },
  { brand: "Pepper & Salt Kitchen", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 16.00, netPayout: 14.65, storeCount: 1 },
  { brand: "The Empanada House", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 15.50, netPayout: 14.19, storeCount: 1 },
  { brand: "Crunchy Rolls", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 14.50, netPayout: 13.28, storeCount: 1 },
  { brand: "Fire & Spice", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 13.00, netPayout: 11.90, storeCount: 1 },
  { brand: "Mango Tango Kitchen", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 12.00, netPayout: 10.99, storeCount: 1 },
  { brand: "The Hot Chicken Spot", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 11.00, netPayout: 10.07, storeCount: 1 },
  { brand: "Golden Wok", totalOrders: 1, promoOrders: 0, promoSpend: 0.00, totalSales: 10.50, netPayout: 9.61, storeCount: 1 },
];

function scaleBrands(
  brands: Omit<BrandDay, "date" | "channel">[],
  date: string,
  orderScale: number,
  promoScale: number
): BrandDay[] {
  return brands.map((b) => ({
    ...b,
    date,
    channel: "doordash" as const,
    totalOrders: Math.round(b.totalOrders * orderScale),
    promoOrders: Math.round(b.promoOrders * promoScale),
    promoSpend: Math.round(b.promoSpend * promoScale * 100) / 100,
    totalSales: Math.round(b.totalSales * orderScale * 100) / 100,
    netPayout: Math.round(b.netPayout * orderScale * 100) / 100,
  }));
}

export const brandDays: BrandDay[] = [
  // April 10 — exact data from examples
  ...apr10Brands.map((b) => ({ ...b, date: "2025-04-10", channel: "doordash" as const })),
  // April 3 — ~1.04x orders, ~1.37x promo rate → 954 orders, 42.9% promo
  ...scaleBrands(apr10Brands, "2025-04-03", 1.036, 1.415),
  // March 27 — ~1.19x orders, ~1.38x promo rate → 1098 orders, 43.4% promo
  ...scaleBrands(apr10Brands, "2025-03-27", 1.192, 1.645),
  // March 20 — ~1.17x orders, ~1.38x promo rate → 1079 orders, 43.4% promo
  ...scaleBrands(apr10Brands, "2025-03-20", 1.171, 1.624),
];

// Pre-computed daily rollups for quick reference
export const dailyRollups = ["2025-04-10", "2025-04-03", "2025-03-27", "2025-03-20"].map(
  (date) => {
    const days = brandDays.filter((b) => b.date === date);
    return {
      date,
      channel: "doordash" as const,
      brandCount: days.length,
      storeCount: days.reduce((s, b) => s + b.storeCount, 0),
      totalOrders: days.reduce((s, b) => s + b.totalOrders, 0),
      promoOrders: days.reduce((s, b) => s + b.promoOrders, 0),
      promoSpend: Math.round(days.reduce((s, b) => s + b.promoSpend, 0) * 100) / 100,
      totalSales: Math.round(days.reduce((s, b) => s + b.totalSales, 0) * 100) / 100,
      netPayout: Math.round(days.reduce((s, b) => s + b.netPayout, 0) * 100) / 100,
    };
  }
);
