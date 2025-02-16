import { assets } from "@/assets/images";

const Brands = () => {
  const brands = [
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
    {
      name: "Rolex",
      imageUrl: assets.Watch,
    },
  ];

  return (
    <div className="max-w-7xl m-auto my-6 md:my-10">
      <div className="flex flex-col items-center md:flex-row justify-between px-10">
        {brands.length > 0 &&
          brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center gap-2 group">
              <div className="bg-gray-100 rounded-full p-4 flex justify-center items-center size-28">
                <img src={brand.imageUrl} alt={brand.name} className="size-20 object-cover group-hover:size-24 transition-all" />
              </div>
              <span className="font-medium text-lg">{brand.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Brands;
