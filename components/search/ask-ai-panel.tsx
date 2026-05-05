import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function AskAiPanel() {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 place-items-center border border-line-medium bg-paper-50">
          <Sparkles aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <Tag>Ask</Tag>
          <h2 className="mt-5 font-serif text-3xl uppercase">Ask across AI work</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--grey-700)]">
            Example: “Find the prompt where I made the dashboard IA” or “Show all UX research outputs from Claude and ChatGPT.”
          </p>
        </div>
      </div>

      <div className="mt-6 border border-line-hair bg-paper-50 p-4">
        <input
          aria-label="Ask AI Activity Hub"
          placeholder="Ask about your AI work…"
          className="w-full border-0 border-b border-line-strong bg-transparent py-3 text-lg outline-none focus:border-ink"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary">Ask</Button>
        <Button variant="ghost">Use semantic search</Button>
      </div>
    </Card>
  );
}
