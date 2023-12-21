import { FormEvent, useState } from "react";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ProfileContext } from "../context/ProfileContext";
import type { profile } from "../context/ProfileContext";
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



  return (
    <ProfileContext.Provider value={{ profile, all_name, isAdmin, setAll_name, getAllProfiles, insertProfile, updateProfile, verificaAdmin }}>
      {children}
    </ProfileContext.Provider>
  );
}

