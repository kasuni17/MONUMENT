import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { CommentItem } from "@/types";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function CommentsSection({ articleId, comments }: { articleId: string; comments: CommentItem[] }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.post("/comments", { articleId, body }),
    onSuccess: () => {
      setBody("");
      toast("Comment submitted — it'll appear once approved.", "info");
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });

  return (
    <section className="border-t hairline pt-12 mt-12">
      <p className="kicker mb-8 flex items-center gap-1.5">
        <MessageCircle size={13} /> Discussion ({comments.length})
      </p>

      {user ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (body.trim()) mutation.mutate();
          }}
          className="mb-10"
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your thoughts…"
            rows={3}
            className="w-full border hairline bg-transparent px-4 py-3 text-sm outline-none focus:border-accent resize-none"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !body.trim()}
            className="mt-3 px-5 py-2 bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg text-sm font-medium disabled:opacity-50"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-ink-soft dark:text-dark-ink/60 mb-10">
          <Link to="/login" className="text-accent hover:underline">
            Sign in
          </Link>{" "}
          to join the discussion.
        </p>
      )}

      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-hairline dark:bg-dark-hairline shrink-0 overflow-hidden flex items-center justify-center text-xs font-medium">
              {c.user.avatar ? (
                <img src={c.user.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                c.user.name.charAt(0)
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{c.user.name}</p>
              <p className="text-sm text-ink-soft dark:text-dark-ink/70 mt-0.5">{c.body}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-ink-soft dark:text-dark-ink/50">Be the first to share a thought.</p>
        )}
      </div>
    </section>
  );
}
