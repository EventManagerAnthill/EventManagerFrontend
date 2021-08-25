import { AppSettings } from "../../AppSettings";
import { SignInSNData, SignInData, TokenData } from "./signInData";
import * as baseApi from "../../api/baseApi";

declare const appSettings: AppSettings;

export function* postSignIn(data: SignInData) {
    const result: TokenData = yield baseApi.post<SignInData, TokenData>(appSettings.baseApiUrl + `/authenticate/auth`, data);
    return result;
}

export function* postValidateUser(params: string) {
    const result: string = yield baseApi.post<undefined, string>(appSettings.baseApiUrl + `/authenticate/validateUser` + params, undefined);
    return result;
}

export function* postSignInGoogle(data: SignInSNData) {
    const result: TokenData = yield baseApi.post<SignInSNData, TokenData>(appSettings.baseApiUrl + `/authenticate/google-login`, data);
    return result;
}

export function* postSignInFacebook(data: SignInSNData) {
    const result: TokenData = yield baseApi.post<SignInSNData, TokenData>(appSettings.baseApiUrl + `/authenticate/facebook-login`, data);
    return result;
}