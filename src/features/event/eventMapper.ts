import moment from "moment";
import 'moment-timezone';
import { EventData } from "./eventData";
import { EventModel } from "./eventModel";



export const mapToEventModel = (data: EventData): EventModel => {
    return {
        id: data.id,
        name: data.name,
        createDate: data.createDate ? moment(data.createDate).format('YYYY-MM-DD') : undefined,
        holdingDate: data.holdingDate ? moment.utc(data.holdingDate).tz(data.eventTimeZone).format('YYYY-MM-DDTHH:mm') : undefined,
        beginHoldingDate: data.beginHoldingDate ? moment.utc(data.beginHoldingDate).tz(data.eventTimeZone).format('YYYY-MM-DDTHH:mm') : undefined,
        eventTimeZone: data.eventTimeZone,
        type: data.type,
        userId: data.userId,
        status: data.status,
        description: data.description,
        companyId: data.companyId,
        del: data.del,
        originalFileName: data.originalFileName,
        serverFileName: data.serverFileName,
        fotoUrl: data.fotoUrl,
        userRole: data.userRole,
    };
}

export const mapToEventData = (model: EventModel): EventData => {
    return {
        id: model.id,
        name: model.name,
        createDate: model.createDate ? new Date(model.createDate) : undefined,
        holdingDate: model.holdingDate ? new Date(model.holdingDate) : undefined,
        beginHoldingDate: model.beginHoldingDate ? new Date(model.beginHoldingDate) : undefined,
        eventTimeZone: model.eventTimeZone,
        type: model.type,
        userId: model.userId,
        status: model.status,
        description: model.description,
        companyId: model.companyId,
        del: model.del,
        originalFileName: model.originalFileName,
        serverFileName: model.serverFileName,
        fotoUrl: model.fotoUrl,
        userRole: model.userRole,
    };
}

export const mapToEventModelArray = (data: EventData[]): EventModel[] => {
    return data.map(x => { return mapToEventModel(x) });
}