import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { Collection, PaginatedResult, Story } from "@/types";
import { AdminCard, AdminPageHeader, AdminButton, AdminInput, AdminTextarea, Modal, ConfirmDialog } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";

export default function AdminCollections() {
  const { data } = useQuery({ queryKey: ["collections"], queryFn: () => api.get<Collection[]>("/collections") });
  const { data: articlesList } = useQuery({
    queryKey: ["admin-articles-picker"],
    queryFn: () => api.get<PaginatedResult<Story>>("/articles?status=PUBLISHED&pageSize=50"),
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Collection | null>(null);
  const [form, setForm] = useState({ title: "", description: "", coverImage: "", articleIds: [] as string[] });

  function openCreate() {
    setEditing(null);
    setForm({ title: "", description: "", coverImage: "", articleIds: [] });
    setModalOpen(true);
  }
  function openEdit(c: Collection) {
    setEditing(c);
    setForm({ title: c.title, description: c.description || "", coverImage: c.coverImage || "", articleIds: (c.articles || []).map((a) => a.id) });
    setModalOpen(true);
  }

  const saveMutation = useMutation({
    mutationFn: () => (editing ? api.put(`/collections/${editing.id}`, form) : api.post("/collections", form)),
    onSuccess: () => {
      toast(editing ? "Collection updated" : "Collection created");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      setModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/collections/${id}`),
    onSuccess: () => {
      toast("Collection deleted");
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Collections"
        description="Curated groups of stories built around a theme."
        action={<AdminButton onClick={openCreate}><Plus size={15} /> New Collection</AdminButton>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((c) => (
          <AdminCard key={c.id} className="overflow-hidden">
            <div className="aspect-video bg-[#EFEFEC]">
              {c.coverImage && <img src={c.coverImage} alt={c.title} className="w-full h-full object-cover" />}
            </div>
            <div className="p-4">
              <p className="font-medium text-sm">{c.title}</p>
              <p className="text-xs text-[#8B8B90] mt-1">{c._count?.articles ?? 0} articles</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => openEdit(c)} className="p-1.5 hover:text-[#AE4B2D]"><Pencil size={14} /></button>
                <button onClick={() => setDeleteTarget(c)} className="p-1.5 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Edit Collection" : "New Collection"} wide>
        <div className="space-y-4">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AdminTextarea label="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <AdminInput label="Cover Image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-2">Articles</p>
            <div className="max-h-56 overflow-y-auto border border-[#D8D8D4] rounded-sm p-2 space-y-1">
              {articlesList?.items.map((a) => {
                const checked = form.articleIds.includes(a.id);
                return (
                  <label key={a.id} className="flex items-center gap-2 text-sm px-2 py-1.5 hover:bg-[#FAFAF8] rounded-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setForm((f) => ({
                          ...f,
                          articleIds: checked ? f.articleIds.filter((id) => id !== a.id) : [...f.articleIds, a.id],
                        }))
                      }
                    />
                    {a.title}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton>
            <AdminButton onClick={() => saveMutation.mutate()} disabled={!form.title.trim()}>Save</AdminButton>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Collection"
        description={`Delete "${deleteTarget?.title}"? Articles will remain but leave this collection.`}
      />
    </div>
  );
}
