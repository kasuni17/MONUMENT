import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload, Copy, Trash2, Search } from "lucide-react";
import { api } from "@/lib/api";
import { AdminCard, AdminPageHeader, AdminButton, ConfirmDialog } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";
import { formatDate } from "@/lib/utils";

interface MediaItem {
  id: string; filename: string; url: string; mimeType: string; size: number;
  width?: number; height?: number; createdAt: string; uploadedBy: { name: string };
}

export default function AdminMedia() {
  const { data } = useQuery({ queryKey: ["media"], queryFn: () => api.get<MediaItem[]>("/media") });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post("/media", formData);
    },
    onSuccess: () => {
      toast("Image uploaded");
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
    onError: () => toast("Upload failed", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/media/${id}`),
    onSuccess: () => {
      toast("Image deleted");
      queryClient.invalidateQueries({ queryKey: ["media"] });
    },
  });

  function copyUrl(url: string) {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    toast("Image URL copied");
  }

  const filtered = (data || []).filter((m) => m.filename.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        description="Upload and manage images used across articles."
        action={
          <>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadMutation.mutate(f); }} />
            <AdminButton onClick={() => fileRef.current?.click()} disabled={uploadMutation.isPending}>
              <Upload size={15} /> {uploadMutation.isPending ? "Uploading…" : "Upload Image"}
            </AdminButton>
          </>
        }
      />

      <div className="relative max-w-xs mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8B90]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search media…"
          className="w-full border border-[#D8D8D4] rounded-sm pl-8 pr-3 py-2 text-sm outline-none focus:border-[#16161A] bg-white"
        />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((m) => (
          <AdminCard key={m.id} className="overflow-hidden">
            <div className="aspect-square bg-[#EFEFEC]">
              <img src={m.url} alt={m.filename} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-xs font-medium truncate">{m.filename}</p>
              <p className="text-[11px] text-[#8B8B90] mt-0.5">
                {m.width && m.height ? `${m.width}×${m.height} · ` : ""}
                {(m.size / 1024).toFixed(0)}KB
              </p>
              <p className="text-[11px] text-[#8B8B90]">{formatDate(m.createdAt)}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => copyUrl(m.url)} className="p-1.5 hover:text-[#AE4B2D]" aria-label="Copy URL"><Copy size={13} /></button>
                <button onClick={() => setDeleteTarget(m)} className="p-1.5 hover:text-red-600" aria-label="Delete"><Trash2 size={13} /></button>
              </div>
            </div>
          </AdminCard>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-[#8B8B90] py-16">No media uploaded yet.</p>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete Image"
        description={`Delete "${deleteTarget?.filename}"? This cannot be undone.`}
      />
    </div>
  );
}
