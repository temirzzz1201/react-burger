import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uid } from "uid";
import { IIngredient, IBurgerConstructorState } from "../types";

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: [],
  ingredientCounts: {},
};

const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<IIngredient>) {
      const ingredient = { ...action.payload, uniqueId: uid() };

      if (ingredient.type === "bun") {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
        if (!state.ingredientCounts[ingredient._id]) {
          state.ingredientCounts[ingredient._id] = 0;
        }
        state.ingredientCounts[ingredient._id]++;
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.uniqueId === action.payload
      );
      if (index !== -1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredientCounts[ingredient._id]--;
        if (state.ingredientCounts[ingredient._id] === 0) {
          delete state.ingredientCounts[ingredient._id];
        }
      }
    },
    moveIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      if (!dragItem || dragItem.type === "bun") return;
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragItem);
    },
    updateIngredientCount(
      state,
      action: PayloadAction<{ _id: string; count: number }>
    ) {
      const { _id, count } = action.payload;
      state.ingredientCounts[_id] = count;
    },
    clearIngredients(state) {
      state.bun = null;
      state.ingredients = [];
      state.ingredientCounts = {};
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  updateIngredientCount,
  clearIngredients,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
