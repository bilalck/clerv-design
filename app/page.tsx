import Link from "next/link";
import { FileCode2, FileImage, FileText, Image as ImageIcon, MessageSquare, Sparkles } from "lucide-react";
import {
  PLATFORM_LABEL,
  getProjectAggregates,
  getRecordsSorted,
  inferArtifactKind,
  platformInitial,
  platformLabel,
  projectSlug,
  recordType,
  relativeTime,
  timelineMeta,
} from "@/lib/timeline-data";

const ARTIFACT_ICON = {
  PDF: FileText,
  SVG: FileImage,
  Code: FileCode2,
  Image: ImageIcon,
  Doc: FileText,
} as const;

export default function HomePage() {
  const allRecords = getRecordsSorted();
  const projects = getProjectAggregates();

  // Intelligence summary metrics
  const chatCount = allRecords.filter((r) => recordType(r) === "chat").length;
  const artifactCount = allRecords.filter((r) => recordType(r) === "artifact").length;
  const inboxCount = allRecords.filter(
    (r) => !r.project || r.tags.includes("manual-entry") || r.tags.includes("triage"),
  ).length;

  // Artifact kind breakdown for the trend line
  const artifactKindCounts = allRecords
    .filter((r) => recordType(r) === "artifact")
    .reduce<Record<string, number>>((acc, r) => {
      const k = inferArtifactKind(r);
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {});
  const artifactTrend =
    Object.entries(artifactKindCounts)
      .map(([k, n]) => `${n} ${k}${n > 1 ? "s" : ""}`)
      .join(", ") || "No artifacts yet";

  // Platform diversity — used for chats trend
  const platformCount = new Set(allRecords.map((r) => r.platform)).size;
  const linkedCount = timelineMeta.stats.cross_platform_links;

  // Inbox preview — first 3 records that need triage
  const inboxItems = allRecords
    .filter((r) => !r.project || r.tags.includes("manual-entry"))
    .slice(0, 3);

  // Recent artifacts — first 3 artifact records
  const recentArtifacts = allRecords.filter((r) => recordType(r) === "artifact").slice(0, 3);

  // Recent activity timeline — first 3 records overall
  const recentActivity = allRecords.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-line-hair bg-paper-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr]">
          <div className="flex flex-col justify-between p-8 lg:p-16">
            <div>
              <p className="editorial-kicker">00 — INTELLIGENCE SUMMARY</p>
              <div className="my-8 measurement-line h-24" />
              <h1 className="editorial-title max-w-2xl text-5xl lg:text-7xl">MORNING PROTOCOL</h1>
              <p className="mt-8 max-w-xl text-[15px] leading-[1.7] text-[var(--grey-700)]">
                A calm daily dashboard for reviewing recent AI activity, inbox pressure, generated
                artifacts, extracted tasks, and active projects.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/inbox"
                className="rounded-[var(--radius-2)] bg-ink px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
              >
                REVIEW INBOX
              </Link>
              <Link
                href="/timeline"
                className="rounded-[var(--radius-2)] border border-line-medium bg-paper-0 px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper-100"
              >
                VIEW TIMELINE
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[480px] border-l border-line-hair bg-paper-100 lg:block">
            <div className="absolute inset-8 border border-line-soft" />
            <div className="absolute bottom-0 right-0 h-1/2 w-1/2 dot-field opacity-60" />
            <div className="absolute bottom-8 left-8 right-8 border border-line-hair bg-paper-0/95 p-6 shadow-line backdrop-blur">
              <p className="tech-label">CORPUS</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">
                {timelineMeta.record_count} records imported across {platformCount} platforms.
                {linkedCount > 0 ? ` ${linkedCount} cross-platform link detected.` : ""}
              </p>
              <p className="mt-3 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                LAST IMPORT · {relativeTime(timelineMeta.generated_at)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Summary Cards */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-16 lg:px-16">
        <div className="mb-12">
          <p className="editorial-kicker">TODAY&apos;S PULSE</p>
          <h2 className="mt-6 font-serif text-4xl uppercase tracking-[-0.03em] lg:text-5xl">
            INTELLIGENCE SUMMARY
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <IntelligenceCard
            number={chatCount.toString().padStart(2, "0")}
            label="CHATS"
            tag="ALL TIME"
            trend={`${platformCount} platforms · ${linkedCount} linked`}
          />
          <IntelligenceCard
            number={artifactCount.toString().padStart(2, "0")}
            label="ARTIFACTS"
            tag="CREATED"
            trend={artifactTrend}
          />
          <IntelligenceCard
            number={inboxCount.toString().padStart(2, "0")}
            label="INBOX ITEMS"
            tag="PENDING"
            trend="Needs project assignment"
          />
        </div>
      </section>

      {/* Active Projects Strip */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-12 lg:px-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="tech-label">WORKSTREAMS</p>
            <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">ACTIVE PROJECTS</h3>
          </div>
          <Link
            href="/projects"
            className="text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="truncate font-serif text-lg uppercase tracking-tight">
                    {project.name}
                  </p>
                  <p className="mt-1 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                    {project.recordCount} EVENTS · {project.platforms.length} PLATFORMS
                  </p>
                </div>
                <span className="editorial-tag">{relativeTime(project.lastActivity)}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {project.platforms.slice(0, 4).map((p) => (
                  <span
                    key={p}
                    className="grid h-7 w-7 place-items-center border border-line-hair bg-paper-50 text-[10px] font-sans uppercase tracking-wider text-[var(--grey-700)]"
                    title={platformLabel(p)}
                  >
                    {platformInitial(p)}
                  </span>
                ))}
                {project.platforms.length > 4 ? (
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    +{project.platforms.length - 4}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line-hair pt-3">
                <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  {project.chatCount} CHATS · {project.artifactCount} ARTIFACTS
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)] underline-offset-4 group-hover:underline">
                  OPEN
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Inbox Triage Preview + Recent Artifacts */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-16 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="editorial-tag">INBOX PREVIEW</span>
                <h3 className="mt-4 font-serif text-2xl uppercase tracking-tight">
                  UNREVIEWED AI WORK
                </h3>
              </div>
              <div className="grid h-14 w-14 place-items-center border border-line-medium bg-paper-50 font-serif text-3xl">
                {inboxCount}
              </div>
            </div>

            {inboxItems.length > 0 ? (
              <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
                {inboxItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/inbox?focus=${item.id}`}
                    className="grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-paper-50"
                  >
                    <span className="grid h-10 w-10 place-items-center border border-line-medium text-[10px] font-sans uppercase tracking-wider">
                      {platformInitial(item.platform)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-[var(--grey-700)]">{item.title}</p>
                      <p className="mt-0.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                        {platformLabel(item.platform)} · {relativeTime(item.started_at)}
                      </p>
                    </div>
                    <span className="editorial-tag">
                      {recordType(item).toUpperCase()}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-6 border-t border-line-hair pt-6 text-sm text-[var(--grey-500)]">
                Inbox clear. All records are assigned to projects.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/inbox"
                className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
              >
                OPEN INBOX
              </Link>
              <Link
                href="/timeline"
                className="rounded-[var(--radius-2)] border border-line-medium bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper-100"
              >
                EXTRACT TASKS
              </Link>
            </div>
          </div>

          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
            <span className="editorial-tag">RECENT ARTIFACTS</span>
            {recentArtifacts.length > 0 ? (
              <div className="mt-6 space-y-3">
                {recentArtifacts.map((artifact) => {
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
                            {PLATFORM_LABEL[artifact.platform]}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-6 text-sm text-[var(--grey-500)]">No artifacts in corpus.</p>
            )}
            <Link
              href="/artifacts"
              className="mt-6 block text-center text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
            >
              VIEW ALL ARTIFACTS
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="bg-paper-50 px-8 py-16 lg:px-16">
        <div className="mb-8">
          <p className="tech-label">CHRONOLOGICAL STREAM</p>
          <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">RECENT ACTIVITY</h3>
        </div>

        <div className="relative border-l border-line-strong pl-8">
          {recentActivity.map((r) => {
            const t = recordType(r);
            const icon =
              t === "chat" ? (
                <MessageSquare className="h-4 w-4" />
              ) : t === "artifact" ? (
                <Sparkles className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              );
            return (
              <TimelineEvent
                key={r.id}
                icon={icon}
                time={`${relativeTime(r.started_at).toUpperCase()}`}
                platform={PLATFORM_LABEL[r.platform].toUpperCase()}
                title={r.title}
                body={r.summary ?? r.raw_excerpt ?? ""}
                projectHref={r.project ? `/projects/${projectSlug(r.project)}` : undefined}
                projectName={r.project ?? null}
              />
            );
          })}
        </div>

        <Link
          href="/timeline"
          className="mt-8 inline-block text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
        >
          VIEW FULL TIMELINE
        </Link>
      </section>
    </div>
  );
}

function IntelligenceCard({
  number,
  label,
  tag,
  trend,
}: {
  number: string;
  label: string;
  tag: string;
  trend: string;
}) {
  return (
    <div className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line">
      <span className="editorial-tag">{tag}</span>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="stat-numeral">{number}</p>
          <p className="mt-2 text-[11px] font-sans uppercase tracking-[0.14em] text-[var(--grey-600)]">
            {label}
          </p>
        </div>
        <div className="measurement-line h-12" />
      </div>
      <div className="mt-4 border-t border-line-hair pt-4">
        <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
          {trend}
        </p>
      </div>
    </div>
  );
}

function TimelineEvent({
  icon,
  time,
  platform,
  title,
  body,
  projectHref,
  projectName,
}: {
  icon: React.ReactNode;
  time: string;
  platform: string;
  title: string;
  body: string;
  projectHref?: string;
  projectName?: string | null;
}) {
  return (
    <div className="relative mb-8 last:mb-0">
      <span className="absolute -left-[44px] top-0 grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper-0">
        {icon}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-500)]">
          {time}
        </p>
        <span className="platform-badge">{platform}</span>
        {projectName && projectHref ? (
          <Link
            href={projectHref}
            className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-600)] underline underline-offset-4 hover:text-ink"
          >
            {projectName}
          </Link>
        ) : null}
      </div>
      <h4 className="mt-2 font-serif text-xl uppercase tracking-tight">{title}</h4>
      {body ? (
        <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{body}</p>
      ) : null}
    </div>
  );
}
