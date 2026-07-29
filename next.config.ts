import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// Serwist génère et injecte le service worker (successeur de Workbox / next-pwa).
// - swSrc  : le code source du service worker (compilé par Serwist)
// - swDest : le fichier généré, servi à la racine du site (/sw.js)
// Le service worker ne s'active pleinement qu'en build/production.
const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withSerwist(nextConfig);
