import moment from "moment";
import { mapToUserData, mapToUserModel } from "../user/userMapper";
import { CompanyData, CompanyEditData } from "./companyData";
import { CompanyModel } from "./companyModel";

export const mapToCompanyModel = (data: CompanyData): CompanyModel => {
    return {
        id: data.id,
        name: data.name,
        userId: data.userId,
        user: data.user ? mapToUserModel(data.user) : undefined,
        type: data.type,
        description: data.description,
        del: data.del,
        originalFileName: data.originalFileName,
        serverFileName: data.serverFileName,
        fotoUrl: data.fotoUrl,
        userRole: data.userRole,
    };
}

export const mapToCompanyData = (model: CompanyModel): CompanyData => {
    return {
        id: model.id,
        name: model.name,
        userId: model.userId,
        user: model.user ? mapToUserData(model.user) : undefined,
        type: model.type,
        description: model.description,
        del: model.del,
        originalFileName: model.originalFileName,
        serverFileName: model.serverFileName,
        fotoUrl: model.fotoUrl,
        userRole: model.userRole,
    };
}

export const mapToCompanyModelArray = (data: CompanyData[]): CompanyModel[] => {
    return data.map(x => { return mapToCompanyModel(x) });
}

export const mapToCompanyEditData = (model: CompanyModel): CompanyEditData => {
    return {
        name: model.name,
        type: model.type,
        description: model.description,
    };
}