"use client";

import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ChatWindow } from "@/components/chat/chat-window";
import { ChatInput } from "@/components/chat/chat-input";
import { ContentInput } from "@/components/embed/content-input";

export default function Home() {
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const { toast } = useToast();

  const embedMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error("Failed to embed content");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Content embedded successfully",
        description:
          "Your content has been stored and can now be used for chat.",
      });
      setContent("");
    },
    onError: (error) => {
      toast({
        title: "Failed to embed content",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error("Failed to get response");
      return response.json();
    },
    onSuccess: (data) => {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEmbed = () => {
    if (!content.trim()) return;
    embedMutation.mutate(content);
  };

  const handleChat = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || chatMutation.isPending) return;
    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    chatMutation.mutate(message);
  };

  return (
    <div className="container mx-auto p-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Content Embedding Section */}
        <Card className="p-6 shadow-lg h-fit md:sticky md:top-20">
          <h2 className="text-2xl font-bold mb-4">Knowledge Base</h2>
          <ContentInput
            content={content}
            onChange={setContent}
            onSubmit={handleEmbed}
            isLoading={embedMutation.isPending}
          />
        </Card>

        {/* Chat Section */}
        <Card className="p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Chat</h2>
          <div className="space-y-4">
            <ChatWindow
              messages={chatHistory}
              isLoading={chatMutation.isPending}
            />
            <ChatInput
              message={message}
              onChange={setMessage}
              onSubmit={handleChat}
              isLoading={chatMutation.isPending}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
