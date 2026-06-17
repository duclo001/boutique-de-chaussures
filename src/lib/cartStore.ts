// Module de gestion du panier (sans React, sans Context, sans useEffect).
//
// Le panier est persisté dans le localStorage. Ce module expose :
//  - des mutations PURES (ajouter, retirer, …) qui réécrivent le localStorage ;
//  - une API d'abonnement (subscribe / getSnapshot / getServerSnapshot) destinée
//    au hook React `useSyncExternalStore`, pour que tout composant abonné se
//    re-rende automatiquement quand le panier change (badge live, etc.).
//
// La lecture est protégée contre le rendu serveur (typeof window).

import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "boutique-cart";

// Référence stable renvoyée côté serveur et tant que le panier est vide.
// (useSyncExternalStore compare les snapshots avec Object.is : il faut donc
//  une référence constante pour éviter une boucle de rendu infinie.)
const PANIER_VIDE: CartItem[] = [];

/** Lit le panier directement depuis le localStorage (vide côté serveur). */
function lireLocalStorage(): CartItem[] {
  if (typeof window === "undefined") return PANIER_VIDE;
  try {
    const sauvegarde = window.localStorage.getItem(STORAGE_KEY);
    return sauvegarde ? (JSON.parse(sauvegarde) as CartItem[]) : PANIER_VIDE;
  } catch {
    return PANIER_VIDE;
  }
}

// ── Cache + abonnés ────────────────────────────────────────────────
// `cache` est la source lue par getSnapshot. Sa référence ne change QUE
// lorsqu'on mute le panier → les composants ne se re-rendent qu'au besoin.
let cache: CartItem[] = lireLocalStorage();
const abonnes = new Set<() => void>();

function notifier() {
  for (const ecouteur of abonnes) ecouteur();
}

/** Écrit le panier (cache + localStorage) et notifie les abonnés. */
function ecrire(items: CartItem[]): CartItem[] {
  cache = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore (localStorage indisponible)
  }
  notifier();
  return items;
}

// ── API pour useSyncExternalStore ──────────────────────────────────

/** Abonne un composant aux changements du panier (et aux autres onglets). */
export function subscribe(callback: () => void): () => void {
  abonnes.add(callback);

  // Synchronisation entre onglets : on recharge le cache si le localStorage
  // change ailleurs, puis on prévient l'abonné.
  function onStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      cache = lireLocalStorage();
      callback();
    }
  }
  window.addEventListener("storage", onStorage);

  return () => {
    abonnes.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

/** Snapshot courant (côté client). Référence stable entre deux mutations. */
export function getSnapshot(): CartItem[] {
  return cache;
}

/** Snapshot côté serveur : panier vide (localStorage indisponible). */
export function getServerSnapshot(): CartItem[] {
  return PANIER_VIDE;
}

// ── Mutations ───────────────────────────────────────────────────────

/** Ajoute une variante au panier (incrémente la quantité si déjà présente). */
export function ajouter(nouveau: CartItem): CartItem[] {
  const existant = cache.find((it) => it.variantId === nouveau.variantId);

  if (existant) {
    return ecrire(
      cache.map((it) =>
        it.variantId === nouveau.variantId
          ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
          : it
      )
    );
  }

  return ecrire([...cache, nouveau]);
}

/** Retire entièrement une variante du panier. */
export function retirer(variantId: string): CartItem[] {
  return ecrire(cache.filter((it) => it.variantId !== variantId));
}

/** Augmente la quantité d'une variante (plafonnée au stock). */
export function augmenter(variantId: string): CartItem[] {
  return ecrire(
    cache.map((it) =>
      it.variantId === variantId
        ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
        : it
    )
  );
}

/** Diminue la quantité d'une variante (la retire si elle tombe à 0). */
export function diminuer(variantId: string): CartItem[] {
  return ecrire(
    cache
      .map((it) =>
        it.variantId === variantId ? { ...it, quantity: it.quantity - 1 } : it
      )
      .filter((it) => it.quantity > 0)
  );
}

/** Vide complètement le panier. */
export function vider(): CartItem[] {
  return ecrire(PANIER_VIDE);
}

// ── Helpers dérivés ─────────────────────────────────────────────────

/** Nombre total d'articles (somme des quantités). */
export function compterArticles(items: CartItem[]): number {
  return items.reduce((total, it) => total + it.quantity, 0);
}

/** Prix total du panier. */
export function prixTotal(items: CartItem[]): number {
  return items.reduce((total, it) => total + it.price * it.quantity, 0);
}
