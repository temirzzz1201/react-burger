import authReducer, {initialState} from '../auth';

import { logout, register } from '../actions';

describe('auth reducer', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle register.pending', () => {
    const action = { type: register.pending.type };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle register.fulfilled', () => {
    const action = { type: register.fulfilled.type, payload: { user: { name: 'User' } } };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: action.payload.user,
      isAuthenticated: true,
      error: null,
    });
  });

  it('should handle register.rejected', () => {
    const action = { type: register.rejected.type, payload: 'Error' };
    const state = authReducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false, error: 'Error' });
  });

  it('should handle logout.fulfilled', () => {
    const state = authReducer(
      { ...initialState, isAuthenticated: true, user: { name: 'User' } },
      { type: logout.fulfilled.type }
    );
    expect(state).toEqual({ ...initialState, user: null, isAuthenticated: false });
  });
});