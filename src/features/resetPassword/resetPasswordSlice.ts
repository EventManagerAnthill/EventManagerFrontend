import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { ResetPasswordFormModel, ResetPasswordRequestModel } from './resetPasswordModel';


export type ResetPasswordState = ResetPasswordFormModel;

const initialState: ResetPasswordState = {
  resetPasswordModel: {
    newPassword: '',
    confirmNewPassword: '',
  },
  errors: new Map,
  isLoading: false,
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    resetPasswordRequested: (state, action: PayloadAction<ResetPasswordRequestModel>) => {
      state.isLoading = true;
      state.resetPasswordModel.newPassword = action.payload.password;
      state.resetPasswordModel.confirmNewPassword = action.payload.password;
    },
    resetPasswordSucceed: (state) => {
      state.resetPasswordModel.newPassword = '';
      state.resetPasswordModel.confirmNewPassword = '';

      state.errors = new Map;
      state.isLoading = false;
    },
    resetPasswordFailed: (state, action: PayloadAction<unknown>) => {
      state.isLoading = false;
    },
  },
});

export const { resetPasswordRequested, resetPasswordSucceed, resetPasswordFailed } = resetPasswordSlice.actions;

export const selectResetPassword = (state: RootState) => state.resetPasswordState;

export default resetPasswordSlice.reducer;
