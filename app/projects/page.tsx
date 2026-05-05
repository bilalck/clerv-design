import { ProjectCard } from "@/components/projects/project-card";
import { ProjectEmptyState, ProjectErrorState, ProjectLoadingState } from "@/components/projects/project-states";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/ui/command-palette";
import { Sidebar } from "@/components/ui/sidebar";
import { projects } from "@/lib/projects-data";

export default function ProjectsPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[304px_minmax(0,1fr)]">
      <Sidebar />

      <main className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line-hair bg-paper-0/90 px-6 py-3 backdrop-blur md:px-10">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="editorial-kicker">Projects / Work containers</p>
            <CommandPalette />
          </div>
        </header>

        <section className="border-b border-line-hair bg-paper-0 px-6 py-20 md:px-10 lg:px-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px]">
            <div>
              <p className="editorial-kicker">05 / Projects</p>
              <div className="my-8 font-serif text-7xl leading-none md:text-8xl">5</div>
              <h1 className="editorial-title max-w-5xl text-6xl md:text-8xl">
                Organize AI work around outcomes.
              </h1>
              <p className="mt-8 max-w-2xl text-[15px] leading-[1.72] text-[var(--grey-700)]">
                Projects group timeline events, inbox items, artifacts, chats, tasks and decisions
                into durable work containers.
              </p>
            </div>
            <div className="hidden w-px bg-line-strong lg:block" />
          </div>

          <div className="mt-16 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">All projects</Button>
              <Button variant="ghost">Active</Button>
              <Button variant="ghost">Review</Button>
              <Button variant="ghost">Archived</Button>
            </div>
            <Button variant="primary">Create project</Button>
          </div>

          <div className="mt-6 grid gap-3 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-3">
            <ProjectLoadingState />
            <ProjectEmptyState />
            <ProjectErrorState />
          </div>
        </section>
      </main>
    </div>
  );
}
