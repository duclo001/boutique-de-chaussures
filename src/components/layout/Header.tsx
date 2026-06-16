"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import navItems from "@/utils/navItems.json";
import * as cartStore from "@/lib/cartStore";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Badge panier : lu au montage depuis le localStorage (pas de useEffect).
  // Reflète l'état au chargement de la page (le Header vit dans le layout).
  const [totalItems] = useState(() =>
    cartStore.compterArticles(cartStore.lire())
  );

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

  // Ferme le menu mobile lorsqu'on clique en dehors (sans useRef)
  useEffect(() => {
    if (!open) return;

    function handleOutsidePointer(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      // si le clic n'est ni dans le menu mobile ni sur le bouton toggle, fermer
      if (!target.closest('#mobile-menu') && !target.closest('#menu-toggle')) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointer);
    return () => document.removeEventListener('pointerdown', handleOutsidePointer);
  }, [open]);

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
          {navItems.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              aria-current={pathname === lien.href ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${
                pathname === lien.href
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text)]"
              }`}
            >
              {lien.label}
            </Link>
          ))}
        </nav>

        {/* Icône panier (desktop). Le badge n'apparaît que si totalItems > 0. */}
        <Link
          href="/panier"
          aria-label="Voir mon panier"
          className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-alt)] md:inline-flex"
        >
          <CartIcon />

          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Bouton menu mobile */}
        <button
          id="menu-toggle"
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
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="relative z-40 border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
        >
          <ul className="container-app flex flex-col py-2">
            {navItems.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === lien.href ? "page" : undefined}
                  className="block w-full py-3 text-left text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {lien.label}
                </Link>
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
