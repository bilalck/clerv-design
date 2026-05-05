"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileText,
  FolderKanban,
  Image as ImageIcon,
  Link2,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import {
  type InteractionRecord,
  type Platform,
  formatTimeOfDay,
  inferArtifactKind,
  linkedRecords,
  platformLabel,
  projectSlug,
  recordType,
  records as allRecords,
  relativeTime,
  searchRecords,
} from "@/lib/timeline-data";

const TYPE_OPTIONS: ("All" | "chat" | "artifact" | "task")[] = [
  "All",
  "chat",
  "artifact",
  "task",
];

const PLATFORM_OPTIONS: ("All" | Platform)[] = [
  "All",
  ...Array.from(new Set(allRecords.map((r) => r.platform))).sort(),
];

function typeIcon(t: ReturnType<typeof recordType>) {
  if (t === "chat") return <MessageSquare className="h-4 w-4" />;
  if (t === "artifact") return <FileText className="h-4 w-4" />;
  return <CheckCircle2 className="h-4 w-4" />;
}

function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark key={i} className="bg-paper-200 text-ink">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_OPTIONS)[number]>("All");
  const [platformFilter, setPlatformFilter] =
    useState<(typeof PLATFORM_OPTIONS)[number]>("All");
  const [isAskMode, setIsAskMode] = useState(false);

  const trimmed = query.trim();
  const baseHits: InteractionRecord[] = useMemo(
    () => (trimmed ? searchRecords(trimmed) : []),
    [trimmed],
  );

  const filtered = useMemo(() => {
    return baseHits.filter((r) => {
      if (typeFilter !== "All" && recordType(r) !== typeFilter) return false;
      if (platformFilter !== "All" && r.platform !== platformFilter) return false;
      return true;
    });
  }, [baseHits, typeFilter, platformFilter]);

  const insight = useMemo(() => {
    if (filtered.length === 0) return null;
    const projects = Array.from(
      new Set(filtered.map((r) => r.project).filter(Boolean) as string[]),
    );
    const platforms = Array.from(new Set(filtered.map((r) => r.platform)));
    const tools = Array.from(new Set(filtered.flatMap((r) => r.tools_referenced)));
    const tags = Array.from(new Set(filtered.flatMap((r) => r.tags)));
    const linkedCount = filtered.filter((r) => r.linked_sessions.length > 0).length;
    return { projects, platforms, tools, tags, linkedCount };
  }, [filtered]);

  return (
    <div className="min-h-screen">
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">07 — UNIVERSAL RETRIEVAL</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">SEARCH / ASK</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Universal search across {allRecords.length} imported AI interactions. Source-linked results with cross-platform awareness.
        </p>
      </section>

      <section className="border-b border-line-hair bg-paper-50 px-8 py-6 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex justify-center">
            <div className="inline-flex rounded-[var(--radius-2)] border border-line-hair">
              <button
                onClick={() => setIsAskMode(false)}
                className={`px-4 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                  !isAskMode ? "bg-ink text-paper-0" : "text-[var(--grey-600)] hover:bg-paper-100"
                }`}
              >
                SEARCH
              </button>
              <button
                onClick={() => setIsAskMode(true)}
                className={`flex items-center gap-1.5 border-l border-line-hair px-4 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                  isAskMode ? "bg-ink text-paper-0" : "text-[var(--grey-600)] hover:bg-paper-100"
                }`}
              >
                <Sparkles className="h-3 w-3" />
                ASK AI
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--grey-400)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isAskMode
                  ? "Ask anything about your AI history..."
                  : "Search chats, artifacts, projects, tools..."
              }
              className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-4 pl-12 pr-4 text-lg focus:border-line-medium focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <FilterSelect
              label="TYPE"
              value={typeFilter}
              onChange={setTypeFilter}
              options={TYPE_OPTIONS}
            />
            <FilterSelect
              label="PLATFORM"
              value={platformFilter}
              onChange={setPlatformFilter}
              options={PLATFORM_OPTIONS}
              render={(v) => (v === "All" ? "All" : platformLabel(v as Platform))}
            />
            <button
              onClick={() => {
                setTypeFilter("All");
                setPlatformFilter("All");
              }}
              className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink"
            >
              CLEAR ALL
            </button>
          </div>
        </div>
      </section>

      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {!trimmed && (
              <div className="dot-grid rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-12 text-center">
                <p className="tech-label">START SEARCHING</p>
                <p className="mt-2 text-sm text-[var(--grey-600)]">
                  Try queries like{" "}
                  <button
                    onClick={() => setQuery("Stead UI Pro")}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    Stead UI Pro
                  </button>
                  ,{" "}
                  <button
                    onClick={() => setQuery("table component")}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    table component
                  </button>
                  , or{" "}
                  <button
                    onClick={() => setQuery("supabase")}
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    supabase
                  </button>
                  .
                </p>
              </div>
            )}

            {trimmed && (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <span className="tech-label">
                    {filtered.length} RESULT{filtered.length === 1 ? "" : "S"}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    SORTED BY DATE
                  </span>
                </div>

                <div className="space-y-3">
                  {filtered.map((r) => (
                    <ResultCard key={r.id} record={r} query={trimmed} />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="py-20 text-center">
                    <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-50 dot-grid">
                      <Search className="h-8 w-8 text-[var(--grey-400)]" />
                    </div>
                    <h3 className="font-serif text-xl uppercase tracking-tight">NO RESULTS</h3>
                    <p className="mt-2 text-sm text-[var(--grey-600)]">
                      No interactions match &quot;{trimmed}&quot; with the current filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-ink p-5 text-paper-0">
              <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-paper-100/70">
                SYNTHESIZED BRIEFING
              </span>
              <h3 className="mt-3 font-serif text-lg uppercase tracking-tight">
                AI INTELLIGENCE INSIGHT
              </h3>
              {insight ? (
                <div className="mt-4 space-y-4">
                  <p className="text-sm leading-relaxed text-paper-50/90">
                    Found {filtered.length} record{filtered.length === 1 ? "" : "s"} for &quot;{trimmed}&quot; spanning {insight.platforms.length} platform
                    {insight.platforms.length === 1 ? "" : "s"}.{" "}
                    {insight.linkedCount > 0
                      ? `${insight.linkedCount} cross-platform session${insight.linkedCount === 1 ? "" : "s"} detected.`
                      : ""}
                  </p>

                  {insight.projects.length > 0 && (
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-[0.14em] text-paper-100/60">
                        KEY PROJECTS
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {insight.projects.map((p) => (
                          <span
                            key={p}
                            className="rounded-[var(--radius-1)] bg-paper-0/10 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {insight.tools.length > 0 && (
                    <div>
                      <p className="text-[9px] font-sans uppercase tracking-[0.14em] text-paper-100/60">
                        KEY ENTITIES
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {insight.tools.map((t) => (
                          <span
                            key={t}
                            className="rounded-[var(--radius-1)] bg-paper-0/10 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-paper-0/10 pt-3 text-[9px] font-sans uppercase tracking-[0.12em] text-paper-100/50">
                    BREADTH · {insight.platforms.length} PLATFORMS · {filtered.length} RECORDS
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-paper-50/80">
                  Run a search to generate a synthesized briefing.
                </p>
              )}
            </div>

            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">CORPUS</span>
              <p className="mt-4 stat-numeral">{allRecords.length}</p>
              <p className="mt-2 tech-label">TOTAL RECORDS</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  render,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
  render?: (v: T) => string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {(render ? render(o) : o).toUpperCase()}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
    </div>
  );
}

function ResultCard({ record, query }: { record: InteractionRecord; query: string }) {
  const type = recordType(record);
  const linked = linkedRecords(record);
  const kind = type === "artifact" ? inferArtifactKind(record) : null;
  const Icon = kind === "Image" ? ImageIcon : null;

  return (
    <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:border-line-medium hover:shadow-line">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center border border-line-hair bg-paper-100">
            {Icon ? <Icon className="h-4 w-4" /> : typeIcon(type)}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="platform-badge">{type}</span>
              <span className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                {platformLabel(record.platform)}
              </span>
              {linked.length > 0 && (
                <span className="flex items-center gap-1 rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-700)]">
                  <Link2 className="h-3 w-3" /> CROSS-PLATFORM
                </span>
              )}
            </div>
            <h3 className="mt-2 font-serif text-lg uppercase tracking-tight">
              {highlight(record.title, query)}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <span className="font-serif text-base text-[var(--grey-700)]">
            {formatTimeOfDay(record.started_at)}
          </span>
          <p className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
            {relativeTime(record.started_at)}
          </p>
        </div>
      </div>

      {record.summary && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--grey-700)]">
          {highlight(record.summary, query)}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line-hair pt-3">
        {record.project ? (
          <Link
            href={`/projects/${projectSlug(record.project)}`}
            className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)] hover:text-ink"
          >
            <FolderKanban className="h-3 w-3" />
            {record.project}
          </Link>
        ) : (
          <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
            UNFILED
          </span>
        )}
        {record.url && (
          <a
            href={record.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink"
          >
            OPEN ORIGINAL <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
