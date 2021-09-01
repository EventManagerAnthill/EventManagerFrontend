import { put, call, takeLatest } from "redux-saga/effects";
import { companySlice } from "./companySlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./companyAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { CompanyModel } from "./companyModel";
import { CompanyData } from "./companyData";

export function* companySaga() {
    yield takeLatest(companySlice.actions.getAllCompaniesByUserRequested, getAllCompaniesByUserRequested);
}

function* getAllCompaniesByUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: CompanyData[] = yield call(Api.getAllCompaniesByUser, action.payload);
        const model = data.map(x => { return { ...x } });

        yield put(companySlice.actions.getAllCompaniesByUserSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getAllCompaniesByUserFailed(e))
    }
}