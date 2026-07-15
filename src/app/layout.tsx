// Layout racine : structure partagée par toutes les routes (App Router).
// Header et Footer persistent d'une page à l'autre ; le contenu de chaque
// route est injecté via `children`. Le panier est géré par le module
// `src/lib/cartStore.ts` (localStorage), lu directement par les pages.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import I18nProvider from "@/providers/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boutique de Chaussures",
  description:
    "Boutique de chaussures — sport, ville, casual et élégant. Trouvez la paire qui vous ressemble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
    <I18nProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </I18nProvider>
  </body> 
    </html>
  );
}
