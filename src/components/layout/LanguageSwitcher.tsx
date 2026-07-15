"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation(["common", "header"]);

  // Normalise les variantes comme fr-CA ou en-CA.
  const currentLanguage = i18n.resolvedLanguage?.startsWith("en")
    ? "en"
    : "fr";

  function handleLanguageChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    void i18n.changeLanguage(event.target.value);
  }

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">
        {t("header:accessibility.selectLanguage")}
      </span>

      <select
        value={currentLanguage}
        onChange={handleLanguageChange}
        aria-label={t("header:accessibility.selectLanguage")}
        className="h-10 cursor-pointer rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm font-medium text-[var(--color-text)] outline-none transition-colors hover:bg-[var(--color-bg-alt)] focus:border-[var(--color-accent)]"
      >
        <option value="fr">{t("common:languages.fr")}</option>
        <option value="en">{t("common:languages.en")}</option>
      </select>
    </label>
  );
}
// i18n.changeLanguage() change la langue ;
// LanguageDetector mémorise le choix dans localStorage ;
// resolvedLanguage normalise les langues comme fr-CA vers fr.