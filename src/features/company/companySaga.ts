import { put, call, takeLatest } from "redux-saga/effects";
import { companySlice } from "./companySlice";
import { routerSlice } from "../routerSlice";
import * as Api from "./companyAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { CompanyAcceptInvitationModel, CompanyFormModel, CompanyGetModel, CompanyInviteUsersModel, CompanyModel, CompanyNewFormModel, CompanyUploadModel, GetCompaniesModel } from "./companyModel";
import { CompanyData, GetCompaniesData } from "./companyData";
import { mapToCompanyData, mapToCompanyEditData, mapToCompanyModel, mapToCompanyModelArray } from "./companyMapper";
import { BadRequestError } from "../../api/exceptions";
import { snackbarSlice } from "../snackbar/snackbarSlice";

export function* companySaga() {
    yield takeLatest(companySlice.actions.getAllCompaniesByUserRequested, getAllCompaniesByUserRequested);
    yield takeLatest(companySlice.actions.getAllCompaniesByOwnerRequested, getAllCompaniesByOwnerRequested);
    yield takeLatest(companySlice.actions.createCompanyRequested, createCompanyRequested);
    yield takeLatest(companySlice.actions.getCompanyRequested, getCompanyRequested);
    yield takeLatest(companySlice.actions.uploadPhotoRequested, uploadPhotoRequested);
    yield takeLatest(companySlice.actions.editCompanyRequested, editCompanyRequested);
    yield takeLatest(companySlice.actions.deletePhotoRequested, deletePhotoRequested);
    yield takeLatest(companySlice.actions.makeCompanyDelRequested, makeCompanyDelRequested);
    yield takeLatest(companySlice.actions.addUsersCSVRequested, addUsersCSVRequested);
    yield takeLatest(companySlice.actions.inviteUsersRequested, inviteUsersRequested);
    yield takeLatest(companySlice.actions.getLinkToJoinCompanyRequested, getLinkToJoinCompanyRequested);
    yield takeLatest(companySlice.actions.acceptInvitationRequested, acceptInvitationRequested);
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

function* createCompanyRequested(action: PayloadAction<CompanyNewFormModel>) {
    try {
        const data: CompanyData = yield call(Api.createCompany, mapToCompanyData(action.payload.companyModel));
        const model: CompanyModel = mapToCompanyModel(data);

        let param = new URLSearchParams();
        param.append("companyId", String(model.id));

        if (action.payload.companyUploadPhotoModel) {
            yield put(companySlice.actions.uploadPhotoRequested({ ...action.payload.companyUploadPhotoModel, param: param }));
        }

        if (action.payload.companyAddUsersCSVModel) {
            yield put(companySlice.actions.addUsersCSVRequested({ ...action.payload.companyAddUsersCSVModel, param: param }));
        }

        if (action.payload.companyInviteUsersModel) {
            yield put(companySlice.actions.inviteUsersRequested({ ...action.payload.companyInviteUsersModel, companyId: model.id }));
        }

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

function* uploadPhotoRequested(action: PayloadAction<CompanyUploadModel>) {
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

        yield put(routerSlice.actions.routerRedirect(`/company/list`));

        yield put(companySlice.actions.makeCompanyDelSucceed());
    } catch (e) {
        yield put(companySlice.actions.makeCompanyDelFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }))
        }
    }
}

function* addUsersCSVRequested(action: PayloadAction<CompanyUploadModel>) {
    try {
        const result:string = yield call(Api.addUsersCSV, action.payload);

        // yield put(snackbarSlice.actions.snackbarOpen({ message: result, severity: 'error' }));
        yield put(companySlice.actions.addUsersCSVSucceed());
    } catch (e) {
        yield put(companySlice.actions.addUsersCSVFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}

function* inviteUsersRequested(action: PayloadAction<CompanyInviteUsersModel>) {
    try {
        const result:string = yield call(Api.inviteUsers, action.payload);

        yield put(snackbarSlice.actions.snackbarOpen({ message: result, severity: 'success' }));
        yield put(companySlice.actions.inviteUsersSucceed());
    } catch (e) {
        yield put(companySlice.actions.inviteUsersFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}

function* getLinkToJoinCompanyRequested(action: PayloadAction<URLSearchParams>) {
    try {
        const result:string = yield call(Api.getLinkToJoinCompany, action.payload);

        yield put(companySlice.actions.getLinkToJoinCompanySucceed(result));
    } catch (e) {
        yield put(companySlice.actions.getLinkToJoinCompanyFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}

function* acceptInvitationRequested(action: PayloadAction<CompanyAcceptInvitationModel>) {
    try {
        const result:string = yield call(Api.acceptInvitation, action.payload);

        yield put(snackbarSlice.actions.snackbarOpen({ message: result, severity: 'success' }));

        yield put(companySlice.actions.acceptInvitationSucceed());
    } catch (e) {
        yield put(companySlice.actions.acceptInvitationFailed(e))
        if (e instanceof BadRequestError) {
            yield put(snackbarSlice.actions.snackbarOpen({ message: e.message, severity: 'error' }));
        }
    }
}