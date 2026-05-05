import { notFound } from "next/navigation";
import { ProjectOverview } from "@/components/projects/project-overview";
import { ProjectTabs } from "@/components/projects/project-tabs";
import {
  ProjectActivityList,
  ProjectArtifactsList,
  ProjectChatsList,
  ProjectDecisionsList,
  ProjectNotesPanel,
  ProjectTasksList,
} from "@/components/projects/project-lists";
import { Button } from "@/components/ui/button";
import { ProjectSidebar } from "@/components/projects/project-sidebar";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";
import { projects } from "@/lib/projects-data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Project / {project.name}</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">05 / Project Detail</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">5</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                {project.name}
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                A project-level operating surface for the AI work lifecycle: timeline,
                chats, artifacts, tasks, decisions and source context.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <ProjectTabs />
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Add item</Button>
              <Button variant="ghost">Export project</Button>
              <Button variant="ghost">Archive</Button>
            </div>
          </div>

          <div className="mt-6">
            <ProjectOverview project={project} />
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid gap-3">
              <ProjectActivityList />
              <ProjectArtifactsList />
              <ProjectChatsList />
            </div>

            <aside className="grid gap-3 self-start">
              <ProjectSidebar project={project} />
              <ProjectTasksList />
              <ProjectDecisionsList />
              <ProjectNotesPanel />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
