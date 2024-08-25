import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type CategoryResponse = string;

type CategoriesState = {
  categories: CategoryResponse[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = (await response.json()) as CategoryResponse[];
    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<CategoryResponse[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error?.message as string) || null;
      });
  },
});

export default categoriesSlice.reducer;
