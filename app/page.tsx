"use client";

import { useState } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchServerSentEvents("/api/ai"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto my-20">
      <Card className="min-h-[600px] flex flex-col justify-between">
        <CardHeader>
          <CardTitle>TanStack AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-6">
          {messages.map((message) => (
            <div className="flex flex-col gap-3" key={message.id}>
              <div className="font-semibold mt-3">
                {message.role === "assistant" ? "Assistant" : "You"}
              </div>
              <div className="text-sm">
                {message.parts.map((part, idx) => {
                  if (part.type === "thinking") {
                    return (
                      <div
                        key={idx}
                        className="text-sm text-gray-500 italic mb-2"
                      >
                        💭 Thinking: {part.content}
                      </div>
                    );
                  }
                  if (part.type === "text") {
                    return <div key={idx}>{part.content}</div>;
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={!input.trim() || isLoading}>
                <SendIcon className="size-4" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
