import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

const filterGroups = [
  ["Platform", ["All", "ChatGPT", "Claude", "Gemini", "Manual"]],
  ["Type", ["Conversation", "Artifact", "Import", "Task", "Decision"]],
  ["Status", ["Inbox", "Reviewed", "Archived", "Shipped"]],
];

export function TimelineFilters() {
  return (
    <Card>
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <Tag>Filters</Tag>
          <h2 className="mt-5 font-serif text-3xl uppercase">Timeline controls</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
            Filter by source, activity type, project, review status, date range and privacy level.
          </p>
        </div>
        <Button variant="ghost">Reset filters</Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {filterGroups.map(([label, filters]) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(filters as string[]).map((filter, index) => (
                <Button key={filter} variant={index === 0 ? "primary" : "ghost"} size="sm">
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
