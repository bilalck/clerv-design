"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, FileText, FolderKanban, MessageSquare, Search, Sparkles, Tag } from "lucide-react";
import Link from "next/link";

type ResultType = "Chat" | "Artifact" | "Decision" | "Task" | "Project";

interface SearchResult {
  id: string;
  type: ResultType;
  title: string;
  source: string;
  summary: string;
  project: string;
  date: string;
  confidence: number;
}

const results: SearchResult[] = [
  {
    id: "res_001",
    type: "Chat",
    title: "AI Activity Hub Planning",
    source: "ChatGPT",
    summary: "Product planning conversation covering Timeline, Inbox, Artifacts, Chats, Projects, import-first architecture and MVP order.",
    project: "Personal AI Dashboard",
    date: "Today",
    confidence: 0.94,
  },
  {
    id: "res_002",
    type: "Artifact",
    title: "AI Activity Product Plan",
    source: "ChatGPT",
    summary: "Structured product plan for a dashboard consolidating AI conversations, artifacts, tasks and activity across platforms.",
    project: "Personal AI Dashboard",
    date: "Yesterday",
    confidence: 0.91,
  },
  {
    id: "res_003",
    type: "Decision",
    title: "Use import-first architecture",
    source: "Extracted decision",
    summary: "Prioritize official exports and manual capture before fragile browser extensions or live integrations.",
    project: "Personal AI Dashboard",
    date: "This week",
    confidence: 0.88,
  },
  {
    id: "res_004",
    type: "Task",
    title: "Design Inbox triage flow",
    source: "Extracted task",
    summary: "Create the daily review workflow for accepting projects, extracting tasks, saving artifacts and archiving noise.",
    project: "Personal AI Dashboard",
    date: "This week",
    confidence: 0.84,
  },
];

const typeFilters = ["All", "Chat", "Artifact", "Decision", "Task", "Project"];
const platformFilters = ["All", "Claude", "ChatGPT", "Gemini", "Manual"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [isAskMode, setIsAskMode] = useState(false);

  const getTypeIcon = (type: ResultType) => {
    switch (type) {
      case "Chat": return <MessageSquare className="h-4 w-4" />;
      case "Artifact": return <FileText className="h-4 w-4" />;
      case "Decision": return <Tag className="h-4 w-4" />;
      case "Task": return <CheckCircle2 className="h-4 w-4" />;
      case "Project": return <FolderKanban className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-[var(--accent-green)]";
    if (confidence >= 0.8) return "text-[var(--accent-warn)]";
    return "text-[var(--grey-500)]";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">07 — UNIVERSAL RETRIEVAL</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">SEARCH / ASK</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Universal search across chats, artifacts, decisions, tasks, projects. Source-linked results.
        </p>
      </section>

      {/* Search Bar */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-6 lg:px-16">
        <div className="mx-auto max-w-3xl">
          {/* Mode Toggle */}
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

          {/* Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--grey-400)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isAskMode ? "Ask anything about your AI history..." : "Search chats, artifacts, decisions, tasks..."}
              className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-4 pl-12 pr-4 text-lg focus:border-line-medium focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
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

            <button className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink">
              CLEAR ALL
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="mx-auto max-w-3xl">
          {/* Result Count */}
          <div className="mb-6 flex items-center justify-between">
            <span className="tech-label">{results.length} RESULTS</span>
            <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">SORTED BY RELEVANCE</span>
          </div>

          {/* Results List */}
          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.id}
                className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:border-line-medium hover:shadow-line"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 place-items-center border border-line-hair bg-paper-100">
                      {getTypeIcon(result.type)}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="platform-badge">{result.type}</span>
                        <span className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{result.source}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg uppercase tracking-tight">{result.title}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-serif text-lg ${getConfidenceColor(result.confidence)}`}>
                      {Math.round(result.confidence * 100)}%
                    </span>
                    <p className="text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">MATCH</p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">{result.summary}</p>

                <div className="mt-4 flex items-center justify-between border-t border-line-hair pt-3">
                  <Link
                    href={`/projects/${result.project.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)] hover:text-ink"
                  >
                    <FolderKanban className="h-3 w-3" />
                    {result.project}
                  </Link>
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{result.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {results.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-50 dot-grid">
                <Search className="h-8 w-8 text-[var(--grey-400)]" />
              </div>
              <h3 className="font-serif text-xl uppercase tracking-tight">NO RESULTS</h3>
              <p className="mt-2 text-sm text-[var(--grey-600)]">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
