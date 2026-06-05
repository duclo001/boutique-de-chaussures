import Logo from "@/components/ui/Logo";

type FooterProps = {
  setPage: (page: string) => void;
};

/**
 * Configuration des sections du footer.
 * - `page` (optionnel) : si présent, le lien navigue via setPage (useState).
 * - `category` (optionnel) : passe une catégorie à pré-sélectionner sur la
 *   page catalogue. Comme le filtre est dans Produits.tsx et non remonté
 *   ici, on se contente d'aller au catalogue.
 * - Les entrées sans `page` sont décoratives (pages non implémentées).
 */
type FooterLink = {
  label: string;
  page?: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const SECTIONS: FooterSection[] = [
  {
    title: "Boutique",
    links: [
      { label: "Tous les produits", page: "produits" },
      { label: "Page d'accueil", page: "accueil" },
      { label: "Mon panier", page: "panier" },
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

export default function Footer({ setPage }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Colonne logo + tagline */}
          <div className="flex flex-col gap-4">
            <Logo onClick={() => setPage("accueil")} />
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
                    {/*
                      Navigation interne par useState (module 3) :
                      bouton type="button" + setPage. Les entrées sans `page`
                      restent visibles mais désactivées.
                    */}
                    <button
                      type="button"
                      disabled={!link.page}
                      onClick={() => {
                        if (link.page) setPage(link.page);
                      }}
                      className="cursor-pointer text-left text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-[var(--color-text-muted)]"
                    >
                      {link.label}
                    </button>
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
