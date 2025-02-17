/* eslint-disable react/prop-types */
import { assets } from "@/assets/images";
import { LiaSpinnerSolid } from "react-icons/lia";

const SearchResultSection = ({ result, loading, value }) => {
  return (
    <>
      {((loading && result && result.length > 0) || value !== "") && (
        <div className="absolute bg-white mt-2 flex flex-col w-full shadow rounded-2xl z-20 p-1">
          {loading && (
            <div className="flex items-center gap-2 justify-center p-2">
              <LiaSpinnerSolid className="animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          )}
          {!loading &&
            result.length > 0 &&
            result.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 grow hover:bg-gray-100 rounded-2xl cursor-pointer"
                >
                  <img
                    src={assets.Watch}
                    className="size-16 object-cover rounded-2xl"
                    alt=""
                  />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <span className="text-sm">{item.price}</span>
                  </div>
                </div>
              );
            })}
          {!loading && result.length == 0 && value !== "" && (
            <div className="p-2 text-sm text-center">No results found.</div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResultSection;
