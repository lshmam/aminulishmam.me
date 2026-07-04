import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sfPro = localFont({
  src: "../public/SF-Pro.ttf",
  variable: "--font-sf-pro",
  display: "swap",
});

const tiempos = localFont({
  src: [
    {
      path: "../public/TiemposHeadline-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/TiemposHeadline-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-tiempos",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aminul Islam Ishmam — Designer & Founder",
  description: "Portfolio of Aminul Islam, a 0 to 1 founder and product designer.",
  icons: {
    icon: "/aminul-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${sfPro.variable} ${tiempos.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

