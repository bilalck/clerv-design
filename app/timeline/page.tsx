"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  FileCode2,
  FileImage,
  FileText,
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import {
  PLATFORM_LABEL,
  Platform,
  formatDuration,
  formatTimeOfDay,
  groupByDay,
  inferArtifactKind,
  linkedRecords,
  platformInitial,
  platformLabel,
  projectSlug,
  recordType,
  records,
  timelineMeta,
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

export default function TimelinePage() {
  const platforms = useMemo(
    () => Array.from(new Set(records.map((r) => r.platform))),
    [],
  );
  const tags = useMemo(
    () => Array.from(new Set(records.flatMap((r) => r.tags))).sort(),
    [],
  );

  const [platformFilter, setPlatformFilter] = useState<Platform | "All">("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "chat" | "artifact" | "task">("All");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return records
      .filter((r) => platformFilter === "All" || r.platform === platformFilter)
      .filter((r) => typeFilter === "All" || recordType(r) === typeFilter)
      .filter((r) => tagFilter === "All" || r.tags.includes(tagFilter));
  }, [platformFilter, typeFilter, tagFilter]);

  const days = useMemo(() => groupByDay(filtered), [filtered]);

  const toggleEvent = (id: string) => {
    setExpandedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const clearAll = () => {
    setPlatformFilter("All");
    setTypeFilter("All");
    setTagFilter("All");
  };

  const linkedCount = timelineMeta.stats.cross_platform_links;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">03 — CHRONOLOGICAL STREAM</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">TIMELINE</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Editorial chronological record of all AI interactions across platforms.{" "}
          {records.length} records · {platforms.length} platforms
          {linkedCount > 0 ? ` · ${linkedCount} cross-platform link` : ""}.
        </p>
      </section>

      {/* Filters */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect
            label="PLATFORM"
            value={platformFilter}
            onChange={(v) => setPlatformFilter(v as Platform | "All")}
            options={[{ value: "All", label: `ALL (${records.length})` }].concat(
              platforms.map((p) => ({
                value: p,
                label: `${PLATFORM_LABEL[p].toUpperCase()} (${records.filter((r) => r.platform === p).length})`,
              })),
            )}
          />
          <FilterSelect
            label="TYPE"
            value={typeFilter}
            onChange={(v) =>
              setTypeFilter(v as "All" | "chat" | "artifact" | "task")
            }
            options={[
              { value: "All", label: `ALL (${records.length})` },
              {
                value: "chat",
                label: `CHATS (${records.filter((r) => recordType(r) === "chat").length})`,
              },
              {
                value: "artifact",
                label: `ARTIFACTS (${records.filter((r) => recordType(r) === "artifact").length})`,
              },
              {
                value: "task",
                label: `TASKS (${records.filter((r) => recordType(r) === "task").length})`,
              },
            ]}
          />
          <FilterSelect
            label="TAG"
            value={tagFilter}
            onChange={setTagFilter}
            options={[{ value: "All", label: "ALL" }].concat(
              tags.map((t) => ({
                value: t,
                label: `${t.toUpperCase()} (${records.filter((r) => r.tags.includes(t)).length})`,
              })),
            )}
          />
          <button
            onClick={clearAll}
            className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 transition-colors hover:text-ink"
          >
            CLEAR ALL
          </button>
          <span className="ml-auto text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
            {filtered.length} OF {records.length} RECORDS
          </span>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="bg-paper-0 px-8 py-12 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
          <div className="mx-auto w-full max-w-3xl">
            {days.length === 0 ? (
              <div className="rounded-[var(--radius-2)] border border-dashed border-line-medium bg-paper-50 p-12 text-center dot-field">
                <p className="tech-label">NO RECORDS</p>
                <p className="mt-3 font-serif text-2xl uppercase tracking-tight">
                  TIMELINE EMPTY FOR THIS FILTER
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 hover:opacity-80"
                >
                  CLEAR FILTERS
                </button>
              </div>
            ) : (
              days.map((day, dayIndex) => (
                <div key={day.key} className="relative mb-12 last:mb-0">
                  <div className="mb-8 flex items-center gap-6">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-6xl leading-none text-line-medium">
                        {String(dayIndex + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-serif text-2xl uppercase tracking-tight">
                        {day.label}
                      </h2>
                    </div>
                    <div className="hairline-divider flex-1" />
                    <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                      {day.events.length} EVENTS
                    </span>
                  </div>

                  <div className="relative ml-4 border-l border-line-strong pb-4 pl-10">
                    {day.events.map((event) => {
                      const isExpanded = expandedEvents.includes(event.id);
                      const t = recordType(event);
                      const Icon = TYPE_ICON[t];
                      const linked = linkedRecords(event);
                      const artifactKind =
                        t === "artifact" ? inferArtifactKind(event) : null;

                      return (
                        <div key={event.id} className="relative mb-6 last:mb-0">
                          <span className="absolute -left-[46px] top-0 grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper-0">
                            <Icon className="h-4 w-4" />
                          </span>

                          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:border-line-medium">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-500)]">
                                {formatTimeOfDay(event.started_at)}
                              </span>
                              <span className="platform-badge">
                                {platformLabel(event.platform)}
                              </span>
                              <span className="editorial-tag">{t}</span>
                              {linked.length > 0 ? (
                                <span className="editorial-tag" title="Cross-platform link">
                                  LINKED · {linked.length}
                                </span>
                              ) : null}
                            </div>

                            <h3 className="mt-3 font-serif text-xl uppercase tracking-tight">
                              {event.title}
                            </h3>
                            {event.summary ? (
                              <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">
                                {event.summary}
                              </p>
                            ) : null}

                            {event.tags.length > 0 ? (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {event.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {artifactKind ? (
                              <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-3">
                                <div className="grid h-10 w-10 place-items-center border border-line-hair bg-paper-0">
                                  {(() => {
                                    const A = ARTIFACT_ICON[artifactKind];
                                    return <A className="h-4 w-4" />;
                                  })()}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm">{event.title}</p>
                                  <span className="platform-badge mt-1">{artifactKind}</span>
                                </div>
                              </div>
                            ) : null}

                            <button
                              onClick={() => toggleEvent(event.id)}
                              className="mt-4 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink"
                            >
                              {isExpanded ? "COLLAPSE" : "EXPAND"}
                            </button>

                            {isExpanded ? (
                              <div className="mt-4 space-y-4 border-t border-line-hair pt-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                  {event.project ? (
                                    <div>
                                      <p className="tech-label mb-2">LINKED PROJECT</p>
                                      <Link
                                        href={`/projects/${projectSlug(event.project)}`}
                                        className="text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink"
                                      >
                                        {event.project}
                                      </Link>
                                    </div>
                                  ) : null}
                                  {event.message_count != null ? (
                                    <div>
                                      <p className="tech-label mb-2">MESSAGES</p>
                                      <p className="text-sm text-[var(--grey-700)]">
                                        {event.message_count}
                                      </p>
                                    </div>
                                  ) : null}
                                  {event.duration_seconds != null ? (
                                    <div>
                                      <p className="tech-label mb-2">DURATION</p>
                                      <p className="text-sm text-[var(--grey-700)]">
                                        {formatDuration(event.duration_seconds)}
                                      </p>
                                    </div>
                                  ) : null}
                                  {event.tools_referenced.length > 0 ? (
                                    <div>
                                      <p className="tech-label mb-2">TOOLS</p>
                                      <p className="text-sm text-[var(--grey-700)]">
                                        {event.tools_referenced.join(", ")}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>

                                {event.raw_excerpt &&
                                event.raw_excerpt !== event.summary ? (
                                  <div>
                                    <p className="tech-label mb-2">EXCERPT</p>
                                    <p className="rounded-[var(--radius-2)] bg-paper-50 p-3 text-sm leading-relaxed text-[var(--grey-700)]">
                                      {event.raw_excerpt}
                                    </p>
                                  </div>
                                ) : null}

                                {linked.length > 0 ? (
                                  <div>
                                    <p className="tech-label mb-2">CROSS-PLATFORM LINKS</p>
                                    <ul className="space-y-1">
                                      {linked.map((l) => (
                                        <li key={l.id} className="text-sm text-[var(--grey-700)]">
                                          <span className="platform-badge mr-2">
                                            {platformLabel(l.platform)}
                                          </span>
                                          {l.title}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ) : null}

                                {event.url ? (
                                  <a
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 hover:text-ink"
                                  >
                                    OPEN SOURCE ↗
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="hidden space-y-4 xl:block">
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">CORPUS</span>
              <p className="mt-4 stat-numeral">
                {records.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 tech-label">RECORDS</p>
              <div className="mt-4 border-t border-line-hair pt-4">
                <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  {platforms.length} platforms · {linkedCount} linked
                </p>
              </div>
            </div>
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">FILTERED</span>
              <p className="mt-4 stat-numeral">
                {filtered.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 tech-label">EVENTS SHOWN</p>
              <Link
                href="/inbox"
                className="mt-4 block rounded-[var(--radius-2)] bg-ink px-4 py-2 text-center text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 hover:opacity-80"
              >
                REVIEW INBOX
              </Link>
            </div>
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">PLATFORMS</span>
              <ul className="mt-4 space-y-2">
                {platforms.map((p) => (
                  <li key={p} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.1em] text-[var(--grey-700)]">
                      <span className="grid h-6 w-6 place-items-center border border-line-hair bg-paper-50 text-[9px]">
                        {platformInitial(p)}
                      </span>
                      {platformLabel(p)}
                    </span>
                    <span className="text-[10px] font-sans tabular-nums text-[var(--grey-500)]">
                      {records.filter((r) => r.platform === p).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {label}: {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
    </div>
  );
}

