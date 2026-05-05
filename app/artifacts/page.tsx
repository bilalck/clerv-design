"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  ChevronDown,
  ExternalLink,
  FileCode2,
  FileImage,
  FileText,
  Grid3X3,
  Image as ImageIcon,
  List,
} from "lucide-react";
import Link from "next/link";

import {
  type InteractionRecord,
  type Platform,
  formatTimeOfDay,
  getRecordsSorted,
  inferArtifactKind,
  platformLabel,
  projectSlug,
  recordType,
  relativeTime,
} from "@/lib/timeline-data";

type ArtifactKind = ReturnType<typeof inferArtifactKind>;

const TYPE_OPTIONS: ("All" | ArtifactKind)[] = [
  "All",
  "Code",
  "SVG",
  "Image",
  "PDF",
  "Doc",
];

function typeIcon(kind: ArtifactKind) {
  if (kind === "Image") return <ImageIcon className="h-5 w-5" />;
  if (kind === "SVG") return <FileImage className="h-5 w-5" />;
  if (kind === "Code") return <FileCode2 className="h-5 w-5" />;
  if (kind === "PDF") return <FileText className="h-5 w-5" />;
  return <Archive className="h-5 w-5" />;
}

export default function ArtifactsPage() {
  const allArtifacts = useMemo(
    () => getRecordsSorted().filter((r) => recordType(r) === "artifact"),
    [],
  );

  const PLATFORM_OPTIONS: ("All" | Platform)[] = useMemo(
    () => ["All", ...Array.from(new Set(allArtifacts.map((a) => a.platform))).sort()],
    [allArtifacts],
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_OPTIONS)[number]>("All");
  const [platformFilter, setPlatformFilter] =
    useState<(typeof PLATFORM_OPTIONS)[number]>("All");
  const [selectedId, setSelectedId] = useState<string>(allArtifacts[0]?.id ?? "");

  const filtered = useMemo(() => {
    return allArtifacts.filter((a) => {
      if (typeFilter !== "All" && inferArtifactKind(a) !== typeFilter) return false;
      if (platformFilter !== "All" && a.platform !== platformFilter) return false;
      return true;
    });
  }, [allArtifacts, typeFilter, platformFilter]);

  const selected = allArtifacts.find((a) => a.id === selectedId);

  return (
    <div className="min-h-screen">
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">05 — VISUAL REPOSITORY</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">ARTIFACTS</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          {allArtifacts.length} generated artifact{allArtifacts.length === 1 ? "" : "s"} captured
          from imported AI interactions. Code, sketches, images, and documents.
        </p>
      </section>

      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
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

          <div className="ml-auto flex items-center gap-1 rounded-[var(--radius-2)] border border-line-hair p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`grid h-7 w-7 place-items-center rounded-[var(--radius-1)] transition-colors ${
                viewMode === "grid" ? "bg-ink text-paper-0" : "text-[var(--grey-500)] hover:bg-paper-100"
              }`}
            >
              <Grid3X3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`grid h-7 w-7 place-items-center rounded-[var(--radius-1)] transition-colors ${
                viewMode === "list" ? "bg-ink text-paper-0" : "text-[var(--grey-500)] hover:bg-paper-100"
              }`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            {filtered.length === 0 ? (
              <div className="dot-grid rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-16 text-center">
                <p className="tech-label">NO ARTIFACTS</p>
                <p className="mt-2 text-sm text-[var(--grey-600)]">
                  No outputs match the current filters.
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((a) => (
                  <ArtifactCard
                    key={a.id}
                    record={a}
                    selected={selectedId === a.id}
                    onSelect={() => setSelectedId(a.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-[var(--radius-2)] border border-line-hair">
                <table className="w-full text-sm">
                  <thead className="border-b border-line-hair bg-paper-50 text-[10px] uppercase tracking-[0.12em] text-[var(--grey-600)]">
                    <tr>
                      <th className="px-4 py-3 text-left font-sans font-normal">TITLE</th>
                      <th className="px-4 py-3 text-left font-sans font-normal">TYPE</th>
                      <th className="px-4 py-3 text-left font-sans font-normal">PLATFORM</th>
                      <th className="px-4 py-3 text-left font-sans font-normal">PROJECT</th>
                      <th className="px-4 py-3 text-left font-sans font-normal">UPDATED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => {
                      const kind = inferArtifactKind(a);
                      return (
                        <tr
                          key={a.id}
                          onClick={() => setSelectedId(a.id)}
                          className={`cursor-pointer border-b border-line-hair transition-colors last:border-b-0 hover:bg-paper-50 ${
                            selectedId === a.id ? "bg-paper-50" : ""
                          }`}
                        >
                          <td className="px-4 py-3">{a.title}</td>
                          <td className="px-4 py-3">
                            <span className="platform-badge">{kind}</span>
                          </td>
                          <td className="px-4 py-3 text-[var(--grey-600)]">
                            {platformLabel(a.platform)}
                          </td>
                          <td className="px-4 py-3 text-[var(--grey-600)]">{a.project ?? "Unfiled"}</td>
                          <td className="px-4 py-3 text-[var(--grey-500)]">
                            {relativeTime(a.started_at)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <aside className="hidden xl:block">
            {selected ? (
              <div className="sticky top-24 rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                <span className="editorial-tag">SELECTED ARTIFACT</span>
                <div className="mt-4 grid h-32 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100 dot-field">
                  {typeIcon(inferArtifactKind(selected))}
                </div>
                <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">
                  {selected.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="platform-badge">{inferArtifactKind(selected)}</span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                    {platformLabel(selected.platform)} · {formatTimeOfDay(selected.started_at)}
                  </span>
                </div>
                {selected.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">
                    {selected.summary}
                  </p>
                )}

                <div className="mt-6 space-y-3 border-t border-line-hair pt-4">
                  <Meta label="Project">
                    {selected.project ? (
                      <Link
                        href={`/projects/${projectSlug(selected.project)}`}
                        className="text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink"
                      >
                        {selected.project}
                      </Link>
                    ) : (
                      <span className="text-sm text-[var(--grey-500)]">Unfiled</span>
                    )}
                  </Meta>
                  <Meta label="Started">{relativeTime(selected.started_at)}</Meta>
                  {selected.tools_referenced.length > 0 && (
                    <Meta label="Tools">
                      <div className="flex flex-wrap gap-1.5">
                        {selected.tools_referenced.map((t) => (
                          <span
                            key={t}
                            className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </Meta>
                  )}
                </div>

                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-[var(--radius-2)] bg-ink px-4 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
                  >
                    OPEN ORIGINAL <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ) : (
              <div className="dot-grid rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-8 text-center">
                <p className="tech-label">SELECT AN ARTIFACT</p>
                <p className="mt-2 text-sm text-[var(--grey-600)]">
                  Choose an artifact to view its details
                </p>
              </div>
            )}
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

function ArtifactCard({
  record,
  selected,
  onSelect,
}: {
  record: InteractionRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  const kind = inferArtifactKind(record);
  return (
    <button
      onClick={onSelect}
      className={`group rounded-[var(--radius-2)] border p-4 text-left transition-all ${
        selected
          ? "border-ink shadow-line"
          : "border-line-hair hover:border-line-medium hover:shadow-line"
      }`}
    >
      <div className="grid h-24 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100 dot-field">
        {typeIcon(kind)}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="platform-badge">{kind}</span>
        <span className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
          {platformLabel(record.platform)}
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm">{record.title}</p>
      <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
        {record.project ?? "UNFILED"} · {relativeTime(record.started_at)}
      </p>
    </button>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
