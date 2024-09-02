import passwordRecoveryReducer, { setFromForgotPassword } from '../passwordRecovery';

describe('passwordRecoverySlice reducer', () => {
  const initialState = {
    fromForgotPassword: false,
    redirectPath: null,
  };

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
