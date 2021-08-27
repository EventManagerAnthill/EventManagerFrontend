import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';

export interface LeftBarState {
  open: boolean;
}

const initialState: LeftBarState = {
    open: false,
};

export const leftBarSlice = createSlice({
  name: 'leftBar',
  initialState,
  reducers: {
    leftBarOpen: (state) => {
      state.open = true;
    },
    leftBarClose: (state) => {
        state.open = false;
      },
  },
});

export const { leftBarOpen, leftBarClose } = leftBarSlice.actions;

export const selectLeftBarOpen = (state: RootState) => state.leftBarState.open;

export default leftBarSlice.reducer;
