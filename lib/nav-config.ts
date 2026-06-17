import {
  Home,
  Store,
  BarChart3,
  ShoppingBag,
  BookOpen,
  UsersRound,
  MapPin,
  Tag,
  Radio,
  Users,
  Settings,
  Activity,
  RotateCcw,
  Megaphone,
  Scale,
  Star,
  BellRing,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

export type Persona = "enterprise" | "location";

export interface NavChild {
  id: string;
  label: string;
  personas?: Persona[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  standalone?: boolean;
  children?: NavChild[];
  personas?: Persona[];
  /** Render a section divider line above this item. */
  dividerBefore?: boolean;
}

/** Brands owned by the signed-in brand owner (top-of-nav selector). */
export interface Brand {
  id: string;
  name: string;
  emoji: string;
  /** Optional logo image (overrides emoji). */
  logo?: string;
}

export const BRANDS: Brand[] = [
  { id: "burger-king", name: "Burger King", emoji: "🍔", logo: "/brand-burger-king.png" },
  { id: "pasta-glory", name: "Pasta Glory", emoji: "🍝" },
  { id: "brooklyn-calzones", name: "Brooklyn Calzones", emoji: "🥟" },
  { id: "birria-hands", name: "Birria Hands", emoji: "🌮" },
];

/**
 * Information architecture for the Otter console — authored to match the
 * Figma reference (Reports → Sales) from the Enterprise (HQ brand owner)
 * perspective. `personas` flags let us derive the Location owner variant
 * from this same source of truth later.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, standalone: true },
  { id: "otter-shops", label: "Otter Shops", icon: Store, standalone: true },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    dividerBefore: true,
    children: [
      { id: "live-sales", label: "Live sales" },
      { id: "sales", label: "Sales" },
      { id: "loss-management", label: "Loss management" },
      { id: "accounting", label: "Financials" },
      { id: "report-customers", label: "Customers" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
    standalone: true, // detail deferred
  },
  {
    id: "menus",
    label: "Menus",
    icon: BookOpen,
    dividerBefore: true,
    children: [
      { id: "brand-menus", label: "Brand menus" },
      { id: "sku-library", label: "SKU library" },
      { id: "photos-library", label: "Photos library" },
      { id: "activity-log", label: "Activity log" },
      { id: "edit-history", label: "Edit history" },
      { id: "pricing-rules", label: "Pricing rules" },
      { id: "tax-rules", label: "Tax rules" },
      { id: "archived-menus", label: "Archived menus" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: UsersRound,
    children: [
      { id: "financials", label: "Financials" },
      { id: "campaigns", label: "Campaigns" },
      { id: "customers-list", label: "Customers" },
      { id: "loyalty", label: "Loyalty" },
      { id: "discount", label: "Discount" },
    ],
  },
  {
    id: "locations",
    label: "Locations",
    icon: MapPin,
    dividerBefore: true,
    children: [
      { id: "overview", label: "Overview" },
      { id: "stations", label: "Stations" },
      { id: "devices", label: "Devices" },
      { id: "operation-hours", label: "Operation hours" },
      { id: "deliveries", label: "Deliveries" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    icon: Tag,
    children: [
      { id: "brand-profile", label: "Brand profile" },
      { id: "brand-assets", label: "Assets" },
    ],
  },
  {
    id: "channels",
    label: "Channels",
    icon: Radio,
    children: [
      { id: "point-of-sales", label: "Point of sales" },
      { id: "kiosk", label: "Kiosk" },
      { id: "online-orders", label: "Online orders" },
      { id: "catering", label: "Catering" },
      { id: "partner-channels", label: "Partner channels" },
    ],
  },
  {
    id: "staff",
    label: "Staff",
    icon: Users,
    children: [
      { id: "users", label: "Users" },
      { id: "roles", label: "Roles" },
      { id: "timecards", label: "Timecards" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    standalone: true,
    dividerBefore: true,
  },
];

export type Version = "A" | "B";

/** Version B — product-line-driven flat nav. */
export const NAV_ITEMS_B: NavItem[] = [
  { id: "home", label: "Home", icon: Home, standalone: true },
  { id: "otter-shops", label: "Otter Shop", icon: Store, standalone: true },
  { id: "live-sales", label: "Live Sales", icon: Activity, standalone: true },
  { id: "sales", label: "Sales", icon: BarChart3, standalone: true },
  { id: "revenue-recapture", label: "Revenue Recapture", icon: RotateCcw, standalone: true },
  { id: "marketing-automation", label: "Marketing automation", icon: Megaphone, standalone: true },
  { id: "financial-reconciliation", label: "Financial Reconciliation", icon: Scale, standalone: true },
  { id: "reputation-management", label: "Reputation management", icon: Star, standalone: true },
  { id: "live-alerts", label: "Live alerts", icon: BellRing, standalone: true },
  { id: "verify", label: "Verify", icon: BadgeCheck, standalone: true },
];

export function navForVersion(version: Version, persona: Persona): NavItem[] {
  return version === "B" ? NAV_ITEMS_B : navForPersona(persona);
}

export function navForPersona(persona: Persona): NavItem[] {
  const visible = (p?: Persona[]) => !p || p.includes(persona);
  return NAV_ITEMS.filter((item) => visible(item.personas)).map((item) => ({
    ...item,
    children: item.children?.filter((c) => visible(c.personas)),
  }));
}

export function resolvePage(
  pageId: string,
  version: Version = "A",
): {
  parent?: string;
  title: string;
} {
  const items = version === "B" ? NAV_ITEMS_B : NAV_ITEMS;
  for (const item of items) {
    if (item.id === pageId) return { title: item.label };
    const child = item.children?.find((c) => c.id === pageId);
    if (child) return { parent: item.label, title: child.label };
  }
  return { title: "Home" };
}
