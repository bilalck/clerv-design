import type { Artifact } from "@/components/artifacts/artifact-card";

export function ArtifactTable({ artifacts }: { artifacts: Artifact[] }) {
  return (
    <div className="overflow-auto border border-line-hair bg-paper-0">
      <table className="w-full min-w-[860px] border-collapse text-[13px]">
        <thead>
          <tr>
            {["Title", "Type", "Platform", "Project", "Status", "Updated"].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="border-b border-line-hair bg-paper-50 px-3 py-3 text-left text-[10px] font-normal uppercase tracking-[0.15em] text-[var(--grey-500)]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {artifacts.map((artifact, index) => (
            <tr
              key={artifact.id}
              aria-selected={index === 0}
              className={index === 0 ? "bg-paper-100" : "transition duration-150 hover:bg-paper-50"}
            >
              <td className="border-b border-line-hair px-3 py-3">{artifact.title}</td>
              <td className="border-b border-line-hair px-3 py-3">{artifact.type}</td>
              <td className="border-b border-line-hair px-3 py-3">{artifact.platform}</td>
              <td className="border-b border-line-hair px-3 py-3">{artifact.project}</td>
              <td className="border-b border-line-hair px-3 py-3">{artifact.status}</td>
              <td className="border-b border-line-hair px-3 py-3">{artifact.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
