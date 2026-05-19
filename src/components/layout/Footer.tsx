import Link from "next/link";
import Logo from "@/components/ui/Logo";

const SECTIONS = [
  {
    title: "Boutique",
    links: [
      { href: "/produits", label: "Tous les produits" },
      { href: "/produits?categorie=sport", label: "Sport" },
      { href: "/produits?categorie=ville", label: "Ville" },
      { href: "/produits?categorie=elegant", label: "Élégant" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "#", label: "Livraison & retours" },
      { href: "#", label: "Guide des tailles" },
      { href: "#", label: "Nous contacter" },
      { href: "#", label: "FAQ" },
    ],
  },
  {
    title: "Suivez-nous",
    links: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "Facebook" },
      { href: "#", label: "TikTok" },
    ],
  },
] as const;

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
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
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
