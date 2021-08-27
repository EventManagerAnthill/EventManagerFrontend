import { put, call, takeLatest } from "redux-saga/effects";
import { userSlice } from "./userSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./userAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./userData";
import { UserModel } from "./userModel";

export function* userSaga() {
    yield takeLatest(userSlice.actions.getUserRequested, getUserRequested);
}

function* getUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: UserData = yield call(Api.getUser, action.payload);
        console.log(data);
        const model: UserModel = { ...data };
        console.log(model);

        yield put(userSlice.actions.getUserSucceed(model));
    } catch (e) {
        yield put(userSlice.actions.getUserFailed(e))
    }
}