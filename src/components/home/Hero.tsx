import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * Hero section : grande image, slogan, sous-titre et CTA.
 */
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-alt)]">
      <div className="container-app grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        {/* Texte */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Nouvelle collection 2026
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Chaque pas,{" "}
            <span className="text-[var(--color-accent)]">une nouvelle</span>{" "}
            histoire.
          </h1>

          <p className="max-w-xl text-base text-[var(--color-text-muted)] sm:text-lg">
            Découvrez une sélection de chaussures pensées pour le confort, la
            durabilité et le style. Du sport à la ville, trouvez la paire qui
            vous ressemble.
          </p>

          <div className="flex flex-wrap gap-3">
            {/* Navigation interne vers le catalogue (Link via Button) */}
            <Button href="/produits" size="lg">
              Découvrir la collection
            </Button>
            {/* Lien ancre interne — scroll vers la section vedette */}
            <Button href="#vedette" variant="outline" size="lg">
              Voir les coups de cœur
            </Button>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-6">
            <Stat label="Modèles" value="50+" />
            <Stat label="Livraison" value="48h" />
            <Stat label="Retour" value="30 j" />
          </dl>
        </div>

        {/* Image principale */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1200&q=80"
              alt="Sneakers de la nouvelle collection"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Carte flottante décorative */}
          <div className="absolute -bottom-6 -left-6 hidden flex-col gap-1 rounded-2xl bg-[var(--color-surface)] p-4 shadow-lg sm:flex">
            <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
              Coup de cœur
            </span>
            <span className="text-sm font-semibold">Runner Performance</span>
            <span className="text-sm font-medium text-[var(--color-accent)]">
              149,00 $
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
        {label}
      </dt>
      <dd className="text-xl font-semibold text-[var(--color-text)]">
        {value}
      </dd>
    </div>
  );
}
