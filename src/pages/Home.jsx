import Brands from "@/features/Brands";
import CategorySection from "@/features/CategorySection";
import HeroSection from "@/features/HeroSection";
import ProductsSection from "@/features/ProductsSection";

const Home = () => {
  return (
    <div className="px-5">
      <HeroSection />
      <Brands />
      <CategorySection />
      <ProductsSection />
    </div>
  );
};

export default Home;
