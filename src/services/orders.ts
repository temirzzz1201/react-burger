import { createReducer } from '@reduxjs/toolkit';
import { IOrders, WebSocketStatus } from '../types';
import { wsLiveOrderConnecting, wsLiveOrderError, wsLiveOrderMessage, wsLiveOrderOpen } from './actions';

export type LiveOrderStore = {
  status: WebSocketStatus,
  orders:  IOrders | null,
  error: string,
};

const initialState: LiveOrderStore = {
  status: WebSocketStatus.OFFLINE,
  orders: null,
  error: '',
};

const orderSlice = createReducer(initialState, builder => {
  builder.addCase(wsLiveOrderConnecting, (state) => {
    state.status = WebSocketStatus.CONNECTING;
  });
  builder.addCase(wsLiveOrderOpen, (state) => {
    state.status = WebSocketStatus.ONLINE;
    state.error = '';
  });
  builder.addCase(wsLiveOrderError, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.error = action.payload;
  });
  builder.addCase(wsLiveOrderMessage, (state, action) => {
    if (typeof action.payload === 'string') {
      try {
        state.orders = JSON.parse(action.payload);
      } catch (error) {
        state.error = 'Failed to parse data';
      }
    } else {
      state.orders = action.payload;
    }
  });
});

export default orderSlice;
