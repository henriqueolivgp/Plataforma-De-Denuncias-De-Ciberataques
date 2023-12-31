import { FormEvent, useState } from "react";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ProfileContext } from "../context/ProfileContext";
import type { profile } from "../context/ProfileContext";
import type { user } from "../context/ProfileContext";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

export function ProfileProvider({ children }: ChildrenContext) {
  const [profile, setProfile] = useState<profile[]>([]);
  const [myProfile, setMyProfile] = useState<profile[]>([]);
  const [all_name, setAll_name] = useState<string>('');
  const [profileAll_name, setProfileAll_name] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>();
  const [specialist, setSpecialist] = useState<boolean>();
  const { user } = useAuth();

  const getMyProfile = async () => {

    if (user) {

      try {

        // Utiliza o SupabaseClient para consultar a tabela 'profiles' procurando pelo ID do usuário
        const { data, error } = await SupaBaseClient
          .from("profiles")
          .select()
          .eq('user_id', user.id);

        // Verifica se ocorreu algum erro durante a consulta
        if (error) {
          console.error('Erro ao obter perfil:', error.message);
          return;
        }
        // Exibe os dados resultantes no console

        // Certifica-se de que 'data' não é undefined antes de atribuir a 'setMyProfile'
        setMyProfile(data || []);
      } catch (error) {
        console.error('Erro durante a obtenção do perfil:');
      }

    }
  };

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

    const { data, error } = await SupaBaseClient.from('profiles').insert(newProfile).select().single();
    setProfile([data.data]);
    setAll_name('');

    console.log("Erro do insert" + error);

  };

  const insertAutoProfile = async (userId: user): Promise<void> => {
    try {

      const { data: dataSearch } = await SupaBaseClient.from('profiles').select().eq('user_id', userId.id)

      if (dataSearch !== null && dataSearch.length > 0) {
        console.log('entrou aqui');
        console.log(dataSearch.length);
        return;
      }

      // Realiza a inserção na tabela 'profiles'
      const { data, error } = await SupaBaseClient.from('profiles').upsert([
        {
          user_id: userId.id,
          // Outros campos do perfil
        },
      ]);


      if (error) {
        console.error('Erro ao inserir perfil:', error);
        //  throw error;Adicione um throw para propagar o erro
      }


      console.log('Perfil inserido com sucesso:', data);

    } catch (error) {
      console.error('Erro ao inserir perfil:', error);
      throw error; // Adicione um throw para propagar o erro
    }
  };

  const updateUsersProfile = async (idProfile: number, e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // se for diferente de nada ele altera pq se nao for nada ele nao altera
    const newUserProfile = {
      all_name: profileAll_name,
      admin,
      specialist,
    };

    try {
      // Assuming 'profiles' is the correct table name
      const { error } = await SupaBaseClient.from('profiles')
        .update({ ...newUserProfile })
        .eq('id', idProfile)
        .select()
      if (error) {
        throw error;
      }

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:");
      console.log(error)
    }

  };

  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!user || !myProfile[0]) {
      toast.error("User or profile not found");
      return;
    }

    // se for diferente de nada ele altera pq se nao for nada ele nao altera

    if (all_name.trim() !== '') {
      const newProfile = {
        user_id: user?.id,
        all_name,
      };

      try {
        // Assuming 'profiles' is the correct table name
        const { data, error } = await SupaBaseClient.from('profiles')
          .upsert({ id: myProfile[0].id, ...newProfile })
          .select();
        if (error) {
          throw error;
        }

        // Atualiza o estado local do perfil com os dados atualizados
        setProfile((prevProfiles) =>
          prevProfiles.map((prevProfile) =>
            prevProfile.id === myProfile[0].id ? data[0] : prevProfile
          )
        );

        // Set the profile state by accessing the data array
        setProfile([data[0]]);
        setAll_name('');

        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:");
        console.log(error)
      }
    }
  };

  const updateProfileAvatarPath = async (pathImage: string) => {

    // se for diferente de nada ele altera pq se nao for nada ele nao altera

    const newProfile = {
      user_id: user?.id,
      image_avatar_path: pathImage
    };

    try {

      console.log('antes do const:')
      // Assuming 'profiles' is the correct table name
      const { data, error } = await SupaBaseClient.from('profiles')
        .upsert({ id: myProfile[0].id, ...newProfile })
        .select();
      if (error) {
        throw error;
      }

      // Set the profile state by accessing the data array
      setProfile([data[0]]);

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:");
      console.log(error)
    }

  };

  const updateProfileBannerPath = async (pathImage: string) => {

    // se for diferente de nada ele altera pq se nao for nada ele nao altera

    const newProfile = {
      user_id: user?.id,
      image_banner_path: pathImage
    };

    try {

      console.log('antes do const:')
      // Assuming 'profiles' is the correct table name
      const { data, error } = await SupaBaseClient.from('profiles')
        .upsert({ id: myProfile[0].id, ...newProfile })
        .select();
      if (error) {
        throw error;
      }

      // Set the profile state by accessing the data array
      setProfile([data[0]]);

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:");
      console.log(error)
    }

  };

  const deleteProfile = async (idProfile: number) => {

    try {

      await SupaBaseClient.from('profiles').delete().eq('id', idProfile);

    } catch (error) {
      console.log(error);
    }

  };

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const verificaAdmin = async () => {

    const { data: userData } = await SupaBaseClient
      .from("profiles")
      .select("admin")
      .eq("id", myProfile[0].id);

    if (userData && userData.length > 0) {
      setIsAdmin(userData[0].admin || false);

    } else {
      // Define um valor padrão se userData for nulo ou vazio
      setIsAdmin(false);
    }

  }

  const [isSpecialist, setIsSpecialist] = useState<boolean>(false);

  const verificaSpecialist = async () => {

    const { data: userData } = await SupaBaseClient
      .from("profiles")
      .select("specialist")
      .eq("id", myProfile[0].id);

    if (userData && userData.length > 0) {
      setIsSpecialist(userData[0].specialist || false);
    } else {
      // Define um valor padrão se userData for nulo ou vazio
      setIsSpecialist(false);
    }

  }

  return (
    <ProfileContext.Provider value={{
      profile,
      all_name,
      isAdmin,
      isSpecialist,
      admin,
      specialist,
      myProfile,
      profileAll_name,
      setAll_name,
      setProfileAll_name,
      setSpecialist,
      setAdmin,
      getAllProfiles,
      getMyProfile,
      insertProfile,
      insertAutoProfile,
      updateUsersProfile,
      updateProfile,
      updateProfileAvatarPath,
      updateProfileBannerPath,
      deleteProfile,
      verificaAdmin,
      verificaSpecialist
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

