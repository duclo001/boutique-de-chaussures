import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm sm:text-base",
  lg: "h-13 px-8 text-base",
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
  // Le texte reprend la couleur du fond : reste lisible en clair comme en sombre.
  secondary:
    "bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-80",
  outline:
    "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]",
};

/**
 * Bouton réutilisable (peut aussi être un lien Next.js si `href` est fourni).
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
  } = props;

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, target, rel } = props;

    // Les liens d'ancre (#) utilisent un <a> classique (scroll même page)
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    // Navigation interne (commence par "/") : <Link> Next.js (préchargement)
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    // Liens externes : <a> classique avec target/rel
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  const { href: _ignored, ...buttonProps } = props as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
