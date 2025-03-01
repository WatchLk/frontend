import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "./SearchBar";
import { LiaUser } from "react-icons/lia";
import { ChevronDown } from "lucide-react";
import SearchResultSection from "./SearchResultSection";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/state/authSlice/authSlice";
import { resetCart } from "@/state/cartSlice/cartSlice";
import Cart from "./Cart";

const Header = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleSignOut = () => {
    ref.current.click();
    dispatch(signOut());
    dispatch(resetCart());
  };

  return (
    <header className="bg-white dark:bg-slate-900 dark:text-white mb-8 md:mb-0">
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
            <Cart />
          </div>

          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" ref={ref}>
                <div className="flex items-center gap-2">
                  <LiaUser size={24} />
                  <div className="hidden md:flex flex-col text-start">
                    <span className="text-xs">Hello,</span>
                    <span className="font-medium">
                      {currentUser.firstName + " " + currentUser.lastName}
                    </span>
                  </div>
                  <ChevronDown size={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 divide-y-[1px] divide-accent space-y-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup className="pb-1">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Cart</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {currentUser === null && <Link to={"/auth/signin"}>Sign In</Link>}
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
