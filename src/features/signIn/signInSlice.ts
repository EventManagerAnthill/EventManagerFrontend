import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { SignInFormModel, SignInModel, SignInSNModel } from './signInModel';

export type SignInState = SignInFormModel;

const initialState: SignInState = {
  signInModel: {
    email: '',
    password: '',
  },
  isLoading: false,
};

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    signInRequested: (state, action: PayloadAction<SignInModel>) => {
      state.isLoading = true;
      state.signInModel = action.payload;
    },
    signInGoogleRequested: (state, action: PayloadAction<SignInSNModel>) => {
      state.isLoading = true;
    },
    signInFacebookRequested: (state, action: PayloadAction<SignInSNModel>) => {
      state.isLoading = true;
    },
    signInValidateUser: (state, action: PayloadAction<string>) => {
    },
    signInSucceed: (state) => {
      state.signInModel.email = '';
      state.signInModel.password = '';
      state.isLoading = false;
    },
    signInFailed: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
    },
  },
});

export const { signInRequested, signInGoogleRequested, signInFacebookRequested, signInValidateUser, signInSucceed, signInFailed } = signInSlice.actions;

export const selectSignInModel = (state: RootState) => state.signInState.signInModel;
export const selectSignInEmail = (state: RootState) => state.signInState.signInModel.email;
export const selectSignInPassword = (state: RootState) => state.signInState.signInModel.password;
export const selectSignInIsLoading = (state: RootState) => state.signInState.isLoading;

export default signInSlice.reducer;
