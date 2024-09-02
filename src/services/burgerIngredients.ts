import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./actions";
import { IBurgerIngredients } from "../types";

export const initialState: IBurgerIngredients = {
  data: [],
  isLoading: false,
  error: null,
};

const burgerIngredientsSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Что то пошло не так';
      });
  },
});

export default burgerIngredientsSlice.reducer;
