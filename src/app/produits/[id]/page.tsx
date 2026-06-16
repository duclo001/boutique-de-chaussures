import ProduitDetail from "@/components/produits/ProduitDetail";

/**
 * Route `/produits/[id]` — fiche détail d'un produit.
 * En Next 16, `params` est asynchrone.
 */
export default async function ProduitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProduitDetail id={id} />;
}
