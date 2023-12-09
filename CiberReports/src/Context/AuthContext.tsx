import { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../Services/supabase/client";
import { UserData } from "../data/UserData"

type AuthContextDataProps = {
    user: UserData,
    isLoadingUser: boolean,
    auth: boolean,
    signIn: (email: string, password: string) => Promise<void>,
    singOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
    {} as AuthContextDataProps
)

const login = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

type AuthContextProviderProps = {
    children: ReactNode
}

const passwordReset = (email: string) =>
    supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/update-password"
    });

const AuthProvider = ({ children }: AuthContextProviderProps) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                setAuth(false);
            } else if (event === "SIGNED_IN") {
                // Verificar se 'session' e 'session.user' não são nulos antes de acessá-los
                if (session && session.user) {
                    setUser(session.user);
                    setAuth(true);
                }
            } else if (event === "SIGNED_OUT") {
                setAuth(false);
                setUser(null);
            }
        });
        return () => {
            data?.subscription.unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ auth, user, login, signOut, passwordReset }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;