export interface SignInModel {
    email: string;
    password: string;
}

export interface TokenModel {
    access_token : string;
    email : string;
}

export interface SignInFormModel {
    signInModel: SignInModel;
    isLoading: boolean;
}

export interface SignInSNModel {
    idToken: string;  
}

