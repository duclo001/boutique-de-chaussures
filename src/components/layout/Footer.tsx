import Logo from "@/components/ui/Logo";
import Link from "next/link";

/**
 * Configuration des sections du footer.
 * - `href` (optionnel) : si présent, l'entrée est un <Link> Next.js.
 * - Les entrées sans `href` sont décoratives (pages non implémentées) et
 *   restent désactivées.
 */
type FooterLink = {
  label: string;
  href?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const SECTIONS: FooterSection[] = [
  {
    title: "Boutique",
    links: [
      { label: "Tous les produits", href: "/produits" },
      { label: "Page d'accueil", href: "/" },
      { label: "Mon panier", href: "/panier" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Livraison & retours" },
      { label: "Guide des tailles" },
      { label: "Nous contacter" },
      { label: "FAQ" },
    ],
  },
  {
    title: "Suivez-nous",
    links: [
      { label: "Instagram" },
      { label: "Facebook" },
      { label: "TikTok" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne logo + tagline */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm text-[var(--color-text-muted)]">
              Des chaussures sélectionnées avec soin, pour un quotidien
              confortable et stylé.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) =>
                  link.href ? (
                    // Navigation interne : <Link> Next.js
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-left text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    // Entrée décorative (page non implémentée) : désactivée
                    <li key={link.label}>
                      <span className="cursor-not-allowed text-sm text-[var(--color-text-muted)] opacity-60">
                        {link.label}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-muted)] sm:flex-row">
          <p>© {year} Boutique de Chaussures — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
