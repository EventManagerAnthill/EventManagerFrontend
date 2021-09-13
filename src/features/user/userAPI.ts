import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { GetCompanyUsersData, UserData, UserUpdateData, UserUpdatePasswordData } from "./userData";
import { UserUploadPhotoModel } from "./userModel";

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

export function* uploadPhoto(data: UserUploadPhotoModel) {
    const result: UserData = yield baseApi.postUpload(appSettings.baseApiUrl + `/user/upload?${data.param.toString()}`, data.formData);
    return result;
}

export function* deletePhoto(param: URLSearchParams) {
    const result: UserData = yield baseApi.put(appSettings.baseApiUrl + `/user/deleteFoto?${param.toString()}`, undefined);
    return result;
}

export function* getCompanyUsers(param: URLSearchParams) {
    const result: GetCompanyUsersData = yield baseApi.get(appSettings.baseApiUrl + `/company/getCompanyUsers?${param.toString()}`);
    return result;
}