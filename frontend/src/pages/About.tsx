import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <div className="max-w-prose mx-auto px-4 py-20">
      <Helmet>
        <title>About — MONUMENT</title>
      </Helmet>
      <span className="kicker">Our Story</span>
      <h1 className="mt-2 font-serif text-4xl md:text-5xl font-medium mb-8">About MONUMENT</h1>
      <div className="article-prose text-[19px] leading-[1.8]">
        <p>
          MONUMENT is an independent editorial publication reporting on the ideas, people, and systems shaping
          what comes next — across technology, artificial intelligence, design, business, culture, and science.
        </p>
        <p>
          We publish long-form reporting, quick reads, and curated collections for readers who want more than a
          headline. No noise, no filler — just reporting worth your attention.
        </p>
        <h2>Editorial Standards</h2>
        <p>
          Every story goes through editorial review before publication. We correct errors transparently and stand
          behind our reporting.
        </p>
        <h2>Get in Touch</h2>
        <p>Have a story tip or want to write for us? Reach the editorial team through our social channels.</p>
      </div>
    </div>
  );
}
