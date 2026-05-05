import { Archive, CheckCircle2, Clock3, FileText, MessageSquare, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { CommandPalette } from "@/components/ui/command-palette";
import { DataTable } from "@/components/ui/data-table";
import { Sidebar } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";

const activityRows = [
  {
    title: "AI Activity Hub Planning",
    platform: "ChatGPT",
    status: "Inbox",
    project: "Personal AI Dashboard",
  },
  {
    title: "Research Dashboard Prototype",
    platform: "Claude",
    status: "Reviewed",
    project: "UX Research",
  },
  {
    title: "Gemini Competitor Notes",
    platform: "Gemini",
    status: "New",
    project: "Research",
  },
];

const inboxItems = [
  ["C", "Claude artifact: Research dashboard prototype", "Review"],
  ["G", "ChatGPT chat: AI platform activity dashboard plan", "New"],
  ["M", "Manual upload: Dashboard IA sketch", "File"],
];

const projects = [
  ["Personal AI Dashboard", "42 events"],
  ["Design Systems", "18 events"],
  ["Client UX Research", "9 events"],
];

export default function Home() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main id="home" className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Local-first / import-first / privacy-aware</p>
            <CommandPalette />
          </div>
        </header>

        <section className="grid min-h-[82vh] grid-cols-1 border-b border-line-hair bg-paper-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between p-10 md:p-20">
            <div>
              <p className="editorial-kicker">AI Activity Hub / Home Screen</p>
              <div className="my-10 h-28 w-px bg-line-strong" />
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                What did I do with AI recently?
              </h1>
            </div>
            <p className="mt-12 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
              A calm daily dashboard for reviewing recent AI activity, inbox pressure,
              generated artifacts, extracted tasks, and active projects across ChatGPT,
              Claude, Gemini, manual uploads, and future API logs.
            </p>
          </div>

          <div className="relative min-h-[520px] border-l border-line-hair bg-paper-200">
            <div className="absolute inset-[72px] border border-line-soft" />
            <div className="absolute bottom-0 right-0 h-2/5 w-2/5 dot-field" />
            <div className="absolute bottom-12 left-12 right-12 border border-line-hair bg-paper-0/90 p-5 shadow-line">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
                Dashboard promise
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--grey-700)]">
                Timeline = what happened. Inbox = what needs review. Artifacts = what was created.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="editorial-kicker">Today</p>
              <h2 className="mt-6 max-w-4xl font-serif text-5xl uppercase leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Daily operating layer for AI work.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Review Inbox</Button>
              <Button variant="secondary">Import Export</Button>
              <Button variant="ghost">Archive Noise</Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <StatCard tag="Today" value="6" label="New chats" />
            <StatCard tag="Artifacts" value="3" label="Created today" />
            <StatCard tag="Inbox" value="14" label="Need review" />
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
            <Card id="inbox">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Tag>Inbox preview</Tag>
                  <h3 className="mt-5 font-serif text-3xl uppercase">Unreviewed AI work</h3>
                </div>
                <InboxCount />
              </div>
              <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
                {inboxItems.map(([icon, title, status]) => (
                  <div key={title} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
                    <span className="grid h-8 w-8 place-items-center border border-line-medium text-xs">{icon}</span>
                    <p className="text-sm text-[var(--grey-700)]">{title}</p>
                    <span className="editorial-tag">{status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button variant="primary">Open Inbox</Button>
                <Button variant="ghost">Extract Tasks</Button>
              </div>
            </Card>

            <Card id="artifacts">
              <Tag>Recent artifact</Tag>
              <div className="mt-6 grid min-h-44 place-items-center border border-line-hair bg-paper-100 dot-field">
                <FileText aria-hidden="true" className="h-10 w-10" />
              </div>
              <h3 className="mt-5 font-serif text-2xl uppercase">Dashboard IA Plan</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--grey-700)]">
                Generated from ChatGPT planning session. Linked to project and timeline event.
              </p>
            </Card>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[0.9fr_1.1fr]">
            <Card id="projects">
              <Tag>Active projects</Tag>
              <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
                {projects.map(([name, count], index) => (
                  <div key={name} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
                    <span className="grid h-8 w-8 place-items-center border border-line-medium text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-[var(--grey-700)]">{name}</p>
                    <span className="editorial-tag">{count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card id="timeline">
              <Tag>Timeline preview</Tag>
              <div className="mt-6 space-y-6 border-l border-line-strong pl-6">
                <TimelineEvent
                  icon={<MessageSquare className="h-4 w-4" />}
                  meta="Today · 10:42 AM · Claude"
                  title="Research Dashboard Prototype"
                  body="Generated an interactive React prototype for a research insight dashboard."
                />
                <TimelineEvent
                  icon={<Upload className="h-4 w-4" />}
                  meta="Yesterday · 6:04 PM · ChatGPT"
                  title="Export imported"
                  body="Imported 428 conversations, 2,941 messages, and 87 inbox items."
                />
              </div>
            </Card>
          </div>

          <div className="mt-3">
            <Card id="search">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <Tag>Activity table</Tag>
                  <h3 className="mt-5 font-serif text-3xl uppercase">Recent normalized events</h3>
                </div>
                <Button variant="ghost">View all</Button>
              </div>
              <DataTable rows={activityRows} />
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function InboxCount() {
  return (
    <div className="grid h-16 w-16 place-items-center border border-line-medium bg-paper-50 font-serif text-3xl">
      14
    </div>
  );
}

function TimelineEvent({
  icon,
  meta,
  title,
  body,
}: {
  icon: React.ReactNode;
  meta: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[39px] top-0 grid h-6 w-6 place-items-center rounded-full border border-ink bg-paper-0">
        {icon}
      </span>
      <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{meta}</p>
      <h4 className="mt-2 font-serif text-xl uppercase">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-[var(--grey-700)]">{body}</p>
    </div>
  );
}
