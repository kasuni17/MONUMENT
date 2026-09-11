/**
 * MONUMENT's editorial picture library.
 *
 * Every key below is a distinct photograph, downloaded once at build time and
 * served from public/images/editorial, so the site never depends on a remote
 * image host at runtime and never shows a different picture on a refresh. No
 * two entries share a photograph: an article, a topic and a collection each
 * get their own. Alt text is written at the point of use, where the editorial
 * meaning of a picture is known.
 */
export interface EditorialImage {
  src: string
  credit: string
  /** Short factual description of the photograph, used in admin listings. */
  description: string
}

export const editorialImages = {
  'about-newsroom': { src: '/images/editorial/about-newsroom.jpg', credit: 'Greg Bulla', description: 'A pile of newspapers stacked on top of each other' },
  'about-print': { src: '/images/editorial/about-print.jpg', credit: 'Bank Phrom', description: 'printing machine' },
  'architecture-density': { src: '/images/editorial/architecture-density.jpg', credit: 'Ian ODonnell', description: 'Apartment buildings nestled among trees at dusk' },
  'architecture-facade-detail': { src: '/images/editorial/architecture-facade-detail.jpg', credit: 'Anders Jildén', description: 'low angle photography of gray building at daytime' },
  'architecture-human-pace': { src: '/images/editorial/architecture-human-pace.jpg', credit: 'Isabella Smith', description: 'group of people walking near beige structure' },
  'architecture-industrial-afterlife': { src: '/images/editorial/architecture-industrial-afterlife.jpg', credit: 'Tommy Bond', description: 'brown brick building with glass windows' },
  'architecture-new-warmth': { src: '/images/editorial/architecture-new-warmth.jpg', credit: 'Declan Sun', description: 'Modern spiral staircase with wooden accents and lighting' },
  'architecture-staircase': { src: '/images/editorial/architecture-staircase.jpg', credit: 'Anton Lammert', description: 'the shadow of a building on the side of it' },
  'business-always-available': { src: '/images/editorial/business-always-available.jpg', credit: 'the blowup', description: 'white table lamp on brown wooden table' },
  'business-boring-companies': { src: '/images/editorial/business-boring-companies.jpg', credit: 'Zetong Li', description: 'The transamerica pyramid rises above the foggy city' },
  'business-economics-waiting': { src: '/images/editorial/business-economics-waiting.jpg', credit: 'Stefan Szankowski', description: 'Crowds of people walking along a wet city shopping street' },
  'business-family-firms': { src: '/images/editorial/business-family-firms.jpg', credit: 'Elisha Terada', description: 'a bakery filled with lots of baked goods' },
  'business-four-day-week': { src: '/images/editorial/business-four-day-week.jpg', credit: 'Vitaly Gariev', description: 'Two businessmen collaborating on a laptop' },
  'business-handshake': { src: '/images/editorial/business-handshake.jpg', credit: 'Leslie Jones', description: 'man and woman sitting while talking during daytime' },
  'business-refuse-to-scale': { src: '/images/editorial/business-refuse-to-scale.jpg', credit: 'Zoshua Colah', description: 'Workers in a workshop with stacked materials' },
  'collection-attention-economy': { src: '/images/editorial/collection-attention-economy.jpg', credit: 'Bruno BD', description: 'People holding up phones to record a fire performance' },
  'collection-designing-tomorrow': { src: '/images/editorial/collection-designing-tomorrow.jpg', credit: 'Zhouxing Lu', description: 'white and brown building miniature' },
  'collection-digital-culture': { src: '/images/editorial/collection-digital-culture.jpg', credit: 'lhon karwan', description: 'Woman lying between two old televisions' },
  'collection-future-of-work': { src: '/images/editorial/collection-future-of-work.jpg', credit: 'CoWomen', description: 'a group of people sitting around a wooden table' },
  'collection-modern-travel': { src: '/images/editorial/collection-modern-travel.jpg', credit: 'Abby Rurenko', description: 'A view of a waterfall on a forested mountain through a train window' },
  'collection-slow-living': { src: '/images/editorial/collection-slow-living.jpg', credit: '五玄土 ORIENTO', description: 'A tea set with small white cups and a teapot on a wooden table' },
  'culture-bookstores': { src: '/images/editorial/culture-bookstores.jpg', credit: 'Annie Spratt', description: 'Bookshelves filled with books in a cozy bookstore' },
  'culture-independent-cinema': { src: '/images/editorial/culture-independent-cinema.jpg', credit: 'Adhitya Sibikumar', description: 'Empty cinema hall with red seats and large screen' },
  'culture-library-reading': { src: '/images/editorial/culture-library-reading.jpg', credit: 'Daniel Forsman', description: 'A bookshelf filled with colorful books' },
  'culture-museum-night': { src: '/images/editorial/culture-museum-night.jpg', credit: 'Ricardo Gomez Angel', description: 'a group of people standing around a museum' },
  'culture-paying-attention': { src: '/images/editorial/culture-paying-attention.jpg', credit: 'Zalfa Imani', description: 'woman in black coat standing in front of paintings' },
  'culture-physical-ticket': { src: '/images/editorial/culture-physical-ticket.jpg', credit: 'Nainoa Shizuru', description: 'concert photos' },
  'culture-record-shop': { src: '/images/editorial/culture-record-shop.jpg', credit: 'Clem Onojeghuo', description: 'person holding vinyl records' },
  'design-clever-logo': { src: '/images/editorial/design-clever-logo.jpg', credit: 'Theme Photos', description: 'A person using a digital drawing tablet and laptop with color swatches and markers' },
  'design-colour-swatches': { src: '/images/editorial/design-colour-swatches.jpg', credit: 'Vitaly Gariev', description: 'Artist painting with watercolors and colored pencils on wooden table' },
  'design-everyday-furniture': { src: '/images/editorial/design-everyday-furniture.jpg', credit: 'Rabie Madaci', description: 'orange plastic armchair' },
  'design-objects-that-last': { src: '/images/editorial/design-objects-that-last.jpg', credit: 'Will Suddreth', description: 'man sawing in room' },
  'design-product-studio': { src: '/images/editorial/design-product-studio.jpg', credit: 'gomi', description: 'a woman working on a project at a table' },
  'design-quiet-interiors': { src: '/images/editorial/design-quiet-interiors.jpg', credit: 'Andrew Neel', description: 'A wooden ladder, a white bar stool, and a snake plant in a room' },
  'design-typeface-decade': { src: '/images/editorial/design-typeface-decade.jpg', credit: 'Patrick Fore', description: 'brown letters decors' },
  'inline-architecture-warmth': { src: '/images/editorial/inline-architecture-warmth.jpg', credit: 'Ryunosuke Kikuno', description: 'a room with wooden walls and a light on the ceiling' },
  'inline-business-waiting': { src: '/images/editorial/inline-business-waiting.jpg', credit: 'Sam', description: 'People waiting at a train station with a large clock' },
  'inline-culture-attention': { src: '/images/editorial/inline-culture-attention.jpg', credit: 'Rohan Reddy', description: 'empty hallway with green walls' },
  'inline-culture-cinema': { src: '/images/editorial/inline-culture-cinema.jpg', credit: 'Noom Peerapong', description: 'two reels' },
  'inline-design-interiors': { src: '/images/editorial/inline-design-interiors.jpg', credit: 'Declan Sun', description: 'Sunlight streams through blue curtains onto a textured wall' },
  'inline-design-objects': { src: '/images/editorial/inline-design-objects.jpg', credit: 'Jerry Wei', description: 'Rustic park bench support in black and white' },
  'inline-lifestyle-mornings': { src: '/images/editorial/inline-lifestyle-mornings.jpg', credit: 'Brooke Lark', description: 'slice fruits on plate on near glass cups' },
  'inline-opinion-attention': { src: '/images/editorial/inline-opinion-attention.jpg', credit: 'Mauro Favaron', description: 'Elderly man reading newspaper at outdoor cafe table' },
  'inline-tech-ai-infrastructure': { src: '/images/editorial/inline-tech-ai-infrastructure.jpg', credit: 'Scott Rodgerson', description: 'a bunch of blue wires connected to each other' },
  'inline-tech-small-teams': { src: '/images/editorial/inline-tech-small-teams.jpg', credit: 'Patrick Perkins', description: 'colorful sticky notes pinned to board' },
  'inline-travel-kyoto': { src: '/images/editorial/inline-travel-kyoto.jpg', credit: 'Caleb Jack', description: 'a stone path leading to a building with a clock tower in the background' },
  'inline-travel-lisbon': { src: '/images/editorial/inline-travel-lisbon.jpg', credit: 'Louis Droege', description: 'houses near sea' },
  'lifestyle-cooking-for-one': { src: '/images/editorial/lifestyle-cooking-for-one.jpg', credit: 'Or Hakim', description: 'a person cutting up vegetables on a cutting board' },
  'lifestyle-morning-rituals': { src: '/images/editorial/lifestyle-morning-rituals.jpg', credit: 'Julian Hochgesang', description: 'green and white mug' },
  'lifestyle-neighbourhood-cafe': { src: '/images/editorial/lifestyle-neighbourhood-cafe.jpg', credit: 'Benjaminrobyn Jespersen', description: 'man making cafe latte' },
  'lifestyle-phone-at-home': { src: '/images/editorial/lifestyle-phone-at-home.jpg', credit: 'Andrei Andreew', description: 'A person walks down a snowy forest path' },
  'lifestyle-sleep-tracking': { src: '/images/editorial/lifestyle-sleep-tracking.jpg', credit: 'Jp Valery', description: 'table lamp turned-on near bed' },
  'lifestyle-slow-weekend': { src: '/images/editorial/lifestyle-slow-weekend.jpg', credit: '🔥John Rodriguez🔥', description: 'A woman with red hair hugging a person under a black blanket on a sofa' },
  'newsletter-desk': { src: '/images/editorial/newsletter-desk.jpg', credit: 'Brooke Balentine', description: 'A laptop, magazine, newspaper, and coffee on a table' },
  'opinion-attention-luxury': { src: '/images/editorial/opinion-attention-luxury.jpg', credit: 'Simon Ray', description: 'a man sitting in a chair holding a book and a pen' },
  'opinion-disagree-well': { src: '/images/editorial/opinion-disagree-well.jpg', credit: 'Priscilla Du Preez 🇨🇦', description: 'two people holding gray mugs at table' },
  'opinion-internet-promised': { src: '/images/editorial/opinion-internet-promised.jpg', credit: 'Florian Göpfert', description: 'man in black jacket and pants walking on pedestrian lane during daytime' },
  'opinion-optimize-everything': { src: '/images/editorial/opinion-optimize-everything.jpg', credit: 'Aaron Burden', description: 'fountain pen on spiral book' },
  'opinion-work-identity': { src: '/images/editorial/opinion-work-identity.jpg', credit: 'Yub 12', description: 'People look out train window at city skyline' },
  'portrait-city-window': { src: '/images/editorial/portrait-city-window.jpg', credit: 'Egor Litvinov', description: 'a woman with a green scarf on her head' },
  'portrait-editor-desk': { src: '/images/editorial/portrait-editor-desk.jpg', credit: 'Mykhaylo Kopyt', description: 'an old fashioned typewriter sitting on a desk next to a lamp' },
  'science-digital-smell': { src: '/images/editorial/science-digital-smell.jpg', credit: 'Raghav Bhasin', description: 'clear glass bottle with brown liquid' },
  'science-discovery-wait': { src: '/images/editorial/science-discovery-wait.jpg', credit: 'Navy Medicine', description: 'Man working at a microscope in a laboratory' },
  'science-field-research': { src: '/images/editorial/science-field-research.jpg', credit: 'Alesia Gritcuk', description: 'woman in white long sleeve shirt sitting on white chair' },
  'science-lab-notebook': { src: '/images/editorial/science-lab-notebook.jpg', credit: 'DIANA HAUAN', description: 'woman in white medical scrub' },
  'tech-ai-infrastructure': { src: '/images/editorial/tech-ai-infrastructure.jpg', credit: 'Taylor Vick', description: 'cable network' },
  'tech-developer-tools': { src: '/images/editorial/tech-developer-tools.jpg', credit: 'Clint Patterson', description: 'man siting facing laptop' },
  'tech-invisible-software': { src: '/images/editorial/tech-invisible-software.jpg', credit: 'Gilles Lambert', description: 'silhouette photo of person holding smartphone' },
  'tech-privacy-defaults': { src: '/images/editorial/tech-privacy-defaults.jpg', credit: 'FlyD', description: 'red padlock on black computer keyboard' },
  'tech-small-teams': { src: '/images/editorial/tech-small-teams.jpg', credit: 'Mario Gogh', description: 'group of people having a meeting' },
  'tech-spreadsheet': { src: '/images/editorial/tech-spreadsheet.jpg', credit: 'Jakub Żerdzicki', description: 'a calculator sitting on top of a table next to a laptop' },
  'tech-unfunded-startups': { src: '/images/editorial/tech-unfunded-startups.jpg', credit: 'Andreea Avramescu', description: 'man and woman sitting at table' },
  'topic-architecture': { src: '/images/editorial/topic-architecture.jpg', credit: 'Michael Seh', description: 'low angle photography of storey house' },
  'topic-business': { src: '/images/editorial/topic-business.jpg', credit: 'Robert Stump', description: 'a group of tall buildings towering up into the sky' },
  'topic-culture': { src: '/images/editorial/topic-culture.jpg', credit: 'Rob Laughter', description: 'red theater curtain' },
  'topic-design': { src: '/images/editorial/topic-design.jpg', credit: 'Mohammad Lotfian', description: 'a person making a puzzle' },
  'topic-lifestyle': { src: '/images/editorial/topic-lifestyle.jpg', credit: 'Matea Brajdić', description: 'a potted plant hanging from the side of a wall' },
  'topic-opinion': { src: '/images/editorial/topic-opinion.jpg', credit: 'Matt Quinn', description: 'people walking at walkway' },
  'topic-science': { src: '/images/editorial/topic-science.jpg', credit: 'Vasily Ledovsky', description: 'a telescope mounted to the side of a building' },
  'topic-technology': { src: '/images/editorial/topic-technology.jpg', credit: 'Umberto', description: 'blue circuit board' },
  'topic-travel': { src: '/images/editorial/topic-travel.jpg', credit: 'Andrew Ridley', description: 'concrete road between mountains' },
  'travel-coastal-road': { src: '/images/editorial/travel-coastal-road.jpg', credit: 'Nihar Reddy Jangam', description: 'Coastal road winding along a rugged cliff by the ocean' },
  'travel-feels-like-home': { src: '/images/editorial/travel-feels-like-home.jpg', credit: 'Daria S', description: 'a cobblestone street at night with lights on' },
  'travel-kyoto': { src: '/images/editorial/travel-kyoto.jpg', credit: 'Jase Bloor', description: 'Japanese lantern over city bike at nighttime' },
  'travel-lisbon': { src: '/images/editorial/travel-lisbon.jpg', credit: 'zeynep elif ozdemir', description: 'a red and white trolley on a city street' },
  'travel-long-layover': { src: '/images/editorial/travel-long-layover.jpg', credit: 'Mansur Khojaev', description: 'a plane is parked in an airport terminal' },
  'travel-market-morning': { src: '/images/editorial/travel-market-morning.jpg', credit: 'Kelvin Zyteng', description: 'A store filled with lots of different types of food' },
} as const satisfies Record<string, EditorialImage>

export type ImageKey = keyof typeof editorialImages

export function imageSrc(key: ImageKey): string {
  return editorialImages[key].src
}

export const imageKeys = Object.keys(editorialImages) as ImageKey[]
