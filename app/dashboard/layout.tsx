import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WIC2025 Judge Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetBrainsMono.variable} min-h-screen bg-[#09090b] antialiased`}
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {children}
      </body>
    </html>
  );
}

