import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title:
    "WIC2025 - World Investment Competition | Global Student Investment Challenge",
  description:
    "Compete with top student investors worldwide in the Investment Olympics. Manage a $100,000 virtual portfolio using Interactive Brokers and TradingView. Win $15,000 in prizes and a trip to Japan. Registration open now.",
  keywords: [
    "investment competition",
    "student investing",
    "virtual trading",
    "WIC2025",
    "World Investment Competition",
    "finance competition",
    "stock trading competition",
    "university investment",
    "JPSI",
    "Japan Students Investment Union",
  ],
  authors: [{ name: "Japan Students Investment Union (JPSI)" }],
  openGraph: {
    title: "WIC2025 - World Investment Competition",
    description:
      "Join the Investment Olympics. Compete with students from leading universities across 8 countries. Win $15,000 in prizes and a trip to Japan.",
    url: "https://jpsi-official.jp",
    siteName: "WIC2025 - World Investment Competition",
    images: [
      {
        url: "https://jpsi-official.jp/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "World Investment Competition 2025 - The Investment Olympics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WIC2025 - World Investment Competition",
    description:
      "Join the Investment Olympics. Compete globally, win $15,000 in prizes and a trip to Japan.",
    images: ["https://jpsi-official.jp/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://jpsi-official.jp"),
  alternates: {
    canonical: "https://jpsi-official.jp",
  },
  verification: {
    google: "BG2JjrV8EOdhjV6-PChkknUsgZKyR1A9qL2-cowAngM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
