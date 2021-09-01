import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { CompanyData } from "./companyData";

declare const appSettings: AppSettings;


export function* getAllCompaniesByUser(param: URLSearchParams) {
    const result: CompanyData[] = yield baseApi.get(appSettings.baseApiUrl + `/company/GetAllCompaniesByUser?${param.toString()}`);
    return result;
}