import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Author } from "@/types";
import { AdminCard, AdminPageHeader, AdminButton, AdminInput, AdminTextarea, Modal, ConfirmDialog } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";

export default function AdminAuthors() {
  const { data } = useQuery({ queryKey: ["authors"], queryFn: () => api.get<Author[]>("/authors") });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Author | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Author | null>(null);
  const [form, setForm] = useState({ name: "", bio: "", avatar: "" });

  function openCreate() {
    setEditing(null);
    setForm({ name: "", bio: "", avatar: "" });
    setModalOpen(true);
  }
  function openEdit(a: Author) {
    setEditing(a);
    setForm({ name: a.name, bio: a.bio || "", avatar: a.avatar || "" });
    setModalOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => (editing ? api.put(`/authors/${editing.id}`, form) : api.post("/authors", form)),
    onSuccess: () => {
      toast(editing ? "Author updated" : "Author created");
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/authors/${id}`),
    onSuccess: () => {
      toast("Author deleted");
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Authors"
        description="Manage editorial bylines associated with stories."
        action={<AdminButton onClick={openCreate}><Plus size={15} /> New Author</AdminButton>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((a) => (
          <AdminCard key={a.id} className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-[#EFEFEC] overflow-hidden shrink-0">
                {a.avatar && <img src={a.avatar} alt={a.name} className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{a.name}</p>
                <p className="text-xs text-[#8B8B90]">{a._count?.articles ?? 0} articles</p>
              </div>
            </div>
            <p className="text-xs text-[#6B6B70] line-clamp-2 mb-3">{a.bio}</p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(a)} className="p-1.5 hover:text-[#AE4B2D]"><Pencil size={14} /></button>
              <button onClick={() => setDeleteTarget(a)} className="p-1.5 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </AdminCard>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Author" : "New Author"}>
        <div className="space-y-4">
          <AdminInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <AdminTextarea label="Bio" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <AdminInput label="Avatar URL" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          <div className="flex justify-end gap-3 pt-2">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => saveMutation.mutate()} disabled={!form.name.trim()}>Save</AdminButton>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Author"
        description={`Delete "${deleteTarget?.name}"? Their articles will remain but lose this byline.`}
      />
    </div>
  );
}
