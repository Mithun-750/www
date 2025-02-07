import BackgroundPattern from "@/components/BackgroundPattern";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import ChatBotWrapper from "@/components/ChatBotWrapper";

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
    title: "Mithun U | Application Developer",
    description:
      "Hi, I'm Mithun U, a passionate Application Developer based in Bangalore, India. I specialize in building exceptional digital experiences.",
    url: "https://mithun.dev",
    siteName: "Mithun U | Application Developer",
    images: [
      {
        url: "https://mithun.dev/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithun U | Application Developer",
    description:
      "Hi, I'm Mithun U, a passionate Application Developer based in Bangalore, India. I specialize in building exceptional digital experiences.",
    creator: "@Mithun750",
    images: ["https://mithun.dev/og.png"],
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
        {/* <ChatBotWrapper /> */}
      </body>
    </html>
  );
}
