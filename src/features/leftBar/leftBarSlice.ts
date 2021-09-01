import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';

export interface LeftBarState {
  isOpen: boolean;
}

const initialState: LeftBarState = {
  isOpen: false,
};

export const leftBarSlice = createSlice({
  name: 'leftBar',
  initialState,
  reducers: {
    leftBarOpen: (state) => {
      state.isOpen = true;
    },
    leftBarClose: (state) => {
        state.isOpen = false;
      },
  },
});

export const { leftBarOpen, leftBarClose } = leftBarSlice.actions;

export const selectLeftBarOpen = (state: RootState) => state.leftBarState.isOpen;

export default leftBarSlice.reducer;
