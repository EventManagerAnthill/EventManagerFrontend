import { Settings } from "../../app/settings";
import { SignInData, TokenData } from "./signInData";
import * as baseApi from "../../api/baseApi";

declare const settings: Settings;

export function* postLogin(data: SignInData) {
    const result: TokenData = yield baseApi.post<SignInData, TokenData>(settings.baseApiUrl + `/authenticate/auth`, data);
    return result;
}