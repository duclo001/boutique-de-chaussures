import Image from "next/image";
import Link from "next/link";

type CategoryItem = {
  label: string;
  slug: string;
  image: string;
};

const CATEGORIES: CategoryItem[] = [
  {
    label: "Sport",
    slug: "sport",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  },
  {
    label: "Ville",
    slug: "ville",
    image:
      "https://images.unsplash.com/photo-1581803274668-261faa12dca7?w=900&q=80",
  },
  {
    label: "Casual",
    slug: "casual",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    label: "Élégant",
    slug: "elegant",
    image:
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=800&q=80",
  },
];

/**
 * Grille de catégories : chaque tuile renvoie vers `/produits?categorie=...`
 */
export default function Categories() {
  return (
    <section className="bg-[var(--color-bg-alt)] py-16 lg:py-24">
      <div className="container-app">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            Catégories
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Explorez par style
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produits?categorie=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={`Catégorie ${cat.label}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-semibold text-white sm:text-xl">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
