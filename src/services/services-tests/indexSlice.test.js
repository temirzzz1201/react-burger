import store from '../index'
import { wsLiveOrderConnecting } from '../actions';

describe('Redux store configuration', () => {
  it('should have the correct initial state', () => {
    const state = store.getState();
    expect(state).toHaveProperty('ingredient');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredientsModal');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('passwordRecovery');
    expect(state).toHaveProperty('orderDetails');
    expect(state).toHaveProperty('ordersWebsocket');
    expect(state).toHaveProperty('feedWebsocket');
  });

  it('should handle wsLiveOrderConnecting action correctly', () => {
    store.dispatch(wsLiveOrderConnecting());
    const state = store.getState();
    expect(state.ordersWebsocket.status).toBe('CONNECTING...');
  });
});
