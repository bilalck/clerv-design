"use client";

import { useState } from "react";
import { Archive, ChevronDown, Code2, FileCode2, FileImage, FileText, Filter, Grid3X3, List, Upload } from "lucide-react";
import Link from "next/link";

type ArtifactType = "PDF" | "SVG" | "Code" | "Document" | "Prototype" | "Diagram";
type Platform = "Claude" | "ChatGPT" | "Gemini" | "Manual";

interface Artifact {
  id: string;
  title: string;
  type: ArtifactType;
  platform: Platform;
  project: string;
  updated: string;
  version: string;
}

const artifacts: Artifact[] = [
  { id: "art_001", title: "Research Dashboard Prototype", type: "Prototype", platform: "Claude", project: "UX Research", updated: "Today", version: "v3" },
  { id: "art_002", title: "AI Activity Product Plan", type: "Document", platform: "ChatGPT", project: "Personal AI Dashboard", updated: "Yesterday", version: "v1" },
  { id: "art_003", title: "Inbox Triage Flow", type: "Diagram", platform: "Manual", project: "Personal AI Dashboard", updated: "This week", version: "v2" },
  { id: "art_004", title: "Parser Utility", type: "Code", platform: "ChatGPT", project: "Data Import", updated: "This week", version: "v1" },
  { id: "art_005", title: "Competitor Analysis Report", type: "PDF", platform: "Gemini", project: "Research", updated: "Jan 10", version: "v1" },
  { id: "art_006", title: "Component Library Spec", type: "Document", platform: "Claude", project: "Design Systems", updated: "Jan 8", version: "v4" },
  { id: "art_007", title: "API Schema Diagram", type: "SVG", platform: "ChatGPT", project: "Data Import", updated: "Jan 5", version: "v2" },
  { id: "art_008", title: "Timeline Event Model", type: "Code", platform: "Claude", project: "Personal AI Dashboard", updated: "Jan 3", version: "v1" },
];

const typeFilters = ["All", "PDF", "SVG", "Code", "Document", "Prototype", "Diagram"];
const platformFilters = ["All", "Claude", "ChatGPT", "Gemini", "Manual"];

export default function ArtifactsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(artifacts[0]);

  const getTypeIcon = (type: ArtifactType) => {
    switch (type) {
      case "PDF": case "Document": return <FileText className="h-5 w-5" />;
      case "SVG": case "Diagram": return <FileImage className="h-5 w-5" />;
      case "Code": case "Prototype": return <FileCode2 className="h-5 w-5" />;
      default: return <Archive className="h-5 w-5" />;
    }
  };

  const filteredArtifacts = artifacts.filter((a) => {
    if (typeFilter !== "All" && a.type !== typeFilter) return false;
    if (platformFilter !== "All" && a.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">05 — VISUAL REPOSITORY</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">ARTIFACTS LIBRARY</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Visual output repository. Documents, code, diagrams, prototypes linked to source conversations.
        </p>
      </section>

      {/* Filter Strip */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Type Filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
              >
                {typeFilters.map((t) => (
                  <option key={t} value={t}>TYPE: {t}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
            </div>

            {/* Platform Filter */}
            <div className="relative">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
              >
                {platformFilters.map((p) => (
                  <option key={p} value={p}>PLATFORM: {p}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
            </div>

            <button
              onClick={() => { setTypeFilter("All"); setPlatformFilter("All"); }}
              className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink"
            >
              CLEAR ALL
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex rounded-[var(--radius-2)] border border-line-hair">
              <button
                onClick={() => setViewMode("grid")}
                className={`grid h-9 w-9 place-items-center transition-colors ${viewMode === "grid" ? "bg-ink text-paper-0" : "hover:bg-paper-100"}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`grid h-9 w-9 place-items-center border-l border-line-hair transition-colors ${viewMode === "list" ? "bg-ink text-paper-0" : "hover:bg-paper-100"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button className="flex items-center gap-2 rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
              <Upload className="h-3.5 w-3.5" />
              UPLOAD
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        {filteredArtifacts.length === 0 ? (
          /* Empty State */
          <div className="mx-auto max-w-md py-20 text-center">
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-50 dot-grid">
              <Archive className="h-8 w-8 text-[var(--grey-400)]" />
            </div>
            <h3 className="font-serif text-xl uppercase tracking-tight">NO ARTIFACTS FOUND</h3>
            <p className="mt-2 text-sm text-[var(--grey-600)]">
              No artifacts match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => { setTypeFilter("All"); setPlatformFilter("All"); }}
              className="mt-6 rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100"
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtifacts.map((artifact) => (
              <button
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact)}
                className={`group rounded-[var(--radius-2)] border p-5 text-left transition-all hover:-translate-y-0.5 ${
                  selectedArtifact?.id === artifact.id
                    ? "border-ink shadow-line"
                    : "border-line-hair hover:border-line-medium hover:shadow-line"
                }`}
              >
                {/* Preview Area */}
                <div className="mb-4 grid h-32 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100 dot-field transition-colors group-hover:bg-paper-50">
                  {getTypeIcon(artifact.type)}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2">
                  <span className="platform-badge">{artifact.type}</span>
                  <span className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{artifact.platform}</span>
                </div>

                <h3 className="mt-2 font-serif text-lg uppercase tracking-tight">{artifact.title}</h3>

                <div className="mt-3 flex items-center justify-between border-t border-line-hair pt-3">
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{artifact.updated}</span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{artifact.version}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="rounded-[var(--radius-2)] border border-line-hair">
            <div className="grid grid-cols-[1fr_100px_100px_100px_80px] gap-4 border-b border-line-hair bg-paper-50 px-4 py-3">
              <span className="tech-label">NAME</span>
              <span className="tech-label">TYPE</span>
              <span className="tech-label">PLATFORM</span>
              <span className="tech-label">UPDATED</span>
              <span className="tech-label">VERSION</span>
            </div>
            {filteredArtifacts.map((artifact) => (
              <button
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact)}
                className={`grid w-full grid-cols-[1fr_100px_100px_100px_80px] items-center gap-4 border-b border-line-hair px-4 py-4 text-left transition-colors last:border-b-0 ${
                  selectedArtifact?.id === artifact.id ? "bg-paper-100" : "hover:bg-paper-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center border border-line-hair bg-paper-100">
                    {getTypeIcon(artifact.type)}
                  </div>
                  <span className="text-sm">{artifact.title}</span>
                </div>
                <span className="platform-badge">{artifact.type}</span>
                <span className="text-[11px] text-[var(--grey-600)]">{artifact.platform}</span>
                <span className="text-[11px] text-[var(--grey-600)]">{artifact.updated}</span>
                <span className="text-[11px] text-[var(--grey-600)]">{artifact.version}</span>
              </button>
            ))}
          </div>
        )}

        {/* Selected Artifact Detail */}
        {selectedArtifact && (
          <div className="mt-8 rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="editorial-tag">SELECTED ARTIFACT</span>
                <h3 className="mt-4 font-serif text-2xl uppercase tracking-tight">{selectedArtifact.title}</h3>
              </div>
              <div className="flex gap-2">
                <button className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                  DOWNLOAD
                </button>
                <button className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
                  OPEN
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-4">
                <p className="tech-label mb-2">TYPE</p>
                <p className="text-sm">{selectedArtifact.type}</p>
              </div>
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-4">
                <p className="tech-label mb-2">PLATFORM</p>
                <p className="text-sm">{selectedArtifact.platform}</p>
              </div>
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-4">
                <p className="tech-label mb-2">PROJECT</p>
                <Link href={`/projects/${selectedArtifact.project.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm underline underline-offset-4 hover:text-ink">
                  {selectedArtifact.project}
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
