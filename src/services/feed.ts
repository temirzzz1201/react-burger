import { createReducer } from '@reduxjs/toolkit';
import { IOrders, WebSocketStatus } from '../types';
import { wsFeedTableConnecting, wsFeedTableError, wsFeedTableMessage, wsFeedTableOpen } from './actions';

export type FeedTableStore = {
  status: WebSocketStatus,
  feedOrders: IOrders | null,
  error: string,
};

export const initialState: FeedTableStore = {
  status: WebSocketStatus.OFFLINE,
  feedOrders: null,
  error: '',
};

const feedSlice = createReducer(initialState, builder => {
  builder.addCase(wsFeedTableConnecting, (state) => {
    state.status = WebSocketStatus.CONNECTING;
  });
  builder.addCase(wsFeedTableOpen, (state) => {
    state.status = WebSocketStatus.ONLINE;
    state.error = '';
  });
  builder.addCase(wsFeedTableError, (state, action) => {
    state.status = WebSocketStatus.OFFLINE;
    state.error = action.payload;
  });
  builder.addCase(wsFeedTableMessage, (state, action) => {
    if (typeof action.payload === 'string') {
      try {
        state.feedOrders = JSON.parse(action.payload);
      } catch (error) {
        state.error = 'Failed to parse data';
      }
    } else {
      state.feedOrders = action.payload;
    }
  });
});

export default feedSlice;