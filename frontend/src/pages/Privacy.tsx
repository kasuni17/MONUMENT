import { Helmet } from "react-helmet-async";

export default function Privacy() {
  return (
    <div className="max-w-prose mx-auto px-4 py-20">
      <Helmet>
        <title>Privacy Policy — MONUMENT</title>
      </Helmet>
      <span className="kicker">Legal</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-8">Privacy Policy</h1>
      <div className="article-prose text-[19px] leading-[1.8]">
        <p>
          MONUMENT collects only what's needed to operate your account: your name, email, and reading activity
          such as bookmarks and comments. We never sell your data to third parties.
        </p>
        <h2>What We Collect</h2>
        <ul>
          <li>Account information you provide at registration</li>
          <li>Bookmarks and comments you create</li>
          <li>Aggregate, anonymized reading analytics</li>
        </ul>
        <h2>Your Rights</h2>
        <p>You may request deletion of your account and associated data at any time.</p>
      </div>
    </div>
  );
}
