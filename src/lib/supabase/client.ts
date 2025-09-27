import { envs } from "@/constants/envs";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    envs.NEXT_PUBLIC_SUPABASE_URL!,
    envs.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
  );
}
