const siteUrl = (
  process.env.SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "Boutique de Chaussures",
  shortName: "Boutique Chaussures",
  description:
    "Découvrez notre sélection de chaussures de sport, de ville, décontractées et élégantes pour tous les styles.",
  url: siteUrl,
  language: "fr",
  locale: "fr_CA",
  country: "CA",
  currency: "CAD",
} as const;

// Cette configuration évitera de répéter le nom, l’URL et la description dans plusieurs fichiers.
// Après le déploiement, il suffira de remplacer la variable dans l’environnement de l’hébergeur :
// SITE_URL=https://www.exemple.com