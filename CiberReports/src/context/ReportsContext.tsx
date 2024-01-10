import { FormEvent, ReactNode, createContext } from "react";

export interface reports {
  id: number;
  user_id: string;
  title: string;
  description: string;
  topic: string;
  data: Date;
  estado: boolean;
  image_report_path: string;
}

interface ChildrenContext {
  children: ReactNode;
}
export default ChildrenContext;

export type ReportsDataContext = {
  reports: reports[];
  myReport: reports[];
  title: string;
  description: string;
  topic: string;
  date: Date;
  img: File | null;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setImg: React.Dispatch<React.SetStateAction<File | null>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  getAllReports: () => Promise<void>;
  getMyReport: () => Promise<void>;
  insertReports: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateReportImagePath: (idReport: number, pathImage: string) => Promise<void>;
};

export const ReportsContext = createContext<ReportsDataContext>(
  {} as ReportsDataContext
);
