import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProduitDetail from "@/components/produits/ProduitDetail";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Génère les métadonnées propres à chaque produit.
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Produit introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `/produits/${product.id}`;
  const imageUrl = product.images[0];

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: productUrl,
      siteName: siteConfig.name,
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}

/**
 * Prépare les routes des produits connus pendant la compilation.
 */
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProduitDetailPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const productUrl = `${baseUrl}/produits/${product.id}`;

  const prices = product.variants.map((variant) => variant.price);
  const productIsAvailable = product.variants.some(
    (variant) => variant.stock > 0
  );

  const productImages = product.images.map(
    (image) => new URL(image, baseUrl).toString()
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImages,
    sku: product.id,
    category: product.category,
    url: productUrl,
    offers: {
      "@type": "AggregateOffer",
      url: productUrl,
      priceCurrency: siteConfig.currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.variants.length,
      availability: productIsAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produits",
        item: `${baseUrl}/produits`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      {/* Données structurées du produit. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hiérarchie de navigation de la fiche produit. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ProduitDetail id={id} />
    </>
  );
}
// Ce que Google reçoit
// Pour chaque chaussure, le JSON-LD précise :
// le nom et la description ;
// les images ;
// l’identifiant produit avec sku ;
// la catégorie ;
// l’URL officielle ;
// le prix minimal et maximal ;
// la devise CAD ;
// le nombre de variantes ;
// la disponibilité du produit.
// La protection suivante empêche qu’un caractère < présent dans les données puisse injecter du HTML :
// .replace(/</g, "\\u003c")
