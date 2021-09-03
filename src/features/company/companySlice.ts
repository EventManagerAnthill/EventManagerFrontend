import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { CompanyFormModel, CompanyModel, CompanyUploadPhotoModel } from './companyModel';


export type CompanyState = {
    companyNew: CompanyFormModel;
    company?: CompanyModel;
    companiesByUser?: CompanyModel[];
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
        },
        errors: new Map,
        isLoading: false,
        companyUploadModel: undefined,
    },
    company: undefined,
    companiesByUser: undefined,
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        getAllCompaniesByUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getAllCompaniesByUserSucceed: (state, action: PayloadAction<CompanyModel[]>) => {
            return { ...state, companiesByUser: action.payload }
        },
        getAllCompaniesByUserFailed: (state, action: PayloadAction<Error>) => {
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
        createCompanyFailed: (state, action: PayloadAction<Error>) => {
            state.companyNew.isLoading = false;
        },
        getCompanyRequested: (state, action: PayloadAction<number>) => {
        },
        getCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
        },
        getCompanyFailed: (state, action: PayloadAction<Error>) => {
        },
        uploadPhotoRequested: (state, action: PayloadAction<CompanyUploadPhotoModel>) => {
        },
        uploadPhotoSucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
        },
        uploadPhotoFailed: (state, action: PayloadAction<Error>) => {
        },
    },
});

export const { getAllCompaniesByUserRequested, getAllCompaniesByUserSucceed, getAllCompaniesByUserFailed,
    createCompanyRequested, createCompanySucceed, createCompanyFailed,
    getCompanyRequested, getCompanySucceed, getCompanyFailed,
    uploadPhotoRequested, uploadPhotoSucceed, uploadPhotoFailed } = companySlice.actions;

export const selectCompaniesByUser = (state: RootState) => state.companyState.companiesByUser;
export const selectCompanyNew = (state: RootState) => state.companyState.companyNew;
export const selectCompany = (state: RootState) => state.companyState.company;

export default companySlice.reducer;
