"use client";

import { useState, type ReactNode } from "react";
import {
  X,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import { asset } from "@/lib/asset";

/* =============================== primitives ============================== */

function Delta({ value = "+1.6%" }: { value?: string }) {
  return (
    <span className="inline-flex items-center rounded-thumb-xs bg-positive-bg px-1.5 py-0.5 text-body-sm font-medium text-positive">
      {value}
    </span>
  );
}

function DropdownPill({ label }: { label: string }) {
  return (
    <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md text-content-secondary transition-colors hover:bg-secondary-alpha-hover">
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-content-weak" />
    </button>
  );
}

/** Two-option segment control (Figma Segment Control, small). */
function SegToggle({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-control bg-canvas p-0.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-[6px] px-2.5 py-1 text-body-sm transition-colors ${
            value === o
              ? "bg-surface font-medium text-content-strong shadow-elevation-low"
              : "text-content-weak hover:text-content-secondary"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function LearnMore({ to }: { to?: string }) {
  const { setActivePage } = useLayout();
  return (
    <button
      onClick={() => to && setActivePage(to)}
      className="focus-ring flex items-center gap-1 text-body-md font-medium text-content-strong hover:opacity-70"
    >
      Learn more
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}

/** Bordered, no-shadow card used across the dashboard grid. */
function DashCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card border border-border-standard bg-surface p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** Stat tile (light grey, used for the small metric callouts). */
function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-control border border-border-standard px-4 py-3">
      <span className="text-body-md text-content-weak">{label}</span>
      <span className="text-heading-md font-display text-content-strong">
        {value}
      </span>
    </div>
  );
}

/* ============================ what's new banner ========================== */

function WhatsNewCard({
  iconSrc,
  badge,
  title,
  body,
  cta,
}: {
  iconSrc: string;
  badge: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-card bg-bg-inverse p-5">
      <div className="flex items-start justify-between gap-3">
        <img src={asset(iconSrc)} alt="" className="h-8 w-8 rounded-control" />
        <span className="rounded-[6px] bg-primary px-1.5 py-1 text-body-md font-semibold text-white">
          {badge}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body-lg font-semibold text-content-inverse-strong">
          {title}
        </p>
        <p className="text-body-md text-content-inverse-weak">{body}</p>
      </div>
      <button className="mt-1 flex h-8 w-fit items-center gap-1.5 self-start rounded-control bg-white px-3 text-body-md font-medium text-content-strong hover:bg-white/90">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function WhatsNew({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="relative flex flex-col gap-4 rounded-page p-5"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-heading-sm text-content-inverse-strong">
          What&apos;s new?
        </h2>
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="flex h-7 w-7 items-center justify-center rounded-control text-content-inverse-weak hover:bg-white/10 hover:text-content-inverse-strong"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <WhatsNewCard
          iconSrc="/whatsnew-momo.png"
          badge="New integration"
          title="Momos is now available in Otter"
          body="Manage your reviews and ratings with Momos directly in Otter, so you can track feedback and improve your online reputation in one place."
          cta="Get started"
        />
        <WhatsNewCard
          iconSrc="/whatsnew-ltv.png"
          badge="New dashboard"
          title="Customer LTV is now live"
          body="See each eater's lifetime value and understand how your campaigns drive repeat visits and revenue over time."
          cta="View"
        />
      </div>
    </div>
  );
}

/* ============================ waterfall chart =========================== */

interface WfBar {
  label: string;
  sub: string;
  base: number;
  delta: number;
  kind: "total" | "up" | "down";
  color?: string;
}
const WF: WfBar[] = [
  { label: "Gross sales", sub: "excl. marketing", base: 0, delta: 16.1, kind: "total" },
  { label: "Marketing cost", sub: "ad spend", base: 15.46, delta: 0.64, kind: "down" },
  { label: "Marketing upside", sub: "4x RoaS", base: 15.46, delta: 2.56, kind: "up" },
  { label: "Commission cost", sub: "marketing", base: 15.04, delta: 2.98, kind: "down" },
  { label: "Adjustments", sub: "errors & cancels", base: 13.62, delta: 1.42, kind: "down" },
  { label: "Net Recaptured", sub: "by Otter", base: 13.62, delta: 0.48, kind: "up" },
  { label: "Net payout", sub: "", base: 0, delta: 14.1, kind: "total", color: "#57b6e9" },
];

const WF_COLOR: Record<WfBar["kind"], string> = {
  total: "#1c69e8",
  up: "#5faf6f",
  down: "#d96b6b",
};

function fmt(b: WfBar) {
  if (b.kind === "total") return `$${b.delta.toFixed(2)}M`;
  if (b.kind === "up") return `+$${b.delta.toFixed(2)}M`;
  return `-$${b.delta.toFixed(2)}M`;
}

function WaterfallChart() {
  const [hover, setHover] = useState<number | null>(null);
  const W = 780;
  const H = 320;
  const axisX = 44;
  const top = 28;
  const bottom = 268; // y for $0
  const plotH = bottom - top; // 240 → 20M
  const max = 20;
  const y = (v: number) => bottom - (v / max) * plotH;

  const slots = WF.length;
  const slotW = (W - axisX - 12) / slots;
  const barW = 46;
  const barX = (i: number) => axisX + i * slotW + (slotW - barW) / 2;

  const gridVals = [0, 5, 10, 15, 20];
  const runningAfter = [16.1, 15.46, 18.02, 15.04, 13.62, 14.1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
      {/* gridlines + y labels */}
      {gridVals.map((g) => (
        <g key={g}>
          <line
            x1={axisX}
            x2={W}
            y1={y(g)}
            y2={y(g)}
            stroke="#0000001f"
            strokeWidth={1}
          />
          <text
            x={axisX - 8}
            y={y(g) + 4}
            textAnchor="end"
            className="fill-content-weak"
            style={{ fontSize: 11 }}
          >
            {g === 0 ? "$0" : `$${g}M`}
          </text>
        </g>
      ))}

      {/* connectors */}
      {runningAfter.map((v, i) => (
        <line
          key={i}
          x1={barX(i) + barW}
          x2={barX(i + 1)}
          y1={y(v)}
          y2={y(v)}
          stroke="#c9c9c9"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
      ))}

      {/* bars + value labels + x labels */}
      {WF.map((b, i) => {
        const topV = b.base + b.delta;
        const yTop = y(topV);
        const h = (b.delta / max) * plotH;
        const cx = barX(i) + barW / 2;
        return (
          <g key={b.label}>
            <rect
              x={barX(i)}
              y={yTop}
              width={barW}
              height={Math.max(h, 2)}
              rx={4}
              fill={b.color ?? WF_COLOR[b.kind]}
              style={{ cursor: b.kind === "up" ? "pointer" : "default" }}
              onMouseEnter={() => b.kind === "up" && setHover(i)}
              onMouseLeave={() => setHover(null)}
            />
            <text
              x={cx}
              y={yTop - 8}
              textAnchor="middle"
              style={{ fontSize: 11, fontWeight: 600 }}
              fill={
                b.kind === "up"
                  ? "#2a7e3d"
                  : b.kind === "down"
                    ? "#c5232b"
                    : "#141414"
              }
            >
              {fmt(b)}
            </text>
            <text
              x={cx}
              y={bottom + 18}
              textAnchor="middle"
              fill="#141414"
              style={{ fontSize: 10.5, fontWeight: 500 }}
            >
              {b.label}
            </text>
            {b.sub && (
              <text
                x={cx}
                y={bottom + 31}
                textAnchor="middle"
                fill="#525252"
                style={{ fontSize: 10.5 }}
              >
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* annotation tooltips — shown on hovering the green bars */}
      {hover === 2 && (
        <ChartTooltip
          x={barX(2) + barW / 2}
          y={y(15.46) + 14}
          text="Your marketing"
          text2="automation output"
        />
      )}
      {hover === 5 && (
        <ChartTooltip
          x={barX(5) + barW / 2}
          y={y(13.62) + 14}
          text="Your recaptured"
          text2="revenue"
        />
      )}
    </svg>
  );
}

/** Dark annotation tooltip with its tip on top, pointing up at the bar above. */
function ChartTooltip({
  x,
  y,
  text,
  text2,
}: {
  x: number;
  y: number;
  text: string;
  text2: string;
}) {
  const w = 132;
  const h = 40;
  const left = x - w / 2;
  return (
    <g>
      <polygon
        points={`${x - 5},${y} ${x + 5},${y} ${x},${y - 6}`}
        fill="#1a1a1a"
      />
      <rect x={left} y={y} width={w} height={h} rx={8} fill="#1a1a1a" />
      <text x={x} y={y + 17} textAnchor="middle" fill="#ffffff" style={{ fontSize: 11 }}>
        {text}
      </text>
      <text x={x} y={y + 30} textAnchor="middle" fill="#ffffff" style={{ fontSize: 11 }}>
        {text2}
      </text>
    </g>
  );
}

/* ============================== hero block ============================= */

const TASKS = [
  { label: "View weekly insights", icon: "/task-weekly-insights.png" },
  { label: "Generate monthly slides", icon: "/task-monthly-slides.png" },
  { label: "Adjust marketing budget", icon: "/task-marketing-budget.png" },
];

function HeroRow() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      {/* left: recovered + suggested tasks */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-body-md text-content-weak">Otter recovered</span>
          <span className="font-display text-display-sm text-content-strong">
            $7,807.39
          </span>
          <div className="flex items-center gap-2">
            <Delta value="3% GMV" />
          </div>
          <span className="mt-0.5 text-body-sm text-content-weak">
            For you in last 30 days
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 rounded-card border border-border-standard p-5">
          <h3 className="font-display text-heading-sm font-medium text-content-strong">
            Suggested tasks
          </h3>
          <div className="flex flex-col">
            {TASKS.map((t) => (
              <button
                key={t.label}
                className="flex items-center gap-3 border-t border-border-standard px-2 py-3 text-left first:border-t-0"
              >
                <img src={asset(t.icon)} alt="" className="h-6 w-6 flex-shrink-0" />
                <span className="flex-1 text-body-md font-semibold text-content-strong">
                  {t.label}
                </span>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-content-strong" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* right: waterfall — bottom-aligned so the chart baseline lines up
          with the bottom of the Suggested tasks card on the left. */}
      <div className="flex flex-col justify-end rounded-card border border-border-standard p-4">
        <WaterfallChart />
      </div>
    </div>
  );
}

/* ======================== revenue recaptured card ====================== */

const RR_CHANNELS = [
  { name: "Doordash", pct: 42, amt: "$639", color: "#1c69e8" },
  { name: "Ubereats", pct: 31, amt: "$472", color: "#57b6e9" },
  { name: "Grubhub", pct: 18, amt: "$274", color: "#8c42e0" },
  { name: "Other", pct: 9, amt: "$136", color: "#f98a53" },
];

const RR_FRANCHISEES = [
  { name: "Chino Hills", pct: 38, amt: "$578", color: "#1c69e8" },
  { name: "Riverside", pct: 27, amt: "$411", color: "#57b6e9" },
  { name: "Pasadena", pct: 19, amt: "$289", color: "#8c42e0" },
  { name: "Anaheim", pct: 11, amt: "$167", color: "#f98a53" },
  { name: "Other", pct: 5, amt: "$76", color: "#9ca3af" },
];

function RevenueRecaptured() {
  const [seg, setSeg] = useState("Channels");
  const RR = seg === "Franchisees" ? RR_FRANCHISEES : RR_CHANNELS;
  return (
    <DashCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={asset("/card-revenue.png")} alt="" className="h-5 w-5" />
          <span className="text-body-md font-semibold text-content-strong">
            Revenue recaptured
          </span>
        </div>
        <SegToggle options={["Channels", "Franchisees"]} value={seg} onChange={setSeg} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-heading-lg text-content-strong">$1,521</span>
        <div className="flex items-center gap-2">
          <Delta />
          <span className="text-body-sm text-content-weak">vs prior 30 days</span>
        </div>
      </div>

      {/* horizontal stacked bar — segment widths = each channel's share;
          grows to fill the card's spare vertical space */}
      <div className="flex min-h-[48px] w-full flex-1 gap-1 overflow-hidden">
        {RR.map((r) => (
          <div
            key={r.name}
            className="h-full rounded-control"
            style={{ width: `${r.pct}%`, backgroundColor: r.color }}
          />
        ))}
      </div>

      {/* ranked list */}
      <div className="flex flex-col">
        {RR.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center gap-3 border-t border-border-standard py-2.5 first:border-t-0"
          >
            <span className="w-3 text-body-md tabular-nums text-content-weak">
              {i + 1}
            </span>
            <span
              className="h-4 w-4 flex-shrink-0 rounded-[4px]"
              style={{ backgroundColor: r.color }}
            />
            <span className="flex-1 text-body-md text-content-secondary">{r.name}</span>
            <span className="w-12 text-right text-body-md tabular-nums text-content-weak">
              {r.pct}%
            </span>
            <span className="w-20 text-right text-body-md tabular-nums text-content-strong">
              {r.amt}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <LearnMore to="revenue-recapture" />
      </div>
    </DashCard>
  );
}

/* ========================= always on unpaused card ===================== */

function ActivityItem({
  logo,
  title,
  sub,
  time,
  recoveredTime,
}: {
  logo: string;
  title: string;
  sub: string;
  time: string;
  recoveredTime: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-control border border-border-standard p-4">
      <div className="flex items-start gap-2">
        <img
          src={asset(logo)}
          alt=""
          className="h-8 w-8 flex-shrink-0 rounded-control object-cover"
        />
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-body-lg font-semibold text-content-strong">{title}</p>
          <p className="text-body-md text-content-weak">{sub}</p>
        </div>
        <span className="text-body-sm tabular-nums text-content-strong">{time}</span>
      </div>
      <div className="flex items-center justify-between gap-2 rounded-control bg-positive-bg px-3 py-2">
        <span className="flex items-center gap-2 text-body-lg font-semibold text-positive">
          <img src={asset("/icon-recovered.png")} alt="" className="h-5 w-5" />
          Recovered by Always on
        </span>
        <span className="text-body-sm tabular-nums text-content-strong">
          {recoveredTime}
        </span>
      </div>
    </div>
  );
}

function AlwaysOnUnpaused() {
  return (
    <DashCard>
      <div className="flex items-center gap-2">
        <img src={asset("/card-alwayson.png")} alt="" className="h-5 w-5" />
        <span className="text-body-md font-semibold text-content-strong">
          Always on unpaused
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-heading-lg text-content-strong">130 times</span>
        <div className="flex items-center gap-2">
          <Delta />
          <span className="text-body-sm text-content-weak">vs prior 30 days</span>
        </div>
      </div>

      <div className="flex gap-3">
        <StatTile label="Estimated revenue saved" value="$130 K" />
        <StatTile label="Downtime" value="1.8%" />
      </div>

      <div className="flex flex-col gap-2">
        <ActivityItem
          logo="/logo-doordash.png"
          title="Doordash paused by staff"
          sub="Chino Hills · [Franchisee]"
          time="10:00 AM"
          recoveredTime="10:01 AM"
        />
        <ActivityItem
          logo="/logo-ubereats.png"
          title="Ubereats paused by Ubereats"
          sub="Chino Hills · [Franchisee]"
          time="9:58 AM"
          recoveredTime="9:58 AM"
        />
      </div>

      <div className="pt-1">
        <LearnMore to="availability" />
      </div>
    </DashCard>
  );
}

/* ====================== incremental marketing payout =================== */

const COHORTS = [
  { name: "Treatment", net: "$37,139", rev: "$1,287,000", orders: "13,200", color: "#1c69e8" },
  { name: "Control", net: "$31,248", rev: "$1,053,000", orders: "10,800", color: "#4ca7e8" },
];

function IncrementalPayout() {
  const [seg, setSeg] = useState("Payout");
  return (
    <DashCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={asset("/card-incremental.png")} alt="" className="h-5 w-5" />
          <span className="text-body-md font-semibold text-content-strong">
            Incremental marketing payout
          </span>
        </div>
        <SegToggle options={["Payout", "Campaigns"]} value={seg} onChange={setSeg} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-heading-lg text-content-strong">$5,891</span>
        <span className="text-body-sm text-content-weak">Marketing pilot starts at Jun 22</span>
      </div>

      {/* split bar — grows to fill the card's spare vertical space */}
      <div className="flex min-h-[80px] flex-1 gap-1.5">
        <div
          className="flex flex-col justify-end rounded-control bg-primary p-3"
          style={{ width: "54.3%" }}
        >
          <span className="text-body-sm font-medium text-white">Treatment</span>
          <span className="text-body-sm text-white/70">54.3% of total payout</span>
        </div>
        <div
          className="flex flex-col justify-end rounded-control p-3"
          style={{ width: "45.7%", backgroundColor: "#4ca7e8" }}
        >
          <span className="text-body-sm font-medium text-white">Control</span>
          <span className="text-body-sm text-white/80">45.6% of total payout</span>
        </div>
      </div>

      {/* table */}
      <div className="flex flex-col">
        <div className="flex items-center border-b border-border-standard py-2 text-body-sm font-semibold text-content-weak">
          <span className="flex-1">Cohort</span>
          <span className="w-24 text-right">Net payout</span>
          <span className="w-28 text-right">Revenue</span>
          <span className="w-20 text-right">Orders</span>
        </div>
        {COHORTS.map((c) => (
          <div
            key={c.name}
            className="flex items-center border-b border-border-standard py-2.5 text-body-md"
          >
            <span className="flex flex-1 items-center gap-2">
              <span
                className="h-4 w-4 flex-shrink-0 rounded-[4px]"
                style={{ backgroundColor: c.color }}
              />
              <span className="text-content-secondary">{c.name}</span>
            </span>
            <span className="w-24 text-right tabular-nums text-content-strong">{c.net}</span>
            <span className="w-28 text-right tabular-nums text-content-secondary">{c.rev}</span>
            <span className="w-20 text-right tabular-nums text-content-secondary">{c.orders}</span>
          </div>
        ))}
        <div className="flex items-center py-2.5 text-body-md font-semibold">
          <span className="flex-1 text-content-strong">Total</span>
          <span className="w-24 text-right tabular-nums text-content-strong">$68,387</span>
          <span className="w-28 text-right tabular-nums text-content-strong">$2,340,000</span>
          <span className="w-20 text-right tabular-nums text-content-strong">24,000</span>
        </div>
      </div>

      <div className="pt-1">
        <LearnMore to="marketing-automation" />
      </div>
    </DashCard>
  );
}

/* ====================== reputation management card ===================== */

function ReputationManagement() {
  return (
    <DashCard>
      <div className="flex items-center gap-2">
        <img src={asset("/card-reputation.png")} alt="" className="h-5 w-5" />
        <span className="text-body-md font-semibold text-content-strong">
          Otter reputation management replied
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-heading-lg text-content-strong">245 reviews</span>
        <div className="flex items-center gap-2">
          <Delta />
          <span className="text-body-sm text-content-weak">vs prior 30 days</span>
        </div>
      </div>

      <div className="flex gap-3">
        <StatTile label="Average rating" value="4.32" />
        <StatTile label="Reviews" value="3452" />
        <StatTile label="Review replied" value="63.2%" />
      </div>

      <div className="flex flex-col gap-4 rounded-control border border-border-standard p-4">
        <div className="flex items-start gap-2">
          <img
            src={asset("/logo-doordash.png")}
            alt=""
            className="h-8 w-8 flex-shrink-0 rounded-control object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-1 text-content-strong">
              {[0, 1].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              {[0, 1, 2].map((i) => (
                <Star key={`e${i}`} className="h-4 w-4 text-border-secondary" />
              ))}
            </div>
            <p className="text-body-lg text-content-strong">
              &ldquo;The order was late and the food was cold&rdquo;
            </p>
            <p className="text-body-md text-content-weak">Chino Hills · [Franchisee]</p>
          </div>
          <span className="text-body-sm tabular-nums text-content-strong">10:00 AM</span>
        </div>
        <div className="rounded-control bg-neutral-bg p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-body-lg font-semibold text-neutral">
              <img src={asset("/icon-replied-otter.png")} alt="" className="h-5 w-5" />
              Replied by Otter
            </span>
            <span className="text-body-sm tabular-nums text-content-strong">9:58 AM</span>
          </div>
          <p className="mt-2 text-body-md text-content-weak">
            Hi Joe, we&apos;re really sorry your order arrived cold and later than
            expected. That&apos;s not the experience we want to have. We&apos;ll
            follow…
          </p>
        </div>
      </div>

      {/* pager dots */}
      <div className="flex items-center justify-center gap-1.5">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full ${
              i === 0 ? "w-4 bg-content-strong" : "w-1.5 bg-border-secondary"
            }`}
          />
        ))}
      </div>

      <div className="pt-1">
        <LearnMore to="reputation-management" />
      </div>
    </DashCard>
  );
}

/* ================================ page ================================= */

export default function HomePage() {
  const { owner } = useLayout();
  const [showWhatsNew, setShowWhatsNew] = useState(true);
  const greetingName = owner === "location" ? "Amy" : "Brian";

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto scrollbar-autohide px-1.5 py-1">
      {showWhatsNew && <WhatsNew onClose={() => setShowWhatsNew(false)} />}

      <div className="flex flex-col gap-6 rounded-page bg-surface p-6 shadow-elevation-low">
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-heading-lg font-medium text-content-strong">
            Good morning, {greetingName}.
          </h1>
          <div className="flex items-center gap-2">
            <DropdownPill label="Last 30 days" />
            <DropdownPill label="Franchisees" />
            <DropdownPill label="Channels" />
          </div>
        </div>

        <HeroRow />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <RevenueRecaptured />
          <AlwaysOnUnpaused />
          <IncrementalPayout />
          <ReputationManagement />
        </div>
      </div>
    </div>
  );
}
