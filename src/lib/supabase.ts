import { createClient } from '@supabase/supabase-js';

let client: ReturnType<typeof createClient>;
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !URL.canParse(url) || new URL(url).protocol !== 'https:') throw new Error('Servicio de cuentas no disponible.');
  return client ??= createClient(url, key);
}
