import { Code2, FileText, Image, Network, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Artifact = {
  id: string;
  title: string;
  type: "Document" | "Code" | "Image" | "Diagram" | "Prototype";
  platform: string;
  source: string;
  project: string;
  status: "Inbox" | "Draft" | "Reviewed" | "Used" | "Archived";
  version: string;
  updated: string;
};

const iconMap = {
  Document: FileText,
  Code: Code2,
  Image: Image,
  Diagram: Network,
  Prototype: Presentation,
};

const statusMap = {
  Inbox: "border-[var(--accent-warn)] text-[var(--accent-warn)]",
  Draft: "border-line-medium text-[var(--grey-700)]",
  Reviewed: "border-[var(--accent-green)] text-[var(--accent-green)]",
  Used: "border-[var(--accent-green)] text-[var(--accent-green)]",
  Archived: "border-line-medium text-[var(--grey-500)]",
};

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  const Icon = iconMap[artifact.type];

  return (
    <Card>
      <div className="grid min-h-44 place-items-center border border-line-hair bg-paper-100 dot-field">
        <div className="grid h-16 w-16 place-items-center border border-line-medium bg-paper-0">
          <Icon aria-hidden="true" className="h-7 w-7" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Tag>{artifact.type}</Tag>
        <span className={cn("editorial-tag", statusMap[artifact.status])}>{artifact.status}</span>
      </div>

      <h3 className="mt-5 font-serif text-2xl uppercase leading-tight">{artifact.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--grey-700)]">
        {artifact.platform} · {artifact.updated} · {artifact.version}
      </p>

      <div className="mt-5 border-l border-line-strong pl-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">Project</p>
        <p className="mt-2 text-sm text-ink">{artifact.project}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary" size="sm">Open</Button>
        <Button variant="ghost" size="sm">Source</Button>
        <Button variant="ghost" size="sm">Export</Button>
      </div>
    </Card>
  );
}
