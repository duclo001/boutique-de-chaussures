import ProductCard from "@/components/ui/ProductCard";
import Button from "@/components/ui/Button";
import { featuredProducts } from "@/data/products";

/**
 * Section "Produits en vedette" affichée sur la page d'accueil.
 * Consomme `featuredProducts` (produits marqués `featured: true`).
 */
export default function FeaturedProducts() {
  return (
    <section id="vedette" className="container-app py-16 lg:py-24">
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            Sélection du moment
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Nos produits en vedette
          </h2>
        </div>
        <Button href="/produits" variant="outline">
          Voir tout le catalogue
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
