import { createSlice } from '@reduxjs/toolkit';
import { uid } from 'uid';

const initialState = {
  bun: null,
  ingredients: [],
  ingredientCounts: {}, 
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action) {
      const ingredient = { ...action.payload, uniqueId: uid() };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
        if (!state.ingredientCounts[ingredient._id]) {
          state.ingredientCounts[ingredient._id] = 0;
        }
        state.ingredientCounts[ingredient._id]++;
      }
    },
    removeIngredient(state, action) {
      const index = state.ingredients.findIndex(ingredient => ingredient.uniqueId === action.payload);
      if (index !== -1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredientCounts[ingredient._id]--;
        if (state.ingredientCounts[ingredient._id] === 0) {
          delete state.ingredientCounts[ingredient._id];
        }
      }
    },
    moveIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      if (!dragItem || dragItem.type === 'bun') return;
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragItem);
    },
    updateIngredientCount(state, action) {
      const { _id, count } = action.payload;
      state.ingredientCounts[_id] = count;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  updateIngredientCount
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
