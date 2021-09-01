import { put, call, takeLatest } from "redux-saga/effects";
import { signUpSlice } from "./signUpSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./signUpAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { SignUpModel } from "./signUpModel";
import { mapToRequestModel } from "./signUpMapper";
import { UserData } from "../user/userData";
import { UserModel } from "../user/userModel";
import { mapToUserModel } from "../user/userMapper";

export function* signUpSaga() {
    yield takeLatest(signUpSlice.actions.signUpRequested, signUpRequested);
}

function* signUpRequested(action: PayloadAction<SignUpModel>) {
    try {
        const data: UserData = yield call(Api.postSignUp, mapToRequestModel(action.payload));
        const model: UserModel = mapToUserModel(data);

        yield put(routerSlice.actions.routerRedirect('/signin'));

        yield put(signUpSlice.actions.signUpSucceed());
    } catch (e) {
        yield put(signUpSlice.actions.signUpFailed(e))
    }
}