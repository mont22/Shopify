import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type ProductResponse = {
  id: number;
  title: string;
  category: string;
  description: string;
  rating: { count: number; rate: number };
  price: number;
  image: string;
};

type ProductsState = {
  products: ProductResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = (await response.json()) as ProductResponse[];
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductResponse[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error?.message as string) || null;
      });
  },
});

export default productsSlice.reducer;
