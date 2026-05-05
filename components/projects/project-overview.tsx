import { Card, Tag } from "@/components/ui/card";
import type { Project } from "@/components/projects/project-card";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <Card>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Tag>Overview</Tag>
            <Tag>{project.privacy}</Tag>
            <Tag>{project.status}</Tag>
          </div>
          <h2 className="mt-5 max-w-4xl font-serif text-4xl uppercase leading-tight md:text-5xl">
            {project.name}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--grey-700)]">{project.description}</p>
        </div>
        <div className="border border-line-hair bg-paper-50 p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">Last activity</p>
          <p className="mt-2 text-sm text-ink">{project.lastActivity}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <ProjectMetric label="Events" value={project.events} />
        <ProjectMetric label="Artifacts" value={project.artifacts} />
        <ProjectMetric label="Chats" value={project.chats} />
        <ProjectMetric label="Tasks" value={project.tasks} />
        <ProjectMetric label="Decisions" value={project.decisions} />
      </div>
    </Card>
  );
}

function ProjectMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-line-hair bg-paper-50 p-4">
      <div className="font-serif text-5xl leading-none">{value}</div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
    </div>
  );
}
