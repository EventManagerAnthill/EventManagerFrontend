export interface SignUpData {
    firstName : string;
    lastName : string;
    birthDate? : string;
    email : string;
    password : string;
    repeatPassword : string;
    emailVerification: boolean;
}

export interface SignUpRequestData {
    firstName : string;
    lastName : string;
    birthDate? : Date;
    email : string;
    password : string;
    emailVerification: boolean;
}