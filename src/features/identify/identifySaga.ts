import { put, call, takeLatest } from "redux-saga/effects";
import { identifySlice } from "./identifySlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./identifyAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { IdentifyModel } from "./identifyModel";

export function* identifySaga() {
    yield takeLatest(identifySlice.actions.identifyRequested, identifyRequested);
}

function* identifyRequested(action: PayloadAction<IdentifyModel>) {
    try {
        const result: string = yield call(Api.postIdentify, action.payload);

        yield put(routerSlice.actions.routerRedirect('/signin'));

        yield put(identifySlice.actions.identifySucceed());
    } catch (e) {
        yield put(identifySlice.actions.identifyFailed(e))
    }
}