import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { CompanyData, CompanyEditData, CompanyInviteUsersData, GetCompaniesData } from "./companyData";
import { CompanyGetModel, CompanyInviteUsersModel, CompanyUploadModel } from "./companyModel";

declare const appSettings: AppSettings;

export function* getAllCompaniesByUser(param: URLSearchParams) {
    const result: GetCompaniesData = yield baseApi.get(appSettings.baseApiUrl + `/company/GetAllCompaniesByUser?${param.toString()}`);
    return result;
};

export function* getAllCompaniesByOwner(param: URLSearchParams) {
    const result: GetCompaniesData = yield baseApi.get(appSettings.baseApiUrl + `/company/GetAllCompaniesByOwner?${param.toString()}`);
    return result;
};

export function* createCompany(data: CompanyData) {
    const result: CompanyData = yield baseApi.post<CompanyData, CompanyData>(appSettings.baseApiUrl + `/company`, data);
    return result;
};

export function* editCompany(data: CompanyEditData, companyId: number | undefined) {
    const result: CompanyData = yield baseApi.put<CompanyEditData, CompanyData>(appSettings.baseApiUrl + `/company/Update?id=${companyId}`, data);
    return result;
};

export function* getCompany(data: CompanyGetModel) {
    const result: CompanyData = yield baseApi.get(appSettings.baseApiUrl + `/company/${data.companyId}?${data.param.toString()}`);
    return result;
};

export function* uploadPhoto(data: CompanyUploadModel) {
    const result: CompanyData = yield baseApi.postUpload(appSettings.baseApiUrl + `/company/upload?${data.param!.toString()}`, data.formData);
    return result;
};

export function* deletePhoto(param: URLSearchParams) {
    const result: CompanyData = yield baseApi.put<undefined, CompanyData>(appSettings.baseApiUrl + `/company/deleteFoto?${param.toString()}`, undefined);
    return result;
};

export function* makeCompanyDel(companuId: number) {
    const result: CompanyData = yield baseApi.put<undefined, CompanyData>(appSettings.baseApiUrl + `/company/MakeCompanyDel/${companuId}`, undefined);
    return result;
};

export function* addUsersCSV(data: CompanyUploadModel) {
    const result: string = yield baseApi.postUpload(appSettings.baseApiUrl + `/company/addUsersCSV?${data.param!.toString()}`, data.formData);
    return result;
};

export function* inviteUsers(data: CompanyInviteUsersData) {
    const result: string = yield baseApi.post<CompanyInviteUsersData, string>(appSettings.baseApiUrl + `/company/inviteUsers`, data);
    return result;
};

export function* getLinkToJoinCompany(param: URLSearchParams) {
    const result: string = yield baseApi.get(appSettings.baseApiUrl + `/company/getLinkToJoinCompany?${param.toString()}`);
    return result;
};