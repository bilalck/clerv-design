import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function InboxLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Loading inbox items">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-5 w-1/2 animate-pulse bg-paper-100" />
        <div className="h-24 animate-pulse bg-paper-100" />
        <div className="h-3 w-3/4 animate-pulse bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function InboxEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>Empty</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">Inbox is clear.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          All imported AI work has been reviewed, archived, assigned, or converted into tasks.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Browse timeline</Button>
          <Button variant="ghost">Import more</Button>
        </div>
      </div>
    </Card>
  );
}

export function InboxErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Inbox failed to sync.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        Retry loading the inbox or inspect the triage/enrichment worker logs.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry</Button>
        <Button variant="ghost">Open logs</Button>
      </div>
    </Card>
  );
}
