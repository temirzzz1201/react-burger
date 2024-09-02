import orderDetailsReducer from '../orderDetails';
import { placeOrder } from '../actions';

describe('orderDetailsSlice reducer', () => {
  const initialState = {
    isLoading: false,
    error: null,
    orderData: null,
  };

  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle resetOrderNumber', () => {
    const state = { ...initialState, orderData: { number: 12345 } };
    expect(orderDetailsReducer(state, { type: 'order/resetOrderNumber' })).toEqual(initialState);
  });

  it('should handle placeOrder.pending', () => {
    expect(orderDetailsReducer(initialState, { type: placeOrder.pending.type })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle placeOrder.fulfilled', () => {
    const payload = { number: 12345 };
    expect(orderDetailsReducer(initialState, { type: placeOrder.fulfilled.type, payload })).toEqual({
      isLoading: false,
      error: null,
      orderData: payload,
    });
  });

  it('should handle placeOrder.rejected with payload', () => {
    const errorMessage = 'Order failed';
    expect(orderDetailsReducer(initialState, { type: placeOrder.rejected.type, payload: errorMessage })).toEqual({
      isLoading: false,
      error: errorMessage,
      orderData: null,
    });
  });

  it('should handle placeOrder.rejected without payload', () => {
    expect(orderDetailsReducer(initialState, { type: placeOrder.rejected.type })).toEqual({
      isLoading: false,
      error: 'Unknown error',
      orderData: null,
    });
  });
});
