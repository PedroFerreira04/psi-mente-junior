import { Brain } from "lucide-react";

export const ChatHeader = () => {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">PsiConsultor Júnior</h1>
          <p className="text-xs text-muted-foreground">Assistente de Psicologia Clínica</p>
        </div>
      </div>
    </header>
  );
};
