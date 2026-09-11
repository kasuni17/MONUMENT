import { Comment } from '@/types'
import { posts } from './posts'

const names = [
  'Grace Okonkwo', 'Liam Fitzgerald', 'Sofia Marchetti', 'Arjun Mehta', 'Hana Kobayashi',
  'Tomas Novak', 'Camille Dubois', 'Ivan Petrov', 'Aaliyah Brooks', 'Erik Johansson',
  'Nadia Rahman', 'Diego Fernandez', 'Willa Sinclair', 'Kwame Asante', 'Lucia Moreno',
  'Ben Whitfield', 'Anya Volkov', 'Marcus Chen', 'Fatima Al-Sayed', 'Rowan Blake',
]

const bodies = [
  'This matches what I have been seeing at my own company almost exactly. Good to see it written up clearly.',
  'I appreciated the nuance here, most coverage of this topic goes for the easy headline instead.',
  'Not sure I fully agree, but this gave me a lot to think about. Following this closely.',
  'Would love a follow-up piece that goes deeper into the data behind this.',
  'This is the first explanation of this that has actually made sense to me.',
  'Sharing this with my whole team. The framing in the middle section is spot on.',
  'Counterpoint: I think this undersells how much this varies by industry, but a fair overview.',
  'Genuinely changed how I am thinking about this. Thank you for writing it.',
  'The quote from the second half really stuck with me.',
  'This tracks with a conversation I had last week almost word for word.',
  'Curious how this holds up outside the specific examples given here.',
  'One of the better pieces I have read on this in a while.',
]

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

export const comments: Comment[] = []

let counter = 0
posts.slice(0, 18).forEach((post, postIdx) => {
  const count = 2 + (postIdx % 4)
  for (let i = 0; i < count; i++) {
    counter++
    const seed = postIdx * 7 + i * 3
    const daysAfterPublish = 1 + (seed % 6)
    const date = new Date(post.publishedAt)
    date.setDate(date.getDate() + daysAfterPublish)
    comments.push({
      id: `cm${counter}`,
      postId: post.id,
      authorName: pick(names, seed),
      authorEmail: `${pick(names, seed).toLowerCase().replace(/\s+/g, '.')}@example.com`,
      text: pick(bodies, seed + i),
      date: date.toISOString(),
      status: counter % 9 === 0 ? 'pending' : counter % 13 === 0 ? 'hidden' : 'approved',
    })
  }
})

export function getCommentsByPost(postId: string): Comment[] {
  return comments.filter((c) => c.postId === postId && c.status === 'approved')
}
