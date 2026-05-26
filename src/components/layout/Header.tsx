"use client";

import { useState } from "react";
import Logo from "@/components/ui/Logo";

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
  { page: "panier",   label: "Panier" },
] as const;

export default function Header({ setPage }: HeaderProps) {
  const [open, setOpen] = useState(false);

  /** Naviguer vers une page et fermer le menu mobile si ouvert */
  function naviguer(page: string) {
    setPage(page);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between">
        {/* Logo — clic ramène à l'accueil */}
        <button onClick={() => naviguer("accueil")} className="focus:outline-none">
          <Logo />
        </button>

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

        {/* Icône panier (desktop) */}
        <button
          onClick={() => naviguer("panier")}
          aria-label="Voir mon panier"
          className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] md:inline-flex"
        >
          <CartIcon />
        </button>

        {/* Bouton menu mobile */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <nav
          aria-label="Navigation mobile"
          className="border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
        >
          <ul className="container-app flex flex-col py-2">
            {NAV_LINKS.map((lien) => (
              <li key={lien.page}>
                <button
                  onClick={() => naviguer(lien.page)}
                  className="block w-full text-left py-3 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)]"
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
