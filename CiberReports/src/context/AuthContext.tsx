import { ReactNode } from "react";
import { createContext } from "react";
import { User, Session } from "@supabase/supabase-js";

interface  ChildrenContext {
  children: ReactNode
}
export default ChildrenContext;

export type AuthDataContext = {
  session: Session | null | undefined;
  user: User | null | undefined;
  loading: boolean,
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void> ;
  signIn: (email: string, password: string) => Promise<void>; // Adjust the return type if needed
  passwordReset: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthDataContext>(
  {} as AuthDataContext
)