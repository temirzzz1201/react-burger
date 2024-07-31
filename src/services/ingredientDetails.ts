import { createSlice } from '@reduxjs/toolkit';

type TIngredientDetailsSlice = {
  isOpen: boolean
}

const initialState: TIngredientDetailsSlice = {
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
