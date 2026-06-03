"use client";

// Layout racine : contient l'état global de l'application.
// Conformément aux notes de cours (modules 2-3-4), on utilise uniquement :
//   - useState pour l'état (page, produit sélectionné, catégorie, panier)
//   - useEffect pour la persistance du panier dans le localStorage
//   - props pour transmettre l'état et les setters aux composants enfants
// Aucun Context API, aucun useRef.

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/components/home/Home";
import Produits from "@/components/produits/Produits";
import ProduitDetail from "@/components/produits/ProduitDetail";
import Panier from "@/components/panier/Panier";
import ScrollToTop from "@/components/ui/ScrollToTop";
import type { Category } from "@/types/product";
import type { CartItem } from "@/types/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const STORAGE_KEY = "boutique-cart";

export default function RootLayout({
  children: _children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ── Navigation interne (pas de routeur Next) ───────────────────────
  const [page, setPage] = useState("accueil");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | "tous">("tous");

  // ── Panier : état remonté ici, transmis en props aux enfants ───────
  const [items, setItems] = useState<CartItem[]>([]);

  // Chargement initial depuis le localStorage (1 seul effet au montage)
  useEffect(() => {
    try {
      const sauvegarde = window.localStorage.getItem(STORAGE_KEY);
      if (sauvegarde) {
        setItems(JSON.parse(sauvegarde) as CartItem[]);
      }
    } catch {
      // localStorage indisponible ou contenu invalide : on ignore
    }
  }, []);

  // Sauvegarde à chaque modification du panier
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // ── Handlers du panier ─────────────────────────────────────────────
  function addItem(nouveau: CartItem) {
    setItems((courants) => {
      const existant = courants.find((it) => it.variantId === nouveau.variantId);
      if (existant) {
        return courants.map((it) =>
          it.variantId === nouveau.variantId
            ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
            : it
        );
      }
      return [...courants, nouveau];
    });
  }

  function removeItem(variantId: string) {
    setItems((courants) => courants.filter((it) => it.variantId !== variantId));
  }

  function increaseQuantity(variantId: string) {
    setItems((courants) =>
      courants.map((it) =>
        it.variantId === variantId
          ? { ...it, quantity: Math.min(it.quantity + 1, it.stock) }
          : it
      )
    );
  }

  function decreaseQuantity(variantId: string) {
    setItems((courants) =>
      courants
        .map((it) =>
          it.variantId === variantId ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  // Totaux dérivés (calcul direct à chaque rendu — pas besoin de useMemo)
  const totalItems = items.reduce((t, it) => t + it.quantity, 0);
  const totalPrice = items.reduce((t, it) => t + it.price * it.quantity, 0);

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <Header setPage={setPage} totalItems={totalItems} />

        <main className="flex-1">
          {page === "accueil" ? (
            <Home
              setPage={setPage}
              setSelectedProductId={setSelectedProductId}
              setSelectedCategory={setSelectedCategory}
            />
          ) : page === "produits" ? (
            <Produits
              setPage={setPage}
              setSelectedProductId={setSelectedProductId}
              categorieInitiale={selectedCategory}
            />
          ) : page === "produit-detail" ? (
            <ProduitDetail
              id={selectedProductId}
              setPage={setPage}
              addItem={addItem}
            />
          ) : page === "panier" ? (
            <Panier
              setPage={setPage}
              items={items}
              removeItem={removeItem}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCart={clearCart}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
          ) : (
            <Home
              setPage={setPage}
              setSelectedProductId={setSelectedProductId}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </main>

        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
