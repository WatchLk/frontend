import { assets } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Alert from "./Alert";

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="size-15 bg-gray-100 rounded-lg">
        <img
          src={assets.Watch}
          className="w-full object-cover"
          alt={item.name}
        />
      </div>
      <div className="flex flex-col grow">
        <h3 className="text font-medium">{item.name}</h3>
        <span className="text-sm text-slate-600">${item.unitPrice}</span>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className={"size-6 shadow-none"}
          >
            <IoIosRemove />
          </Button>
          <span className="text-sm text-slate-600">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className={"size-6 shadow-none"}
          >
            <IoIosAdd />
          </Button>
        </div>
      </div>
      <div>
        <Alert
          actionName={"Yes"}
          title={"Are you sure?"}
          message={"This will remove the item from your cart"}
          isDanger={true}
        >
          <Button
            variant="ghost"
            size="icon"
            className={
              "size-6 shadow-none text-red-600 hover:bg-red-100 hover:text-red-600"
            }
          >
            <IoClose />
          </Button>
        </Alert>
      </div>
    </div>
  );
};

export default CartItem;
