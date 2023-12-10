import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import ChildrenContext, { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from 'react';
import type { User, Session } from "@supabase/supabase-js";
import { toast } from 'react-toastify';



export const AuthProvider = async ({ children }: ChildrenContext) => {
    const [user, setUser] = useState<User>()
    const [session, setSession] = useState<Session | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await SupaBaseClient.auth.getSession();
            if (error) throw error;
            setSession(session)
            setUser(session?.user)
            setLoading(false);
        };

        const { data: listener } = SupaBaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user)
            setLoading(false)
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const SignOut = async ()  => {
        try {
            const { error } = await SupaBaseClient.auth.signOut()

            if (error) {
                toast.error('Erro no login!!');
            } else {
                toast.success('Usuário logado com sucesso!');
            }
        } catch (error) {
            toast.error('Erro no login!!!');
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await SupaBaseClient.auth.signInWithPassword({ email, password });

            if (error) {
                toast.error('Erro no login!!');
            } else {
                toast.success('Usuário logado com sucesso!');
            }
        } catch (error) {
            toast.error('Erro no login!!!');
        }
    };

    const passwordReset = async (email: string): Promise<void> => {
        await SupaBaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/update-password"
        });
    };

    return (
        <AuthContext.Provider value={{ user, signIn, SignOut, passwordReset }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;