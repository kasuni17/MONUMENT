const STYLES: Record<string, string> = {
  PUBLISHED: "bg-emerald-100 text-emerald-800",
  DRAFT: "bg-amber-100 text-amber-800",
  SCHEDULED: "bg-blue-100 text-blue-800",
  ARCHIVED: "bg-gray-200 text-gray-700",
  PENDING: "bg-amber-100 text-amber-800",
  APPROVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-100 text-red-700",
  ADMIN: "bg-[#16161A] text-white",
  EDITOR: "bg-[#4A443C] text-white",
  READER: "bg-gray-200 text-gray-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wide ${STYLES[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}
