import { ChatEmptyState, ChatErrorState, ChatLoadingState } from "@/components/chat/chat-states";
import { ChatSummaryPanel } from "@/components/chat/chat-summary-panel";
import { ExtractedItems } from "@/components/chat/extracted-items";
import { RelatedWork } from "@/components/chat/related-work";
import { Transcript } from "@/components/chat/transcript";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";

export default function ChatDetailPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Chats / Source archive</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">04 / Chat Detail</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">4</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Source history, transformed into usable knowledge.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                Chat Detail preserves the full source transcript while surfacing summaries,
                decisions, tasks, artifacts, links, tags, project context and related work.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16">
            <Card>
              <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Tag>ChatGPT</Tag>
                    <Tag>Planning</Tag>
                    <Tag>Personal AI Dashboard</Tag>
                  </div>
                  <h2 className="mt-5 font-serif text-4xl uppercase leading-tight">
                    AI Activity Hub Planning
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--grey-700)]">
                    Original title, platform, date, project, model metadata, tags and imported source reference.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Open source</Button>
                  <Button variant="ghost">Add tags</Button>
                  <Button variant="ghost">Archive</Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="grid gap-3">
              <ChatSummaryPanel />
              <ExtractedItems />
              <Transcript />
            </div>

            <aside className="grid gap-3 self-start">
              <RelatedWork />
              <ChatLoadingState />
              <ChatEmptyState />
              <ChatErrorState />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
