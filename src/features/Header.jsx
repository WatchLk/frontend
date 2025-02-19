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
import SearchResultSection from "./SearchResultSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="bg-white mb-8 md:mb-0">
      <div className="flex items-center justify-between p-5 px-10 max-w-7xl m-auto">
        <Link to={"/"}>
          <h1 className="text-3xl md:text-4xl font-bold">Watch.Lk</h1>
        </Link>
        <div className="hidden md:block relative">
          <SearchBar
            setResult={setResult}
            setLoading={setLoading}
            setValue={setValue}
          />
          <SearchResultSection
            result={result}
            loading={loading}
            value={value}
          />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <LiaShoppingBagSolid size={24} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <div className="flex items-center gap-2">
                <LiaUser size={24} />
                {isLoggedIn && (
                  <div className="hidden md:flex flex-col text-start">
                    <span className="text-xs">Hello,</span>
                    <span className="font-medium">Lahiru Nanayakkara</span>
                  </div>
                )}
                {isLoggedIn && <ChevronDown size={16} />}
                {!isLoggedIn && <Link to={"/sign-in"}>Sign In</Link>}
              </div>
            </DropdownMenuTrigger>
            {isLoggedIn && (
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
            )}
          </DropdownMenu>
        </div>
      </div>
      <div className="relative block mx-10 md:hidden">
        <SearchBar
          setResult={setResult}
          setLoading={setLoading}
          setValue={setValue}
        />
        <SearchResultSection result={result} loading={loading} value={value} />
      </div>
    </header>
  );
};

export default Header;
