import Image from "next/image";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  /**
   * Action déclenchée au clic — généralement setSelectedProductId + setPage.
   * Toute la navigation passe par useState (modules 1-4), donc cette prop
   * est obligatoire.
   */
  onClick: () => void;
};

/**
 * Carte produit réutilisable (catalogue + section vedette).
 * Rendue comme <button> car la navigation est pilotée par useState
 * (pas de Link Next.js).
 */
export default function ProductCard({ product, onClick }: ProductCardProps) {
  const cover = product.images[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-left transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bg-alt)] p-4">
        <Image
          src={cover}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-[var(--color-text)]">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
          {product.basePrice.toFixed(2)} $
        </p>
      </div>
    </button>
  );
}
