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
      setProfile(data||[]);
  
  };

  const insertProfile = async (e: FormEvent<HTMLFormElement>) => {
    console.log('entrou no insert')
    e.preventDefault();

    const newProfile = {
      user_id: user?.id,
      all_name,
    };
    const result = await SupaBaseClient.from('profiles').insert(newProfile).select().single();
    setProfile([result.data, ...profile]);
    setAll_name('');

    console.log("Profile inserted successfully");

  };

  

  return (
    <ProfileContext.Provider value={{ profile, all_name, setAll_name, getAllProfiles, insertProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

