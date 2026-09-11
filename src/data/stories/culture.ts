import { Story } from './types'

export const cultureStories: Story[] = [
  {
    slug: 'the-case-for-paying-attention-again',
    title: 'The case for paying attention again',
    subtitle: 'Twenty minutes with one painting',
    excerpt:
      'Museums have started running sessions where visitors look at a single work for twenty minutes. It sounds like a gimmick. Everyone who has sat through one describes the same slightly uncomfortable discovery.',
    categoryId: 'c3', authorId: 'a15', tagIds: ['t35', 't14', 't16'], daysAgo: 1, views: 34650,
    featured: true, editorsPick: true,
    imageKey: 'culture-paying-attention',
    imageAlt: 'A visitor in a dark coat standing before paintings in a gallery',
    inlineImageKey: 'inline-culture-attention',
    inlineImageAlt: 'An empty gallery corridor with green walls',
    inlineCaption: 'The rooms are the same. What changes is how long anybody stays in them.',
    sections: [
      {
        paragraphs: [
          'The average time a gallery visitor spends in front of a painting has been measured repeatedly over the years, and the figure is consistently short: a handful of seconds, often less than the time spent reading the label beside it.',
          'A number of museums now run sessions built entirely around the opposite. One work, twenty minutes, no phone, a guide who says almost nothing. Participants describe the first five minutes as genuinely unpleasant.',
        ],
      },
      {
        heading: 'What happens after minute six',
        paragraphs: [
          'The reports are remarkably consistent. Boredom, then irritation, then a stretch where the eye starts finding things it had already skipped: a repainted hand, a horizon that does not line up, a face at the back doing something the rest of the picture ignores.',
          'None of this requires expertise. It requires duration, which is the one thing the surrounding culture is organised to prevent.',
        ],
      },
      {
        heading: 'Attention as a practice, not a virtue',
        paragraphs: [
          'It would be easy to turn this into a lecture about phones, and the sessions notably do not. Guides describe attention as a physical capacity: something that gets weaker without use and returns faster than most participants expect.',
          'The people running these programmes are not asking anyone to look at everything for twenty minutes. They are making a narrower case, that looking at one thing properly is a different experience from looking at forty things briefly, and that most of us have stopped having the first kind.',
        ],
      },
      {
        heading: 'Where the habit went',
        paragraphs: [
          'It is tempting to blame the phone, and the phone is certainly part of it, but gallery timings were falling before anybody carried one. The label came first: a paragraph of interpretation next to the work, which reliably takes about forty seconds to read and which visitors read instead of looking.',
          'Curators have known this for years and are divided about it. Remove the label and a first-time visitor is stranded. Keep it and most people will experience the painting as an illustration of the text beside it. The compromise now being tried in several museums is placement: the interpretation moved to a card by the door, or to the far wall, so that the first minute in front of a work is unmediated.',
          'The slow-looking sessions take that idea to its conclusion by removing the text entirely. Participants are told what the work is called and nothing else, which several described as the most uncomfortable part of the exercise and, afterwards, the most useful.',
        ],
      },
      {
        heading: 'What it is not',
        paragraphs: [
          'It would be easy to inflate this into a general theory about modern life, and the people running these programmes are careful not to. They are not claiming that attention has collapsed, that a generation cannot concentrate, or that a gallery is morally superior to a screen.',
          'The claim is smaller and better evidenced: that the capacity to look at one thing for a sustained period behaves like a physical capacity. It weakens without use, it returns with practice, and almost nobody in an average week has occasion to exercise it deliberately.',
        ],
      },
    ],
    quote: {
      text: 'For six minutes I was bored and slightly annoyed. Then the painting started giving things up, and I understood what I had been doing wrong in galleries for twenty years.',
      attribution: 'a participant in a slow-looking session',
    },
    list: {
      title: 'What people report noticing, in order',
      items: [
        'Discomfort, and a strong urge to move on',
        'The composition, once the subject stops dominating',
        'Evidence of the artist changing their mind',
        'Small details that were visible the entire time',
      ],
    },
    callout:
      'This is not an argument that every work rewards twenty minutes. Plenty do not. It is an argument that you cannot know which do at a distance of four seconds.',
    closing:
      'The gallery has not changed. The visitors have. What these sessions offer is not a new way of seeing, it is the old one, given back enough time to work.',
  },
  {
    slug: 'what-independent-cinema-still-does-better',
    title: 'What independent cinema still does better',
    subtitle: 'The programme is the product',
    excerpt:
      'Independent cinemas cannot compete on seats, sound or convenience. They compete on the one thing an algorithm has not managed to replicate: a person deciding, on purpose, what is worth showing on a Tuesday.',
    categoryId: 'c3', authorId: 'a15', tagIds: ['t14', 't37', 't13'], daysAgo: 6, views: 22150,
    featured: true,
    imageKey: 'culture-independent-cinema',
    imageAlt: 'An empty cinema auditorium with red seats facing the screen',
    inlineImageKey: 'inline-culture-cinema',
    inlineImageAlt: 'Two film reels resting on a surface',
    inlineCaption: 'Repertory programming: the oldest recommendation engine still in service.',
    sections: [
      {
        paragraphs: [
          'On every measurable dimension, the independent cinema loses. The seats are worse, the sound is older, the parking is harder, and the film is usually available at home within weeks. It should have disappeared, and in many towns it did.',
          'The ones still running have converged on the same answer, and it is not nostalgia. It is programming: a human being deciding what to show, in what order, alongside what.',
        ],
      },
      {
        heading: 'A double bill is an argument',
        paragraphs: [
          'A recommendation engine offers you more of what you already chose. A programmer puts two films next to each other and makes a claim about both. That is a fundamentally different act, and audiences can feel the difference even when they cannot name it.',
          'The best programmes are legible as an argument across a season: a run of films about work, a director shown in reverse order, a restoration paired with the film that stole from it.',
        ],
      },
      {
        heading: 'The room does the rest',
        paragraphs: [
          'The other advantage is the audience itself. Watching a comedy with two hundred strangers is a different event from watching it alone, and it is the one part of the experience that cannot be shipped to a living room at any resolution.',
          'Cinemas that lean into this, with introductions, discussions and single showings that will not repeat, report the loyalty that used to belong to a subscription.',
        ],
      },
    ],
    quote: {
      text: 'Nobody drives across town for a film they can watch on Thursday. They drive across town because somebody they trust said tonight was the night to see it.',
    },
    list: {
      title: 'What keeps an independent screen alive',
      items: [
        'Programming with a visible point of view',
        'Screenings that will not be repeated',
        'A bar or cafe that gives people a reason to stay after',
        'Membership schemes that fund the risky bookings',
      ],
    },
    callout:
      'The economics remain brutal. Most of these venues survive on volunteers, grants or a landlord who is not charging market rent, and none of that is a business model.',
    closing:
      'Independent cinema is not competing with streaming, whatever the trade press says. It is offering the thing streaming structurally cannot: a decision made by somebody, for tonight, in a room with other people.',
  },
  {
    slug: 'why-bookstores-became-meeting-places',
    title: 'Why bookstores became meeting places',
    subtitle: 'A resurgence nobody predicted a decade ago',
    excerpt:
      'Independent bookshop numbers have grown for years now, in the same high streets where other retail kept emptying. Owners are clear about why, and it has very little to do with books being sold.',
    categoryId: 'c3', authorId: 'a15', tagIds: ['t37', 't14', 't12'], daysAgo: 11, views: 19230,
    imageKey: 'culture-bookstores',
    imageAlt: 'Full bookshelves lining the walls of a small bookshop',
    sections: [
      {
        paragraphs: [
          'A decade ago the independent bookshop looked like a category with an obvious ending. The counts have risen instead, for several consecutive years, in high streets where almost everything else contracted.',
          'The explanation owners offer is not nostalgia and not loyalty. It is that a bookshop turned out to be one of the last indoor places a person can spend an hour without buying anything, and that this is now a scarce and valuable thing.',
        ],
      },
      {
        heading: 'Curation is the actual inventory',
        paragraphs: [
          'A shop with four thousand titles is not competing with a warehouse holding four million. It is competing on the claim that somebody read these and chose them, which is a promise no recommendation system has convincingly made.',
          'The handwritten shelf card, mocked for years as twee, turns out to be the most efficient trust mechanism in retail: a named human, a specific opinion, attached to a specific object.',
        ],
      },
      {
        heading: 'The room earns its rent twice',
        paragraphs: [
          'Events are now central rather than promotional. Readings, book groups, writing sessions, school visits, a children hour on Saturday morning that fills the shop with people who will return as customers for twenty years.',
          'Owners describe the economics honestly: events rarely make money directly. They make the shop a place people already have a reason to be in, which is the harder half of retail.',
        ],
      },
    ],
    quote: {
      text: 'People are not only buying a book here. They are buying the fact that somebody they trust already read it.',
      attribution: 'a bookseller in her eleventh year',
    },
    list: {
      title: 'What the surviving shops have in common',
      items: [
        'A selection small enough to be argued for, title by title',
        'Staff recommendations signed with an actual name',
        'A weekly event calendar rather than an occasional one',
        'Space to sit, whether or not anything is bought',
      ],
    },
    callout:
      'The recovery is modest against what was lost in the 2000s, and depends heavily on rent. Where landlords have raised it, the shops have closed regardless of how well they were run.',
    closing:
      'The bookshop did not survive by competing with convenience. It survived by offering the opposite, and finding out how many people had been waiting for somewhere to go.',
  },
  {
    slug: 'the-strange-persistence-of-the-physical-ticket',
    title: 'The strange persistence of the physical ticket',
    subtitle: 'Keeping the stub for an experience nobody can misplace',
    excerpt:
      'Digital entry solved a genuine problem and won completely. The paper stub came back anyway, sold as a souvenir, because a screenshot has never once been put on a wall.',
    categoryId: 'c3', authorId: 'a3', tagIds: ['t13', 't14', 't16'], daysAgo: 17, views: 12340,
    imageKey: 'culture-physical-ticket',
    imageAlt: 'A crowd lit by stage lights at a concert',
    sections: [
      {
        paragraphs: [
          'Digital ticketing solved a real problem. It cut fraud, killed the resale queue outside the venue, and removed the possibility of leaving the tickets in a coat at home. It won on every practical measure.',
          'And then the paper stub returned, not as a way in but as a thing to keep, sold separately at merchandise stands, printed after the fact for people who already scanned a phone at the door.',
        ],
      },
      {
        heading: 'Objects that prove something happened',
        paragraphs: [
          'The people who buy them describe the stub as the only surviving artefact of the evening. A phone holds the photographs, but the photographs are indistinguishable from three thousand others and will be scrolled past within a month.',
          'This mirrors a broader pattern: once an object stops being functionally necessary, it is often kept for exactly the reason it was never designed for.',
        ],
      },
    ],
    quote: {
      text: 'Nobody has ever put a screenshot on the fridge. People still keep the stub.',
    },
    list: {
      title: 'Where the physical ticket came back',
      items: [
        'Souvenir stubs sold alongside digital entry',
        'Independent cinemas printing dated tickets by hand',
        'Limited exhibition runs with numbered admissions',
        'Clubs and venues issuing collectable season passes',
      ],
    },
    callout:
      'None of these venues has gone back to paper for access control, and none of them intends to. The stub survives precisely because it no longer has a job.',
    closing:
      'The physical ticket did not outlast the digital one on merit. It outlasted it because it does something the digital version was never asked to do, which is exist afterwards.',
  },
  {
    slug: 'the-record-shop-as-a-third-place',
    title: 'The record shop as a third place',
    subtitle: 'What browsing does that searching cannot',
    excerpt:
      'Vinyl sales explain part of the record shop revival. The rest is explained by what happens when a room full of strangers spends an hour flipping through crates in no particular hurry.',
    categoryId: 'c3', authorId: 'a3', tagIds: ['t13', 't16', 't11'], daysAgo: 23, views: 10870,
    imageKey: 'culture-record-shop',
    imageAlt: 'Someone holding a record while browsing a shop crate',
    sections: [
      {
        paragraphs: [
          'The vinyl revival has been documented to exhaustion, usually in terms of sales figures and pressing plant backlogs. The more interesting part is what the shops became while that was happening.',
          'A record shop is one of very few retail spaces where standing still for forty minutes without buying anything is the expected behaviour rather than a problem for staff to address.',
        ],
      },
      {
        heading: 'Browsing is not searching',
        paragraphs: [
          'Searching returns what you asked for. Browsing returns what you did not know to ask for, in an order somebody else chose, at a pace set by your hands rather than a scroll.',
          'Regulars describe finding music they would never have typed into a box: an unfamiliar sleeve, a note from a staff member, a record filed next to something they already loved.',
        ],
      },
    ],
    quote: {
      text: 'The algorithm gives me more of what I already like. The crate gives me the thing next to it, which is where everything good has come from.',
    },
    list: {
      title: 'What the shops offer beyond stock',
      items: [
        'Listening stations that make trying something free',
        'Staff who remember what you bought last time',
        'In-store sessions from local acts',
        'A room where lingering is the point',
      ],
    },
    callout:
      'Vinyl remains expensive, and the format revival has priced out plenty of the people who kept these shops alive through the lean decades. That tension is unresolved.',
    closing:
      'What the record shop sells is not really the record. It is an hour spent in a room organised entirely around the possibility of finding something you were not looking for.',
  },
  {
    slug: 'the-library-is-quietly-doing-everything-else',
    title: 'The library is quietly doing everything else',
    subtitle: 'Warm rooms, printers, and the last free indoor space',
    excerpt:
      'Lending books is now a modest part of what a public library does. Librarians describe a job that has absorbed every service the surrounding infrastructure stopped providing.',
    categoryId: 'c3', authorId: 'a3', tagIds: ['t12', 't14', 't37'], daysAgo: 29, views: 14760,
    imageKey: 'culture-library-reading',
    imageAlt: 'Shelves of brightly coloured books in a public library',
    sections: [
      {
        paragraphs: [
          'Ask a librarian what the job involves now and books arrive somewhere in the middle of the list, after helping somebody complete a benefits form, after the printer, after the two hours a week of teaching people to use a phone they were given by a relative.',
          'This is not mission drift. It is a public building with a door that opens, staff who answer questions, and no requirement to buy anything, in a landscape where all three have become rare.',
        ],
      },
      {
        heading: 'The service of last resort',
        paragraphs: [
          'Libraries have absorbed functions that were quietly discontinued elsewhere: warm space in winter, internet access for people who have none, a legitimate address for post, quiet rooms for people studying in overcrowded housing.',
          'Librarians are ambivalent about this. They are proud of it and clear that it is the consequence of other services closing, not evidence that libraries were underused all along.',
        ],
      },
    ],
    quote: {
      text: 'We are the only building on this street where you can sit down for three hours and nobody will ask you to buy a coffee.',
    },
    list: {
      title: 'What a modern branch actually provides',
      items: [
        'Free internet and the last public printer for a mile',
        'Help with forms that are only available online',
        'Children groups that double as parent networks',
        'Quiet, heated space with no purchase required',
      ],
    },
    callout:
      'Funding for these services has generally not followed the responsibilities, which is why so much of it rests on staff working beyond their job description.',
    closing:
      'The library did not survive by defending the book. It survived by being the one institution left that assumes a person walking through the door is entitled to be there.',
  },
  {
    slug: 'the-museum-that-opens-after-dark',
    title: 'The museum that opens after dark',
    subtitle: 'Late openings, and the audience they found',
    excerpt:
      'Evening museum programmes were introduced to raise revenue. They ended up attracting an audience the institutions had spent decades failing to reach during daylight.',
    categoryId: 'c3', authorId: 'a15', tagIds: ['t13', 't14'], daysAgo: 36, views: 8640,
    imageKey: 'culture-museum-night',
    imageAlt: 'Visitors gathered in a museum hall',
    sections: [
      {
        paragraphs: [
          'Late openings started as a commercial exercise: extend the hours, add a bar, sell tickets to a demographic that will spend on a Thursday night. The revenue case worked, modestly.',
          'The audience case worked considerably better, and mostly by accident. Institutions that had run outreach programmes for years found that simply opening at seven in the evening did more than any of them.',
        ],
      },
      {
        heading: 'Opening hours as a barrier',
        paragraphs: [
          'A museum open from ten until five is, in practice, open to people who are not at work. Every access strategy written in the last thirty years addressed tone, language and price, and comparatively few addressed the clock.',
          'Curators describe evening crowds behaving differently too: slower, louder, more willing to argue about a work in front of it, and notably younger without any of the programming aimed at achieving that.',
        ],
      },
    ],
    quote: {
      text: 'We ran outreach for a decade. Then we opened at seven in the evening and met the audience we had been writing strategies about.',
    },
    list: {
      title: 'What late openings changed',
      items: [
        'A visibly wider age range through the galleries',
        'Longer average visits, with more time per room',
        'Talks and tours filling without discounting',
        'Bar and shop revenue that funds the free daytime hours',
      ],
    },
    callout:
      'Evening staffing costs are real, and the smallest institutions cannot absorb them. This is a solution available mostly to museums that already have scale.',
    closing:
      'The lesson is unglamorous and cheap to act on. Before rewriting the interpretation panels again, it is worth checking who is able to be in the building at all.',
  },
]
