import { Helmet } from "react-helmet-async";

export default function Terms() {
  return (
    <div className="max-w-prose mx-auto px-4 py-20">
      <Helmet>
        <title>Terms of Service — MONUMENT</title>
      </Helmet>
      <span className="kicker">Legal</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-8">Terms of Service</h1>
      <div className="article-prose text-[19px] leading-[1.8]">
        <p>
          By using MONUMENT, you agree to use the platform respectfully — no spam, harassment, or abuse in
          comments. We reserve the right to moderate or remove content that violates these terms.
        </p>
        <h2>Content</h2>
        <p>All published articles remain the intellectual property of MONUMENT and its contributing authors.</p>
        <h2>Accounts</h2>
        <p>You're responsible for maintaining the security of your account credentials.</p>
      </div>
    </div>
  );
}
