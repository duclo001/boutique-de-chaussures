import type { Product } from "@/types/product";

/**
 * Catalogue statique des produits.
 * Toutes les images sont locales (public/images/produits/) au format WebP.
 * Chaque produit qui existe en plusieurs coloris est regroupé : 1 produit, N variantes.
 */
const img = (filename: string) => `/images/produits/${filename}`;

/** Pointures standard FR proposées par défaut */
const POINTURES = [40, 42, 44] as const;

/**
 * Petit utilitaire pour fabriquer rapidement plusieurs variantes (pointures)
 * pour une même image / couleur / prix.
 */
function variantesPourCouleur(opts: {
  prefix: string;
  color: string;
  price: number;
  image: string;
  sizes?: readonly number[];
  stockParTaille?: number;
}) {
  const tailles = opts.sizes ?? POINTURES;
  // Stocks volontairement variés pour un rendu plus réaliste :
  // certaines pointures sont bien fournies, d'autres en rupture.
  const stocksParDefaut = [8, 12, 2, 0, 6, 15, 1];
  return tailles.map((size, index) => ({
    id: `${opts.prefix}-${size}`,
    color: opts.color,
    size,
    price: opts.price,
    image: opts.image,
    stock:
      opts.stockParTaille !== undefined
        ? opts.stockParTaille
        : stocksParDefaut[index % stocksParDefaut.length],
  }));
}

export const products: Product[] = [


  // ─────────────────────────────────────────────────────────────
  // CASUAL
  // ─────────────────────────────────────────────────────────────

  {
    id: "nike-ebernon-low",
    name: "Nike Ebernon Low",
    description:
      "Basket low cuir au design épuré, classique intemporel pour la ville. Disponible en noir ou blanc.",
    basePrice: 109.99,
    category: "casual",
    featured: true,
    images: [

      img("Nike_low_photo6.webp"),
      img("Nike_low_photo2.webp"),
      img("Nike_low_photo4.webp"),
      img("Nike_low_photo5.webp"),
      img("Nike_low_photo7.webp"),
      img("Nike_low_photo9.webp"),
      img("Nike_low_photo10.webp"),
      img("Nike_low_photo11.webp"),
      img("Nike_low_photo12.webp"),
      img("Nike_low_photo13.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Noir",
        price: 109.99,
        image: img("Nike_low_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Blanc",
        price: 109.99,
        image: img("Nike_low_photo2.webp"),
      }),

      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Blanc / Bleu / Vert",
        price: 109.99,
        image: img("Nike_low_photo4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Noir / Blanc",
        price: 109.99,
        image: img("Nike_low_photo5.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Blanc / Rouge / Noir",
        price: 109.99,
        image: img("Nike_low_photo6.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Blanc / Violet / rose-clair / Bleu-Marine / jaune",
        price: 109.99,
        image: img("Nike_low_photo7.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "jaune / Blanc",
        price: 109.99,
        image: img("Nike_low_photo9.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Blanc / Vert-clair",
        price: 109.99,
        image: img("Nike_low_photo10.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Noir sombre",
        price: 109.99,
        image: img("Nike_low_photo11.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Militaire ",
        price: 109.99,
        image: img("Nike_low_photo12.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Gris / Noir",
        price: 109.99,
        image: img("Nike_low_photo13.webp"),
      }),
    ],
  },
  {
    id: "sock-sneaker-confort",
    name: "Sock Sneaker Confort",
    description:
      "Basket chaussette ultra-souple, enfilage facile et maintien de la cheville. Parfaite au quotidien.",
    basePrice: 59.99,
    category: "casual",
    images: [
      img("Sock_Confondu_photo1.webp"),
      img("Sock_Confondu_photo2.webp"),
      img("Sock_Confondu_photo3.webp"),
      img("Sock_Confondu_photo4.webp"),
      img("Sock_Confondu_photo5.webp"),
      img("Sock_Confondu_photo6.webp"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "sock-Blanc",
        color: "Blanc / Rouge",
        price: 59.99,
        image: img("Sock_Confondu_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Blanc / Noir",
        price: 59.99,
        image: img("Sock_Confondu_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Blanc / Orange",
        price: 59.99,
        image: img("Sock_Confondu_photo3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Marron / Noir",
        price: 59.99,
        image: img("Sock_Confondu_photo4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-blanc",
        color: "Blanc / Rouge",
        price: 59.99,
        image: img("Sock_Confondu_photo5.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-blanc",
        color: "Blanc / Marron-Foncé",
        price: 59.99,
        image: img("Sock_Confondu_photo6.webp"),
      }),

    ],
  },
  {
    id: "sneaker-urbain-blanc",
    name: "Sneaker Urbain Blanc",
    description:
      "Sneaker minimaliste en cuir lisse, parfaite pour un look quotidien soigné. Finitions discrètes et semelle confortable.",
    basePrice: 119.99,
    category: "casual",
    featured: true,
    images: [
      img("Sneaker-urbain_photo4.webp"),
      img("Sneaker-urbain_photo1.webp"),
      img("Sneaker-urbain_photo2.webp"),
      img("Sneaker-urbain_photo3.webp"),
      img("Sneaker-urbain_photo5.webp"),


    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "sneaker-urbain-blanc",
        color: "Blanc/ Noir",
        price: 119.99,
        image: img("Sneaker-urbain_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sneaker-urbain-blanc",
        color: "Blanc/ / noir",
        price: 119.99,
        image: img("Sneaker-urbain_photo2.webp"),

      }),
      ...variantesPourCouleur({
        prefix: "sneaker-urbain-blanc",
        color: "Blanc / Vert",
        price: 119.99,
        image: img("Sneaker-urbain_photo3.webp"),

      }),
      ...variantesPourCouleur({
        prefix: "sneaker-urbain-blanc",
        color: "Blanc",
        price: 119.99,
        image: img("Sneaker-urbain_photo4.webp"),

      }),
      ...variantesPourCouleur({
        prefix: "sneaker-urbain-blanc",
        color: "Noir",
        price: 119.99,
        image: img("Sneaker-urbain_photo5.webp"),

      }),
    ]
  },
  {
    id: "slip-on-canvas",
    name: "Slip-on Canvas",
    description:
      "Slip-on en toile résistante, à enfiler sans lacets. Légère, polyvalente, pensée pour les beaux jours.",
    basePrice: 49.99,
    category: "casual",
    images: [
      img("Slip-on_photo1.webp"),
      img("Slip-on_photo3.webp"),
      img("Slip-on_photo2.webp"),
      img("Slip-on_photo4.webp"),
    ],
    variants: [

      ...variantesPourCouleur({
        prefix: "sock-vert-militaire",
        color: "Vert-militaire",
        price: 49.99,
        image: img("Slip-on_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Gris",
        price: 49.99,
        image: img("Slip-on_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Bleu-foncé",
        price: 49.99,
        image: img("Slip-on_photo3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Gris",
        price: 49.99,
        image: img("Slip-on_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-blanc",
        color: "Blanc",
        price: 49.99,
        image: img("Slip-on_photo4.webp"),
      }),
    ],
  },
  {
    id: "sneaker-chunky-plateforme",
    name: "Sneaker Chunky Plateforme",
    description:
      "Silhouette dad-shoe à plateforme épaisse. Maintien renforcé et style streetwear assumé.",
    basePrice: 89.0,
    category: "casual",
    images: [
      img("SK_Chunky_photo2.webp"),
      img("SK_Chunky_photo1.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "chunky-blanc",
        color: "Blanc",
        price: 89.0,
        image: img("SK_Chunky_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "chunky-noir",
        color: "Noir",
        price: 89.0,
        image: img("SK_Chunky_photo2.webp"),
      }),
    ],
  },
  // ─────────────────────────────────────────────────────────────
  // SPORT
  // ─────────────────────────────────────────────────────────────
  {
    id: "jordan-max-aura",
    name: "Air Jordan Max Aura",
    description:
      "Hommage à la Air Jordan III avec une unité Air Max sous le talon et une tige cuir/synthétique.",
    basePrice: 169.0,
    category: "sport",
    images: [
      img("AirJordan_photo4.webp"),
      img("AirJordan_photo1.webp"),
      img("AirJordan_photo2.webp"),
      img("AirJordan_photo3.webp"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "jordan-gris-loup",
        color: "Blanc / Noir / Rouge",
        price: 169.0,
        image: img("AirJordan_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jordan-blanc-rouge",
        color: "Blanc / Gris",
        price: 174.0,
        image: img("AirJordan_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jordan-blanc-rouge",
        color: "Blanc / Rouge / Noir",
        price: 174.0,
        image: img("AirJordan_photo3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jordan-blanc-rouge",
        color: "Cuir Blanc / Rouge / Cuir Noir",
        price: 174.0,
        image: img("AirJordan_photo4.webp"),
      }),
    ],
  },
  {
    id: "nike-shox-tl",
    name: "Nike Shox TL",
    description:
      "Retour iconique des colonnes Shox pour un amorti spectaculaire et un look futuriste assumé.",
    basePrice: 189.99,
    category: "sport",
    featured: true,
    images: [
      img("NikeResor_photo2.webp"),
      img("NikeResor_photo1.webp"),
      img("NikeResor_photo3.webp"),
      img("NikeResor_photo4.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "shox-blanc-noir",
        color: "Blanc / Noir",
        price: 189.99,
        image: img("NikeResor_photo4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-noir-orange",
        color: "Noir / Orange",
        price: 189.99,
        image: img("NikeResor_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-noir-rouge",
        color: "Noir / Rouge",
        price: 189.99,
        image: img("NikeResor_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-argent",
        color: "Gris / Argent",
        price: 189.99,
        image: img("NikeResor_photo3.webp"),
      }),
    ],
  },
  {
    id: "nike-air-max-excee",
    name: "Nike Air Max Excee",
    description:
      "Basket signature Nike combinant un mesh respirant et la semelle Air Max emblématique pour un amorti tout-terrain.",
    basePrice: 159.99,
    category: "sport",
    featured: true,
    images: [

      img("Nike Baskets Air Max Excee pour homme4.webp"),
      img("Nike Baskets Air Max Excee pour homme3.webp"),
      img("Nike Baskets Air Max Excee pour homme1.webp"),
      img("Nike Baskets Air Max Excee pour homme2.webp"),

      img("Nike Baskets Air Max Excee pour homme5.webp"),


    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "air-max-excee-blanc",
        color: "Blanc / Bleu ",
        price: 159.99,
        image: img("Nike Baskets Air Max Excee pour homme1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "air-max-excee-blanc",
        color: "Blanc / Orange / Jaune / Bleu",
        price: 159.99,
        image: img("Nike Baskets Air Max Excee pour homme2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "air-max-excee-blanc",
        color: "Blanc / Noir / Jaune",
        price: 159.99,
        image: img("Nike Baskets Air Max Excee pour homme3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "air-max-excee-blanc",
        color: "Orange / Noir / Violet / Beige / Gris",
        price: 159.99,
        image: img("Nike Baskets Air Max Excee pour homme4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "air-max-excee-blanc",
        color: "Blanc / Noir / Beige / Gris",
        price: 159.99,
        image: img("Nike Baskets Air Max Excee pour homme5.webp"),
      }),
    ]
  },
  {
    id: "goodvalue-runner",
    name: "GoodValue Runner Homme",
    description:
      "Chaussure de course légère, tige en mesh aéré et semelle amortissante. Disponible en trois coloris masculins.",
    basePrice: 79.99,
    category: "sport",
    images: [
      img("GoodValue Chaussures de course pour homme noir.webp"),
      img("GoodValue Chaussures de course pour homme gris.webp"),
      img("GoodValue Chaussures de course pour homme vert.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "goodvalue-noir",
        color: "Noir",
        price: 79.99,
        image: img("GoodValue Chaussures de course pour homme noir.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "goodvalue-gris",
        color: "Gris",
        price: 79.99,
        image: img("GoodValue Chaussures de course pour homme gris.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "goodvalue-vert",
        color: "Vert kaki",
        price: 79.99,
        image: img("GoodValue Chaussures de course pour homme vert.webp"),
      }),
    ],
  },
  {
    id: "ziitop-air-running",
    name: "Ziitop AIR Running",
    description:
      "Running unisexe à bulle d'air visible, tige tricotée respirante et semelle souple. Une explosion de coloris pour s'adapter à toutes les envies.",
    basePrice: 84.99,
    category: "sport",
    featured: true,
    images: [
      img("Ziitop_photo1.webp"),
      img("Ziitop_photo4.webp"),
      img("Ziitop_photo5.webp"),
      img("Ziitop_photo6.webp"),
      img("Ziitop_photo7.webp"),
      img("Ziitop_photo9.webp"),
      img("Ziitop_photo10.webp"),
      img("Ziitop_photo11.webp"),
      img("Ziitop_photo12.webp"),
      img("Ziitop_photo13.webp"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ziitop-rose",
        color: "Rose",
        price: 84.99,
        image: img("Ziitop_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge",
        color: "Rouge",
        price: 84.99,
        image: img("Ziitop_photo4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-vert-noir",
        color: " Noir / Blanc / Gris",
        price: 84.99,
        image: img("Ziitop_photo5.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge-noir",
        color: "Rouge / Noir",
        price: 84.99,
        image: img("Ziitop_photo6.webp"),
      }),

      ...variantesPourCouleur({
        prefix: "ziitop-violet-turquoise",
        color: "Vert / Blanc / Noir",
        price: 84.99,
        image: img("Ziitop_photo7.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge",
        color: "Vert / Rose / Bleu",
        price: 84.99,
        image: img("Ziitop_photo9.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-vert-noir",
        color: "Bleu / Noir / Violet",
        price: 84.99,
        image: img("Ziitop_photo10.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge-noir",
        color: "Gris / Noir / Orange",
        price: 84.99,
        image: img("Ziitop_photo11.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge",
        color: "Noir / Blanc ",
        price: 84.99,
        image: img("Ziitop_photo12.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-vert-noir",
        color: "Bleu / Noir / Vert-citron /Gris",
        price: 84.99,
        image: img("Ziitop_photo13.webp"),
      }),

    ],
  },
  {
    id: "kricely-x-grip-trail",
    name: "Kricely X-Grip Trail",
    description:
      "Trail running tout-terrain avec semelle X-Grip ultra-accrocheuse, idéale pour le sentier et la randonnée sportive.",
    basePrice: 99.0,
    category: "sport",
    images: [
      img("Kricely_photo1.webp"),
      img("Kricely_photo2.webp"),
      img("Kricely_photo3.webp"),
      img("Kricely_photo4.webp"),
      img("Kricely_photo5.webp"),
      img("Kricely_photo6.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "kricely-orange",
        color: "Noir / Orange / Noir",
        price: 99.0,
        image: img("Kricely_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-jaune",
        color: "Camouflage",
        price: 99.0,
        image: img("Kricely_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-gris",
        color: "Multicolore",
        price: 99.0,
        image: img("Kricely_photo3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-camo",
        color: "Orange / Noir",
        price: 104.0,
        image: img("Kricely_photo4.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-tiedye",
        color: "Jaune / Noir",
        price: 104.0,
        image: img("Kricely_photo5.webp"),


      }),
      ...variantesPourCouleur({
        prefix: "kricely-tiedye",
        color: "Noir",
        price: 104.0,
        image: img("Kricely_photo6.webp"),


      }),
    ],
  },


  {
    id: "ux-sport-mesh",
    name: "UX Sport Sneaker Mesh",
    description:
      "Basket sport agressive au design exosquelette, idéale pour la salle ou les sorties urbaines.",
    basePrice: 74.99,
    category: "sport",
    images: [
      img("UXSport_photo1.webp"),
      img("UXSport_photo2.webp"),
      img("UXSport_Photo3.webp"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ux-noir",
        color: "Noir total",
        price: 74.99,
        image: img("UXSport_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ux-gris",
        color: "Gris-ecarlate",
        price: 74.99,
        image: img("UXSport_photo2.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ux-rouge-noir",
        color: " Noir / Rouge",
        price: 74.99,
        image: img("UXSport_Photo3.webp"),
      }),

    ],
  },


  // ─────────────────────────────────────────────────────────────
  // VILLE
  // ─────────────────────────────────────────────────────────────
  {
    id: "bottines-cuir-ville",
    name: "Bottines Cuir Ville",
    description:
      "Bottines à lacets en cuir vieilli, doublure intérieure et semelle crantée. Parfaites pour l'automne.",
    basePrice: 179.0,
    category: "ville",
    featured: true,
    images: [
      img("Bottine_photo1.webp"),
      img("Bottine_photo2.webp"),
      img("Bottine_photo3.webp"),
      img("Bottine_photo4.webp"),
      img("Bottine_photo5.webp"),
      img("Bottine_photo6.webp"),
      img("Bottine_photo7.webp"),
      img("Bottine_photo8.webp"),
      img("Bottine_photo9.webp"),
      img("Bottine_photo10.webp"),
      img("Bottine_photo11.webp"),
      img("Bottine_photo12.webp"),
      img("Bottine_photo13.webp"),
      img("Bottine_photo14.webp"),
      img("Bottine_photo15.webp"),


    ],

    variants: [
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Noir / Blanc / Gris",
        price: 179.0,
        image: img("Bottine_photo1.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: " Blanc /Blanc / Rose-Fichsia /Bleu-Light",
        price: 179.0,
        image: img("Bottine_photo2.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Blanc  /Noir /Vert-citron",
        price: 179.0,
        image: img("Bottine_photo3.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Blanc / Noir-vif",
        price: 179.0,
        image: img("Bottine_photo4.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Blanc /Noir / Rose-Fichsia /Bleu-Light",
        price: 179.0,
        image: img("Bottine_photo5.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Noir /Blanc",
        price: 179.0,
        image: img("Bottine_photo6.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Blanc /Bleu-Royal / Rose-Fichsia",
        price: 179.0,
        image: img("Bottine_photo7.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Blanc /Bleu-Turquoise / Violet ",
        price: 179.0,
        image: img("Bottine_photo8.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Bleu-Turquoise / Violet / Noir",
        price: 179.0,
        image: img("Bottine_photo9.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Bleu-Turquoise / Blanc / Vert-citron",
        price: 179.0,
        image: img("Bottine_photo10.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Noir / Bleu-Turquoise",
        price: 179.0,
        image: img("Bottine_photo11.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Bleu-Turquoise / Blanc ",
        price: 179.0,
        image: img("Bottine_photo12.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Noir / Orange / Bleu-Verdun",
        price: 179.0,
        image: img("Bottine_photo13.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Rouge / Blanc",
        price: 179.0,
        image: img("Bottine_photo14.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "bottines-cuir-brun",
        color: "Jaune / Rouge / Noir",
        price: 179.0,
        image: img("Bottine_photo15.webp"),
        stockParTaille: 3,
      }),

    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ELEGANT
  // ─────────────────────────────────────────────────────────────
  {
    id: "jousen-classic-oxford",
    name: "Jousen Classic Oxford",
    description:
      "Soulier habillé en cuir lisse, coupe Oxford classique. Idéal pour le bureau, les cérémonies et les soirées formelles.",
    basePrice: 129.0,
    category: "elegant",
    featured: true,
    images: [
      img("Jousen Chaussures classiques brun.webp"),
      img("Jousen Chaussures classiques marron.webp"),
      img("Jousen Chaussures classiques noir.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "jousen-brun",
        color: "Brun clair",
        price: 129.0,
        image: img("Jousen Chaussures classiques brun.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jousen-marron",
        color: "Marron foncé",
        price: 129.0,
        image: img("Jousen Chaussures classiques marron.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jousen-noir",
        color: "Noir",
        price: 129.0,
        image: img("Jousen Chaussures classiques noir.webp"),
      }),
    ],
  },
  {
    id: "jousen-zhn-oxford",
    name: "Jousen ZHN Oxford",
    description:
      "Édition ZHN à bout fleuri : un Oxford élégant aux détails brogue raffinés pour les tenues les plus soignées.",
    basePrice: 139.0,
    category: "elegant",
    images: [
      img("Jousen Chaussures classiques ZHN brun.webp"),
      img("Jousen Chaussures classiques ZHN noir.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "zhn-brun",
        color: "Brun",
        price: 139.0,
        image: img("Jousen Chaussures classiques ZHN brun.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "zhn-noir",
        color: "Noir",
        price: 139.0,
        image: img("Jousen Chaussures classiques ZHN noir.webp"),
      }),
    ],
  },
  {
    id: "derby-cuir-noir",
    name: "Derby Cuir Noir",
    description:
      "Derby en cuir noir glacé, montage cousu, idéal pour le costume sombre.",
    basePrice: 149.0,
    category: "elegant",
    images: [
      img("derby-shoes_photo6.webp"),
      img("derby-shoes_photo.webp"),
      img("derby-shoes_photo2.png"),
      img("derby-shoes_photo3.png"),
      img("derby-shoes_photo4.png"),
      img("derby-shoes_photo5.png"),
      img("derby-shoes_photo6.png"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Chatain-Clair",
        price: 149.0,
        image: img("derby-shoes_photo.webp"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Gris-Ardoise",
        price: 149.0,
        image: img("derby-shoes_photo2.png"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Noir",
        price: 149.0,
        image: img("derby-shoes_photo3.png"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Marron-Moyen",
        price: 149.0,
        image: img("derby-shoes_photo4.png"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Rouge-Cerise-Foncé",
        price: 149.0,
        image: img("derby-shoes_photo5.png"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Marron-Chocolat",
        price: 149.0,
        image: img("derby-shoes_photo6.png"),
        stockParTaille: 3,
      }),
      ...variantesPourCouleur({
        prefix: "derby-noir",
        color: "Beige-Clair",
        price: 149.0,
        image: img("derby-shoes_photo6.webp"),
        stockParTaille: 3,
      }),
    ]
  },
  {
    id: "oxford-brogue-cognac",
    name: "Oxford Brogue Cognac",
    description:
      "Oxford brogue cuir cognac, perforations décoratives. Apporte une touche de caractère aux tenues classiques.",
    basePrice: 159.0,
    category: "elegant",
    featured: true,
    images: [
      img("Oxford_Brogue_photo1.webp"),
      img("Oxford_Brogue_photo1.webp"),
      img("Oxford_Brogue_photo3.webp"),
      img("Oxford_Brogue_photo4.webp"),

    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "oxford-brogue-cognac",
        color: "Noir",
        price: 159.0,
        image: img("Oxford_Brogue_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "oxford-brogue-cognac",
        color: "Marron-Cognac",
        price: 159.0,
        image: img("Oxford_Brogue_photo1.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "oxford-brogue-cognac",
        color: "Cognac",
        price: 159.0,
        image: img("Oxford_Brogue_photo3.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "oxford-brogue-cognac",
        color: "Brun-Noir",
        price: 159.0,
        image: img("Oxford_Brogue_photo4.webp"),
      }),
    ]
  },
];

/** Sélection mise en avant sur la page d'accueil (section "Vedettes"). */
export const featuredProducts = products.filter((p) => p.featured);
