/* eslint-disable react/prop-types */
import { assets } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { LiaShoppingBagSolid } from "react-icons/lia";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl">
      <div className="relative rounded-2xl bg-gray-100 p-4">
        <img
          src={assets.Watch}
          alt={product.name}
          className="w-full object-cover"
        />
        <Button className="lg:hidden lg:group-hover:flex absolute top-2 right-2 lg:top-4 lg:right-4 bg-white transition-all" variant="ghost" size="icon">
          <LiaShoppingBagSolid className="" />
        </Button>
      </div>
      <div className="flex flex-col px-2">
        <span className="text-sm font-medium">{product.brand}</span>
        <h4 className="font-medium text-lg">{product.name}</h4>
        <span className="text-sm font-medium text-gray-600">
          {product.categoryId}
        </span>
        <p className="my-1 line-clamp-2 text-[0.95rem] text-gray-600">
          {product.description}
        </p>
        <span className="font-medium text-lg">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
