"use client";

import { useEffect, useRef, useState } from "react";
import { PanelRightOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { useLayout, type RightPanelKind } from "@/lib/layout-context";
import Button from "@/components/ui/Button";
import OtterAssistant from "./OtterAssistant";
import { insightsForPage, type Severity } from "@/lib/insights-data";
import { asset } from "@/lib/asset";
import {
  PageContainer,
  PageHeader,
  Section,
  Card,
  useAutoHideScrollbar,
} from "@/components/ui/page-template";

const SEVERITY_TAG: Record<Severity, { label: string; cls: string } | null> = {
  risk: { label: "Risk", cls: "bg-notice-bg text-notice" },
  opportunity: { label: "Opportunity", cls: "bg-info-bg text-info" },
  info: null,
};

const SETUP_TASKS = [
  { label: "Connect your POS", done: true },
  { label: "Import your menu", done: true },
  { label: "Set up delivery channels", done: false },
  { label: "Invite your team", done: false },
  { label: "Configure tax rules", done: false },
];

/** White rounded container that floats on the grey canvas (like the page). */
function PanelSurface({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-page bg-surface shadow-elevation-low">
      {children}
    </div>
  );
}

/* ------------------------------ AI insights ----------------------------- */

function InsightsPanel() {
  const { closePanel, activePage, openGenerateModal, descriptionsApplied } =
    useLayout();
  const insights = insightsForPage(activePage).filter(
    (ins) =>
      !(descriptionsApplied && ins.action === "Generate all descriptions"),
  );
  const scrollRef = useAutoHideScrollbar();
  return (
    <PanelSurface>
      <div ref={scrollRef} className="scrollbar-autohide h-full overflow-y-auto p-5">
        <PageContainer
          variant="panel"
          header={
            <PageHeader
              titleSize="sm"
              title="Otter AI insights"
              description="Boost your business with AI power"
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  icon={PanelRightOpen}
                  onClick={closePanel}
                  aria-label="Close panel"
                />
              }
            />
          }
        >
          <Section>
            <div className="flex flex-col gap-3">
              {insights.map((ins, i) => {
                const tag = SEVERITY_TAG[ins.severity];
                return (
                <Card
                  key={i}
                  className="bg-cover bg-top"
                  style={{
                    backgroundImage: `url(${asset("/ai-background.png")})`,
                  }}
                  bodyClassName="p-5"
                >
                  <div className="flex gap-2">
                    <img
                      src={asset("/otter-ai.png")}
                      alt=""
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                    />
                    {/* Content column — title, body and CTA share this left edge */}
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <h3 className="flex-1 text-body-md font-semibold text-content-strong">
                          {ins.title}
                        </h3>
                        {tag && (
                          <span
                            className={`flex-shrink-0 rounded-[4px] px-2 py-0.5 text-body-sm font-semibold ${tag.cls}`}
                          >
                            {tag.label}
                          </span>
                        )}
                      </div>
                      <p className="text-body-md leading-relaxed text-content-weak">
                        {ins.body}
                      </p>
                      <div className="pt-1">
                        <Button
                          variant="tertiary"
                          size="sm"
                          iconTrailing={ArrowRight}
                          onClick={
                            ins.action === "Generate all descriptions"
                              ? openGenerateModal
                              : undefined
                          }
                        >
                          {ins.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
                );
              })}
            </div>
          </Section>
        </PageContainer>
      </div>
    </PanelSurface>
  );
}

/* ------------------------------ Setup guide ----------------------------- */

function SetupPanel() {
  const { closePanel } = useLayout();
  const done = SETUP_TASKS.filter((t) => t.done).length;
  const scrollRef = useAutoHideScrollbar();
  return (
    <PanelSurface>
      <div ref={scrollRef} className="scrollbar-autohide h-full overflow-y-auto p-5">
        <PageContainer
          variant="panel"
          header={
            <PageHeader
              titleSize="sm"
              title="Setup guide"
              description={`${done} of ${SETUP_TASKS.length} steps complete — finish setup to go live.`}
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  icon={PanelRightOpen}
                  onClick={closePanel}
                  aria-label="Close panel"
                />
              }
            />
          }
        >
          <Section>
            <div className="flex flex-col gap-2">
              {SETUP_TASKS.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-3 rounded-card border border-border-standard px-4 py-3"
                >
                  <CheckCircle2
                    className={`h-5 w-5 flex-shrink-0 ${
                      t.done ? "text-positive-strong" : "text-border-secondary"
                    }`}
                  />
                  <span
                    className={`text-body-md ${
                      t.done
                        ? "text-content-weak line-through"
                        : "font-medium text-content-secondary"
                    }`}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </PageContainer>
      </div>
    </PanelSurface>
  );
}

/* -------------------------------- panel --------------------------------- */

const EXIT_MS = 280;

export default function RightPanel() {
  const { rightPanel, panelWidth } = useLayout();

  // Delayed-unmount state machine so the exit animation can play.
  const [shown, setShown] = useState<RightPanelKind>(rightPanel);
  const [active, setActive] = useState(rightPanel !== "none");
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (rightPanel !== "none") {
      if (exitTimer.current) clearTimeout(exitTimer.current);
      setShown(rightPanel);
      // Mount in the exit pose, then flip to active on the next frame so the
      // transition runs (double rAF guarantees a paint in between).
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setActive(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    // Closing: play exit, then unmount.
    setActive(false);
    exitTimer.current = setTimeout(() => setShown("none"), EXIT_MS);
    return () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [rightPanel]);

  if (shown === "none") return null;

  // Exit pose: both panels slide out to the right.
  const pose = active
    ? "translate-x-0 opacity-100"
    : "translate-x-[105%] opacity-100";

  return (
    <aside
      className="flex-shrink-0 bg-canvas py-4 pl-1 pr-4"
      style={{ width: panelWidth }}
    >
      <div
        className={`h-full will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${pose}`}
      >
        {shown === "insights" && <InsightsPanel />}
        {shown === "setup" && <SetupPanel />}
        {shown === "otter" && <OtterAssistant />}
      </div>
    </aside>
  );
}
