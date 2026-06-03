// Types partagés pour le panier.
// Le panier est géré dans layout.tsx (useState + useEffect) et transmis aux
// composants enfants via props — conformément aux modules 2, 3 et 4 du cours
// (props, useState, useEffect, événements, map). Aucun Context utilisé.

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

// Regroupe les fonctions de manipulation du panier passées en props.
export type CartHandlers = {
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  increaseQuantity: (variantId: string) => void;
  decreaseQuantity: (variantId: string) => void;
  clearCart: () => void;
};
