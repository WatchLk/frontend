import { Button } from "@/components/ui/button";
import { LuSearch } from "react-icons/lu";

const SearchBar = () => {
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
        className="focus:outline-hidden placeholder:text-sm ps-1 lg:min-w-[250px]"
        name="search"
        placeholder="Search here..."
        autoComplete="off"
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
