import type { Config } from "tailwindcss";

/**
 * Design tokens mapped 1:1 from the Otter Figma library
 * (variable defs pulled via Figma MCP get_variable_defs).
 * Prefer these semantic tokens over raw Tailwind palette classes.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand (not part of the interactive system — accent only)
        beet: { DEFAULT: "#E4337D", 500: "#E4337D" },

        // Static text — ONLY two colors (+ inverse for dark surfaces)
        content: {
          primary: "#141414", // Static/Text/Strong
          strong: "#141414",
          secondary: "#141414", // alias kept for existing usages
          weak: "#525252", // Static/Text/Weak
          "inverse-strong": "#ffffff",
          "inverse-weak": "#a3a3a3",
        },

        // Backgrounds / surfaces
        ink: "#141414",
        surface: "#ffffff", // Static/Background/Surface
        canvas: "#f5f5f5", // Static/Background/Background
        "bg-inverse": "#1a1a1a", // Static/Background/Inverse
        "ash-dark": "#ECECEC",
        scrim: "rgba(0,0,0,0.2)", // Static/Background/Scrim

        // Borders
        border: {
          standard: "rgba(0,0,0,0.12)", // Static/Border/Standard
          secondary: "#cccccc", // Interactive/Border/Secondary/Enabled
          "secondary-hover": "#a3a3a3",
          outline: "#d6d6d6",
          overlay: "rgba(0,0,0,0.06)", // Static/Border/Overlay
          focus: "#141414", // Static/Border/Focus/Outer
        },

        // Interactive — Primary (blue)
        primary: {
          DEFAULT: "#1c69e8", // Interactive/Background/Primary/Enabled
          hover: "#1258d2",
          pressed: "#0e49b4",
          text: "#1c69e8", // Interactive/Text/Primary (links)
          "text-hover": "#1258d2",
          border: "#bfd8fa",
        },
        // Interactive — Secondary (dark)
        secondary: {
          DEFAULT: "#141414", // Interactive/Background/Secondary/Enabled
          hover: "#292929",
          pressed: "#454749",
        },
        // Interactive — Danger
        danger: {
          DEFAULT: "#da252f", // Interactive/Background/Danger/Enabled
          hover: "#c5232b",
          pressed: "#aa1e24",
        },
        // Disabled fill (shared)
        "disabled-fill": "rgba(0,0,0,0.10)",
        // Active nav (Interactive/Background/Primary/Alpha/Elevated)
        "active-blue": "rgba(28,105,232,0.08)",
        "secondary-alpha-hover": "rgba(0,0,0,0.06)", // ghost/tertiary hover

        // Sentiment (DEFAULT = text color, .strong = elevated fill, .bg = subtle)
        positive: {
          DEFAULT: "#2a7e3d",
          strong: "#46b760",
          bg: "rgba(70,183,96,0.12)",
          border: "#39a652",
        },
        negative: {
          DEFAULT: "#c5232b", // Sentiment/Text/Negative
          strong: "#da252f",
          bg: "rgba(218,37,47,0.08)",
          border: "#c5232b",
        },
        info: {
          DEFAULT: "#1258d2",
          strong: "#1c69e8",
          bg: "rgba(28,105,232,0.10)",
          border: "#1258d2",
        },
        notice: {
          DEFAULT: "#86691e",
          strong: "#e4b430",
          bg: "rgba(228,180,48,0.16)",
          border: "#e4b430",
        },
        neutral: {
          DEFAULT: "#3d3d3d",
          strong: "#1a1a1a",
          bg: "rgba(26,26,26,0.08)",
          border: "#3d3d3d",
        },

        "icon-secondary": "#949494",
      },
      borderRadius: {
        control: "8px", // Corner Radius/Control
        card: "16px", // Component/Card/Corner Radius
        tile: "16px",
        page: "24px", // Component/Page Container/Corner Radius
        "thumb-xs": "6px",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: [
          "var(--font-inter-display)",
          "var(--font-inter)",
          '"Inter"',
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        // Full type ramp from Figma typography library (node 4:2854).
        // Display + Heading = Inter Display SemiBold; Body = Inter.
        // [size, { lineHeight, letterSpacing, fontWeight }]
        "display-lg": [
          "72px",
          { lineHeight: "74px", letterSpacing: "-1.296px", fontWeight: "600" },
        ],
        "display-md": [
          "56px",
          { lineHeight: "58px", letterSpacing: "-0.912px", fontWeight: "600" },
        ],
        "display-sm": [
          "48px",
          { lineHeight: "50px", letterSpacing: "-0.672px", fontWeight: "600" },
        ],
        "heading-lg": [
          "34px",
          { lineHeight: "36px", letterSpacing: "-0.476px", fontWeight: "600" },
        ],
        "heading-md": [
          "26px",
          { lineHeight: "28px", letterSpacing: "-0.312px", fontWeight: "600" },
        ],
        "heading-sm": [
          "20px",
          { lineHeight: "24px", letterSpacing: "-0.2px", fontWeight: "600" },
        ],
        "body-lg": ["16px", { lineHeight: "22px", letterSpacing: "-0.0288px" }],
        "body-md": ["14px", { lineHeight: "18px", letterSpacing: "-0.0126px" }],
        "body-sm": ["12px", { lineHeight: "14px", letterSpacing: "0.12px" }],
        // Nav label (Label/Bold/Small) — Inter Medium 14/16
        "label-sm": [
          "14px",
          { lineHeight: "16px", letterSpacing: "-0.09px", fontWeight: "500" },
        ],
      },
      boxShadow: {
        // Elevation/Low
        "elevation-low":
          "0 2px 8px 0 rgba(0,0,0,0.06), 0 2px 2px 0 rgba(0,0,0,0.05), 0 1px 1px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)",
        // Elevation/Medium
        "elevation-medium":
          "0 1px 0 0 rgba(0,0,0,0.06), 0 8px 24px 0 rgba(0,0,0,0.08), 0 4px 4px 0 rgba(0,0,0,0.06), 0 2px 2px 0 rgba(0,0,0,0.04), 0 1px 1px 0 rgba(0,0,0,0.02), 0 0 0 1px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
