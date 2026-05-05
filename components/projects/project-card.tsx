import { ArrowUpRight, Clock3, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Review" | "Archived";
  privacy: "Personal" | "Work" | "Confidential";
  events: number;
  artifacts: number;
  chats: number;
  tasks: number;
  decisions: number;
  lastActivity: string;
  tags: string[];
};

const statusClass = {
  Active: "border-[var(--accent-green)] text-[var(--accent-green)]",
  Review: "border-[var(--accent-warn)] text-[var(--accent-warn)]",
  Archived: "border-line-medium text-[var(--grey-500)]",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Tag>{project.privacy}</Tag>
          <span className={cn("editorial-tag", statusClass[project.status])}>{project.status}</span>
        </div>
        <FolderKanban aria-hidden="true" className="h-5 w-5 text-[var(--grey-500)]" />
      </div>

      <h3 className="mt-6 font-serif text-3xl uppercase leading-tight">{project.name}</h3>
      <p className="mt-4 text-sm leading-6 text-[var(--grey-700)]">{project.description}</p>

      <div className="mt-6 grid grid-cols-3 gap-3 border-l border-line-strong pl-4">
        <Metric label="Events" value={project.events} />
        <Metric label="Artifacts" value={project.artifacts} />
        <Metric label="Tasks" value={project.tasks} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="editorial-tag">{tag}</span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-line-hair pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-[var(--grey-500)]">
          <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
          <span>{project.lastActivity}</span>
        </div>
        <Button variant="primary" size="sm" asChild>
          <a href={`/projects/${project.id}`}>
            Open project
            <ArrowUpRight aria-hidden="true" className="ml-2 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-4xl leading-none">{value}</div>
      <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
    </div>
  );
}
