"use client";

// import type { Metadata } from "next";
// ↑ Metadata ne peut pas être exporté depuis un composant "use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/components/home/Home";
import Produits from "@/components/produits/Produits";
import ProduitDetail from "@/components/produits/ProduitDetail";
import type { Category } from "@/types/product";
import { CartProvider } from "@/context/CartContext";
import Panier from "@/components/panier/Panier";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children: _children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Page actuellement affichée
  const [page, setPage] = useState("accueil");

  // Id du produit sélectionné — passé à ProduitDetail pour afficher la bonne fiche
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Catégorie pré-sélectionnée — permet à Categories.tsx de filtrer le catalogue
  //cardtsprovider pour éviter de devoir remonter ce state jusqu'à App.tsx et le passer à Categories, 
  // qui est un composant petit-fils de App
  //ajout des cas panier et produit-detail dans le switch de App.tsx pour afficher les composants correspondants,
  // et passage de setSelectedProductId à Home et Produits pour pouvoir mettre à jour ce state depuis ces composants,
  // et passage de setSelectedCategory à Home pour pouvoir mettre à jour ce state depuis Home,
  // et ajout du CartProvider pour fournir le contexte du panier à toute l'application,
  // et ajout du composant Panier pour afficher le panier lorsque la page est "panier"
  // le state selectedCategory est utilisé pour permettre à Home de pré-sélectionner une catégorie lorsqu'on clique sur une catégorie depuis la page d'accueil,
  // et pour permettre à Produits de filtrer le catalogue en fonction de la catégorie sélectionnée depuis la page d'accueil
  // le state selectedProductId est utilisé pour permettre à Home et Produits de mettre à jour l'id du produit sélectionné lorsqu'on clique sur un produit depuis la page d'accueil ou le catalogue,
  // et pour permettre à ProduitDetail d'afficher la fiche du produit correspondant à l'id sélectionné
  const [selectedCategory, setSelectedCategory] = useState<Category | "tous">("tous");

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <CartProvider>
          <Header setPage={setPage} />

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
              />
            ) : page === "panier" ? (
              <Panier setPage={setPage} />
            ) : (
              <Home
                setPage={setPage}
                setSelectedProductId={setSelectedProductId}
                setSelectedCategory={setSelectedCategory}
              />
            )}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
