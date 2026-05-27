"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    window.location.href = `/produits?recherche=${encodeURIComponent(trimmedQuery)}`;
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="hidden w-full max-w-sm md:block"
    >
      <label htmlFor="site-search" className="sr-only">
        Rechercher une chaussure
      </label>

      <div className="relative">
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une chaussure..."
          className="h-10 w-full rounded-full border border-[var(--color-border)] bg-white px-4 pr-10 text-sm text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)]"
        />

        <button
          type="submit"
          aria-label="Lancer la recherche"
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