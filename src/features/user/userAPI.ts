import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { UserData, UserUpdateData, UserUpdatePasswordData } from "./userData";

declare const appSettings: AppSettings;

export function* getUser(param: URLSearchParams) {
    const result: UserData = yield baseApi.get(appSettings.baseApiUrl + `/user/getUser?${param.toString()}`);
    return result;
}

export function* updateUser(data: UserUpdateData, id: number) {
    const result: UserData = yield baseApi.put(appSettings.baseApiUrl + `/user/update/${id}`, data);
    return result;
}

export function* updateUserPassword(data: UserUpdatePasswordData) {
    const result: UserData = yield baseApi.put(appSettings.baseApiUrl + `/user/updatePassword`, data);
    return result;
}