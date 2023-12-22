import { FormEvent, ReactNode, createContext } from "react";

export interface profile {
  id: string;
  user_id: string;
  all_name: string;
  admin: boolean;
}

interface ChildrenContext {
  children: ReactNode;
}
export default ChildrenContext;

export type ReportsDataContext = {
  profile: profile[];
  all_name: string;
  isAdmin: boolean;
  isSpecialist: boolean;
  setAll_name: React.Dispatch<React.SetStateAction<string>>;
  getAllProfiles: () =>Promise<void>;
  insertProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  verificaAdmin: () => Promise<void>;
  verificaSpecialist: () => Promise<void>;
};

export const ReportsContext = createContext<ReportsDataContext>(
  {} as ReportsDataContext
);
