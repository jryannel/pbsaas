// PocketBase Auth Context
import { RecordAuthResponse } from "pocketbase";
import { createContext, useEffect, useState } from "react";
import { pb } from "../api/pb";

export type AuthContextType = {
    user: any;
    token: string;
    isValid: () => boolean;
    login: (email: string, password: string) => Promise<RecordAuthResponse>;
    logout: () => Promise<any>;
    register: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(pb.authStore.model);
    const [token, setToken] = useState<string>(pb.authStore.token);

    useEffect(() => {
        const unsubscribe = pb.authStore.onChange((token, model) => {
            setUser(model);
            setToken(token);
        });
        return unsubscribe;
    }, []);

    function isValid() {
        return pb.authStore.isValid;
    }

    async function login(email: string, password: string) {
        return await pb.collection('users').authWithPassword(email, password);
    }

    async function logout() {
        pb.authStore.clear();
    }

    async function register(email: string, password: string) {
        await pb.collection('users').create({ email, password, passwordConfirm: password });
        return await pb.collection('users').requestVerification(email);
    }

    const value: AuthContextType = {
        user,
        token,
        isValid,
        login,
        logout,
        register,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



