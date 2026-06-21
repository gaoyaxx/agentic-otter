"use client";

import {
  ChevronDown,
  Settings2,
  Download,
  ArrowRight,
  ArrowLeftRight,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useState } from "react";
import { useLayout } from "@/lib/layout-context";
import { resolvePage } from "@/lib/nav-config";
import { pageHasInsights } from "@/lib/insights-data";
import { withBrands } from "@/lib/filters";
import Button from "@/components/ui/Button";

/** Report-type tabs per Reports page. Pages not listed show no tabs. */
const REPORT_TABS_BY_PAGE: Record<string, string[]> = {
  sales: ["Overview", "Sales summary", "Menu performance", "Marketing", "Labor"],
  "loss-management": ["Operational excellence", "Availability", "Always on"],
  accounting: ["Payouts", "Direct orders", "Taxes", "Revenue recapture"],
  "report-customers": ["Customers", "Reviews and ratings"],
};
import {
  PageContainer,
  PageHeader,
  Section,
  Card,
} from "@/components/ui/page-template";
import BrandMenusPage from "./BrandMenusPage";
import SalesSummary from "./SalesSummary";
import OperationHours from "./OperationHours";
import HomePage from "./HomePage";

/* ----------------------------- mock metrics ----------------------------- */

interface Metric {
  label: string;
  value: string;
  delta: string;
}
const KEY_METRICS: Metric[] = [
  { label: "Net sales", value: "$31.84", delta: "-5.0%" },
  { label: "Gross sales", value: "$31.74", delta: "-5.0%" },
  { label: "Orders", value: "1", delta: "-5.0%" },
  { label: "Avg order value", value: "$31.84", delta: "-5.0%" },
];

interface Breakdown {
  name: string;
  value: string;
  delta: string;
  color: string;
  letter: string;
}
const BREAKDOWNS: Breakdown[] = [
  { name: "Doordash", value: "$31.84", delta: "-5.0%", color: "#FF3008", letter: "D" },
  { name: "UberEats", value: "$31.74", delta: "-5.0%", color: "#06C167", letter: "U" },
  { name: "Otter POS", value: "$21.82", delta: "-5.0%", color: "#E4337D", letter: "O" },
];

/* ------------------------------ primitives ------------------------------ */

export function FilterPill({ label }: { label: string }) {
  return (
    <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md text-content-secondary transition-colors hover:bg-secondary-alpha-hover">
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-content-weak" />
    </button>
  );
}

function MetricRow({ m }: { m: Metric }) {
  return (
    <div className="flex items-center justify-between border-t border-border-standard px-5 py-3 first:border-t-0">
      <span className="text-body-md text-content-secondary">{m.label}</span>
      <div className="flex items-center gap-3">
        <span className="text-body-md font-semibold tabular-nums text-content-strong">
          {m.value}
        </span>
        <span className="w-12 text-right text-body-md tabular-nums text-negative">
          {m.delta}
        </span>
      </div>
    </div>
  );
}

function BreakdownRow({ b }: { b: Breakdown }) {
  return (
    <div className="flex items-center justify-between border-t border-border-standard px-5 py-3 first:border-t-0">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-thumb-xs text-xs font-bold text-white"
          style={{ backgroundColor: b.color }}
        >
          {b.letter}
        </span>
        <span className="text-body-md text-content-secondary">{b.name}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-body-md font-semibold tabular-nums text-content-strong">
          {b.value}
        </span>
        <span className="w-12 text-right text-body-md tabular-nums text-negative">
          {b.delta}
        </span>
      </div>
    </div>
  );
}

function ViewFullReport() {
  return (
    <button className="focus-ring flex items-center gap-1 rounded-control text-body-md font-medium text-content-strong hover:opacity-70">
      View full report
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

/* ------------------------------- content -------------------------------- */

export default function ContentArea() {
  const { activePage, openPanel, closePanel, rightPanel, bundle, owner } =
    useLayout();
  const insightsOpen = rightPanel === "insights";
  const hasInsights = pageHasInsights(activePage);
  const { parent, title } = resolvePage(activePage, bundle, owner);
  const isHome = activePage === "home";
  const isOtterShops = activePage === "otter-shops";
  const isLiveSales = activePage === "live-sales";
  const isReports = parent === "Reports";
  const isOrders = activePage === "orders";
  const showBreadcrumb = !isHome && !isOtterShops;
  const breadcrumb = !showBreadcrumb
    ? undefined
    : parent
      ? [{ label: parent }, { label: title }]
      : [{ label: title }];
  const pageTitle = isHome ? "Good morning, Olivia." : title;
  const tabs = REPORT_TABS_BY_PAGE[activePage] ?? [];
  const [reportTab, setReportTab] = useState("");
  const activeTab = tabs.includes(reportTab) ? reportTab : (tabs[0] ?? "");

  return (
    <main className="min-w-0 flex-1 overflow-hidden bg-canvas p-4">
      <div className="h-full w-full">
        {activePage === "home" ? (
          <HomePage />
        ) : activePage === "brand-menus" ? (
          <BrandMenusPage />
        ) : activePage === "operation-hours" ? (
          <OperationHours />
        ) : (
        <PageContainer
          header={
            <PageHeader
              breadcrumb={breadcrumb}
              title={pageTitle}
              actions={(() => {
                const insightsBtn = hasInsights ? (
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
                ) : undefined;

                if (isOtterShops || isOrders) return undefined;
                if (isHome)
                  return (
                    <Button variant="tertiary" size="sm" icon={Settings2}>
                      Customize
                    </Button>
                  );
                if (isReports || activePage === "sales")
                  return (
                    <>
                      <Button variant="tertiary" size="sm" icon={Settings2}>
                        Customize
                      </Button>
                      <Button variant="tertiary" size="sm" icon={Download}>
                        Export
                      </Button>
                      <Button variant="tertiary" size="sm" icon={ArrowLeftRight}>
                        Comparison mode
                      </Button>
                      {insightsBtn}
                    </>
                  );
                // Simplified module pages — AI insights only (if available)
                return insightsBtn;
              })()}
            />
          }
        >
          {/* Report-type tabs */}
          {tabs.length > 0 && (
            <div className="flex items-center gap-1 border-b border-border-standard">
              {tabs.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    onClick={() => setReportTab(t)}
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
          )}

          {isHome ? (
            <div className="flex h-64 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
              Home content placeholder
            </div>
          ) : isOtterShops ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {["Filter", "Filter", "Filter"].map((f, i) => (
                  <FilterPill key={`${f}-${i}`} label={f} />
                ))}
              </div>
              <div className="flex h-64 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
                Otter Shops content placeholder
              </div>
            </>
          ) : isLiveSales ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {withBrands(
                  ["Locations", "Channels", "Filter", "Filter", "+1 more"],
                  owner === "location",
                ).map((f, i) => (
                  <FilterPill key={`${f}-${i}`} label={f} />
                ))}
              </div>
              <div className="flex h-64 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
                Live sales content placeholder
              </div>
            </>
          ) : activePage === "sales" && activeTab === "Sales summary" ? (
            <SalesSummary />
          ) : tabs.length > 0 &&
            !(activePage === "sales" && activeTab === "Overview") ? (
            <div className="flex h-48 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
              {activeTab} — not built in this prototype yet
            </div>
          ) : activePage === "sales" ? (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {withBrands(
                  ["Last 7 days", "Locations", "Channels", "Filter", "Filter", "+1 more"],
                  owner === "location",
                ).map((f, i) => (
                  <FilterPill key={`${f}-${i}`} label={f} />
                ))}
              </div>

              <Section
                title="Sales summary"
                subtitle="Updated 2:00 AM today"
                actions={<ViewFullReport />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card header="Key metrics" bodyClassName="px-0 pb-2">
                    {KEY_METRICS.map((m) => (
                      <MetricRow key={m.label} m={m} />
                    ))}
                  </Card>
                  <Card header="Breakdowns" bodyClassName="px-0 pb-2">
                    {BREAKDOWNS.map((b) => (
                      <BreakdownRow key={b.name} b={b} />
                    ))}
                  </Card>
                </div>
              </Section>

              <Section
                title="Menu performance"
                subtitle="Updated 12:00 AM Jun 14"
                actions={<ViewFullReport />}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card header="Key metrics" bodyClassName="px-0 pb-2">
                    {KEY_METRICS.map((m) => (
                      <MetricRow key={m.label} m={m} />
                    ))}
                  </Card>
                  <Card header="Key metrics" bodyClassName="px-0 pb-2">
                    {KEY_METRICS.map((m) => (
                      <MetricRow key={m.label} m={m} />
                    ))}
                  </Card>
                </div>
              </Section>
            </>
          ) : isOrders ? (
            <div className="flex h-64 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
              Orders content placeholder
            </div>
          ) : (
            /* Simplified module pages — 3 example filters + placeholder */
            <>
              <div className="flex flex-wrap items-center gap-2">
                {["Filter", "Filter", "Filter"].map((f, i) => (
                  <FilterPill key={`${f}-${i}`} label={f} />
                ))}
              </div>
              <div className="flex h-64 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
                {title} content placeholder
              </div>
            </>
          )}
        </PageContainer>
        )}
      </div>
    </main>
  );
}
