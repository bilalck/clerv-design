"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  FolderKanban,
  MessageSquare,
  Plus,
} from "lucide-react";
import {
  ProjectAggregate,
  getProjectAggregates,
  platformInitial,
  platformLabel,
  relativeTime,
} from "@/lib/timeline-data";

const TABS = ["ALL", "RECENT", "ARCHIVED"] as const;
type Tab = (typeof TABS)[number];

function isRecent(p: ProjectAggregate): boolean {
  const days = (Date.now() - new Date(p.lastActivity).getTime()) / 86_400_000;
  return days <= 14;
}

export default function ProjectsPage() {
  const projects = useMemo(() => getProjectAggregates(), []);
  const [activeTab, setActiveTab] = useState<Tab>("ALL");

  const filtered = useMemo(() => {
    if (activeTab === "RECENT") return projects.filter(isRecent);
    if (activeTab === "ARCHIVED") return projects.filter((p) => !isRecent(p));
    return projects;
  }, [projects, activeTab]);

  const recentCount = projects.filter(isRecent).length;
  const totalArtifacts = projects.reduce((a, p) => a + p.artifactCount, 0);
  const totalTasks = projects.reduce((a, p) => a + p.taskCount, 0);
  const totalChats = projects.reduce((a, p) => a + p.chatCount, 0);

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
              Single workstream hubs grouping timeline events, artifacts, chats, and extracted
              tasks. {projects.length} projects derived from {totalChats + totalArtifacts + totalTasks} records.
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
          {TABS.map((tab) => {
            const count =
              tab === "ALL"
                ? projects.length
                : tab === "RECENT"
                  ? recentCount
                  : projects.length - recentCount;
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
      </section>

      {/* Projects Grid */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        {filtered.length === 0 ? (
          <div className="rounded-[var(--radius-2)] border border-dashed border-line-medium bg-paper-50 p-12 text-center dot-field">
            <p className="tech-label">NO PROJECTS</p>
            <p className="mt-3 font-serif text-2xl uppercase tracking-tight">
              EMPTY FOR THIS TAB
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => {
              const recent = isRecent(project);
              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100">
                        <FolderKanban className="h-5 w-5 text-[var(--grey-600)]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-lg uppercase tracking-tight">
                          {project.name}
                        </h3>
                        <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                          {relativeTime(project.lastActivity)}
                        </span>
                      </div>
                    </div>
                    <span className={`editorial-tag ${recent ? "" : "opacity-60"}`}>
                      {recent ? "ACTIVE" : "DORMANT"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      <MessageSquare className="h-3 w-3" /> {project.chatCount} CHATS
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      <FileText className="h-3 w-3" /> {project.artifactCount} ARTIFACTS
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      <CheckCircle2 className="h-3 w-3" /> {project.taskCount} TASKS
                    </span>
                  </div>

                  <div className="mt-4 border-t border-line-hair pt-4">
                    <p className="tech-label mb-2">PLATFORMS</p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.platforms.slice(0, 6).map((p) => (
                        <span
                          key={p}
                          title={platformLabel(p)}
                          className="grid h-6 w-6 place-items-center border border-line-hair bg-paper-50 text-[9px] font-sans uppercase tracking-wider text-[var(--grey-700)]"
                        >
                          {platformInitial(p)}
                        </span>
                      ))}
                      {project.platforms.length > 6 ? (
                        <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                          +{project.platforms.length - 6}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {project.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="platform-badge">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 ? (
                        <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                          +{project.tags.length - 4}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}

        {/* Hub Health Sidebar */}
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">HUB HEALTH</span>
            <p className="mt-4 stat-numeral">{projects.length}</p>
            <p className="mt-2 tech-label">WORKSTREAMS</p>
          </div>
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">CHATS</span>
            <p className="mt-4 stat-numeral">{totalChats}</p>
            <p className="mt-2 tech-label">CONVERSATIONS</p>
          </div>
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">OUTPUT</span>
            <p className="mt-4 stat-numeral">{totalArtifacts}</p>
            <p className="mt-2 tech-label">ARTIFACTS</p>
          </div>
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
            <span className="editorial-tag">BACKLOG</span>
            <p className="mt-4 stat-numeral">{totalTasks}</p>
            <p className="mt-2 tech-label">TASKS</p>
          </div>
        </div>
      </section>
    </div>
  );
}
