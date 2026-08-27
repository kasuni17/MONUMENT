import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import slugify from "slugify";

const prisma = new PrismaClient();

const img = (id: string, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

function para(...lines: string[]) {
  return lines.map((l) => `<p>${l}</p>`).join("\n");
}

async function main() {
  console.log("Seeding MONUMENT...");

  await prisma.$transaction([
    prisma.articleView.deleteMany(),
    prisma.bookmark.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.media.deleteMany(),
    prisma.article.deleteMany(),
    prisma.collection.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.category.deleteMany(),
    prisma.author.deleteMany(),
    prisma.newsletterSubscriber.deleteMany(),
    prisma.setting.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // --- Users ---
  const adminPass = await bcrypt.hash("Monument#2026", 10);
  const editorPass = await bcrypt.hash("Editor#2026", 10);
  const readerPass = await bcrypt.hash("Reader#2026", 10);

  const admin = await prisma.user.create({
    data: { name: "Ilakshana", email: "admin@monument.dev", passwordHash: adminPass, role: "ADMIN" },
  });
  const editorUser = await prisma.user.create({
    data: { name: "Renée Fontaine", email: "editor@monument.dev", passwordHash: editorPass, role: "EDITOR" },
  });
  await prisma.user.create({
    data: { name: "Jordan Wick", email: "reader@monument.dev", passwordHash: readerPass, role: "READER" },
  });

  // --- Authors ---
  const [elena, marcus, priya, tom, sofia, renee] = await Promise.all([
    prisma.author.create({
      data: {
        name: "Elena Marsh", slug: "elena-marsh",
        bio: "Elena covers the frontier of artificial intelligence and the engineers building it, with a decade spent reporting from inside Silicon Valley labs.",
        avatar: img("photo-1580489944761-15a19d654956", 300),
        socialLinks: JSON.stringify({ twitter: "https://twitter.com", linkedin: "https://linkedin.com" }),
      },
    }),
    prisma.author.create({
      data: {
        name: "Marcus Webb", slug: "marcus-webb",
        bio: "Marcus writes on business strategy, markets, and the founders reshaping how companies are built.",
        avatar: img("photo-1560250097-0b93528c311a", 300),
        socialLinks: JSON.stringify({ twitter: "https://twitter.com", website: "https://example.com" }),
      },
    }),
    prisma.author.create({
      data: {
        name: "Priya Nandakumar", slug: "priya-nandakumar",
        bio: "Priya is a design critic and former product designer who writes about the craft and culture of digital design.",
        avatar: img("photo-1544005313-94ddf0286df2", 300),
        socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }),
      },
    }),
    prisma.author.create({
      data: {
        name: "Tom Kessler", slug: "tom-kessler",
        bio: "Tom is a science journalist focused on space, biology, and the research quietly redrawing what's possible.",
        avatar: img("photo-1552058544-f2b08422138a", 300),
        socialLinks: JSON.stringify({ twitter: "https://twitter.com" }),
      },
    }),
    prisma.author.create({
      data: {
        name: "Sofia Larsen", slug: "sofia-larsen",
        bio: "Sofia writes on travel, culture, and the places worth slowing down for.",
        avatar: img("photo-1517841905240-472988babdf9", 300),
        socialLinks: JSON.stringify({ website: "https://example.com" }),
      },
    }),
    prisma.author.create({
      data: {
        name: "Renée Fontaine", slug: "renee-fontaine",
        bio: "Renée is MONUMENT's editor-at-large, covering productivity, work culture, and how people actually get things done.",
        avatar: img("photo-1573497019940-1c28c88b4f3e", 300),
        userId: editorUser.id,
        socialLinks: JSON.stringify({ linkedin: "https://linkedin.com" }),
      },
    }),
  ]);

  // --- Categories ---
  const categoryDefs = [
    { name: "Technology", description: "The systems, platforms, and hardware quietly running the world.", cover: img("photo-1518770660439-4636190af475") },
    { name: "Artificial Intelligence", description: "Machine intelligence, its builders, and its consequences.", cover: img("photo-1531746790731-6c087fecd65a") },
    { name: "Design", description: "Craft, form, and the discipline of making things well.", cover: img("photo-1524758631624-e2822e304c36") },
    { name: "Business", description: "Strategy, markets, and the people building companies.", cover: img("photo-1454165804606-c3d57bc86b40") },
    { name: "Culture", description: "Ideas, media, and the forces shaping how we live.", cover: img("photo-1519681393784-d120267933ba") },
    { name: "Science", description: "Research and discovery at the edge of what's known.", cover: img("photo-1532187863486-abf9dbad1b69") },
    { name: "Travel", description: "Places worth the detour, and the stories behind them.", cover: img("photo-1488646953014-85cb44e25828") },
    { name: "Productivity", description: "Better systems for doing meaningful work.", cover: img("photo-1517245386807-bb43f82c33c4") },
  ];
  const categories = await Promise.all(
    categoryDefs.map((c) =>
      prisma.category.create({ data: { name: c.name, slug: slugify(c.name, { lower: true }), description: c.description, coverImage: c.cover } })
    )
  );
  const cat = Object.fromEntries(categories.map((c) => [c.name, c]));

  // --- Tags ---
  const tagNames = [
    "Machine Learning", "Startups", "Venture Capital", "UX Design", "Typography",
    "Climate", "Space", "Neuroscience", "Remote Work", "Deep Work", "Architecture",
    "Privacy", "Open Source", "Leadership", "Southeast Asia", "Minimalism",
    "Robotics", "Creativity", "Future of Work", "Sustainability",
  ];
  const tags = await Promise.all(
    tagNames.map((n) => prisma.tag.create({ data: { name: n, slug: slugify(n, { lower: true }) } }))
  );
  const tag = Object.fromEntries(tags.map((t) => [t.name, t]));

  // --- Collections ---
  const collectionDefs = [
    { title: "AI: The New Creative Era", description: "How machine intelligence is rewriting the rules of making things.", cover: img("photo-1531297484001-80022131f5a1") },
    { title: "Future of Work", description: "Dispatches from the reorganization of how, where, and why we work.", cover: img("photo-1497215728101-856f4ea42174") },
    { title: "Designing Better Digital Worlds", description: "The craft decisions behind interfaces that actually respect people.", cover: img("photo-1509966756634-9c23dd6e6815") },
    { title: "Founders & Builders", description: "Profiles of the people making difficult things happen.", cover: img("photo-1552664730-d307ca884978") },
  ];
  const collections = await Promise.all(
    collectionDefs.map((c) => prisma.collection.create({ data: { title: c.title, slug: slugify(c.title, { lower: true, strict: true }), description: c.description, coverImage: c.cover } }))
  );

  const now = Date.now();
  const daysAgo = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000);

  type Seed = {
    title: string; subtitle: string; excerpt: string; category: string; author: any;
    tags: string[]; cover: string; content: string; readingTimeMin: number; publishedDaysAgo: number | null;
    status?: "DRAFT" | "PUBLISHED" | "SCHEDULED"; featured?: boolean; views: number; collections?: string[];
  };

  const deepDiveIntro = (lead: string) => `<p>${lead}</p>`;

  const articles: Seed[] = [
    {
      title: "Inside the Labs Racing to Build Machines That Reason",
      subtitle: "A year inside three frontier AI labs reveals how differently they define intelligence — and why that disagreement matters.",
      excerpt: "The gap between labs chasing scale and labs chasing reasoning is widening. What they're each betting on could determine whose AI actually works.",
      category: "Artificial Intelligence", author: elena, tags: ["Machine Learning", "Startups"],
      cover: img("photo-1531746790731-6c087fecd65a"), views: 18420, publishedDaysAgo: 3, featured: true,
      collections: ["AI: The New Creative Era"],
      readingTimeMin: 11,
      content: `
${deepDiveIntro("For eighteen months, three research labs have been quietly diverging on the single question that will define the next decade of computing: what does it actually mean for a machine to reason?")}
<h2>The scale bet</h2>
<p>The first camp believes reasoning is an emergent property of scale — that bigger models, trained on more data with more compute, will eventually exhibit something indistinguishable from thought. It's an expensive wager, and an increasingly public one, measured in the size of data center announcements rather than research papers.</p>
<blockquote>"We are not building a feature. We are building the substrate everything else gets built on top of," one lab's chief scientist told me, requesting anonymity to speak candidly about internal roadmaps.</blockquote>
<p>The infrastructure required is staggering. Training runs now consume power on the scale of small cities, and the capital required to compete has quietly become the tallest barrier to entry the software industry has ever erected.</p>
<h2>The structure bet</h2>
<p>A second camp thinks scale alone is a dead end — that without explicit structure for planning, memory, and verification, models will keep hallucinating no matter how large they get. Their bet is architectural: smaller models wired together with tools, retrieval systems, and step-by-step verification loops.</p>
<ul>
<li>Smaller base models paired with external memory and tool use</li>
<li>Explicit chain-of-verification steps before an answer is returned</li>
<li>Training data curated for reasoning traces, not just raw text volume</li>
</ul>
<p>Early benchmarks suggest this approach is punching above its weight on tasks that require multi-step logic, even against models an order of magnitude larger.</p>
<h2>What builders actually want</h2>
<p>Talk to the engineers actually shipping products on top of these models, and a more practical picture emerges. They don't care about the philosophy. They care about reliability, latency, and cost — and right now, none of the three approaches wins cleanly on all three.</p>
<pre><code>// A simplified reasoning loop pattern
async function solve(task) {
  const plan = await model.plan(task);
  for (const step of plan.steps) {
    const result = await tools.execute(step);
    if (!verify(result)) return retry(step);
  }
  return synthesize(plan.results);
}</code></pre>
<p>That pattern — plan, execute, verify, synthesize — is showing up in production systems regardless of which underlying philosophy a team subscribes to. It may be the most honest signal yet of where this is actually heading: not toward one theory winning, but toward engineering pragmatism absorbing pieces of all of them.</p>
<h2>The cost of being wrong</h2>
<p>Labs betting on scale are locking in years of infrastructure commitments. Labs betting on structure are betting their research time won't be leapfrogged by the next model generation. Both are expensive ways to be wrong, and neither camp is hedging.</p>
<p>What's clear after a year of watching this play out up close: the "AI industry" isn't one industry making one bet. It's several incompatible ones sharing a name, a talent pool, and increasingly, a very finite supply of chips.</p>`,
    },
    {
      title: "The Quiet Death of the Open Office",
      subtitle: "After a decade of glass walls and shared benches, companies are spending heavily to build offices with doors again.",
      excerpt: "Open-plan offices promised collaboration and delivered noise. Now the same companies that built them are quietly tearing them out.",
      category: "Business", author: marcus, tags: ["Future of Work", "Leadership"],
      cover: img("photo-1497215728101-856f4ea42174"), views: 9820, publishedDaysAgo: 6, featured: true,
      collections: ["Future of Work"],
      readingTimeMin: 8,
      content: `
${deepDiveIntro("Fifteen years after the open office became the default expression of a modern company, the walls are quietly going back up.")}
<h2>A promise that didn't hold</h2>
<p>The pitch was seductive: remove the walls, and collaboration would follow naturally. Ideas would travel faster across an open floor. Hierarchy would flatten. Instead, study after study found the opposite — face-to-face interaction actually dropped in open offices, replaced by messaging apps, as people retreated into headphones to cope with the noise.</p>
<h2>What replaced it</h2>
<p>The offices being built now look different: a mix of enclosed focus rooms, small team pods, and genuinely private offices for the deepest work, alongside open areas reserved specifically for the collaboration open-plan was originally supposed to enable.</p>
<blockquote>"We spent a decade optimizing for square footage per employee. We're now optimizing for hours of undisturbed focus per employee. It's a completely different design brief," says one workplace strategist who has redesigned offices for several Fortune 500 companies.</blockquote>
<h2>The real driver: hybrid work</h2>
<p>Ironically, remote and hybrid work — which many predicted would kill the office entirely — is what's funding this shift. With fewer people in the building on any given day, companies have square footage to spare, and they're spending it on privacy instead of density.</p>
<p>The office isn't disappearing. It's being redesigned around a much narrower, more honest question: what can you only do here that you can't do at home? Increasingly, the answer isn't ambient collaboration — it's focused, undistracted work in a room with a door.</p>`,
    },
    {
      title: "What Typography Reveals About a Product's Confidence",
      subtitle: "The best interfaces don't just choose good typefaces — they use type to signal how sure of itself the product is.",
      excerpt: "Type choice is rarely just aesthetic. Look closely at any confident product and you'll find a typographic system doing quiet, deliberate work.",
      category: "Design", author: priya, tags: ["UX Design", "Typography", "Minimalism"],
      cover: img("photo-1544716278-ca5e3f4abd8c"), views: 6210, publishedDaysAgo: 9, featured: true,
      collections: ["Designing Better Digital Worlds"],
      readingTimeMin: 7,
      content: `
${deepDiveIntro("Look at any product you trust instinctively, and there's a good chance its confidence is written into the type before you've consciously noticed a single word.")}
<h2>Type as posture</h2>
<p>A typeface set too small, hedging its own hierarchy, apologizing with excessive caveats and disclaimers — that's a product unsure of itself. A typeface with a clear, unapologetic scale, generous line height, and a restrained number of weights reads as a product that knows exactly what it wants to say.</p>
<h2>The hierarchy tells the truth</h2>
<p>Most interfaces fail not because the typeface is wrong, but because the hierarchy is dishonest — everything fighting to be the most important thing on the screen. A confident hierarchy makes hard choices: one headline, one clear next action, everything else quietly supporting.</p>
<ol>
<li>Pick one display face for moments that matter, and use it sparingly</li>
<li>Let body text be genuinely readable — 16px minimum, generous line height</li>
<li>Resist adding a third typeface unless it's doing real structural work</li>
</ol>
<h2>Restraint is the tell</h2>
<p>The products that feel most premium are rarely the ones using the most typefaces or the widest range of weights. They're the ones that picked two, maybe three, and trusted them completely. Restraint, more than any individual typeface, is what confidence actually looks like on a screen.</p>`,
    },
    {
      title: "Sri Lanka's Hill Country, Slowly",
      subtitle: "A week spent moving at the pace of the tea estates that built the region, from misty Nuwara Eliya to the ridgelines above Ella.",
      excerpt: "The hill country doesn't reward rushing. A slow week among tea terraces and colonial-era towns is the only way to actually see it.",
      category: "Travel", author: sofia, tags: ["Southeast Asia"],
      cover: img("photo-1546708973-b339540b5162"), views: 4310, publishedDaysAgo: 14, featured: false,
      readingTimeMin: 9,
      content: `
${deepDiveIntro("The train from Kandy to Ella takes just under seven hours, and every local you meet along the way will tell you the same thing: don't rush it.")}
<h2>Into the tea country</h2>
<p>Past Nanu Oya, the landscape changes almost by the minute — terraced tea estates climbing impossible gradients, waterfalls dropping straight into the valley floor, and the temperature dropping ten degrees as the train climbs toward Nuwara Eliya, the colonial-era hill town the British once called "Little England."</p>
<blockquote>Tea pickers here still work the same slopes their grandmothers worked, moving through the rows with a rhythm that makes the whole hillside look like it's breathing.</blockquote>
<h2>Ella, and the ridge above it</h2>
<p>Ella itself has become a well-worn stop on the backpacker circuit, but the crowds thin out fast once you're on the ridge trail above town. The walk to Little Adam's Peak takes under an hour and delivers a view over the entire valley that the more famous Adam's Peak, hours away, can't match for accessibility.</p>
<h2>Where to actually stay</h2>
<ul>
<li>A working tea estate bungalow outside Nuwara Eliya, if you can find one taking guests</li>
<li>A family-run guesthouse in Ella proper, away from the main strip</li>
<li>Anywhere with a porch facing the valley — you'll want to just sit</li>
</ul>
<p>The hill country isn't a place you check off. It's a place you slow down for, and it's obvious within a day which travelers have figured that out and which are still rushing toward the next stop.</p>`,
    },
    {
      title: "The Founders Who Turned Down the Round",
      subtitle: "Three companies walked away from term sheets at the top of the market. Two years later, all three say it was the best decision they made.",
      excerpt: "Saying no to easy capital used to be rare. A growing number of founders are discovering what discipline actually buys you.",
      category: "Business", author: marcus, tags: ["Startups", "Venture Capital", "Leadership"],
      cover: img("photo-1552664730-d307ca884978"), views: 12040, publishedDaysAgo: 2, featured: false,
      collections: ["Founders & Builders"],
      readingTimeMin: 10,
      content: `
${deepDiveIntro("In 2021, turning down a term sheet at a rich valuation was close to unthinkable. Three founders did it anyway — and now they're the ones telling the story.")}
<h2>The math that didn't add up</h2>
<p>Each of the three companies had the same realization at roughly the same time: the valuation on offer implied growth rates none of them believed they could sustainably hit. Taking the money would have meant spending the next two years managing investor expectations instead of the business.</p>
<h2>What they did instead</h2>
<p>All three extended their existing runway, cut spend on anything that wasn't directly tied to revenue, and quietly kept building. None of it made headlines at the time. It rarely does.</p>
<blockquote>"Nobody writes the story about the round you didn't raise. But that's usually the more interesting decision," one of the founders told me.</blockquote>
<h2>Two years later</h2>
<p>All three companies are now profitable or close to it, with ownership stakes their founders would have diluted significantly had they taken the earlier round. It's a quietly compounding advantage that only becomes visible years after the decision was made — and largely invisible to anyone just reading funding announcements.</p>
<p>The lesson isn't that raising money is wrong. It's that the pressure to raise, especially at the top of a market, deserves far more scrutiny than most founders are willing to give it in the moment.</p>`,
    },
    {
      title: "Everything You Need to Know About Robotics Right Now",
      subtitle: "A field guide to the humanoid robot race — who's building what, and how close any of it actually is to your warehouse.",
      excerpt: "Humanoid robots are suddenly everywhere in demo videos. Here's an honest read on how much of it is real.",
      category: "Technology", author: elena, tags: ["Robotics", "Machine Learning"],
      cover: img("photo-1531746790731-6c087fecd65a"), views: 15600, publishedDaysAgo: 5, featured: false,
      readingTimeMin: 6,
      content: `
${deepDiveIntro("Every major robotics lab has released a demo video in the last year. Almost none of them have shipped a product. Here's how to tell the difference.")}
<h2>The demo-to-deployment gap</h2>
<p>A polished demo video tells you almost nothing about deployment timelines. The gap between "this worked once, on this specific task, in this controlled environment" and "this works reliably, at scale, in a real warehouse" remains enormous — often measured in years, not months.</p>
<h2>What's actually shipping</h2>
<ul>
<li>Fixed-arm robotic systems in structured warehouse environments — genuinely deployed today</li>
<li>Humanoid form-factor robots in pilot programs — real, but narrow and supervised</li>
<li>Fully autonomous general-purpose humanoids — still mostly demo-stage</li>
</ul>
<h2>The honest timeline</h2>
<p>Talk to engineers rather than executives, and the timelines get longer and the caveats get more specific. That's usually the more reliable read on where a technology actually stands.</p>`,
    },
    {
      title: "A Beginner's Guide to Deep Work in a Notification Economy",
      subtitle: "Practical systems for reclaiming attention when every app on your phone is professionally engineered to fragment it.",
      excerpt: "Deep work isn't a willpower problem. It's an environment design problem — and most environments are designed against you.",
      category: "Productivity", author: renee, tags: ["Deep Work", "Remote Work"],
      cover: img("photo-1517245386807-bb43f82c33c4"), views: 8930, publishedDaysAgo: 1, featured: false,
      readingTimeMin: 5,
      content: `
${deepDiveIntro("If you've tried and failed to concentrate through sheer willpower, the problem was never your discipline. It was your environment.")}
<h2>Design the friction, not the intention</h2>
<p>Intentions are cheap and fragile. Friction is durable. Physically separating your phone from your workspace does more for sustained focus than any amount of resolve.</p>
<h2>A minimal system</h2>
<ol>
<li>One protected block per day, same time, no exceptions</li>
<li>Notifications off at the device level, not just the app level</li>
<li>A single task written down before the block starts — not a list, one task</li>
</ol>
<p>The system works precisely because it removes decisions from the moment you're supposed to be focusing. By the time you sit down, there's nothing left to decide.</p>`,
    },
    {
      title: "The Architecture of Silence",
      subtitle: "Inside a new wave of buildings designed explicitly to slow visitors down — and what that says about everything else we build.",
      excerpt: "A handful of architects are designing spaces around a single, radical goal: making people move slower.",
      category: "Design", author: priya, tags: ["Architecture", "Minimalism"],
      cover: img("photo-1449824913935-59a10b8d2000"), views: 5210, publishedDaysAgo: 11, featured: false,
      readingTimeMin: 7,
      content: `
${deepDiveIntro("Most public buildings are designed, whether their architects admit it or not, to move people through them efficiently. A small but growing movement is designing for the opposite.")}
<h2>Slowness as a design goal</h2>
<p>Long, deliberately narrow corridors. Thresholds that require you to pause. Light that changes character every few meters. None of it is accidental — it's a design language built entirely around asking visitors to slow down and notice where they are.</p>
<blockquote>"Efficiency is the wrong metric for a space meant to be experienced rather than passed through," one architect behind several of these projects told me.</blockquote>
<h2>What it borrows from</h2>
<p>Much of this language draws directly from religious and ceremonial architecture — spaces that have always understood that the journey to a room can matter as much as the room itself. What's new is seeing it applied to museums, libraries, and even a handful of corporate headquarters.</p>`,
    },
    {
      title: "Why Every Major Tech Company Is Suddenly Building Chips",
      subtitle: "The custom silicon arms race, explained for people who don't normally follow semiconductors.",
      excerpt: "Every major AI company is now designing its own chips. The reasons are more about control than cost.",
      category: "Technology", author: elena, tags: ["Machine Learning", "Open Source"],
      cover: img("photo-1518770660439-4636190af475"), views: 11200, publishedDaysAgo: 4, featured: false,
      collections: ["AI: The New Creative Era"],
      readingTimeMin: 8,
      content: `
${deepDiveIntro("Designing your own silicon used to be reserved for the largest hardware companies on earth. Now every major AI lab is doing it.")}
<h2>The dependency problem</h2>
<p>Relying entirely on a single external chip supplier means your product roadmap is downstream of someone else's manufacturing schedule. For companies whose entire business now runs on AI inference, that's an unacceptable amount of exposure.</p>
<h2>What custom silicon actually buys you</h2>
<ul>
<li>Chips tuned precisely for your own model architectures</li>
<li>Negotiating leverage against the dominant chip suppliers</li>
<li>A defensible cost advantage at extreme inference volumes</li>
</ul>
<p>None of this is cheap, and the payoff is years out for most of these programs. But for companies whose entire margin structure depends on inference cost, the alternative — permanent dependency — is starting to look more expensive.</p>`,
    },
    {
      title: "The Case for Boring Infrastructure",
      subtitle: "The most reliable systems in the world are, almost without exception, deeply unglamorous. That's not a coincidence.",
      excerpt: "Exciting infrastructure is usually infrastructure that hasn't failed publicly yet. The boring stuff has already learned its lessons.",
      category: "Technology", author: marcus, tags: ["Open Source", "Startups"],
      cover: img("photo-1518432031352-d6fc5c10da5a"), views: 7040, publishedDaysAgo: 18, featured: false,
      readingTimeMin: 4,
      content: `
${deepDiveIntro("The most reliable systems running the internet today are almost universally the least exciting ones to talk about at a conference.")}
<h2>Boring is a track record, not a personality</h2>
<p>A piece of infrastructure gets boring by surviving enough incidents to have all its interesting edge cases quietly patched out. What looks like a lack of ambition is usually just a longer history of being tested under real conditions.</p>
<p>Choosing boring technology isn't a failure of imagination. For anything load-bearing, it's the only defensible choice.</p>`,
    },
    {
      title: "Inside the Search for Earth-Like Worlds",
      subtitle: "New space telescopes are finding thousands of exoplanets. A small number of them might actually matter.",
      excerpt: "We've found thousands of planets outside our solar system. The real story is in the handful that could conceivably support life.",
      category: "Science", author: tom, tags: ["Space"],
      cover: img("photo-1462331940025-496dfbfc7564"), views: 9310, publishedDaysAgo: 7, featured: true,
      readingTimeMin: 9,
      content: `
${deepDiveIntro("Modern space telescopes have found thousands of planets orbiting distant stars. Almost all of them are irrelevant to the question everyone actually wants answered.")}
<h2>The habitable zone, narrowly defined</h2>
<p>The "Goldilocks zone" — not too hot, not too cold for liquid water — is only the first, crudest filter. Atmosphere, magnetic field, star volatility, and dozens of other factors matter just as much, and most of them we still can't directly observe.</p>
<h2>What the next generation of telescopes changes</h2>
<p>Upcoming instruments will be able to directly analyze the atmospheric composition of a much larger set of candidate planets — looking for the specific chemical signatures that, on Earth, are produced almost exclusively by biology.</p>
<blockquote>"We're not looking for aliens waving back. We're looking for a chemistry that shouldn't exist without something alive producing it," one astrophysicist explained.</blockquote>
<h2>Managing expectations</h2>
<p>Even a strong signal would take years to confirm, and confirming it beyond doubt might be impossible with current instruments. But for the first time, the question has moved from purely philosophical to something approaching a real, falsifiable measurement.</p>`,
    },
    {
      title: "The Neuroscience of Why Breaks Actually Work",
      subtitle: "What's actually happening in the brain during a walk, a nap, or a long shower — and why insight tends to arrive there instead of at the desk.",
      excerpt: "Your best ideas rarely arrive while you're staring at the problem. Here's what neuroscience says is actually going on.",
      category: "Science", author: tom, tags: ["Neuroscience", "Deep Work"],
      cover: img("photo-1507413245164-6160d8298b31"), views: 6720, publishedDaysAgo: 8, featured: false,
      readingTimeMin: 6,
      content: `
${deepDiveIntro("Ask most people where their best ideas come from, and remarkably few say 'sitting at my desk, actively trying to think of them.'")}
<h2>The default mode network</h2>
<p>When focused attention relaxes — during a walk, a shower, a long drive — the brain doesn't go idle. A different system, the default mode network, activates instead, quietly making unusual connections between things you weren't consciously working on.</p>
<h2>Why this matters for how you work</h2>
<ul>
<li>Genuine breaks require actually disengaging, not switching to a different screen</li>
<li>Insight tends to follow, not replace, focused effort — you still need the input first</li>
<li>Walking specifically shows measurable creativity boosts across multiple studies</li>
</ul>
<p>The takeaway isn't that effort doesn't matter. It's that effort and insight run on different systems, and treating rest as unproductive means quietly sabotaging the second half of the process.</p>`,
    },
    {
      title: "Minimal Doesn't Mean Empty",
      subtitle: "A short case for treating minimalism as a discipline of removal, not an aesthetic of absence.",
      excerpt: "The best minimalist work isn't empty — it's edited. There's a meaningful difference, and most imitators miss it.",
      category: "Design", author: priya, tags: ["Minimalism", "UX Design"],
      cover: img("photo-1509966756634-9c23dd6e6815"), views: 3980, publishedDaysAgo: 20, featured: false,
      readingTimeMin: 3,
      content: `
${deepDiveIntro("Minimalism gets copied constantly and understood rarely. Most imitations mistake absence for the actual discipline underneath it.")}
<h2>Editing, not emptying</h2>
<p>True minimalist work usually started as something much fuller, then had everything unnecessary systematically removed. What's left isn't empty — it's exactly full enough, with every remaining element doing real work.</p>
<p>Empty is the absence of decisions. Minimal is the result of hundreds of them.</p>`,
    },
    {
      title: "The Startups Betting Against the Cloud",
      subtitle: "A small but growing group of companies is quietly moving workloads back on-premise. The economics finally make sense again.",
      excerpt: "After fifteen years of cloud-first orthodoxy, a handful of companies are moving back to owning their own hardware — and saving millions doing it.",
      category: "Business", author: marcus, tags: ["Startups", "Open Source"],
      cover: img("photo-1497366216548-37526070297c"), views: 8410, publishedDaysAgo: 12, featured: false,
      readingTimeMin: 7,
      content: `
${deepDiveIntro("For fifteen years, moving to the cloud was treated as an obviously correct decision. A growing number of companies are quietly reversing it.")}
<h2>The bill that changed the conversation</h2>
<p>For workloads with predictable, sustained, high-volume usage, the cloud's flexibility premium stops paying for itself. Several companies have now published detailed breakdowns showing seven-figure annual savings from repatriating stable workloads to owned hardware.</p>
<h2>Not a full reversal</h2>
<p>Almost none of these companies are leaving the cloud entirely — burst capacity, new experimental workloads, and anything without predictable usage patterns still make sense there. What's changing is the default assumption that cloud is automatically right for everything.</p>
<p>The real lesson is less about cloud versus on-premise, and more about how quickly an unquestioned default can quietly stop making financial sense.</p>`,
    },
    {
      title: "Five Ways to Read Faster Without Skimming",
      subtitle: "Speed reading gimmicks mostly don't work. These do.",
      excerpt: "Most speed-reading advice trades comprehension for pace. Here's what actually holds up.",
      category: "Productivity", author: renee, tags: ["Deep Work"],
      cover: img("photo-1495446815901-a7297e633e8d"), views: 5540, publishedDaysAgo: 15, featured: false,
      readingTimeMin: 4,
      content: `
${deepDiveIntro("Most speed-reading techniques promise a shortcut around comprehension. The ones that actually work don't skip it — they remove friction around it.")}
<h2>What actually helps</h2>
<ol>
<li>Reduce subvocalization gradually, not by force</li>
<li>Preview structure before reading line by line</li>
<li>Read in short, focused sessions rather than long unbroken ones</li>
<li>Actively predict what's coming next in an argument</li>
<li>Summarize each section in one sentence before moving on</li>
</ol>
<p>None of these are gimmicks. They're closer to training comprehension to run more efficiently — which, unlike raw speed tricks, tends to actually stick.</p>`,
    },
    {
      title: "Coastal Portugal, Off the Algarve",
      subtitle: "North of the tourist coast, a quieter stretch of Portuguese coastline still moves at its own pace.",
      excerpt: "Skip the Algarve. The Silver Coast north of Lisbon is where Portugal's coastline still feels unhurried.",
      category: "Travel", author: sofia, tags: [],
      cover: img("photo-1555881400-74d7acaacd8b"), views: 4120, publishedDaysAgo: 22, featured: false,
      readingTimeMin: 5,
      content: `
${deepDiveIntro("An hour north of Lisbon, the coastline changes character entirely — fewer resorts, more fishing villages that still function as fishing villages.")}
<h2>Nazaré, beyond the giant waves</h2>
<p>Most visitors come for the record-breaking surf. Fewer stick around for the old town below the cliffs, where the fish market still runs on its own schedule and has nothing to do with tourism.</p>
<h2>Óbidos, in the off-season</h2>
<p>The walled medieval town gets crowded on weekends, but arrive on a weekday morning and you'll mostly have the ramparts to yourself, along with a view over the surrounding countryside that hasn't changed much in centuries.</p>`,
    },
    {
      title: "What Climate Adaptation Actually Looks Like in 2026",
      subtitle: "Past the headlines about emissions targets, cities are quietly redesigning themselves for a climate that's already changed.",
      excerpt: "The emissions conversation dominates headlines. The adaptation conversation — quieter, more expensive, already happening — matters just as much.",
      category: "Science", author: tom, tags: ["Climate", "Sustainability"],
      cover: img("photo-1500534623283-312aade485b7"), views: 7230, publishedDaysAgo: 10, featured: false,
      readingTimeMin: 6,
      content: `
${deepDiveIntro("While the emissions debate plays out in headlines, a quieter and arguably more urgent one is happening in city planning departments.")}
<h2>Redesigning for water</h2>
<p>Cities from Rotterdam to Singapore have spent the last decade redesigning drainage, green space, and even street grades around a simple premise: extreme rainfall events aren't occasional anomalies anymore, they're the new baseline to design for.</p>
<h2>The uncomfortable budget math</h2>
<p>Adaptation infrastructure is expensive, rarely glamorous, and hard to fund politically — it's difficult to claim credit for a flood that didn't happen. That funding gap, more than any technical limitation, is the real bottleneck right now.</p>`,
    },
    {
      title: "The Return of the Long Interview",
      subtitle: "As algorithmic feeds reward shorter and shorter content, a counter-trend is quietly thriving: interviews that run for hours.",
      excerpt: "Everything about the current media environment should have killed the long-form interview. Instead, it's having a moment.",
      category: "Culture", author: marcus, tags: ["Creativity"],
      cover: img("photo-1478737270239-2f02b77fc618"), views: 6910, publishedDaysAgo: 16, featured: false,
      readingTimeMin: 5,
      content: `
${deepDiveIntro("Every incentive in the current media environment points toward shorter content. And yet three-hour interviews are quietly outperforming almost everything else.")}
<h2>Depth as differentiation</h2>
<p>When short-form content is abundant and interchangeable, genuine depth becomes the rarer, more valuable thing. A long, unhurried conversation gives a subject room to actually think out loud, rather than perform a soundbite.</p>
<p>It's a reminder that audience attention isn't uniformly shrinking — it's becoming more selective about what it's willing to spend on.</p>`,
    },
    {
      title: "A Short Note on Shipping Unfinished Things",
      subtitle: "The discomfort of releasing something before it feels ready is usually a signal you're doing it right.",
      excerpt: "Waiting until something feels finished is usually just a slower way of never shipping it at all.",
      category: "Productivity", author: renee, tags: ["Startups", "Future of Work"],
      cover: img("photo-1517245386807-bb43f82c33c4"), views: 3210, publishedDaysAgo: 25, featured: false,
      readingTimeMin: 3,
      content: `
${deepDiveIntro("Almost everything that eventually felt finished started as something released while it still felt embarrassingly unfinished.")}
<h2>The feeling isn't the signal</h2>
<p>Waiting for a piece of work to feel ready before shipping it conflates a subjective, unreliable feeling with an actual quality bar. Real feedback from real use is a far better editor than another private round of polish.</p>
<p>Ship the unfinished thing. Let the discomfort be the cost of moving faster than the version of you that wants everything perfect first.</p>`,
    },
  ];

  const catByName: Record<string, string> = Object.fromEntries(categories.map((c) => [c.name, c.id]));
  const tagByName: Record<string, string> = Object.fromEntries(tags.map((t) => [t.name, t.id]));
  const collectionByTitle: Record<string, string> = Object.fromEntries(collections.map((c) => [c.title, c.id]));

  for (const a of articles) {
    const slug = slugify(a.title, { lower: true, strict: true });
    await prisma.article.create({
      data: {
        title: a.title,
        subtitle: a.subtitle,
        excerpt: a.excerpt,
        content: a.content,
        coverImage: a.cover,
        coverImageAlt: a.title,
        slug,
        categoryId: catByName[a.category],
        authorId: a.author.id,
        status: "PUBLISHED",
        publishedAt: a.publishedDaysAgo != null ? daysAgo(a.publishedDaysAgo) : new Date(),
        readingTimeMin: a.readingTimeMin,
        views: a.views,
        featured: !!a.featured,
        seoTitle: a.title,
        seoDescription: a.excerpt,
        tags: { connect: a.tags.map((t) => ({ id: tagByName[t] })) },
        collections: { connect: (a.collections || []).map((c) => ({ id: collectionByTitle[c] })) },
      },
    });
  }

  // A couple of drafts / scheduled for the admin CMS to show real states
  await prisma.article.create({
    data: {
      title: "The Next Wave of Battery Chemistry",
      subtitle: "Draft — pending review",
      excerpt: "Solid-state batteries have been five years away for a decade. What's actually different this time.",
      content: para("Draft content — early notes on solid-state battery manufacturing scale-up."),
      coverImage: img("photo-1509391366360-2e959784a276"),
      coverImageAlt: "Battery cells",
      slug: "the-next-wave-of-battery-chemistry",
      categoryId: catByName["Science"],
      authorId: tom.id,
      status: "DRAFT",
      readingTimeMin: 6,
      seoTitle: "The Next Wave of Battery Chemistry",
      seoDescription: "Solid-state batteries have been five years away for a decade.",
    },
  });

  await prisma.article.create({
    data: {
      title: "How Three Cities Rebuilt Their Downtowns After Remote Work",
      subtitle: "Scheduled for next week",
      excerpt: "Three mid-size cities lost their downtown foot traffic to remote work — and found their way back with an unexpected strategy.",
      content: para("Scheduled draft content pending final edit before publish."),
      coverImage: img("photo-1477959858617-67f85cf4f1df"),
      coverImageAlt: "City downtown",
      slug: "how-three-cities-rebuilt-their-downtowns",
      categoryId: catByName["Business"],
      authorId: marcus.id,
      status: "SCHEDULED",
      publishedAt: new Date(now + 3 * 24 * 60 * 60 * 1000),
      readingTimeMin: 7,
      seoTitle: "How Three Cities Rebuilt Their Downtowns After Remote Work",
      seoDescription: "Three mid-size cities found their way back from empty downtowns.",
    },
  });

  // --- Comments (demo moderation queue) ---
  const publishedArticles = await prisma.article.findMany({ where: { status: "PUBLISHED" }, take: 6 });
  const readerUser = await prisma.user.findUnique({ where: { email: "reader@monument.dev" } });
  if (readerUser) {
    const commentBodies = [
      { body: "This completely changed how I think about the topic — really well reported.", status: "APPROVED" as const },
      { body: "Would love a follow-up on this in six months.", status: "APPROVED" as const },
      { body: "Not sure I agree with the framing here, but a good read regardless.", status: "PENDING" as const },
      { body: "Great sourcing on this one.", status: "PENDING" as const },
      { body: "Check out my site for more info!!! [spam link]", status: "REJECTED" as const },
    ];
    for (let i = 0; i < commentBodies.length && i < publishedArticles.length; i++) {
      await prisma.comment.create({
        data: {
          articleId: publishedArticles[i].id,
          userId: readerUser.id,
          body: commentBodies[i].body,
          status: commentBodies[i].status,
        },
      });
    }
  }

  // --- Historical article views (for the analytics "views over time" chart) ---
  const allPublished = await prisma.article.findMany({ where: { status: "PUBLISHED" }, select: { id: true, views: true } });
  const viewRows: { articleId: string; createdAt: Date }[] = [];
  for (const a of allPublished) {
    const sampleCount = Math.min(120, Math.max(5, Math.round(a.views / 150)));
    for (let i = 0; i < sampleCount; i++) {
      const daysBack = Math.floor(Math.random() * 30);
      const jitterMs = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
      viewRows.push({ articleId: a.id, createdAt: new Date(now - daysBack * 24 * 60 * 60 * 1000 - jitterMs) });
    }
  }
  if (viewRows.length > 0) {
    await prisma.articleView.createMany({ data: viewRows });
  }

  // --- Newsletter subscribers ---
  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: "reader1@example.com" },
      { email: "reader2@example.com" },
      { email: "reader3@example.com" },
      { email: "reader4@example.com" },
    ],
  });

  // --- Settings ---
  await prisma.setting.createMany({
    data: [
      { key: "announcementText", value: "New: The Future of Work collection is live — five stories on how work is being rebuilt." },
      { key: "tagline", value: "Reporting on the ideas, people, and systems shaping what comes next." },
    ],
  });

  console.log(`Seeded ${articles.length + 2} articles, ${authorsCount(categories)} categories, ${tags.length} tags, ${collections.length} collections.`);
  console.log("Admin login: admin@monument.dev / Monument#2026");
}

function authorsCount(categories: any[]) {
  return categories.length;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
