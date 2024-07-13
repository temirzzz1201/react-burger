import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsSlice from "./burgerIngredients";
import burgerConstructorSlice from './burgerConstructor';
import ingredientDetailsSlice from './ingredientDetails';
import orderDetailsSlice from './orderDetails';
import authSlice from "./auth";
import passwordRecoverySlice from "./passwordRecovery";

const store = configureStore({
  reducer: {
    ingredient: burgerIngredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    ingredientsModal: ingredientDetailsSlice,
    order: orderDetailsSlice,
    auth: authSlice,
    passwordRecovery: passwordRecoverySlice,
  },
});

export default store;
