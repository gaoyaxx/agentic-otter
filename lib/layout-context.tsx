"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Persona } from "./nav-config";
import { pageHasInsights } from "./insights-data";

export type RightPanelKind = "none" | "insights" | "otter" | "setup";

/** Fixed widths (px) derived from the Figma layout system. */
export const NAV_WIDTH_EXPANDED = 233;
export const NAV_WIDTH_COLLAPSED = 64;
export const PANEL_WIDTH_NAV_EXPANDED = 400;
export const PANEL_WIDTH_NAV_COLLAPSED = 450;

interface LayoutState {
  persona: Persona;
  setPersona: (p: Persona) => void;

  /** Persistent rail state (pushes layout). false = icon-only 64px. */
  navExpanded: boolean;
  /** Transient overlay preview while collapsed (hover). Does not push layout. */
  navHover: boolean;
  setNavHover: (v: boolean) => void;

  rightPanel: RightPanelKind;
  activePage: string;
  setActivePage: (id: string) => void;

  /** Top-nav button — persistent expand/collapse (behavior "a"). */
  toggleNav: () => void;
  /** Open a right panel. Auto-collapses the rail unless already pinned open. */
  openPanel: (kind: Exclude<RightPanelKind, "none">) => void;
  closePanel: () => void;

  /** Derived pixel widths for the current state. */
  navWidth: number;
  panelWidth: number;
}

const LayoutContext = createContext<LayoutState | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("enterprise");
  const [navExpanded, setNavExpanded] = useState(true);
  const [navHover, setNavHover] = useState(false);
  const [rightPanel, setRightPanel] = useState<RightPanelKind>("insights");
  const [activePage, setActivePage] = useState("sales");

  const toggleNav = useCallback(() => setNavExpanded((v) => !v), []);

  const openPanel = useCallback((kind: Exclude<RightPanelKind, "none">) => {
    // Otter replaces any other panel; opening any panel auto-collapses the
    // rail to give content room (user can re-expand via the top-nav button).
    setRightPanel(kind);
    setNavExpanded(false);
  }, []);

  const closePanel = useCallback(() => setRightPanel("none"), []);

  // On page change: if the page has insights and nothing is open, default to
  // the insights panel. Keep Otter assistant open if it already is. On a page
  // without insights, close the insights panel (Otter/setup stay).
  useEffect(() => {
    setRightPanel((prev) => {
      if (pageHasInsights(activePage)) return prev === "none" ? "insights" : prev;
      return prev === "insights" ? "none" : prev;
    });
  }, [activePage]);

  const navWidth = navExpanded ? NAV_WIDTH_EXPANDED : NAV_WIDTH_COLLAPSED;
  const panelWidth = navExpanded
    ? PANEL_WIDTH_NAV_EXPANDED
    : PANEL_WIDTH_NAV_COLLAPSED;

  const value = useMemo<LayoutState>(
    () => ({
      persona,
      setPersona,
      navExpanded,
      navHover,
      setNavHover,
      rightPanel,
      activePage,
      setActivePage,
      toggleNav,
      openPanel,
      closePanel,
      navWidth,
      panelWidth,
    }),
    [
      persona,
      navExpanded,
      navHover,
      rightPanel,
      activePage,
      toggleNav,
      openPanel,
      closePanel,
      navWidth,
      panelWidth,
    ],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

export function useLayout(): LayoutState {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}
