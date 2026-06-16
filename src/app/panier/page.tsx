"use client";

import dynamic from "next/dynamic";

// Le panier lit son contenu depuis le localStorage : on le rend uniquement
// côté client (ssr: false) pour éviter tout mismatch d'hydratation au
// rechargement de la page. Même approche que le badge du Header.
const Panier = dynamic(() => import("@/components/panier/Panier"), {
  ssr: false,
});

/** Route `/panier` — panier d'achat. */
export default function PanierPage() {
  return <Panier />;
}
