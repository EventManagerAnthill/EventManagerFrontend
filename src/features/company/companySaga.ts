import { put, call, takeLatest } from "redux-saga/effects";
import { companySlice } from "./companySlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./companyAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { CompanyFormModel, CompanyGetModel, CompanyModel, CompanyUploadPhotoModel, GetCompaniesModel } from "./companyModel";
import { CompanyData, GetCompaniesData } from "./companyData";
import { mapToCompanyData, mapToCompanyEditData, mapToCompanyModel, mapToCompanyModelArray } from "./companyMapper";
import { BadRequestError } from "../../api/exceptions";
import { snackbarSlice } from "../snackbar/snackbarSlice";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/state/store";
import { selectUserId } from "../user/userSlice";

export function* companySaga() {
    yield takeLatest(companySlice.actions.getAllCompaniesByUserRequested, getAllCompaniesByUserRequested);
    yield takeLatest(companySlice.actions.getAllCompaniesByOwnerRequested, getAllCompaniesByOwnerRequested);
    yield takeLatest(companySlice.actions.createCompanyRequested, createCompanyRequested);
    yield takeLatest(companySlice.actions.getCompanyRequested, getCompanyRequested);
    yield takeLatest(companySlice.actions.uploadPhotoRequested, uploadPhotoRequested);
    yield takeLatest(companySlice.actions.editCompanyRequested, editCompanyRequested);
    yield takeLatest(companySlice.actions.deletePhotoRequested, deletePhotoRequested);
    yield takeLatest(companySlice.actions.makeCompanyDelRequested, makeCompanyDelRequested);
}

function* getAllCompaniesByUserRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: GetCompaniesData = yield call(Api.getAllCompaniesByUser, action.payload);
        const model: GetCompaniesModel = { ...data, companies: mapToCompanyModelArray(data.companies!) }

        yield put(companySlice.actions.getAllCompaniesByUserSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getAllCompaniesByUserFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* getAllCompaniesByOwnerRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: GetCompaniesData = yield call(Api.getAllCompaniesByOwner, action.payload);
        const model: GetCompaniesModel = { ...data, companies: mapToCompanyModelArray(data.companies!) }

        yield put(companySlice.actions.getAllCompaniesByOwnerSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getAllCompaniesByOwnerFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
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
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* getCompanyRequested(action: PayloadAction<CompanyGetModel>) {
    try {
        const data: CompanyData = yield call(Api.getCompany, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(companySlice.actions.getCompanySucceed(model));
    } catch (e) {
        yield put(companySlice.actions.getCompanyFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* uploadPhotoRequested(action: PayloadAction<CompanyUploadPhotoModel>) {
    try {
        const data: CompanyData = yield call(Api.uploadPhoto, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(companySlice.actions.uploadPhotoSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.uploadPhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* editCompanyRequested(action: PayloadAction<CompanyModel>) {
    try {
        const data: CompanyData = yield call(Api.editCompany, mapToCompanyEditData(action.payload), action.payload.id);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(routerSlice.actions.routerRedirect(`/company/${model.id}`));

        yield put(companySlice.actions.editCompanySucceed(model));
    } catch (e) {
        yield put(companySlice.actions.editCompanyFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* deletePhotoRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const data: CompanyData = yield call(Api.deletePhoto, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(companySlice.actions.deletePhotoSucceed(model));
    } catch (e) {
        yield put(companySlice.actions.deletePhotoFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* makeCompanyDelRequested(action: PayloadAction<number>) {
    try {
        const data: CompanyData = yield call(Api.makeCompanyDel, action.payload);
        const model: CompanyModel = mapToCompanyModel(data);

        yield put(routerSlice.actions.routerRedirect(`/`));

        yield put(companySlice.actions.makeCompanyDelSucceed());
    } catch (e) {
        yield put(companySlice.actions.makeCompanyDelFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}