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
  Bell,
  Boxes,
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
  /** Small badge label shown after the item (e.g. "New"). */
  badge?: string;
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
  { id: "popeyes", name: "Popeyes", emoji: "🍗", logo: "/brand-popeyes.png" },
];

/**
 * Information architecture for the Otter console — authored to match the
 * Figma reference (Reports → Sales) from the Enterprise (HQ brand owner)
 * perspective. `personas` flags let us derive the Location owner variant
 * from this same source of truth later.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, standalone: true },
  { id: "alerts", label: "Alerts", icon: Bell, standalone: true },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    dividerBefore: true,
    children: [
      { id: "live-sales", label: "Live sales" },
      { id: "sales", label: "Sales" },
      { id: "revenue-protection", label: "Revenue protection" },
      { id: "accounting", label: "Financial" },
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
  { id: "inventory", label: "Inventory", icon: Boxes, standalone: true, badge: "New" },
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
  { id: "otter-shops", label: "Otter shop", icon: Store, standalone: true, dividerBefore: true },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { id: "account", label: "Account" },
      { id: "notifications", label: "Notifications" },
      { id: "payouts-settings", label: "Payouts settings" },
      { id: "payment-methods", label: "Payment methods" },
      { id: "tax-center", label: "Tax center" },
      { id: "billing", label: "Billing" },
    ],
  },
];

export type Owner = "brand" | "location";
export type Bundle = "enterprise" | "pos" | "middleware";

/**
 * Product-line-driven nav (Enterprise / Middleware bundles), grouped into
 * sections separated by divider lines:
 *   1) Home, Otter Shop
 *   2) Live Sales, Sales
 *   3) Revenue Recapture … Availability, Verify
 *   [Middleware only] Orders, Menus
 *   4) Franchises (brand owner only), Locations, Staff
 */
function enterpriseNav(owner: Owner, withOrdersMenus: boolean): NavItem[] {
  const menus = NAV_ITEMS.find((i) => i.id === "menus")!;

  const ordersMenus: NavItem[] = withOrdersMenus
    ? [
        { id: "orders", label: "Orders", icon: ShoppingBag, standalone: true, dividerBefore: true },
        { ...menus, dividerBefore: false },
      ]
    : [];

  const group4: NavItem[] = [
    ...(owner === "brand"
      ? [{ id: "franchises", label: "Franchisees", icon: UsersRound, standalone: true } as NavItem]
      : []),
    { id: "locations", label: "Locations", icon: MapPin, standalone: true },
    { id: "channels", label: "Channels", icon: Radio, standalone: true },
    {
      id: "staff",
      label: "Staff",
      icon: Users,
      children: [
        { id: "users", label: "Users" },
        { id: "roles", label: "Roles" },
      ],
    },
  ];
  group4[0] = { ...group4[0], dividerBefore: true };

  // Reports group — children differ between Enterprise and Middleware.
  const reportsChildren: NavChild[] = withOrdersMenus
    ? [
        { id: "live-sales", label: "Live sales" },
        { id: "sales", label: "Sales" },
        { id: "revenue-protection", label: "Revenue protection" },
        { id: "payouts", label: "Payouts" },
      ]
    : [
        { id: "sales", label: "Sales" },
        { id: "revenue-protection", label: "Revenue protection" },
        { id: "payouts", label: "Payouts" },
      ];

  // Bottom section: Alerts + Settings.
  const bottom: NavItem[] = [
    { id: "alerts", label: "Alerts", icon: Bell, standalone: true, dividerBefore: true },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      children: [
        { id: "account", label: "Account" },
        { id: "notifications", label: "Notifications" },
        { id: "payouts-settings", label: "Payouts settings" },
        { id: "payment-methods", label: "Payment methods" },
        { id: "tax-center", label: "Tax center" },
        { id: "billing", label: "Billing" },
      ],
    },
  ];

  return [
    { id: "home", label: "Home", icon: Home, standalone: true },
    { id: "reports", label: "Reports", icon: BarChart3, dividerBefore: true, children: reportsChildren },
    { id: "revenue-recapture", label: "Revenue Recapture", icon: RotateCcw, standalone: true, dividerBefore: true },
    { id: "marketing-automation", label: "Marketing automation", icon: Megaphone, standalone: true },
    { id: "financial-reconciliation", label: "Financial Reconciliation", icon: Scale, standalone: true },
    { id: "reputation-management", label: "Reputation management", icon: Star, standalone: true },
    { id: "availability", label: "Availability", icon: BellRing, standalone: true },
    { id: "verify", label: "Verify", icon: BadgeCheck, standalone: true },
    ...ordersMenus,
    ...group4,
    ...bottom,
  ];
}

/** Nav per bundle + owner. POS = workflow-driven (location owner drops Brand);
 *  Enterprise / Middleware = grouped product-line nav. */
export function navForBundle(bundle: Bundle, owner: Owner = "brand"): NavItem[] {
  if (bundle === "pos") {
    return owner === "location"
      ? NAV_ITEMS.filter((i) => i.id !== "brand")
      : NAV_ITEMS;
  }
  return enterpriseNav(owner, bundle === "middleware");
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
  bundle: Bundle = "enterprise",
  owner: Owner = "brand",
): {
  parent?: string;
  title: string;
} {
  const items = navForBundle(bundle, owner);
  for (const item of items) {
    if (item.id === pageId) return { title: item.label };
    const child = item.children?.find((c) => c.id === pageId);
    if (child) return { parent: item.label, title: child.label };
  }
  return { title: "Home" };
}
