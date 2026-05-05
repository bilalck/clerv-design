"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart2, CheckCircle2, FileText, FolderKanban, MessageSquare, Plus, Sparkles, Tag } from "lucide-react";

type ProjectStatus = "Active" | "Review" | "Paused" | "Archived";

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  conversations: number;
  artifacts: number;
  tasks: number;
  progress: number;
  models: string[];
  tags: string[];
  lastActive: string;
}

const projects: Project[] = [
  {
    id: "personal-ai-dashboard",
    name: "Personal AI Dashboard",
    description: "Unified dashboard for tracking AI conversations, artifacts, and extracted intelligence.",
    status: "Active",
    conversations: 42,
    artifacts: 12,
    tasks: 8,
    progress: 68,
    models: ["Claude 3.5", "GPT-4o"],
    tags: ["Product", "Dashboard", "AI"],
    lastActive: "2h ago",
  },
  {
    id: "design-systems",
    name: "Design Systems",
    description: "BMW Editorial design system documentation and component library.",
    status: "Active",
    conversations: 18,
    artifacts: 24,
    tasks: 3,
    progress: 45,
    models: ["Claude 3.5", "Gemini 1.5 Pro"],
    tags: ["Design", "Components", "Tokens"],
    lastActive: "Yesterday",
  },
  {
    id: "client-ux-research",
    name: "Client UX Research",
    description: "User research synthesis and insight extraction for client projects.",
    status: "Review",
    conversations: 9,
    artifacts: 6,
    tasks: 2,
    progress: 82,
    models: ["GPT-4o"],
    tags: ["Research", "UX", "Client"],
    lastActive: "3 days ago",
  },
];

const tabs = ["ALL", "ACTIVE", "REVIEW", "ARCHIVED"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProjects = projects.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.status.toUpperCase() === activeTab;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="editorial-kicker">06 — WORKSTREAM HUB</p>
            <div className="my-6 measurement-line h-16" />
            <h1 className="editorial-title text-4xl lg:text-6xl">PROJECTS</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
              Single workstream hubs. Group timeline events, artifacts, chats, tasks, and decisions into durable work containers.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-[var(--radius-2)] bg-ink px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
            <Plus className="h-4 w-4" />
            CREATE PROJECT
          </button>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-4 lg:px-16">
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
      </section>

      {/* Projects Grid */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                    <FolderKanban className="h-5 w-5 text-[var(--grey-600)]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg uppercase tracking-tight">{project.name}</h3>
                    <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      {project.lastActive}
                    </span>
                  </div>
                </div>
                <span
                  className={`editorial-tag ${
                    project.status === "Paused" || project.status === "Archived" ? "opacity-60" : ""
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-relaxed text-[var(--grey-700)]">{project.description}</p>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  <MessageSquare className="h-3 w-3" /> {project.conversations}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  <FileText className="h-3 w-3" /> {project.artifacts}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  <CheckCircle2 className="h-3 w-3" /> {project.tasks}
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="h-1 w-full rounded-full bg-paper-200">
                  <div
                    className="h-1 rounded-full bg-ink transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  {project.progress}% COMPLETE
                </p>
              </div>

              {/* Model Distribution */}
              <div className="mt-4 border-t border-line-hair pt-4">
                <p className="tech-label mb-2">MODELS USED</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.models.map((model) => (
                    <span
                      key={model}
                      className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-0.5 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="platform-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Hub Health Sidebar */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">HUB HEALTH</span>
            <p className="mt-4 stat-numeral">{projects.length}</p>
            <p className="mt-2 tech-label">ACTIVE WORKSTREAMS</p>
          </div>
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">TOTAL OUTPUT</span>
            <p className="mt-4 stat-numeral">{projects.reduce((a, p) => a + p.artifacts, 0)}</p>
            <p className="mt-2 tech-label">ARTIFACTS CREATED</p>
          </div>
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">TASK BACKLOG</span>
            <p className="mt-4 stat-numeral">{projects.reduce((a, p) => a + p.tasks, 0)}</p>
            <p className="mt-2 tech-label">PENDING TASKS</p>
          </div>
        </div>
      </section>
    </div>
  );
}
