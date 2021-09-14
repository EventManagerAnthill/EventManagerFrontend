import { SignUpModel, SignUpRequestModel } from "./signUpModel";

export const mapToRequestModel = (data: SignUpModel): SignUpRequestModel => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth!),
        email: data.email,
        password: data.password,
        emailVerification: data.emailVerification,
    };
}