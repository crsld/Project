import { createClient } from '@supabase/supabase-js'

// Set these in .env (local) and in Vercel → Project → Settings → Environment Variables.
// The anon key is designed to be public: access is controlled by Supabase Auth and Row Level Security.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)

if (!supabaseConfigured) {
  console.error('Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example).')
}

// Session handling is built in: the session is stored in the browser, refreshed automatically,
// and picked up from the link in confirmation emails.
export const supabase = supabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null
