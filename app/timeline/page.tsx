import { ActivityEventCard, type ActivityEvent } from "@/components/timeline/activity-event-card";
import { TimelineFilters } from "@/components/timeline/timeline-filters";
import { TimelineEmptyState, TimelineErrorState, TimelineLoadingState } from "@/components/timeline/timeline-states";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";

const events: ActivityEvent[] = [
  {
    id: "evt_001",
    time: "Today · 10:42 AM",
    platform: "Claude",
    type: "Artifact Created",
    title: "Research Dashboard Prototype",
    summary:
      "Generated an interactive React prototype for a research insight dashboard, including a main workspace layout and SVG flow diagram.",
    project: "UX Research",
    tags: ["UX", "Dashboard", "Prototype"],
    artifacts: ["React component", "SVG flow"],
    status: "new",
  },
  {
    id: "evt_002",
    time: "Today · 9:18 AM",
    platform: "ChatGPT",
    type: "Conversation",
    title: "AI Activity Hub Planning",
    summary:
      "Discussed Timeline, Inbox, Artifacts, Chats, data model, MVP build order and local-first architecture.",
    project: "Personal AI Dashboard",
    tags: ["Planning", "Product", "Architecture"],
    artifacts: ["PRD notes"],
    status: "reviewed",
  },
  {
    id: "evt_003",
    time: "Yesterday · 6:04 PM",
    platform: "ChatGPT",
    type: "Import Completed",
    title: "ChatGPT Export Imported",
    summary:
      "Imported 428 conversations, 2,941 messages, 36 possible artifacts, 112 links and 87 inbox items.",
    tags: ["Import", "Raw history", "Inbox"],
    status: "new",
  },
];

export default function TimelinePage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Timeline / Activity events</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">01 / Timeline</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">1</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Chronological stream of meaningful AI work.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                The Timeline is powered by normalized activity_events. It shows chats, imports,
                artifacts, decisions and tasks as a unified work stream instead of scattered chat history.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16">
            <TimelineFilters />
          </div>

          <div className="mt-6 grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="border-l border-line-strong pl-8">
              <div className="grid gap-6">
                {events.map((event) => (
                  <ActivityEventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            <aside className="grid gap-3 self-start">
              <div className="editorial-card">
                <span className="editorial-tag">Today</span>
                <div className="mt-6 font-serif text-6xl leading-none">6</div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
                  New events
                </p>
              </div>

              <div className="editorial-card">
                <span className="editorial-tag">Inbox</span>
                <div className="mt-6 font-serif text-6xl leading-none">14</div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
                  Need review
                </p>
                <Button variant="primary" fullWidth className="mt-6">
                  Review Inbox
                </Button>
              </div>

              <TimelineLoadingState />
              <TimelineEmptyState />
              <TimelineErrorState />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
