
import { FormEvent, useState } from "react";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ReportsContext } from "../context/ReportsContext";
import type { reports } from "../context/ReportsContext";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useImgs } from "../hooks/useImgs";

export function ReportsProvider({ children }: ChildrenContext) {
  const [reports, setReports] = useState<reports[]>([]);
  const [myReport, setMyReport] = useState<reports[]>([]);
  const { user } = useAuth();
  const { inertReportImage } = useImgs();

  const getMyReport = async () => {

    if (user) {

      try {

        const { data, error } = await SupaBaseClient
          .from("reports")
          .select()
          .eq('user_id', user.id);

        if (error) {
          console.error('Erro ao obter report:', error.message);
          return;
        }

        setMyReport(data || []);
      } catch (error) {
        console.error('Erro durante a obtenção do report:');
      }

    }
  };

  // Get All Reports

  const getAllReports = async () => {

    const { data } = await SupaBaseClient
      .from("reports")
      .select("*")

    // Certifique-se de que 'data' não é undefined antes de atribuir a 'setProfile'
    setReports(data || []);

  };

  // Insert Reports

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [img, setImg] = useState<File | null>(null);
  const [date, setDate] = useState<Date>(new Date());

  const insertReports = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const newReport = {
        user_id: user?.id,
        title: title,
        description: description,
        topic: topic,
        data: date,
      };

      if (newReport === null) {

        toast.error("You cant submit a null report");

      } else {

        const { data } = await SupaBaseClient.from('reports').insert(newReport).select().single();

        const reportSaveDB: reports = data;

        if (img) {
          const pathImgDB = await inertReportImage(img);

          if (pathImgDB) {
            await updateReportImagePath(reportSaveDB.id, pathImgDB);
          }
        }

        setReports([data.data]);
        setTopic('');
        setTitle('');
        setImg(null);
        setDescription('');
        setDate(new Date());

      }

    } catch (error) {
      toast.error("Erro do insert" + error);
    }

  };

  const updateReportImagePath = async (idReport: string, pathImage: string) => {

    // se for diferente de nada ele altera pq se nao for nada ele nao altera

    const newReport = {
      id: idReport,
      image_report_path: pathImage
    };

    try {
      // Assuming 'profiles' is the correct table name
      const { data, error } = await SupaBaseClient.from('reports')
        .upsert(newReport)
        .select()
        .single()

      if (error) {
        throw error;
      }
      // Set the profile state by accessing the data array
      setReports([data[0]]);

      console.log("Report updated successfully");
    } catch (error) {
      console.error("Error updating reports:");
      console.log(error)
    }

  };

  //   const updateProfile = async (e: FormEvent<HTMLFormElement>) => {

  //     e.preventDefault();

  //     // se for diferente de nada ele altera pq se nao for nada ele nao altera
  //     if (all_name.trim() !== '') {

  //       const newProfile = {
  //         user_id: user?.id,
  //         all_name,
  //       };

  //       try {
  //         // Assuming 'profiles' is the correct table name
  //         const { data, error } = await SupaBaseClient.from('profiles')
  //           .upsert({ id: myProfile[0].id, ...newProfile })
  //           .select();
  //         if (error) {
  //           throw error;
  //         }

  //         // Set the profile state by accessing the data array
  //         setProfile([data[0]]);
  //         setAll_name('');

  //         console.log("Profile updated successfully");
  //       } catch (error) {
  //         console.error("Error updating profile:");
  //         console.log(error)
  //       }
  //     }
  //   };

  //   const updateProfileImage = async (pathImage: string) => {

  //     // se for diferente de nada ele altera pq se nao for nada ele nao altera

  //       const newProfile = {
  //         user_id: user?.id,
  //         image_avatar_path: pathImage
  //       };

  //       try {

  //         console.log('antes do const:')
  //         // Assuming 'profiles' is the correct table name
  //         const { data, error } = await SupaBaseClient.from('profiles')
  //           .upsert({ id: myProfile[0].id, ...newProfile })
  //           .select();
  //           console.log('depois do const:')
  //         if (error) {
  //           throw error;
  //         }

  //         // Set the profile state by accessing the data array
  //         setProfile([data[0]]);

  //         console.log("Profile updated successfully");
  //       } catch (error) {
  //         console.error("Error updating profile:");
  //         console.log(error)
  //       }

  //   };

  return (
    <ReportsContext.Provider value={{ reports, myReport, title, description, topic, date, img, setTitle, setImg, setDescription, setTopic, setDate, getAllReports, getMyReport, insertReports, updateReportImagePath }}>
      {children}
    </ReportsContext.Provider>
  );
}

