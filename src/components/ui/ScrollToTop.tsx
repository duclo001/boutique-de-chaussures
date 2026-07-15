"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Bouton flottant qui apparaît dès que l'utilisateur a défilé d'au moins 300 px.
 * Au clic, retour fluide en haut de la page.
 */
export default function ScrollToTop() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={t("accessibility.scrollToTop")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-lg transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
