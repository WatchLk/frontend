import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth);
  const cartTotal = cart.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );
  return (
    <Sheet>
      <SheetTrigger
        asChild
        onClick={() => {
          currentUser == null ? navigate("/auth/signin") : null;
        }}
      >
        <div className="relative cursor-pointer">
          <LiaShoppingBagSolid size={24} />
          {cart.length > 0 && (
            <span
              className="absolute bg-red-500 p-1.5 text-[0.65rem] font-medium text-white rounded-full top-[-50%] right-[-50%]"
              style={{ lineHeight: 0.5 }}
            >
              {cart.length}
            </span>
          )}
        </div>
      </SheetTrigger>
      {currentUser && (
        <SheetContent className={"bg-white"}>
          <SheetHeader>
            <SheetTitle className={"text-2xl font-bold"}>My Cart</SheetTitle>
            <SheetDescription className={"text-slate-600"}>
              Lorem ipsum dolor sit amet.
            </SheetDescription>
          </SheetHeader>
          {/* Content */}
          <div className="px-4 space-y-4 max-h-[60vh] overflow-y-scroll">
            {cart.length > 0 ? (
              cart.map((item, index) => <CartItem key={index} item={item} />)
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
          <div className="px-4 flex justify-between mt-4">
            <span className="text-xl font-medium">Subtotal</span>
            <span className="text-lg font-medium">${cartTotal}</span>
          </div>
          <SheetFooter>
            <SheetClose size="lg" asChild>
              <Button>Go to Checkout</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="outline" size="lg" className="shadow-none">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default Cart;
