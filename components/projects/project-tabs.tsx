"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const tabs = ["Overview", "Timeline", "Artifacts", "Chats", "Tasks", "Decisions"];

export function ProjectTabs() {
  const [active, setActive] = React.useState("Overview");

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project sections">
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
