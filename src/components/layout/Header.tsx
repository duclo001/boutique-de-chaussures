"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import { useCart } from "@/context/CartContext";

/**
 * Props reçues depuis layout.tsx.
 * setPage permet de changer la page affichée sans Next.js Router.
 */
type HeaderProps = {
  setPage: (page: string) => void;
};

/** Liens de navigation avec leur identifiant de page */
const NAV_LINKS = [
  { page: "accueil", label: "Accueil" },
  { page: "produits", label: "Catalogue" },
  { page: "panier", label: "Panier" },
] as const;

export default function Header({ setPage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  // Accès au nombre total d'articles dans le panier pour l'afficher sur l'icône du panier
  // le totalItems est utilisé pour afficher un badge avec le nombre d'articles dans le panier sur l'icône du panier dans le header,
  // et pour permettre à Header de se mettre à jour automatiquement lorsque des articles sont ajoutés ou supprimés du panier depuis d'autres composants de l'application, grâce au contexte du panier qui gère l'état global du panier dans l'application
  const { totalItems } = useCart();

  /** Naviguer vers une page et fermer le menu mobile si ouvert */
  function naviguer(page: string) {
    setPage(page);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between gap-6">
        <Logo />
        <SearchBar />

        {/* Navigation desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((lien) => (
            <button
              key={lien.page}
              onClick={() => naviguer(lien.page)}
              className="text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              {lien.label}
            </button>
          ))}
        </nav>

        {/* Icône panier (desktop) 
         // le bouton du panier est affiché sur desktop et mobile, mais le badge avec le nombre d'articles n'est affiché que si totalItems > 0, pour éviter d'afficher un badge "0" lorsque le panier est vide
        // le badge avec le nombre d'articles dans le panier est positionné en absolute par rapport au bouton du panier, pour apparaître en haut à droite de l'icône du panier, et est stylisé pour être petit, 
        //rond, avec un fond coloré et du texte blanc pour être facilement visible*/}

        <button
          onClick={() => naviguer("panier")}
          aria-label="Voir mon panier"
          className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] md:inline-flex"
        >
          <CartIcon />

          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>

        {/* Bouton menu mobile */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          //  {/*className="flex w-full items-center py-3 text-left text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)]" */}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)] md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30"
          />

          <nav
            aria-label="Navigation mobile"
            className="relative flex h-screen w-1/2 flex-col bg-[var(--color-bg)] px-6 py-6 shadow-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Menu
              </span>

              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)]"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((lien) => (
                <li key={lien.page}>
                  <button
                    onClick={() => naviguer(lien.page)}
                    className="flex w-full items-center justify-start rounded-xl px-3 py-3 text-left text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)]"
                  >
                    {lien.label}

                    {lien.page === "panier" && totalItems > 0 && (
                      <span className="ml-2 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-xs font-bold text-white">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ──────────────────────────────────────────────
   Icônes SVG inline — pas de dépendance externe
   ────────────────────────────────────────────── */
function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 12h11l2-8H6.5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
