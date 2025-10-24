import { AlertCircle } from "lucide-react";

export const EthicalWarning = () => {
  return (
    <div className="border-b border-warning/20 bg-warning/10 px-4 py-3">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-warning-foreground mt-0.5" />
        <p className="text-sm text-warning-foreground">
          <strong>Lembrete Ético:</strong> A supervisão profissional é essencial. Este assistente é apenas um apoio.
        </p>
      </div>
    </div>
  );
};
