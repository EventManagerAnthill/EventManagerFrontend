import { put, call, takeLatest } from "redux-saga/effects";
import { TokenData } from "./signInData";
import { SignInModel, TokenModel } from "./signInModel";
import { signInSlice} from "./signInSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./signInAPI"; 
import { PayloadAction } from "@reduxjs/toolkit";

export function* signInSaga() {
    yield takeLatest(signInSlice.actions.signInRequested, signInRequested);
}

function* signInRequested(action: PayloadAction<SignInModel>) {
    try {
        const data: TokenData = yield call(Api.postLogin, action.payload);
        const model: TokenModel = { ...data };

        localStorage.setItem('token', JSON.stringify(model));
        yield put(routerSlice.actions.routerRedirect('/'));
        yield put(signInSlice.actions.signInSucceed());
    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}