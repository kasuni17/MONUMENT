import { Story } from './types'

export const scienceStories: Story[] = [
  {
    slug: 'what-the-lab-notebook-still-does-better',
    title: 'What the lab notebook still does better',
    subtitle: 'Paper, in an entirely digital discipline',
    excerpt:
      'Electronic lab notebooks are mandatory in most institutions and almost universally disliked. The paper notebook keeps surviving alongside them, for reasons researchers describe with unusual precision.',
    categoryId: 'c7', authorId: 'a7', tagIds: ['t33', 't11'], daysAgo: 6, views: 15480,
    featured: true,
    imageKey: 'science-lab-notebook',
    imageAlt: 'A researcher in a white coat working in a laboratory',
    sections: [
      {
        paragraphs: [
          'Every serious laboratory now runs an electronic notebook system, generally because a funder or regulator requires one. Ask the people using them and the reviews are consistent: adequate for compliance, poor for thinking.',
          'The paper notebook persists next to it, unofficially, and researchers are precise about what it does better.',
        ],
      },
      {
        heading: 'Thinking has a different shape from recording',
        paragraphs: [
          'A structured form asks for a completed thought. A blank page accepts a half-formed one: a sketch, an arrow, a question in the margin, three crossed-out numbers next to the one that worked.',
          'That messiness is not sentimentality. Several researchers described going back through old notebooks specifically for the crossings-out, because the record of what failed is frequently the more useful document.',
        ],
      },
      {
        heading: 'What the digital version genuinely wins',
        paragraphs: [
          'Search, mostly, and it is not a small advantage. Finding a protocol from three years ago in a paper archive is an afternoon. Finding it in a database is a query.',
          'The pattern most labs settle into is unglamorous and works: think on paper, record in the system, and accept that the two documents are doing different jobs.',
        ],
      },
    ],
    quote: {
      text: 'The system holds what we did. The notebook holds what we were thinking while we did it, and only one of those is searchable.',
    },
    list: {
      title: 'What paper keeps doing better',
      items: [
        'Accepting a half-formed thought without a required field',
        'Sketches and diagrams drawn at the speed of the idea',
        'A visible record of what was tried and abandoned',
        'Working without a login during a long experiment',
      ],
    },
    callout:
      'Compliance requirements are real and paper alone does not satisfy them. Nobody in this piece is arguing for abandoning the electronic record.',
    closing:
      'The notebook survived because thinking and recording are separate activities, and a tool designed carefully for one is usually poor at the other.',
  },
  {
    slug: 'the-long-wait-between-discovery-and-use',
    title: 'The long wait between discovery and use',
    subtitle: 'Twenty years, in the ordinary case',
    excerpt:
      'The gap between a laboratory result and anything that reaches a person is usually measured in decades. Understanding what happens in that gap explains most of the public frustration with science reporting.',
    categoryId: 'c7', authorId: 'a7', tagIds: ['t34', 't33'], daysAgo: 14, views: 17920,
    imageKey: 'science-discovery-wait',
    imageAlt: 'A researcher working at a microscope on a laboratory bench',
    sections: [
      {
        paragraphs: [
          'A finding is announced. Coverage follows, usually with a photograph of a pipette and a headline containing the word breakthrough. Then, for most results, nothing visible happens for fifteen or twenty years.',
          'That silence is where the actual work happens, and it is almost entirely unreported because it consists of replication, scale-up, safety testing and failure.',
        ],
      },
      {
        heading: 'Most of the gap is not bureaucracy',
        paragraphs: [
          'The usual explanation offered is regulation, and regulation is part of it. The larger part is that a result which works once, in one laboratory, in ideal conditions, has to be made to work reliably, at volume, by people who did not discover it.',
          'Each of those steps has its own failure rate, and the compounding is brutal. The majority of promising results do not fail dramatically. They fail at scale-up, quietly, and no one writes about it.',
        ],
      },
      {
        heading: 'What better coverage would look like',
        paragraphs: [
          'The most useful thing a report can include is where a result sits on that path: first demonstration, replicated, in animals, in humans, in manufacture. It is one sentence and it changes the entire meaning of the story.',
          'Researchers are generally happy to supply it. They are rarely asked, because it makes a headline considerably less exciting.',
        ],
      },
    ],
    quote: {
      text: 'We did not fail. We are on year eleven of the boring part, which is the part nobody writes about and the part that decides everything.',
    },
    list: {
      title: 'The stages a result has to survive',
      items: [
        'Independent replication by a lab with no stake in it',
        'Scale-up from a bench quantity to a useful one',
        'Safety and regulatory testing, in sequence',
        'Manufacture by people who did not invent it',
      ],
    },
    callout:
      'Slow does not mean broken. A discipline that moved a result from bench to public in two years would be one that had stopped checking.',
    closing:
      'The honest version of a science story usually includes a number: how many years, and how many stages, still stand between this result and anything you will encounter.',
  },
  {
    slug: 'how-researchers-taught-machines-to-smell',
    title: 'How researchers taught machines to smell',
    subtitle: 'The last sense to be digitised',
    excerpt:
      'Vision and hearing were solved computationally years ago. Smell resisted, until researchers stopped trying to explain it chemically and started modelling how people describe it.',
    categoryId: 'c7', authorId: 'a7', tagIds: ['t1', 't32', 't34'], daysAgo: 22, views: 13920,
    imageKey: 'science-digital-smell',
    imageAlt: 'A glass flask of amber liquid on a laboratory bench',
    sections: [
      {
        paragraphs: [
          'Computers learned to recognise images and transcribe speech well over a decade ago. Smell stayed stubbornly out of reach, and the reason is a genuinely interesting scientific problem rather than a lack of effort.',
          'Molecules with nearly identical structures can smell completely different, and molecules with nothing structurally in common can smell almost the same. A model built on chemistry alone was working from the wrong map.',
        ],
      },
      {
        heading: 'Modelling perception instead',
        paragraphs: [
          'The approach that moved things forward trains on how people actually describe and rate thousands of scents, building a map of smell from perception rather than from first principles.',
          'This is closer to how vision models learned from labelled images than to a theory of light, and the same trade applies: the model predicts well and explains very little about why.',
        ],
      },
      {
        heading: 'Where it is being used',
        paragraphs: [
          'The applications are practical rather than exotic. Quality control in flavour and fragrance manufacturing, industrial and environmental monitoring, and early-stage research into diagnostic scent signatures.',
          'The consumer version, a device that reproduces smell, remains as far away as it has been for thirty years, for reasons that are engineering rather than perceptual.',
        ],
      },
    ],
    quote: {
      text: 'We stopped trying to explain why things smell the way they do, and started predicting how a person would describe it. Progress arrived almost immediately.',
    },
    list: {
      title: 'Where digital olfaction is applied first',
      items: [
        'Quality control in fragrance and flavour production',
        'Industrial and environmental gas monitoring',
        'Early research into diagnostic scent signatures',
        'Formulation testing that currently needs a trained panel',
      ],
    },
    callout:
      'A model that predicts without explaining is useful and limited. It can tell a manufacturer that a batch is wrong, and cannot tell a chemist why.',
    closing:
      'Smell may be the last major sense to go digital, and getting there required a concession: that describing a perception accurately mattered more than explaining the chemistry underneath it.',
  },
  {
    slug: 'the-fieldwork-that-does-not-fit-the-grant',
    title: 'The fieldwork that does not fit the grant',
    subtitle: 'Long-term observation, on three-year funding',
    excerpt:
      'Some of the most valuable datasets in ecology exist because somebody kept counting the same thing for forty years. Almost no current funding structure would allow that to start today.',
    categoryId: 'c7', authorId: 'a7', tagIds: ['t30', 't32', 't29'], daysAgo: 31, views: 10640,
    imageKey: 'science-field-research',
    imageAlt: 'A researcher working at a bench of instruments outdoors',
    sections: [
      {
        paragraphs: [
          'The long-running ecological datasets that underpin most of what is known about environmental change share an origin story: one person, or one small group, deciding to count the same thing in the same place, every year, for decades.',
          'Ask how such a project would be funded now and the answers get uncomfortable. Three-year cycles, novelty requirements and impact statements are a poor fit for a study whose value only appears in year twenty-five.',
        ],
      },
      {
        heading: 'The value is in the boredom',
        paragraphs: [
          'A long series is valuable precisely because nothing about the method changed. Every improvement to the protocol breaks comparability with everything before it, which puts these projects in permanent tension with a system that rewards innovation.',
          'The people who maintain them describe an enormous amount of unpaid persistence: recording continued through funding gaps, retirements and, in several documented cases, by volunteers after the original researcher died.',
        ],
      },
    ],
    quote: {
      text: 'Nobody gets a grant to do the same thing for the fortieth time. That is exactly why the fortieth year is the valuable one.',
    },
    list: {
      title: 'Why long series are hard to fund',
      items: [
        'Funding cycles far shorter than the useful lifetime',
        'Novelty requirements that penalise repetition',
        'Method improvements that break comparability',
        'Value that only becomes visible decades later',
      ],
    },
    callout:
      'Some national programmes do fund long-term monitoring properly. They are the exception, and they are usually the first line examined when a budget tightens.',
    closing:
      'The most useful environmental data we have came from people doing something repetitive for longer than any grant would cover. Whether that keeps happening is a funding decision, not a scientific one.',
  },
]
