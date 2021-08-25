import { AppSettings } from "../../AppSettings";
import { ResetPasswordRequestModel } from "./resetPasswordModel";
import * as baseApi from "../../api/baseApi";

declare const appSettings: AppSettings;

export function* postResetPassword(data: ResetPasswordRequestModel) {
    const result: string = yield baseApi.post<ResetPasswordRequestModel, string>(appSettings.baseApiUrl + `/authenticate/RestorePassword`, data);
    return result;
}


