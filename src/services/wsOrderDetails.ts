import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrderDetails } from './actions';
import { IWsOrder } from '../types';

interface OrderDetailsState {
  order: IWsOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderDetailsState = {
  order: null,
  loading: false,
  error: null,
};

const wsOrderDetails = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action: PayloadAction<IWsOrder>) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Произошла неизвестная ошибка';
        state.loading = false;
      });
  },
});

export default wsOrderDetails.reducer;