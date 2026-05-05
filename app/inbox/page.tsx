"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  CheckCircle2,
  Clock,
  FileText,
  FolderKanban,
  Lock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import {
  InteractionRecord,
  PLATFORM_LABEL,
  formatDuration,
  inferArtifactKind,
  linkedRecords,
  platformInitial,
  platformLabel,
  projectSlug,
  recordType,
  records,
  relativeTime,
} from "@/lib/timeline-data";

type InboxStatus = "new" | "needs-review" | "sensitive" | "archived";

interface InboxBucket {
  record: InteractionRecord;
  status: InboxStatus;
  decisions: number;
  tasks: number;
  artifacts: number;
  suggestedProject: string;
}

function deriveStatus(r: InteractionRecord): InboxStatus {
  if (r.tags.includes("sensitive")) return "sensitive";
  if (r.tags.includes("manual-entry")) return "needs-review";
  if (!r.project) return "needs-review";
  return "new";
}

function deriveDetected(r: InteractionRecord) {
  const t = recordType(r);
  return {
    tasks: t === "task" ? 1 : r.tools_referenced.length > 1 ? 1 : 0,
    decisions: r.message_count && r.message_count >= 2 ? 1 : 0,
    artifacts: t === "artifact" ? 1 : 0,
  };
}

const TAB_LABELS = ["ALL", "NEW", "NEEDS REVIEW", "SENSITIVE"] as const;
type TabLabel = (typeof TAB_LABELS)[number];

const TAB_TO_STATUS: Record<TabLabel, InboxStatus | "all"> = {
  ALL: "all",
  NEW: "new",
  "NEEDS REVIEW": "needs-review",
  SENSITIVE: "sensitive",
};

export default function InboxPage() {
  const buckets: InboxBucket[] = useMemo(
    () =>
      records.map((r) => {
        const detected = deriveDetected(r);
        return {
          record: r,
          status: deriveStatus(r),
          decisions: detected.decisions,
          tasks: detected.tasks,
          artifacts: detected.artifacts,
          suggestedProject: r.project ?? "Unfiled",
        };
      }),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<InboxStatus | "all", number> = {
      all: buckets.length,
      new: 0,
      "needs-review": 0,
      sensitive: 0,
      archived: 0,
    };
    buckets.forEach((b) => {
      c[b.status] += 1;
    });
    return c;
  }, [buckets]);

  const [activeTab, setActiveTab] = useState<TabLabel>("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(buckets[0]?.record.id ?? null);

  const filtered = useMemo(() => {
    const target = TAB_TO_STATUS[activeTab];
    if (target === "all") return buckets;
    return buckets.filter((b) => b.status === target);
  }, [buckets, activeTab]);

  const selected = buckets.find((b) => b.record.id === selectedId) ?? filtered[0] ?? null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">04 — CENTRAL PROCESSING</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">INBOX TRIAGE</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Central processing of AI-derived tasks, decisions, and artifacts. {counts.all} items
          total · {counts["needs-review"]} need review · {counts.sensitive} sensitive.
        </p>
      </section>

      {/* Tabs + Actions */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1">
            {TAB_LABELS.map((tab) => {
              const target = TAB_TO_STATUS[tab];
              const count = target === "all" ? counts.all : counts[target as InboxStatus];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-[var(--radius-2)] px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                    activeTab === tab
                      ? "bg-ink text-paper-0"
                      : "text-[var(--grey-600)] hover:bg-paper-100 hover:text-ink"
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
              PROCESS NEXT
            </button>
            <button className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
              ARCHIVE SELECTED
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="rounded-[var(--radius-2)] border border-dashed border-line-medium bg-paper-50 p-12 text-center dot-field">
                <p className="tech-label">NO ITEMS</p>
                <p className="mt-3 font-serif text-2xl uppercase tracking-tight">
                  INBOX CLEAR FOR THIS TAB
                </p>
              </div>
            ) : (
              filtered.map((b) => {
                const r = b.record;
                const t = recordType(r);
                const isSelected = selected?.record.id === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`w-full rounded-[var(--radius-2)] border p-5 text-left transition-all ${
                      isSelected
                        ? "border-ink shadow-line"
                        : "border-line-hair hover:border-line-medium"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-medium text-[10px] font-sans uppercase tracking-wider">
                          {platformInitial(r.platform)}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="platform-badge">{platformLabel(r.platform)}</span>
                            <span className="editorial-tag">{t}</span>
                            <StatusPill status={b.status} />
                          </div>
                          <h3 className="mt-2 break-words font-serif text-lg uppercase tracking-tight">
                            {r.title}
                          </h3>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                        {relativeTime(r.started_at)}
                      </span>
                    </div>
                    {r.summary ? (
                      <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">
                        {r.summary}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                        <CheckCircle2 className="h-3 w-3" /> {b.tasks} TASKS
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                        <MessageSquare className="h-3 w-3" /> {b.decisions} DECISIONS
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                        <FileText className="h-3 w-3" /> {b.artifacts} ARTIFACTS
                      </span>
                      {r.project ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                          <FolderKanban className="h-3 w-3" /> {r.project}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Side Panel */}
          <aside className="hidden xl:block">
            {selected ? <DetailPanel bucket={selected} totalQueue={counts.all} /> : null}
          </aside>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: InboxStatus }) {
  const map: Record<
    InboxStatus,
    { bg: string; icon: React.ReactNode; label: string }
  > = {
    new: { bg: "bg-paper-100", icon: <Sparkles className="h-3 w-3" />, label: "NEW" },
    "needs-review": {
      bg: "bg-paper-100",
      icon: <Clock className="h-3 w-3" />,
      label: "NEEDS REVIEW",
    },
    sensitive: {
      bg: "bg-paper-100",
      icon: <Lock className="h-3 w-3" />,
      label: "SENSITIVE",
    },
    archived: {
      bg: "bg-paper-100",
      icon: <Archive className="h-3 w-3" />,
      label: "ARCHIVED",
    },
  };
  const m = map[status];
  return (
    <span
      className={`flex items-center gap-1 rounded-[var(--radius-1)] px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] ${m.bg} text-[var(--grey-700)]`}
    >
      {m.icon}
      {m.label}
    </span>
  );
}

function DetailPanel({ bucket, totalQueue }: { bucket: InboxBucket; totalQueue: number }) {
  const r = bucket.record;
  const linked = linkedRecords(r);
  const t = recordType(r);
  const artifactKind = t === "artifact" ? inferArtifactKind(r) : null;

  return (
    <div className="sticky top-24 space-y-4">
      <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
        <div className="flex items-center justify-between">
          <span className="editorial-tag">SELECTED ITEM</span>
          <span className="platform-badge">{platformLabel(r.platform)}</span>
        </div>
        <h3 className="mt-4 break-words font-serif text-xl uppercase tracking-tight">
          {r.title}
        </h3>
        {r.summary ? (
          <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{r.summary}</p>
        ) : null}

        <div className="mt-6 border-t border-line-hair pt-4">
          <p className="tech-label mb-2">SUGGESTED PROJECT</p>
          {r.project ? (
            <Link
              href={`/projects/${projectSlug(r.project)}`}
              className="flex items-center gap-2 text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink"
            >
              <FolderKanban className="h-4 w-4" />
              {r.project}
            </Link>
          ) : (
            <p className="text-sm text-[var(--grey-500)]">No project assignment yet.</p>
          )}
        </div>

        <div className="mt-6 border-t border-line-hair pt-4">
          <p className="tech-label mb-3">DETECTED INTELLIGENCE</p>
          <div className="space-y-2">
            <DetectedRow label="Tasks" value={bucket.tasks} />
            <DetectedRow label="Decisions" value={bucket.decisions} />
            <DetectedRow label="Artifacts" value={bucket.artifacts} />
            {artifactKind ? (
              <DetectedRow label="Artifact Kind" valueLabel={artifactKind} />
            ) : null}
          </div>
        </div>

        {(r.message_count != null || r.duration_seconds != null) && (
          <div className="mt-6 border-t border-line-hair pt-4">
            <p className="tech-label mb-3">METRICS</p>
            <div className="space-y-2">
              {r.message_count != null ? (
                <DetectedRow label="Messages" value={r.message_count} />
              ) : null}
              {r.duration_seconds != null ? (
                <DetectedRow
                  label="Duration"
                  valueLabel={formatDuration(r.duration_seconds) ?? "—"}
                />
              ) : null}
            </div>
          </div>
        )}

        {r.tools_referenced.length > 0 ? (
          <div className="mt-6 border-t border-line-hair pt-4">
            <p className="tech-label mb-2">TOOLS</p>
            <p className="text-sm text-[var(--grey-700)]">{r.tools_referenced.join(", ")}</p>
          </div>
        ) : null}

        {linked.length > 0 ? (
          <div className="mt-6 border-t border-line-hair pt-4">
            <p className="tech-label mb-2">CROSS-PLATFORM LINKS</p>
            <ul className="space-y-1">
              {linked.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center gap-2 text-sm text-[var(--grey-700)]"
                >
                  <span className="platform-badge shrink-0">{PLATFORM_LABEL[l.platform]}</span>
                  <span className="truncate">{l.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 space-y-2">
          <button className="w-full rounded-[var(--radius-2)] bg-ink px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
            ASSIGN TO PROJECT
          </button>
          <button className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
            ARCHIVE
          </button>
        </div>
      </div>

      <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
        <span className="editorial-tag">QUEUE STATUS</span>
        <p className="mt-4 stat-numeral">{totalQueue.toString().padStart(2, "0")}</p>
        <p className="mt-2 tech-label">ITEMS IN QUEUE</p>
      </div>
    </div>
  );
}

function DetectedRow({
  label,
  value,
  valueLabel,
}: {
  label: string;
  value?: number;
  valueLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--grey-700)]">{label}</span>
      <span className="font-serif text-lg tabular-nums">
        {valueLabel ?? (value ?? 0).toString()}
      </span>
    </div>
  );
}
