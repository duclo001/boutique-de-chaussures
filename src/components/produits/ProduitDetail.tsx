"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import * as cartStore from "@/lib/cartStore";

/**
 * Props reçues depuis la route /produits/[id].
 * - id : identifiant du produit à afficher (segment dynamique de l'URL)
 */
type ProduitDetailProps = {
  id: string;
};

/**
 * Page fiche produit (style Amazon : choix coloris puis pointure).
 *  1. Le prix change dynamiquement selon la variante sélectionnée.
 *  2. L'image change dynamiquement selon le coloris (survol ou sélection).
 *  3. Le bouton "Ajouter au panier" est désactivé tant qu'aucune variante n'est choisie.
 */
export default function ProduitDetail({ id }: ProduitDetailProps) {
  const router = useRouter();

  // Sélection en deux étapes : coloris puis pointure
  const [coloris, setColoris] = useState<string | null>(null);
  const [pointure, setPointure] = useState<number | null>(null);
  // Coloris survolé pour aperçu image au survol
  const [colorisSurvole, setColorisSurvole] = useState<string | null>(null);

  // ── Recherche du produit ──────────────────────────────────────────
  const produit = products.find((p) => p.id === id);

  if (!produit) {
    return (
      <div className="container-app py-20 text-center">
        <p className="text-[var(--color-text-muted)]">Produit introuvable.</p>
        <Link
          href="/produits"
          className="mt-6 inline-block text-sm font-medium text-[var(--color-accent)] underline"
        >
          ← Retour au catalogue
        </Link>
      </div>
    );
  }

  // ── Dérivations à partir des variantes ────────────────────────────
  // Liste unique des coloris (ordre d'apparition conservé)
  const colorisDisponibles = Array.from(
    new Map(produit.variants.map((v) => [v.color, v.image])).entries()
  ).map(([color, image]) => ({ color, image }));

  // Pointures proposées pour le coloris sélectionné
  const pointuresPourColoris = coloris
    ? produit.variants.filter((v) => v.color === coloris)
    : [];

  // Variante finale (coloris + pointure)
  const varianteChoisie =
    coloris && pointure !== null
      ? produit.variants.find(
          (v) => v.color === coloris && v.size === pointure
        ) ?? null
      : null;

  // ── Image affichée : priorité survol > coloris choisi > première image
  const colorisPourImage = colorisSurvole ?? coloris;
  const imageAffichee =
    (colorisPourImage &&
      colorisDisponibles.find((c) => c.color === colorisPourImage)?.image) ||
    produit.images[0];

  // ── Prix dynamique ────────────────────────────────────────────────
  const prixAffiche = varianteChoisie
    ? varianteChoisie.price
    : coloris
      ? pointuresPourColoris[0]?.price ?? produit.basePrice
      : produit.basePrice;

  const peutAjouterAuPanier = varianteChoisie !== null && varianteChoisie.stock > 0;

  return (
    <div className="container-app py-10 lg:py-16">

      {/* ── Lien retour ── */}
      <Link
        href="/produits"
        className="mb-8 flex w-fit items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
      >
        <ArrowLeftIcon />
        Retour au catalogue
      </Link>

      {/* ── Corps principal : image + infos ── */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

        {/* ── Colonne gauche : image produit ── */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[var(--color-bg-alt)] p-6">
          <Image
            key={imageAffichee}
            src={imageAffichee}
            alt={
              coloris
                ? `${produit.name} — coloris ${coloris}`
                : produit.name
            }
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain transition-opacity duration-300"
          />
        </div>

        {/* ── Colonne droite : informations + sélecteurs ── */}
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

          {/* Prix */}
          <p className="text-2xl font-semibold text-[var(--color-accent)]">
            {prixAffiche.toFixed(2)} $
            {!varianteChoisie && (
              <span className="ml-2 text-sm font-normal text-[var(--color-text-muted)]">
                {coloris ? "(à partir de)" : "(prix indicatif)"}
              </span>
            )}
          </p>

          {/* Description */}
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            {produit.description}
          </p>

          <hr className="border-[var(--color-border)]" />

          {/* ── Sélecteur de coloris ── */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[var(--color-text)]">
              Coloris{" "}
              {coloris && (
                <span className="font-normal text-[var(--color-text-muted)]">
                  : {coloris}
                </span>
              )}
            </p>

            <div className="flex flex-wrap gap-3">
              {colorisDisponibles.map(({ color, image }) => {
                const estSelectionne = coloris === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setColoris(color);
                      setPointure(null);
                    }}
                    onMouseEnter={() => setColorisSurvole(color)}
                    onMouseLeave={() => setColorisSurvole(null)}
                    onFocus={() => setColorisSurvole(color)}
                    onBlur={() => setColorisSurvole(null)}
                    aria-label={`Choisir le coloris ${color}`}
                    aria-pressed={estSelectionne}
                    className={`group flex items-center gap-2 rounded-xl border p-1.5 pr-3 text-sm font-medium transition-all ${
                      estSelectionne
                        ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30"
                        : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    <span className="relative h-10 w-10 overflow-hidden rounded-lg bg-[var(--color-bg-alt)] p-1">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </span>
                    <span className="text-[var(--color-text)]">{color}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Sélecteur de pointure ── */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[var(--color-text)]">
              Pointure
              {pointure !== null && (
                <span className="font-normal text-[var(--color-text-muted)]">
                  {" "}: {pointure}
                </span>
              )}
            </p>

            {coloris ? (
              <div className="flex flex-wrap gap-2">
                {pointuresPourColoris.map((v) => {
                  const estSelectionnee = pointure === v.size;
                  const estEpuisee = v.stock === 0;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setPointure(v.size)}
                      disabled={estEpuisee}
                      aria-pressed={estSelectionnee}
                      className={`min-w-[3.5rem] rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                        estEpuisee
                          ? "cursor-not-allowed border-[var(--color-border)] bg-gray-50 text-gray-300 line-through"
                          : estSelectionnee
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-md"
                            : "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      {v.size}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs italic text-[var(--color-text-muted)]">
                Choisissez d&apos;abord un coloris pour voir les pointures disponibles.
              </p>
            )}
          </div>

          {/* ── Bouton Ajouter au panier ── */}
          <button
            type="button"
            disabled={!peutAjouterAuPanier}
            onClick={() => {
              if (!varianteChoisie) return;
              cartStore.ajouter({
                productId: produit.id,
                variantId: varianteChoisie.id,
                name: produit.name,
                color: varianteChoisie.color,
                size: varianteChoisie.size,
                price: varianteChoisie.price,
                image: varianteChoisie.image,
                quantity: 1,
                stock: varianteChoisie.stock,
              });

              // Navigation programmatique vers le panier après l'ajout
              router.push("/panier");
            }}
            className={`mt-2 w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all ${peutAjouterAuPanier
                ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] shadow-md hover:shadow-lg"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
          >
            {peutAjouterAuPanier
              ? "Ajouter au panier"
              : !coloris
                ? "Choisissez un coloris"
                : pointure === null
                  ? "Choisissez une pointure"
                  : "Article indisponible"}
          </button>

          {/* Indication de stock — uniquement si stock bas (≤ 3) */}
          {varianteChoisie && varianteChoisie.stock > 0 && varianteChoisie.stock <= 3 && (
            <p className="text-center text-xs font-medium text-amber-700">
              {varianteChoisie.stock === 1
                ? "Plus qu'un exemplaire en stock — commandez vite !"
                : `Plus que ${varianteChoisie.stock} exemplaires en stock`}
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
