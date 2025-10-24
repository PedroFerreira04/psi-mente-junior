import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Users, Scale } from "lucide-react";

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  { icon: FileText, text: "Estruturar Relatório", query: "Como estruturar um relatório psicológico?" },
  { icon: BookOpen, text: "Embasamento TCC", query: "Quais são as bases teóricas da TCC?" },
  { icon: Users, text: "Técnicas Adolescentes", query: "Quais técnicas funcionam bem com adolescentes?" },
  { icon: Scale, text: "Dúvidas de Ética", query: "Tenho dúvidas sobre questões éticas na psicologia" },
];

export const SuggestionChips = ({ onSelect }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Como posso ajudar?</h2>
        <p className="text-sm text-muted-foreground">
          Escolha uma das opções abaixo ou digite sua dúvida
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion) => (
          <Button
            key={suggestion.text}
            variant="outline"
            className="h-auto py-4 px-4 flex items-center gap-3 justify-start text-left hover:bg-accent/50 hover:border-primary/50 transition-all"
            onClick={() => onSelect(suggestion.query)}
          >
            <suggestion.icon className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-sm font-medium">{suggestion.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
