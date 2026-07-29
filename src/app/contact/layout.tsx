import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

const description =
  "Contactez notre service client pour obtenir de l'aide sur une commande, une pointure, un produit, un retour ou un échange.";

export const metadata: Metadata = {
  title: "Contact",
  description,

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/contact",
    siteName: siteConfig.name,
    title: `Contact | ${siteConfig.name}`,
    description,
  },

  twitter: {
    card: "summary_large_image",
    title: `Contact | ${siteConfig.name}`,
    description,
  },
};

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({
  children,
}: ContactLayoutProps) {
  return children;
}
//Pourquoi utiliser un layout
// La structure devient :
// contact/
// ├── layout.tsx  ← composant serveur avec les métadonnées
// └── page.tsx    ← composant client avec useTranslation
// Le layout ne crée aucun élément HTML supplémentaire. Il retourne directement :
// return children;