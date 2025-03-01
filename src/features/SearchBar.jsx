/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { products } from "@/resources/products";
import { getProducts } from "@/state/productSlice/productApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ setResult, setLoading, setValue }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(
    function onSearchValuehange() {
      setValue(searchValue);
      getResult();
    },
    [searchValue, setValue]
  );

  const fetchResult = async (key) => {
    return await getProducts(key);
  };
  const getResult = async () => {
    setLoading(true);
    if (searchValue.trim() === "") {
      setLoading(false);
      return setResult([]);
    }
    try {
      const searchResult = await fetchResult(searchValue.trim());
      const res = searchResult.filter((product) =>
        product.name.toLocaleLowerCase().includes(searchValue.trim())
      );
      setLoading(false);
      setResult(res);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg transition-all"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          alert("Searching...");
        }
      }}
    >
      {/* <select className="focus:outline-hidden">
        <option value="">All</option>
        <option value="">Men</option>
        <option value="">Women</option>
      </select> */}
      <input
        type="text"
        className="focus:outline-hidden placeholder:text-sm ps-1 grow lg:min-w-[250px]"
        name="search"
        placeholder="Search here..."
        autoComplete="off"
        value={searchValue}
        onInput={(e) => {
          setSearchValue(e.target.value.toLowerCase());
        }}
      />
      {/* <button type="submit" className="cursor-pointer bg-black text-white p-2 rounded group">
        <LuSearch className="group-active:scale-90 transition-all" />
      </button> */}
      <Button className="cursor-pointer" variant="" size="icon">
        <LuSearch />
      </Button>
    </form>
  );
};

export default SearchBar;
