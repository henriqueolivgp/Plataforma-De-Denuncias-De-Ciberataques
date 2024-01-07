import { User } from "@supabase/supabase-js";
import { ReactNode, createContext } from "react";

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
  reportImage: ImgType[];
  getBanner: () => Promise<{ bannerImage: ImgType[] } | undefined>
  getAvatar: () => Promise<{ avatarImage: ImgType[] } | undefined>
  getRportImage: () => Promise<{  reportImage: ImgType[] } | undefined>
  uploadBanner: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploadAvatar: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  inertReportImage: (pathImage: string) => Promise<string | undefined>;
  updateAvatar: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  updateBanner: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  // Reports Image

}

export const ImgsContext = createContext<ImgsDataContext>(
  {} as ImgsDataContext
)