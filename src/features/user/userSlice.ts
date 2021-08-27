import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { UserModel } from './userModel';

export type UserState = UserModel;

const initialState: UserState = {
    id: 0,
    firstName: "",
    lastName: "",
    middleName: undefined,
    birthDate: undefined,
    email: "",
    phone: undefined,
    sex: undefined,
    username: undefined,
    originalFileName: undefined,
    serverFileName: undefined,
    fotoUrl: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getUserSucceed: (state, action: PayloadAction<UserModel>) => {
            console.log("Reducer: " + action.payload);
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.fotoUrl = action.payload.fotoUrl;
        },
        getUserFailed: (state, action: PayloadAction<Error>) => {
        },
    },
});

export const { getUserRequested, getUserSucceed, getUserFailed } = userSlice.actions;

export const selectUserFirstName = (state: RootState) => state.userState.firstName;
export const selectUserLastName = (state: RootState) => state.userState.lastName;
export const selectUserfotoUrl = (state: RootState) => state.userState.fotoUrl;

export default userSlice.reducer;
