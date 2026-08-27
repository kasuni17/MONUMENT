import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Tag } from "@/types";
import { AdminCard, AdminPageHeader, AdminButton, AdminInput, Modal, ConfirmDialog } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";

export default function AdminTags() {
  const { data } = useQuery({ queryKey: ["tags"], queryFn: () => api.get<Tag[]>("/tags") });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Tag | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Tag | null>(null);
  const [name, setName] = useState("");

  const saveMutation = useMutation({
    mutationFn: () => (editing ? api.put(`/tags/${editing.id}`, { name }) : api.post("/tags", { name })),
    onSuccess: () => {
      toast(editing ? "Tag updated" : "Tag created");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/tags/${id}`),
    onSuccess: () => {
      toast("Tag deleted");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Tags"
        description="Fine-grained labels for cross-topic discovery."
        action={<AdminButton onClick={() => { setEditing(null); setName(""); setModalOpen(true); }}><Plus size={15} /> New Tag</AdminButton>}
      />

      <div className="flex flex-wrap gap-3">
        {data?.map((t) => (
          <AdminCard key={t.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="text-sm font-medium">{t.name}</span>
            <span className="text-xs text-[#8B8B90]">{t._count?.articles ?? 0}</span>
            <button onClick={() => { setEditing(t); setName(t.name); setModalOpen(true); }} className="p-1 hover:text-[#AE4B2D]"><Pencil size={13} /></button>
            <button onClick={() => setDeleteTarget(t)} className="p-1 hover:text-red-600"><Trash2 size={13} /></button>
          </AdminCard>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Tag" : "New Tag"}>
        <div className="space-y-4">
          <AdminInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="flex justify-end gap-3 pt-2">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => saveMutation.mutate()} disabled={!name.trim()}>Save</AdminButton>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Tag"
        description={`Delete "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
