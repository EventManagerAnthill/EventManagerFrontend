import { put, call, takeLatest } from "redux-saga/effects";
import { userSlice } from "./userSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./userAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { GetCompanyUsersData, UserData } from "./userData";
import { GetCompanyUsersModel, UserFormModel, UserModel, UserUploadPhotoModel } from "./userModel";
import { mapToUserModel, mapToUpdateData, mapToUpdatePasswordData, mapToUserModelArray } from "./userMapper";
import { BadRequestError } from "../../api/exceptions";
import { snackbarSlice } from "../snackbar/snackbarSlice";

export function* userSaga() {
    yield takeLatest(userSlice.actions.getUserRequested, getUserRequested);
    yield takeLatest(userSlice.actions.updateUserRequested, updateUserRequested);
    yield takeLatest(userSlice.actions.updateUserPasswordRequested, updateUserPasswordRequested);
    yield takeLatest(userSlice.actions.uploadPhotoRequested, uploadPhotoRequested);
    yield takeLatest(userSlice.actions.deletePhotoRequested, deletePhotoRequested);
    yield takeLatest(userSlice.actions.getCompanyUsersRequested, getCompanyUsersRequested);
}

function* getUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: UserData = yield call(Api.getUser, action.payload);
        const model: UserModel = mapToUserModel(data);

        yield put(userSlice.actions.getUserSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.getUserFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}

function* updateUserRequested(action: PayloadAction<UserModel>) {
    try {
        const data: UserData = yield call(Api.updateUser, mapToUpdateData(action.payload), action.payload.id);
        const model: UserModel = mapToUserModel(data);

        yield put(snackbarSlice.actions.snackbarOpen({ message: "Saved successfully", severity: 'success' }));
        yield put(userSlice.actions.updateUserSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.updateUserFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}

function* updateUserPasswordRequested(action: PayloadAction<UserFormModel>) {
    try {
        const data: UserData = yield call(Api.updateUserPassword, mapToUpdatePasswordData(action.payload));
        const model: UserModel = mapToUserModel(data);

        yield put(snackbarSlice.actions.snackbarOpen({ message: "Saved successfully", severity: 'success' }));
        yield put(userSlice.actions.updateUserPasswordSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.updateUserPasswordFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}

function* uploadPhotoRequested(action: PayloadAction<UserUploadPhotoModel>) {
    try {
        const data: UserData = yield call(Api.uploadPhoto, action.payload);
        const model: UserModel = mapToUserModel(data);

        yield put(userSlice.actions.uploadPhotoSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.uploadPhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}

function* deletePhotoRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: UserData = yield call(Api.deletePhoto, action.payload);
        const model: UserModel = mapToUserModel(data);

        yield put(userSlice.actions.deletePhotoSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.deletePhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}

function* getCompanyUsersRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: GetCompanyUsersData = yield call(Api.getCompanyUsers, action.payload);
        const model: GetCompanyUsersModel = { ...data, users: mapToUserModelArray(data.users!) }

        yield put(userSlice.actions.getCompanyUsersSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.getCompanyUsersFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        } 
    }
}