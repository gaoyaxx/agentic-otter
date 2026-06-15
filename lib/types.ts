export interface BrandDay {
  brand: string;
  date: string; // "2025-04-10"
  channel: "doordash";
  totalOrders: number;
  promoOrders: number;
  promoSpend: number;
  totalSales: number;
  netPayout: number;
  storeCount: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChartData {
  type: "bar" | "line";
  title: string;
  data: Record<string, string | number>[];
  xKey: string;
  yKeys: { key: string; label: string; color: string }[];
}
