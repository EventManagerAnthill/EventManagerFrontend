import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { CompanyModel } from './companyModel';


export type CompanyState = {
    company?: CompanyModel;
    companiesByUser?: CompanyModel[];
};

const initialState: CompanyState = {
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
    },
});

export const { getAllCompaniesByUserRequested, getAllCompaniesByUserSucceed, getAllCompaniesByUserFailed } = companySlice.actions;

export const selectCompaniesByUser = (state: RootState) => state.companyState.companiesByUser;

export default companySlice.reducer;
