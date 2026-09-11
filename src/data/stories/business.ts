import { Story } from './types'

export const businessStories: Story[] = [
  {
    slug: 'the-new-economics-of-waiting',
    title: 'The new economics of waiting',
    subtitle: 'How scarcity turned into a growth strategy',
    excerpt:
      'A waitlist used to mean a business had failed to keep up with demand. Now it is a line item in the marketing plan, defended in meetings, and protected long after the capacity problem has been solved.',
    categoryId: 'c4', authorId: 'a4', tagIds: ['t19', 't21', 't20'], daysAgo: 4, views: 29030,
    featured: true,
    imageKey: 'business-economics-waiting',
    imageAlt: 'Crowds moving along a wet city shopping street',
    inlineImageKey: 'inline-business-waiting',
    inlineImageAlt: 'A plain wall clock above an empty waiting area',
    inlineCaption: 'The wait is no longer an operational failure. In some categories it is the pitch.',
    sections: [
      {
        paragraphs: [
          'A waitlist used to be an admission. It meant a business had misjudged demand, under-invested in capacity, or both, and every week on the list was a week of revenue walking away. Founders apologised for it.',
          'That has inverted. Waitlists are now built deliberately, announced proudly, and in several categories maintained well past the point where the underlying constraint has gone away.',
        ],
      },
      {
        heading: 'Why the signal works',
        paragraphs: [
          'The logic is uncomfortable but sound. A visible queue is a claim about demand that the business is not making itself, which is precisely what makes it credible. No advertisement can buy that structure.',
          'Software companies with essentially no marginal cost per customer have adopted the tactic most enthusiastically, which is the clearest evidence that the scarcity is a message rather than a constraint.',
        ],
      },
      {
        heading: 'The point where it curdles',
        paragraphs: [
          'The failure mode is well documented and rarely avoided. A queue that outlasts its credibility stops reading as demand and starts reading as incompetence, and the switch happens faster than most teams expect.',
          'The businesses that handle this well tie the waitlist to a specific, stated constraint, and dismantle it the moment that constraint is gone. The ones that do not end up defending a queue that no longer means anything, to customers who have started to notice.',
        ],
      },
      {
        heading: 'Who pays for the queue',
        paragraphs: [
          'The cost of a manufactured wait is not evenly distributed. Customers with flexible schedules and disposable income treat a six-week list as anticipation. Customers without either treat it as exclusion, and quietly go elsewhere, which is a segmentation decision whether or not anybody described it that way in the meeting.',
          'Staff absorb the rest. Front-of-house teams at these businesses spend a substantial share of their week managing the emotional consequences of a policy they did not set, which is rarely modelled as a cost anywhere in the plan.',
        ],
      },
    ],
    quote: {
      text: 'A waitlist is the only advertising your customers write for you, and the only one they will resent if it turns out to be theatre.',
    },
    list: {
      title: 'Where deliberate scarcity turns up now',
      items: [
        'Invite-only launches for products with no real capacity ceiling',
        'Fixed-quantity production runs of physical goods',
        'Membership communities with intentionally narrow intake windows',
        'Booking systems that release tables only two weeks out',
      ],
    },
    callout:
      'Scarcity only works when the product can eventually justify the wait. Otherwise the queue simply gives people a long time to build expectations the business cannot meet.',
    closing:
      'The interesting question is not whether waiting sells. It plainly does. It is what happens to a brand the first time a customer reaches the front and finds the wait was the best part.',
  },
  {
    slug: 'why-some-companies-refuse-to-scale',
    title: 'Why some companies refuse to scale',
    subtitle: 'Growth as a choice rather than an obligation',
    excerpt:
      'A shop with eleven staff, thirty years of trading and no plans to open a second location is not a failed business. A generation of owners is arguing that it might be the successful one.',
    categoryId: 'c4', authorId: 'a11', tagIds: ['t21', 't36', 't19'], daysAgo: 8, views: 18760,
    editorsPick: true,
    imageKey: 'business-refuse-to-scale',
    imageAlt: 'Workers in a small workshop among stacked materials',
    sections: [
      {
        paragraphs: [
          'The default story about a good business is that it becomes a bigger business. Second location, third, regional, national. Owners who decline that path are usually described as lacking ambition, which they find both inaccurate and slightly insulting.',
          'Ask them directly and the reasoning is specific rather than sentimental. Every one of them has watched a peer expand and lose the thing that made the original work.',
        ],
      },
      {
        heading: 'What gets lost in the second location',
        paragraphs: [
          'The first shop runs on the owner judgment applied hundreds of times a day: which supplier to trust, which customer to extend credit to, when to close early. The second shop cannot run on that, because the owner is not in it, so the judgment has to be converted into rules.',
          'The rules are always worse than the judgment. Not catastrophically, just slightly, and the gap compounds until the thing customers valued has quietly become a policy manual.',
        ],
      },
      {
        heading: 'The financial case, honestly',
        paragraphs: [
          'Staying small is not automatically more profitable. It limits the upside considerably and offers no protection from a bad year. What it buys is a business that fits inside one person attention, which is a real asset and appears on no balance sheet.',
          'Several owners made the same point: they are not maximising anything. They are optimising for continuing to want to do this in ten years, which is a target most growth plans do not include.',
        ],
      },
    ],
    quote: {
      text: 'I could open a second shop. Then I would spend my week driving between two things I no longer do properly.',
      attribution: 'the owner of a bakery in its thirty-first year',
    },
    list: {
      title: 'What owners say they are protecting',
      items: [
        'Decisions that stay close to the people affected by them',
        'Suppliers and staff who have been there long enough to be trusted',
        'A workload that fits inside a real week',
        'The right to say no to work that does not suit them',
      ],
    },
    callout:
      'None of this generalises to every business. Some genuinely require scale to work at all. The argument is only that scale should be a decision, not an assumption.',
    closing:
      'A business that stays the same size for thirty years is not a business that stalled. It is one that arrived, which is a distinction the growth literature has almost no vocabulary for.',
  },
  {
    slug: 'the-cost-of-always-being-available',
    title: 'The cost of always being available',
    subtitle: 'What responsiveness does to the work underneath it',
    excerpt:
      'Being reachable became a proxy for being committed. The teams tracking it honestly are finding that the fastest responders are rarely the people producing the work that matters most.',
    categoryId: 'c4', authorId: 'a4', tagIds: ['t17', 't18', 't35'], daysAgo: 12, views: 26890,
    featured: true,
    imageKey: 'business-always-available',
    imageAlt: 'A single lamp lighting an otherwise dark room in the evening',
    sections: [
      {
        paragraphs: [
          'Somewhere in the transition to distributed work, responsiveness became the visible proxy for effort. Nobody can see the six hours of thinking, but everyone can see the reply that arrived in ninety seconds, and so the reply became the evidence.',
          'The problem is that the evidence is cheap to manufacture and expensive to sustain, and it rewards exactly the behaviour that makes deep work impossible.',
        ],
      },
      {
        heading: 'Availability is a tax on the whole team',
        paragraphs: [
          'A culture of instant answers does not just interrupt the person answering. It teaches everyone else to ask before thinking, because asking is now the cheaper option, which multiplies the interruptions and lowers the quality of the questions.',
          'Teams that have reversed this describe the same intervention: not a rule about response times, but the removal of the reward. Managers stopped praising speed and started asking, in public, what somebody had been able to finish.',
        ],
      },
      {
        heading: 'What replaces it',
        paragraphs: [
          'The alternative is not slower work, it is scheduled attention. Batched check-ins, an agreed definition of urgent, and a genuine escalation path for the small number of things that cannot wait four hours.',
          'The organisations doing this well are unromantic about it. Availability still matters in support, in operations, in anything with a customer waiting. The question is whether it should be the default posture of every role, and for most it plainly should not.',
        ],
      },
    ],
    quote: {
      text: 'We were rewarding the fastest typist in the company and wondering why nothing shipped.',
    },
    list: {
      title: 'Signals that responsiveness has become the product',
      items: [
        'Meetings scheduled because a written answer would take too long to wait for',
        'Praise directed at reply speed rather than finished work',
        'Nobody able to name a protected block in their own week',
        'An urgent channel that is used for everything',
      ],
    },
    callout:
      'Some roles genuinely require constant availability, and pretending otherwise is its own failure. The mistake is applying that standard to work that is judged on its depth.',
    closing:
      'Every organisation eventually chooses what it will treat as evidence of commitment. Choosing the wrong signal is not a culture problem. It is a measurement problem with a culture-shaped consequence.',
  },
  {
    slug: 'what-a-year-of-four-day-weeks-actually-changed',
    title: 'What a year of four-day weeks actually changed',
    subtitle: 'Beyond the productivity headline',
    excerpt:
      'Trial results usually get reported as output per employee. The more interesting effects showed up somewhere else entirely: in the cafes, classes and neighbourhoods that suddenly had customers on a Wednesday.',
    categoryId: 'c4', authorId: 'a14', tagIds: ['t18', 't19', 't12'], daysAgo: 18, views: 21340,
    imageKey: 'business-four-day-week',
    imageAlt: 'Two colleagues talking over a laptop at a desk',
    sections: [
      {
        paragraphs: [
          'Coverage of four-day week trials concentrates almost entirely on whether output held up. It generally did, within the limits of trials that are short, self-selected and run by employers keen for them to succeed.',
          'Less examined is what happens to a neighbourhood when a meaningful share of its residents suddenly has a free weekday, and that is where the more durable evidence has been accumulating.',
        ],
      },
      {
        heading: 'The weekday that stopped being empty',
        paragraphs: [
          'Independent cafes and shops in trial-dense areas report weekday trade rising and flattening out across the week rather than piling into evenings and Saturdays. Daytime classes, long a difficult sell, started filling.',
          'Community organisations noticed something too. Volunteering, in slow decline for decades, ticked upward modestly in some trial regions. An unstructured day appears to get spent differently from an extra hour after work.',
        ],
      },
      {
        heading: 'What the data cannot yet support',
        paragraphs: [
          'None of this is settled. Trials remain small, participants opt in, and the businesses reporting the change have an obvious interest in the story being true. Anyone claiming a proven societal effect is well ahead of the evidence.',
          'What can be said is narrower and still worth something: the effects of the policy do not stop at the employee, and measuring only productivity misses most of what is happening.',
        ],
      },
    ],
    quote: {
      text: 'Tuesday used to be our quietest day of the week. It now looks like a small Saturday.',
      attribution: 'a cafe owner in a city running a four-day week pilot',
    },
    list: {
      title: 'What local businesses reported',
      items: [
        'Weekday trade spread more evenly across the week',
        'Longer average visits during the middle of the day',
        'Daytime workshops and classes filling for the first time',
        'More weekday volunteering and civic participation',
      ],
    },
    callout:
      'The effect appears strongest where several large employers participate at once, which suggests a threshold rather than a gradual change.',
    closing:
      'If these trials keep expanding, the lasting story may not be output per employee at all. It may be what a city does with the time it gets back.',
  },
  {
    slug: 'the-quiet-power-of-boring-companies',
    title: 'The quiet power of boring companies',
    subtitle: 'Four percent a year, for thirty years',
    excerpt:
      'Nobody writes profiles of industrial fastener distributors. They compound anyway, and the discipline that makes them dull is precisely the discipline that keeps them alive.',
    categoryId: 'c4', authorId: 'a14', tagIds: ['t19', 't21'], daysAgo: 25, views: 13650,
    imageKey: 'business-boring-companies',
    imageAlt: 'A tower rising above a financial district in early morning fog',
    sections: [
      {
        paragraphs: [
          'The businesses that dominate financial coverage are the ones with a story: a category being invented, a founder worth quoting, a number that doubled. The businesses that quietly own their markets tend to have none of those things.',
          'They sell components, service contracts, calibration, waste handling. They grow slowly, hold their customers for decades, and are almost impossible to displace, largely because displacing them would be tedious.',
        ],
      },
      {
        heading: 'Dullness as a moat',
        paragraphs: [
          'A boring business is protected by the fact that nobody exciting wants to compete with it. There is no press cycle, no talent rush, no wave of well-funded entrants. That absence is worth more than most of the advantages that get written up as moats.',
          'The operators know exactly what they have. Several described their strategy in almost identical terms: keep the customers, keep the margin honest, and resist every invitation to become interesting.',
        ],
      },
    ],
    quote: {
      text: 'We have had the same twelve customers for eighteen years. That is not a lack of ambition, that is the entire business.',
    },
    list: {
      title: 'What durable, unfashionable businesses share',
      items: [
        'Customers with high switching costs and no reason to switch',
        'Revenue tied to maintenance rather than one-off purchase',
        'Owners who take money out rather than raising more',
        'A refusal to grow faster than they can staff',
      ],
    },
    callout:
      'Boring is not the same as safe. These businesses fail too, usually when a founder retires without a succession plan, or when the customers consolidate.',
    closing:
      'The most reliable way to build something that lasts thirty years appears to be picking a problem nobody will want to write about, and then being unreasonably good at it.',
  },
  {
    slug: 'the-family-firm-that-outlasted-four-recessions',
    title: 'The family firm that outlasted four recessions',
    subtitle: 'Succession, patience and the long view',
    excerpt:
      'Businesses handed between generations make decisions on a timescale most companies cannot access. That advantage is real, and it comes with a particular set of costs.',
    categoryId: 'c4', authorId: 'a11', tagIds: ['t20', 't21', 't11'], daysAgo: 38, views: 9450,
    imageKey: 'business-family-firms',
    imageAlt: 'The counter of a family bakery, stacked with the morning bake',
    sections: [
      {
        paragraphs: [
          'A company owned by one family for three generations plans differently, not because the people are wiser, but because the horizon is longer than anyone career. A decision that pays back in fifteen years is a normal decision rather than a heroic one.',
          'That patience shows up in unglamorous places: equipment bought outright, premises owned rather than leased, staff kept through downturns that a leaner operator would have cut through.',
        ],
      },
      {
        heading: 'The cost of the long view',
        paragraphs: [
          'The same structure that produces patience produces stagnation when it goes wrong. Family firms are notoriously slow to remove an underperforming relative, slow to adopt a method the founder distrusted, and slow to admit that a product line stopped working a decade ago.',
          'The ones that survive tend to have an outsider somewhere with genuine authority: a non-family manager, a board member, occasionally an in-law nobody can overrule on sentiment alone.',
        ],
      },
    ],
    quote: {
      text: 'My grandfather bought the building in a bad year. That single decision has carried this business through every bad year since.',
    },
    list: {
      title: 'What the long horizon makes possible',
      items: [
        'Capital spending that pays back over decades',
        'Keeping trained staff through a downturn',
        'Refusing work that would compromise a reputation slowly built',
        'Succession planned over years rather than announced in a quarter',
      ],
    },
    callout:
      'Longevity is not proof of good management. Plenty of family firms survive on an asset bought two generations ago and very little else.',
    closing:
      'What these businesses demonstrate is not sentiment about family. It is what becomes possible when the people making decisions expect to still be there when the decisions come due.',
  },
]
