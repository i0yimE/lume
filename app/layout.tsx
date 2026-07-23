import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { PageLoader } from "@/components/layout/PageLoader";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { CompareBar } from "@/components/compare/CompareBar";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LUME — Joyería de diseño",
  description:
    "Piezas de joyería hechas en lotes chicos, con materiales reciclados y trazabilidad real. Anillos, collares, aros y pulseras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bone text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-bone"
        >
          Saltar al contenido
        </a>
        <PageLoader />
        <Header />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <SidebarNav />
        <SearchOverlay />
        <CartDrawer />
        <ChatWidget />
        <CompareBar />
      </body>
    </html>
  );
}
