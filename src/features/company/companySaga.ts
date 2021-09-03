import { put, call, takeLatest } from "redux-saga/effects";
import { companySlice } from "./companySlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./companyAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { CompanyFormModel, CompanyModel, CompanyUploadPhotoModel } from "./companyModel";
import { CompanyData } from "./companyData";
import moment from "moment";
import { mapToUserModel } from "../user/userMapper";
import { mapToCompanyData, mapToCompanyModel } from "./companyMapper";

export function* companySaga() {
    yield takeLatest(companySlice.actions.getAllCompaniesByUserRequested, getAllCompaniesByUserRequested);
    yield takeLatest(companySlice.actions.createCompanyRequested, createCompanyRequested);
    yield takeLatest(companySlice.actions.getCompanyRequested, getCompanyRequested);
    yield takeLatest(companySlice.actions.uploadPhotoRequested, uploadPhotoRequested);
}

function* getAllCompaniesByUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: CompanyData[] = yield call(Api.getAllCompaniesByUser, action.payload);
        const model = data.map(x => { return { ...x, user: mapToUserModel(x.user!) } });

        yield put(companySlice.actions.getAllCompaniesByUserSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getAllCompaniesByUserFailed(e))
    }
}

function* createCompanyRequested(action: PayloadAction<CompanyFormModel>) {
    try {
        const data: CompanyData = yield call(Api.createCompany, mapToCompanyData(action.payload.companyModel));
        const model: CompanyModel = mapToCompanyModel(data);

        let param = new URLSearchParams();
        param.append("id", String(model.id));

        yield put(companySlice.actions.uploadPhotoRequested({ ...action.payload.companyUploadModel!, param: param }));

        yield put(routerSlice.actions.routerRedirect(`/company/${model.id}`));

        yield put(companySlice.actions.createCompanySucceed(model));
    } catch (e) {
        yield put(companySlice.actions.createCompanyFailed(e))
    }
}

function* getCompanyRequested(action: PayloadAction<number>) {
    try {
        const data: CompanyData = yield call(Api.getCompany, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(companySlice.actions.getCompanySucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getCompanyFailed(e))
    }
}

function* uploadPhotoRequested(action: PayloadAction<CompanyUploadPhotoModel>) {
    try {
        const data: CompanyData = yield call(Api.uploadPhoto, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(companySlice.actions.uploadPhotoSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.uploadPhotoFailed(e))
    }
}