export interface ResetPasswordFormData {
    newPassword: string;
    confirmNewPassword: string;
} 

export interface ResetPasswordRequestData {
    email?: string;
    validTo?: string;
    code?: string;
    password: string;
} 