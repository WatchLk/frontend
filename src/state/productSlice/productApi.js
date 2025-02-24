const baseUrl = "https://localhost:7001/api/Product";

export const getProducts = async (
  search = null,
  categoryId = null,
  brandId = null,
  sortBy = null,
  orderBy = null,
  page = 1,
  pageSize = 10
) => {
  try {
    const queryParams = new URLSearchParams();
    if (search && search.trim() !== "") queryParams.append("search", search);
    if (categoryId && typeof categoryId === "number")
      queryParams.append("categoryId", categoryId);
    if (brandId) queryParams.append("brandId", brandId);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (orderBy) queryParams.append("orderBy", orderBy);
    queryParams.append("page", page);
    queryParams.append("pageSize", pageSize);

    const res = await fetch(`${baseUrl}?${queryParams.toString()}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data.succeeded) {
      throw new Error(data.error);
    }
    return data.result;
  } catch (error) {
    throw new Error(error.message || "An unknown error occurred");
  }
};
