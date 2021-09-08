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

export interface CompanyUploadPhotoModel {
    param?: URLSearchParams;
    formData: FormData;
}

export interface CompanyGetModel {
    companyId: number;
    param: URLSearchParams;
}

export interface CompanyFormModel {
    companyModel: CompanyModel;
    errors: Map<string, string>;
    isLoading: boolean;
    companyUploadModel?: CompanyUploadPhotoModel
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