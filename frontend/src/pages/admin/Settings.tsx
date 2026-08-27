import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AdminCard, AdminPageHeader, AdminButton, AdminInput, AdminTextarea } from "@/components/admin/AdminUI";
import { useToast } from "@/contexts/ToastContext";
import { formatDate } from "@/lib/utils";

interface Subscriber { id: string; email: string; createdAt: string }

export default function AdminSettings() {
  const { data } = useQuery({ queryKey: ["settings"], queryFn: () => api.get<Record<string, string>>("/settings") });
  const { data: subscribers } = useQuery({ queryKey: ["newsletter-subscribers"], queryFn: () => api.get<Subscriber[]>("/newsletter") });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [announcementText, setAnnouncementText] = useState("");
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    if (data) {
      setAnnouncementText(data.announcementText || "");
      setTagline(data.tagline || "");
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: () => api.put("/settings", { announcementText, tagline }),
    onSuccess: () => {
      toast("Settings saved");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return (
    <div>
      <AdminPageHeader title="Settings" description="Site-wide publication settings." />

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <AdminCard className="p-5 space-y-4">
          <AdminTextarea
            label="Announcement Bar Text"
            rows={2}
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder="Shown at the top of the public site"
          />
          <AdminInput label="Site Tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          <div className="pt-2">
            <AdminButton onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              Save Settings
            </AdminButton>
          </div>
        </AdminCard>

        <AdminCard className="p-5">
          <p className="text-sm font-semibold mb-1">Newsletter Subscribers</p>
          <p className="text-xs text-[#8B8B90] mb-4">{subscribers?.length ?? 0} total subscribers</p>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {subscribers?.map((s) => (
              <div key={s.id} className="flex items-center justify-between text-sm border-b border-[#EFEFEC] pb-2">
                <span className="truncate">{s.email}</span>
                <span className="text-xs text-[#8B8B90] shrink-0 ml-2">{formatDate(s.createdAt)}</span>
              </div>
            ))}
            {subscribers?.length === 0 && <p className="text-xs text-[#8B8B90]">No subscribers yet.</p>}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
