import { FormEvent, ReactNode, createContext } from "react";

export interface profile {
  id: string;
  all_name: string;
}

interface ChildrenContext {
  children: ReactNode;
}
export default ChildrenContext;

export type ProfileDataContext = {
  
  profile: profile[];
  all_name: string;
  setAll_name: React.Dispatch<React.SetStateAction<string>>;
  getAllProfiles: () => Promise<void>;
  insertProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

export const ProfileContext = createContext<ProfileDataContext>(
  {} as ProfileDataContext
);
