import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { CompanyData } from "./companyData";
import { CompanyUploadPhotoModel } from "./companyModel";

declare const appSettings: AppSettings;


export function* getAllCompaniesByUser(param: URLSearchParams) {
    const result: CompanyData[] = yield baseApi.get(appSettings.baseApiUrl + `/company/GetAllCompaniesByUser?${param.toString()}`);
    return result;
}

export function* createCompany(data: CompanyData) {
    const result: CompanyData = yield baseApi.post<CompanyData, CompanyData>(appSettings.baseApiUrl + `/company`, data);
    return result;
}

export function* getCompany(companyId: number) {
    const result: CompanyData = yield baseApi.get(appSettings.baseApiUrl + `/company/${companyId}`);
    return result;
};

export function* uploadPhoto(data: CompanyUploadPhotoModel) {
    const result: CompanyData = yield baseApi.postUpload(appSettings.baseApiUrl + `/company/upload?${data.param!.toString()}`, data.formData);
    return result;
}