import moment from "moment";
import { EventData } from "./eventData";
import { EventModel } from "./eventModel";

export const mapToEventModel = (data: EventData): EventModel => {
    return {
        id: data.id,
        name: data.name,
        createDate: data.createDate ? moment(new Date(data.createDate)).format('YYYY-MM-DD') : undefined,
        holdingDate: moment(new Date(data.holdingDate!)).format('YYYY-MM-DDTHH:mm'),
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
        holdingDate: new Date(model.holdingDate!),
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