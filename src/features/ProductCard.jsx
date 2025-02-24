/* eslint-disable react/prop-types */
import { assets } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/state/cartSlice/cartSlice";
import { useState } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";

const ProductCard = ({ product }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      name: product.name,
      brand: product.brand.name,
      category: product.category.name,
      imageUrl: product.imageURLs[0],
      unitPrice: product.price,
      quantity: 1,
    };

    if (currentUser) {
      return;
    } else {
      dispatch(addToCart(cartItem));
    }
  };

  const isProductInCart = cart.some((item) => item.name === product.name);

  return (
    <div className="group flex flex-col gap-4 rounded-2xl">
      <div className="relative rounded-2xl bg-gray-100 p-4">
        <img
          src={assets.Watch}
          alt={product.name}
          className="w-full object-cover"
        />
        <Button
          className="lg:hidden lg:group-hover:flex absolute top-2 right-2 lg:top-4 lg:right-4 bg-white transition-all"
          variant="ghost"
          size="icon"
          disabled={isProductInCart}
          onClick={() => {
            handleAddToCart();
          }}
        >
          {!isProductInCart && <LiaShoppingBagSolid className="" />}
          {isProductInCart && <FaCircleCheck className="text-green-400" />}
        </Button>
      </div>
      <div className="flex flex-col px-2">
        <span className="text-sm font-medium">{product.brand.name}</span>
        <h4 className="font-medium text-lg">{product.name}</h4>
        <span className="text-sm font-medium text-gray-600">
          {product.category.name}
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
