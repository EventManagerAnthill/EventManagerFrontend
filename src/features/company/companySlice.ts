import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { CompanyAcceptInvitationModel, CompanyFormModel, CompanyGetModel, CompanyInviteUsersModel, CompanyModel, CompanyNewFormModel, CompanyUploadModel, GetCompaniesModel } from './companyModel';


export type CompanyState = {
    companyNew: CompanyNewFormModel;
    companyEdit: CompanyFormModel;
    company?: CompanyModel;
    companiesByUser?: GetCompaniesModel;
    companiesByOwner?: GetCompaniesModel;
    linkToJoinCompany?: string;
    isLoading: boolean;
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
        companyUploadPhotoModel: undefined,
        companyInviteUsersModel: undefined,
        companyAddUsersCSVModel: undefined,
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
    linkToJoinCompany: undefined,
    isLoading: false,
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        getAllCompaniesByUserRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
        },
        getAllCompaniesByUserSucceed: (state, action: PayloadAction<GetCompaniesModel>) => {
            return {
                ...state,
                companiesByUser: action.payload,
                isLoading: false,
            }
        },
        getAllCompaniesByUserFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        getAllCompaniesByOwnerRequested: (state, action: PayloadAction<URLSearchParams>) => {
            state.isLoading = true;
        },
        getAllCompaniesByOwnerSucceed: (state, action: PayloadAction<GetCompaniesModel>) => {
            return {
                ...state,
                companiesByOwner: action.payload,
                isLoading: false,
            }
        },
        getAllCompaniesByOwnerFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        createCompanyRequested: (state, action: PayloadAction<CompanyFormModel>) => {
            state.companyNew.companyModel = { ...action.payload.companyModel };
            state.companyNew.isLoading = true;
        },
        createCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.companyNew.companyModel = { ...initialState.companyNew.companyModel };
            state.companyNew.companyUploadPhotoModel = undefined;
            state.companyNew.companyInviteUsersModel = undefined;
            state.companyNew.companyAddUsersCSVModel = undefined;
            state.companyNew.isLoading = false;
            state.companyNew.errors = new Map;
            state.company = { ...action.payload };
        },
        createCompanyFailed: (state, action: PayloadAction<unknown>) => {
            state.companyNew.isLoading = false;
        },
        getCompanyRequested: (state, action: PayloadAction<CompanyGetModel>) => {
            state.isLoading = true;
        },
        getCompanySucceed: (state, action: PayloadAction<CompanyModel>) => {
            state.company = { ...action.payload };
            state.isLoading = false;
        },
        getCompanyFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
        uploadPhotoRequested: (state, action: PayloadAction<CompanyUploadModel>) => {
        },
        uploadPhotoSucceed: (state, action: PayloadAction<CompanyModel>) => {
            if (state.company) {
                state.company.originalFileName = action.payload.originalFileName;
                state.company.fotoUrl = action.payload.fotoUrl;
            }
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
        addUsersCSVRequested: (state, action: PayloadAction<CompanyUploadModel>) => {
        },
        addUsersCSVSucceed: (state) => {
        },
        addUsersCSVFailed: (state, action: PayloadAction<unknown>) => {
        },
        inviteUsersRequested: (state, action: PayloadAction<CompanyInviteUsersModel>) => {
        },
        inviteUsersSucceed: (state) => {
        },
        inviteUsersFailed: (state, action: PayloadAction<unknown>) => {
        },
        getLinkToJoinCompanyRequested: (state, action: PayloadAction<URLSearchParams>) => {
        },
        getLinkToJoinCompanySucceed: (state, action: PayloadAction<string>) => {
            state.linkToJoinCompany = action.payload;
        },
        getLinkToJoinCompanyFailed: (state, action: PayloadAction<unknown>) => {
            state.linkToJoinCompany = undefined;
        },
        acceptInvitationRequested: (state, action: PayloadAction<CompanyAcceptInvitationModel>) => {
        },
        acceptInvitationSucceed: (state) => {
        },
        acceptInvitationFailed: (state, action: PayloadAction<unknown>) => {
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
    makeCompanyDelRequested, makeCompanyDelSucceed, makeCompanyDelFailed,
    addUsersCSVRequested, addUsersCSVSucceed, addUsersCSVFailed,
    inviteUsersRequested, inviteUsersSucceed, inviteUsersFailed,
    getLinkToJoinCompanyRequested, getLinkToJoinCompanySucceed, getLinkToJoinCompanyFailed,
    acceptInvitationRequested, acceptInvitationSucceed, acceptInvitationFailed } = companySlice.actions;

export const selectCompaniesByUser = (state: RootState) => state.companyState.companiesByUser;
export const selectCompaniesByOwner = (state: RootState) => state.companyState.companiesByOwner;
export const selectCompanyNew = (state: RootState) => state.companyState.companyNew;
export const selectCompanyEdit = (state: RootState) => state.companyState.companyEdit;
export const selectCompany = (state: RootState) => state.companyState.company;
export const selectCompanylinkToJoin = (state: RootState) => state.companyState.linkToJoinCompany;
export const selectCompanyIsLoading = (state: RootState) => state.companyState.isLoading;


export default companySlice.reducer;
