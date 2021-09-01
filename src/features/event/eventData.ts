export interface EventData {
    id?: number;
    name: string;
    createDate: Date;
    holdingDate: Date;
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