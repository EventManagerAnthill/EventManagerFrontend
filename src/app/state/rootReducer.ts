import { combineReducers } from "@reduxjs/toolkit";
import { ApplicationState } from "./applicationState";
import signInReducer from '../../features/signIn/signInSlice';

export const rootReducer = combineReducers<ApplicationState>({
    signInState: signInReducer,
})