import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";

/**
 * Page d'accueil.
 * Composée de sections autonomes et réutilisables :
 *   - Hero (mise en valeur visuelle + CTA)
 *   - FeaturedProducts (produits en vedette)
 *   - Categories (exploration par style)
 *   - AboutSection (présentation de la boutique)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <AboutSection />
    </>
  );
}
