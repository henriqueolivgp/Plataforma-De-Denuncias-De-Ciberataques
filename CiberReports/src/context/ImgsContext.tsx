import { User } from "@supabase/supabase-js";
import { ReactNode, createContext } from "react";

console.log("passei pelo imgsContext");

export interface ImgType {
    name: string;
}

interface  ChildrenContext {
    children: ReactNode
  }
  export default ChildrenContext;

export type ImgsDataContext = {
    
    user: User | null | undefined;
    bannerImages: ImgType[];
    avatarImages: ImgType[];
    images: ImgType[];
    getImages: () => Promise<{ bannerImages: ImgType[]; avatarImages: ImgType[]; images: ImgType[]; } | undefined>
    uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;

  }

export const ImgsContext = createContext<ImgsDataContext>(
    {} as ImgsDataContext 
  )