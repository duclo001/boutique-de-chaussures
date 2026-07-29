/// <reference lib="webworker" />
// La directive ci-dessus charge les types du Web Worker (ServiceWorkerGlobalScope,
// self, etc.) pour CE fichier uniquement, sans toucher au tsconfig global (DOM).

// Service worker généré par Serwist.
// Ce fichier n'est PAS un composant : il est compilé par Serwist (voir
// next.config.ts) puis servi à la racine du site sous /sw.js.
//
// Rôle : mettre en cache les ressources de l'application (precache) et
// intercepter les navigations, ce qui rend l'app installable et lui donne
// un fonctionnement partiel hors ligne.

import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// Serwist injecte la liste des fichiers à précacher dans self.__SW_MANIFEST.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true, // active immédiatement la nouvelle version du SW
  clientsClaim: true, // prend le contrôle des onglets ouverts sans rechargement
  navigationPreload: true, // accélère les navigations
  runtimeCaching: defaultCache, // stratégies de cache par défaut de Serwist
});

serwist.addEventListeners();
