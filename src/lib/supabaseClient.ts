import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dgdkkjhhmzyiwzknrrlp.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_jYUS3PUbY_n6qNQsu2Bvmg_lyxFJXQw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
