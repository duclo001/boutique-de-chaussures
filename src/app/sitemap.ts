import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
 

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
     
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/produits`,
     
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
     
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produits/${product.id}`,
    
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}


// La page /panier est volontairement absente puisqu’elle est privée et marquée noindex.