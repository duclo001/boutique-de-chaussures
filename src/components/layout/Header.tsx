"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";

/**
 * Props reçues depuis layout.tsx.
 * - setPage     : permet de changer la page affichée (pas de routeur Next).
 * - totalItems  : nombre total d'articles dans le panier (pour le badge).
 */
type HeaderProps = {
  setPage: (page: string) => void;
  totalItems: number;
};

/** Liens de navigation avec leur identifiant de page */
const NAV_LINKS = [
  { page: "accueil", label: "Accueil" },
  { page: "produits", label: "Catalogue" },
  { page: "panier", label: "Panier" },
] as const;

export default function Header({ setPage, totalItems }: HeaderProps) {
  const [open, setOpen] = useState(false);

  // Ferme le menu mobile lorsqu'on appuie sur Échap.
  // (useEffect = module 4 ; aucun useRef nécessaire.)
  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  /** Naviguer vers une page, fermer le menu mobile et remonter en haut */
  function naviguer(page: string) {
    setPage(page);
    setOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
              type="button"
              onClick={() => naviguer(lien.page)}
              className="cursor-pointer text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
            >
              {lien.label}
            </button>
          ))}
        </nav>

        {/* Icône panier (desktop). Le badge n'apparaît que si totalItems > 0. */}
        <button
          type="button"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] md:hidden cursor-pointer transition-colors hover:bg-[var(--color-bg-alt)]"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Overlay cliquable derrière le menu mobile : ferme le menu au clic
          extérieur SANS recourir à useRef. Le menu est positionné au-dessus
          (z-40) et l'overlay juste en-dessous (z-30), sous le header. */}
      {open && (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 z-30 cursor-default bg-black/20 md:hidden"
        />
      )}

      {/* Menu mobile déroulant */}
      {open && (
        <nav
          aria-label="Navigation mobile"
          className="relative z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
        >
          <ul className="container-app flex flex-col py-2">
            {NAV_LINKS.map((lien) => (
              <li key={lien.page}>
                <button
                  type="button"
                  onClick={() => naviguer(lien.page)}
                  className="block w-full cursor-pointer py-3 text-left text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {lien.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
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
