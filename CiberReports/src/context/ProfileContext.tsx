import { FormEvent, ReactNode, createContext } from "react";

export interface profile {
  id: number;
  user_id: string;
  all_name: string;
  admin: boolean;
  specialist: boolean;
  image_avatar_path: string;
}

export interface user {
  id: string;
}

interface ChildrenContext {
  children: ReactNode;
}
export default ChildrenContext;

export type ProfileDataContext = {
  
  profile: profile[];
  all_name: string;
  isAdmin: boolean;
  isSpecialist: boolean;
  admin: boolean | undefined;
  specialist: boolean | undefined;
  myProfile: profile[];
  setAll_name: React.Dispatch<React.SetStateAction<string>>;
  getAllProfiles: () =>Promise<void>;
  getMyProfile: () => Promise<void>;
  setSpecialist: React.Dispatch<React.SetStateAction<boolean | undefined>>
  setAdmin: React.Dispatch<React.SetStateAction<boolean | undefined>>
  insertProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  insertAutoProfile: (userId: user) => Promise<void>;
  updateUsersProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateProfile: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateProfileAvatarPath: (pathImage: string) =>Promise<void>;
  updateProfileBannerPath: (pathImage: string) =>Promise<void>;
  verificaAdmin: () => Promise<void>;
  verificaSpecialist: () => Promise<void>;
};

export const ProfileContext = createContext<ProfileDataContext>(
  {} as ProfileDataContext
);
