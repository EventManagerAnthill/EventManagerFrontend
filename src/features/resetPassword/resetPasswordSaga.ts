import { put, call, takeLatest } from "redux-saga/effects";
import { resetPasswordSlice } from "./resetPasswordSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./resetPasswordAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { ResetPasswordRequestModel } from "./resetPasswordModel";

export function* resetPasswordSaga() {
    yield takeLatest(resetPasswordSlice.actions.resetPasswordRequested, resetPasswordRequested);
}

function* resetPasswordRequested(action: PayloadAction<ResetPasswordRequestModel>) {
    try {
        const result: string = yield call(Api.postResetPassword, action.payload);

        yield put(routerSlice.actions.routerRedirect('/signin'));

        yield put(resetPasswordSlice.actions.resetPasswordSucceed());
    } catch (e) {
        yield put(resetPasswordSlice.actions.resetPasswordFailed(e))
    }
}