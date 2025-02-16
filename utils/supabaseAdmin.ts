import { createClient } from '@supabase/supabase-js';

export const useSupabaseAdmin = () => {
  const config = useRuntimeConfig();

  return createClient(
    config.public.supabaseUrl,
    config.private.supabaseServiceRole
  );
};