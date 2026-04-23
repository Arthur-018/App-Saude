import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://akbucvhiygynfgjbggrs.supabase.co";
const supabaseAnonKey = "sb_publishable_dzCah53p9yMa03cWmL9Ogw_D85yQP76";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);