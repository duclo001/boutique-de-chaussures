// Module de gestion du panier (sans React, sans Context, sans useEffect).
//
// Le panier est persisté dans le localStorage. Ce module n'expose que des
// fonctions PURES et synchrones : chaque mutation lit l'état courant, calcule
// le nouveau tableau, le réécrit dans le localStorage et le RETOURNE pour que
// le composant appelant mette à jour son propre useState local.
//
// La lecture est protégée contre le rendu serveur (typeof window).

import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "boutique-cart";

/** Lit le panier depuis le localStorage (tableau vide côté serveur). */
export function lire(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const sauvegarde = window.localStorage.getItem(STORAGE_KEY);
    return sauvegarde ? (JSON.parse(sauvegarde) as CartItem[]) : [];
  } catch {
    // localStorage indisponible ou contenu invalide : panier vide
    return [];
  }
}

/** Écrit le panier dans le localStorage et le retourne. */
function ecrire(items: CartItem[]): CartItem[] {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore (localStorage indisponible)
  }
  return items;
}

/** Ajoute une variante au panier (incrémente la quantité si déjà présente). */
export function ajouter(nouveau: CartItem): CartItem[] {
  const courants = lire();
  const existant = courants.find((it) => it.variantId === nouveau.variantId);

  if (existant) {
    return ecrire(
      courants.map((it) =>
        it.variantId === nouveau.variantId
          ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
          : it
      )
    );
  }

  return ecrire([...courants, nouveau]);
}

/** Retire entièrement une variante du panier. */
export function retirer(variantId: string): CartItem[] {
  return ecrire(lire().filter((it) => it.variantId !== variantId));
}

/** Augmente la quantité d'une variante (plafonnée au stock). */
export function augmenter(variantId: string): CartItem[] {
  return ecrire(
    lire().map((it) =>
      it.variantId === variantId
        ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
        : it
    )
  );
}

/** Diminue la quantité d'une variante (la retire si elle tombe à 0). */
export function diminuer(variantId: string): CartItem[] {
  return ecrire(
    lire()
      .map((it) =>
        it.variantId === variantId ? { ...it, quantity: it.quantity - 1 } : it
      )
      .filter((it) => it.quantity > 0)
  );
}

/** Vide complètement le panier. */
export function vider(): CartItem[] {
  return ecrire([]);
}

/** Nombre total d'articles (somme des quantités). */
export function compterArticles(items: CartItem[]): number {
  return items.reduce((total, it) => total + it.quantity, 0);
}

/** Prix total du panier. */
export function prixTotal(items: CartItem[]): number {
  return items.reduce((total, it) => total + it.price * it.quantity, 0);
}
