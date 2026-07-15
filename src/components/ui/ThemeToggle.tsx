"use client";

import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

// Case à cocher qui bascule entre le mode clair et le mode sombre.
// - `checked` vaut true uniquement lorsque le thème est "dark" ;
// - cocher ou décocher la case appelle `toggleTheme()` du ThemeContext.
// L'input reste un vrai <input type="checkbox"> (accessible au clavier) ;
// il est simplement masqué visuellement et habillé en interrupteur.
export default function ThemeToggle() {
  const { t } = useTranslation("common");
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      className="inline-flex cursor-pointer items-center gap-2"
      title={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
    >
      {/* Libellé lu par les lecteurs d'écran */}
      <span className="sr-only">{t("theme.enableDarkMode")}</span>

      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="peer sr-only"
      />

      {/* Piste de l'interrupteur : se colore en accent lorsque la case est cochée.
          Le rond (::after) glisse vers la droite en mode sombre. */}
      <span
        aria-hidden="true"
        className="relative h-6 w-11 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-[var(--color-surface)] after:shadow after:transition-transform peer-checked:bg-[var(--color-accent)] peer-checked:after:translate-x-[20px] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)]/40"
      />

      {/* Icône indiquant le thème actuellement actif */}
      <span aria-hidden="true" className="text-[var(--color-text-muted)]">
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </span>
    </label>
  );
}

/* ──────────────────────────────────────────────
   Icônes SVG inline — pas de dépendance externe
   ────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
    </svg>
  );
}
