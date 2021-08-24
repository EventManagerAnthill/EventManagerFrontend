import { put, call, takeLatest } from "redux-saga/effects";
import { signUpSlice } from "./signUpSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./signUpAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./signUpData";
import { SignUpModel, UserModel } from "./signUpModel";
import { mapToRequestModel } from "./signUpMapper";

export function* signUpSaga() {
    yield takeLatest(signUpSlice.actions.signUpRequested, signUpRequested);
}

function* signUpRequested(action: PayloadAction<SignUpModel>) {
    try {
        const data: UserData = yield call(Api.postSignUp, mapToRequestModel(action.payload));
        const model: UserModel = { ...data };

        yield put(routerSlice.actions.routerRedirect('/signin'));

        yield put(signUpSlice.actions.signUpSucceed());
    } catch (e) {
        yield put(signUpSlice.actions.signUpFailed(e))
    }
}