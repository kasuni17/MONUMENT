import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminCard, AdminPageHeader, AdminSelect } from "@/components/admin/AdminUI";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/contexts/ToastContext";

interface AdminUserRow {
  id: string; name: string; email: string; role: string; createdAt: string;
  _count: { bookmarks: number; comments: number };
}

export default function AdminUsers() {
  const { data } = useQuery({ queryKey: ["admin-users"], queryFn: () => api.get<AdminUserRow[]>("/users") });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => api.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      toast("Role updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  return (
    <div>
      <AdminPageHeader title="Users" description="View registered readers and manage editorial permissions." />

      <AdminCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4E4E1] text-left text-xs uppercase tracking-wide text-[#8B8B90]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Bookmarks</th>
              <th className="px-5 py-3 font-medium">Comments</th>
              <th className="px-5 py-3 font-medium text-right">Change Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u) => (
              <tr key={u.id} className="border-b border-[#EFEFEC] hover:bg-[#FAFAF8]">
                <td className="px-5 py-3 font-medium">{u.name}</td>
                <td className="px-5 py-3 text-[#6B6B70]">{u.email}</td>
                <td className="px-5 py-3"><StatusBadge status={u.role} /></td>
                <td className="px-5 py-3 text-[#6B6B70]">{formatDate(u.createdAt)}</td>
                <td className="px-5 py-3 text-[#6B6B70]">{u._count.bookmarks}</td>
                <td className="px-5 py-3 text-[#6B6B70]">{u._count.comments}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end">
                    <AdminSelect
                      value={u.role}
                      onChange={(e) => roleMutation.mutate({ id: u.id, role: e.target.value })}
                      className="max-w-[130px]"
                    >
                      <option value="READER">Reader</option>
                      <option value="EDITOR">Editor</option>
                      <option value="ADMIN">Admin</option>
                    </AdminSelect>
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
