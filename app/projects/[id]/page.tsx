import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, FileCode2, FileImage, FileText, MessageSquare, Sparkles, Tag, Upload } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  conversations: number;
  artifacts: number;
  tasks: number;
  progress: number;
}

const projects: Project[] = [
  { id: "personal-ai-dashboard", name: "Personal AI Dashboard", description: "Unified dashboard for tracking AI conversations and artifacts.", status: "Active", conversations: 42, artifacts: 12, tasks: 8, progress: 68 },
  { id: "design-systems", name: "Design Systems", description: "BMW Editorial design system documentation.", status: "Active", conversations: 18, artifacts: 24, tasks: 3, progress: 45 },
  { id: "client-ux-research", name: "Client UX Research", description: "User research synthesis for client projects.", status: "Review", conversations: 9, artifacts: 6, tasks: 2, progress: 82 },
];

const timelineEvents = [
  { type: "chat", platform: "Claude", time: "Today, 10:42 AM", title: "Dashboard Component Discussion" },
  { type: "artifact", platform: "ChatGPT", time: "Yesterday", title: "API Schema Generated" },
  { type: "task", platform: "Claude", time: "Jan 12", title: "Task Extracted: Review IA" },
];

const artifactsData = [
  { type: "Code", title: "Dashboard Prototype", platform: "Claude" },
  { type: "PDF", title: "Product Requirements", platform: "ChatGPT" },
  { type: "SVG", title: "Wireframe Sketch", platform: "Manual" },
];

const tasksData = [
  { title: "Review information architecture", status: "pending" },
  { title: "Finalize color tokens", status: "done" },
  { title: "Write API documentation", status: "pending" },
];

const decisionsData = [
  { title: "Use import-first architecture", date: "Jan 10" },
  { title: "Prioritize Timeline over Search", date: "Jan 8" },
];

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "chat": return <MessageSquare className="h-4 w-4" />;
      case "artifact": return <FileText className="h-4 w-4" />;
      case "task": return <CheckCircle2 className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-4 w-4" />;
      case "SVG": return <FileImage className="h-4 w-4" />;
      case "Code": return <FileCode2 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-12 lg:px-16">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          BACK TO PROJECTS
        </Link>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="editorial-tag">{project.status}</span>
              <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                {project.progress}% COMPLETE
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl uppercase tracking-tight lg:text-5xl">{project.name}</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--grey-700)]">
              {project.description}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
              EXPORT
            </button>
            <button className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80">
              ADD ITEM
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper-0 px-8 py-8 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Contextual Timeline */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
              <div className="flex items-center justify-between">
                <span className="editorial-tag">CONTEXTUAL TIMELINE</span>
                <Link href="/timeline" className="text-[10px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)] underline underline-offset-4 hover:text-ink">
                  VIEW FULL
                </Link>
              </div>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">PROJECT-SPECIFIC FEED</h3>

              <div className="mt-6 space-y-4 border-l border-line-strong pl-6">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-[30px] top-0 grid h-6 w-6 place-items-center rounded-full border border-ink bg-paper-0">
                      {getEventIcon(event.type)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">{event.time}</span>
                      <span className="platform-badge">{event.platform}</span>
                    </div>
                    <p className="mt-1 text-sm">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Artifacts Gallery */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
              <span className="editorial-tag">ARTIFACTS GALLERY</span>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">PROJECT OUTPUTS</h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {artifactsData.map((artifact, index) => (
                  <div
                    key={index}
                    className="rounded-[var(--radius-2)] border border-line-hair p-4 transition-all hover:border-line-medium hover:shadow-line"
                  >
                    <div className="mb-3 grid h-20 place-items-center rounded-[var(--radius-2)] border border-line-hair bg-paper-100 dot-field">
                      {getArtifactIcon(artifact.type)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="platform-badge">{artifact.type}</span>
                      <span className="text-[9px] text-[var(--grey-500)]">{artifact.platform}</span>
                    </div>
                    <p className="mt-2 text-sm">{artifact.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks & Decisions */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
              <span className="editorial-tag">INTELLIGENCE EXTRACTION</span>
              <h3 className="mt-4 font-serif text-xl uppercase tracking-tight">TASKS & DECISIONS</h3>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Tasks */}
                <div>
                  <p className="tech-label mb-3">EXTRACTED TASKS</p>
                  <div className="space-y-2">
                    {tasksData.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-[var(--radius-2)] border border-line-hair p-3"
                      >
                        <CheckCircle2
                          className={`h-4 w-4 ${task.status === "done" ? "text-[var(--accent-green)]" : "text-[var(--grey-400)]"}`}
                        />
                        <span className={`text-sm ${task.status === "done" ? "line-through text-[var(--grey-500)]" : ""}`}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decisions */}
                <div>
                  <p className="tech-label mb-3">KEY DECISIONS</p>
                  <div className="space-y-2">
                    {decisionsData.map((decision, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-[var(--radius-2)] border border-line-hair p-3"
                      >
                        <span className="text-sm">{decision.title}</span>
                        <span className="text-[10px] text-[var(--grey-500)]">{decision.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Project Metrics */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">PROJECT METRICS</span>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--grey-700)]">Conversations</span>
                  <span className="font-serif text-xl">{project.conversations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--grey-700)]">Artifacts</span>
                  <span className="font-serif text-xl">{project.artifacts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--grey-700)]">Tasks</span>
                  <span className="font-serif text-xl">{project.tasks}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 border-t border-line-hair pt-4">
                <p className="tech-label mb-2">PROGRESS</p>
                <div className="h-2 w-full rounded-full bg-paper-200">
                  <div
                    className="h-2 rounded-full bg-ink transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-[11px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                  {project.progress}%
                </p>
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">TAXONOMY</span>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Product", "Dashboard", "AI", "React", "Design System", "UX"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--radius-1)] bg-paper-100 px-2 py-1 text-[9px] font-sans uppercase tracking-[0.1em] text-[var(--grey-600)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5">
              <span className="editorial-tag">QUICK ACTIONS</span>
              <div className="mt-4 space-y-2">
                <button className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-left text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                  ADD CONVERSATION
                </button>
                <button className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-left text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                  UPLOAD ARTIFACT
                </button>
                <button className="w-full rounded-[var(--radius-2)] border border-line-hair bg-paper-0 px-4 py-2.5 text-left text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-700)] transition-colors hover:bg-paper-100">
                  CREATE TASK
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
