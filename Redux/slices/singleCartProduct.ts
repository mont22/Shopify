import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface FetchSingleProductPayload {
  productId: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface SingleProductState {
  products: Record<number, Product>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SingleProductState = {
  products: {},
  status: "idle",
  error: null,
};

export const fetchSingleProduct: any = createAsyncThunk<
  Product,
  FetchSingleProductPayload,
  { dispatch: AppDispatch }
>(
  "singleProduct/fetchSingleProduct",
  async (payload, thunkAPI) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${payload.productId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const singleCardProductSlice = createSlice({
  name: "singleCardProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded";
        state.products[action.payload.id] = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default singleCardProductSlice.reducer;
