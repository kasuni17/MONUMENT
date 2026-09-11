import { Story } from './types'

export const architectureStories: Story[] = [
  {
    slug: 'buildings-designed-for-human-pace',
    title: 'Buildings designed for human pace',
    subtitle: 'What a facade does to the speed of a street',
    excerpt:
      'A person walks past roughly five metres of building every four seconds. Whether a street feels alive or dead is decided almost entirely by what happens across that distance.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t7', 't12', 't38'], daysAgo: 5, views: 25640,
    featured: true, editorsPick: true,
    imageKey: 'architecture-human-pace',
    imageAlt: 'A group of people walking beside a pale stone building',
    inlineImageKey: 'inline-architecture-warmth',
    inlineImageAlt: 'A timber-lined room lit from the ceiling',
    inlineCaption: 'Detail at the scale of a hand, which is the only scale a pedestrian actually meets.',
    sections: [
      {
        paragraphs: [
          'There is a measurement that explains more about street life than almost anything in the planning literature: a person on foot passes about five metres of frontage every four seconds. Everything a building does at that rhythm determines whether the walk is interesting or a chore.',
          'A street of narrow shopfronts gives a pedestrian a new thing to look at every few seconds. A single blank facade of the same length gives them ninety seconds of nothing, and people avoid it without ever articulating why.',
        ],
      },
      {
        heading: 'The ground floor decides everything',
        paragraphs: [
          'Upper storeys are largely invisible from the pavement. What registers is the first three metres: whether there are doors, whether they are used, whether anything inside is visible, whether anything is happening.',
          'This is why the same building can be a good neighbour or a dead one depending on decisions that cost very little. A service entrance placed on the main frontage kills forty metres of street for the next sixty years.',
        ],
      },
      {
        heading: 'Rhythm is cheap to design and hard to retrofit',
        paragraphs: [
          'Architects working in this way talk about frequency rather than style: a door every ten metres, a change of material, a recess deep enough to stand in out of the rain, a window at the height of an actual face.',
          'None of this is expensive at the design stage. All of it is close to impossible to add afterwards, which is why the mistakes stay in place for decades.',
        ],
      },
      {
        heading: 'The economics underneath',
        paragraphs: [
          'None of this survives contact with a valuation model on its own. Ground-floor frontage split into small units costs more to build, more to let and considerably more to manage than one large tenancy, and the extra cost lands on a developer while the benefit lands on a street.',
          'Where it does happen, something has usually forced it: a planning condition on active frontage, a landowner holding the site for decades rather than selling on completion, or a local authority prepared to take a lower receipt for a better ground floor.',
          'That is the unromantic answer to why so many new streets are dead at eye level. It is rarely a failure of taste. It is a structure in which nobody who pays for the frontage is the party who benefits from it.',
        ],
      },
    ],
    quote: {
      text: 'You do not experience a building. You experience about eight seconds of it while walking past, and that is what it should be designed for.',
      attribution: 'an architect working on high street regeneration',
    },
    list: {
      title: 'What makes a frontage work at walking speed',
      items: [
        'A door roughly every ten metres, and doors that are used',
        'Transparency at eye level rather than mirrored glass',
        'Detail small enough to reward a glance',
        'Somewhere to stand still without being in the way',
      ],
    },
    callout:
      'None of this requires ornament or historicism. Plenty of modern buildings do it well, and plenty of traditional ones fail it completely with a blank service wall.',
    closing:
      'Streets that feel alive are rarely accidents, and they are rarely about beauty. They are about a building being designed for the speed of the person walking past it.',
  },
  {
    slug: 'the-new-warmth-of-modern-architecture',
    title: 'The new warmth of modern architecture',
    subtitle: 'Timber, colour and the retreat from grey',
    excerpt:
      'The glass and grey palette that defined two decades of new building is being replaced by something softer. The reasons are structural and regulatory as much as they are aesthetic.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t7', 't29', 't10'], daysAgo: 12, views: 19870,
    featured: true,
    imageKey: 'architecture-new-warmth',
    imageAlt: 'A spiral staircase finished in timber under warm lighting',
    sections: [
      {
        paragraphs: [
          'For twenty years, new buildings arrived in the same palette: grey cladding, dark glass, a strip of accent colour to satisfy a planning condition. It photographed well and aged badly.',
          'What is replacing it is warmer and more material: exposed timber structure, clay and lime finishes, brick in colours that were unfashionable for a generation, and interiors where the structure is visible rather than boxed in.',
        ],
      },
      {
        heading: 'Carbon did as much as taste',
        paragraphs: [
          'The shift is not only a change in preference. Embodied carbon accounting has pushed engineered timber from a curiosity to a mainstream option, and once the structure is timber, the interior logic follows it.',
          'Regulation is doing the rest. Requirements around ventilation, daylight and overheating have quietly made deep, sealed, fully glazed plans harder to justify, which removes the format that produced the grey decades.',
        ],
      },
      {
        heading: 'The risk of a new uniform',
        paragraphs: [
          'The failure mode is already visible. Timber cladding applied as a surface finish over a conventional frame, with none of the structural or carbon logic, is simply the previous decade building wearing a different coat.',
          'The buildings that will hold up are the ones where the warmth is structural: where what you see is what is holding the building up.',
        ],
      },
    ],
    quote: {
      text: 'Nobody chose grey. Grey was what happened when nobody argued for anything else and the cladding contractor priced it.',
    },
    list: {
      title: 'What is driving the change',
      items: [
        'Embodied carbon accounting favouring timber structure',
        'Ventilation and overheating rules discouraging sealed glass',
        'Costs pushing schemes toward simpler, exposed construction',
        'A generation of clients who have lived with grey and disliked it',
      ],
    },
    callout:
      'Timber has real limits: fire regulation, insurance, moisture detailing and long-term maintenance are all unresolved enough to keep specialists cautious.',
    closing:
      'The warmth is welcome and the reasoning underneath it matters more. A material chosen for how it performs will outlast one chosen for how it renders.',
  },
  {
    slug: 'what-cities-get-wrong-about-density',
    title: 'What cities get wrong about density',
    subtitle: 'Tall is not the same as dense',
    excerpt:
      'The density debate is conducted almost entirely in towers, which is unfortunate, because the densest neighbourhoods most people actually enjoy are rarely more than six storeys high.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t12', 't39', 't19'], daysAgo: 18, views: 22140,
    imageKey: 'architecture-density',
    imageAlt: 'Apartment buildings among trees at dusk',
    sections: [
      {
        paragraphs: [
          'Density arguments almost always become arguments about towers, with one side promising housing and the other promising ruin. Both are debating a building type that delivers less density than people assume.',
          'The neighbourhoods people cite as their favourites, in Barcelona, Paris, Amsterdam, older parts of almost every European city, are dense without being tall: continuous frontage, four to seven storeys, small blocks and short streets.',
        ],
      },
      {
        heading: 'Where the density actually comes from',
        paragraphs: [
          'Towers need space around them for light, access and fire, which claws back much of the height. Perimeter blocks of moderate height with courtyards can reach comparable densities while producing usable streets instead of windswept gaps.',
          'They are also far cheaper per home to build and to maintain, which matters more than any design argument to whoever is paying the service charge in fifteen years.',
        ],
      },
      {
        heading: 'The argument nobody enjoys',
        paragraphs: [
          'The unpopular version of this position is that mid-rise density requires building on land currently occupied by lower density housing, which is where the political difficulty has always been and where the design argument stops helping.',
          'Pretending the choice is only between towers and nothing is the most common way this conversation avoids its real subject.',
        ],
      },
    ],
    quote: {
      text: 'Ask people to name a neighbourhood they love. Then look up how tall it is. It is almost never tall.',
    },
    list: {
      title: 'What mid-rise density gets right',
      items: [
        'Continuous street frontage instead of gaps between towers',
        'Construction costs low enough for smaller developers',
        'Stairs and courtyards that make neighbours visible to each other',
        'Buildings that can be adapted rather than only demolished',
      ],
    },
    callout:
      'Towers are not always wrong. In specific locations they are the correct answer. The error is treating them as the only lever available.',
    closing:
      'The density argument would improve enormously if it started with the neighbourhoods people already like, and worked backwards to how they were built.',
  },
  {
    slug: 'the-afterlife-of-industrial-buildings',
    title: 'The afterlife of industrial buildings',
    subtitle: 'What warehouses offer that new construction cannot',
    excerpt:
      'Old industrial buildings keep outperforming the offices and flats built to replace them. The reason is not charm. It is that they were built with no idea what they would eventually contain.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t7', 't11', 't29'], daysAgo: 25, views: 14320,
    imageKey: 'architecture-industrial-afterlife',
    imageAlt: 'A brick industrial building with tall windows',
    sections: [
      {
        paragraphs: [
          'A nineteenth century warehouse has been a warehouse, a workshop, a studio complex, an office and a set of flats, usually without structural alteration. A purpose-built office from 1995 is generally struggling to be anything other than an office from 1995.',
          'The difference is not sentiment. It is that the older building was built with generous floor-to-ceiling heights, deep structure, and no assumptions about what would happen inside it.',
        ],
      },
      {
        heading: 'Loose fit, long life',
        paragraphs: [
          'Architects call this loose fit: a building tolerant enough of different uses to survive several changes of purpose. It is expensive at the outset and pays back over a century, which is a horizon almost no development model accommodates.',
          'The retrofit case has also become a carbon case. Keeping a structure standing avoids the emissions of demolition and rebuilding, which increasingly outweighs the operational efficiency of a new building.',
        ],
      },
    ],
    quote: {
      text: 'The building did not survive because anyone loved it. It survived because it was tall enough inside to become something else four times.',
    },
    list: {
      title: 'What makes a building easy to reuse',
      items: [
        'Generous floor-to-ceiling height',
        'Structure that does not depend on internal partitions',
        'Windows large enough for uses nobody planned for',
        'A frame that can carry more load than it currently does',
      ],
    },
    callout:
      'Retrofit is not automatically cheaper or greener. A poorly insulated shell with failing services can cost more over its life than a careful replacement, and honest assessments say so.',
    closing:
      'The lesson from these buildings is not to imitate their appearance. It is to build the next generation loose enough that somebody in 2120 finds them worth keeping.',
  },
  {
    slug: 'the-staircase-as-a-social-instrument',
    title: 'The staircase as a social instrument',
    subtitle: 'Circulation space, and who bumps into whom',
    excerpt:
      'Architects spent decades minimising circulation as wasted floor area. A generation of projects is now widening it deliberately, on the argument that the corridor is where a building decides how sociable it will be.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t7', 't38', 't17'], daysAgo: 33, views: 10230,
    imageKey: 'architecture-staircase',
    imageAlt: 'The shadowed side of a concrete building and its stair',
    sections: [
      {
        paragraphs: [
          'Efficiency in building design has generally meant minimising the space that is not doing anything: corridors, stairs, lobbies, the parts a valuer counts as overhead.',
          'A number of recent projects have gone the other way, widening circulation and adding light, seating and views, on the argument that the space between rooms is where most unplanned interaction happens.',
        ],
      },
      {
        heading: 'The evidence is suggestive, not settled',
        paragraphs: [
          'Research on informal interaction consistently finds that a disproportionate share of collaboration begins in transitional space rather than in meeting rooms. How much of that generalises across building types is much less clear.',
          'Firms making this trade are betting real floor area on it, which is why the argument tends to be made carefully in front of a client.',
        ],
      },
    ],
    quote: {
      text: 'We used to ask how narrow the corridor could be. Now we ask what happens if somebody wants to stop in it.',
    },
    list: {
      title: 'Where wider circulation is being tried',
      items: [
        'Offices with daylit corridors wide enough to sit in',
        'Housing with shared landings rather than access decks',
        'Schools built around informal gathering space',
        'Hospitals reconsidering waiting as circulation, not rooms',
      ],
    },
    callout:
      'Not every building benefits. In some, minimal circulation is exactly right, and generous corridors are simply unrented floor area with better lighting.',
    closing:
      'The stair and the corridor are the parts of a building everyone uses and nobody is asked about. Treated seriously, they say more about a project values than the entrance ever does.',
  },
  {
    slug: 'reading-a-facade-in-four-details',
    title: 'Reading a facade in four details',
    subtitle: 'How to tell a considered building from a clad one',
    excerpt:
      'You can learn most of what a building is willing to spend on quality by looking at four details from the pavement, none of which appear in the marketing photographs.',
    categoryId: 'c9', authorId: 'a12', tagIds: ['t7', 't11'], daysAgo: 40, views: 8420,
    imageKey: 'architecture-facade-detail',
    imageAlt: 'Looking up at the geometric facade of a grey building',
    sections: [
      {
        paragraphs: [
          'Renders are all optimism. What tells you how a building was actually built is a small number of details that are difficult to fake and expensive to get right.',
          'They can all be seen from the street, and once noticed they are impossible to stop noticing.',
        ],
      },
      {
        heading: 'The four to look at',
        paragraphs: [
          'First, the reveal: how deep the window sits in the wall. A window flush with the surface says cladding, a window set back says a wall with thickness, which is more expensive in every direction.',
          'Second, where the material stops. A brick facade that turns the corner and becomes render is a facade, not a building. Third, the base: whether the ground meets the wall deliberately or a strip of cladding runs into the pavement.',
          'Fourth, rainwater. Whether the building has visibly been designed to handle water, with drips, throats and thresholds, or whether it will be told about water in year three by a stain running down the elevation.',
        ],
      },
    ],
    quote: {
      text: 'Look at the reveal and the base. Everything a client refused to pay for is visible in those two places.',
    },
    list: {
      title: 'Four details, from the pavement',
      items: [
        'Window reveal depth, which reveals wall thickness',
        'Whether the material turns the corner honestly',
        'How the building meets the ground',
        'Whether rainwater has been designed for',
      ],
    },
    callout:
      'A building can get all four right and still be unpleasant to use. These details tell you about construction quality, not about whether the plan works.',
    closing:
      'Architecture is often discussed as a matter of taste. A surprising amount of it is a matter of four decisions made in a value engineering meeting, and they are visible from across the road.',
  },
]
