import { CommandPalette } from "@/components/ui/command-palette";
import { Card, Tag } from "@/components/ui/card";
import { Sidebar } from "@/components/ui/sidebar";

const capabilities = [
  ["Navigation", "Open Home, Timeline, Inbox, Artifacts, Projects and Search."],
  ["Actions", "Create project, upload artifact, import export ZIP and extract tasks."],
  ["Search", "Find chats, artifacts, decisions, tasks and source-linked records."],
  ["AI", "Ask about workspace and summarize project context."],
];

export default function CommandPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Command Layer / Cmd+K OS</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">07 / Command Layer</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">7</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Think, type, act.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                The command layer turns AI Activity Hub into an operating surface. Users can
                navigate, search, create, import, extract and ask without breaking flow.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16">
            <Card>
              <Tag>Try it</Tag>
              <h2 className="mt-5 font-serif text-4xl uppercase">Open command palette</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--grey-700)]">
                Press Cmd+K or Ctrl+K, then use Arrow Up/Down and Enter. Escape closes the palette and focus returns.
              </p>
              <div className="mt-8 max-w-2xl">
                <CommandPalette />
              </div>
            </Card>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map(([title, body]) => (
              <Card key={title}>
                <Tag>{title}</Tag>
                <p className="mt-5 text-sm leading-6 text-[var(--grey-700)]">{body}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
