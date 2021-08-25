import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { IdentifyFormModel, IdentifyModel } from './identifyModel';


export type IdentifyState = IdentifyFormModel;

const initialState: IdentifyState = {
  identifyModel: {
    email: '',
  },
  isLoading: false,
};

export const identifySlice = createSlice({
  name: 'identify',
  initialState,
  reducers: {
    identifyRequested: (state, action: PayloadAction<IdentifyModel>) => {
      state.isLoading = true;
      state.identifyModel = action.payload;
    },
    identifySucceed: (state) => {
      state.identifyModel.email = '';
      state.isLoading = false;
    },
    identifyFailed: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
    },
  },
});

export const { identifyRequested, identifySucceed, identifyFailed } = identifySlice.actions;

export const selectIdentifyModel = (state: RootState) => state.identifyState.identifyModel;
export const selectIdentifyEmail = (state: RootState) => state.identifyState.identifyModel.email;
export const selectIdentifyIsLoading = (state: RootState) => state.identifyState.isLoading;

export default identifySlice.reducer;
