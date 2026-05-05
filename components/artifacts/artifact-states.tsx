import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

export function ArtifactLoadingState() {
  return (
    <Card aria-busy="true" aria-label="Loading artifacts">
      <Tag>Loading</Tag>
      <div className="mt-6 grid gap-3">
        <div className="h-40 animate-pulse bg-paper-100" />
        <div className="h-5 w-2/3 animate-pulse bg-paper-100" />
        <div className="h-3 w-1/2 animate-pulse bg-paper-100" />
      </div>
    </Card>
  );
}

export function ArtifactEmptyState() {
  return (
    <Card className="dot-field">
      <div className="bg-paper-0/90 p-4">
        <Tag>Empty</Tag>
        <h3 className="mt-5 font-serif text-3xl uppercase">No artifacts yet.</h3>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
          Upload a file, import an export, or save an AI-generated output from Inbox.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary">Upload artifact</Button>
          <Button variant="ghost">Import history</Button>
        </div>
      </div>
    </Card>
  );
}

export function ArtifactErrorState() {
  return (
    <Card className="border-l-[3px] border-l-[var(--accent-danger)]" role="alert">
      <Tag>Error</Tag>
      <h3 className="mt-5 font-serif text-3xl uppercase">Artifact preview failed.</h3>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
        The file exists, but preview generation failed. Retry preview or open the original file.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="danger">Retry preview</Button>
        <Button variant="ghost">Open original</Button>
      </div>
    </Card>
  );
}
