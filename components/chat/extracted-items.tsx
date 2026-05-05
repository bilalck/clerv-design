import { CheckCircle2, FileText, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

const tasks = [
  "Create schema for conversations and artifacts.",
  "Design Inbox triage UI.",
  "Build Timeline empty state.",
];

const decisions = [
  "Use import-first architecture before live integrations.",
  "Start with Timeline, Inbox, Artifacts, and Chats as primary IA.",
  "Preserve source context for every extracted item.",
];

const artifacts = [
  "AI Activity Hub Product Plan",
  "Dashboard IA Flow",
];

export function ExtractedItems() {
  return (
    <Card>
      <Tag>Extracted Items</Tag>
      <h2 className="mt-5 font-serif text-3xl uppercase">Tasks, decisions and artifacts</h2>
      <div className="mt-6 grid gap-3 xl:grid-cols-3">
        <ExtractedList icon={<ListTodo className="h-4 w-4" />} title="Tasks" items={tasks} action="Create tasks" />
        <ExtractedList icon={<CheckCircle2 className="h-4 w-4" />} title="Decisions" items={decisions} action="Save decisions" />
        <ExtractedList icon={<FileText className="h-4 w-4" />} title="Artifacts" items={artifacts} action="Save artifacts" />
      </div>
    </Card>
  );
}

function ExtractedList({
  icon,
  title,
  items,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  action: string;
}) {
  return (
    <div className="border border-line-hair bg-paper-50 p-4">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center border border-line-medium bg-paper-0">{icon}</span>
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{title}</p>
      </div>
      <div className="mt-4 divide-y divide-line-hair border-t border-line-hair">
        {items.map((item) => (
          <p key={item} className="py-3 text-sm leading-6 text-[var(--grey-700)]">
            {item}
          </p>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="mt-4">
        {action}
      </Button>
    </div>
  );
}
