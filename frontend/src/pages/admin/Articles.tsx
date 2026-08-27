import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { PaginatedResult, Story } from "@/types";
import { AdminCard, AdminPageHeader, AdminButton, AdminSelect, ConfirmDialog } from "@/components/admin/AdminUI";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/contexts/ToastContext";

export default function AdminArticles() {
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Story | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const params = new URLSearchParams({ page: String(page), pageSize: "15" });
  if (status) params.set("status", status);
  if (q) params.set("q", q);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-articles", params.toString()],
    queryFn: () => api.get<PaginatedResult<Story>>(`/articles?${params.toString()}`),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/articles/${id}`),
    onSuccess: () => {
      toast("Article deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Articles"
        description="Manage every story across draft, published, scheduled, and archived states."
        action={
          <Link to="/admin/articles/new">
            <AdminButton>
              <Plus size={15} /> Create Article
            </AdminButton>
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[220px] max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B90]" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles…"
            className="w-full border border-[#D8D8D4] rounded-sm pl-8 pr-3 py-2 text-sm outline-none focus:border-[#16161A] bg-white"
          />
        </div>
        <AdminSelect value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="max-w-[180px]">
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="SCHEDULED">Scheduled</option>
          <option value="ARCHIVED">Archived</option>
        </AdminSelect>
      </div>

      <AdminCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E4E4E1] text-left text-xs uppercase tracking-wide text-[#8B8B90]">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Author</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Views</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-[#8B8B90]">Loading…</td>
                </tr>
              )}
              {!isLoading && data?.items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-[#8B8B90]">No articles found.</td>
                </tr>
              )}
              {data?.items.map((a) => (
                <tr key={a.id} className="border-b border-[#EFEFEC] hover:bg-[#FAFAF8]">
                  <td className="px-5 py-3 max-w-xs">
                    <p className="font-medium truncate">{a.title}</p>
                  </td>
                  <td className="px-5 py-3 text-[#6B6B70]">{a.category.name}</td>
                  <td className="px-5 py-3 text-[#6B6B70]">{a.author.name}</td>
                  <td className="px-5 py-3"><StatusBadge status={a.status || "DRAFT"} /></td>
                  <td className="px-5 py-3 text-[#6B6B70] tabular-nums">{a.views.toLocaleString()}</td>
                  <td className="px-5 py-3 text-[#6B6B70]">{formatDate(a.publishedAt || a.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {a.status === "PUBLISHED" && (
                        <a href={`/stories/${a.slug}`} target="_blank" rel="noreferrer" className="p-1.5 hover:text-[#AE4B2D]" aria-label="Preview">
                          <Eye size={15} />
                        </a>
                      )}
                      <Link to={`/admin/articles/${a.id}/edit`} className="p-1.5 hover:text-[#AE4B2D]" aria-label="Edit">
                        <Pencil size={15} />
                      </Link>
                      <button onClick={() => setDeleteTarget(a)} className="p-1.5 hover:text-red-600" aria-label="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {data && <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Article"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
      />
    </div>
  );
}
