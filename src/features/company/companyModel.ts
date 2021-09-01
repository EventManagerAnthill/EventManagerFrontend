export interface CompanyModel {
    id?: number;
    name: string;
    userId: string;
    type: number;
    description?: string;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
}