import { Archive, CheckCircle2, Clock, FileCode2, FileImage, FileText, MessageSquare, Sparkles, Upload } from "lucide-react";
import Link from "next/link";

const inboxItems = [
  { platform: "Claude", title: "Research dashboard prototype artifact", type: "Review", time: "2h ago" },
  { platform: "ChatGPT", title: "AI platform activity dashboard plan", type: "New", time: "4h ago" },
  { platform: "Manual", title: "Dashboard IA sketch upload", type: "File", time: "Yesterday" },
];

const projects = [
  { name: "Personal AI Dashboard", events: 42, status: "Active", progress: 68 },
  { name: "Design Systems", events: 18, status: "Active", progress: 45 },
  { name: "Client UX Research", events: 9, status: "Paused", progress: 82 },
];

const artifacts = [
  { type: "PDF", title: "Research Report v2", platform: "Claude", icon: FileText },
  { type: "SVG", title: "Dashboard Wireframe", platform: "ChatGPT", icon: FileImage },
  { type: "Code", title: "React Prototype", platform: "Claude", icon: FileCode2 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-line-hair bg-paper-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr]">
          {/* Left Column */}
          <div className="flex flex-col justify-between p-8 lg:p-16">
            <div>
              <p className="editorial-kicker">00 — INTELLIGENCE SUMMARY</p>
              <div className="my-8 measurement-line h-24" />
              <h1 className="editorial-title max-w-2xl text-5xl lg:text-7xl">
                MORNING PROTOCOL
              </h1>
              <p className="mt-8 max-w-xl text-[15px] leading-[1.7] text-[var(--grey-700)]">
                A calm daily dashboard for reviewing recent AI activity, inbox pressure, 
                generated artifacts, extracted tasks, and active projects.
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/inbox"
                className="rounded-[var(--radius-2)] bg-ink px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
              >
                REVIEW INBOX
              </Link>
              <Link
                href="/timeline"
                className="rounded-[var(--radius-2)] border border-line-medium bg-paper-0 px-5 py-2.5 text-[11px] font-sans uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper-100"
              >
                VIEW TIMELINE
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Zone */}
          <div className="relative hidden min-h-[480px] border-l border-line-hair bg-paper-100 lg:block">
            {/* Technical Frame */}
            <div className="absolute inset-8 border border-line-soft" />
            <div className="absolute bottom-0 right-0 h-1/2 w-1/2 dot-field opacity-60" />
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 border border-line-hair bg-paper-0/95 p-6 shadow-line backdrop-blur">
              <p className="tech-label">DASHBOARD PROMISE</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--grey-700)]">
                Timeline = what happened. Inbox = what needs review. Artifacts = what was created. 
                Projects = where it belongs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Summary Cards */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-16 lg:px-16">
        <div className="mb-12">
          <p className="editorial-kicker">TODAY&apos;S PULSE</p>
          <h2 className="mt-6 font-serif text-4xl uppercase tracking-[-0.03em] lg:text-5xl">
            INTELLIGENCE SUMMARY
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <IntelligenceCard number="6" label="NEW CHATS" tag="TODAY" trend="+2 from yesterday" />
          <IntelligenceCard number="3" label="ARTIFACTS" tag="CREATED" trend="1 PDF, 1 SVG, 1 Code" />
          <IntelligenceCard number="14" label="INBOX ITEMS" tag="PENDING" trend="4 high priority" />
        </div>
      </section>

      {/* Active Projects Strip */}
      <section className="border-b border-line-hair bg-paper-50 px-8 py-12 lg:px-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="tech-label">WORKSTREAMS</p>
            <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">ACTIVE PROJECTS</h3>
          </div>
          <Link
            href="/projects"
            className="text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-5 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-lg uppercase tracking-tight">{project.name}</p>
                  <p className="mt-1 text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-500)]">
                    {project.events} EVENTS
                  </p>
                </div>
                <span
                  className={`editorial-tag ${project.status === "Paused" ? "opacity-60" : ""}`}
                >
                  {project.status}
                </span>
              </div>
              {/* Progress Bar */}
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
            </div>
          ))}
        </div>
      </section>

      {/* Inbox Triage Preview + Recent Artifacts */}
      <section className="border-b border-line-hair bg-paper-0 px-8 py-16 lg:px-16">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.6fr]">
          {/* Inbox Triage Preview */}
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="editorial-tag">INBOX PREVIEW</span>
                <h3 className="mt-4 font-serif text-2xl uppercase tracking-tight">
                  UNREVIEWED AI WORK
                </h3>
              </div>
              <div className="grid h-14 w-14 place-items-center border border-line-medium bg-paper-50 font-serif text-3xl">
                14
              </div>
            </div>

            <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
              {inboxItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[40px_1fr_auto] items-center gap-4 py-4"
                >
                  <span className="grid h-10 w-10 place-items-center border border-line-medium text-[10px] font-sans uppercase tracking-wider">
                    {item.platform[0]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-[var(--grey-700)]">{item.title}</p>
                    <p className="mt-0.5 text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
                      {item.platform} · {item.time}
                    </p>
                  </div>
                  <span className="editorial-tag">{item.type}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/inbox"
                className="rounded-[var(--radius-2)] bg-ink px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-paper-0 transition-opacity hover:opacity-80"
              >
                OPEN INBOX
              </Link>
              <button className="rounded-[var(--radius-2)] border border-line-medium bg-paper-0 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.12em] text-ink transition-colors hover:bg-paper-100">
                EXTRACT TASKS
              </button>
            </div>
          </div>

          {/* Recent Artifacts */}
          <div className="rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6">
            <span className="editorial-tag">RECENT ARTIFACTS</span>
            <div className="mt-6 space-y-3">
              {artifacts.map((artifact, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-[var(--radius-2)] border border-line-hair p-4 transition-all hover:border-line-medium hover:bg-paper-50"
                >
                  <div className="grid h-12 w-12 place-items-center border border-line-hair bg-paper-100 dot-field">
                    <artifact.icon className="h-5 w-5 text-[var(--grey-600)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{artifact.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="platform-badge">{artifact.type}</span>
                      <span className="text-[10px] text-[var(--grey-500)]">{artifact.platform}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/artifacts"
              className="mt-6 block text-center text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
            >
              VIEW ALL ARTIFACTS
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="bg-paper-50 px-8 py-16 lg:px-16">
        <div className="mb-8">
          <p className="tech-label">CHRONOLOGICAL STREAM</p>
          <h3 className="mt-2 font-serif text-2xl uppercase tracking-tight">RECENT ACTIVITY</h3>
        </div>

        <div className="relative border-l border-line-strong pl-8">
          <TimelineEvent
            icon={<MessageSquare className="h-4 w-4" />}
            time="TODAY · 10:42 AM"
            platform="CLAUDE"
            title="Research Dashboard Prototype"
            body="Generated an interactive React prototype for a research insight dashboard with filtering and export capabilities."
          />
          <TimelineEvent
            icon={<Upload className="h-4 w-4" />}
            time="YESTERDAY · 6:04 PM"
            platform="CHATGPT"
            title="Conversation Export Imported"
            body="Imported 428 conversations, 2,941 messages, and 87 inbox items from ChatGPT export."
          />
          <TimelineEvent
            icon={<Sparkles className="h-4 w-4" />}
            time="YESTERDAY · 2:15 PM"
            platform="GEMINI"
            title="Competitor Analysis Complete"
            body="Completed competitive analysis of 5 AI dashboard products with feature comparison matrix."
          />
        </div>

        <Link
          href="/timeline"
          className="mt-8 inline-block text-[11px] font-sans uppercase tracking-[0.12em] text-[var(--grey-600)] underline underline-offset-4 transition-colors hover:text-ink"
        >
          VIEW FULL TIMELINE
        </Link>
      </section>
    </div>
  );
}

function IntelligenceCard({
  number,
  label,
  tag,
  trend,
}: {
  number: string;
  label: string;
  tag: string;
  trend: string;
}) {
  return (
    <div className="group rounded-[var(--radius-2)] border border-line-hair bg-paper-0 p-6 transition-all hover:-translate-y-0.5 hover:border-line-medium hover:shadow-line">
      <span className="editorial-tag">{tag}</span>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="stat-numeral">{number}</p>
          <p className="mt-2 text-[11px] font-sans uppercase tracking-[0.14em] text-[var(--grey-600)]">
            {label}
          </p>
        </div>
        <div className="measurement-line h-12" />
      </div>
      <div className="mt-4 border-t border-line-hair pt-4">
        <p className="text-[10px] font-sans uppercase tracking-[0.1em] text-[var(--grey-500)]">
          {trend}
        </p>
      </div>
    </div>
  );
}

function TimelineEvent({
  icon,
  time,
  platform,
  title,
  body,
}: {
  icon: React.ReactNode;
  time: string;
  platform: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative mb-8 last:mb-0">
      <span className="absolute -left-[44px] top-0 grid h-7 w-7 place-items-center rounded-full border border-ink bg-paper-0">
        {icon}
      </span>
      <div className="flex items-center gap-3">
        <p className="text-[10px] font-sans uppercase tracking-[0.14em] text-[var(--grey-500)]">
          {time}
        </p>
        <span className="platform-badge">{platform}</span>
      </div>
      <h4 className="mt-2 font-serif text-xl uppercase tracking-tight">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-[var(--grey-700)]">{body}</p>
    </div>
  );
}
