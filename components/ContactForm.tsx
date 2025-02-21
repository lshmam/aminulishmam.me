"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { addMessage } from "@/app/actions";

export default function ContactForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        await addMessage(message);
        setMessage("");
        toast({
          title: "Message sent!",
          description: "Your message has been added to the board.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description:
            "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Textarea
        placeholder="Your anonymous message"
        className="bg-gray-800 border-gray-700"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" size="lg">
        Send Message
      </Button>
    </form>
  );
}
