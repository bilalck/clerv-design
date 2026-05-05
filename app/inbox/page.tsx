"use client";

import { useState } from "react";
import { Archive, CheckCircle2, ChevronRight, Clock, FileText, FolderKanban, Lock, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

type InboxStatus = "new" | "needs-review" | "sensitive" | "archived";
type Platform = "Claude" | "ChatGPT" | "Gemini" | "Manual";

interface InboxItem {
  id: string;
  platform: Platform;
  type: string;
  title: string;
  summary: string;
  suggestedProject: string;
  detected: { decisions: number; tasks: number; artifacts: number };
  status: InboxStatus;
  time: string;
}

const inboxItems: InboxItem[] = [
  {
    id: "inb_001",
    platform: "ChatGPT",
    type: "Planning",
    title: "AI Activity Dashboard Method",
    summary: "Explored Timeline, Inbox, Artifacts and Chats as the core structure for a unified AI activity dashboard.",
    suggestedProject: "Personal AI Dashboard",
    detected: { decisions: 2, tasks: 3, artifacts: 1 },
    status: "needs-review",
    time: "2h ago",
  },
  {
    id: "inb_002",
    platform: "Claude",
    type: "Artifact",
    title: "Research Dashboard Prototype",
    summary: "Contains a React component, SVG flow diagram and prototype layout for research insights.",
    suggestedProject: "UX Research",
    detected: { decisions: 1, tasks: 2, artifacts: 2 },
    status: "new",
    time: "4h ago",
  },
  {
    id: "inb_003",
    platform: "Manual",
    type: "Sensitive",
    title: "Dashboard IA Sketch",
    summary: "Manual upload with possible private project notes. Mark sensitivity before AI enrichment.",
    suggestedProject: "Personal AI Dashboard",
    detected: { decisions: 0, tasks: 1, artifacts: 1 },
    status: "sensitive",
    time: "Yesterday",
  },
  {
    id: "inb_004",
    platform: "Gemini",
    type: "Research",
    title: "Competitor Feature Matrix",
    summary: "Comprehensive analysis of 5 competing AI dashboard products with feature comparisons.",
    suggestedProject: "Research",
    detected: { decisions: 1, tasks: 0, artifacts: 1 },
    status: "new",
    time: "Yesterday",
  },
];

const tabs = ["ALL", "NEW", "NEEDS REVIEW", "SENSITIVE", "ARCHIVED"];

export default function InboxPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(inboxItems[0]);

  const getStatusColor = (status: InboxStatus) => {
    switch (status) {
      case "new": return "bg-paper-100";
      case "needs-review": return "bg-[var(--accent-warn)]/10";
      case "sensitive": return "bg-[var(--accent-danger)]/10";
      case "archived": return "bg-paper-200";
    }
  };

  const getStatusIcon = (status: InboxStatus) => {
    switch (status) {
      case "new": return <Sparkles className="h-3.5 w-3.5" />;
      case "needs-review": return <Clock className="h-3.5 w-3.5" />;
      case "sensitive": return <Lock className="h-3.5 w-3.5" />;
      case "archived": return <Archive className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">04 — CENTRAL PROCESSING</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">INBOX TRIAGE</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Central processing of AI-derived tasks, decisions, and artifacts. One-tap triage into projects.
        </p>
      </section>

      {/* Tabs + Actions */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-[var(--radius-2)] px-3 py-2 text-[10px] font-sans uppercase tracking-[0.12em] transition-colors ${
                  activeTab === tab
                    ? "bg-ink text-paper-0"
                    : "text-[var(--grey-600)] hover:bg-paper-100 hover:text-ink"
                }`}
              >
                {tab}
              </button>
            ))}
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
          {/* Item List */}
          <div className="space-y-3">
            {inboxItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full rounded-[var(--radius-2)] border p-5 text-left transition-all ${
                  selectedItem?.id === item.id
                    ? "border-ink shadow-line"
                    : "border-line-hair hover:border-line-medium"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center border border-line-medium text-[10px] font-sans uppercase tracking-wider">
                      {item.platform[0]}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="platform-badge">{item.platform}</span>
                        <span className="editorial-tag">{item.type}</span>
                        <span className={`flex items-center gap-1 rounded-[var(--radius-1)] px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status.replace("-", " ")}
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-lg uppercase tracking-tight">{item.title}</h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    {item.time}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">{item.summary}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    <CheckCircle2 className="h-3 w-3" /> {item.detected.tasks} TASKS
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    <MessageSquare className="h-3 w-3" /> {item.detected.decisions} DECISIONS
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                    <FileText className="h-3 w-3" /> {item.detected.artifacts} ARTIFACTS
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Side Panel */}
          <aside className="hidden xl:block">
            {selectedItem ? (
              <div className="sticky top-24 space-y-4">
                <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
                  <span className="editorial-tag">SELECTED ITEM</span>
                  <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">{selectedItem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{selectedItem.summary}</p>
                  
                  <div className="mt-6 border-t border-line-hair pt-4">
                    <p className="tech-label mb-2">SUGGESTED PROJECT</p>
                    <Link
                      href={`/projects/${selectedItem.suggestedProject.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink"
                    >
                      <FolderKanban className="h-4 w-4" />
                      {selectedItem.suggestedProject}
                    </Link>
                  </div>

                  <div className="mt-6 border-t border-line-hair pt-4">
                    <p className="tech-label mb-3">DETECTED INTELLIGENCE</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--grey-700)]">Tasks</span>
                        <span className="font-serif text-lg">{selectedItem.detected.tasks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--grey-700)]">Decisions</span>
                        <span className="font-serif text-lg">{selectedItem.detected.decisions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--grey-700)]">Artifacts</span>
                        <span className="font-serif text-lg">{selectedItem.detected.artifacts}</span>
                      </div>
                    </div>
                  </div>

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
                  <p className="mt-4 stat-numeral">14</p>
                  <p className="mt-2 tech-label">ITEMS REMAINING</p>
                </div>
              </div>
            ) : (
              <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-8 text-center dot-grid">
                <p className="tech-label">SELECT AN ITEM</p>
                <p className="mt-2 text-sm text-[var(--grey-600)]">Choose an item from the list to view details</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
