import orderSlice from '../orders';
import { wsLiveOrderConnecting, wsLiveOrderError, wsLiveOrderMessage, wsLiveOrderOpen } from '../actions';
import { WebSocketStatus } from '../../types';

describe('orderSlice reducer', () => {
  const initialState = {
    status: WebSocketStatus.OFFLINE,
    orders: null,
    error: '',
  };

  it('should return the initial state', () => {
    expect(orderSlice(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle wsLiveOrderConnecting', () => {
    expect(orderSlice(initialState, wsLiveOrderConnecting())).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING,
    });
  });

  it('should handle wsLiveOrderOpen', () => {
    expect(orderSlice(initialState, wsLiveOrderOpen())).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
      error: '',
    });
  });

  it('should handle wsLiveOrderError', () => {
    const error = 'WebSocket Error';
    expect(orderSlice(initialState, wsLiveOrderError(error))).toEqual({
      ...initialState,
      status: WebSocketStatus.OFFLINE,
      error,
    });
  });

  it('should handle wsLiveOrderMessage with valid JSON', () => {
    const orders = { orders: [] };
    const message = JSON.stringify(orders);
    expect(orderSlice(initialState, wsLiveOrderMessage(message))).toEqual({
      ...initialState,
      orders,
    });
  });

  it('should handle wsLiveOrderMessage with invalid JSON', () => {
    const invalidMessage = '{invalidJson}';
    expect(orderSlice(initialState, wsLiveOrderMessage(invalidMessage))).toEqual({
      ...initialState,
      error: 'Failed to parse data',
    });
  });
});
