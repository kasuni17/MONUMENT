import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
      <Helmet>
        <title>Restricted — MONUMENT</title>
      </Helmet>
      <ShieldAlert size={40} className="mx-auto text-accent mb-6" />
      <span className="kicker">Restricted Access</span>
      <h1 className="mt-4 font-serif text-5xl md:text-6xl font-medium">Not for Your Desk</h1>
      <p className="mt-6 text-ink-soft dark:text-dark-ink/60 max-w-md mx-auto leading-relaxed">
        This section of the newsroom is reserved for editorial staff. If you believe this is a mistake, contact
        an administrator.
      </p>
      <Link to="/" className="mt-10 inline-block px-6 py-3 border hairline font-medium hover:border-accent hover:text-accent transition-colors">
        Return Home
      </Link>
    </div>
  );
}
