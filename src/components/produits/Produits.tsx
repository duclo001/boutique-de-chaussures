"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import type { Category } from "@/types/product";

/**
 * Props reçues depuis layout.tsx pour gérer la navigation par état.
 * - setPage : change la page affichée
 * - setSelectedProductId : indique quel produit ouvrir dans ProduitDetail
 */
type ProduitsProps = {
  setPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
};

/** Libellés affichés pour chaque catégorie */
const CATEGORY_LABELS: Record<Category | "tous", string> = {
  tous: "Tous",
  sport: "Sport",
  ville: "Ville",
  casual: "Casual",
  elegant: "Élégant",
};

/**
 * Page Catalogue — affiche tous les produits avec filtre par catégorie.
 * Cliquer sur une carte navigue vers la fiche détail du produit.
 */
export default function Produits({ setPage, setSelectedProductId }: ProduitsProps) {
  // Catégorie sélectionnée pour le filtre ("tous" = pas de filtre)
  const [filtreCategorie, setFiltreCategorie] = useState<Category | "tous">("tous");

  // Produits filtrés selon la catégorie sélectionnée
  const produitsFiltres =
    filtreCategorie === "tous"
      ? products
      : products.filter((p) => p.category === filtreCategorie);

  /**
   * Naviguer vers la fiche détail d'un produit.
   * On mémorise l'id du produit avant de changer de page.
   */
  function ouvrirProduit(id: string) {
    setSelectedProductId(id);
    setPage("produit-detail");
  }

  return (
    <section className="container-app py-12 lg:py-20">

      {/* ── En-tête de la page ── */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
          Notre sélection
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          Catalogue
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-muted)]">
          {produitsFiltres.length} produit{produitsFiltres.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Filtres par catégorie ── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as (Category | "tous")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltreCategorie(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filtreCategorie === cat
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                : "border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* ── Grille de produits ── */}
      {produitsFiltres.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] py-20">
          Aucun produit dans cette catégorie.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {produitsFiltres.map((produit) => (
            /*
             * Carte produit cliquable.
             * On utilise un <button> (pas un <Link>) car la navigation
             * est gérée par useState dans layout.tsx.
             */
            <button
              key={produit.id}
              onClick={() => ouvrirProduit(produit.id)}
              className="group text-left overflow-hidden rounded-2xl bg-white border border-[var(--color-border)] transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              {/* Image du produit */}
              <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bg-alt)]">
                <Image
                  src={produit.images[0]}
                  alt={produit.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Infos produit */}
              <div className="flex flex-col gap-1 p-4">
                <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  {CATEGORY_LABELS[produit.category]}
                </span>
                <h2 className="text-base font-semibold text-[var(--color-text)]">
                  {produit.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                  À partir de {produit.basePrice.toFixed(2)} $
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}