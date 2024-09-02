import wsOrderDetailsReducer, {initialState} from '../wsOrderDetails';
import { fetchOrderDetails } from '../actions';

describe('wsOrderDetails reducer', () => {
  it('should return the initial state', () => {
    expect(wsOrderDetailsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fetchOrderDetails.pending', () => {
    expect(wsOrderDetailsReducer(initialState, { type: fetchOrderDetails.pending.type })).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle fetchOrderDetails.fulfilled', () => {
    const payload = { id: 1, name: 'Order 1' };
    expect(wsOrderDetailsReducer(initialState, { type: fetchOrderDetails.fulfilled.type, payload })).toEqual({
      order: payload,
      loading: false,
      error: null,
    });
  });

  it('should handle fetchOrderDetails.rejected with payload', () => {
    const errorMessage = 'Failed to fetch order';
    expect(wsOrderDetailsReducer(initialState, { type: fetchOrderDetails.rejected.type, payload: errorMessage })).toEqual({
      order: null,
      loading: false,
      error: errorMessage,
    });
  });

  it('should handle fetchOrderDetails.rejected without payload', () => {
    expect(wsOrderDetailsReducer(initialState, { type: fetchOrderDetails.rejected.type })).toEqual({
      order: null,
      loading: false,
      error: 'Произошла неизвестная ошибка',
    });
  });
});
