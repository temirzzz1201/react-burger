import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
