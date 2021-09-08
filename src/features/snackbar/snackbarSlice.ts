import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { SnackbarModel, SnackbarOpenModel } from './snackbarModel';

export type SnackbarState = SnackbarModel;

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: "error"
  }

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    snackbarOpen: (state, action: PayloadAction<SnackbarOpenModel>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    snackbarClose: (state) => {
        state.open = false;
      },
  },
});

export const { snackbarOpen, snackbarClose } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbarState;

export default snackbarSlice.reducer;
