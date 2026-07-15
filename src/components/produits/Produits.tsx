"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import type { Category } from "@/types/product";
import { useTranslation } from "react-i18next";

/** Libellés affichés pour chaque catégorie */
const CATEGORY_KEYS: Record<Category | "tous", string> = {
  tous: "categories.all",
  sport: "categories.sport",
  ville: "categories.ville",
  casual: "categories.casual",
  elegant: "categories.elegant",
};

/** Valide une valeur d'URL contre les catégories connues. */
function categorieValide(valeur: string | null): Category | "tous" {
  return valeur && valeur in CATEGORY_KEYS
    ? (valeur as Category | "tous")
    : "tous";
}

/**
 * Page Catalogue — affiche tous les produits avec filtre par catégorie.
 * La catégorie initiale provient du query param ?categorie=<slug> (useSearchParams).
 * Cliquer sur une carte navigue vers la fiche détail (Link).
 */
export default function Produits() {
  const { t, i18n } = useTranslation("products");

  const locale = i18n.resolvedLanguage?.startsWith("en")
    ? "en-CA"
    : "fr-CA";

  function formatPrice(price: number) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
    }).format(price);
  }
  // Catégorie pré-sélectionnée depuis l'URL (?categorie=sport)
  const categorieInitiale = categorieValide(useSearchParams().get("categorie"));

  // Catégorie sélectionnée pour le filtre (re-filtrage côté client)
  const [filtreCategorie, setFiltreCategorie] =
    useState<Category | "tous">(categorieInitiale);

  // Produits filtrés selon la catégorie sélectionnée
  const produitsFiltres =
    filtreCategorie === "tous"
      ? products
      : products.filter((p) => p.category === filtreCategorie);

  return (
    <section className="container-app py-12 lg:py-20">

      {/* ── En-tête de la page ── */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
          {t("catalog.eyebrow")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
          {t("catalog.title")}
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-muted)]">
          {t("catalog.productCount", {
            count: produitsFiltres.length,
          })}
        </p>
      </div>

      {/* ── Filtres par catégorie ── */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_KEYS) as (Category | "tous")[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltreCategorie(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filtreCategorie === cat
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
          >
            {t(CATEGORY_KEYS[cat])}
          </button>
        ))}
      </div>

      {/* ── Grille de produits ── */}
      {produitsFiltres.length === 0 ? (
        <p className="text-center text-[var(--color-text-muted)] py-20">
          {t("catalog.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {produitsFiltres.map((produit) => {
            // Nom traduit — même clé que la fiche détail, pour que le catalogue
            // et la fiche affichent le MÊME nom. `defaultValue` retombe sur les
            // données (en français) si la langue n'a pas d'entrée pour ce produit.
            const nom = t(`items.${produit.id}.name`, {
              defaultValue: produit.name,
            });

            return (
              /* Carte produit : lien vers la fiche détail (/produits/[id]) */
              <Link
                key={produit.id}
                href={`/produits/${produit.id}`}
                className="group text-left overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                {/* Image du produit */}
                <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bg-alt)] p-4">
                  <Image
                    src={produit.images[0]}
                    alt={nom}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Infos produit */}
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t(CATEGORY_KEYS[produit.category])}
                  </span>
                  <h2 className="text-base font-semibold text-[var(--color-text)]">
                    {nom}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                    {t("catalog.fromPrice", {
                      price: formatPrice(produit.basePrice),
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}