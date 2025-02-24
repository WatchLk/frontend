import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { syncCart } from "./cartApi";

const initialState = {
  cart: [],
  cartTotal: 0,
  cartError: null,
  addToCartStatus: "idle",
  syncCartStatus: "idle",
  updateCartStatus: "idle",
  removeFromCartStatus: "idle",
  clearCartStatus: "idle",
};

export const syncCartAsync = createAsyncThunk(
  "cart/syncCartAsync",
  async (props) => {
    return await syncCart(props);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((c) => c.name === item.name);
      if (existingItem) {
        state.cartError = "Item already in the cart";
        state.addToCartStatus = "rejected";
        return;
      }
      state.cartError = null;
      state.cart.push(item);
      state.addToCartStatus = "fulfilled";
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cart = state.cart.filter((c) => c.name !== item.name);
    },
    resetCart: (state) => {
      state.cart = [];
      state.cartError = null;
      state.cartTotal = 0;
    },
    resetSyncCartStatus: (state) => {
      state.syncCartStatus = "idle";
    },
    resetAddToCartStatus: (state) => {
      state.addToCartStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartAsync.pending, (state) => {
        state.syncCartStatus = "pending";
        state.cartError = null;
      })
      .addCase(syncCartAsync.fulfilled, (state, action) => {
        state.syncCartStatus = "fulfilled";
        state.cart = action.payload.result;
        state.cartError = null;
      })
      .addCase(syncCartAsync.rejected, (state, action) => {
        state.syncCartStatus = "rejected";
        state.cartError = action.error.message;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  resetSyncCartStatus,
  resetAddToCartStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
