import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productApi";

const initialState = {
  products: [],
  getProductStatus: "idle",
  productError: null,
};

export const getProductsAsync = createAsyncThunk(
  "product/getProductsAsync",
  async (search, categoryId, brandId, sortBy, orderBy, page, pageSize) => {
    return await getProducts(
      search,
      categoryId,
      brandId,
      sortBy,
      orderBy,
      page,
      pageSize
    );
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAsync.pending, (state) => {
        state.productError = null;
        state.getProductStatus = "pending";
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.getProductStatus = "fulfilled";
        state.productError = null;
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.getProductStatus = "rejected";
        state.productError = action.error.message;
      });
  },
});

export default productSlice.reducer;
