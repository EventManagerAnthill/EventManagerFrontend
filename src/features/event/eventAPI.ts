import { AppSettings } from "../../AppSettings";
import * as baseApi from "../../api/baseApi";
import { EventData, GetCompanyEventsData } from "./eventData";

declare const appSettings: AppSettings;

export function* getAllEventsByUser(param: URLSearchParams) {
    const result: EventData[] = yield baseApi.get(appSettings.baseApiUrl + `/event/getAllEventsByUser?${param.toString()}`);
    return result;
}

export function* getCompanyEvents(param: URLSearchParams) {
    const result: GetCompanyEventsData = yield baseApi.get(appSettings.baseApiUrl + `/company/getCompanyEvents?${param.toString()}`);
    return result;
}