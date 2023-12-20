import { User } from "@supabase/supabase-js";
import { ReactNode, createContext } from "react";

console.log("passei pelo imgsContext");

export interface ImgType {
  id: string;
  name: string;
}

interface ChildrenContext {
  children: ReactNode
}
export default ChildrenContext;

export type ImgsDataContext = {

  user: User | null | undefined;
  bannerImage: ImgType[];
  avatarImage: ImgType[];
  getBanner: () => Promise<{ bannerImage: ImgType[] } | undefined>
  getAvatar: () => Promise<{ avatarImage: ImgType[] } | undefined>
  uploadBanner: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  updateAvatar: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ImgsContext = createContext<ImgsDataContext>(
  {} as ImgsDataContext
)