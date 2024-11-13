import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload } from "lucide-react";

interface ContentInputProps {
  content: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function ContentInput({
  content,
  onChange,
  onSubmit,
  isLoading,
}: ContentInputProps) {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Enter content to embed into the knowledge base..."
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[200px] resize-none"
      />
      <Button
        onClick={onSubmit}
        disabled={isLoading || !content.trim()}
        className="w-full transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Embedding Content...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Embed Content
          </>
        )}
      </Button>
    </div>
  );
}
