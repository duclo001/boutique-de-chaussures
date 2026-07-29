"use client";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/**
 * Configuration des sections du footer.
 * - `href` (optionnel) : si présent, l'entrée est un <Link> Next.js.
 * - Les entrées sans `href` sont décoratives (pages non implémentées) et
 *   restent désactivées.
 */
const SECTIONS = [
  {
    titleKey: "sections.shop.title",
    links: [
      {
        labelKey: "sections.shop.allProducts",
        href: "/produits",
      },
      {
        labelKey: "sections.shop.home",
        href: "/",
      },
      {
        labelKey: "sections.shop.cart",
        href: "/panier",
      },
    ],
  },
  {
    titleKey: "sections.help.title",
    links: [
      {
        labelKey: "sections.help.deliveryReturns",
      },
      {
        labelKey: "sections.help.sizeGuide",
      },
      {
        labelKey: "sections.help.contact",
        href: "/contact",
      },
      {
        labelKey: "sections.help.faq",
      },
    ],
  },
  {
    titleKey: "sections.social.title",
    links: [
      {
        labelKey: "sections.social.instagram",
      },
      {
        labelKey: "sections.social.facebook",
      },
      {
        labelKey: "sections.social.tiktok",
      },
    ],
  },
] as const;

export default function Footer() {
  const { t } = useTranslation("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne logo + tagline */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-[var(--color-text-muted)]">
              {t("tagline")}
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.titleKey}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
                {t(section.titleKey)}
              </h3>

              <ul className="flex flex-col gap-2">
                {section.links.map((link) =>
                  "href" in link ? (
                    <li key={link.labelKey}>
                      <Link
                        href={link.href}
                        className="text-left text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.labelKey}>
                      <span className="cursor-not-allowed text-sm text-[var(--color-text-muted)]">
                        {t(link.labelKey)}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
          <p>{t("copyright", { year })}</p>
        </div>
      </div>
    </footer>
  );
}
