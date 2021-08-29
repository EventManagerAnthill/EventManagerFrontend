export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    birthDate?: Date | null;
    email: string;
    phone?: string | null;
    sex?: number | null;
    username?: string | null;
    originalFileName?: string | null;
    serverFileName?: string | null;
    fotoUrl?: string | null;
}

export interface UserFormModel {
    userModel: UserModel;
    errors: Map<string, string>;
    isLoading: boolean;
}
