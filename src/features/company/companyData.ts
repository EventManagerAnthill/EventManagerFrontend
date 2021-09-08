import { UserData } from "../user/userData";

export interface CompanyData {
    id?: number;
    name: string;
    userId: number;
    user?: UserData;
    type: number;
    description?: string;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
    userRole?: number;
}

export interface CompanyEditData {
    name: string;
    type: number;
    description?: string;
}

export interface PagingData {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetCompaniesData {
    companies?: CompanyData[];
    paging?: PagingData;
}


