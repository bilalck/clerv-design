import { InboxCard, type InboxItem } from "@/components/inbox/inbox-card";
import { InboxSidePanel } from "@/components/inbox/inbox-side-panel";
import { InboxTabs } from "@/components/inbox/inbox-tabs";
import { InboxEmptyState, InboxErrorState, InboxLoadingState } from "@/components/inbox/inbox-states";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const inboxItems: InboxItem[] = [
  {
    id: "inb_001",
    platform: "ChatGPT",
    type: "Planning",
    title: "AI Activity Dashboard Method",
    summary:
      "Explored Timeline, Inbox, Artifacts and Chats as the core structure for a unified AI activity dashboard.",
    suggestedProject: "Personal AI Dashboard",
    detected: {
      decisions: 2,
      tasks: 3,
      artifacts: 1,
    },
    status: "needs-review",
  },
  {
    id: "inb_002",
    platform: "Claude",
    type: "Artifact",
    title: "Research Dashboard Prototype",
    summary:
      "Likely belongs to the UX Research workspace. Contains a React component, SVG flow diagram and prototype layout.",
    suggestedProject: "UX Research",
    detected: {
      decisions: 1,
      tasks: 2,
      artifacts: 2,
    },
    status: "new",
  },
  {
    id: "inb_003",
    platform: "Manual Upload",
    type: "Sensitive",
    title: "Dashboard IA Sketch",
    summary:
      "Manual upload with possible private project notes. Mark sensitivity before allowing AI enrichment or external sync.",
    suggestedProject: "Personal AI Dashboard",
    detected: {
      decisions: 0,
      tasks: 1,
      artifacts: 1,
    },
    status: "sensitive",
  },
];

export default function InboxPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Inbox / Triage queue</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">02 / Inbox</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">2</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Turn AI history into reviewed work.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                The Inbox is the daily habit loop. It collects unprocessed chats, generated
                artifacts, detected tasks, decisions, sensitive items and unassigned outputs.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <InboxTabs />
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Process next</Button>
              <Button variant="ghost">Archive selected</Button>
              <Button variant="ghost">Mark sensitive</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-3">
              {inboxItems.map((item) => (
                <InboxCard key={item.id} item={item} />
              ))}

              <InboxLoadingState />
              <InboxEmptyState />
              <InboxErrorState />
            </div>

            <InboxSidePanel />
          </div>
        </section>
      </main>
    </div>
  );
}
