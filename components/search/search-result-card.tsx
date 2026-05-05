import { Archive, CheckCircle2, FileText, FolderKanban, ListTodo, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SearchResult = {
  id: string;
  type: "Chat" | "Artifact" | "Decision" | "Task" | "Project" | "Timeline Event";
  title: string;
  source: string;
  summary: string;
  project?: string;
  date: string;
  confidence: number;
};

const iconMap = {
  Chat: MessageSquare,
  Artifact: Archive,
  Decision: CheckCircle2,
  Task: ListTodo,
  Project: FolderKanban,
  "Timeline Event": FileText,
};

const typeClass = {
  Chat: "border-line-medium text-[var(--grey-700)]",
  Artifact: "border-[var(--accent-green)] text-[var(--accent-green)]",
  Decision: "border-[var(--accent-green)] text-[var(--accent-green)]",
  Task: "border-[var(--accent-warn)] text-[var(--accent-warn)]",
  Project: "border-line-medium text-[var(--grey-700)]",
  "Timeline Event": "border-line-medium text-[var(--grey-700)]",
};

export function SearchResultCard({ result }: { result: SearchResult }) {
  const Icon = iconMap[result.type];

  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-[40px_minmax(0,1fr)_auto] md:items-start">
        <span className="grid h-10 w-10 place-items-center border border-line-medium bg-paper-50">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>

        <div>
          <div className="flex flex-wrap gap-2">
            <span className={cn("editorial-tag", typeClass[result.type])}>{result.type}</span>
            <Tag>{result.source}</Tag>
            {result.project ? <Tag>{result.project}</Tag> : null}
          </div>
          <h3 className="mt-5 font-serif text-3xl uppercase leading-tight">{result.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--grey-700)]">{result.summary}</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
            {result.date} · Confidence {Math.round(result.confidence * 100)}%
          </p>
        </div>

        <Button variant="primary" size="sm">Open</Button>
      </div>
    </Card>
  );
}
