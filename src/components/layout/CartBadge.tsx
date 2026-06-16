"use client";

import { useSyncExternalStore } from "react";
import * as cartStore from "@/lib/cartStore";

/**
 * Badge du nombre d'articles dans le panier.
 *
 * S'abonne au panier via useSyncExternalStore : il se re-rend automatiquement
 * à chaque changement (ajout, retrait, vidage…), même déclenché depuis une
 * autre page. Le hook gère aussi l'hydratation (snapshot serveur = panier
 * vide), donc aucun mismatch — sans useEffect ni Context.
 */
export default function CartBadge() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const totalItems = cartStore.compterArticles(items);

  if (totalItems <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-xs font-bold text-white">
      {totalItems}
    </span>
  );
}
