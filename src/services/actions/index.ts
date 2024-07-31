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
import { IUser, ISetNewPasswordData, IPlaceOrderPayload } from "../../types";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Произошла ошибка';
  }
  return 'Произошла ошибка';
};

export const fetchIngredients = createAsyncThunk(
  'ingridient/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
    const response = await axios.get(`${BASE_URL}/ingredients`);

      return response.data.success ? response.data.data : [];
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const placeOrder = createAsyncThunk<void, IPlaceOrderPayload>(
  "order/placeOrder",
  async (ingredients, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetOrderNumber());
      const response = await axios.post(`${BASE_URL}/orders`, ingredients );
      
      return response.data.success ? response.data : {};
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const register = createAsyncThunk('auth/register', async (userData: IUser, { rejectWithValue }) => {
  try {
    return await registerUser(userData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});


export const login = createAsyncThunk('auth/login', async (userData: IUser, { rejectWithValue }) => {
  try {
    return await loginUser(userData);
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    return await logoutUser();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email: string, { rejectWithValue }) => {
  try {
    return await resetPasswordRequest(email);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const setNewPassword = createAsyncThunk('auth/setNewPassword', async (data: ISetNewPasswordData, { rejectWithValue }) => {
  try {
    return await setNewPasswordRequest(data);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchUserDetails = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    return await fetchUser();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (userData: IUser, { rejectWithValue }) => {
  try {
    return await updateUserRequest(userData);
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});