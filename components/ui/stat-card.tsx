import { Card, Tag } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  tag,
}: {
  label: string;
  value: string;
  tag: string;
}) {
  return (
    <Card>
      <Tag>{tag}</Tag>
      <div className="mt-6 font-serif text-6xl leading-none">{value}</div>
      <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-[var(--grey-500)]">{label}</p>
    </Card>
  );
}
