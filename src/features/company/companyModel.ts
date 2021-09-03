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
}

export interface CompanyUploadPhotoModel {
    param?: URLSearchParams;
    formData: FormData;
}

export interface CompanyFormModel {
    companyModel: CompanyModel;
    errors: Map<string, string>;
    isLoading: boolean;
    companyUploadModel?: CompanyUploadPhotoModel
}

