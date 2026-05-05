import { AskAiPanel } from "@/components/search/ask-ai-panel";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchResultCard, type SearchResult } from "@/components/search/search-result-card";
import { SearchEmptyState, SearchErrorState, SearchLoadingState } from "@/components/search/search-states";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";

const results: SearchResult[] = [
  {
    id: "res_001",
    type: "Chat",
    title: "AI Activity Hub Planning",
    source: "ChatGPT",
    summary:
      "Product planning conversation covering Timeline, Inbox, Artifacts, Chats, Projects, import-first architecture and MVP order.",
    project: "Personal AI Dashboard",
    date: "Today",
    confidence: 0.94,
  },
  {
    id: "res_002",
    type: "Artifact",
    title: "AI Activity Product Plan",
    source: "ChatGPT",
    summary:
      "Structured product plan for a dashboard consolidating AI conversations, artifacts, tasks and activity across platforms.",
    project: "Personal AI Dashboard",
    date: "Yesterday",
    confidence: 0.91,
  },
  {
    id: "res_003",
    type: "Decision",
    title: "Use import-first architecture",
    source: "Extracted decision",
    summary:
      "Prioritize official exports and manual capture before fragile browser extensions or live integrations.",
    project: "Personal AI Dashboard",
    date: "This week",
    confidence: 0.88,
  },
  {
    id: "res_004",
    type: "Task",
    title: "Design Inbox triage flow",
    source: "Extracted task",
    summary:
      "Create the daily review workflow for accepting projects, extracting tasks, saving artifacts and archiving noise.",
    project: "Personal AI Dashboard",
    date: "This week",
    confidence: 0.84,
  },
];

export default function SearchPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Search / Ask</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">06 / Search</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">6</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Find the thing your AI history forgot.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                Universal search spans chats, artifacts, decisions, tasks, projects and timeline events,
                returning source-linked results instead of disconnected chat snippets.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16 grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-3">
              <AskAiPanel />
              <SearchFilters />

              <div className="grid gap-3">
                {results.map((result) => (
                  <SearchResultCard key={result.id} result={result} />
                ))}
              </div>
            </div>

            <aside className="grid gap-3 self-start">
              <SearchLoadingState />
              <SearchEmptyState />
              <SearchErrorState />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
