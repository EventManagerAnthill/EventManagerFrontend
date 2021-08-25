import { combineReducers } from "@reduxjs/toolkit";
import { ApplicationState } from "./applicationState";

import routerReducer from '../../features/routerSlice';
import signInReducer from '../../features/signIn/signInSlice';
import signUpReducer from '../../features/signUp/signUpSlice';
import identifyReducer from '../../features/identify/identifySlice';
import resetPasswordReducer from '../../features/resetPassword/resetPasswordSlice';

export const rootReducer = combineReducers<ApplicationState>({
    routerState: routerReducer,
    signInState: signInReducer,
    signUpState: signUpReducer,
    identifyState: identifyReducer,
    resetPasswordState: resetPasswordReducer,
})