import { AppSettings } from "../../appSettings";
import { SignInData, TokenData } from "./signInData";
import * as baseApi from "../../api/baseApi";

declare const appSettings: AppSettings;

export function* postLogin(data: SignInData) {
    console.log(appSettings.baseApiUrl);
    const result: TokenData = yield baseApi.post<SignInData, TokenData>(appSettings.baseApiUrl + `/authenticate/auth`, data);
    return result;
}