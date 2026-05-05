import { Card, Tag } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ChatSummaryPanel() {
  return (
    <Card>
      <Tag>AI Summary</Tag>
      <h2 className="mt-5 font-serif text-3xl uppercase leading-tight">
        What this chat achieved
      </h2>
      <p className="mt-4 text-sm leading-6 text-[var(--grey-700)]">
        Defined the AI Activity Hub product concept, validated the Timeline / Inbox /
        Artifacts / Chats information architecture, outlined the local-first import model,
        and identified the first MVP screens.
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <SummaryMetric value="3" label="Decisions" />
        <SummaryMetric value="5" label="Tasks" />
        <SummaryMetric value="2" label="Artifacts" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary">Accept summary</Button>
        <Button variant="ghost">Regenerate</Button>
        <Button variant="ghost">Edit metadata</Button>
      </div>
    </Card>
  );
}

function SummaryMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-line-hair bg-paper-50 p-4">
      <div className="font-serif text-4xl leading-none">{value}</div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
    </div>
  );
}
