import axios from "axios";
import Cookies from 'js-cookie'; 
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
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
import { IUser, ISetNewPasswordData, IPlaceOrderPayload, IOrderData, IWsOrder, IOrders } from "../../types";

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

export const placeOrder = createAsyncThunk<IOrderData, IPlaceOrderPayload, { rejectValue: string }>(
  "order/placeOrder",
  async (ingredients, { rejectWithValue, dispatch }) => {
    try {
      dispatch(resetOrderNumber());
      const token = Cookies.get('accessToken'); 
            
      const config = {
        headers: {
          'Authorization': token 
        }
      };

      const response = await axios.post(`${BASE_URL}/orders`, ingredients, config);
      return response.data.success ? response.data : rejectWithValue("Order placement failed");
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
  } catch (error) {
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

export const fetchOrderDetails = createAsyncThunk<IWsOrder, string, { rejectValue: string }>(
  'orderDetails/fetchOrderDetails',
  async (orderNumber: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/${orderNumber}`
      );
      return response.data.orders[0] as IWsOrder;
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить заказ');
    }
  }
);

const LIVE_ORDER_CONNECT = 'LIVE_ORDER_CONNECT';
export const connectLiveOrder = createAction<string, typeof LIVE_ORDER_CONNECT>(LIVE_ORDER_CONNECT);

export const disconnectLiveOrder = createAction('LIVE_ORDER_DISCONNECT');
export const wsLiveOrderConnecting = createAction('LIVE_ORDER_WS_CONNECTING');
export const wsLiveOrderOpen = createAction('LIVE_ORDER_WS_OPEN');
export const wsLiveOrderClose = createAction('LIVE_ORDER_WS_CLOSE');
export const wsLiveOrderMessage = createAction<IOrders>('LIVE_ORDER_WS_MESSAGE');
export const wsLiveOrderError = createAction<string, 'LIVE_ORDER_WS_ERROR'>('LIVE_ORDER_WS_ERROR');

const FEED_TABLE_CONNECT = 'FEED_TABLE_CONNECT';
export const connectFeedTable = createAction<string, typeof FEED_TABLE_CONNECT>(FEED_TABLE_CONNECT);

export const disconnectFeedTable = createAction('FEED_TABLE_DISCONNECT');
export const wsFeedTableConnecting = createAction('FEED_TABLE_WS_CONNECTING');
export const wsFeedTableOpen = createAction('FEED_TABLE_WS_OPEN');
export const wsFeedTableClose = createAction('FEED_TABLE_WS_CLOSE');
export const wsFeedTableMessage = createAction<IOrders>('FEED_TABLE_WS_MESSAGE');
export const wsFeedTableError = createAction<string, 'FEED_TABLE_WS_ERROR'>('FEED_TABLE_WS_ERROR');