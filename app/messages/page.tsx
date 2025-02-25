"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/utils/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface Message {
  id: number
  content: string
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message
          setMessages((current) => [newMessage, ...current])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchMessages() {
    try {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message)
      }

      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Sidebar />
        <main className="space-y-8">
          <h1 className="text-4xl font-bold mb-8">Message Board</h1>
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">Message Board</h1>
        {messages.length > 0 ? (
          <>
            <p className="text-gray-400 mb-4">Messages are displayed with the most recent at the top.</p>
            <div className="grid gap-6">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardHeader>
                    <CardTitle>{new Date(message.created_at).toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400">No messages yet. Be the first to leave a message!</p>
        )}
      </main>
    </>
  )
}

