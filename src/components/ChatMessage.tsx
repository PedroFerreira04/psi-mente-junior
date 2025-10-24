import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

export const ChatMessage = ({ content, isUser }: ChatMessageProps) => {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold text: **text**
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Bullet points: - text or • text
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        line = `<li>${line.replace(/^[\s]*[-•][\s]*/, '')}</li>`;
      }
      
      return line;
    }).join('\n');
  };

  const formattedContent = formatContent(content);
  const hasBullets = formattedContent.includes('<li>');

  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border border-border"
        )}
      >
        {hasBullets ? (
          <div>
            {formattedContent.split('\n').map((line, i) => {
              if (line.includes('<li>')) {
                return (
                  <ul key={i} className="list-disc list-inside space-y-1">
                    <li dangerouslySetInnerHTML={{ __html: line.replace(/<\/?li>/g, '') }} />
                  </ul>
                );
              }
              return (
                <p key={i} dangerouslySetInnerHTML={{ __html: line }} className="mb-2 last:mb-0" />
              );
            })}
          </div>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: formattedContent.replace(/\n/g, '<br>') }} />
        )}
      </div>
    </div>
  );
};
