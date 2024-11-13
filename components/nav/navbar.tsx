import { MessageSquareText } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex gap-2 items-center mr-4">
          <MessageSquareText className="h-6 w-6" />
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-xl">
              VectorChat AI
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="https://github.com/yourusername/vectorchat-ai"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              GitHub
            </Link>
            <Link
              href="https://astra.datastax.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              DataStax
            </Link>
            <Link
              href="https://platform.openai.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              OpenAI
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
