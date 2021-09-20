import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { SignUpFormModel, SignUpModel } from './signUpModel';

export type SignUpState = SignUpFormModel;

const initialState: SignUpState = {
    signUpModel: {
        firstName: '',
        lastName: '',
        birthDate: undefined,
        email: '',
        password: '',
        repeatPassword: '',
        emailVerification: false,
    },
    errors: new Map,
    isLoading: false,
};

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        signUpRequested: (state, action: PayloadAction<SignUpModel>) => {
            state.isLoading = true;
            state.signUpModel = action.payload;
        },
        signUpSucceed: (state) => {
            state.signUpModel = { ...initialState.signUpModel }

            state.errors = new Map;
            state.isLoading = false;
        },
        signUpFailed: (state, action: PayloadAction<unknown>) => {
            state.isLoading = false;
        },
    },
});

export const { signUpRequested, signUpSucceed, signUpFailed } = signUpSlice.actions;

export const selectSignUp = (state: RootState) => state.signUpState;
export const selectSignUpModel = (state: RootState) => state.signUpState.signUpModel;
export const selectSignUpIsLoading = (state: RootState) => state.signUpState.isLoading;
export const selectSignUpErrors = (state: RootState) => state.signUpState.errors;


export default signUpSlice.reducer;
