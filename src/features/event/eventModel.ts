export interface EventModel {
    id?: number;
    name: string;
    createDate?: string;
    holdingDate?: string;
    beginHoldingDate?: string;
    eventTimeZone: string;
    type: number;
    userId: number;
    status?: number;
    description?: string;
    companyId: number;
    del?: number;
    originalFileName?: string;
    serverFileName?: string;
    fotoUrl?: string;
    userRole?: number;
}

export interface PagingModel {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

export interface GetCompanyEventsModel {
    events?: EventModel[];
    paging?: PagingModel;
}

export interface EventUploadModel {
    param?: URLSearchParams;
    formData: FormData;
}

export interface EventInviteUsersModel {
    eventId?: number;
    email: string[];
}

export interface EventNewFormModel {
    eventModel: EventModel;
    errors: Map<string, string>;
    isLoading: boolean;
    eventUploadPhotoModel?: EventUploadModel;
    eventInviteUsersModel?: EventInviteUsersModel;
    eventAddUsersCSVModel?: EventUploadModel;
}

export interface EventFormModel {
    eventModel: EventModel;
    errors: Map<string, string>;
    isLoading: boolean;
    eventUploadPhotoModel?: EventUploadModel
}

export interface EventGetModel {
    eventId: number;
    param: URLSearchParams;
}