import { UserModel } from "../user/userModel";

export interface CompanyModel {
    id?: number;
    name: string;
    userId: number;
    user?: UserModel;
    type: number;
    description?: string;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
    userRole?: number;
}

export interface CompanyUploadModel {
    param?: URLSearchParams;
    formData: FormData;
}

export interface CompanyInviteUsersModel {
    companyId?: number;
    email: string[];
}

export interface CompanyGetModel {
    companyId: number;
    param: URLSearchParams;
}

export interface CompanyFormModel {
    companyModel: CompanyModel;
    errors: Map<string, string>;
    isLoading: boolean;
    companyUploadModel?: CompanyUploadModel
}

export interface CompanyNewFormModel {
    companyModel: CompanyModel;
    errors: Map<string, string>;
    isLoading: boolean;
    companyUploadPhotoModel?: CompanyUploadModel;
    companyInviteUsersModel?: CompanyInviteUsersModel;
    companyAddUsersCSVModel?: CompanyUploadModel;
}

export interface PagingModel {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetCompaniesModel {
    companies?: CompanyModel[];
    paging?: PagingModel;
}

export interface CompanyAcceptInvitationModel {
    companyId: number;
    email: string;
}