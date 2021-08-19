import { combineReducers } from "@reduxjs/toolkit";
import { ApplicationState } from "./applicationState";

import signInReducer from '../../features/signIn/signInSlice';
import routerReducer from '../../features/routerSlice';

export const rootReducer = combineReducers<ApplicationState>({
    signInState: signInReducer,
    routerState: routerReducer,
})