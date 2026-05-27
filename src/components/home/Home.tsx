import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";

/**
 * Composant wrapper de la page d'accueil.
 * Regroupe toutes les sections pour être importé dans layout.tsx.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <AboutSection />
    </>
  );
}
