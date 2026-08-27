import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm({ variant = "band" }: { variant?: "band" | "footer" }) {
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: (email: string) => api.post("/newsletter", { email }),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    mutation.mutate(email);
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex items-center gap-2 text-sm text-accent font-medium">
        <Check size={16} /> You're subscribed. Watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 max-w-md w-full">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={`flex-1 min-w-0 bg-transparent border-b px-1 py-2.5 outline-none placeholder:text-current/40 ${
          variant === "band" ? "border-ivory/40 focus:border-ivory text-ivory" : "border-hairline dark:border-dark-hairline focus:border-accent"
        }`}
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className={`shrink-0 flex items-center gap-1.5 text-sm font-medium px-4 border-b transition-colors disabled:opacity-50 ${
          variant === "band" ? "border-ivory/40 text-ivory hover:border-ivory" : "border-hairline dark:border-dark-hairline hover:border-accent hover:text-accent"
        }`}
      >
        Subscribe <ArrowRight size={14} />
      </button>
    </form>
  );
}
