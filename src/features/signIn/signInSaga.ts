import { put, call, takeLatest } from "redux-saga/effects";
import { TokenData } from "./signInData";
import { SignInModel, SignInSNModel, TokenModel } from "./signInModel";
import { signInSlice} from "./signInSlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./signInAPI"; 
import { PayloadAction } from "@reduxjs/toolkit";

export function* signInSaga() {
    yield takeLatest(signInSlice.actions.signInRequested, signInRequested);
    yield takeLatest(signInSlice.actions.signInGoogleRequested, signInGoogleRequested);
    yield takeLatest(signInSlice.actions.signInFacebookRequested, signInFacebookRequested);
    yield takeLatest(signInSlice.actions.signInValidateUser, signInValidateUser);
}

function* signInRequested(action: PayloadAction<SignInModel>) {
    try {
        const data: TokenData = yield call(Api.postSignIn, action.payload);
        const model: TokenModel = { ...data };

        localStorage.setItem('token', JSON.stringify(model));
        
        yield put(routerSlice.actions.routerRedirect('/'));

        yield put(signInSlice.actions.signInSucceed());
    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}

function* signInGoogleRequested(action: PayloadAction<SignInSNModel>) {
    try {
        const data: TokenData = yield call(Api.postSignInGoogle, action.payload);
        const model: TokenModel = { ...data };

        localStorage.setItem('token', JSON.stringify(model));
        
        yield put(routerSlice.actions.routerRedirect('/'));

        yield put(signInSlice.actions.signInSucceed());
    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}

function* signInFacebookRequested(action: PayloadAction<SignInSNModel>) {
    try {
        const data: TokenData = yield call(Api.postSignInFacebook, action.payload);
        const model: TokenModel = { ...data };

        localStorage.setItem('token', JSON.stringify(model));
        
        yield put(routerSlice.actions.routerRedirect('/'));

        yield put(signInSlice.actions.signInSucceed());
    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}

function* signInValidateUser(action: PayloadAction<string>) {
    try {
        const result: string = yield call(Api.postValidateUser, action.payload);

    } catch (e) {
        yield put(signInSlice.actions.signInFailed(e))
    }
}