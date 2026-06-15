import { NAV_ITEMS } from "./nav-config";

export type Severity = "risk" | "opportunity" | "info";

export interface Insight {
  title: string;
  body: string;
  /** CTA label — the suggested next step / direct execution. */
  action: string;
  severity: Severity;
}

/**
 * Page-contextual, actionable insights for the AI insights panel.
 * Grounded in the Otter Insights strategy docs (fraud detection, menu
 * optimization, labor, cost, demand, customer behavior, marketing/loyalty,
 * operational efficiency) — each follows observation → impact → next step.
 *
 * Lookup order: exact pageId → parent module default → global default.
 */
const BY_PAGE: Record<string, Insight[]> = {
  /* ----------------------------- Reports ----------------------------- */
  sales: [
    {
      title: "Net sales down 5% week-over-week",
      body: "Mostly driven by a 12% drop in DoorDash orders at 3 locations after their ratings slipped below 4.3.",
      action: "View affected locations",
      severity: "risk",
    },
    {
      title: "Promo spend above target on DoorDash",
      body: "Promo hit 52% of orders Friday vs your 45% ceiling across 6 brands, eroding net payout by ~$1.4k.",
      action: "Review discount rules",
      severity: "risk",
    },
    {
      title: "In-store sales lagging other channels",
      body: "Otter POS sales are 18% below the channel average — kiosk prompts could recover walk-in volume.",
      action: "Explore kiosk",
      severity: "opportunity",
    },
  ],
  "live-sales": [
    {
      title: "Lunch rush below forecast",
      body: "Orders are tracking 14% under the 11am–1pm forecast at 4 locations right now — a flash promo could recover it.",
      action: "Launch flash promo",
      severity: "opportunity",
    },
    {
      title: "Prep times climbing at 2 stores",
      body: "Average ticket time is up to 9m12s vs a 6m target during this rush — a kitchen bottleneck is forming.",
      action: "View stations",
      severity: "risk",
    },
  ],
  "loss-management": [
    {
      title: "Excess voids at Location #214",
      body: "23 voided orders today (4× baseline), concentrated on one cashier — a possible cash-skimming pattern.",
      action: "Investigate",
      severity: "risk",
    },
    {
      title: "Manager code used off-shift",
      body: "An override code was applied 7 times when no manager was clocked in — possible code leakage.",
      action: "Review activity",
      severity: "risk",
    },
    {
      title: "Discount-code spike at 3 stores",
      body: "Discount codes hit 31% of orders vs a 9% norm — inappropriate or shared codes are likely.",
      action: "Audit discounts",
      severity: "risk",
    },
  ],
  accounting: [
    {
      title: "Food cost trending over plan",
      body: "Projected to close the month 3.2% over budget, driven mainly by protein price increases.",
      action: "View cost breakdown",
      severity: "risk",
    },
    {
      title: "Unreconciled DoorDash payouts",
      body: "$4,120 in payouts haven't matched to orders over the last 7 days.",
      action: "Reconcile now",
      severity: "info",
    },
  ],
  "report-customers": [
    {
      title: "Repeat-order rate declining",
      body: "30-day repeat rate fell to 22% from 28% — a win-back campaign could recover lapsed eaters.",
      action: "Create win-back",
      severity: "opportunity",
    },
    {
      title: "High-value customers going quiet",
      body: "140 top-decile eaters haven't ordered in 21+ days — worth a targeted offer before they churn.",
      action: "Target with offer",
      severity: "opportunity",
    },
  ],

  /* ------------------------------ Menus ------------------------------ */
  "brand-menus": [
    {
      title: "18 items are missing descriptions",
      body: "Only 22% of your menu items have a description. Items with descriptions convert up to 30% better — let Otter AI draft them all in one click.",
      action: "Generate all descriptions",
      severity: "opportunity",
    },
    {
      title: "Your latte may be underpriced",
      body: "Priced 10% lower than similar items from nearby competitors. Raising it improves margin while staying competitive.",
      action: "Review prices",
      severity: "opportunity",
    },
    {
      title: "Low-velocity, high-complexity items",
      body: "6 items have 4+ nested modifiers and sit in the bottom 10% of sales — candidates to simplify or cut.",
      action: "Optimize menu",
      severity: "opportunity",
    },
    {
      title: "Long prep times hurting throughput",
      body: "3 items average 11m+ prep time (per KDS) with below-average margin — they're slowing the line.",
      action: "Flag items",
      severity: "risk",
    },
  ],
  "sku-library": [
    {
      title: "Duplicate SKUs across brands",
      body: "18 items appear under multiple names, fragmenting your reporting and pricing.",
      action: "Merge SKUs",
      severity: "info",
    },
    {
      title: "High-traffic items missing photos",
      body: "24 frequently-ordered items have no image — items with photos convert about 30% better.",
      action: "Add photos",
      severity: "opportunity",
    },
  ],
  "photos-library": [
    {
      title: "Top sellers missing photos",
      body: "12 of your top-50 items have no image. Adding photos typically lifts conversion ~30%.",
      action: "Upload photos",
      severity: "opportunity",
    },
  ],
  "pricing-rules": [
    {
      title: "Channel price parity gap",
      body: "40+ items are priced the same on DoorDash as in-store despite ~30% commission — margins are compressed.",
      action: "Adjust channel pricing",
      severity: "risk",
    },
    {
      title: "Dynamic pricing opportunity",
      body: "Smoothing peak/off-peak drink prices could lift off-peak volume without hurting peak revenue.",
      action: "Set up rules",
      severity: "opportunity",
    },
  ],
  "tax-rules": [
    {
      title: "Tax mismatch at 2 locations",
      body: "Configured tax rate differs from the jurisdiction default — a compliance risk worth resolving.",
      action: "Review tax setup",
      severity: "risk",
    },
  ],

  /* ---------------------------- Customers ---------------------------- */
  financials: [
    {
      title: "Channel fees eating into margin",
      body: "OFO fees are now 24% of gross on delivery — shifting volume to 1st-party could save ~$3.1k/mo.",
      action: "View channel mix",
      severity: "opportunity",
    },
  ],
  campaigns: [
    {
      title: "'Weekend BOGO' underperforming",
      body: "ROAS is 1.2× vs a 3× target. Pausing or retargeting it would stop the bleed.",
      action: "Adjust campaign",
      severity: "risk",
    },
    {
      title: "Best window for your next promo",
      body: "Tue–Thu 2–4pm is your lowest-volume slot — an ideal target for a margin-safe promo.",
      action: "Schedule promo",
      severity: "opportunity",
    },
  ],
  "customers-list": [
    {
      title: "Lapsed high-value eaters",
      body: "140 of your top customers have been inactive 21+ days — a win-back offer could re-activate them.",
      action: "Win them back",
      severity: "opportunity",
    },
  ],
  loyalty: [
    {
      title: "Loyalty enrollment left on the table",
      body: "81% of non-members would join if asked, but only 12% of checkouts prompt enrollment today.",
      action: "Enable prompt",
      severity: "opportunity",
    },
    {
      title: "Possible loyalty fraud",
      body: "One loyalty ID was used on 6 orders in a single day at one store — likely cashier self-attribution.",
      action: "Investigate",
      severity: "risk",
    },
  ],
  discount: [
    {
      title: "Discount abuse at 3 stores",
      body: "Discount codes applied to 31% of orders vs a 9% norm — review who's applying them and when.",
      action: "Audit discounts",
      severity: "risk",
    },
  ],

  /* ---------------------------- Locations ---------------------------- */
  overview: [
    {
      title: "Location #118 underperforming",
      body: "Net sales have run 19% below regional peers for 3 weeks — it needs an action plan.",
      action: "View action plan",
      severity: "risk",
    },
    {
      title: "Prep times rising across the West",
      body: "Average ticket time is climbing at 5 stores in the West region — a systemic operational issue.",
      action: "Compare locations",
      severity: "risk",
    },
  ],
  stations: [
    {
      title: "Bottleneck at the fry station",
      body: "Fry-station dwell time is running 40% above other stations during the dinner rush.",
      action: "View station",
      severity: "risk",
    },
  ],
  devices: [
    {
      title: "KDS offline at Location #214",
      body: "The kitchen display has been offline for 3 hours — orders may be delayed or dropped.",
      action: "Troubleshoot",
      severity: "risk",
    },
  ],
  deliveries: [
    {
      title: "Long driver handoff times",
      body: "Driver wait at pickup is averaging 6m at 2 stores, dragging down OFO ratings.",
      action: "View details",
      severity: "risk",
    },
  ],

  /* ----------------------------- Channels ---------------------------- */
  "point-of-sales": [
    {
      title: "POS upsell opportunity",
      body: "Combo attach rate at the register is 12% below kiosk — enabling POS prompts could close the gap.",
      action: "Enable prompts",
      severity: "opportunity",
    },
  ],
  kiosk: [
    {
      title: "Kiosks lift average ticket",
      body: "Kiosk orders run 18% higher AOV than cashier orders — expanding to 3 high-traffic stores could add ~$2k/wk.",
      action: "Plan rollout",
      severity: "opportunity",
    },
  ],
  "online-orders": [
    {
      title: "High web cart abandonment",
      body: "34% of web carts are abandoned at checkout — several items require 4+ taps to order.",
      action: "Simplify menu",
      severity: "risk",
    },
  ],
  catering: [
    {
      title: "Untapped catering demand",
      body: "3 customers placed large repeat orders this month that could convert to catering contracts.",
      action: "Follow up",
      severity: "opportunity",
    },
  ],
  "partner-channels": [
    {
      title: "Rating decline on UberEats",
      body: "Store rating dropped to 4.2 at 2 locations after a streak of late orders — it's suppressing visibility.",
      action: "View causes",
      severity: "risk",
    },
  ],

  /* ------------------------------ Staff ------------------------------ */
  users: [
    {
      title: "Possible no-show at #214",
      body: "No clock-in and no orders logged for the opening shift — an employee may not have shown up.",
      action: "Check schedule",
      severity: "risk",
    },
  ],
  roles: [
    {
      title: "Over-privileged accounts",
      body: "5 cashier accounts have manager-level void permissions — a fraud and error risk.",
      action: "Review roles",
      severity: "risk",
    },
  ],
  timecards: [
    {
      title: "Overtime trending up",
      body: "Labor hit 31% of sales last week vs a 26% target, driven by overtime at 3 stores.",
      action: "Optimize schedule",
      severity: "risk",
    },
    {
      title: "Overstaffed 3–5pm",
      body: "Traffic patterns suggest cutting 1 staff member from 3–5pm at Location #118.",
      action: "Adjust schedule",
      severity: "opportunity",
    },
  ],

  /* ---------------------------- Locations ---------------------------- */
  "operation-hours": [
    {
      title: "Christmas is next week — set special hours?",
      body: "Dec 25 falls next Thursday. None of your locations have special hours configured for it — set holiday hours now so customers and delivery apps show the right times.",
      action: "Set special hours",
      severity: "opportunity",
    },
    {
      title: "All locations closed on weekends",
      body: "Every location is closed Saturday and Sunday — opening even a half-day could capture weekend demand competitors are serving.",
      action: "Review weekend hours",
      severity: "opportunity",
    },
    {
      title: "Tuesday set to 'All day' everywhere",
      body: "Every location lists 'All day' for Tuesday instead of specific hours — likely a misconfiguration worth verifying.",
      action: "Check Tuesday hours",
      severity: "risk",
    },
    {
      title: "Downtown Delights has a midday gap",
      body: "It's the only location with a split shift (closed 11:00AM–4:00PM Mon–Fri), which may be costing lunch orders.",
      action: "View location",
      severity: "opportunity",
    },
  ],

  /* ------------------------------ Brand ------------------------------ */
  "brand-profile": [
    {
      title: "Inconsistent brand assets",
      body: "3 locations are showing an outdated logo on their online menus — worth standardizing.",
      action: "Update assets",
      severity: "info",
    },
  ],
};

/** Module-level fallback, keyed by top-level nav id. */
const BY_MODULE: Record<string, Insight[]> = {
  reports: BY_PAGE.sales,
  menus: BY_PAGE["brand-menus"],
  customers: BY_PAGE.campaigns,
  locations: BY_PAGE.overview,
  channels: BY_PAGE.kiosk,
  staff: BY_PAGE.timecards,
  brand: BY_PAGE["brand-profile"],
};

const GLOBAL_DEFAULT: Insight[] = [
  {
    title: "Net sales down 5% week-over-week",
    body: "Mostly driven by a 12% drop in DoorDash orders at 3 locations after their ratings slipped.",
    action: "View details",
    severity: "risk",
  },
  {
    title: "Loyalty enrollment left on the table",
    body: "81% of non-members would join if asked, but only 12% of checkouts prompt enrollment today.",
    action: "Enable prompt",
    severity: "opportunity",
  },
  {
    title: "Possible fraud at Location #214",
    body: "23 voids today (4× baseline) on one cashier, plus an off-shift manager code — worth a look.",
    action: "Investigate",
    severity: "risk",
  },
];

function moduleIdFor(pageId: string): string | undefined {
  for (const item of NAV_ITEMS) {
    if (item.id === pageId) return item.id;
    if (item.children?.some((c) => c.id === pageId)) return item.id;
  }
  return undefined;
}

export function insightsForPage(pageId: string): Insight[] {
  if (BY_PAGE[pageId]) return BY_PAGE[pageId];
  const mod = moduleIdFor(pageId);
  if (mod && BY_MODULE[mod]) return BY_MODULE[mod];
  return GLOBAL_DEFAULT;
}

/**
 * Whether a page exposes the AI insights panel. For now this is scoped to the
 * Reports and Menus modules; Home, Otter Shops, and other modules don't show
 * the panel yet.
 */
const INSIGHTS_MODULES = new Set(["reports", "menus"]);
/** Individual pages (outside the insight modules) that also expose insights. */
const INSIGHTS_PAGES = new Set(["operation-hours"]);

export function pageHasInsights(pageId: string): boolean {
  if (INSIGHTS_PAGES.has(pageId)) return true;
  const mod = moduleIdFor(pageId);
  return mod != null && INSIGHTS_MODULES.has(mod);
}
