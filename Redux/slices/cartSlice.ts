// src/features/cart/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ProductInCart {
  productId: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  userId: number;
  date: string;
  products: ProductInCart[];
}

interface CartState {
  cart: CartItem | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  status: "idle",
  error: null,
};


// Thunk to fetch cart items
export const fetchCartItems: any = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId: number) => {
    const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }
    const data = (await response.json()) as CartItem[];
    return data[0]; 
  }
);

const cartSlice = createSlice({
  name: "cartList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          state.status = "succeeded";
          state.cart = action.payload;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default cartSlice.reducer;
