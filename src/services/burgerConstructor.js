import { createSlice } from '@reduxjs/toolkit';
import { addIngredient, removeIngredient, moveIngredient, updateIngredientCount } from '../services/actions';

const initialState = {
  bun: null,
  ingredients: [],
  ingredientCounts: {}, 
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIngredient, (state, action) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
          if (!state.ingredientCounts[ingredient._id]) {
            state.ingredientCounts[ingredient._id] = 0;
          }
          state.ingredientCounts[ingredient._id]++;
        }
      })
      .addCase(removeIngredient, (state, action) => {
        const index = state.ingredients.findIndex(ingredient => ingredient.uniqueId === action.payload);
        if (index !== -1) {
          const ingredient = state.ingredients[index];
          state.ingredients.splice(index, 1);
          state.ingredientCounts[ingredient._id]--;
          if (state.ingredientCounts[ingredient._id] === 0) {
            delete state.ingredientCounts[ingredient._id];
          }
        }
      })
      .addCase(moveIngredient, (state, action) => {
        const { dragIndex, hoverIndex } = action.payload;
        const dragItem = state.ingredients[dragIndex];
        if (!dragItem) return; 
        
        if (dragItem.type === 'bun') return;
        
        state.ingredients.splice(dragIndex, 1);
        state.ingredients.splice(hoverIndex, 0, dragItem);
      })
      .addCase(updateIngredientCount, (state, action) => {
        const { _id, count } = action.payload;
        state.ingredientCounts[_id] = count;
      });
  },
});

export default burgerConstructorSlice.reducer;
