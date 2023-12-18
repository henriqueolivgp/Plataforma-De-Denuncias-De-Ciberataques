import { ReactNode, createContext } from "react";

export interface profile {
  id: number;
  all_name: string;
}

interface ChildrenContext {
  children: ReactNode;
}
export default ChildrenContext;

export type ProfileDataContext = {
  profiles: profile[];
  getallprofile: () => Promise<{ profiles: profile[] } | undefined>;
};

export const ProfileContext = createContext<ProfileDataContext>(
  {} as ProfileDataContext
);
