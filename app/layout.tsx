import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Portfolio",
    "Nathan Brodin",
    "Software Engineer",
    "Web Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Developer",
    "Frontend Engineer",
  ],
  authors: [
    {
      name: "Nathan Brodin",
      url: "https://brodin.dev",
    },
  ],
  creator: "Nathan Brodin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[inter.variable, calSans.variable].join(" ")}
      suppressHydrationWarning
    >
      <body
        className={`bg-black text-white ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
