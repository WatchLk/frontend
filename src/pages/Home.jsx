import Brands from "@/features/Brands";
import CategorySection from "@/features/CategorySection";
import HeroSection from "@/features/HeroSection";
import ProductsSection from "@/features/ProductsSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
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
