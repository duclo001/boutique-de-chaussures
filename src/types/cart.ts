// Types partagés pour le panier.
// Le panier est persisté dans le localStorage via le module `src/lib/cartStore.ts`
// (fonctions pures, sans Context ni useEffect). Chaque page qui affiche le panier
// le lit directement avec un useState local (lecture au montage).

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  color: string;
  size: number;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};
