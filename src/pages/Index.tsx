import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { EthicalWarning } from "@/components/EthicalWarning";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { SuggestionChips } from "@/components/SuggestionChips";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const WEBHOOK_URL = "https://auld-fernando-heteronomously.ngrok-free.dev/webhook/17b71044-e141-4931-8a90-8163405c923c";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      const text = await response.text();
      
      if (!text || text.trim() === '') {
        throw new Error("Resposta vazia do servidor");
      }

      const data = JSON.parse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.output || data.response || data.message || "Desculpe, não recebi uma resposta válida.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Não foi possível conectar com o assistente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader />
      <EthicalWarning />
      
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <SuggestionChips onSelect={sendMessage} />
        ) : (
          <div className="space-y-4 px-4 py-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
