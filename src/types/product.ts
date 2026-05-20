/**
 * Types principaux utilisés dans toute l'application.
 * (Aucune base de données : les données proviennent de fichiers TS/JSON.)
 */

export type Category = "sport" | "ville" | "casual" | "elegant";

export type Variant = {
  /** Identifiant unique (utile pour key React et panier) */
  id: string;
  /** Nom lisible de la couleur (ex. "Noir", "Blanc cassé") */
  color: string;
  /** Pointure (taille européenne) */
  size: number;
  /** Prix spécifique à cette variante */
  price: number;
  /** Image principale affichée quand cette variante est sélectionnée */
  image: string;
  /** Stock disponible — utile pour désactiver une option épuisée */
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  /** Prix de base affiché dans le catalogue (souvent le prix le plus bas) */
  basePrice: number;
  /** Galerie d'images par défaut (utilisée sur la fiche produit) */
  images: string[];
  category: Category;
  variants: Variant[];
  /** Mettre à true pour afficher le produit dans la section vedette */
  featured?: boolean;
};
