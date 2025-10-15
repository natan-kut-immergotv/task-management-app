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
  title: "TaskFlow - Collaborative Task Manager",
  description: "A modern task management application with drag & drop, real-time collaboration, and beautiful UI. Built with Next.js 14 and TypeScript.",
  keywords: ["task management", "collaboration", "productivity", "kanban", "project management"],
  authors: [{ name: "Natan Kutnowski" }],
  creator: "Natan Kutnowski",
  openGraph: {
    title: "TaskFlow - Collaborative Task Manager",
    description: "A modern task management application with drag & drop, real-time collaboration, and beautiful UI.",
    url: "https://taskflow-demo.vercel.app",
    siteName: "TaskFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow - Task Management App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Collaborative Task Manager",
    description: "A modern task management application with drag & drop, real-time collaboration, and beautiful UI.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
