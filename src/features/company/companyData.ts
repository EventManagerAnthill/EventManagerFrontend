import { UserData } from "../user/userData";

export interface CompanyData {
    id?: number;
    name: string;
    userId: number;
    user: UserData;
    type: number;
    description?: string;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
}