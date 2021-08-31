export interface UserData {
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

export interface UserUpdatePasswordData {
    userId: number;
    password: string;
}

export interface UserUpdateData {
    firstName: string;
    lastName: string;
    middleName?: string | null;
    birthDate?: Date | null;
    phone?: string | null;
    sex?: number | null;
    username?: string | null;
}