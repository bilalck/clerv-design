import type { LucideIcon } from "lucide-react";

export type CommandCategory = "Navigation" | "Actions" | "Search" | "AI";

export type CommandAction = {
  id: string;
  title: string;
  description: string;
  category: CommandCategory;
  shortcut?: string;
  href?: string;
  icon?: LucideIcon;
  execute?: () => void;
  keywords: string[];
  previewTitle: string;
  previewBody: string;
};
