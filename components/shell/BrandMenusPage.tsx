"use client";

import { type ReactNode } from "react";
import {
  ChevronDown,
  CircleCheck,
  CircleAlert,
  MoreVertical,
  Plus,
  Search,
  Columns3,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import Button from "@/components/ui/Button";
import { PageContainer, PageHeader } from "@/components/ui/page-template";
import { MENU_ITEMS, MENUS, MENU_TABS, type Availability } from "@/lib/menu-data";
import { asset } from "@/lib/asset";
import { withBrands } from "@/lib/filters";

/* ------------------------------- pieces -------------------------------- */

function AvailabilityBadge({
  avail,
  text,
}: {
  avail: Availability;
  text: string;
}) {
  if (avail === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 text-body-md text-positive">
        <CircleCheck className="h-3.5 w-3.5" />
        {text}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-body-md text-notice">
      <CircleAlert className="h-3.5 w-3.5" />
      {text}
    </span>
  );
}

function FilterPill({ label }: { label: string }) {
  return (
    <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md text-content-secondary transition-colors hover:bg-secondary-alpha-hover">
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-content-weak" />
    </button>
  );
}

/** Search box + column selector (+ optional trailing action) — right of the toolbar. */
function TableTools({ trailing }: { trailing?: ReactNode }) {
  return (
    <div className="ml-auto flex items-center gap-2">
      <div className="flex h-8 w-56 items-center gap-2 rounded-control border border-border-secondary bg-surface px-3">
        <Search className="h-4 w-4 flex-shrink-0 text-content-weak" />
        <input
          placeholder="Search..."
          className="w-full bg-transparent text-body-md text-content-secondary outline-none placeholder:text-content-weak"
        />
      </div>
      <button
        aria-label="Choose columns"
        className="focus-ring flex h-8 w-8 items-center justify-center rounded-control border border-border-secondary bg-surface text-content-secondary hover:bg-secondary-alpha-hover"
      >
        <Columns3 className="h-4 w-4" />
      </button>
      {trailing}
    </div>
  );
}

const HEADERS = [
  "Display name",
  "Internal name",
  "Item SKU",
  "Price",
  "Used in",
  "Contains",
  "Locations",
  "Station profiles",
  "Channels",
  "Availability",
];

function MenuItemsTable() {
  return (
    <div className="overflow-x-auto border-y border-border-standard">
      <table className="w-full min-w-[1180px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-standard bg-canvas">
            <th className="w-10 px-4 py-2.5">
              <input type="checkbox" className="h-4 w-4 rounded border-border-secondary" />
            </th>
            {HEADERS.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-2.5 text-body-sm font-semibold text-content-weak"
              >
                {h}
              </th>
            ))}
            <th className="w-10 px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {MENU_ITEMS.map((it) => (
            <tr
              key={it.skuId}
              className="border-b border-border-standard last:border-b-0 hover:bg-canvas"
            >
              <td className="px-4 py-2.5">
                <input type="checkbox" className="h-4 w-4 rounded border-border-secondary" />
              </td>
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={asset(`/menu-thumbnails/${it.img}`)}
                    alt=""
                    className="h-8 w-8 flex-shrink-0 rounded-thumb-xs object-cover"
                  />
                  <span className="whitespace-nowrap text-body-md font-medium text-content-strong">
                    {it.name}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.internal}
              </td>
              <td className="px-4 py-2.5">
                <div className="flex flex-col">
                  <span className="text-body-md font-medium text-primary-text">
                    {it.skuLink}
                  </span>
                  <span className="text-body-sm text-content-weak">{it.skuId}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md tabular-nums text-content-strong">
                {it.price}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.usedIn}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.contains}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.locations}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.stations}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {it.channels}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5">
                <AvailabilityBadge avail={it.avail} text={it.availText} />
              </td>
              <td className="px-4 py-2.5">
                <button className="focus-ring flex h-7 w-7 items-center justify-center rounded-control text-content-weak hover:bg-secondary-alpha-hover">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MENUS_HEADERS = [
  "Display name",
  "Internal name",
  "Contains",
  "Menu items",
  "Locations",
  "Channels",
];

function MenusTable() {
  return (
    <div className="overflow-x-auto border-y border-border-standard">
      <table className="w-full min-w-[800px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-standard bg-canvas">
            <th className="w-10 px-4 py-2.5">
              <input type="checkbox" className="h-4 w-4 rounded border-border-secondary" />
            </th>
            {MENUS_HEADERS.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-2.5 text-body-sm font-semibold text-content-weak"
              >
                {h}
              </th>
            ))}
            <th className="w-10 px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {MENUS.map((m) => (
            <tr
              key={m.name}
              className="border-b border-border-standard last:border-b-0 hover:bg-canvas"
            >
              <td className="px-4 py-2.5">
                <input type="checkbox" className="h-4 w-4 rounded border-border-secondary" />
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md font-medium text-content-strong">
                {m.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {m.internal}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {m.contains}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {m.items}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {m.locations}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 text-body-md text-content-secondary">
                {m.channels}
              </td>
              <td className="px-4 py-2.5">
                <button className="focus-ring flex h-7 w-7 items-center justify-center rounded-control text-content-weak hover:bg-secondary-alpha-hover">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- page --------------------------------- */

export default function BrandMenusPage() {
  const {
    openPanel,
    closePanel,
    rightPanel,
    owner,
    menuTab: tab,
    setMenuTab: setTab,
  } = useLayout();
  const insightsOpen = rightPanel === "insights";
  const isLoc = owner === "location";

  return (
    <PageContainer
      header={
        <PageHeader
          breadcrumb={[{ label: "Menus" }, { label: "Brand menus" }]}
          title="Brand menus"
          actions={
            <Button
              variant="tertiary"
              size="sm"
              iconTrailing={insightsOpen ? PanelRightOpen : PanelRightClose}
              onClick={() =>
                insightsOpen ? closePanel() : openPanel("insights")
              }
            >
              Otter AI insights
            </Button>
          }
        />
      }
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border-standard">
        {MENU_TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`focus-ring -mb-px border-b-2 px-3 pb-2.5 pt-1 text-body-md transition-colors ${
                active
                  ? "border-content-primary font-semibold text-content-strong"
                  : "border-transparent text-content-weak hover:text-content-secondary"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {tab === "Menu items" ? (
        <div className="flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {withBrands(
              ["Locations", "Station profiles", "Channels"],
              isLoc,
            ).map((f) => (
              <FilterPill key={f} label={f} />
            ))}
            <FilterPill label="+2 more" />
            <TableTools
              trailing={
                <Button variant="primary" size="sm" icon={Plus}>
                  Add menu item
                </Button>
              }
            />
          </div>
          <MenuItemsTable />
        </div>
      ) : tab === "Menus" ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {withBrands(["Locations", "Channels"], isLoc).map((f) => (
              <FilterPill key={f} label={f} />
            ))}
            <FilterPill label="+2 more" />
            <TableTools
              trailing={
                <Button variant="primary" size="sm" icon={Plus}>
                  Add menu
                </Button>
              }
            />
          </div>
          <MenusTable />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
          {tab} — not built in this prototype yet
        </div>
      )}
    </PageContainer>
  );
}
