import { useState } from "react";
import type { profile } from "../context/ProfileContext";
import { SupaBaseClient } from "../Services/supabase/SupaBaseClient";
import ChildrenContext, { ProfileContext } from "../context/ProfileContext";

export function ProfileProvider({ children }: ChildrenContext) {
  const [profiles, setProfiles] = useState<profile[]>([]);
  const getallprofile = async () => {
    const { data } = await SupaBaseClient.from("profiles")
      .select("*")
      .order("inserted_at", { ascending: false });
    setProfiles(data || []);
    // Retornar as imagens aqui
    return { profiles };
  };
  return (
    <ProfileContext.Provider value={{ profiles, getallprofile }}>
      {children}
    </ProfileContext.Provider>
  );
}
