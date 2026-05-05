import * as React from "react";
import { Archive, CheckCircle2, ExternalLink, FolderPlus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ActivityEvent = {
  id: string;
  time: string;
  platform: string;
  type: string;
  title: string;
  summary: string;
  project?: string;
  tags: string[];
  artifacts?: string[];
  status: "new" | "reviewed" | "archived";
};

const statusMap = {
  new: "border-[var(--accent-warn)] text-[var(--accent-warn)]",
  reviewed: "border-[var(--accent-green)] text-[var(--accent-green)]",
  archived: "border-line-medium text-[var(--grey-500)]",
};

export function ActivityEventCard({ event }: { event: ActivityEvent }) {
  return (
    <Card className="relative">
      <span className="absolute -left-[37px] top-6 grid h-5 w-5 place-items-center rounded-full border border-ink bg-paper-0" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Tag>{event.platform}</Tag>
            <Tag>{event.type}</Tag>
            <span className={cn("editorial-tag", statusMap[event.status])}>{event.status}</span>
          </div>
          <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{event.time}</p>
          <h3 className="mt-3 font-serif text-3xl uppercase leading-tight">{event.title}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--grey-700)]">{event.summary}</p>
        </div>
        {event.project ? (
          <div className="border border-line-hair bg-paper-50 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--grey-700)]">
            {event.project}
          </div>
        ) : null}
      </div>

      {event.artifacts?.length ? (
        <div className="mt-6 border-l border-line-strong pl-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">Artifacts</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {event.artifacts.map((artifact) => (
              <span key={artifact} className="editorial-tag">
                {artifact}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary" size="sm">
          <ExternalLink className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Open
        </Button>
        <Button variant="ghost" size="sm">
          <FolderPlus className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Add to project
        </Button>
        <Button variant="ghost" size="sm">
          <ListTodo className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Extract tasks
        </Button>
        <Button variant="ghost" size="sm">
          <Archive className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Archive
        </Button>
      </div>
    </Card>
  );
}
