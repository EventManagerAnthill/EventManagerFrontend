import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../../app/state/store';
import { UserFormModel, UserModel } from './userModel';

export type UserState = UserFormModel;

const initialState: UserState = {
    userModel: {
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
    },
    errors: new Map,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getUserSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userModel.id = action.payload.id;
            state.userModel.lastName = action.payload.lastName;
            state.userModel.firstName = action.payload.firstName;
            state.userModel.middleName = action.payload.middleName;
            state.userModel.birthDate = action.payload.birthDate;
            state.userModel.email = action.payload.email;
            state.userModel.phone = action.payload.phone;
            state.userModel.sex = action.payload.sex;
            state.userModel.username = action.payload.username;
            state.userModel.originalFileName = action.payload.originalFileName;
            state.userModel.serverFileName = action.payload.serverFileName;
            state.userModel.fotoUrl = action.payload.fotoUrl;
        },
        getUserFailed: (state, action: PayloadAction<Error>) => {
        },
    },
});

export const { getUserRequested, getUserSucceed, getUserFailed } = userSlice.actions;

export const selectUserFirstName = (state: RootState) => state.userState.userModel.firstName;
export const selectUserLastName = (state: RootState) => state.userState.userModel.lastName;
export const selectUserfotoUrl = (state: RootState) => state.userState.userModel.fotoUrl;

export default userSlice.reducer;
