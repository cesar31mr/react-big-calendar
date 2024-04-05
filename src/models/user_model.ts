export interface UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserLogin{
    email: string;
    password: string;
}

export interface UserCreation{
    name: string;
    email: string;
    password: string;
}