import { ShieldCheck, Tags, Users } from "lucide-react";
import { Card, Tag } from "@/components/ui/card";
import type { Project } from "@/components/projects/project-card";

export function ProjectSidebar({ project }: { project: Project }) {
  return (
    <aside className="grid gap-3 self-start">
      <Card>
        <Tag>Metadata</Tag>
        <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
          <MetaRow label="Privacy" value={project.privacy} />
          <MetaRow label="Status" value={project.status} />
          <MetaRow label="Last activity" value={project.lastActivity} />
          <MetaRow label="Source model" value="Mixed imports" />
        </div>
      </Card>

      <Card>
        <Tag>Tags</Tag>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="editorial-tag">{tag}</span>
          ))}
        </div>
      </Card>

      <Card>
        <Tag>Governance</Tag>
        <div className="mt-5 grid gap-4">
          <GovernanceItem icon={<ShieldCheck className="h-4 w-4" />} title="Source links required" />
          <GovernanceItem icon={<Tags className="h-4 w-4" />} title="Tag before archive" />
          <GovernanceItem icon={<Users className="h-4 w-4" />} title="Private by default" />
        </div>
      </Card>
    </aside>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 py-3 text-sm">
      <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</span>
      <span className="text-[var(--grey-700)]">{value}</span>
    </div>
  );
}

function GovernanceItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="grid grid-cols-[32px_1fr] items-center gap-3">
      <span className="grid h-8 w-8 place-items-center border border-line-medium">{icon}</span>
      <p className="text-sm text-[var(--grey-700)]">{title}</p>
    </div>
  );
}
