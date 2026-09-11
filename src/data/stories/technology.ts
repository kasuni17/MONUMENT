import { Story } from './types'

export const technologyStories: Story[] = [
  {
    slug: 'why-smaller-teams-are-building-better-products',
    title: 'Why smaller teams are building better products',
    subtitle: 'A quiet shift away from headcount as a measure of ambition',
    excerpt:
      'For a decade, a company ambition was legible in its org chart: more engineers meant more roadmap. That equation is breaking down, and the teams shipping the most interesting software right now are often the smallest ones in the building.',
    categoryId: 'c1', authorId: 'a1', tagIds: ['t1', 't2', 't3'], daysAgo: 2, views: 48210,
    featured: true, editorsPick: true,
    imageKey: 'tech-small-teams',
    imageAlt: 'A small group in a glass-walled meeting room, working through something together',
    inlineImageKey: 'inline-tech-small-teams',
    inlineImageAlt: 'A whiteboard covered in sticky notes and hand-drawn arrows',
    inlineCaption: 'Planning that used to fill a quarter now fits on one wall, and gets revised weekly.',
    sections: [
      {
        paragraphs: [
          'For most of the last decade, a company ambition was legible in its org chart. More engineers meant more roadmap, more roadmap meant more relevance, and the fastest way to signal that a product mattered was to staff it heavily. That equation is breaking down, and not because anyone stopped being ambitious.',
          'The teams shipping the most interesting software right now are frequently smaller than they would have been five years ago. Not because budgets shrank, though for many of them budgets did, but because the tools available to one engineer have expanded far enough that four people can credibly do what recently took twenty.',
        ],
      },
      {
        heading: 'The constraint moved',
        paragraphs: [
          'This is not a story about layoffs, even if layoffs are part of the backdrop. It is a story about what happens when the cost of building software falls fast enough that the binding constraint shifts from execution to judgment. Knowing what to build, not whether you can build it.',
          'Talk to people inside these teams and the same details come up: fewer standups, fewer handoffs, and a much shorter distance between deciding to do something and shipping it. The speed does not come from working harder. It comes from deleting the coordination overhead that used to consume most of the week.',
          'One founder described her previous job as a company where twelve people were required to approve a change that two people had already agreed on. Her current team is nine people total. She has not missed the approvals.',
        ],
      },
      {
        heading: 'What this asks of a manager',
        paragraphs: [
          'The uncomfortable part, for anyone who has spent a career building organisations, is that the skills being rewarded have changed. Managing a large team is a real craft. Choosing not to build one, and then being right about it, is a different craft entirely, and far fewer people have practised it.',
          'Small teams also fail differently. When they stall, there is nowhere to hide the problem: no adjacent team to blame, no process to point at. Several people described that exposure as the hardest adjustment, and the most useful one.',
        ],
      },
      {
        heading: 'Where it stops working',
        paragraphs: [
          'The pattern has limits, and the people living inside it name them without prompting. Small teams struggle badly with anything requiring sustained institutional memory: a compliance regime, a hardware supply chain, a support obligation measured in years rather than weeks.',
          'They are also fragile in a specific way. A team of five has no depth on any axis, so one resignation removes an entire area of knowledge, and there is rarely a second person who can pick it up without a month of reading.',
          'The teams that have lasted longest with this structure tend to have made an unglamorous investment in documentation and in narrowing the product surface, both of which look like overhead until the week somebody leaves.',
        ],
      },
    ],
    quote: {
      text: 'The org chart used to be the roadmap. Now the roadmap is just what four people decided to do on a Tuesday.',
      attribution: 'a product lead at a twelve-person infrastructure company',
    },
    list: {
      title: 'What changed underneath the surface',
      items: [
        'Infrastructure that used to need a dedicated operations hire now configures itself',
        'AI-assisted coding compresses weeks of scaffolding into an afternoon',
        'Mature design systems make a credible interface achievable without a design team',
        'Distribution costs less, because audiences already gather on a handful of platforms',
      ],
    },
    callout:
      'None of this argues for staying small as a virtue. It argues that scale no longer arrives automatically with headcount, which is a different claim entirely.',
    closing:
      'The companies feeling this shift hardest are not the startups already built this way. They are the larger organisations still measuring progress in open requisitions, watching smaller competitors move at a pace their own process cannot legally reach.',
  },
  {
    slug: 'the-quiet-infrastructure-behind-everyday-ai',
    title: 'The quiet infrastructure behind everyday AI',
    subtitle: 'What actually happens between a prompt and an answer',
    excerpt:
      'The interesting part of modern AI is not the model. It is the unglamorous layer of caching, routing and failover that decides whether an answer arrives in two seconds or not at all.',
    categoryId: 'c1', authorId: 'a9', tagIds: ['t1', 't4', 't34'], daysAgo: 5, views: 33140,
    featured: true,
    imageKey: 'tech-ai-infrastructure',
    imageAlt: 'A dense bundle of network cabling in a machine room',
    inlineImageKey: 'inline-tech-ai-infrastructure',
    inlineImageAlt: 'A patch panel with dozens of colour-coded network cables',
    inlineCaption: 'Most of the engineering effort sits here, not in the model weights.',
    sections: [
      {
        paragraphs: [
          'Every conversation about artificial intelligence eventually becomes a conversation about models: how large, how trained, how capable. The engineers keeping these systems running describe their work almost entirely differently. To them the model is a fixed component, and the interesting problems sit around it.',
          'A single request that feels instant to a user has usually passed through a queue, a cache, a router deciding which hardware is least busy, and a fallback path waiting in case any of that fails. None of it is glamorous. All of it is the reason the product works on a Monday morning when everyone arrives at once.',
        ],
      },
      {
        heading: 'Capacity is the whole game',
        paragraphs: [
          'The scarce resource is not intelligence, it is accelerator time, and it has to be allocated between users who all believe their request is urgent. Teams describe spending far more time on scheduling and batching than on anything resembling machine learning.',
          'This produces a strange organisational shape. The people responsible for whether an AI product feels good are often not researchers at all, but infrastructure engineers who came from payments, video streaming or logistics, and who recognise the problem as one they have solved before with different cargo.',
        ],
      },
      {
        heading: 'Failure, handled gracefully',
        paragraphs: [
          'The mark of a mature system is not that nothing breaks. It is that a broken component degrades into something a user barely notices: a slightly slower response, a smaller model quietly substituted, a retry that succeeds before anyone reaches for the support link.',
          'That work is invisible by design, which is why it rarely appears in a launch announcement, and why it consumes a majority of the engineering calendar at every company doing this seriously.',
        ],
      },
    ],
    quote: {
      text: 'Nobody writes a blog post about the retry logic. The retry logic is why the product has customers.',
      attribution: 'an infrastructure engineer at a mid-sized AI company',
    },
    list: {
      title: 'The layers between a prompt and an answer',
      items: [
        'Request routing, deciding which cluster is least contended right now',
        'Caching, so a repeated question never reaches a model at all',
        'Batching, packing many small requests into one efficient pass',
        'Graceful degradation, a smaller model standing in when capacity runs short',
      ],
    },
    callout:
      'When an AI product suddenly feels worse without any announcement, the cause is far more often a capacity decision than a change to the model itself.',
    closing:
      'The next few years of progress will be visible in benchmarks, but felt in latency. Whoever gets the plumbing right will win users who never learn the plumbing exists.',
  },
  {
    slug: 'what-we-lose-when-software-becomes-invisible',
    title: 'What we lose when software becomes invisible',
    subtitle: 'Frictionless design has a bill, and it arrives later',
    excerpt:
      'Removing every visible step from an interface makes it faster to use and much harder to understand. A generation of products has optimised away the moments where people learned what was happening.',
    categoryId: 'c1', authorId: 'a1', tagIds: ['t3', 't5', 't35'], daysAgo: 9, views: 24870,
    imageKey: 'tech-invisible-software',
    imageAlt: 'A pair of hands holding a phone, the screen the only light in a dark room',
    sections: [
      {
        paragraphs: [
          'A decade of interface design has been organised around a single instruction: remove the step. Fewer taps, fewer confirmations, fewer moments where the software asks the person using it to decide anything. Measured against completion rates, the strategy worked beautifully.',
          'Measured against understanding, it did something else. When every step disappears, so does the mental model people used to build by walking through them. Ask a room of competent adults where their photographs are actually stored and watch the confidence drain out of the answers.',
        ],
      },
      {
        heading: 'The cost shows up during failure',
        paragraphs: [
          'Invisible systems are wonderful until they misbehave. A sync that silently stops, a payment that quietly retries, a permission granted three versions ago and never surfaced again. Recovering from any of these requires a model of the system that the design deliberately declined to teach.',
          'Support teams see this daily. The most common request is not help with a feature, it is help understanding what the software already did on the user behalf.',
        ],
      },
      {
        heading: 'Legibility as a feature',
        paragraphs: [
          'A handful of products have started treating comprehension as something worth spending an interaction on: an activity log written in plain language, an undo that explains what it is undoing, a settings page that tells you what a toggle will actually change.',
          'None of this means returning to confirmation dialogs for everything. It means choosing, deliberately, the few places where a person should be allowed to see the machinery.',
        ],
      },
    ],
    quote: {
      text: 'We spent five years removing steps. Then we spent two years explaining to people what had happened to their data.',
    },
    list: {
      title: 'Where a visible step still earns its place',
      items: [
        'Anything that moves money or deletes something permanently',
        'Any change to what other people can see',
        'Automatic behaviour that will keep running unattended',
        'The first time a feature does something on a person behalf',
      ],
    },
    callout:
      'Friction is not the enemy. Unexplained automation is. The distinction is the entire design problem.',
    closing:
      'The best interfaces of the next decade will probably not be the ones with the fewest steps. They will be the ones where a curious person can still find out what just happened.',
  },
  {
    slug: 'the-privacy-features-nobody-asked-for',
    title: 'The privacy features nobody asked for',
    subtitle: 'Inside the argument behind default-on encryption',
    excerpt:
      'Shipping privacy by default costs real usability, breaks support workflows and frustrates people who lose access to their own data. Teams do it anyway, and the internal case is more interesting than the feature.',
    categoryId: 'c1', authorId: 'a9', tagIds: ['t5', 't1'], daysAgo: 21, views: 14870,
    imageKey: 'tech-privacy-defaults',
    imageAlt: 'A red padlock resting on a computer keyboard',
    sections: [
      {
        paragraphs: [
          'Every privacy feature that ships switched on represents an argument somebody won inside a company, usually against a colleague with a legitimate objection. Default encryption breaks account recovery. It complicates support. It occasionally locks a paying customer out of their own archive.',
          'Teams ship it regardless, and the reasoning is rarely idealism. It is asymmetry: a privacy failure is catastrophic and permanent, while a usability failure is irritating and fixable. Once stated that plainly, the argument tends to end.',
        ],
      },
      {
        heading: 'Optional privacy is not privacy',
        paragraphs: [
          'The decisive internal statistic is almost always adoption. Made optional, protective settings are turned on by a small single-digit percentage of users, most of whom were never the people at risk. A protection that only reaches the already-cautious has not protected anyone new.',
          'That figure is what converts a philosophical debate into a product decision, and it is why the argument now usually ends with defaults rather than a preference pane.',
        ],
      },
    ],
    quote: {
      text: 'We did not ship it because it was easy. We shipped it because the version where we did not would have been indefensible within a year.',
    },
    list: {
      title: 'What tips the internal argument',
      items: [
        'Regulation in a market too large to exit',
        'A competitor who shipped first and set the expectation',
        'A past incident that made an abstract risk concrete',
        'An executive willing to absorb the support cost publicly',
      ],
    },
    callout:
      'Not every privacy feature is well designed. Some genuinely trade away usability for very little. The interesting ones are where the trade was made deliberately rather than by accident.',
    closing:
      'The features nobody notices are frequently the ones that took longest to win. That is the nature of protection: done properly, it looks like nothing happened.',
  },
  {
    slug: 'the-spreadsheet-that-quietly-runs-small-business',
    title: 'The spreadsheet that quietly runs small business',
    subtitle: 'An unglamorous tool nobody has managed to replace',
    excerpt:
      'Two decades of purpose-built software has failed to dislodge the spreadsheet from the back office of small companies. The reason is not inertia, it is that flexibility turned out to be the actual feature.',
    categoryId: 'c1', authorId: 'a11', tagIds: ['t3', 't20'], daysAgo: 27, views: 12450,
    imageKey: 'tech-spreadsheet',
    imageAlt: 'A calculator and a laptop on a desk covered in paperwork',
    sections: [
      {
        paragraphs: [
          'Software companies have spent twenty years building tools meant to replace the spreadsheet in small business operations. Inventory systems, scheduling suites, bookkeeping platforms, each arriving with a demo that made the spreadsheet look primitive. The spreadsheet is still winning.',
          'The reason is not that owners are resistant to change. It is that a spreadsheet bends to a business, while purpose-built software asks the business to bend first.',
        ],
      },
      {
        heading: 'Rigidity arrives too early',
        paragraphs: [
          'Dedicated tools encode a standard process, which is exactly what a company wants once it has one. Most small businesses, particularly in their first years, do not. Their process changes in March because a supplier changed, and again in July because a member of staff left.',
          'The products that do successfully displace spreadsheets share a trait: they keep the flexibility and add only enough structure to prevent the three or four failures that actually hurt, rather than replacing the whole way of working.',
        ],
      },
    ],
    quote: {
      text: 'We tried four different systems before going back to the spreadsheet. It was the only one that did not assume we already knew our own process.',
      attribution: 'the owner of a nine-person catering company',
    },
    list: {
      title: 'Why it stays hard to replace',
      items: [
        'It matches a process that has not stabilised yet',
        'No vendor assumptions are baked in',
        'Everyone already knows how to use it',
        'It can be inspected by eye, line by line',
      ],
    },
    callout:
      'Companies do eventually move off spreadsheets, usually once a process has held steady long enough to be worth encoding. The mistake is arriving with rigid software before that moment.',
    closing:
      'The spreadsheet is not evidence that the software industry failed. It is evidence that flexibility, which is very hard to sell in a demo, was the requirement all along.',
  },
  {
    slug: 'the-solo-founder-is-no-longer-an-outlier',
    title: 'The solo founder is no longer an outlier',
    subtitle: 'Building a real company without a cofounder',
    excerpt:
      'Investors used to treat a missing cofounder as a warning sign. A growing group of founders are building alone on purpose, and the trade-offs they describe are more interesting than the trend.',
    categoryId: 'c1', authorId: 'a1', tagIds: ['t2', 't36'], daysAgo: 33, views: 11980,
    imageKey: 'tech-unfunded-startups',
    imageAlt: 'Two people talking across a table in a small, plainly furnished office',
    sections: [
      {
        paragraphs: [
          'The cofounder search was, for years, treated as close to mandatory: a solo founder was assumed to have failed to persuade anyone else. That assumption has weakened, quietly, as the amount one determined person can build has grown.',
          'Solo founders rarely frame the choice as a rejection of partnership. They describe it as a refusal to wait. The company they wanted to start was buildable now, and finding the right person to build it with was not.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'The trade is real and the founders are candid about it. There is nobody to share the weight of a bad month, no second opinion on a decision made at eleven at night, and a much narrower bench of skills to draw on before hiring becomes necessary.',
          'What compensates is speed. Decisions that would take a pair two days of alignment take an afternoon, and the company is never waiting for a conversation to happen before it can move.',
        ],
      },
    ],
    quote: {
      text: 'I am not against cofounders. I could not find a reason to wait for one before I started.',
    },
    list: {
      title: 'What made solo building viable',
      items: [
        'AI-assisted development covering the gaps in a founder skill set',
        'Off-the-shelf tools handling functions that once needed a hire',
        'Contractor networks for specialised, occasional work',
        'Peer communities built specifically for people building alone',
      ],
    },
    callout:
      'Most successful companies still have more than one founder. The change is that building alone stopped being read as a failure of persuasion.',
    closing:
      'The solo founder is not proof that partnership is obsolete. It is proof that starting no longer requires permission from anyone, including a cofounder who has not turned up yet.',
  },
  {
    slug: 'the-developer-tools-quietly-reshaping-teams',
    title: 'The developer tools quietly reshaping teams',
    subtitle: 'What changes when one engineer can cover five specialisms',
    excerpt:
      'Deployment needed an operations hire. Testing needed its own. Both now fold into a single workflow, and the shape of an engineering team is changing to match.',
    categoryId: 'c1', authorId: 'a9', tagIds: ['t4', 't1', 't6'], daysAgo: 15, views: 17230,
    imageKey: 'tech-developer-tools',
    imageAlt: 'A developer working at a laptop late in the evening',
    sections: [
      {
        paragraphs: [
          'The most consequential tools rarely announce themselves. The current generation of developer tooling is a good example: incremental, unglamorous, and steadily rewriting who a team needs to hire.',
          'Deployment once required a specialist. Test infrastructure required another. Increasingly both fold into a single engineer existing workflow, with no dedicated person keeping them alive.',
        ],
      },
      {
        heading: 'Generalists, supported by machinery',
        paragraphs: [
          'The effect is not simply fewer people. It is a different shape: fewer specialists per layer, more engineers comfortable moving across the whole stack, and a premium on knowing which tool to reach for rather than how to build it from scratch.',
          'Deep specialists have not become unnecessary. They have moved to the edges, to the problems the tools cannot yet reach, where the work is genuinely novel rather than merely difficult.',
        ],
      },
    ],
    quote: {
      text: 'The strongest engineers on my team are not the deepest specialists any more. They are the ones who know exactly which tool to reach for, and when not to.',
    },
    list: {
      title: 'Where the compression is clearest',
      items: [
        'Provisioning and deployment',
        'Automated testing and release checks',
        'Data pipelines and reporting',
        'Internal admin tools',
      ],
    },
    callout:
      'Teams that adapted their hiring to this are moving faster with fewer people. Teams still recruiting for the old org chart are quietly falling behind and describing it as a talent problem.',
    closing:
      'Tooling has always redrawn team structure. What is unusual this time is how fast the redraw is happening, and how little of it shows up in a job title.',
  },
]
