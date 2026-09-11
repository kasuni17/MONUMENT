import { Author } from '@/types'
import { generateAvatar } from '@/lib/avatar'

/**
 * MONUMENT's masthead. These are fictional editorial personas written for a
 * frontend-only demo publication, not real journalists, and nothing here is
 * presented as reporting by an actual person.
 */
export const authors: Author[] = [
  {
    id: 'a10', slug: 'julia-hartmann', name: 'Julia Hartmann', role: 'Editor-in-Chief',
    bio: 'Julia started MONUMENT after a decade of magazine work, mostly spent arguing that a good story is worth three mediocre ones. She writes rarely and edits constantly, with a weakness for narrative nonfiction that takes its time.',
    location: 'Copenhagen', specialties: ['Narrative nonfiction', 'Editing', 'Publishing'],
    avatar: generateAvatar('Julia Hartmann'), email: 'julia@monument.pub', twitter: 'juliahartmann', linkedin: 'juliahartmann', status: 'active',
  },
  {
    id: 'a1', slug: 'mira-solberg', name: 'Mira Solberg', role: 'Senior Editor, Technology',
    bio: 'Mira spent six years inside product teams before she started writing about them. She is drawn to the unglamorous parts of software: the tools people build for themselves, and the decisions nobody puts in a launch post.',
    location: 'Oslo', specialties: ['Product teams', 'Developer culture', 'AI tooling'],
    avatar: generateAvatar('Mira Solberg'), email: 'mira@monument.pub', twitter: 'mirasolberg', linkedin: 'mirasolberg', status: 'active',
  },
  {
    id: 'a2', slug: 'daniel-oyelaran', name: 'Daniel Oyelaran', role: 'Design Editor',
    bio: 'Trained as an industrial designer, Daniel now writes about the objects, rooms and interfaces we stop noticing. His working theory is that most good design is invisible, and most bad design is very loud.',
    location: 'Lagos', specialties: ['Industrial design', 'Interfaces', 'Material culture'],
    avatar: generateAvatar('Daniel Oyelaran'), email: 'daniel@monument.pub', twitter: 'danoyelaran', website: 'danieloyelaran.com', status: 'active',
  },
  {
    id: 'a3', slug: 'the-anh-pham', name: 'Thế Anh Phạm', role: 'Culture Writer',
    bio: 'Thế Anh came to journalism from urban sociology and still reports like a researcher: slowly, with too many notebooks. He writes about the rituals and small subcultures that hold a city together.',
    location: 'Hanoi', specialties: ['Subcultures', 'Cities', 'Media'],
    avatar: generateAvatar('Thế Anh Phạm'), email: 'anh@monument.pub', twitter: 'theanhpham', status: 'active',
  },
  {
    id: 'a4', slug: 'renata-cabrera', name: 'Renata Cabrera', role: 'Business Editor',
    bio: 'Renata ran operations at two early-stage companies before deciding she would rather ask the questions. She covers the economics behind the businesses people actually use, and is suspicious of any strategy that only works on a slide.',
    location: 'Mexico City', specialties: ['Strategy', 'Operations', 'Economics'],
    avatar: generateAvatar('Renata Cabrera'), email: 'renata@monument.pub', linkedin: 'renatacabrera', status: 'active',
  },
  {
    id: 'a5', slug: 'oskar-lindqvist', name: 'Oskar Lindqvist', role: 'Lifestyle Editor',
    bio: 'Oskar writes about the small domestic habits that quietly decide how a week feels. He lives outside Gothenburg with two cats, a cast-iron pan he refuses to replace, and more houseplants than shelf space.',
    location: 'Gothenburg', specialties: ['Habits', 'Food', 'Home'],
    avatar: generateAvatar('Oskar Lindqvist'), email: 'oskar@monument.pub', website: 'oskarlindqvist.se', status: 'active',
  },
  {
    id: 'a6', slug: 'priya-nair', name: 'Priya Nair', role: 'Travel Editor',
    bio: 'Priya has filed from more than fifty countries and still argues that the best trip of her life was a week spent walking her own city. She edits travel writing that resists the checklist.',
    location: 'Mumbai', specialties: ['Slow travel', 'Food', 'Place'],
    avatar: generateAvatar('Priya Nair'), email: 'priya@monument.pub', twitter: 'priyanair', status: 'active',
  },
  {
    id: 'a7', slug: 'noah-fairweather', name: 'Noah Fairweather', role: 'Science Writer',
    bio: 'Noah trained as a physicist and left the lab for the notebook. He is good at explaining what a paper actually says, and better at explaining what it carefully does not.',
    location: 'Edinburgh', specialties: ['Research', 'Physics', 'Method'],
    avatar: generateAvatar('Noah Fairweather'), email: 'noah@monument.pub', linkedin: 'noahfairweather', status: 'active',
  },
  {
    id: 'a8', slug: 'esme-castillo', name: 'Esme Castillo', role: 'Opinion Editor',
    bio: 'Esme edits opinion and writes a column about work, ambition and the things worth arguing over. She has been an editor at two magazines that no longer exist, which she says taught her more than the ones that survived.',
    location: 'Lisbon', specialties: ['Argument', 'Work', 'Attention'],
    avatar: generateAvatar('Esme Castillo'), email: 'esme@monument.pub', twitter: 'esmecastillo', status: 'active',
  },
  {
    id: 'a9', slug: 'kenji-watanabe', name: 'Kenji Watanabe', role: 'Contributing Writer, Technology',
    bio: 'Kenji spent nine years shipping backend systems before he started writing about them. He is at his best explaining infrastructure that only becomes visible when it breaks.',
    location: 'Tokyo', specialties: ['Infrastructure', 'Engineering', 'Privacy'],
    avatar: generateAvatar('Kenji Watanabe'), email: 'kenji@monument.pub', website: 'kenjiwatanabe.dev', status: 'active',
  },
  {
    id: 'a11', slug: 'samuel-agyemang', name: 'Samuel Agyemang', role: 'Contributing Writer, Business',
    bio: 'Samuel reports on the businesses that never appear in a funding announcement: family firms, workshops, the shop on the corner that has outlasted four recessions.',
    location: 'Accra', specialties: ['Independent business', 'Retail', 'Labour'],
    avatar: generateAvatar('Samuel Agyemang'), email: 'samuel@monument.pub', status: 'active',
  },
  {
    id: 'a12', slug: 'nadia-silva', name: 'Nadia Silva', role: 'Architecture Editor',
    bio: 'Nadia practised for six years before moving to criticism, and still measures rooms out of habit. She writes about buildings from the pavement up, starting with how they treat the people passing by.',
    location: 'São Paulo', specialties: ['Architecture', 'Public space', 'Housing'],
    avatar: generateAvatar('Nadia Silva'), email: 'nadia@monument.pub', twitter: 'nadiasilva', website: 'nadiasilva.arq', status: 'active',
  },
  {
    id: 'a13', slug: 'amara-fernando', name: 'Amara Fernando', role: 'Travel & Society Writer',
    bio: 'Amara writes about places in transition and the people who stay through the change. Her reporting tends to begin at a bus station and end in a kitchen, three hours later than planned.',
    location: 'Colombo', specialties: ['Reportage', 'Communities', 'Travel'],
    avatar: generateAvatar('Amara Fernando'), email: 'amara@monument.pub', twitter: 'amarafernando', status: 'active',
  },
  {
    id: 'a14', slug: 'oliver-grant', name: 'Oliver Grant', role: 'Business Writer',
    bio: 'Oliver covers the unfashionable end of business: logistics, maintenance contracts, companies that grow four percent a year for thirty years. He thinks boring is the most underrated word in finance.',
    location: 'Manchester', specialties: ['Markets', 'Logistics', 'Long-term value'],
    avatar: generateAvatar('Oliver Grant'), email: 'oliver@monument.pub', linkedin: 'olivergrant', status: 'active',
  },
  {
    id: 'a15', slug: 'leah-morgan', name: 'Leah Morgan', role: 'Culture Correspondent',
    bio: 'Leah writes about how audiences actually behave: what they queue for, what they keep, and what they quietly stop showing up to. Former bookseller, permanent cinema obsessive.',
    location: 'Cardiff', specialties: ['Film', 'Books', 'Audiences'],
    avatar: generateAvatar('Leah Morgan'), email: 'leah@monument.pub', twitter: 'leahmorgan', status: 'active',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}
