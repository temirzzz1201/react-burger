import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burgerIngredients";
import burgerConstructorSlice from './burgerConstructor';
import ingredientDetailsSlice from './ingredientDetails';
import orderDetailsSlice from './orderDetails';

const store = configureStore({
  reducer: {
    ingredient: burgerIngredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    ingredientsModal: ingredientDetailsSlice,
    order: orderDetailsSlice,
  },
});

export default store;
