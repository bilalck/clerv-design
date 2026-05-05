import * as React from "react";
import { Archive, CheckCircle2, FilePlus2, FolderPlus, ListChecks, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag as Label } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type InboxItem = {
  id: string;
  platform: string;
  type: "Planning" | "Artifact" | "Import" | "Sensitive" | "Unassigned";
  title: string;
  summary: string;
  suggestedProject?: string;
  detected: {
    decisions: number;
    tasks: number;
    artifacts: number;
  };
  status: "new" | "needs-review" | "sensitive";
};

const statusClasses = {
  new: "border-line-medium text-[var(--grey-700)]",
  "needs-review": "border-[var(--accent-warn)] text-[var(--accent-warn)]",
  sensitive: "border-[var(--accent-danger)] text-[var(--accent-danger)]",
};

export function InboxCard({ item }: { item: InboxItem }) {
  return (
    <Card>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Label>{item.platform}</Label>
            <Label>{item.type}</Label>
            <span className={cn("editorial-tag", statusClasses[item.status])}>{item.status}</span>
          </div>
          <h3 className="mt-5 font-serif text-3xl uppercase leading-tight">{item.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--grey-700)]">{item.summary}</p>
        </div>

        {item.suggestedProject ? (
          <div className="min-w-[220px] border border-line-hair bg-paper-50 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">Suggested project</p>
            <p className="mt-2 text-sm text-ink">{item.suggestedProject}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid gap-2 border-l border-line-strong pl-4 md:grid-cols-3">
        <DetectedMetric label="Decisions" value={item.detected.decisions} />
        <DetectedMetric label="Tasks" value={item.detected.tasks} />
        <DetectedMetric label="Artifacts" value={item.detected.artifacts} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary" size="sm">
          <FolderPlus className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Accept project
        </Button>
        <Button variant="ghost" size="sm">
          <ListChecks className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Extract tasks
        </Button>
        <Button variant="ghost" size="sm">
          <FilePlus2 className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Save artifact
        </Button>
        <Button variant="ghost" size="sm">
          <Tag className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Tag
        </Button>
        <Button variant="ghost" size="sm">
          <Archive className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Archive
        </Button>
      </div>
    </Card>
  );
}

function DetectedMetric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-4xl leading-none">{value}</div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
    </div>
  );
}
