import { motion } from "framer-motion";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mb-4 last:mb-0 ${
        role === "user" ? "flex justify-end" : "flex justify-start"
      }`}
    >
      <div
        className={`p-4 rounded-lg max-w-[80%] ${
          role === "user" ? "bg-blue-500 text-white" : "bg-white shadow-md"
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}
