import type { Metadata } from "next";
import { Corinthia, League_Spartan } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-league-spartan",
  display: "swap",
});

const script = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: "MyCult — Your loyalty, unified",
  description:
    "One wallet for the places you love. Join programmes with a QR, earn at the till, keep rewards in MyCult.",
  applicationName: "MyCult",
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "MyCult",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-LK"
      className={`${leagueSpartan.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-forest">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
