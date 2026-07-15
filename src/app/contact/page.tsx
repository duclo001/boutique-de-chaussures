"use client";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import { useTranslation } from "react-i18next";

// Données utilisées pour afficher les cartes d'information.
const contactCards = [
    {
        id: "response",
        icon: "/icons/contact/icons8-clock.svg",
    },
    {
        id: "sizes",
        icon: "/icons/contact/shoe.svg",
    },
    {
        id: "tracking",
        icon: "/icons/contact/Delivery.png",
    },
    {
        id: "returns",
        icon: "/icons/contact/reponse.svg",
    },
] as const;

export default function ContactPage() {
    const { t } = useTranslation("contact");
    return (
        // Section principale de la page contact.
        <section className="container-app py-12 lg:py-20">
            {/* Mise en page en deux colonnes sur grand écran. */}
            <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start">
                {/* Colonne gauche : texte, image et cartes d'information. */}
                <div>
                    <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
                        {t("page.eyebrow")}
                    </p>

                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
                        {t("page.title")}
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
                        {t("page.description")}
                    </p>

                    {/* Bloc visuel qui contient l'image et les cartes superposées. */}
                    <div className="relative mt-16">
                        {/* Image de fond avec coins arrondis. */}
                        <div className="relative min-h-[560px] overflow-hidden rounded-3xl">
                            <Image
                                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1100&q=80"
                                alt={t("page.imageAlt")}
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Cartes placées au-dessus de l'image. */}
                        <div className="absolute inset-x-4 top-10 z-10 grid gap-4 sm:inset-x-8 sm:top-0 sm:grid-cols-2">
                            {contactCards.map((card) => (
                                <article
                                    key={card.id}
                                    className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-5 shadow-lg backdrop-blur"
                                >
                                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-alt)]">
                                        <Image
                                            src={card.icon}
                                            alt=""
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <h2 className="text-base font-semibold text-[var(--color-text)]">
                                        {t(`cards.${card.id}.title`)}
                                    </h2>

                                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                                        {t(`cards.${card.id}.text`)}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Colonne droite : formulaire de contact. */}
                <ContactForm />
            </div>
        </section>
    );
}