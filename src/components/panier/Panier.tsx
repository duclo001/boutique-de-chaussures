"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

type PanierProps = {
    setPage: (page: string) => void;
};
// summaire : composant Panier qui affiche les éléments du panier, 
// permet de les modifier et de passer commande, 
// en utilisant le contexte du panier pour gérer l'état global du panier dans l'application
// si le panier est vide, affiche un message invitant à ajouter des articles depuis le catalogue
// si le panier contient des articles, affiche la liste des articles avec leurs détails,
// permet de modifier la quantité ou de supprimer des articles, 
// et affiche un résumé de la commande avec le total à payer


export default function Panier({ setPage }: PanierProps) {
    const {
        items,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart();

    if (items.length === 0) {
        return (
            <section className="container-app py-20 text-center">
                <h1 className="text-3xl font-bold text-[var(--color-text)]">
                    Votre panier est vide
                </h1>

                <p className="mt-3 text-[var(--color-text-muted)]">
                    Ajoutez une paire depuis le catalogue pour commencer.
                </p>

                <button
                    onClick={() => setPage("produits")}
                    className="mt-8 rounded-full bg-[var(--color-accent)] px-6 py-3 font-medium text-white hover:bg-[var(--color-accent-hover)]"
                >
                    Voir le catalogue
                </button>
            </section>
        );
    }

    return (
        <section className="container-app py-12 lg:py-20">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
                        Commande
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
                        Mon panier
                    </h1>

                    <p className="mt-2 text-[var(--color-text-muted)]">
                        {totalItems} article{totalItems > 1 ? "s" : ""}
                    </p>
                </div>

                <button
                    onClick={clearCart}
                    className="text-sm font-medium text-[var(--color-text-muted)] underline hover:text-[var(--color-accent)]"
                >
                    Vider le panier
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                <div className="space-y-4">
                    {items.map((item) => (
                        <article
                            key={item.variantId}
                            className="grid gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 sm:grid-cols-[120px_1fr_auto]"
                        >
                            <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--color-bg-alt)]">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="120px"
                                    className="object-cover"
                                />
                            </div>

                            <div>
                                <h2 className="font-semibold text-[var(--color-text)]">
                                    {item.name}
                                </h2>

                                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                                    {item.color} · Taille {item.size}
                                </p>

                                <p className="mt-3 font-medium text-[var(--color-accent)]">
                                    {item.price.toFixed(2)} $
                                </p>

                                <button
                                    onClick={() => removeItem(item.variantId)}
                                    className="mt-4 text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-accent)]"
                                >
                                    Supprimer
                                </button>
                            </div>

                            <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                                <div className="flex items-center rounded-full border border-[var(--color-border)]">
                                    <button
                                        onClick={() => decreaseQuantity(item.variantId)}
                                        className="h-9 w-9 text-lg"
                                        aria-label="Diminuer la quantité"
                                    >
                                        -
                                    </button>

                                    <span className="min-w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => increaseQuantity(item.variantId)}
                                        disabled={item.quantity >= item.stock}
                                        className="h-9 w-9 text-lg disabled:cursor-not-allowed disabled:text-gray-300"
                                        aria-label="Augmenter la quantité"
                                    >
                                        +
                                    </button>
                                </div>

                                <p className="font-semibold text-[var(--color-text)]">
                                    {(item.price * item.quantity).toFixed(2)} $
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="h-fit rounded-2xl border border-[var(--color-border)] bg-white p-6">
                    <h2 className="text-lg font-semibold text-[var(--color-text)]">
                        Résumé
                    </h2>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-[var(--color-text-muted)]">Sous-total</span>
                            <span>{totalPrice.toFixed(2)} $</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-[var(--color-text-muted)]">Livraison</span>
                            <span>Gratuite</span>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-[var(--color-border)] pt-6">
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>{totalPrice.toFixed(2)} $</span>
                        </div>
                    </div>

                    <button
                        className="mt-6 w-full rounded-full bg-[var(--color-accent)] px-6 py-3 font-semibold text-white hover:bg-[var(--color-accent-hover)]"
                    >
                        Passer commande
                    </button>

                    <button
                        onClick={() => setPage("produits")}
                        className="mt-3 w-full rounded-full border border-[var(--color-border)] px-6 py-3 font-medium hover:bg-[var(--color-bg-alt)]"
                    >
                        Continuer mes achats
                    </button>
                </aside>
            </div>
        </section>
    );
}