export interface SignUpData {
    firstName : string;
    lastName : string;
    dateOfBirth? : string;
    email : string;
    password : string;
    repeatPassword : string;
}

export interface SignUpRequestData {
    firstName : string;
    lastName : string;
    dateOfBirth? : Date;
    email : string;
    password : string;
}