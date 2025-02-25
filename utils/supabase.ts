"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON!;

interface Message {
  id: number;
  content: string;
  created_at: string;
}

interface Database {
  public: {
    Tables: {
      messages: {
        Row: Message;
        Insert: Omit<Message, "id">;
        Update: Partial<Message>;
      };
    };
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
