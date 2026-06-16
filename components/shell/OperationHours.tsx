"use client";

import { useState } from "react";
import {
  ExternalLink,
  ChevronsUpDown,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import Button from "@/components/ui/Button";
import { PageContainer, PageHeader } from "@/components/ui/page-template";
import { asset } from "@/lib/asset";

/* --------------------------------- data -------------------------------- */

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Cell = string | string[];
interface LocationHours {
  location: string;
  hours: Cell[]; // Mon..Sun
}

const STD: Cell[] = [
  "10:00AM - 10:00PM",
  "All day",
  "10:00AM - 10:00PM",
  "10:00AM - 10:00PM",
  "10:00AM - 10:00PM",
  "Closed",
  "Closed",
];
const SPLIT: Cell[] = [
  ["10:00AM - 11:00AM", "04:00PM - 10:00PM"],
  "All day",
  ["10:00AM - 11:00AM", "04:00PM - 10:00PM"],
  ["10:00AM - 11:00AM", "04:00PM - 10:00PM"],
  ["10:00AM - 11:00AM", "04:00PM - 10:00PM"],
  "Closed",
  "Closed",
];

const LOCATIONS: LocationHours[] = [
  { location: "Downtown Delights", hours: SPLIT },
  { location: "Seaside Bistro", hours: STD },
  { location: "Mountainview Grill", hours: STD },
  { location: "Urban Spice", hours: STD },
  { location: "Riverside Café", hours: STD },
  { location: "Sunnyvale Tavern", hours: STD },
  { location: "Crescent Moon Eatery", hours: STD },
  { location: "Lakeside Diner", hours: STD },
  { location: "Cultural Corner", hours: STD },
  { location: "Zen Garden Bistro", hours: STD },
];

const SUMMARY =
  'Most locations are open Monday through Friday from 10:00AM to 10:00PM (with Downtown Delights having a split shift on those days), and all are closed on both Saturday and Sunday. Tuesday stands out as the only day every location lists "All day" availability rather than specific hours.';

/* ------------------------------- pieces -------------------------------- */

function HourCell({ value }: { value: Cell }) {
  if (value === "Closed") {
    return <span className="text-body-md text-content-weak">Closed</span>;
  }
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col">
        {value.map((line) => (
          <span key={line} className="whitespace-nowrap text-body-md text-content-secondary">
            {line}
          </span>
        ))}
      </div>
    );
  }
  return (
    <span className="whitespace-nowrap text-body-md text-content-secondary">
      {value}
    </span>
  );
}

function HoursTable() {
  return (
    <div className="overflow-x-auto border-y border-border-standard">
      <table className="w-full min-w-[1100px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border-standard bg-canvas">
            {["Locations", ...DAYS].map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-2.5 align-top text-body-sm font-semibold text-content-strong"
              >
                <span className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-2">
                  {h}
                  <ChevronsUpDown className="h-3 w-3 text-content-weak" />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {LOCATIONS.map((row) => (
            <tr
              key={row.location}
              className="border-b border-border-standard last:border-b-0 hover:bg-canvas"
            >
              <td className="whitespace-nowrap px-4 py-3 align-top text-body-md font-medium text-content-strong">
                {row.location}
              </td>
              {row.hours.map((c, i) => (
                <td key={i} className="px-4 py-3 align-top">
                  <HourCell value={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- page --------------------------------- */

export default function OperationHours() {
  const { openPanel, closePanel, rightPanel, openOtterEditHours } = useLayout();
  const insightsOpen = rightPanel === "insights";
  const [active, setActive] = useState("Regular hours");

  return (
    <PageContainer
      header={
        <PageHeader
          breadcrumb={[{ label: "Locations" }, { label: "Operation hours" }]}
          title="Operation hours"
          actions={
            <>
              <Button variant="tertiary" size="sm" iconTrailing={ExternalLink}>
                View menu hours
              </Button>
              <button
                onClick={openOtterEditHours}
                className="focus-ring flex h-8 items-center gap-1.5 rounded-control bg-secondary px-3 text-body-md font-medium text-white hover:bg-secondary-hover"
              >
                <img
                  src={asset("/otter-ai.png")}
                  alt=""
                  className="h-4 w-4 invert"
                />
                Edit hours
              </button>
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
            </>
          }
        />
      }
    >
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border-standard">
        {["Regular hours", "Special hours"].map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`focus-ring -mb-px border-b-2 px-3 pb-2.5 pt-1 text-body-md transition-colors ${
                on
                  ? "border-content-primary font-semibold text-content-strong"
                  : "border-transparent text-content-weak hover:text-content-secondary"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {active === "Special hours" ? (
        <div className="flex h-48 items-center justify-center rounded-card border border-dashed border-border-secondary text-body-md text-content-weak">
          Special hours — not built in this prototype yet
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* AI summary banner */}
          <div
            className="flex items-start gap-4 rounded-card border border-border-standard bg-cover bg-top p-4"
            style={{ backgroundImage: `url(${asset("/ai-background.png")})` }}
          >
            <img
              src={asset("/otter-ai.png")}
              alt=""
              className="mt-0.5 h-5 w-5 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-body-md font-semibold text-content-strong">
                Summarized by Otter AI
              </p>
              <p className="mt-0.5 text-body-md leading-relaxed text-content-secondary">
                {SUMMARY}
              </p>
            </div>
            <button
              onClick={() => openPanel("otter")}
              className="focus-ring flex h-8 flex-shrink-0 items-center gap-1.5 rounded-control border border-border-secondary bg-surface px-3 text-body-md font-medium text-content-secondary hover:bg-secondary-alpha-hover"
            >
              Ask Otter AI
            </button>
          </div>

          <HoursTable />
        </div>
      )}
    </PageContainer>
  );
}
