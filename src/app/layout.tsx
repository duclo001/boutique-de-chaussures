// Layout racine : structure partagée par toutes les routes (App Router).
// Header et Footer persistent d'une page à l'autre ; le contenu de chaque
// route est injecté via `children`. Le panier est géré par le module
// `src/lib/cartStore.ts` (localStorage), lu directement par les pages.
// Le thème (clair / sombre) est fourni à toute l'app par le ThemeProvider,
// et les traductions (FR / EN) par le I18nProvider.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
// La clé vient d'un module neutre (sans "use client") : un composant serveur
// n'obtiendrait qu'une référence client s'il l'importait du ThemeContext.
import { THEME_STORAGE_KEY } from "@/lib/theme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import I18nProvider from "@/providers/I18nProvider";

/**
 * Script exécuté AVANT le premier affichage de la page (il est placé dans le
 * <head>, donc le navigateur le joue avant de peindre quoi que ce soit).
 *
 * Pourquoi ? Le thème est stocké dans le localStorage, qui n'existe pas côté
 * serveur : le HTML envoyé est donc toujours en mode clair. Sans ce script,
 * un visiteur en mode sombre verrait la page s'afficher en BLANC pendant un
 * instant avant que React ne la repeigne en sombre — un flash désagréable.
 *
 * Le script pose `data-theme` sur <html> immédiatement, ce qui laisse le CSS
 * appliquer les bonnes couleurs dès la toute première image affichée.
 */
const SCRIPT_ANTI_FLASH = `
(function () {
  try {
    var sauvegarde = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefereSombre = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme =
      sauvegarde === "dark" || sauvegarde === "light"
        ? sauvegarde
        : prefereSombre
          ? "dark"
          : "light";
  } catch (e) {}
})();
`;

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
      // Le script ci-dessous ajoute `data-theme` sur <html> avant l'hydratation.
      // React comparerait alors le HTML du serveur (sans l'attribut) à celui du
      // navigateur (avec) et signalerait une différence : on la neutralise ici,
      // car cette différence est voulue.
      suppressHydrationWarning
    >
      <head>
        {/* Doit rester en tête du <head> : il s'exécute avant le premier rendu. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANTI_FLASH }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Les deux providers englobent toute l'application : Header, pages et
            Footer peuvent lire le thème via useTheme() et les traductions via
            useTranslation(). */}
        <ThemeProvider>
          <I18nProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
