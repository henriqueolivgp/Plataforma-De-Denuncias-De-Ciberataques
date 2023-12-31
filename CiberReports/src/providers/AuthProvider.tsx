import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import ChildrenContext, { AuthContext } from "../context/AuthContext";
import { useEffect, useState } from 'react';
import type { User, Session } from "@supabase/supabase-js";
import { toast } from 'react-toastify';

export function AuthProvider({ children }: ChildrenContext) {
    const [user, setUser] = useState<User>()
    const [session, setSession] = useState<Session | null>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await SupaBaseClient.auth.getSession();
            if (error) {
                // Handle error, se necessário
                console.error('Erro ao obter sessão:', error.message);
                return;
            }
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

    const signOut = async () => {
        try {
            const { error } = await SupaBaseClient.auth.signOut()

            if (error) {

                toast.error('Erro no login!!');

            } else {

                toast.success('LogOut Sucefull');
                setSession(undefined)
                setUser(undefined);

            }
        } catch (error) {

            toast.error('Erro no login!!!');

        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            // erro
            const { data, error } = await SupaBaseClient.auth.signUp({ email, password });
            if (!error && data) {
                setSession(data.session);
                setUser(data.session?.user)
            } else {
                throw new Error(error?.message || 'Unknown error');
            }
        } catch (error) {
            throw toast.error("Error in Creating Account");

        }
    };

    const signIn = async (email: string, password: string) => {
        try {

            const { data, error } = await SupaBaseClient.auth.signInWithPassword({ email, password });

            if (error) {
                toast.error('Erro no login!!');
            } else {
                toast.success('Utilizador fez login com sucesso!');
                setSession(data.session)
                setUser(data.session.user)
            }
        } catch (error) {
            console.log('Erro no login!!!');
        }
    };

    const passwordReset = async (email: string): Promise<void> => {

        try {

            const { error } = await SupaBaseClient.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://example.com/account/update-password',
            })

            if (error) {
                toast.error('Erro no login!!');
            } else {
                console.log('Usuário logado com sucesso!');
            }
        } catch (error) {
            console.log('Erro no login!!!');
        }
    };

    const passwordUpdate = async (new_password: string) => {
        try {

            const { data, error } = await SupaBaseClient.auth.updateUser({ password: new_password })

            if (error) {
                toast.error('Erro no login!!');
            } else {
                setUser(data.user)
                console.log('Usuário logado com sucesso!');
            }

        } catch (error) {

            console.log(error)

        }

    }

    return (
        // passar todos os tipos declarados anteriormente
        <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut, passwordReset, passwordUpdate }}>
            {children}
        </AuthContext.Provider>
    );
}

