import { editorialImages } from './images'

export interface Collection {
  id: string
  slug: string
  name: string
  /** The editorial argument the collection is making, in one or two lines. */
  description: string
  /** Longer note shown at the top of the collection page. */
  note: string
  image: string
  imageAlt: string
  /** Slugs of the stories gathered here, in reading order. */
  storySlugs: string[]
}

export const collections: Collection[] = [
  {
    id: 'col1', slug: 'the-future-of-work', name: 'The Future of Work',
    description: 'Smaller teams, shorter weeks, and a slow argument about what a career is for.',
    note: 'Six stories about work changing shape: who is hired, how availability became a proxy for commitment, and what happens to a neighbourhood when its residents get a weekday back.',
    image: editorialImages['collection-future-of-work'].src,
    imageAlt: 'A group working around a shared wooden table',
    storySlugs: [
      'why-smaller-teams-are-building-better-products',
      'the-cost-of-always-being-available',
      'what-a-year-of-four-day-weeks-actually-changed',
      'the-developer-tools-quietly-reshaping-teams',
      'what-we-talk-about-when-we-talk-about-work',
      'the-solo-founder-is-no-longer-an-outlier',
    ],
  },
  {
    id: 'col2', slug: 'designing-tomorrow', name: 'Designing Tomorrow',
    description: 'Objects, buildings and typefaces, and the decisions quietly setting the next decade.',
    note: 'What designers are choosing now, from repairable furniture to timber structure, and what those choices will look like in fifteen years when somebody has to live with them.',
    image: editorialImages['collection-designing-tomorrow'].src,
    imageAlt: 'A white and brown architectural model on a desk',
    storySlugs: [
      'the-return-of-objects-made-to-last',
      'the-new-warmth-of-modern-architecture',
      'the-new-language-of-everyday-furniture',
      'what-a-typeface-reveals-about-a-decade',
      'buildings-designed-for-human-pace',
      'the-afterlife-of-industrial-buildings',
    ],
  },
  {
    id: 'col3', slug: 'slow-living', name: 'Slow Living',
    description: 'A deliberate case for doing fewer things, with more of your attention on each.',
    note: 'Rituals, weekends and meals for one. Not a philosophy, mostly a set of small practical decisions that people have actually managed to keep.',
    image: editorialImages['collection-slow-living'].src,
    imageAlt: 'A small teapot and cups arranged on a wooden table',
    storySlugs: [
      'the-rituals-that-make-ordinary-mornings-better',
      'the-slow-pleasure-of-cooking-for-one',
      'the-weekend-that-does-not-need-planning',
      'learning-to-leave-the-phone-at-home',
      'why-quiet-interiors-are-having-a-moment',
    ],
  },
  {
    id: 'col4', slug: 'digital-culture', name: 'Digital Culture',
    description: 'What the internet became, and what people keep leaving it to look for.',
    note: 'Infrastructure, invisible software and the recurring migration to somewhere smaller. Including an honest look at why most of those migrations end where they started.',
    image: editorialImages['collection-digital-culture'].src,
    imageAlt: 'A person lying between two old television sets',
    storySlugs: [
      'the-quiet-infrastructure-behind-everyday-ai',
      'what-we-lose-when-software-becomes-invisible',
      'the-internet-we-keep-promising-ourselves',
      'the-privacy-features-nobody-asked-for',
      'we-have-forgotten-how-to-disagree-well',
    ],
  },
  {
    id: 'col5', slug: 'modern-travel', name: 'Modern Travel',
    description: 'Fewer places, more slowly, with the itinerary loosened on purpose.',
    note: 'Three days in one district, a city out of season, a ten-hour layover used properly, and the market that tells you what a place actually eats.',
    image: editorialImages['collection-modern-travel'].src,
    imageAlt: 'A forested mountainside seen through a train window',
    storySlugs: [
      'three-days-in-kyoto-without-a-checklist',
      'walking-through-lisbon-after-the-tourists-leave',
      'the-case-for-the-long-layover',
      'the-market-at-seven-in-the-morning',
      'the-road-that-is-better-than-the-destination',
      'what-makes-a-place-feel-like-home',
    ],
  },
  {
    id: 'col6', slug: 'the-attention-economy', name: 'The Attention Economy',
    description: 'Who gets to concentrate, what it costs, and who is selling the quiet back.',
    note: 'Our longest-running argument, gathered in one place: attention as a material condition rather than a personal discipline.',
    image: editorialImages['collection-attention-economy'].src,
    imageAlt: 'A crowd holding up phones to record a performance at night',
    storySlugs: [
      'attention-is-becoming-a-luxury',
      'the-case-for-paying-attention-again',
      'not-everything-needs-to-be-optimised',
      'what-a-decade-of-sleep-tracking-taught-us',
      'what-independent-cinema-still-does-better',
    ],
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}
