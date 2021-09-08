import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { CompanyFormModel, CompanyGetModel, CompanyModel, CompanyUploadPhotoModel, GetCompaniesModel } from './companyModel';


export type CompanyState = {
    companyNew: CompanyFormModel;
    companyEdit: CompanyFormModel;
    company?: CompanyModel;
    companiesByUser?: GetCompaniesModel;
    companiesByOwner?: GetCompaniesModel;
};

const initialState: CompanyState = {
    companyNew: {
        companyModel: {
            id: undefined,
            name: "",
            userId: 0,
            user: undefined,
            type: 1,
            description: undefined,
            del: undefined,
            originalFileName: undefined,
            serverFileName: undefined,
            fotoUrl: undefined,
            userRole: undefined,
        },
        errors: new Map,
        isLoading: false,
        companyUploadModel: undefined,
    },
    companyEdit: {
        companyModel: {
            id: undefined,
            name: "",
            userId: 0,
            user: undefined,
            type: 0,
            description: undefined,
            del: undefined,
            originalFileName: undefined,
            serverFileName: undefined,
            fotoUrl: undefined,
            userRole: undefined,
        },
        errors: new Map,
        isLoading: false,
        companyUploadModel: undefined,
    },
    company: undefined,
    companiesByUser: undefined,
    companiesByOwner: undefined,
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        getAllCompaniesByUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getAllCompaniesByUserSucceed: (state, action: PayloadAction<GetCompaniesModel>) => {
            return { ...state, companiesByUser: action.payload }
        },
        getAllCompaniesByUserFailed: (state, action: PayloadAction<unknown>) => {
        },
        getAllCompaniesByOwnerRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getAllCompaniesByOwnerSucceed: (state, action: PayloadAction<GetCompaniesModel>) => {
            return { ...state, companiesByOwner: action.payload }
        },
        getAllCompaniesByOwnerFailed: (state, action: PayloadAction<unknown>) => {
        },
        createCompanyRequested: (state, action: PayloadAction<CompanyFormModel>) => {
            state.companyNew.companyModel = { ...action.payload.companyModel };
            state.companyNew.isLoading = true;
        },
        createCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.companyNew.companyModel = { ...initialState.companyNew.companyModel };
            state.companyNew.isLoading = false;
            state.companyNew.errors = new Map;

            state.company = { ...action.payload };
        },
        createCompanyFailed: (state, action: PayloadAction<unknown>) => {
            state.companyNew.isLoading = false;
        },
        getCompanyRequested: (state, action: PayloadAction<CompanyGetModel>) => {
        },
        getCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
        },
        getCompanyFailed: (state, action: PayloadAction<unknown>) => {
        },
        uploadPhotoRequested: (state, action: PayloadAction<CompanyUploadPhotoModel>) => {
        },
        uploadPhotoSucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
        },
        uploadPhotoFailed: (state, action: PayloadAction<unknown>) => {
        },
        editCompanyRequested: (state, action: PayloadAction<CompanyModel>) => {
            state.companyEdit.isLoading = true;
        },
        editCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
            state.companyEdit.isLoading = false;
        },
        editCompanyFailed: (state, action: PayloadAction<unknown>) => {
            state.companyEdit.isLoading = false;
        },
        deletePhotoRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.companyEdit.isLoading = true;
        },
        deletePhotoSucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.companyEdit.companyModel = { ...action.payload };
            state.companyEdit.isLoading = false;
        },
        deletePhotoFailed: (state, action: PayloadAction<unknown>) => {
            state.companyEdit.isLoading = false;
        },
        makeCompanyDelRequested: (state, action: PayloadAction<number>) => {
        },
        makeCompanyDelSucceed: (state) => {
            state.company = undefined;
        },
        makeCompanyDelFailed: (state, action: PayloadAction<unknown>) => {
        },
    },
});

export const { getAllCompaniesByUserRequested, getAllCompaniesByUserSucceed, getAllCompaniesByUserFailed,
    getAllCompaniesByOwnerRequested, getAllCompaniesByOwnerSucceed, getAllCompaniesByOwnerFailed,
    createCompanyRequested, createCompanySucceed, createCompanyFailed,
    getCompanyRequested, getCompanySucceed, getCompanyFailed,
    uploadPhotoRequested, uploadPhotoSucceed, uploadPhotoFailed,
    editCompanyRequested, editCompanySucceed, editCompanyFailed,
    deletePhotoRequested, deletePhotoSucceed, deletePhotoFailed,
    makeCompanyDelRequested, makeCompanyDelSucceed, makeCompanyDelFailed  } = companySlice.actions;

export const selectCompaniesByUser = (state: RootState) => state.companyState.companiesByUser;
export const selectCompaniesByOwner = (state: RootState) => state.companyState.companiesByOwner;
export const selectCompanyNew = (state: RootState) => state.companyState.companyNew;
export const selectCompanyEdit = (state: RootState) => state.companyState.companyEdit;
export const selectCompany = (state: RootState) => state.companyState.company;

export default companySlice.reducer;
