import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This error will be thrown during the build process if variables are not set
  // or on the server-side. On the client, it might result in a less specific error.
  console.error('Supabase URL and Anon Key must be defined in .env file. The application may not function correctly.');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
