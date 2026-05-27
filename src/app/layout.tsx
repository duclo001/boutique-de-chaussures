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
  const [selectedCategory, setSelectedCategory] = useState<Category | "tous">("tous");

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">

        {/* Header reçoit setPage pour gérer la navigation */}
        <Header setPage={setPage} />

        <main className="flex-1">
          {page === "accueil" ? (
            <Home setPage={setPage} setSelectedProductId={setSelectedProductId} setSelectedCategory={setSelectedCategory} />
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
          ) : (
            /* Fallback : retour à l'accueil si page inconnue */
            <Home setPage={setPage} setSelectedProductId={setSelectedProductId} setSelectedCategory={setSelectedCategory} />
          )}
        </main>

        <Footer />
      </body>
    </html>
  );
}
