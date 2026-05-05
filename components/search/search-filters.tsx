"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, Tag } from "@/components/ui/card";

const groups = [
  ["Type", ["All", "Chats", "Artifacts", "Tasks", "Decisions", "Projects"]],
  ["Platform", ["All", "ChatGPT", "Claude", "Gemini", "Manual"]],
  ["Date", ["Anytime", "Today", "This week", "This month"]],
];

export function SearchFilters() {
  const [active, setActive] = React.useState<Record<string, string>>({
    Type: "All",
    Platform: "All",
    Date: "Anytime",
  });

  return (
    <Card>
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start">
        <div>
          <Tag>Search filters</Tag>
          <h2 className="mt-5 font-serif text-3xl uppercase">Narrow the knowledge graph</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--grey-700)]">
            Search across chats, artifacts, decisions, tasks, projects and timeline events while preserving source context.
          </p>
        </div>
        <Button variant="ghost" onClick={() => setActive({ Type: "All", Platform: "All", Date: "Anytime" })}>
          Reset
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {groups.map(([label, values]) => (
          <div key={label}>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(values as string[]).map((value) => (
                <Button
                  key={value}
                  variant={active[label as string] === value ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActive((prev) => ({ ...prev, [label as string]: value }))}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
