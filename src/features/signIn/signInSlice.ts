import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SignInState {
  email: string;
  password: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SignInState = {
  email: '',
  password: '',
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'signIn/fetchSignIn',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    succses
  },
  extraReducers: (builder) => {
  },
});

export const {} = signInSlice.actions;

export const selectEmail = (state: RootState) => state.signIn.email;
export const selectPassword = (state: RootState) => state.signIn.password;

export default signInSlice.reducer;
