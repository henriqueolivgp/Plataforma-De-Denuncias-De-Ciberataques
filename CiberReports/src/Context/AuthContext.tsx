import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { SupaBaseClient } from '../Services/supabase/SupaBaseClient';
import { User, Session } from "@supabase/supabase-js";

type ChildrenContext = {
  children: ReactNode,
  children2: ReactNode
}

export const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>; // Adjust the return type if needed
  passwordReset: (email: string) => Promise<void>;
}>({
  session: null,
  user: null,
  signOut: () => { },
  signIn: async (email: string, password: string) => Promise<void>, // Provide a placeholder implementation or leave it empty
  passwordReset: async (email) => { }, // Provide a placeholder implementation or leave it empty
});


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

  const SignOut = {
    session,
    user,
    signOut: () => SupaBaseClient.auth.signOut(),
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: userData, error } = await SupaBaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        console.error('Erro no login:', error.message);
        // Handle the error as needed
      } else {
        console.log('Usuário logado com sucesso:', userData);
        // Update the state or perform other actions after successful login
      }
    } catch (error) {
      console.error('Erro no login:');
      // Handle the error as needed
    }
  };

  const passwordReset = (email: string) =>
    SupaBaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password"
    });




  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={{ user, signIn, SignOut, passwordReset }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};g

export default AuthProvider;
