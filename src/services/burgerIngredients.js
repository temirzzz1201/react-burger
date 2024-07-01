import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const burgerIngredientsSlice = createSlice({
  name: 'ingridient',
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
        state.error = action.error.message;
      });
  },
});

export default burgerIngredientsSlice.reducer;
