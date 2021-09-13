import moment from "moment";
import { UserData, UserUpdateData, UserUpdatePasswordData } from "./userData";
import { UserFormModel, UserModel } from "./userModel";

export const mapToUserModel = (data: UserData): UserModel => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: moment(new Date(data.birthDate!)).format('YYYY-MM-DD'),
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        username: data.username,
        originalFileName: data.originalFileName,
        serverFileName: data.serverFileName,
        fotoUrl: data.fotoUrl,
    };
}

export const mapToUserData = (model: UserModel): UserData => {
    return {
        id: model.id,
        firstName: model.firstName,
        lastName: model.lastName,
        middleName: model.middleName,
        birthDate: new Date(model.birthDate!),
        email: model.email,
        phone: model.phone,
        sex: model.sex,
        username: model.username,
        originalFileName: model.originalFileName,
        serverFileName: model.serverFileName,
        fotoUrl: model.fotoUrl,
    };
}

export const mapToUpdateData = (model: UserModel): UserUpdateData => {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        middleName: model.middleName,
        birthDate: new Date(model.birthDate!),
        phone: model.phone,
        sex: model.sex,
        username: model.username,
    };
}

export const mapToUpdatePasswordData = (model: UserFormModel): UserUpdatePasswordData => {
    return {
        userId: model.userModel.id,
        password: model.userPasswordModel.newPassword,
    };
}

export const mapToUserModelArray = (data: UserData[]): UserModel[] => {
    return data.map(x => { return mapToUserModel(x) });
}