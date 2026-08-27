import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { CommentItem } from "@/types";
import { AdminCard, AdminPageHeader, AdminSelect } from "@/components/admin/AdminUI";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/contexts/ToastContext";

export default function AdminComments() {
  const [status, setStatus] = useState("");
  const { data } = useQuery({
    queryKey: ["admin-comments", status],
    queryFn: () => api.get<CommentItem[]>(`/comments/admin${status ? `?status=${status}` : ""}`),
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => api.patch(`/comments/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/comments/${id}`),
    onSuccess: () => {
      toast("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
    },
  });

  return (
    <div>
      <AdminPageHeader title="Comments" description="Moderate reader discussion across all stories." />

      <div className="mb-5">
        <AdminSelect value={status} onChange={(e) => setStatus(e.target.value)} className="max-w-[200px]">
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </AdminSelect>
      </div>

      <AdminCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4E4E1] text-left text-xs uppercase tracking-wide text-[#8B8B90]">
              <th className="px-5 py-3 font-medium">Comment</th>
              <th className="px-5 py-3 font-medium">Author</th>
              <th className="px-5 py-3 font-medium">Story</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-[#8B8B90]">No comments found.</td></tr>
            )}
            {data?.map((c) => (
              <tr key={c.id} className="border-b border-[#EFEFEC] hover:bg-[#FAFAF8]">
                <td className="px-5 py-3 max-w-xs truncate">{c.body}</td>
                <td className="px-5 py-3 text-[#6B6B70]">{c.user.name}</td>
                <td className="px-5 py-3 text-[#6B6B70] max-w-[160px] truncate">{c.article?.title}</td>
                <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-5 py-3 text-[#6B6B70]">{formatDate(c.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    {c.status !== "APPROVED" && (
                      <button onClick={() => statusMutation.mutate({ id: c.id, status: "APPROVED" })} className="p-1.5 hover:text-emerald-600" aria-label="Approve">
                        <Check size={15} />
                      </button>
                    )}
                    {c.status !== "REJECTED" && (
                      <button onClick={() => statusMutation.mutate({ id: c.id, status: "REJECTED" })} className="p-1.5 hover:text-red-600" aria-label="Reject">
                        <X size={15} />
                      </button>
                    )}
                    <button onClick={() => deleteMutation.mutate(c.id)} className="p-1.5 hover:text-red-600" aria-label="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
