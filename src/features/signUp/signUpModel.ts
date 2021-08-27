export interface SignUpModel {
    firstName : string;
    lastName : string;
    dateOfBirth? : string;
    email : string;
    password : string;
    repeatPassword : string;
}

export interface SignUpFormModel {
    signUpModel: SignUpModel;
    errors: Map<string, string>;
    isLoading: boolean;
}

export interface SignUpRequestModel {
    firstName : string;
    lastName : string;
    dateOfBirth? : Date;
    email : string;
    password : string;
}