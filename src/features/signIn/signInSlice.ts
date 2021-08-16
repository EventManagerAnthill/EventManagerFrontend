import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SignInFormModel, SignInModel } from './SignInModel';

type SignInState = SignInFormModel;

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
    signInSucceed: (state) => {
      state = initialState;
    },
    signInFailed: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
    },
  },
});

export const { signInRequested, signInSucceed, signInFailed } = signInSlice.actions;

export const selectSignIn = (state: RootState) => state.signIn;
export const selectSignInEmail = (state: RootState) => state.signIn.signInModel.email;
export const selectSignInPassword = (state: RootState) => state.signIn.signInModel.password;
export const selectSignInIsLoading = (state: RootState) => state.signIn.isLoading;

export default signInSlice.reducer;
