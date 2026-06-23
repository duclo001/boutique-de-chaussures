import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";

const contactCards = [
  {
    title: "Réponse sous 24h",
    text: "Notre équipe vous répond rapidement pour toute question.",
    icon: "/icons/file.svg"
  },
  {
    title: "Aide sur les tailles",
    text: "Besoin de choisir la bonne pointure ? Nous pouvons vous guider.",
  },
  {
    title: "Suivi de commande",
    text: "Posez vos questions sur vos achats, livraisons ou disponibilités.",
  },
  {
    title: "Retours et échanges",
    text: "Nous vous accompagnons pour les demandes après achat.",
  },
];

export default function ContactPage() {
  return (
    <section className="container-app py-12 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-wider text-[var(--color-accent)]">
            Service client
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Contactez-nous
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
            Une question sur une commande, une pointure ou un produit ? Notre
            équipe vous répond rapidement pour vous aider à trouver la paire qui
            vous convient.
          </p>

     <div className="relative mt-16">
  <div className="relative min-h-[560px] overflow-hidden rounded-3xl">
    <Image
      src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1100&q=80"
                     alt="Atelier d'une boutique de chaussures"
                     fill
                     sizes="(min-width: 1024px) 50vw, 100vw"
                     className="object-cover"
    />
  </div>   

  <div className="absolute inset-x-4 top-10 z-10 grid gap-4 sm:inset-x-8 sm:top-0 sm:grid-cols-2">
    {contactCards.map((card) => (
      <article
        key={card.title}
        className="rounded-2xl border border-[var(--color-border)] bg-white/95 p-5 shadow-lg backdrop-blur"
      >
        
      
        <h2 className="text-base font-semibold text-[var(--color-text)]">
          {card.title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {card.text}
        </p>
       
       
      </article>
    ))}
  </div>
</div>

    
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

    //   <div className="mt-8 grid gap-4 sm:grid-cols-2">
    //         {contactCards.map((card) => (
    //           <article
    //             key={card.title}
    //             className="rounded-2xl border border-[var(--color-border)] bg-white p-5"
    //           >
    //             <h2 className="text-base font-semibold text-[var(--color-text)]">
    //               {card.title}
    //             </h2>
    //             <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
    //               {card.text}
    //             </p>
    //           </article>
    //         ))}
    //       </div>

    //       <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl bg-[var(--color-bg-alt)]">
    //       <Image
    //                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1100&q=80"
    //                  alt="Atelier d'une boutique de chaussures"
    //                  fill
    //                  sizes="(min-width: 1024px) 50vw, 100vw"
    //                  className="object-cover"
    //         />
    //       </div>