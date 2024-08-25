export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface Cart {
  userId: number;
  date: string;
  products: CartProduct[];
}

export interface AddToCartResponse {
  // Define the response structure here
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

// cartSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define initial state
const initialState: {
  cart: Cart | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
} = {
  cart: null,
  status: "idle",
  error: null,
};

// Define thunk
export const addToCart = createAsyncThunk<AddToCartResponse, Cart>(
  "cart/addToCart",
  async (cart: Cart) => {
    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });
    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
    return response.json();
  }
);

// Create slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add to cart";
      });
  },
});

export default cartSlice.reducer;
