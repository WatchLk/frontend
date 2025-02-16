import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import { LiaShoppingBagSolid, LiaUser } from "react-icons/lia";
import { ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="flex items-center justify-between p-5 px-10 max-w-7xl m-auto">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Watch.Lk</h1>
        </div>
        <div className="hidden md:block"><SearchBar /></div>
        <div className="flex items-center gap-4">
          <div>
            <LiaShoppingBagSolid size={24} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <div className="flex items-center gap-2">
                <LiaUser size={24} />
                <div className="hidden md:flex flex-col text-start">
                  <span className="text-xs">Hello,</span>
                  <span className="font-medium">Lahiru Nanayakkara</span>
                </div>
                <ChevronDown size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Cart</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
