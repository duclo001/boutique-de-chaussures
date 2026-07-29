import { Suspense } from "react";
import Produits from "@/components/produits/Produits";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";




const description =
  "Explorez notre catalogue de chaussures de sport, de ville, décontractées et élégantes, avec plusieurs modèles, coloris et pointures.";

// Pourquoi répéter Open Graph ici
// Les objets imbriqués de métadonnées sont remplacés lors de la fusion Next.js. Nous redéfinissons donc l’objet openGraph complet pour que l’URL partagée soit :
// /produits
// et non l’URL / héritée du layout.
// Les paramètres de filtrage comme :
// /produits?categorie=sport
// utiliseront le même canonical :
// /produits
// Cela évite que Google considère chaque filtre comme une page dupliquée.
  export const metadata: Metadata = {
  title: "Catalogue",
  description,

  alternates: {
    canonical: "/produits",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/produits",
    siteName: siteConfig.name,
    title: `Catalogue | ${siteConfig.name}`,
    description,
  },

  twitter: {
    card: "summary_large_image",
    title: `Catalogue | ${siteConfig.name}`,
    description,
  },
};
/**
 * Route `/produits` — catalogue.
 * Produits utilise useSearchParams (lecture de ?categorie=), ce qui impose
 * une frontière <Suspense>.
 */
export default function ProduitsPage() {
  return (
    <Suspense>
      <Produits />
    </Suspense>
  );
}
