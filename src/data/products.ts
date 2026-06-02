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
  // SPORT
  // ─────────────────────────────────────────────────────────────
  {
    id: "nike-air-max-excee",
    name: "Nike Air Max Excee",
    description:
      "Basket signature Nike combinant un mesh respirant et la semelle Air Max emblématique pour un amorti tout-terrain.",
    basePrice: 159.99,
    category: "sport",
    featured: true,
    images: [img("Nike Baskets Air Max Excee pour homme.webp")],
    variants: variantesPourCouleur({
      prefix: "air-max-excee-blanc",
      color: "Blanc / Noir",
      price: 159.99,
      image: img("Nike Baskets Air Max Excee pour homme.webp"),
    }),
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
      img("81CV1HC0zeL._AC_SY575_.webp"),
      img("81J6x6PHdhL._AC_SY575_.webp"),
      img("81JDQAOfA+L._AC_SY695_.webp"),
      img("81YqUJfbyHL._AC_SY575_.webp"),
      img("81NURTtWFhL._AC_SY575_.webp"),
      img("81ZtZIbdaFL._AC_SY575_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ziitop-rose",
        color: "Rose",
        price: 84.99,
        image: img("81CV1HC0zeL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-violet-turquoise",
        color: "Violet / Turquoise",
        price: 84.99,
        image: img("81J6x6PHdhL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-multicolore",
        color: "Multicolore néon",
        price: 89.99,
        image: img("81JDQAOfA+L._AC_SY695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge",
        color: "Rouge",
        price: 84.99,
        image: img("81YqUJfbyHL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-vert-noir",
        color: "Vert / Noir",
        price: 84.99,
        image: img("81NURTtWFhL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ziitop-rouge-noir",
        color: "Rouge / Noir",
        price: 84.99,
        image: img("81ZtZIbdaFL._AC_SY575_.webp"),
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
      img("71zaQAZDV4L._AC_SX695_.webp"),
      img("818nWDrqR+L._AC_SX695_.webp"),
      img("81bIqXyl89L._AC_SY695_.webp"),
      img("81eErFFq8wS._AC_SY695_.webp"),
      img("81K+PfdxfqL._AC_SY575_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "kricely-orange",
        color: "Orange / Noir",
        price: 99.0,
        image: img("71zaQAZDV4L._AC_SX695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-jaune",
        color: "Jaune / Noir",
        price: 99.0,
        image: img("818nWDrqR+L._AC_SX695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-gris",
        color: "Gris / Orange",
        price: 99.0,
        image: img("81bIqXyl89L._AC_SY695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-camo",
        color: "Camouflage",
        price: 104.0,
        image: img("81eErFFq8wS._AC_SY695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "kricely-tiedye",
        color: "Tie & Dye",
        price: 104.0,
        image: img("81K+PfdxfqL._AC_SY575_.webp"),
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
      img("410kJJ1FjOL._AC_SY695_.webp"),
      img("51eRlh5UIoL._AC_SY575_.webp"),
      img("71i11O1W6fL._AC_SY575_.webp"),
      img("71ZIrGcZcJL._AC_SY575_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "shox-blanc-noir",
        color: "Blanc / Noir",
        price: 189.99,
        image: img("410kJJ1FjOL._AC_SY695_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-noir-orange",
        color: "Noir / Orange",
        price: 189.99,
        image: img("51eRlh5UIoL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-noir-rouge",
        color: "Noir / Rouge",
        price: 189.99,
        image: img("71i11O1W6fL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "shox-argent",
        color: "Gris / Argent",
        price: 189.99,
        image: img("71ZIrGcZcJL._AC_SY575_.webp"),
      }),
    ],
  },
  {
    id: "jordan-max-aura",
    name: "Air Jordan Max Aura",
    description:
      "Hommage à la Air Jordan III avec une unité Air Max sous le talon et une tige cuir/synthétique.",
    basePrice: 169.0,
    category: "sport",
    images: [
      img("515bNfrzprS._AC_SY625_.webp"),
      img("71S4rltY6SL._AC_SX575_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "jordan-gris-loup",
        color: "Gris loup",
        price: 169.0,
        image: img("515bNfrzprS._AC_SY625_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "jordan-blanc-rouge",
        color: "Blanc / Noir / Rouge",
        price: 174.0,
        image: img("71S4rltY6SL._AC_SX575_.webp"),
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
      img("81Ek7gVA2oL._AC_SY575_.webp"),
      img("81u+HyGq1rL._AC_SY575_.webp"),
      img("81v5oPsQ0cL._AC_SY625_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ux-noir",
        color: "Noir total",
        price: 74.99,
        image: img("81Ek7gVA2oL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ux-gris",
        color: "Gris",
        price: 74.99,
        image: img("81u+HyGq1rL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ux-rouge",
        color: "Rouge / Noir",
        price: 74.99,
        image: img("81v5oPsQ0cL._AC_SY625_.webp"),
      }),
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CASUAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "sock-sneaker-confort",
    name: "Sock Sneaker Confort",
    description:
      "Basket chaussette ultra-souple, enfilage facile et maintien de la cheville. Parfaite au quotidien.",
    basePrice: 59.99,
    category: "casual",
    images: [
      img("81FcWznZMqL._AC_SY575_.webp"),
      img("81ZR-1wCUFL._AC_SY625_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "sock-gris",
        color: "Gris",
        price: 59.99,
        image: img("81FcWznZMqL._AC_SY575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "sock-navy",
        color: "Bleu marine",
        price: 59.99,
        image: img("81ZR-1wCUFL._AC_SY625_.webp"),
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
    images: [img("new-pair-white-sneakers-isolated-white.webp")],
    variants: variantesPourCouleur({
      prefix: "sneaker-urbain-blanc",
      color: "Blanc",
      price: 119.99,
      image: img("new-pair-white-sneakers-isolated-white.webp"),
    }),
  },
  {
    id: "slip-on-canvas",
    name: "Slip-on Canvas",
    description:
      "Slip-on en toile résistante, à enfiler sans lacets. Légère, polyvalente, pensée pour les beaux jours.",
    basePrice: 49.99,
    category: "casual",
    images: [
      img("71Th7ySnVkL._AC_SY625_.webp"),
      img("812tSN-XdBL._AC_SY625_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "slipon-blanc",
        color: "Blanc",
        price: 49.99,
        image: img("71Th7ySnVkL._AC_SY625_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "slipon-olive",
        color: "Vert olive",
        price: 49.99,
        image: img("812tSN-XdBL._AC_SY625_.webp"),
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
      img("61-ZeKuVaLL._AC_SX575_.webp"),
      img("715Dr9uiGlL._AC_SX575_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "chunky-blanc",
        color: "Blanc",
        price: 89.0,
        image: img("61-ZeKuVaLL._AC_SX575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "chunky-noir",
        color: "Noir",
        price: 89.0,
        image: img("715Dr9uiGlL._AC_SX575_.webp"),
      }),
    ],
  },
  {
    id: "nike-ebernon-low",
    name: "Nike Ebernon Low",
    description:
      "Basket low cuir au design épuré, classique intemporel pour la ville. Disponible en noir ou blanc.",
    basePrice: 109.99,
    category: "casual",
    featured: true,
    images: [
      img("51H81y1a2+L._AC_SX575_.webp"),
      img("61cVdDNXEgL._AC_SY695_.webp"),
    ],
    variants: [
      ...variantesPourCouleur({
        prefix: "ebernon-noir",
        color: "Noir",
        price: 109.99,
        image: img("51H81y1a2+L._AC_SX575_.webp"),
      }),
      ...variantesPourCouleur({
        prefix: "ebernon-blanc",
        color: "Blanc",
        price: 109.99,
        image: img("61cVdDNXEgL._AC_SY695_.webp"),
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
    images: [img("jeffjuit-shoes-1011596_1920.webp")],
    variants: variantesPourCouleur({
      prefix: "bottines-cuir-brun",
      color: "Brun",
      price: 179.0,
      image: img("jeffjuit-shoes-1011596_1920.webp"),
      stockParTaille: 3,
    }),
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
    images: [img("derby-shoes-men-formal-wear.webp")],
    variants: variantesPourCouleur({
      prefix: "derby-noir",
      color: "Noir",
      price: 149.0,
      image: img("derby-shoes-men-formal-wear.webp"),
      stockParTaille: 3,
    }),
  },
  {
    id: "oxford-brogue-cognac",
    name: "Oxford Brogue Cognac",
    description:
      "Oxford brogue cuir cognac, perforations décoratives. Apporte une touche de caractère aux tenues classiques.",
    basePrice: 159.0,
    category: "elegant",
    featured: true,
    images: [img("tylermike525-oxford-shoes-6078993_1920.webp")],
    variants: variantesPourCouleur({
      prefix: "oxford-brogue-cognac",
      color: "Cognac",
      price: 159.0,
      image: img("tylermike525-oxford-shoes-6078993_1920.webp"),
    }),
  },
];

/** Sélection mise en avant sur la page d'accueil (section "Vedettes"). */
export const featuredProducts = products.filter((p) => p.featured);
