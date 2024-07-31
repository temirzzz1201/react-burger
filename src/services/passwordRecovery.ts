import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordRecoveryState {
  fromForgotPassword: boolean;
  redirectPath: string | null;
}

const initialState: PasswordRecoveryState = {
  fromForgotPassword: JSON.parse(localStorage.getItem('fromForgotPassword') || 'false'),
  redirectPath: null,
};

const passwordRecoverySlice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setFromForgotPassword: (state, action: PayloadAction<boolean>) => {
      state.fromForgotPassword = action.payload;
      localStorage.setItem('fromForgotPassword', JSON.stringify(action.payload));
    },
  },
});

export const { setFromForgotPassword } = passwordRecoverySlice.actions;
export default passwordRecoverySlice.reducer;