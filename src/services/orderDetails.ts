import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { placeOrder } from "./actions";
import { IOrderData, IOrderState } from "../types";

export const initialState: IOrderState = {
  isLoading: false,
  error: null,
  orderData: null,
};

const orderDetailsSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderNumber(state) {
      state.orderData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<IOrderData>) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { resetOrderNumber } = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
