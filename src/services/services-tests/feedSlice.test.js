import feedReducer from '../feed';
import { wsFeedTableConnecting, wsFeedTableOpen, wsFeedTableError, wsFeedTableMessage } from '../actions';

describe('feed reducer', () => {
  const initialState = {
    status: 'OFFLINE',
    feedOrders: null,
    error: '',
  };

  it('should handle initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle wsFeedTableConnecting', () => {
    const state = feedReducer(initialState, wsFeedTableConnecting());
    expect(state.status).toBe('CONNECTING...');
  });

  it('should handle wsFeedTableOpen', () => {
    const state = feedReducer(initialState, wsFeedTableOpen());
    expect(state.status).toBe('ONLINE');
    expect(state.error).toBe('');
  });

  it('should handle wsFeedTableError', () => {
    const action = { type: wsFeedTableError.type, payload: 'Connection error' };
    const state = feedReducer(initialState, action);
    expect(state.status).toBe('OFFLINE');
    expect(state.error).toBe('Connection error');
  });

  it('should handle wsFeedTableMessage', () => {
    const action = { type: wsFeedTableMessage.type, payload: { orders: [] } };
    const state = feedReducer(initialState, action);
    expect(state.feedOrders).toEqual({ orders: [] });
  });
});
