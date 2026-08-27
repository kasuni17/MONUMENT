import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Category } from "@/types";
import { AdminCard, AdminPageHeader, AdminButton, AdminInput, AdminTextarea, Modal, ConfirmDialog } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";

export default function AdminCategories() {
  const { data } = useQuery({ queryKey: ["categories"], queryFn: () => api.get<Category[]>("/categories") });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "", coverImage: "" });

  function openCreate() {
    setEditing(null);
    setForm({ name: "", description: "", coverImage: "" });
    setModalOpen(true);
  }
  function openEdit(c: Category) {
    setEditing(c);
    setForm({ name: c.name, description: c.description || "", coverImage: c.coverImage || "" });
    setModalOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => (editing ? api.put(`/categories/${editing.id}`, form) : api.post("/categories", form)),
    onSuccess: () => {
      toast(editing ? "Category updated" : "Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setModalOpen(false);
    },
    onError: () => toast("Failed to save category", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      toast("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Organize stories into topics readers can browse."
        action={<AdminButton onClick={openCreate}><Plus size={15} /> New Category</AdminButton>}
      />

      <AdminCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E4E4E1] text-left text-xs uppercase tracking-wide text-[#8B8B90]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Description</th>
              <th className="px-5 py-3 font-medium">Articles</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((c) => (
              <tr key={c.id} className="border-b border-[#EFEFEC] hover:bg-[#FAFAF8]">
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-[#6B6B70] max-w-sm truncate">{c.description}</td>
                <td className="px-5 py-3 text-[#6B6B70]">{c._count?.articles ?? 0}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => openEdit(c)} className="p-1.5 hover:text-[#AE4B2D]"><Pencil size={15} /></button>
                    <button onClick={() => setDeleteTarget(c)} className="p-1.5 hover:text-red-600"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Category" : "New Category"}>
        <div className="space-y-4">
          <AdminInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <AdminTextarea label="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <AdminInput label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => saveMutation.mutate()} disabled={!form.name.trim() || saveMutation.isPending}>Save</AdminButton>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Category"
        description={`Delete "${deleteTarget?.name}"? Articles in this category will need reassignment.`}
      />
    </div>
  );
}
