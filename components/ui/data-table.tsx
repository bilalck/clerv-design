import * as React from "react";
import { cn } from "@/lib/utils";

export type ActivityRow = {
  title: string;
  platform: string;
  status: string;
  project: string;
};

export function DataTable({ rows }: { rows: ActivityRow[] }) {
  return (
    <div className="overflow-auto border border-line-hair bg-paper-0">
      <table className="w-full min-w-[720px] border-collapse text-[13px]">
        <thead>
          <tr>
            {["Title", "Platform", "Status", "Project"].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="sticky top-0 border-b border-line-hair bg-paper-50 px-3 py-3 text-left text-[10px] font-normal uppercase tracking-[0.15em] text-[var(--grey-500)]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.title}
              aria-selected={index === 0}
              className={cn(
                "transition duration-150 hover:bg-paper-50",
                index === 0 && "bg-paper-100"
              )}
            >
              <td className="border-b border-line-hair px-3 py-3">{row.title}</td>
              <td className="border-b border-line-hair px-3 py-3">{row.platform}</td>
              <td className="border-b border-line-hair px-3 py-3">{row.status}</td>
              <td className="border-b border-line-hair px-3 py-3">{row.project}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
