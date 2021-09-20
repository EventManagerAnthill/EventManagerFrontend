import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { EventData, EventInviteUsersData, GetCompanyEventsData } from "./eventData";
import { EventGetModel, EventUploadModel } from "./eventModel";

declare const appSettings: AppSettings;

export function* getAllEventsByUser(param: URLSearchParams) {
    const result: EventData[] = yield baseApi.get(appSettings.baseApiUrl + `/event/getAllEventsByUser?${param.toString()}`);
    return result;
}

export function* getCompanyEvents(param: URLSearchParams) {
    const result: GetCompanyEventsData = yield baseApi.get(appSettings.baseApiUrl + `/company/getCompanyEvents?${param.toString()}`);
    return result;
}

export function* createEvent(data: EventData) {
    const result: EventData = yield baseApi.post<EventData, EventData>(appSettings.baseApiUrl + `/event`, data);
    return result;
}

export function* uploadPhoto(data: EventUploadModel) {
    const result: EventData = yield baseApi.postUpload(appSettings.baseApiUrl + `/event/upload?${data.param!.toString()}`, data.formData);
    return result;
};

export function* deletePhoto(param: URLSearchParams) {
    const result: EventData = yield baseApi.put<undefined, EventData>(appSettings.baseApiUrl + `/event/deleteFoto?${param.toString()}`, undefined);
    return result;
};

export function* addUsersCSV(data: EventUploadModel) {
    const result: string = yield baseApi.postUpload(appSettings.baseApiUrl + `/event/addUsersCSV?${data.param!.toString()}`, data.formData);
    return result;
};

export function* inviteUsers(data: EventInviteUsersData) {
    const result: string = yield baseApi.post<EventInviteUsersData, string>(appSettings.baseApiUrl + `/event/inviteUsers`, data);
    return result;
};

export function* getEvent(data: EventGetModel) {
    const result: EventData = yield baseApi.get(appSettings.baseApiUrl + `/event/${data.eventId}?${data.param.toString()}`);
    return result;
};

export function* makeEventDel(eventId: number) {
    const result: EventData = yield baseApi.put<undefined, EventData>(appSettings.baseApiUrl + `/event/MakeEventDel/${eventId}`, undefined);
    return result;
};

export function* cancelEvent(eventId: number) {
    const result: EventData = yield baseApi.put<undefined, EventData>(appSettings.baseApiUrl + `/event/CancelEvent/${eventId}`, undefined);
    return result;
};

export function* editEvent(data: EventData) {
    const result: EventData = yield baseApi.put<EventData, EventData>(appSettings.baseApiUrl + `/event/update`, data);
    return result;
};