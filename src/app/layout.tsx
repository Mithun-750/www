import BackgroundPattern from "@/components/BackgroundPattern";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mithun U | Application Developer",
  description:
    "A passionate Application developer from Bengaluru, India. Experienced in React, Next.js, and Electron.js",
  keywords: [
    "Mithun U",
    "Application Developer",
    "Web3 Developer",
    "Splitwise Web3",
    "3D Classroom Simulator",
    "React",
    "Next.js",
    "Electron.js",
    "Blockchain",
    "Full Stack Developer",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: "Mithun U" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://mithun-portfolio.vercel.app",
    title: "Mithun U | Web3 & Full Stack Developer",
    description:
      "Explore innovative projects including Splitwise Web3, 3D Classroom Simulator, and full-stack applications. Expertise in blockchain, React, and Next.js development.",
    siteName: "Mithun U Portfolio",
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
  verification: {
    google:
      "google-site-verification=GfrczrDd0TdPx9PZuXl2Bc9ZEXDfGEuPI1Ljat9cpg4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary-deep text-primary selection:bg-primary selection:text-secondary-deep`}
      >
        <BackgroundPattern />
        {children}
      </body>
    </html>
  );
}
