import { envs } from "@/constants/envs";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    envs.NEXT_PUBLIC_SUPABASE_URL!,
    envs.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
  );