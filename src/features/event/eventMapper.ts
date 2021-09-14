import moment from "moment";
import { EventData } from "./eventData";
import { EventModel } from "./eventModel";

export const mapToEventModel = (data: EventData): EventModel => {
    return {
        id: data.id,
        name: data.name,
        createDate: moment(new Date(data.createDate!)).format('YYYY-MM-DD'),
        holdingDate: moment(new Date(data.holdingDate!)).format('YYYY-MM-DD'),
        type: data.type,
        userId: data.userId,
        status: data.status,
        description: data.description,
        companyId: data.companyId,
        del: data.del,
        originalFileName: data.originalFileName,
        serverFileName: data.serverFileName,
        fotoUrl: data.fotoUrl,
    };
}

export const mapToEventData = (model: EventModel): EventData => {
    return {
        id: model.id,
        name: model.name,
        createDate: new Date(model.createDate!),
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
    };
}

export const mapToEventModelArray = (data: EventData[]): EventModel[] => {
    return data.map(x => { return mapToEventModel(x) });
}