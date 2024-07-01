import { createAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INGRIDIENTS_URL, ORDER_URL } from "../../utils/constants";
import { uid } from 'uid';
import axios from "axios";

export const addIngredient = createAction('burgerConstructor/addIngredient', (ingredient) => ({
  payload: { ...ingredient, uniqueId: uid() }
}));

export const removeIngredient = createAction('burgerConstructor/removeIngredient');
export const moveIngredient = createAction('burgerConstructor/moveIngredient');
export const updateIngredientCount = createAction('burgerConstructor/updateIngredientCount');

export const fetchIngredients = createAsyncThunk(
  'ingridient/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(INGRIDIENTS_URL);
      return response.data.success ? response.data.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (ingredients, { rejectWithValue }) => {
    try {
      const response = await axios.post(ORDER_URL, {
        ingredients,
      });
      return response.data.success ? response.data : {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
