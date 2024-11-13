import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { motion } from "framer-motion";

interface ChatWindowProps {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isLoading?: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[600px] overflow-y-auto p-4 border rounded-lg bg-gray-50">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white shadow-md p-4 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={chatEndRef} />
    </div>
  );
}
