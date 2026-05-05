"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const tabs = ["All", "Tasks", "Decisions", "Artifacts", "Sensitive", "Unassigned"];

export function InboxTabs() {
  const [active, setActive] = React.useState("All");

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Inbox filters">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={active === tab ? "primary" : "ghost"}
          size="sm"
          role="tab"
          aria-selected={active === tab}
          onClick={() => setActive(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
