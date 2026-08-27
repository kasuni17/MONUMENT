import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

const EXPLORE = [
  { label: "Stories", href: "/stories" },
  { label: "Trending", href: "/trending" },
  { label: "Collections", href: "/collections" },
  { label: "Topics", href: "/topics" },
];

const TOPICS = ["Technology", "Artificial Intelligence", "Design", "Business", "Culture", "Science"];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t hairline mt-24 bg-ivory dark:bg-dark-bg">
      <div className="max-w-editorial mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-12">
          <div>
            <span className="font-serif text-2xl font-semibold">MONUMENT</span>
            <p className="mt-4 text-sm text-ink-soft dark:text-dark-ink/60 max-w-xs leading-relaxed">
              Reporting on the ideas, people, and systems shaping what comes next.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" aria-label="Twitter" className="hover:text-accent transition-colors">
                <Twitter size={17} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                <Linkedin size={17} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="hover:text-accent transition-colors">
                <Instagram size={17} />
              </a>
            </div>
          </div>

          <div>
            <p className="kicker mb-4">Explore</p>
            <ul className="space-y-2.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-ink-soft dark:text-dark-ink/70 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-4">Topics</p>
            <ul className="space-y-2.5">
              {TOPICS.map((t) => (
                <li key={t}>
                  <Link
                    to={`/topics/${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-ink-soft dark:text-dark-ink/70 hover:text-accent transition-colors"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker mb-4">Stories worth your attention</p>
            <p className="text-sm text-ink-soft dark:text-dark-ink/60 mb-4">
              One email, every Sunday. No noise.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="mt-14 pt-8 border-t hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft dark:text-dark-ink/50">
          <p>© {new Date().getFullYear()} MONUMENT. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {COMPANY.map((l) => (
              <Link key={l.href} to={l.href} className="hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
