import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export function useBookmarkToggle() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (articleId: string) => api.post("/bookmarks", { articleId }),
    onSuccess: () => {
      toast("Saved to your bookmarks");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (articleId: string) => api.delete(`/bookmarks/${articleId}`),
    onSuccess: () => {
      toast("Removed from bookmarks", "info");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  function toggle(articleId: string, isBookmarked: boolean) {
    if (!user) {
      toast("Sign in to save stories", "info");
      navigate("/login");
      return;
    }
    if (isBookmarked) removeMutation.mutate(articleId);
    else addMutation.mutate(articleId);
  }

  return { toggle, pending: addMutation.isPending || removeMutation.isPending };
}
