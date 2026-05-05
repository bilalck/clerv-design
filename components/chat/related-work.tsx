import { Archive, FolderKanban, GitBranch, ListTodo } from "lucide-react";
import { Card, Tag } from "@/components/ui/card";

const related = [
  ["Project", "Personal AI Dashboard", FolderKanban],
  ["Artifact", "AI Activity Product Plan", Archive],
  ["Task", "Design Inbox triage flow", ListTodo],
  ["Decision", "Use import-first architecture", GitBranch],
];

export function RelatedWork() {
  return (
    <Card>
      <Tag>Related Work</Tag>
      <h2 className="mt-5 font-serif text-3xl uppercase">Linked context</h2>
      <div className="mt-6 divide-y divide-line-hair border-t border-line-hair">
        {related.map(([type, title, Icon]) => (
          <div key={title as string} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 py-4">
            <span className="grid h-8 w-8 place-items-center border border-line-medium">
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="text-sm text-[var(--grey-700)]">{title}</p>
            <span className="editorial-tag">{type}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
