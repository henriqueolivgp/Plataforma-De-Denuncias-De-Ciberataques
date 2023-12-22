
import { FormEvent, useState } from "react";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ProfileContext } from "../context/ProfileContext";
import type { profile } from "../context/ProfileContext";
import type { user } from "../context/ProfileContext";
import { useAuth } from "../hooks/useAuth";

export function ProfileProvider({ children }: ChildrenContext) {
  const [profile, setProfile] = useState<profile[]>([]);
  const [myProfile, setMyProfile] = useState<profile[]>([]);
  const [all_name, setAll_name] = useState<string>('');
  const { user } = useAuth();

//   const getMyReport = async () => {

//     if (user) {

//       try {

//         // Utiliza o SupabaseClient para consultar a tabela 'profiles' procurando pelo ID do usuário
//         const { data, error } = await SupaBaseClient
//           .from("reports")
//           .select()
//           .eq('user_id', user.id);

//         // Verifica se ocorreu algum erro durante a consulta
//         if (error) {
//           console.error('Erro ao obter perfil:', error.message);
//           return;
//         }
//         // Exibe os dados resultantes no console

//         // Certifica-se de que 'data' não é undefined antes de atribuir a 'setMyProfile'
//         setMyProfile(data || []);
//       } catch (error) {
//         console.error('Erro durante a obtenção do perfil:');
//       }

//     } 
//   };

  // Importe os tipos necessários (suponhamos que você tenha uma interface chamada 'Pr

  const getAllProfiles = async () => {

    const { data } = await SupaBaseClient
      .from("profiles")
      .select("*")
      .order("inserted_at", { ascending: false });

    // Certifique-se de que 'data' não é undefined antes de atribuir a 'setProfile'
    setProfile(data || []);

  };

  const insertProfile = async (e: FormEvent<HTMLFormElement>) => {
    console.log('entrou no insert')

    e.preventDefault();

    const newProfile = {
      user_id: user?.id,
      all_name,
    };

    console.log(newProfile)

    const {data, error} = await SupaBaseClient.from('profiles').insert(newProfile).select().single();
    setProfile([data.data]);
    setAll_name('');

    console.log("Erro do insert" + error);

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
    <ProfileContext.Provider value={{  }}>
      {children}
    </ProfileContext.Provider>
  );
}

