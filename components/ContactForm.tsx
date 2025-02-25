"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setMessage(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setIsSubmitting(true);

      // Add timestamp to ensure proper ordering
      const { data, error } = await supabase.from("messages").insert([
        {
          content: message.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message);
      }

      setMessage("");
      setCharCount(0);
      toast({
        title: "Message sent!",
        description: "Your message has been added to the board.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Textarea
          placeholder="Your anonymous message"
          className="bg-gray-800 border-gray-700 min-h-[100px]"
          value={message}
          onChange={handleChange}
          disabled={isSubmitting}
          maxLength={MAX_CHARS}
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>
            {charCount} / {MAX_CHARS} characters
          </span>
          {charCount >= MAX_CHARS && (
            <span className="text-red-400">Maximum length reached</span>
          )}
        </div>
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !message.trim() || charCount > MAX_CHARS}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
