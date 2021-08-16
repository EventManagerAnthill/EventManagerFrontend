import { AppSettings } from "../../app/settings";
import { SignInData, TokenData } from "./signInData";
import * as baseApi from "../../api/baseApi";

declare const appSettings: AppSettings;

export function* postLogin(data: SignInData) {
    const result: TokenData = yield baseApi.post<SignInData, TokenData>(appSettings.baseApiUrl + `/authenticate/auth`, data);
    return result;
}