import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/state/store';
import { SignUpFormModel, SignUpModel } from './signUpModel';

export type SignUpState = SignUpFormModel;

const initialState: SignUpState = {
    signUpModel: {
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        email: '',
        password: '',
        repeatPassword: '',
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
            state.signUpModel.firstName = '';
            state.signUpModel.lastName = '';
            state.signUpModel.dateOfBirth = undefined;
            state.signUpModel.email = '';
            state.signUpModel.password = '';
            state.signUpModel.repeatPassword = '';

            state.errors = new Map;
            state.isLoading = false;
        },
        signUpFailed: (state, action: PayloadAction<Error>) => {
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
