import { Suspense } from "react";
import Produits from "@/components/produits/Produits";

/**
 * Route `/produits` — catalogue.
 * Produits utilise useSearchParams (lecture de ?categorie=), ce qui impose
 * une frontière <Suspense>.
 */
export default function ProduitsPage() {
  return (
    <Suspense>
      <Produits />
    </Suspense>
  );
}
