import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

const shortcuts = [
  ["A", "Accept project"],
  ["T", "Extract tasks"],
  ["S", "Save artifact"],
  ["E", "Edit metadata"],
  ["R", "Mark reviewed"],
];

export function InboxSidePanel() {
  return (
    <aside className="grid gap-3 self-start">
      <Card>
        <Tag>Triage queue</Tag>
        <div className="mt-6 font-serif text-6xl leading-none">14</div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">
          Items need review
        </p>
        <Button variant="primary" fullWidth className="mt-6">
          Process next
        </Button>
      </Card>

      <Card>
        <Tag>Keyboard</Tag>
        <div className="mt-5 divide-y divide-line-hair border-t border-line-hair">
          {shortcuts.map(([key, label]) => (
            <div key={key} className="grid grid-cols-[32px_1fr] items-center gap-3 py-3">
              <span className="grid h-8 w-8 place-items-center border border-line-medium text-xs">{key}</span>
              <p className="text-sm text-[var(--grey-700)]">{label}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Tag>Inbox rule</Tag>
        <p className="mt-5 text-sm leading-6 text-[var(--grey-700)]">
          An item enters Inbox when it has no project, includes detected actions, contains a decision,
          creates an artifact, or may be sensitive.
        </p>
      </Card>
    </aside>
  );
}
