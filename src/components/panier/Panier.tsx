"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import * as cartStore from "@/lib/cartStore";
import { useTranslation } from "react-i18next";

/**
 * Page Panier. Le contenu est lu via useSyncExternalStore : la page se re-rend
 * automatiquement à chaque mutation du panier (et le badge du Header aussi,
 * puisqu'il est abonné au même store). Sans useEffect ni Context.
 */
export default function Panier() {
  const { t, i18n } = useTranslation("cart");

  const locale = i18n.resolvedLanguage?.startsWith("en")
    ? "en-CA"
    : "fr-CA";

  function formatPrice(price: number) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CAD",
    }).format(price);
  }
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  // Totaux dérivés à chaque rendu
  const totalItems = cartStore.compterArticles(items);
  const totalPrice = cartStore.prixTotal(items);

  if (items.length === 0) {
    return (
      <section className="container-app py-20 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          {t("empty.title")}
        </h1>

        <p className="mt-3 text-[var(--color-text-muted)]">
          {t("empty.description")}
        </p>

        <Link
          href="/produits"
          className="mt-8 inline-block rounded-full bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:bg-[var(--color-accent-hover)]"
        >
          {t("empty.catalogButton")}
        </Link>
      </section>
    );
  }

  return (
    <section className="container-app py-12 lg:py-20">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            {t("header.eyebrow")}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            {t("header.title")}
          </h1>

          <p className="mt-2 text-[var(--color-text-muted)]">
            {t("header.itemCount", { count: totalItems })}
          </p>
        </div>

        <button
          type="button"
          onClick={() => cartStore.vider()}
          className="text-sm font-medium text-[var(--color-text-muted)] underline hover:text-[var(--color-accent)]"
        >
          {t("header.clear")}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.variantId}
              className="grid gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-bg-alt)] p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>

              <div>
                <h2 className="font-semibold text-[var(--color-text)]">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {t("item.details", {
                    color: item.color,
                    size: item.size,
                  })}
                </p>

                <p className="mt-3 font-medium text-[var(--color-accent)]">
                  {formatPrice(item.price)}
                </p>

                <button
                  type="button"
                  onClick={() => cartStore.retirer(item.variantId)}
                  className="mt-4 text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-accent)]"
                >
                  {t("item.remove")}
                </button>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                <div className="flex items-center rounded-full border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => cartStore.diminuer(item.variantId)}
                    className="h-9 w-9 text-lg"
                    aria-label={t("item.decreaseQuantity")}
                  >
                    -
                  </button>

                  <span className="min-w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => cartStore.augmenter(item.variantId)}
                    disabled={item.quantity >= item.stock}
                    className="h-9 w-9 text-lg disabled:cursor-not-allowed disabled:text-gray-300"
                    aria-label={t("item.increaseQuantity")}
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-[var(--color-text)]">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-white p-6">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            {t("summary.title")}
          </h2>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">{t("summary.subtotal")}</span>
              <span>{totalPrice.toFixed(2)} $</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)]">{t("summary.delivery")}</span>
              <span>{t("summary.free")}</span>
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--color-border)] pt-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t("summary.total")}</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--color-accent-hover)]"
          >
            {t("summary.checkout")}
          </button>

          <Link
            href="/produits"
            className="mt-3 block w-full rounded-full border border-[var(--color-border)] px-6 py-3 text-center font-medium hover:bg-[var(--color-bg-alt)]"
          >
            {t("summary.continueShopping")}
          </Link>
        </aside>
      </div>
    </section>
  );
}
