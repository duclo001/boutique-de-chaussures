import type { Product } from "@/types/product";

/**
 * Données statiques des produits.
 * Toutes les images proviennent d'Unsplash (libres de droits).
 *
 * NB : Les pages "Catalogue" et "Détail produit" seront branchées
 *      à ces données en Semaine 3. Pour la Semaine 2, on ne consomme
 *      que les produits marqués `featured: true` sur la page d'accueil.
 */
export const products: Product[] = [
  {
    id: "sneaker-urbain-blanc",
    name: "Sneaker Urbain",
    description:
      "Une sneaker minimaliste en cuir lisse, parfaite pour un look quotidien soigné. Semelle confortable et finitions discrètes.",
    basePrice: 119.99,
    category: "casual",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&q=80",
    ],
    variants: [
      {
        id: "sneaker-urbain-blanc-40",
        color: "Blanc",
        size: 40,
        price: 119.99,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
        stock: 5,
      },
      {
        id: "sneaker-urbain-noir-42",
        color: "Noir",
        size: 42,
        price: 124.99,
        image:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900&q=80",
        stock: 3,
      },
    ],
  },
  {
    id: "runner-sport-orange",
    name: "Runner Performance",
    description:
      "Conçue pour la course, cette runner offre un amorti dynamique et une tige respirante. Idéale pour vos entraînements quotidiens.",
    basePrice: 149.0,
    category: "sport",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80",
    ],
    variants: [
      {
        id: "runner-sport-orange-41",
        color: "Orange",
        size: 41,
        price: 149.0,
        image:
          "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=80",
        stock: 4,
      },
      {
        id: "runner-sport-noir-43",
        color: "Noir",
        size: 43,
        price: 149.0,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80",
        stock: 2,
      },
    ],
  },
  {
    id: "derby-cuir-marron",
    name: "Derby en Cuir",
    description:
      "Un classique intemporel pour la ville et le bureau. Cuir véritable patiné et coutures soignées.",
    basePrice: 189.0,
    category: "elegant",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=900&q=80",
    ],
    variants: [
      {
        id: "derby-cuir-marron-42",
        color: "Marron",
        size: 42,
        price: 189.0,
        image:
          "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=900&q=80",
        stock: 6,
      },
      {
        id: "derby-cuir-marron-43",
        color: "Marron",
        size: 43,
        price: 189.0,
        image:
          "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=900&q=80",
        stock: 4,
      },
    ],
  },
  {
    id: "boots-cuir-noir",
    name: "Boots Cuir",
    description:
      "Boots montantes en cuir nubuck, doublure chaude et semelle crantée. Parfaites pour l'automne et l'hiver.",
    basePrice: 169.0,
    category: "ville",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1581803274668-261faa12dca7?w=900&q=80",
    ],
    variants: [
      {
        id: "boots-cuir-noir-41",
        color: "Noir",
        size: 41,
        price: 169.0,
        image:
          "https://images.unsplash.com/photo-1581803274668-261faa12dca7?w=900&q=80",
        stock: 5,
      },
      {
        id: "boots-cuir-marron-43",
        color: "Marron",
        size: 43,
        price: 169.0,
        image:
          "https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?w=900&q=80",
        stock: 3,
      },
    ],
  },
];

/** Récupère les produits mis en avant pour la page d'accueil */
export const featuredProducts = products.filter((p) => p.featured);
