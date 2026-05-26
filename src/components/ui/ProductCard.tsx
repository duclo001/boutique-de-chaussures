import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  /**
   * Si fourni, la carte devient un <button> avec cet onClick.
   * Utile pour la navigation par useState (pas de Link Next.js).
   * Si absent, la carte reste un <Link> vers `/produits/[id]`.
   */
  onClick?: () => void;
};

/**
 * Carte produit réutilisable (catalogue + section vedette).
 * Affiche : image, catégorie, nom, prix de base.
 */
export default function ProductCard({ product, onClick }: ProductCardProps) {
  const cover = product.images[0];

  const content = (
    <>
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-bg-alt)]">
        <Image
          src={cover}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
    </>
  );

  const cardClasses =
    "group block overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-shadow hover:shadow-lg text-left w-full";

  // Navigation par état : on rend un <button>
  if (onClick) {
    return (
      <button onClick={onClick} className={cardClasses}>
        {content}
      </button>
    );
  }

  // Navigation Next.js classique : on rend un <Link>
  return (
    <Link href={`/produits/${product.id}`} className={cardClasses}>
      {content}
    </Link>
  );
}
