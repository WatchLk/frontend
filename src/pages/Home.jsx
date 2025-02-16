import Brands from "@/features/Brands";
import CategorySection from "@/features/CategorySection";
import HeroSection from "@/features/HeroSection";

const Home = () => {
  return (
    <div className="px-5">
      <HeroSection />
      <Brands />
      <CategorySection />
    </div>
  );
};

export default Home;
