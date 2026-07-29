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
import { InstalledDateProvider } from "@/providers/InstalledDateProvider";
import InstallPrompt from "@/components/InstallPrompt";
import { siteConfig } from "@/config/site";

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
  // Base utilisée pour transformer les chemins relatifs en URL absolues.
  metadataBase: new URL(siteConfig.url),

  // Les pages internes pourront fournir uniquement leur titre spécifique.
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  applicationName: siteConfig.name,

  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "shopping",

  // Informations utilisées lors du partage sur les réseaux sociaux.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },

  // Aperçu utilisé notamment par X/Twitter.
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },

  // Autorise l'indexation générale du site.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const baseUrl = siteConfig.url.replace(/\/$/, "");

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: siteConfig.name,
      url: baseUrl,
      description: siteConfig.description,
      areaServed: siteConfig.country,
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: baseUrl,
      description: siteConfig.description,
      inLanguage: ["fr-CA", "en-CA"],
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },
  ],
};
// Nous n’ajoutons pas de téléphone, d’adresse ou de réseaux sociaux,
//  car ces informations ne sont pas encore définies.
//  Il ne faut pas inventer de données pour Google.

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
        {/* Doit rester en tête du head. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANTI_FLASH }} />

        {/* Identité structurée de la boutique pour les moteurs de recherche. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        {/* Les deux providers englobent toute l'application : Header, pages et
            Footer peuvent lire le thème via useTheme() et les traductions via
            useTranslation(). */}
        <ThemeProvider>
          <I18nProvider>
            {/* InstalledDateProvider : mémorise la date de fermeture de la
                bannière PWA (localStorage) pour ne pas la réafficher avant 24 h. */}
            <InstalledDateProvider>
              <Header />
              {/* Bannière d'installation (PWA) : visible seulement quand le
                  navigateur émet beforeinstallprompt et hors du délai de 24 h. */}
              <InstallPrompt />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </InstalledDateProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
