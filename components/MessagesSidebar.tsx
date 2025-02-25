"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, AlertTriangle, Smile } from "lucide-react"
import { supabase } from "@/utils/supabase"

function MessageStats() {
  const [stats, setStats] = useState({ total: 0, today: 0 })

  useEffect(() => {
    async function fetchStats() {
      // Get total count
      const { count: total } = await supabase.from("messages").select("*", { count: "exact", head: true })

      // Get today's count
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { count: todayCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString())

      setStats({
        total: total || 0,
        today: todayCount || 0,
      })
    }

    fetchStats()

    // Subscribe to changes
    const channel = supabase
      .channel("messages-stats")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => fetchStats())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <ul className="space-y-2">
      <li className="flex items-center justify-between">
        <span className="text-gray-300">Total Messages</span>
        <span className="text-gray-300">{stats.total}</span>
      </li>
      <li className="flex items-center justify-between">
        <span className="text-gray-300">New Today</span>
        <span className="text-gray-300">{stats.today}</span>
      </li>
    </ul>
  )
}

export default function MessagesSidebar() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Message Board</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/messages" className="text-gray-300 hover:text-white flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              All Messages
            </Link>
          </li>
          <li>
            <Link href="/messages?filter=popular" className="text-gray-300 hover:text-white flex items-center">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Popular Messages
            </Link>
          </li>
          <li>
            <Link href="/messages?filter=flagged" className="text-gray-300 hover:text-white flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Flagged Messages
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Message Stats</h2>
        <MessageStats />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Community Guidelines</h2>
        <p className="text-gray-300 text-sm">
          Please be respectful and kind when leaving messages. No hate speech or inappropriate content allowed.
        </p>
      </div>

      <Button asChild className="w-full mt-4">
        <Link href="#leave-message">
          Leave a Message
          <Smile className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

