import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { GetCompanyUsersModel, UserFormModel, UserModel, UserUploadPhotoModel } from './userModel';

export type UserState = {
    userForm: UserFormModel;
    companyUsers?: GetCompanyUsersModel;
    isLoading: boolean;
};


const initialState: UserState = {
    userForm: {
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
    },
    companyUsers: undefined,
    isLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.userForm.isLoading = true;
        },
        getUserSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userForm.userModel.id = action.payload.id;
            state.userForm.userModel.lastName = action.payload.lastName;
            state.userForm.userModel.firstName = action.payload.firstName;
            state.userForm.userModel.middleName = action.payload.middleName;
            state.userForm.userModel.birthDate = action.payload.birthDate;
            state.userForm.userModel.email = action.payload.email;
            state.userForm.userModel.phone = action.payload.phone;
            state.userForm.userModel.sex = action.payload.sex;
            state.userForm.userModel.username = action.payload.username;
            state.userForm.userModel.originalFileName = action.payload.originalFileName;
            state.userForm.userModel.serverFileName = action.payload.serverFileName;
            state.userForm.userModel.fotoUrl = action.payload.fotoUrl;

            state.userForm.isLoading = false;
        },
        getUserFailed: (state, action: PayloadAction<unknown>) => {
            state.userForm.isLoading = false;
        },
        updateUserRequested: (state, action: PayloadAction<UserModel>) => {
            state.userForm.isLoading = true;
        },
        updateUserSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userForm.userModel.id = action.payload.id;
            state.userForm.userModel.lastName = action.payload.lastName;
            state.userForm.userModel.firstName = action.payload.firstName;
            state.userForm.userModel.middleName = action.payload.middleName;
            state.userForm.userModel.birthDate = action.payload.birthDate;
            state.userForm.userModel.email = action.payload.email;
            state.userForm.userModel.phone = action.payload.phone;
            state.userForm.userModel.sex = action.payload.sex;
            state.userForm.userModel.username = action.payload.username;
            state.userForm.userModel.originalFileName = action.payload.originalFileName;
            state.userForm.userModel.serverFileName = action.payload.serverFileName;
            state.userForm.userModel.fotoUrl = action.payload.fotoUrl;

            state.userForm.isLoading = false;
        },
        updateUserFailed: (state, action: PayloadAction<unknown>) => {
            state.userForm.isLoading = false;
        },
        updateUserPasswordRequested: (state, action: PayloadAction<UserFormModel>) => {
            state.userForm.isLoading = true;
        },
        updateUserPasswordSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userForm.userModel.id = action.payload.id;
            state.userForm.userModel.lastName = action.payload.lastName;
            state.userForm.userModel.firstName = action.payload.firstName;
            state.userForm.userModel.middleName = action.payload.middleName;
            state.userForm.userModel.birthDate = action.payload.birthDate;
            state.userForm.userModel.email = action.payload.email;
            state.userForm.userModel.phone = action.payload.phone;
            state.userForm.userModel.sex = action.payload.sex;
            state.userForm.userModel.username = action.payload.username;
            state.userForm.userModel.originalFileName = action.payload.originalFileName;
            state.userForm.userModel.serverFileName = action.payload.serverFileName;
            state.userForm.userModel.fotoUrl = action.payload.fotoUrl;

            state.userForm.userPasswordModel.newPassword = '';
            state.userForm.userPasswordModel.confirmNewPassword = '';

            state.userForm.isLoading = false;
        },
        updateUserPasswordFailed: (state, action: PayloadAction<unknown>) => {
            state.userForm.isLoading = false;
        },
        uploadPhotoRequested: (state, action: PayloadAction<UserUploadPhotoModel>) => {
            state.userForm.isLoading = true;
        },
        uploadPhotoSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userForm.userModel = { ...action.payload };

            state.userForm.isLoading = false;
        },
        uploadPhotoFailed: (state, action: PayloadAction<unknown>) => {
            state.userForm.isLoading = false;
        },
        deletePhotoRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.userForm.isLoading = true;
        },
        deletePhotoSucceed: (state, action: PayloadAction<UserModel>) => {
            state.userForm.userModel = { ...action.payload };

            state.userForm.isLoading = false;
        },
        deletePhotoFailed: (state, action: PayloadAction<unknown>) => {
            state.userForm.isLoading = false;
        },
        getCompanyUsersRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
        },
        getCompanyUsersSucceed: (state, action: PayloadAction<GetCompanyUsersModel>) => {
            return {
                ...state,
                companyUsers: action.payload,
                isLoading: false,
            }
        },
        getCompanyUsersFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
    },
});

export const { getUserRequested, getUserSucceed, getUserFailed,
    updateUserRequested, updateUserSucceed, updateUserFailed,
    updateUserPasswordRequested, updateUserPasswordSucceed, updateUserPasswordFailed,
    uploadPhotoRequested, uploadPhotoSucceed, uploadPhotoFailed,
    deletePhotoRequested, deletePhotoSucceed, deletePhotoFailed,
    getCompanyUsersRequested, getCompanyUsersSucceed, getCompanyUsersFailed } = userSlice.actions;

export const selectUserForm = (state: RootState) => state.userState.userForm;
export const selectUserFormId = (state: RootState) => state.userState.userForm.userModel.id;
export const selectUserFormEmail = (state: RootState) => state.userState.userForm.userModel.email;
export const selectUserFormFirstName = (state: RootState) => state.userState.userForm.userModel.firstName;
export const selectUserFormLastName = (state: RootState) => state.userState.userForm.userModel.lastName;
export const selectUserFormfotoUrl = (state: RootState) => state.userState.userForm.userModel.fotoUrl;
export const selectUserFormisLoading = (state: RootState) => state.userState.userForm.isLoading;
export const selectUserisLoading = (state: RootState) => state.userState.isLoading;
export const selectCompanyUsers = (state: RootState) => state.userState.companyUsers;

export default userSlice.reducer;
