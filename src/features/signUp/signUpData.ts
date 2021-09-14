export interface SignUpData {
    firstName : string;
    lastName : string;
    dateOfBirth? : string;
    email : string;
    password : string;
    repeatPassword : string;
    emailVerification: boolean;
}

export interface SignUpRequestData {
    firstName : string;
    lastName : string;
    dateOfBirth? : Date;
    email : string;
    password : string;
    emailVerification: boolean;
}