import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fromForgotPassword: JSON.parse(localStorage.getItem('fromForgotPassword')) || false,
  redirectPath: null,
};

const passwordRecoverySlice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setFromForgotPassword: (state, action) => {
      state.fromForgotPassword = action.payload;
      localStorage.setItem('fromForgotPassword', JSON.stringify(action.payload));
    },
  },
});

export const { setFromForgotPassword } = passwordRecoverySlice.actions;
export default passwordRecoverySlice.reducer;
