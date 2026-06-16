"use client";

import { Menu, Maximize2, Minus, ArrowRight, ArrowUp, Plus, Mic } from "lucide-react";
import { useLayout } from "@/lib/layout-context";
import { asset } from "@/lib/asset";

interface Suggestion {
  label: string;
  icon: string; // path to colored icon tile in /public
  beta?: boolean;
}

const SUGGESTIONS: Suggestion[] = [
  { label: "Chat with data", icon: "/sg-chat-with-data.png", beta: true },
  { label: "Pause/unpause my storefront", icon: "/sg-pause-unpause.png" },
  { label: "86 an item on my menu", icon: "/sg-86-item.png" },
  { label: "I'm having a hardware issue", icon: "/sg-hardware.png" },
];

function SuggestionCard({ s }: { s: Suggestion }) {
  return (
    <button className="focus-ring group flex w-full items-center gap-3 rounded-card border border-border-standard bg-surface px-3 py-3 text-left transition-colors hover:bg-canvas">
      <img src={asset(s.icon)} alt="" className="h-8 w-8 flex-shrink-0" />
      <span className="flex-1 text-body-md font-medium text-content-strong">
        {s.label}
      </span>
      {s.beta && (
        <span className="rounded-pill bg-info-bg px-2 py-0.5 text-body-sm font-semibold text-info">
          Beta
        </span>
      )}
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-content-weak" />
    </button>
  );
}

/**
 * Otter Assistant landing — matches Figma node 1:41572.
 * Light, container-style surface with greeting, suggestion cards, and input.
 */
const EDIT_HOURS_PROMPTS = [
  "Set [location] operation hours to Monday–Friday, 11am–10pm",
  "Set [brand] happy hour menu from 4–6pm weekdays for all locations",
  "Stop Ubereats online orders 30 minutes before closing for [location]",
  "Apply Saturday 10am–11pm hours to all [brand] California locations",
];

function EditHoursIntro() {
  return (
    <div className="py-6 text-body-md leading-relaxed text-content-secondary">
      <p className="font-semibold text-content-strong">Edit hours</p>
      <p className="mt-3">Here&apos;s what you can configure with my help:</p>
      <p className="mt-2">
        <span className="font-semibold text-content-strong">Operation hours</span>{" "}
        — When your restaurant is open. This is your master schedule.
      </p>
      <p className="mt-2">
        <span className="font-semibold text-content-strong">Menu hours</span> —
        Which menus are available and when. Breakfast, lunch, happy hour — each on
        its own schedule. If needed, you can customize hours for specific platforms
        like DoorDash or UberEats.
      </p>
      <p className="mt-3">
        If you manage multiple locations or brands, I&apos;ll make sure you&apos;re
        always clear on what&apos;s being changed and where before anything is
        applied.
      </p>
      <p className="mt-3">Select one to get started or describe your requirement:</p>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {EDIT_HOURS_PROMPTS.map((p) => (
          <li key={p}>
            <button className="focus-ring rounded text-left font-semibold text-content-strong underline decoration-from-font underline-offset-2 hover:text-content-secondary">
              {p}
            </button>
          </li>
        ))}
      </ul>
      <img src={asset("/otter-ai.png")} alt="" className="mt-5 h-8 w-8" />
    </div>
  );
}

export default function OtterAssistant() {
  const { closePanel, otterTopic } = useLayout();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-page bg-surface shadow-elevation-low">
      {/* Header (solid — background texture starts below it) */}
      <div className="relative flex h-16 flex-shrink-0 items-center gap-2 border-b border-border-standard px-4">
        <button
          aria-label="Menu"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-control text-content-secondary hover:bg-secondary-alpha-hover"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="flex-1 font-display text-heading-sm text-content-strong">
          Otter Assistant
        </span>
        <button
          aria-label="Expand"
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-control border border-border-secondary text-content-secondary hover:bg-secondary-alpha-hover"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <button
          onClick={closePanel}
          aria-label="Minimize"
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-control border border-border-secondary text-content-secondary hover:bg-secondary-alpha-hover"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Texture region — fills below the header only, clipped inside the
          panel so it never covers the header or the panel stroke. */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <img
          src={asset("/ai-background.png")}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Body */}
        <div className="relative flex-1 overflow-y-auto px-4">
          {otterTopic === "edit-hours" ? (
            <EditHoursIntro />
          ) : (
            <>
              <div className="flex flex-col items-center pt-12">
                <img src={asset("/otter-ai.png")} alt="" className="h-12 w-12" />
                <h2 className="mt-5 max-w-[280px] text-center font-serif text-[26px] leading-[32px] text-content-strong">
                  Good morning, Olivia. How can I help you today?
                </h2>
              </div>
              <div className="mt-7 flex flex-col gap-3">
                {SUGGESTIONS.map((s) => (
                  <SuggestionCard key={s.label} s={s} />
                ))}
              </div>
            </>
          )}
        </div>

      {/* Input */}
      <div className="relative flex-shrink-0 px-4 pb-4 pt-2">
        <div className="rounded-card border border-border-secondary bg-surface px-3 py-2.5">
          <input
            placeholder="Message Otter Assistant"
            className="w-full bg-transparent text-body-md text-content-strong outline-none placeholder:text-content-weak"
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              aria-label="Add"
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-control text-content-secondary hover:bg-secondary-alpha-hover"
            >
              <Plus className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1">
              <button
                aria-label="Voice"
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-control text-content-secondary hover:bg-secondary-alpha-hover"
              >
                <Mic className="h-5 w-5" />
              </button>
              <button
                aria-label="Send"
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-control bg-secondary text-white hover:bg-secondary-hover"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-body-sm text-content-weak">
          Please be aware that AI may make errors.
        </p>
      </div>
      </div>
    </div>
  );
}
