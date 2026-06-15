import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Body text — Inter (variable). Self-hosted from /Assets.
const inter = localFont({
  src: [
    {
      path: "../Assets/inter-display/InterVariable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../Assets/inter-display/InterVariable-Italic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Headings / display — Inter Display (static weights).
const interDisplay = localFont({
  src: [
    {
      path: "../Assets/inter-display/ttf/InterDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../Assets/inter-display/ttf/InterDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../Assets/inter-display/ttf/InterDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Otter Console",
  description: "Otter restaurant SaaS console prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${inter.variable} ${interDisplay.variable}`}>
      <body className="h-full font-sans">{children}</body>
    </html>
  );
}
