import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { JsonLd, organizationLd } from "@/lib/jsonld";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { DropAlert } from "@/components/DropAlert";
import { Motion } from "@/components/Motion";

// Big Shoulders at opsz 72 = the Display cut.
const display = Big_Shoulders({ subsets: ["latin"], axes: ["opsz"], variable: "--font-display", display: "swap", adjustFontFallback: false });
const body = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "GRIM: Streetwear Caps Worn by Rappers | wear your shadow",
    template: "%s | GRIM",
  },
  description: SITE.description,
  applicationName: "GRIM",
  keywords: ["streetwear caps", "trap caps", "snakeskin cap", "Romanian streetwear brand", "caps worn by rappers", "trucker cap", "GRIM"],
  openGraph: {
    type: "website",
    siteName: "GRIM",
    locale: "en_US",
    images: [{ url: "/og/grim-og.jpg", width: 1200, height: 630, alt: "GRIM snakeskin caps on black" }],
  },
  twitter: { card: "summary_large_image", images: ["/og/grim-og.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0A0A0A", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal-on-scroll can hide content safely. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <JsonLd data={organizationLd()} />
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <DropAlert />
          <Motion />
        </CartProvider>
      </body>
    </html>
  );
}
