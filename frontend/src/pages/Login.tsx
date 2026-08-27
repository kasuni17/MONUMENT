import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      toast("Welcome back");
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <Helmet>
        <title>Sign In — MONUMENT</title>
      </Helmet>
      <span className="kicker">Welcome Back</span>
      <h1 className="mt-2 font-serif text-4xl font-medium mb-2">Sign In</h1>
      <p className="text-sm text-ink-soft dark:text-dark-ink/60 mb-10">
        New to MONUMENT?{" "}
        <Link to="/register" className="text-accent hover:underline">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-4 py-3 border border-red-200 dark:border-red-900">{error}</p>}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink/60">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink/60">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t hairline text-xs text-ink-soft dark:text-dark-ink/50 space-y-1">
        <p>Demo admin: admin@monument.dev / Monument#2026</p>
        <p>Demo reader: reader@monument.dev / Reader#2026</p>
      </div>
    </div>
  );
}
