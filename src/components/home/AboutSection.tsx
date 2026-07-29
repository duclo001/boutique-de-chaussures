"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
/**
 * Section "À propos" — courte présentation de la boutique sur la page d'accueil.
 */
export default function AboutSection() {
  const { t } = useTranslation("home");
  return (
    <section className="container-app py-16 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[var(--color-bg-alt)] lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1100&q=80"
            alt={t("about.imageAlt")}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 flex flex-col gap-5 lg:order-2">
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            {t("about.eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            {t("about.title")}
          </h2>
          <p className="text-base text-[var(--color-text-muted)]">
            {t("about.description")}
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Bullet>{t("about.benefits.materials")}</Bullet>
            <Bullet>{t("about.benefits.comfort")}</Bullet>
            <Bullet>{t("about.benefits.delivery")}</Bullet>
            <Bullet>{t("about.benefits.returns")}</Bullet>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-[var(--color-text)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent-2)]"
        aria-hidden="true"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
