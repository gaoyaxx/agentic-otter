"use client";

import { useState, type ReactNode } from "react";
import {
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  LineChart,
  CheckSquare,
  Square,
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

function LearnMore() {
  return (
    <button className="focus-ring flex items-center gap-1 text-body-md font-medium text-primary-text hover:text-primary-text-hover">
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
    <div className="flex flex-1 flex-col gap-1 rounded-control bg-canvas px-3.5 py-3">
      <span className="text-body-sm text-content-weak">{label}</span>
      <span className="text-heading-sm font-display text-content-strong">
        {value}
      </span>
    </div>
  );
}

/* ============================ what's new banner ========================== */

function WhatsNewCard({
  icon,
  badge,
  title,
  body,
  cta,
}: {
  icon: ReactNode;
  badge: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-card bg-white/[0.06] p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-control bg-white/10 text-content-inverse-strong">
          {icon}
        </span>
        <span className="rounded-thumb-xs bg-primary px-2 py-0.5 text-body-sm font-medium text-white">
          {badge}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body-lg font-semibold text-content-inverse-strong">
          {title}
        </p>
        <p className="text-body-md text-content-inverse-weak">{body}</p>
      </div>
      <button className="mt-1 flex h-8 w-fit items-center gap-1.5 self-end rounded-control bg-white px-3 text-body-md font-medium text-content-strong hover:bg-white/90">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function WhatsNew({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex flex-col gap-4 rounded-page bg-bg-inverse p-5">
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
          icon={<Star className="h-4 w-4" />}
          badge="New integration"
          title="Momos is now available in Otter"
          body="Manage your reviews and ratings with Momos directly in Otter, so you can track feedback and improve your online reputation in one place."
          cta="Get started"
        />
        <WhatsNewCard
          icon={<LineChart className="h-4 w-4" />}
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
}
const WF: WfBar[] = [
  { label: "Gross sales", sub: "excl. marketing", base: 0, delta: 16.1, kind: "total" },
  { label: "Marketing cost", sub: "ad spend", base: 15.46, delta: 0.64, kind: "down" },
  { label: "Marketing upside", sub: "4x RoaS", base: 15.46, delta: 2.56, kind: "up" },
  { label: "Commission cost", sub: "marketing", base: 15.04, delta: 2.98, kind: "down" },
  { label: "Adjustments", sub: "errors & cancels", base: 13.62, delta: 1.42, kind: "down" },
  { label: "Net Recaptured", sub: "by Otter", base: 13.62, delta: 0.48, kind: "up" },
  { label: "Net payout", sub: "", base: 0, delta: 14.1, kind: "total" },
];

const WF_COLOR: Record<WfBar["kind"], string> = {
  total: "#1c69e8",
  up: "#46b760",
  down: "#da252f",
};

function fmt(b: WfBar) {
  if (b.kind === "total") return `$${b.delta.toFixed(2)}M`;
  if (b.kind === "up") return `+$${b.delta.toFixed(2)}M`;
  return `-$${b.delta.toFixed(2)}M`;
}

function WaterfallChart() {
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
              fill={WF_COLOR[b.kind]}
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
              className="fill-content-weak"
              style={{ fontSize: 10.5 }}
            >
              {b.label}
            </text>
            {b.sub && (
              <text
                x={cx}
                y={bottom + 31}
                textAnchor="middle"
                className="fill-content-weak"
                style={{ fontSize: 10.5 }}
              >
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* annotation tooltips */}
      <ChartTooltip x={barX(2) + barW / 2} y={132} text="Your marketing" text2="automation output" />
      <ChartTooltip x={barX(4) + barW / 2} y={170} text="Your recaptured" text2="revenue" />
    </svg>
  );
}

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
      <rect x={left} y={y} width={w} height={h} rx={8} fill="#1a1a1a" />
      <polygon
        points={`${x - 5},${y + h} ${x + 5},${y + h} ${x},${y + h + 6}`}
        fill="#1a1a1a"
      />
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
  "View weekly insights",
  "Generate monthly slides",
  "Adjust marketing budget",
];

function HeroRow() {
  const [done, setDone] = useState<Record<string, boolean>>({});
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

        <div className="flex flex-col gap-3 rounded-card border border-border-standard p-4">
          <span className="text-body-md font-semibold text-content-strong">
            Suggested tasks
          </span>
          <div className="flex flex-col">
            {TASKS.map((t) => {
              const checked = !!done[t];
              return (
                <button
                  key={t}
                  onClick={() => setDone((d) => ({ ...d, [t]: !d[t] }))}
                  className="flex items-center gap-2.5 border-t border-border-standard py-2.5 text-left first:border-t-0"
                >
                  {checked ? (
                    <CheckSquare className="h-4 w-4 flex-shrink-0 text-primary" />
                  ) : (
                    <Square className="h-4 w-4 flex-shrink-0 text-content-weak" />
                  )}
                  <span
                    className={`flex-1 text-body-md ${
                      checked
                        ? "text-content-weak line-through"
                        : "text-content-secondary"
                    }`}
                  >
                    {t}
                  </span>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-content-weak" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* right: waterfall */}
      <div className="flex flex-col rounded-card border border-border-standard p-4">
        <WaterfallChart />
      </div>
    </div>
  );
}

/* ======================== revenue recaptured card ====================== */

const RR = [
  { name: "Doordash", pct: "21%", amt: "$1,287,000", color: "#1c69e8" },
  { name: "Grubhub", pct: "20%", amt: "$1,053,000", color: "#4ca7e8" },
  { name: "Ubereats", pct: "20%", amt: "$1,053,000", color: "#6a29bb" },
  { name: "Other", pct: "20%", amt: "$1,053,000", color: "#ee7b3d" },
];

function RevenueRecaptured() {
  const [seg, setSeg] = useState("Channels");
  return (
    <DashCard>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={asset("/otter-ai.png")} alt="" className="h-5 w-5" />
          <span className="text-body-md font-semibold text-content-strong">
            Revenue recaptured
          </span>
        </div>
        <SegToggle options={["Channels", "Franchisees"]} value={seg} onChange={setSeg} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-display-sm text-content-strong">$1,521</span>
        <div className="flex items-center gap-2">
          <Delta />
          <span className="text-body-sm text-content-weak">vs prior 30 days</span>
        </div>
      </div>

      {/* mini bars */}
      <div className="flex h-24 items-end gap-2">
        {[0.95, 0.78, 0.78, 0.62].map((hpct, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[4px]"
            style={{ height: `${hpct * 100}%`, backgroundColor: RR[i].color }}
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
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <span className="flex-1 text-body-md text-content-secondary">{r.name}</span>
            <span className="w-12 text-right text-body-md tabular-nums text-content-weak">
              {r.pct}
            </span>
            <span className="w-24 text-right text-body-md tabular-nums text-content-strong">
              {r.amt}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border-standard pt-3">
        <LearnMore />
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
    <div className="flex flex-col gap-2 rounded-control border border-border-standard p-3">
      <div className="flex items-start gap-2.5">
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-thumb-xs text-xs font-bold text-white"
          style={{ backgroundColor: logo === "Doordash" ? "#ff3008" : "#06c167" }}
        >
          {logo[0]}
        </span>
        <div className="flex-1">
          <p className="text-body-md font-medium text-content-strong">{title}</p>
          <p className="text-body-sm text-content-weak">{sub}</p>
        </div>
        <span className="text-body-sm tabular-nums text-content-weak">{time}</span>
      </div>
      <div className="flex items-center justify-between rounded-control bg-positive-bg px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-body-sm font-medium text-positive">
          <Sparkles className="h-3.5 w-3.5" />
          Recovered by Always on
        </span>
        <span className="text-body-sm tabular-nums text-positive">{recoveredTime}</span>
      </div>
    </div>
  );
}

function AlwaysOnUnpaused() {
  return (
    <DashCard>
      <div className="flex items-center gap-2">
        <img src={asset("/otter-ai.png")} alt="" className="h-5 w-5" />
        <span className="text-body-md font-semibold text-content-strong">
          Always on unpaused
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-display-sm text-content-strong">130 times</span>
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
          logo="Doordash"
          title="Doordash paused by staff"
          sub="Chino Hills · Franchisee"
          time="10:00 AM"
          recoveredTime="10:01 AM"
        />
        <ActivityItem
          logo="Ubereats"
          title="Ubereats paused by Ubereats"
          sub="Chino Hills · Franchisee"
          time="9:58 AM"
          recoveredTime="9:58 AM"
        />
      </div>

      <div className="border-t border-border-standard pt-3">
        <LearnMore />
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
          <img src={asset("/otter-ai.png")} alt="" className="h-5 w-5" />
          <span className="text-body-md font-semibold text-content-strong">
            Incremental marketing payout
          </span>
        </div>
        <SegToggle options={["Payout", "Campaigns"]} value={seg} onChange={setSeg} />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-display-sm text-content-strong">$5,891</span>
        <span className="text-body-sm text-content-weak">Marketing pilot starts at Jun 22</span>
      </div>

      {/* split bar */}
      <div className="flex h-20 gap-1.5">
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
                className="h-2.5 w-2.5 rounded-full"
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

      <div className="border-t border-border-standard pt-3">
        <LearnMore />
      </div>
    </DashCard>
  );
}

/* ====================== reputation management card ===================== */

function ReputationManagement() {
  return (
    <DashCard>
      <div className="flex items-center gap-2">
        <img src={asset("/otter-ai.png")} alt="" className="h-5 w-5" />
        <span className="text-body-md font-semibold text-content-strong">
          Otter reputation management replied
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-display text-display-sm text-content-strong">245 reviews</span>
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

      <div className="flex flex-col gap-2 rounded-control border border-border-standard p-3">
        <div className="flex items-start gap-2.5">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-thumb-xs bg-[#ff3008] text-xs font-bold text-white">
            D
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-notice">
              {[0, 1].map((i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              {[0, 1, 2].map((i) => (
                <Star key={`e${i}`} className="h-3.5 w-3.5 text-border-secondary" />
              ))}
            </div>
            <p className="mt-1 text-body-md text-content-strong">
              &ldquo;The order was late and the food was cold&rdquo;
            </p>
            <p className="text-body-sm text-content-weak">Chino Hills · Franchisee</p>
          </div>
          <span className="text-body-sm tabular-nums text-content-weak">10:00 AM</span>
        </div>
        <div className="rounded-control bg-canvas p-2.5">
          <p className="flex items-center gap-1.5 text-body-sm font-medium text-content-strong">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Replied by Otter
          </p>
          <p className="mt-1 text-body-sm text-content-weak">
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

      <div className="border-t border-border-standard pt-3">
        <LearnMore />
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
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto scrollbar-autohide">
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
