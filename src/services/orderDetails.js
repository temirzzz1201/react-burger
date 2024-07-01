import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./actions";

const initialState = {
  orderData: null,
  isLoading: false,
  error: null,
};

const orderDetailsSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderDetailsSlice.reducer;
