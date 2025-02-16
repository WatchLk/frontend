import { assets } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const categories = [
    {
      name: "Men's Collection",
      image: assets.men,
    },
    {
      name: "Women's Collection",
      image: assets.women,
    },
    {
      name: "Kids' Collection",
      image: assets.kids,
    },
    {
      name: "Smart Watches",
      image: assets.Hero,
    },
  ];
  return (
    <div className="max-w-7xl m-auto mt-2 md:mt-4">
      <div className="grid max-h-screen md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => {
          return (
            <Link
              key={index}
              className={`relative rounded-2xl flex overflow-hidden group
                ${
                  index === 0
                    ? "md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-2"
                    : index === 1
                    ? "md:col-span-1 md:row-span-1 lg:col-span-2"
                    : "md:col-span-1 md:row-span-1"
                }`}
            >
              <div
                className={`grow bg-gradient-to-r flex items-center p-8
                    ${
                      index === 0
                        ? "from-orange-50 to-orange-100 lg:p-10"
                        : index === 1
                        ? "from-pink-50 to-pink-50"
                        : index === 2
                        ? "from-yellow-50 to-yellow-100"
                        : "from-green-50 to-green-100"
                    }
                    `}
              >
                <img
                  src={category.image}
                  
                  alt={category.name}
                  className={`h-full absolute object-cover right-0 lg:right-[-8%] z-0 group-hover:scale-125 transition-all
                    ${index === 3 ? "!size-38 !right-0" : ""}`}
                />
                <div
                  className={`
                    flex flex-col gap-1 items-start
                    z-10 max-w-[50%]
                    ${
                      index === 0
                        ? "lg:self-end"
                        : index === 1
                        ? ""
                        : "lg:self-start"
                    }`}
                >
                  <h2
                    className={`
                        font-bold
                        text-2xl md:text-3xl
                        ${index === 0 ? "lg:text-5xl" : index === 1? "lg:text-4xl": ""}`}
                  >
                    {category.name}
                  </h2>
                  <Button
                    variant="primary"
                    size=""
                    className="bg-transparent border-black border rounded-full mt-4 p-5 group"
                  >
                    <span>Shop Now</span>
                    {/* <ArrowRight className="!size-6 rotate-[-45deg] group-hover:rotate-0 transition-all duration-300" /> */}
                  </Button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
