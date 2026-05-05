import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";
import type { Artifact } from "@/components/artifacts/artifact-card";

export function ArtifactDetailPanel({ artifact }: { artifact: Artifact }) {
  return (
    <Card>
      <Tag>Artifact detail</Tag>
      <h2 className="mt-5 font-serif text-3xl uppercase leading-tight">{artifact.title}</h2>
      <p className="mt-4 text-sm leading-6 text-[var(--grey-700)]">
        A reusable AI output linked to its source conversation, timeline event, project, versions, and downstream usage.
      </p>

      <div className="mt-6 overflow-auto border border-line-hair">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <tbody>
            {[
              ["Type", artifact.type],
              ["Source", artifact.source],
              ["Platform", artifact.platform],
              ["Project", artifact.project],
              ["Version", artifact.version],
              ["Status", artifact.status],
              ["Updated", artifact.updated],
            ].map(([label, value]) => (
              <tr key={label}>
                <td className="border-b border-line-hair bg-paper-50 px-3 py-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
                  {label}
                </td>
                <td className="border-b border-line-hair px-3 py-3">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <MiniPanel title="Source" body="Jump back to originating chat." />
        <MiniPanel title="Versions" body="Compare v1, v2, v3." />
        <MiniPanel title="Usage" body="See where this output was reused." />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant="primary">Open artifact</Button>
        <Button variant="ghost">Rename</Button>
        <Button variant="ghost">Add tags</Button>
        <Button variant="ghost">Archive</Button>
      </div>
    </Card>
  );
}

function MiniPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-line-hair bg-paper-50 p-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--grey-700)]">{body}</p>
    </div>
  );
}
