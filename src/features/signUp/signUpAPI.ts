import { AppSettings } from "../../AppSettings";
import { SignUpRequestData } from "./signUpData";
import * as baseApi from "../../api/baseApi";
import { UserData } from "../user/userData";

declare const appSettings: AppSettings;

export function* postSignUp(data: SignUpRequestData) {
    const result: UserData = yield baseApi.post<SignUpRequestData, UserData>(appSettings.baseApiUrl + `/user`, data);
    return result;
}