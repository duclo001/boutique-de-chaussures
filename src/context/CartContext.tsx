"use client";
// fonctionnalités de gestion du panier : ajouter, supprimer, augmenter/diminuer quantité, calcul total

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
// type pour les éléments du panier avec les propriétés nécessaires pour afficher et gérer le panier 
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
// type pour la valeur du contexte du panier, incluant les éléments du panier et les fonctions pour les gérer

type CartContextValue = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (variantId: string) => void;
    increaseQuantity: (variantId: string) => void;
    decreaseQuantity: (variantId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
};
// création du contexte du panier avec une valeur initiale nulle, qui sera fournie par le CartProvider


const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "boutique-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    //   const [items, setItems] = useState<CartItem[]>([]);

    //   useEffect(() => {
    //     const savedCart = localStorage.getItem(STORAGE_KEY);

    //     if (savedCart) {
    //       setItems(JSON.parse(savedCart));
    //     }
    //   }, []);

    //   useEffect(() => {
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    //   }, [items]);
    //------------------------------------------------
    // initialisation du panier à partir du localStorage pour persister le panier entre les sessions de l'utilisateur, 
    // et sauvegarde du panier dans le localStorage à chaque modification du panier, pour garantir que les modifications sont persistées
    // typeof window === "undefined" est utilisé pour vérifier que le code s'exécute côté client avant d'accéder à localStorage,
    // pour éviter des erreurs lors du rendu côté serveur où localStorage n'est pas défini
    
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        try {
            const savedCart = window.localStorage.getItem(STORAGE_KEY);

            if (!savedCart) {
                return [];
            }

            return JSON.parse(savedCart) as CartItem[];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addItem(item: CartItem) {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (cartItem) => cartItem.variantId === item.variantId
            );

            if (existingItem) {
                return currentItems.map((cartItem) =>
                    cartItem.variantId === item.variantId
                        ? {
                            ...cartItem,
                            quantity: Math.min(cartItem.quantity + 1, cartItem.stock),
                        }
                        : cartItem
                );
            }

            return [...currentItems, item];
        });
    }

    function removeItem(variantId: string) {
        setItems((currentItems) =>
            currentItems.filter((item) => item.variantId !== variantId)
        );
    }

    function increaseQuantity(variantId: string) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.variantId === variantId
                    ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                    : item
            )
        );
    }

    function decreaseQuantity(variantId: string) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.variantId === variantId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = useMemo(() => {
        return items.reduce((total, item) => total + item.quantity, 0);
    }, [items]);

    const totalPrice = useMemo(() => {
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart doit être utilisé dans CartProvider");
    }

    return context;
}