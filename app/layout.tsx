import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TerraTrek | Immersive Wilderness Expeditions",
  description:
    "Premium forest trekking and expedition experiences in the heart of India's wildest landscapes. Book your immersive trail journey today.",
  keywords: ["trekking", "expedition", "forest", "wilderness", "India", "trail"],
  openGraph: {
    title: "TerraTrek | Immersive Wilderness Expeditions",
    description:
      "Premium forest trekking and expedition experiences in the heart of India's wildest landscapes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit antialiased">{children}</body>
    </html>
  );
}
