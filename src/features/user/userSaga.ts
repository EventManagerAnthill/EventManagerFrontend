import { put, call, takeLatest } from "redux-saga/effects";
import { userSlice } from "./userSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./userAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./userData";
import { UserFormModel, UserModel } from "./userModel";
import { mapToData, mapToModel, mapToUpdateData, mapToUpdatePasswordData } from "./userMapper";

export function* userSaga() {
    yield takeLatest(userSlice.actions.getUserRequested, getUserRequested);
    yield takeLatest(userSlice.actions.updateUserRequested, updateUserRequested);
    yield takeLatest(userSlice.actions.updateUserPasswordRequested, updateUserPasswordRequested);
}

function* getUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: UserData = yield call(Api.getUser, action.payload);
        const model: UserModel = mapToModel(data);

        yield put(userSlice.actions.getUserSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.getUserFailed(e))
    }
}

function* updateUserRequested(action: PayloadAction<UserModel>) {
    try {
        const data: UserData = yield call(Api.updateUser, mapToUpdateData(action.payload), action.payload.id);
        const model: UserModel = mapToModel(data);

        yield put(userSlice.actions.updateUserSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.updateUserFailed(e))
    }
}

function* updateUserPasswordRequested(action: PayloadAction<UserFormModel>) {
    try {
        const data: UserData = yield call(Api.updateUserPassword, mapToUpdatePasswordData(action.payload));
        const model: UserModel = mapToModel(data);

        yield put(userSlice.actions.updateUserPasswordSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.updateUserPasswordFailed(e))
    }
}