import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Categories from "@/components/home/Categories";
import AboutSection from "@/components/home/AboutSection";
import type { Category } from "@/types/product";

type HomeProps = {
  setPage: (page: string) => void;
  setSelectedProductId: (id: string) => void;
  setSelectedCategory: (cat: Category | "tous") => void;
};

/**
 * Composant wrapper de la page d'accueil.
 * Redistribue setPage, setSelectedProductId et setSelectedCategory
 * aux sections qui en ont besoin.
 */
export default function Home({ setPage, setSelectedProductId, setSelectedCategory }: HomeProps) {
  return (
    <>
      <Hero setPage={setPage} />
      <FeaturedProducts setPage={setPage} setSelectedProductId={setSelectedProductId} />
      <Categories setPage={setPage} setSelectedCategory={setSelectedCategory} />
      <AboutSection />
    </>
  );
}
