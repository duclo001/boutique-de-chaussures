"use client";

import * as cartStore from "@/lib/cartStore";

/**
 * Badge du nombre d'articles dans le panier.
 *
 * Lit le compte depuis le localStorage (via cartStore) au montage. Ce composant
 * est volontairement chargé SANS rendu serveur (next/dynamic { ssr: false }
 * dans le Header) : comme le localStorage n'existe pas côté serveur, le rendre
 * uniquement côté client évite tout mismatch d'hydratation — sans useEffect,
 * sans Context.
 *
 * Le compte reflète l'état au chargement de la page (le Header vit dans le
 * layout et ne se remonte pas entre deux navigations).
 */
export default function CartBadge() {
  const totalItems = cartStore.compterArticles(cartStore.lire());

  if (totalItems <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-xs font-bold text-white">
      {totalItems}
    </span>
  );
}
