export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    birthDate?: string | null;
    email: string;
    phone?: string | null;
    sex?: number | null;
    username?: string | null;
    originalFileName?: string | null;
    serverFileName?: string | null;
    fotoUrl?: string | null;
}

export interface UserPasswordModel {
    newPassword: string;
    confirmNewPassword: string;
}

export interface UserFormModel {
    userModel: UserModel;
    userPasswordModel: UserPasswordModel;
    errors: Map<string, string>;
    isLoading: boolean;
}

export interface UserUploadPhotoModel {
    param: URLSearchParams;
    formData: FormData;
}

export interface PagingModel {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetCompanyUsersModel {
    users?: UserModel[];
    paging?: PagingModel;
}
