import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
      <Helmet>
        <title>Page Not Found — MONUMENT</title>
      </Helmet>
      <span className="kicker">Error 404</span>
      <h1 className="mt-4 font-serif text-7xl md:text-9xl font-medium leading-none">
        Off the <span className="text-accent italic">Record</span>
      </h1>
      <p className="mt-8 text-ink-soft dark:text-dark-ink/60 max-w-md mx-auto leading-relaxed">
        This story either never ran, was pulled by the editors, or you followed a link that's since gone cold.
        Whatever the case, there's nothing to read here.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 px-6 py-3 border hairline font-medium hover:border-accent hover:text-accent transition-colors"
      >
        <ArrowLeft size={16} /> Return to the Front Page
      </Link>
    </div>
  );
}
