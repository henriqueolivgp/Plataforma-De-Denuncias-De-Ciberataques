import { FormEvent, useState } from "react";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ProfileContext } from "../context/ProfileContext";
import type { profile } from "../context/ProfileContext";
import type { user } from "../context/ProfileContext";
import { useAuth } from "../hooks/useAuth";

export function ProfileProvider({ children }: ChildrenContext) {
  const [profile, setProfile] = useState<profile[]>([]);
  const [all_name, setAll_name] = useState<string>('');
  const { user } = useAuth();

  // Importe os tipos necessários (suponhamos que você tenha uma interface chamada 'Pr

  const getAllProfiles = async () => {

    const { data } = await SupaBaseClient
      .from("profiles")
      .select("*")
      .order("inserted_at", { ascending: false });

    // Certifique-se de que 'data' não é undefined antes de atribuir a 'setProfile'
    setProfile(data || []);

  };

  const [users, setUsers] = useState<user[]>([]);

  const getAllUsers = async () => {

    console.log('estou no getUsers')

    const { data } = await SupaBaseClient.from("auth.users").select("*")

    // Certifique-se de que 'data' não é undefined antes de atribuir a 'setProfile'
    setUsers(data || []);

  };

  const insertProfile = async (e: FormEvent<HTMLFormElement>) => {
    console.log('entrou no insert')
    e.preventDefault();

    const newProfile = {
      user_id: user?.id,
      all_name,
    };

    const result = await SupaBaseClient.from('profiles').insert(newProfile).select().single();
    setProfile([result.data]);
    setAll_name('');

    console.log("Profile inserted successfully");

  };

  const insertAutoProfile = async (userId: user): Promise<void> => {
    try {
      console.log('Iniciando inserção de perfil para o usuário:', userId);

      const { data: dataSearch } = await SupaBaseClient.from('profiles').select().eq('user_id', userId.id)
      console.log(dataSearch)

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

      console.log(data + 'antes do if')

      if (error) {
        console.error('Erro ao inserir perfil:', error);
        //  throw error;Adicione um throw para propagar o erro
      }

      console.log(data + 'depois do if')

      console.log('Perfil inserido com sucesso:', data);

    } catch (error) {
      console.error('Erro ao inserir perfil:', error);
      throw error; // Adicione um throw para propagar o erro
    }
  };



  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // se for diferente de nada ele altera pq se nao for nada ele nao altera
    if (all_name.trim() !== '') {

      const newProfile = {
        user_id: user?.id,
        all_name,
      };

      try {
        // Assuming 'profiles' is the correct table name
        const { data, error } = await SupaBaseClient.from('profiles')
          .upsert({ id: profile[0].id, ...newProfile })
          .select();
        if (error) {
          throw error;
        }

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

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const verificaAdmin = async () => {

    const { data: userData } = await SupaBaseClient
      .from("profiles")
      .select("admin")
      .eq("id", profile[0].id);

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
      .eq("id", profile[0].id);

    if (userData && userData.length > 0) {
      setIsSpecialist(userData[0].specialist || false);
    } else {
      // Define um valor padrão se userData for nulo ou vazio
      setIsSpecialist(false);
    }

  }

  return (
    <ProfileContext.Provider value={{ profile, all_name, isAdmin, isSpecialist, users, setAll_name, getAllProfiles, getAllUsers, insertProfile, insertAutoProfile, updateProfile, verificaAdmin, verificaSpecialist }}>
      {children}
    </ProfileContext.Provider>
  );
}

