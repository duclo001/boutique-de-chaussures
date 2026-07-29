import Home from "@/components/home/Home";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  // "absolute" évite l'application du modèle "%s | Boutique de Chaussures".
  title: {
    absolute: `${siteConfig.name} | Sport, ville et élégance`,
  },

  description: siteConfig.description,

  // Indique l'adresse officielle de cette page aux moteurs de recherche.
  alternates: {
    canonical: "/",
  },
};
/** Route `/` — page d'accueil. */
export default function Page() {
  return <Home />;
}
