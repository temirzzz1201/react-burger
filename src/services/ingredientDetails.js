import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingridientsModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
