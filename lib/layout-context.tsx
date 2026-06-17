"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Persona, Version } from "./nav-config";
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

  /** A/B prototype version. */
  version: Version;
  switchVersion: (v: Version) => void;

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

  /** Otter assistant topic — null = default landing, else a guided flow. */
  otterTopic: string | null;
  /** Open Otter assistant straight into the Edit hours conversation. */
  openOtterEditHours: () => void;

  /** Derived pixel widths for the current state. */
  navWidth: number;
  panelWidth: number;

  /** Brand menus active tab (lifted so flows can switch it). */
  menuTab: string;
  setMenuTab: (t: string) => void;

  /* Generate-descriptions flow */
  generateModalOpen: boolean;
  openGenerateModal: () => void;
  closeGenerateModal: () => void;
  /** True once descriptions have been applied (hides the insight card). */
  descriptionsApplied: boolean;
  /** Apply: close modal, go to Brand menus → Menu items, toast, hide card. */
  applyDescriptions: () => void;

  /** Transient toast message (auto-dismisses). */
  toast: string | null;
}

const LayoutContext = createContext<LayoutState | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("enterprise");
  const [version, setVersion] = useState<Version>("A");
  const [navExpanded, setNavExpanded] = useState(true);
  const [navHover, setNavHover] = useState(false);
  const [rightPanel, setRightPanel] = useState<RightPanelKind>("insights");
  const [activePage, setActivePage] = useState("sales");
  const [menuTab, setMenuTab] = useState("Menus");
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [descriptionsApplied, setDescriptionsApplied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const openGenerateModal = useCallback(() => setGenerateModalOpen(true), []);
  const closeGenerateModal = useCallback(() => setGenerateModalOpen(false), []);

  const applyDescriptions = useCallback(() => {
    setDescriptionsApplied(true);
    setGenerateModalOpen(false);
    setMenuTab("Menu items");
    setActivePage("brand-menus");
    showToast("Successfully updated descriptions for 18 items.");
  }, [showToast]);

  const toggleNav = useCallback(() => setNavExpanded((v) => !v), []);

  const [otterTopic, setOtterTopic] = useState<string | null>(null);

  const openPanel = useCallback((kind: Exclude<RightPanelKind, "none">) => {
    // Otter replaces any other panel; opening any panel auto-collapses the
    // rail to give content room (user can re-expand via the top-nav button).
    setRightPanel(kind);
    setNavExpanded(false);
    if (kind === "otter") setOtterTopic(null); // default landing
  }, []);

  const openOtterEditHours = useCallback(() => {
    setRightPanel("otter");
    setNavExpanded(false);
    setOtterTopic("edit-hours");
  }, []);

  const closePanel = useCallback(() => setRightPanel("none"), []);

  const switchVersion = useCallback((v: Version) => {
    setVersion(v);
    setActivePage("sales"); // valid in both versions
  }, []);

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
      version,
      switchVersion,
      navExpanded,
      navHover,
      setNavHover,
      rightPanel,
      activePage,
      setActivePage,
      toggleNav,
      openPanel,
      closePanel,
      otterTopic,
      openOtterEditHours,
      navWidth,
      panelWidth,
      menuTab,
      setMenuTab,
      generateModalOpen,
      openGenerateModal,
      closeGenerateModal,
      descriptionsApplied,
      applyDescriptions,
      toast,
    }),
    [
      persona,
      version,
      switchVersion,
      navExpanded,
      navHover,
      rightPanel,
      activePage,
      toggleNav,
      openPanel,
      closePanel,
      otterTopic,
      openOtterEditHours,
      navWidth,
      panelWidth,
      menuTab,
      generateModalOpen,
      openGenerateModal,
      closeGenerateModal,
      descriptionsApplied,
      applyDescriptions,
      toast,
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
