import Sidebar from "@/components/Sidebar";
import { getMessages } from "@/app/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Add interface for message type
interface Message {
  id: number;
  content: string;
  timestamp: string;
}

export default async function MessagesPage() {
  const messages = (await getMessages()) as Message[];

  return (
    <>
      <Sidebar />
      <main className="space-y-8">
        <h1 className="text-4xl font-bold mb-8">Message Board</h1>
        {messages.length > 0 ? (
          <>
            <p className="text-gray-400 mb-4">
              Messages are displayed with the most recent at the top.
            </p>
            <div className="grid gap-6">
              {messages
                .slice()
                .reverse()
                .map((message) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <CardTitle>
                        {new Date(message.timestamp).toLocaleString()}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{message.content}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400">
            No messages yet. Be the first to leave a message!
          </p>
        )}
      </main>
    </>
  );
}
