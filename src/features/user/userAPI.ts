import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { UserData } from "./userData";

declare const appSettings: AppSettings;

export function* getUser(param: URLSearchParams) {
    const result: UserData = yield baseApi.get(appSettings.baseApiUrl + `/user/getUser?${param.toString()}`);
    return result;
}