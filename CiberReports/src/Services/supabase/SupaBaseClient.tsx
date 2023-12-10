import { createClient } from "@supabase/supabase-js";

const projectURL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const projectKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

console.log(projectKey);

export const SupaBaseClient = createClient(projectURL, projectKey);