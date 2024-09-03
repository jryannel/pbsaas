import { Users } from ".";
import { pb } from "./pb";

export function isAuth() {
    return pb.authStore.isValid
}

export function login(email: string, password: string) {
    return Users.col.authWithPassword(email, password);
}

export function logout() {
    return pb.authStore.clear();
}

export function getUser() {
    return pb.authStore.model;
}