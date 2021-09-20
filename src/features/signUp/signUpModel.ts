export interface SignUpModel {
    firstName: string;
    lastName: string;
    birthDate?: string;
    email: string;
    password: string;
    repeatPassword: string;
    emailVerification: boolean;
}

export interface SignUpFormModel {
    signUpModel: SignUpModel;
    errors: Map<string, string>;
    isLoading: boolean;
}

export interface SignUpRequestModel {
    firstName: string;
    lastName: string;
    birthDate?: Date;
    email: string;
    password: string;
    emailVerification: boolean;
}