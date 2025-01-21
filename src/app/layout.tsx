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
    "React",
    "Next.js",
    "Electron.js",
    "Bengaluru",
    "India",
  ],
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
