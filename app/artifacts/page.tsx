import { ArtifactCard, type Artifact } from "@/components/artifacts/artifact-card";
import { ArtifactDetailPanel } from "@/components/artifacts/artifact-detail-panel";
import { ArtifactEmptyState, ArtifactErrorState, ArtifactLoadingState } from "@/components/artifacts/artifact-states";
import { ArtifactTable } from "@/components/artifacts/artifact-table";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";

const artifacts: Artifact[] = [
  {
    id: "art_001",
    title: "Research Dashboard Prototype",
    type: "Prototype",
    platform: "Claude",
    source: "Claude chat · Research dashboard concept",
    project: "UX Research",
    status: "Inbox",
    version: "v3",
    updated: "Today",
  },
  {
    id: "art_002",
    title: "AI Activity Product Plan",
    type: "Document",
    platform: "ChatGPT",
    source: "ChatGPT chat · AI Activity Hub Planning",
    project: "Personal AI Dashboard",
    status: "Draft",
    version: "v1",
    updated: "Yesterday",
  },
  {
    id: "art_003",
    title: "Inbox Triage Flow",
    type: "Diagram",
    platform: "Manual Upload",
    source: "Manual file upload",
    project: "Personal AI Dashboard",
    status: "Reviewed",
    version: "v2",
    updated: "This week",
  },
  {
    id: "art_004",
    title: "Parser Utility",
    type: "Code",
    platform: "ChatGPT",
    source: "ChatGPT chat · Export parser",
    project: "Data Import",
    status: "Used",
    version: "v1",
    updated: "This week",
  },
];

export default function ArtifactsPage() {
  const selected = artifacts[0];

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Artifacts / Output library</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">03 / Artifacts</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">3</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                The output lifecycle of AI work.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                Artifacts are first-class outputs: documents, code, canvases, images, diagrams,
                prototypes and files linked back to source conversations and projects.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Grid</Button>
              <Button variant="ghost">Table</Button>
              <Button variant="ghost">By project</Button>
              <Button variant="ghost">By type</Button>
              <Button variant="ghost">Recently created</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Upload artifact</Button>
              <Button variant="ghost">Import from Inbox</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {artifacts.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-3">
              <ArtifactDetailPanel artifact={selected} />
              <ArtifactTable artifacts={artifacts} />
            </div>

            <aside className="grid gap-3 self-start">
              <ArtifactLoadingState />
              <ArtifactEmptyState />
              <ArtifactErrorState />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
