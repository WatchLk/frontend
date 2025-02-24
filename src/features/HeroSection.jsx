import { assets } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="max-w-7xl m-auto mt-2 md:mt-4">
      <div className="flex justify-center items-center p-6 md:p-10 bg-gradient-to-br from-foreground to-primary w-full rounded-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-11/12 h-full">
          <div className="space-y-4">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl  font-bold">
              Timeless Elegence,
              <br />
              Crafted for You
            </h1>
            <p className="text-gray-300 lg:text-lg">
              Lorem ipsum, iusto consequuntur qui quia corrupti ea ut impedit
              odit libero rem assumenda voluptates vero cumque eos accusantium.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white rounded-full mt-4 p-6 group"
            >
              <span>Shop Now</span>
              <ArrowRight className="!size-6 rotate-[-45deg] group-hover:rotate-0 transition-all duration-300" />
            </Button>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <img src={assets.Hero} className="max-w-[18rem] md:max-w-[18rem] lg:max-w-[24rem]" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
