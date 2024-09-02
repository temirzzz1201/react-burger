import passwordRecoveryReducer, { setFromForgotPassword, initialState } from '../passwordRecovery';

describe('passwordRecoverySlice reducer', () => {
  it('should return the initial state', () => {
    expect(passwordRecoveryReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setFromForgotPassword', () => {
    expect(passwordRecoveryReducer(initialState, setFromForgotPassword(true))).toEqual({
      ...initialState,
      fromForgotPassword: true,
    });
  });
});
