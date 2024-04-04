import { UserCreation } from "../models/user_model";

export function validateUser(user: UserCreation): boolean {
    if (user.name === "" || user.email === "" || user.password === "") {
        return false;
    }
    return true;
}

export function validatePassword(
    password: string,
    confirmPassword: string
): boolean {
    if (password === confirmPassword) {
        return true;
    }
    return false;
}

export function loginValidation(email: string, password: string): boolean {
    if (email === "" || password === "") {
        return false;
    }
    return true;
}
