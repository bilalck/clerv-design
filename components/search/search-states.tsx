import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function SearchLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Searching">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-5 w-2/3 animate-pulse bg-paper-100" />
        <div className="h-20 animate-pulse bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function SearchEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>No results</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">Nothing matched.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          Try a broader query, remove filters, or search by project, platform, artifact type, or decision.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Clear filters</Button>
          <Button variant="ghost">Search all</Button>
        </div>
      </div>
    </Card>
  );
}

export function SearchErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Search index unavailable.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        Retry the query or rebuild the local full-text/vector index.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry</Button>
        <Button variant="ghost">Rebuild index</Button>
      </div>
    </Card>
  );
}
