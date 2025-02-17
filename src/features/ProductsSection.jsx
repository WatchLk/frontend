import { products } from "@/resources/products";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const ProductsSection = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(products.slice(0,10));
  }, []);
  return (
    <div className="max-w-7xl m-auto mt-8 md:mt-20">
      <div className="flex flex-col items-center gap-12 md:px-6 lg:px-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center px-4">
          Our Most Popular Models
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row w-full gap-4 md:gap-6">
          {list.length > 0 &&
            list.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
        </div>
        <Button variant="link">View All</Button>
      </div>
    </div>
  );
};

export default ProductsSection;
