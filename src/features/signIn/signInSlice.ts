import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SignInState {
  email: string;
  password: string;
  isLoading: boolean;
}

const initialState: SignInState = {
  email: '',
  password: '',
  isLoading: false,
};

export const incrementAsync = createAsyncThunk(
  'signIn/submitSignIn',
  async (amount: number) => {
    // const response = await fetchCount(amount);
    // return response.data;
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    requested: (state) => {
      state.isLoading = true; 
    },
  },
  extraReducers: (builder) => {
  },
});

export const {} = signInSlice.actions;

export const selectEmail = (state: RootState) => state.signIn.email;
export const selectPassword = (state: RootState) => state.signIn.password;

export default signInSlice.reducer;
