import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function ProjectLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Loading projects">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-6 w-2/3 animate-pulse bg-paper-100" />
        <div className="h-20 animate-pulse bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function ProjectEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>Empty</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">No projects yet.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          Create your first project to group chats, artifacts, timeline events, tasks, and decisions.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Create project</Button>
          <Button variant="ghost">Assign inbox items</Button>
        </div>
      </div>
    </Card>
  );
}

export function ProjectErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Projects failed to load.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        Retry loading project records or inspect the project index.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry</Button>
        <Button variant="ghost">Open logs</Button>
      </div>
    </Card>
  );
}
