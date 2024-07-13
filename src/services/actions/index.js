import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import { resetOrderNumber } from '../orderDetails'; 
import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUserRequest,
  resetPasswordRequest,
  setNewPasswordRequest,
} from '../../utils/api';

export const fetchIngredients = createAsyncThunk(
  'ingridient/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/ingredients`);

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
      const response = await axios.post(`${BASE_URL}/orders`, { ingredients });
      return response.data.success ? response.data : {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    return await registerUser(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    return await loginUser(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutUser();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email, { rejectWithValue }) => {
  try {
    return await resetPasswordRequest(email);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const setNewPassword = createAsyncThunk('auth/setNewPassword', async (data, { rejectWithValue }) => {
  try {
    return await setNewPasswordRequest(data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchUserDetails = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    return await fetchUser();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (userData, { rejectWithValue }) => {
  try {
    return await updateUserRequest(userData);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});