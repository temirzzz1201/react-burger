import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { INGRIDIENTS_URL, ORDER_URL } from "../../utils/constants";
import { resetOrderNumber } from '../orderDetails'; 

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
  async (ingredients, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetOrderNumber());
      const response = await axios.post(ORDER_URL, {
        ingredients,
      });
      return response.data.success ? response.data : {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
