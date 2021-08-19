import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/state/store';

export interface RouterState {
  redirectTo?: string;
}

const initialState: RouterState = {
  redirectTo: undefined,
};

export const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    routerRedirect: (state, action: PayloadAction<string>) => {
      state.redirectTo = action.payload;
    },
    routerReset: (state) => {
      state.redirectTo = undefined;
    }
  },
});

export const { routerRedirect, routerReset } = routerSlice.actions;

export const selectRouterRedirectTo = (state: RootState) => state.routerState.redirectTo;

export default routerSlice.reducer;
