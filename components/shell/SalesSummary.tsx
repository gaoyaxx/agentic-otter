"use client";

import { Fragment, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  Columns3,
  X,
  LineChart as LineIcon,
  BarChart3,
  Settings2,
  Maximize2,
} from "lucide-react";
import { FilterPill } from "./ContentArea";
import { useLayout } from "@/lib/layout-context";

/* ------------------------------- data ---------------------------------- */

interface TrendMetric {
  key: string;
  label: string;
  value: string;
  delta: string;
  prev: string;
  up: boolean;
}
const METRICS: TrendMetric[] = [
  { key: "net", label: "Net sales", value: "$28,051.53", delta: "1.2%", prev: "$25,434.24", up: true },
  { key: "gross", label: "Gross sales", value: "$25,433.53", delta: "4.7%", prev: "$21,523.64", up: true },
  { key: "orders", label: "Total orders", value: "8654", delta: "3.2%", prev: "9069", up: true },
  { key: "aov", label: "Average order value", value: "$35.25", delta: "10.6%", prev: "$31.75", up: true },
];

const CHART = [
  { day: "Mon 06", current: 5600, compare: 4600 },
  { day: "Tue 07", current: 7100, compare: 4300 },
  { day: "Wed 08", current: 7300, compare: 9300 },
  { day: "Thu 09", current: 6900, compare: 8500 },
  { day: "Fri 10", current: 9100, compare: 8200 },
  { day: "Sat 11", current: 7700, compare: 7500 },
  { day: "Sun 12", current: 8100, compare: 11000 },
];

interface Triple {
  a: string;
  b: string;
  change: number;
}
interface BreakdownRow {
  location: string;
  orders: string;
  gross: Triple;
  net: Triple;
  disc: Triple;
  channels?: { name: string; color: string; letter: string }[];
}
const t = (a: string, b: string, change: number): Triple => ({ a, b, change });
const ROWS: BreakdownRow[] = [
  {
    location: "New York",
    orders: "7342",
    gross: t("$5.25", "$5.25", -5.2),
    net: t("$5.25", "$5.25", -5.2),
    disc: t("$5.25", "$5.25", -5.2),
    channels: [
      { name: "Doordash", color: "#FF3008", letter: "D" },
      { name: "Ubereats", color: "#06C167", letter: "U" },
      { name: "Grubhub", color: "#F63440", letter: "G" },
    ],
  },
  { location: "Phoenix", orders: "4861", gross: t("$3.50", "$3.50", -3.1), net: t("$3.50", "$3.50", -3.1), disc: t("$3.50", "$3.50", -3.1) },
  { location: "Philadelphia", orders: "905", gross: t("$6.80", "$6.80", 6.8), net: t("$6.80", "$6.80", 6.8), disc: t("$6.80", "$6.80", 6.8) },
  { location: "San Antonio", orders: "1284", gross: t("$0.99", "$0.99", -8.1), net: t("$0.99", "$0.99", -8.1), disc: t("$0.99", "$0.99", -8.1) },
  { location: "San Diego", orders: "63", gross: t("$15.00", "$15.00", -4.6), net: t("$15.00", "$15.00", -4.6), disc: t("$15.00", "$15.00", -4.6) },
  { location: "Dallas", orders: "450", gross: t("$9.30", "$9.30", 8.5), net: t("$9.30", "$9.30", 8.5), disc: t("$9.30", "$9.30", 8.5) },
  { location: "San Jose", orders: "4027", gross: t("$14.60", "$14.60", 3.7), net: t("$14.60", "$14.60", 3.7), disc: t("$14.60", "$14.60", 3.7) },
];

/* ----------------------------- primitives ------------------------------ */

function Pct({ change }: { change: number }) {
  const neg = change < 0;
  return (
    <span className={`tabular-nums ${neg ? "text-negative" : "text-positive"}`}>
      {neg ? "" : "+"}
      {change}%
    </span>
  );
}

function MetricTile({
  m,
  active,
  onClick,
}: {
  m: TrendMetric;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring flex flex-col items-start gap-1 rounded-card border px-4 py-3 text-left transition-colors ${
        active
          ? "border-border-secondary bg-canvas"
          : "border-border-standard bg-surface hover:bg-canvas"
      }`}
    >
      <span className="text-body-md text-content-secondary underline decoration-dotted underline-offset-2">
        {m.label}
      </span>
      <span className="font-display text-heading-md text-content-strong">
        {m.value}
      </span>
      <span className="flex items-center gap-1 text-body-sm text-content-weak">
        {m.up ? (
          <ArrowUp className="h-3.5 w-3.5 text-positive" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 text-negative" />
        )}
        <span className={m.up ? "text-positive" : "text-negative"}>{m.delta}</span>
        than {m.prev}
      </span>
    </button>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof Search }) {
  return (
    <button className="focus-ring flex h-8 w-8 items-center justify-center rounded-control border border-border-secondary bg-surface text-content-secondary hover:bg-secondary-alpha-hover">
      <Icon className="h-4 w-4" />
    </button>
  );
}

/* --------------------------- breakdowns table -------------------------- */

const GROUPS = ["Gross sales", "Net sales", "Discounts sales"] as const;
const SUBCOLS = ["Jul 12 - Jul 13", "Jul 23 - Aug 3", "% Change"];

function GroupCells({ triple }: { triple: Triple }) {
  return (
    <>
      <td className="whitespace-nowrap px-4 py-3 text-body-md tabular-nums text-content-secondary">
        {triple.a}
      </td>
      <td className="whitespace-nowrap border-r border-border-standard px-4 py-3 text-body-md tabular-nums text-content-secondary">
        {triple.b}
      </td>
      <td className="whitespace-nowrap border-r border-border-standard px-4 py-3 text-body-md">
        <Pct change={triple.change} />
      </td>
    </>
  );
}

function BreakdownsTable() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["New York"]));
  const toggle = (loc: string) =>
    setExpanded((s) => {
      const n = new Set(s);
      n.has(loc) ? n.delete(loc) : n.add(loc);
      return n;
    });

  return (
    <div className="overflow-x-auto border-y border-border-standard">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-standard bg-canvas">
            <th rowSpan={2} className="px-4 py-2.5 text-body-sm font-semibold text-content-weak">
              Location
            </th>
            <th rowSpan={2} className="border-r border-border-standard px-4 py-2.5 text-body-sm font-semibold text-content-weak">
              Orders
            </th>
            {GROUPS.map((g) => (
              <th
                key={g}
                colSpan={3}
                className="border-r border-border-standard px-4 pt-2.5 text-body-sm font-semibold text-content-strong underline decoration-dotted underline-offset-2"
              >
                {g}
              </th>
            ))}
          </tr>
          <tr className="border-b border-border-standard bg-canvas">
            {GROUPS.map((g) =>
              SUBCOLS.map((s, i) => (
                <th
                  key={`${g}-${s}`}
                  className={`whitespace-nowrap px-4 py-2 text-body-sm font-medium text-content-weak ${
                    i === 2 ? "border-r border-border-standard" : ""
                  }`}
                >
                  {s}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => {
            const isOpen = expanded.has(r.location);
            return (
              <Fragment key={r.location}>
                <tr className="border-b border-border-standard hover:bg-canvas">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {r.channels ? (
                        <button
                          onClick={() => toggle(r.location)}
                          className="flex h-5 w-5 items-center justify-center rounded text-content-weak hover:bg-secondary-alpha-hover"
                        >
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-content-weak" />
                      )}
                      <span className="whitespace-nowrap text-body-md font-medium text-content-strong">
                        {r.location}
                      </span>
                    </div>
                  </td>
                  <td className="border-r border-border-standard px-4 py-3">
                    <span className="text-body-md font-medium text-primary-text">
                      {r.orders}
                    </span>
                  </td>
                  <GroupCells triple={r.gross} />
                  <GroupCells triple={r.net} />
                  <GroupCells triple={r.disc} />
                </tr>
                {isOpen &&
                  r.channels?.map((c) => (
                    <tr
                      key={c.name}
                      className="border-b border-border-standard bg-canvas/40"
                    >
                      <td className="px-4 py-2.5 pl-12">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                            style={{ backgroundColor: c.color }}
                          >
                            {c.letter}
                          </span>
                          <span className="whitespace-nowrap text-body-md text-content-secondary">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="border-r border-border-standard px-4 py-2.5">
                        <span className="text-body-md text-primary-text">
                          {Math.round(Number(r.orders) / 6)}
                        </span>
                      </td>
                      <GroupCells triple={r.gross} />
                      <GroupCells triple={r.net} />
                      <GroupCells triple={r.disc} />
                    </tr>
                  ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- view --------------------------------- */

export default function SalesSummary() {
  const { owner } = useLayout();
  const [metric, setMetric] = useState("net");
  const [range, setRange] = useState("7D");

  return (
    <div className="flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-control border border-border-standard bg-canvas p-1">
          {["Today", "7D", "14D", "30D"].map((seg) => {
            const on = seg === range;
            return (
              <button
                key={seg}
                onClick={() => setRange(seg)}
                className={`focus-ring rounded-[6px] px-3 py-1 text-body-md transition-colors ${
                  on
                    ? "border border-border-standard bg-surface font-medium text-content-strong shadow-sm"
                    : "border border-transparent text-content-secondary hover:text-content-strong"
                }`}
              >
                {seg}
              </button>
            );
          })}
        </div>
        <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-primary-border bg-info-bg px-3 text-body-md text-primary-text">
          Compare to: Last 7 days
          <X className="h-3.5 w-3.5" />
        </button>
        <FilterPill label="Locations" />
        {owner === "location" && <FilterPill label="Brands" />}
        <FilterPill label="Channels" />
        <FilterPill label="+1 more" />
      </div>

      {/* Trend */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-heading-sm text-content-strong">Trend</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m) => (
            <MetricTile
              key={m.key}
              m={m}
              active={metric === m.key}
              onClick={() => setMetric(m.key)}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md text-content-secondary hover:bg-secondary-alpha-hover">
            View by
            <ChevronDown className="h-3.5 w-3.5 text-content-weak" />
          </button>
          <IconBtn icon={LineIcon} />
          <IconBtn icon={BarChart3} />
          <IconBtn icon={Settings2} />
          <IconBtn icon={Maximize2} />
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART} margin={{ top: 8, right: 12, bottom: 8, left: 4 }}>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.08)" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#525252", fontSize: 12 }}
                dy={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 16000]}
                ticks={[0, 4000, 8000, 12000, 16000]}
                tickFormatter={(v) => `$${v / 1000}k`}
                tick={{ fill: "#525252", fontSize: 12 }}
                width={44}
              />
              <Tooltip
                formatter={(v: number) => `$${v.toLocaleString()}`}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="compare"
                stroke="#9cc0f5"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#1c69e8"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Breakdowns */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-heading-sm text-content-strong">
            Breakdowns
          </h2>
          <div className="ml-auto flex items-center gap-2">
            <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-primary-border bg-info-bg px-3 text-body-md text-primary-text">
              View by: Location
            </button>
            <button className="focus-ring flex h-8 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md text-content-secondary hover:bg-secondary-alpha-hover">
              Group by
              <ChevronDown className="h-3.5 w-3.5 text-content-weak" />
            </button>
            <div className="flex h-8 w-48 items-center gap-2 rounded-control border border-border-secondary bg-surface px-3">
              <Search className="h-4 w-4 flex-shrink-0 text-content-weak" />
              <input
                placeholder="Search..."
                className="w-full bg-transparent text-body-md text-content-secondary outline-none placeholder:text-content-weak"
              />
            </div>
            <IconBtn icon={Download} />
            <IconBtn icon={Columns3} />
          </div>
        </div>
        <BreakdownsTable />
      </section>
    </div>
  );
}
