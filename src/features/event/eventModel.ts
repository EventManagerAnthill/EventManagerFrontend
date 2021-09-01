export interface EventModel {
    id?: number;
    name: string;
    createDate: string;
    holdingDate: string;
    type: number;
    userId: number;
    status: number;
    description?: string;
    companyId: number;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
}