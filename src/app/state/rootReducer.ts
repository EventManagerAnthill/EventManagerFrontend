import { combineReducers } from "@reduxjs/toolkit";
import { ApplicationState } from "./applicationState";

import routerReducer from '../../features/routerSlice';
import signInReducer from '../../features/signIn/signInSlice';
import signUpReducer from '../../features/signUp/signUpSlice';
import identifyReducer from '../../features/identify/identifySlice';
import resetPasswordReducer from '../../features/resetPassword/resetPasswordSlice';
import leftBarReducer from '../../features/leftBar/leftBarSlice';
import userReducer from '../../features/user/userSlice';

export const rootReducer = combineReducers<ApplicationState>({
    routerState: routerReducer,
    signInState: signInReducer,
    signUpState: signUpReducer,
    identifyState: identifyReducer,
    resetPasswordState: resetPasswordReducer,
    leftBarState: leftBarReducer,
    userState: userReducer,
})