"use client";

import { useState } from "react";
import { Archive, CheckCircle2, ChevronDown, FileCode2, FileImage, FileText, MessageSquare, Upload } from "lucide-react";
import Link from "next/link";

type EventType = "chat" | "artifact" | "task" | "upload";
type Platform = "Claude" | "ChatGPT" | "Gemini" | "Manual";

interface TimelineEventData {
  id: string;
  type: EventType;
  platform: Platform;
  time: string;
  title: string;
  description: string;
  tags?: string[];
  artifact?: { type: string; name: string };
}

const timelineData: { date: string; dateLabel: string; events: TimelineEventData[] }[] = [
  {
    date: "2024-01-15",
    dateLabel: "TODAY",
    events: [
      {
        id: "1",
        type: "chat",
        platform: "Claude",
        time: "10:42 AM",
        title: "Research Dashboard Prototype",
        description: "Generated an interactive React prototype for a research insight dashboard with filtering and export capabilities.",
        tags: ["React", "Dashboard", "UX"],
        artifact: { type: "Code", name: "dashboard-prototype.tsx" },
      },
      {
        id: "2",
        type: "artifact",
        platform: "ChatGPT",
        time: "9:15 AM",
        title: "AI Platform Comparison Matrix",
        description: "Created a comprehensive feature comparison matrix for 8 AI platforms including pricing, API capabilities, and use cases.",
        tags: ["Research", "Analysis"],
        artifact: { type: "PDF", name: "ai-comparison.pdf" },
      },
      {
        id: "3",
        type: "task",
        platform: "Claude",
        time: "8:30 AM",
        title: "Task Extracted: Review Dashboard IA",
        description: "AI identified a follow-up task from yesterday's planning session to review information architecture.",
        tags: ["Follow-up", "Planning"],
      },
    ],
  },
  {
    date: "2024-01-14",
    dateLabel: "YESTERDAY",
    events: [
      {
        id: "4",
        type: "upload",
        platform: "Manual",
        time: "6:04 PM",
        title: "Conversation Export Imported",
        description: "Imported 428 conversations, 2,941 messages, and 87 inbox items from ChatGPT export.",
        tags: ["Import", "Data"],
      },
      {
        id: "5",
        type: "chat",
        platform: "Gemini",
        time: "2:15 PM",
        title: "Competitor Analysis Complete",
        description: "Completed competitive analysis of 5 AI dashboard products with feature comparison matrix.",
        tags: ["Research", "Competition"],
        artifact: { type: "SVG", name: "competitor-map.svg" },
      },
      {
        id: "6",
        type: "chat",
        platform: "Claude",
        time: "11:30 AM",
        title: "Design System Token Discussion",
        description: "Explored color palette options and typography scales for the BMW Editorial design system.",
        tags: ["Design", "Tokens"],
      },
    ],
  },
  {
    date: "2024-01-13",
    dateLabel: "JAN 13",
    events: [
      {
        id: "7",
        type: "artifact",
        platform: "ChatGPT",
        time: "4:22 PM",
        title: "Wireframe Sketch Generated",
        description: "Created low-fidelity wireframe sketches for the timeline and inbox views.",
        tags: ["Wireframe", "UX"],
        artifact: { type: "SVG", name: "wireframes.svg" },
      },
      {
        id: "8",
        type: "chat",
        platform: "Claude",
        time: "10:00 AM",
        title: "Project Kickoff Discussion",
        description: "Initial planning session for the AI Activity Hub project, defining scope and priorities.",
        tags: ["Planning", "Kickoff"],
      },
    ],
  },
];

const filters = {
  model: ["All", "Claude", "ChatGPT", "Gemini"],
  type: ["All", "Chat", "Artifact", "Task", "Upload"],
  sensitivity: ["All", "Public", "Private"],
};

export default function TimelinePage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    model: "All",
    type: "All",
    sensitivity: "All",
  });
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);

  const toggleEvent = (id: string) => {
    setExpandedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const getEventIcon = (type: EventType) => {
    switch (type) {
      case "chat": return <MessageSquare className="h-4 w-4" />;
      case "artifact": return <FileText className="h-4 w-4" />;
      case "task": return <CheckCircle2 className="h-4 w-4" />;
      case "upload": return <Upload className="h-4 w-4" />;
    }
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-4 w-4" />;
      case "SVG": return <FileImage className="h-4 w-4" />;
      case "Code": return <FileCode2 className="h-4 w-4" />;
      default: return <Archive className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <p className="editorial-kicker">03 — CHRONOLOGICAL STREAM</p>
        <div className="my-6 measurement-line h-16" />
        <h1 className="editorial-title text-4xl lg:text-6xl">TIMELINE</h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
          Editorial chronological record of all AI interactions across platforms.
        </p>
      </section>

      {/* Filters */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          {Object.entries(filters).map(([key, options]) => (
            <div key={key} className="relative">
              <select
                value={activeFilters[key]}
                onChange={(e) => setActiveFilters((prev) => ({ ...prev, [key]: e.target.value }))}
                className="appearance-none rounded-[var(--radius-2)] border border-line-hair bg-paper-0 py-2 pl-3 pr-8 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] focus:border-line-medium focus:outline-none"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {key.toUpperCase()}: {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[var(--grey-500)]" />
            </div>
          ))}
          <button
            onClick={() => setActiveFilters({ model: "All", type: "All", sensitivity: "All" })}
            className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 transition-colors hover:text-ink"
          >
            CLEAR ALL
          </button>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="bg-paper-0 px-8 py-12 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_280px]">
          {/* Main Timeline */}
          <div className="mx-auto max-w-3xl">
            {timelineData.map((day, dayIndex) => (
              <div key={day.date} className="relative mb-12 last:mb-0">
                {/* Date Spine Header */}
                <div className="mb-8 flex items-center gap-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-6xl leading-none text-line-medium">
                      {String(dayIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl uppercase tracking-tight">{day.dateLabel}</h2>
                  </div>
                  <div className="hairline-divider flex-1" />
                </div>

                {/* Events with vertical spine */}
                <div className="relative ml-4 border-l border-line-strong pb-4 pl-10">
                  {day.events.map((event) => {
                    const isExpanded = expandedEvents.includes(event.id);
                    return (
                      <div key={event.id} className="relative mb-6 last:mb-0">
                        {/* Timeline Node */}
                        <span className="absolute -left-[46px] top-0 grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper-0">
                          {getEventIcon(event.type)}
                        </span>

                        {/* Event Card */}
                        <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:border-line-medium">
                          {/* Meta Strip */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-500)]">
                              {event.time}
                            </span>
                            <span className="platform-badge">{event.platform}</span>
                            <span className="editorial-tag">{event.type}</span>
                          </div>

                          <h3 className="mt-3 font-serif text-xl uppercase tracking-tight">{event.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{event.description}</p>

                          {/* Tags */}
                          {event.tags && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {event.tags.map((tag) => (
                                <span key={tag} className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Artifact Preview */}
                          {event.artifact && (
                            <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-2)] border border-line-hair bg-paper-50 p-3">
                              <div className="grid h-10 w-10 place-items-center border border-line-hair bg-paper-0">
                                {getArtifactIcon(event.artifact.type)}
                              </div>
                              <div>
                                <p className="text-sm">{event.artifact.name}</p>
                                <span className="platform-badge mt-1">{event.artifact.type}</span>
                              </div>
                            </div>
                          )}

                          {/* Expand */}
                          <button
                            onClick={() => toggleEvent(event.id)}
                            className="mt-4 text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink"
                          >
                            {isExpanded ? "COLLAPSE" : "EXPAND"}
                          </button>

                          {isExpanded && (
                            <div className="mt-4 border-t border-line-hair pt-4">
                              <p className="tech-label mb-2">LINKED PROJECT</p>
                              <Link href="/projects/personal-ai-dashboard" className="text-sm text-[var(--grey-700)] underline underline-offset-4 hover:text-ink">
                                Personal AI Dashboard
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Stats */}
          <aside className="hidden space-y-4 xl:block">
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">TODAY</span>
              <p className="mt-4 stat-numeral">6</p>
              <p className="mt-2 tech-label">NEW EVENTS</p>
            </div>
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">INBOX</span>
              <p className="mt-4 stat-numeral">14</p>
              <p className="mt-2 tech-label">NEED REVIEW</p>
              <Link href="/inbox" className="mt-4 block rounded-[var(--radius-2)] bg-ink px-4 py-2 text-center text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 hover:opacity-80">
                REVIEW INBOX
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
