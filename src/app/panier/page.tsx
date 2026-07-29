import Panier from "@/components/panier/Panier";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panier",
  description:
    "Consultez les chaussures ajoutées à votre panier et le résumé de votre commande.",

  robots: {
    index: false,
    follow: false,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": 0,
      "max-image-preview": "none",
      "max-snippet": 0,
    },
  },
};
/** Route `/panier` — panier d'achat. */
export default function PanierPage() {
  return <Panier />;
}
