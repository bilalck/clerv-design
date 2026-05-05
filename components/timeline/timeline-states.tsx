import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function TimelineLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Loading timeline events">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-4 w-1/3 animate-pulse bg-paper-100" />
        <div className="h-8 w-2/3 animate-pulse bg-paper-100" />
        <div className="h-20 animate-pulse bg-paper-100" />
        <div className="h-3 w-3/4 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function TimelineEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>Empty</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">No timeline events yet.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          Import your first AI export or manually upload an artifact to generate activity events.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Import ChatGPT export</Button>
          <Button variant="ghost">Upload artifact</Button>
        </div>
      </div>
    </Card>
  );
}

export function TimelineErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Timeline failed to load.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        Retry loading the timeline or open diagnostics to inspect the import/enrichment worker.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry</Button>
        <Button variant="ghost">Open diagnostics</Button>
      </div>
    </Card>
  );
}
