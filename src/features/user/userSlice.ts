import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState } from '../../app/state/store';
import { UserFormModel, UserModel, UserUploadPhotoModel } from './userModel';

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
    userPasswordModel: {
        newPassword: "",
        confirmNewPassword: "",
    },
    errors: new Map,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
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

            state.isLoading = false;
        },
        getUserFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        updateUserRequested: (state, action: PayloadAction<UserModel>) => {
            state.isLoading = true;
        },
        updateUserSucceed: (state, action: PayloadAction<UserModel>) => {
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

            state.isLoading = false;
        },
        updateUserFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        updateUserPasswordRequested: (state, action: PayloadAction<UserFormModel>) => {
            state.isLoading = true;
        },
        updateUserPasswordSucceed: (state, action: PayloadAction<UserModel>) => {
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

            state.userPasswordModel.newPassword = '';
            state.userPasswordModel.confirmNewPassword = '';

            state.isLoading = false;
        },
        updateUserPasswordFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        uploadPhotoRequested: (state, action: PayloadAction<UserUploadPhotoModel>) => {
            state.isLoading = true;
        },
        uploadPhotoSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userModel = { ...action.payload };

            state.isLoading = false;
        },
        uploadPhotoFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        deletePhotoRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
        },
        deletePhotoSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userModel = { ...action.payload };

            state.isLoading = false;
        },
        deletePhotoFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
    },
});

export const { getUserRequested, getUserSucceed, getUserFailed,
    updateUserRequested, updateUserSucceed, updateUserFailed,
    updateUserPasswordRequested, updateUserPasswordSucceed, updateUserPasswordFailed,
    uploadPhotoRequested, uploadPhotoSucceed, uploadPhotoFailed,
    deletePhotoRequested, deletePhotoSucceed, deletePhotoFailed } = userSlice.actions;


export const selectUser = (state: RootState) => state.userState;
export const selectUserId = (state: RootState) => state.userState.userModel.id;
export const selectUserEmail = (state: RootState) => state.userState.userModel.email;
export const selectUserFirstName = (state: RootState) => state.userState.userModel.firstName;
export const selectUserLastName = (state: RootState) => state.userState.userModel.lastName;
export const selectUserfotoUrl = (state: RootState) => state.userState.userModel.fotoUrl;
export const selectUserisLoading = (state: RootState) => state.userState.isLoading;

export default userSlice.reducer;
