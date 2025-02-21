import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp, AlertTriangle, Smile } from "lucide-react"

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
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <span className="text-gray-300">Total Messages</span>
            <span className="text-gray-300">152</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-300">New Today</span>
            <span className="text-gray-300">7</span>
          </li>
        </ul>
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

