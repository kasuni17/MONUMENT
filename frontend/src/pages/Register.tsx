import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth, ApiError } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export default function Register() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      toast("Account created. Welcome to MONUMENT.");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <Helmet>
        <title>Create Account — MONUMENT</title>
      </Helmet>
      <span className="kicker">Join Us</span>
      <h1 className="mt-2 font-serif text-4xl font-medium mb-2">Create Account</h1>
      <p className="text-sm text-ink-soft dark:text-dark-ink/60 mb-10">
        Already have an account?{" "}
        <Link to="/login" className="text-accent hover:underline">
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-4 py-3 border border-red-200 dark:border-red-900">{error}</p>}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft dark:text-dark-ink/60">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 outline-none focus:border-accent"
          />
        </div>
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 outline-none focus:border-accent"
          />
          <p className="mt-1.5 text-xs text-ink-soft dark:text-dark-ink/50">At least 8 characters.</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-ink text-ivory dark:bg-dark-ink dark:text-dark-bg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
