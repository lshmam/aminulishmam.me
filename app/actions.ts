"use server"

import { supabase } from "@/utils/supabase"

export interface Message {
  id: number
  content: string
  created_at: string
}

export async function addMessage(content: string) {
  try {
    const { data, error } = await supabase.from("messages").insert([{ content }]).select()

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Error adding message:", error)
    throw new Error("Failed to add message")
  }
}

export async function getMessages(): Promise<Message[]> {
  try {
    const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

