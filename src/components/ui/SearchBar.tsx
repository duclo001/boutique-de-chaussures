"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

/**
 * Barre de recherche simple.
 * Au submit, on navigue vers le catalogue via useRouter (navigation pilotée
 * par une logique → cas d'usage de useRouter, module 5).
 */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useTranslation("header");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) return;

    // Navigation programmatique vers le catalogue, puis on vide le champ
    router.push("/produits");
    setQuery("");
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="hidden w-full max-w-sm md:block"
    >
      <label htmlFor="site-search" className="sr-only">
        {t("search.label")}
      </label>

      <div className="relative">
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("search.placeholder")}
          className="h-10 w-full rounded-full border border-[var(--color-border)] bg-white px-4 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
        />

        <button
          type="submit"
          aria-label={t("search.submit")}
          className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-accent)]"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}