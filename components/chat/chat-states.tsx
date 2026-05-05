import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function ChatLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Loading chat detail">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-5 w-1/2 animate-pulse bg-paper-100" />
        <div className="h-20 animate-pulse bg-paper-100" />
        <div className="h-3 w-3/4 animate-pulse bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function ChatEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>Empty</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">No transcript available.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          The conversation record exists, but the transcript was not imported or is unavailable.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Re-import source</Button>
          <Button variant="ghost">Open raw import</Button>
        </div>
      </div>
    </Card>
  );
}

export function ChatErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Chat failed to load.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        Retry loading the source transcript or inspect the raw import record.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry</Button>
        <Button variant="ghost">Open import logs</Button>
      </div>
    </Card>
  );
}
