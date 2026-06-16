import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";

/**
 * Composant wrapper de la page d'accueil.
 * Compose les différentes sections ; la navigation se fait via <Link>
 * directement dans chaque section.
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
