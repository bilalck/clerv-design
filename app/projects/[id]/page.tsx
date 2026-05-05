import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileCode2,
  FileImage,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Tag,
} from "lucide-react";
import {
  PLATFORM_LABEL,
  formatDuration,
  formatTimeOfDay,
  getProjectAggregate,
  getProjectAggregates,
  getProjectRecords,
  inferArtifactKind,
  platformInitial,
  platformLabel,
  recordType,
  relativeTime,
} from "@/lib/timeline-data";

const TYPE_ICON = {
  chat: MessageSquare,
  artifact: Sparkles,
  task: CheckCircle2,
} as const;

const ARTIFACT_ICON = {
  PDF: FileText,
  SVG: FileImage,
  Code: FileCode2,
  Image: ImageIcon,
  Doc: FileText,
} as const;

export function generateStaticParams() {
  return getProjectAggregates().map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectAggregate(id);

  if (!project) {
    notFound();
  }

  const allRecords = getProjectRecords(id);
  const chatRecords = allRecords.filter((r) => recordType(r) === "chat");
  const artifactRecords = allRecords.filter((r) => recordType(r) === "artifact");
  const taskRecords = allRecords.filter((r) => recordType(r) === "task");

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
          <Link
            href="/projects"
            className="flex items-center gap-1 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3 w-3" />
            PROJECTS
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">{project.name}</span>
        </div>
      </section>

      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="editorial-kicker">06 — WORKSTREAM</p>
            <div className="my-6 measurement-line h-16" />
            <h1 className="editorial-title text-4xl lg:text-6xl">{project.name.toUpperCase()}</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
              {project.recordCount} records spanning {project.platforms.length} platform
              {project.platforms.length === 1 ? "" : "s"}. Last activity{" "}
              {relativeTime(project.lastActivity)}.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="editorial-tag">ACTIVE</span>
              {project.platforms.slice(0, 6).map((p) => (
                <span key={p} className="platform-badge">
                  {platformLabel(p)}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <MetricBlock label="CHATS" value={project.chatCount} />
            <MetricBlock label="ARTIFACTS" value={project.artifactCount} />
            <MetricBlock label="TASKS" value={project.taskCount} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-12 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            {/* Contextual Timeline */}
            <div>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="tech-label">CONTEXTUAL TIMELINE</p>
                  <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">
                    PROJECT FEED
                  </h3>
                </div>
                <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                  {allRecords.length} EVENTS
                </span>
              </div>
              {allRecords.length === 0 ? (
                <EmptyBlock label="NO EVENTS YET" />
              ) : (
                <div className="relative ml-4 border-l border-line-strong pl-10">
                  {allRecords.map((event) => {
                    const t = recordType(event);
                    const Icon = TYPE_ICON[t];
                    return (
                      <div key={event.id} className="relative mb-6 last:mb-0">
                        <span className="absolute -left-[46px] top-0 grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper-0">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-500)]">
                              {relativeTime(event.started_at).toUpperCase()} ·{" "}
                              {formatTimeOfDay(event.started_at)}
                            </span>
                            <span className="platform-badge">
                              {platformLabel(event.platform)}
                            </span>
                            <span className="editorial-tag">{t}</span>
                          </div>
                          <h4 className="mt-3 font-serif text-xl uppercase tracking-tight">
                            {event.title}
                          </h4>
                          {event.summary ? (
                            <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">
                              {event.summary}
                            </p>
                          ) : null}
                          {event.tools_referenced.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {event.tools_referenced.map((tool) => (
                                <span
                                  key={tool}
                                  className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Artifacts Gallery */}
            <div>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="tech-label">PROJECT OUTPUT</p>
                  <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">
                    ARTIFACTS GALLERY
                  </h3>
                </div>
                <Link
                  href="/artifacts"
                  className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 hover:text-ink"
                >
                  ALL ARTIFACTS
                </Link>
              </div>
              {artifactRecords.length === 0 ? (
                <EmptyBlock label="NO ARTIFACTS YET" />
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {artifactRecords.map((artifact) => {
                    const kind = inferArtifactKind(artifact);
                    const Icon = ARTIFACT_ICON[kind];
                    return (
                      <div
                        key={artifact.id}
                        className="group flex items-center gap-4 rounded-[var(--radius-2)] border border-line-hair p-4 transition-all hover:border-line-medium hover:bg-paper-50"
                      >
                        <div className="grid h-12 w-12 place-items-center border border-line-hair bg-paper-100 dot-field">
                          <Icon className="h-5 w-5 text-[var(--grey-600)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">{artifact.title}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="platform-badge">{kind}</span>
                            <span className="truncate text-[10px] text-[var(--grey-500)]">
                              {platformLabel(artifact.platform)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tasks & Decisions */}
            <div>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="tech-label">EXTRACTED INTELLIGENCE</p>
                  <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">
                    TASKS &amp; CHATS
                  </h3>
                </div>
                <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                  {taskRecords.length + chatRecords.length} ITEMS
                </span>
              </div>
              <div className="overflow-hidden rounded-[var(--radius-2)] border border-line-hair">
                <table className="w-full">
                  <thead className="bg-paper-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                        Platform
                      </th>
                      <th className="hidden px-4 py-3 text-left text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] sm:table-cell">
                        Duration
                      </th>
                      <th className="px-4 py-3 text-right text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                        When
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-hair">
                    {[...taskRecords, ...chatRecords].length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-sm text-[var(--grey-500)]"
                        >
                          No chats or tasks for this project yet.
                        </td>
                      </tr>
                    ) : (
                      [...taskRecords, ...chatRecords].map((r) => (
                        <tr key={r.id} className="transition-colors hover:bg-paper-50">
                          <td className="px-4 py-3">
                            <span className="editorial-tag">{recordType(r)}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-[var(--grey-700)]">
                            <span className="line-clamp-1">{r.title}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="platform-badge">
                              {platformLabel(r.platform)}
                            </span>
                          </td>
                          <td className="hidden px-4 py-3 text-[11px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)] sm:table-cell">
                            {formatDuration(r.duration_seconds) ?? "—"}
                          </td>
                          <td className="px-4 py-3 text-right text-[11px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                            {relativeTime(r.started_at)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">PROJECT METRICS</span>
              <div className="mt-4 space-y-3">
                <MetricRow label="Records" value={project.recordCount} />
                <MetricRow label="Platforms" value={project.platforms.length} />
                <MetricRow label="Chats" value={project.chatCount} />
                <MetricRow label="Artifacts" value={project.artifactCount} />
                <MetricRow label="Tasks" value={project.taskCount} />
              </div>
              <div className="mt-4 border-t border-line-hair pt-4">
                <p className="tech-label mb-2">FIRST ACTIVITY</p>
                <p className="text-sm text-[var(--grey-700)]">
                  {relativeTime(project.firstActivity)}
                </p>
              </div>
              <div className="mt-3">
                <p className="tech-label mb-2">LAST ACTIVITY</p>
                <p className="text-sm text-[var(--grey-700)]">
                  {relativeTime(project.lastActivity)}
                </p>
              </div>
            </div>

            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">PLATFORMS</span>
              <ul className="mt-4 space-y-2">
                {project.platforms.map((p) => {
                  const count = allRecords.filter((r) => r.platform === p).length;
                  return (
                    <li key={p} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.1em] text-[var(--grey-700)]">
                        <span className="grid h-6 w-6 place-items-center border border-line-hair bg-paper-50 text-[9px]">
                          {platformInitial(p)}
                        </span>
                        {PLATFORM_LABEL[p]}
                      </span>
                      <span className="text-[10px] font-sans tabular-nums text-[var(--grey-500)]">
                        {count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {project.tools.length > 0 ? (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                <span className="editorial-tag">TOOLS REFERENCED</span>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span key={tool} className="platform-badge">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {project.tags.length > 0 ? (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                <span className="editorial-tag">TAGS</span>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-700)]"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}

function MetricBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-3 lg:p-4">
      <p className="font-serif text-3xl tabular-nums lg:text-4xl">
        {value.toString().padStart(2, "0")}
      </p>
      <p className="mt-1 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
        {label}
      </p>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--grey-700)]">{label}</span>
      <span className="font-serif text-lg tabular-nums">{value}</span>
    </div>
  );
}

function EmptyBlock({ label }: { label: string }) {
  return (
    <div className="rounded-[var(--radius-2)] border border-dashed border-line-medium bg-paper-50 p-8 text-center dot-field">
      <p className="tech-label">{label}</p>
    </div>
  );
}
