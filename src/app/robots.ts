import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/panier",
        "/api/",
        "/_next/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
// Rôle des règles
// allow: "/" autorise l’exploration du site.
// /panier est exclu, car son contenu est personnel et sans intérêt SEO.
// /api/ exclut les routes techniques.
// /_next/ exclut les ressources internes de Next.js.
// sitemap annoncera le plan du site que nous créerons à l’étape suivante.
// host précise l’adresse principale du site.