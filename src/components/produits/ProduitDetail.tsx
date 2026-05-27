"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import type { Variant } from "@/types/product";

/**
 * Props reçues depuis layout.tsx.
 * - id           : identifiant du produit à afficher (peut être null si aucun sélectionné)
 * - setPage      : permet de revenir au catalogue ou d'aller au panier
 */
type ProduitDetailProps = {
  id: string | null;
  setPage: (page: string) => void;
};

/**
 * Page fiche produit.
 *
 * Comportements notés (semaine 3) :
 *  1. Le prix change dynamiquement selon la variante sélectionnée.
 *  2. L'image change dynamiquement selon la variante sélectionnée.
 *  3. Le bouton "Ajouter au panier" est désactivé tant qu'aucune variante n'est choisie.
 */
export default function ProduitDetail({ id, setPage }: ProduitDetailProps) {
  // Variante actuellement sélectionnée par l'utilisateur (null = aucune)
  const [varianteChoisie, setVarianteChoisie] = useState<Variant | null>(null);
const [varianteSurvolee, setVarianteSurvolee] = useState<Variant | null>(null);

  // ── Recherche du produit ──────────────────────────────────────────
  const produit = products.find((p) => p.id === id);
  

  if (!produit) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-[var(--color-text-muted)]">Produit introuvable.</p>
        <button
          onClick={() => setPage("produits")}
          className="mt-6 text-sm font-medium text-[var(--color-accent)] underline"
        >
          ← Retour au catalogue
        </button>
      </div>
    );
  }

  // ── Valeurs dynamiques selon la variante choisie ──────────────────
  // Règle 1 : prix affiché = prix de la variante (ou prix de base si aucune)
  const prixAffiche = varianteChoisie ? varianteChoisie.price : produit.basePrice;

  // Règle 2 : image affichée = image de la variante (ou première image du produit)
 const variantePourImage = varianteSurvolee ?? varianteChoisie;
const imageAffichee = variantePourImage ? variantePourImage.image : produit.images[0];

  // Règle 3 : bouton actif seulement si une variante est sélectionnée
  const peutAjouterAuPanier = varianteChoisie !== null;

  return (
    <div className="container-app py-10 lg:py-16">

      {/* ── Bouton retour ── */}
      <button
        onClick={() => {
          setPage("produits");
          setVarianteChoisie(null); // Réinitialise la sélection au retour
        }}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        <ArrowLeftIcon />
        Retour au catalogue
      </button>

      {/* ── Corps principal : image + infos ── */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

        {/* ── Colonne gauche : image produit ── */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[var(--color-bg-alt)]">
          <Image
            key={imageAffichee} // force le re-render de l'image quand elle change
            src={imageAffichee}
            // Texte alternatif : inclut la couleur et la taille si variante, sinon juste le nom du produit
           alt={
                variantePourImage
                ? `${produit.name} — ${variantePourImage.color}, taille ${variantePourImage.size}`
                : produit.name
}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-opacity duration-300"
          />
        </div>

        {/* ── Colonne droite : informations + sélecteur ── */}
        <div className="flex flex-col gap-6">

          {/* Catégorie + Nom */}
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {produit.category}
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
              {produit.name}
            </h1>
          </div>

          {/* Prix — mis en avant, change selon la variante (Règle 1) */}
          <p className="text-2xl font-semibold text-[var(--color-accent)]">
            {prixAffiche.toFixed(2)} $
            {!varianteChoisie && (
              <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
                (prix de base)
              </span>
            )}
          </p>

          {/* Description */}
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            {produit.description}
          </p>

          <hr className="border-[var(--color-border)]" />

          {/* ── Sélecteur de variantes (Règle 1 + 2) ── */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[var(--color-text)]">
              Choisissez une variante{" "}
              <span className="font-normal text-[var(--color-text-muted)]">
                (couleur · taille)
              </span>
            </p>

            <div className="flex flex-wrap gap-3">
              {produit.variants.map((variante) => {
                const estSelectionnee = varianteChoisie?.id === variante.id;
                const estEpuisee = variante.stock === 0;

                return (
                  <button
                    key={variante.id}
                    onClick={() => {
                      // Si déjà sélectionnée, on désélectionne (toggle)
                      setVarianteChoisie(estSelectionnee ? null : variante);
                    }}
                    // Règle 2 : on change l'image au survol ou focus d'une variante (desktop + clavier)

                    onMouseEnter={() => setVarianteSurvolee(variante)}
                    onMouseLeave={() => setVarianteSurvolee(null)}
                    onFocus={() => setVarianteSurvolee(variante)}
                    onBlur={() => setVarianteSurvolee(null)}
                    disabled={estEpuisee}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                      estEpuisee
                        ? // Variante épuisée : grisée et non cliquable
                          "cursor-not-allowed border-[var(--color-border)] bg-gray-50 text-gray-300 line-through"
                        : estSelectionnee
                        ? // Variante sélectionnée : fond accentué
                          "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-md"
                        : // Variante disponible : bordure simple
                          "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    }`}
                  >
                    {variante.color} · {variante.size}
                    {estEpuisee && " (épuisé)"}
                  </button>
                );
              })}
            </div>

            {/* Message si aucune variante sélectionnée — guide l'utilisateur */}
            {!varianteChoisie && (
              <p className="mt-3 text-xs text-[var(--color-text-muted)]">
                Sélectionnez une variante pour voir le prix exact et ajouter au panier.
              </p>
            )}
          </div>

          {/* ── Bouton Ajouter au panier (Règle 3) ── */}
          <button
            disabled={!peutAjouterAuPanier}
            onClick={() => {
             
            }}
            className={`mt-2 w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all ${
              peutAjouterAuPanier
                ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-md hover:shadow-lg"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
            }`}
          >
            {peutAjouterAuPanier ? "Ajouter au panier" : "Choisissez une variante"}
          </button>

          {/* Stock de la variante sélectionnée */}
          {varianteChoisie && (
            <p className="text-center text-xs text-[var(--color-text-muted)]">
              {varianteChoisie.stock > 1
                ? `${varianteChoisie.stock} exemplaires disponibles`
                : "Dernier exemplaire disponible !"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Icône SVG inline ── */
function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
