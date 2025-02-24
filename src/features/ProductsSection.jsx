import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "@/state/productSlice/productSlice";
import toast from "react-hot-toast";
import { resetAddToCartStatus } from "@/state/cartSlice/cartSlice";

const ProductsSection = () => {
  const { products, productError } = useSelector((state) => state.product);
  const { cartError, addToCartStatus } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsAsync());
      if (productError) {
        toast.error(productError);
      }
    }
  }, []);
  useEffect(() => {
    if (addToCartStatus === "fulfilled") {
      toast.success("Item added to cart");
    } else if (addToCartStatus === "rejected") {
      toast.error(cartError);
    }
  }, [addToCartStatus]);

  useEffect(() => {
    dispatch(resetAddToCartStatus());
  }, [addToCartStatus]);

  return (
    <div className="max-w-7xl m-auto mt-8 md:mt-20">
      <div className="flex flex-col items-center gap-12 md:px-6 lg:px-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center px-4">
          Our Most Popular Models
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row w-full gap-4 md:gap-6">
          {products.length > 0 &&
            products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
        </div>
        <Button variant="link">View All</Button>
      </div>
    </div>
  );
};

export default ProductsSection;
