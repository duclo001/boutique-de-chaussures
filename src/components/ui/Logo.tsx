"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
type LogoProps = {
  /** Variante de couleur. "light" pour fond sombre, "dark" pour fond clair. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Logo SVG inline (vectoriel, scalable).
 * Représente une chaussure stylisée à côté du nom de la boutique.
 * Lien Next.js qui ramène à la page d'accueil ("/").
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "dark" ? "text-text" : "text-white";
  const iconColor = variant === "dark" ? "text-accent" : "text-white";
  const { t } = useTranslation("header");

  return (
    <Link
      href="/"
      aria-label={t("accessibility.homeLink")}
      className={`group inline-flex cursor-pointer items-center gap-2 ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-9 w-9 ${iconColor} transition-transform group-hover:-rotate-6`}
        aria-hidden="true"
      >
        {/* Silhouette stylisée d'une chaussure */}
        <path
          d="M6 30c0-2 1-4 4-5l8-3c2-1 3-2 4-4l3-6c1-2 3-2 4 0l4 9c1 2 2 3 4 3l4 1c3 1 5 3 5 6v3H6v-4z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M6 34h36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Lacets */}
        <path
          d="M19 18l4 2M21 14l4 2M23 10l4 2"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <span className={`flex flex-col leading-none ${textColor}`}>
        <span className="text-base font-semibold tracking-tight sm:text-lg">
          Boutique
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] opacity-80 sm:text-xs">
          de Chaussures
        </span>
      </span>
    </Link>
  );
}
