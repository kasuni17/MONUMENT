/**
 * Deterministic monogram avatars, rendered as inline SVG data URIs. No
 * network request, no external host, identical every render.
 *
 * MONUMENT's contributors are fictional editorial personas, so attaching
 * stock photographs of real people to them would misrepresent those people.
 * A typeset monogram gives every contributor a distinct, recognisable mark
 * instead: a unique colour pairing, initials set in the display serif, and
 * a hairline rule borrowed from the masthead.
 */
const palette: Array<[string, string]> = [
  ['#8A3B2A', '#FAF7F2'],
  ['#22303A', '#F2EFE9'],
  ['#4A4033', '#F6F1E8'],
  ['#334A42', '#F1F4F0'],
  ['#403A55', '#F3F0F7'],
  ['#6B4226', '#FAF3EA'],
  ['#2F4550', '#EEF3F5'],
  ['#5B3A44', '#F8EFF1'],
  ['#3D4A2E', '#F2F5EC'],
  ['#7A5230', '#FBF4EA'],
  ['#2B3A5B', '#EDF1F8'],
  ['#553C2B', '#F7EFE7'],
  ['#354A3E', '#EFF5F1'],
  ['#5A3C55', '#F6EFF6'],
  ['#243B33', '#EDF4F0'],
]

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

export function generateAvatar(name: string, size = 240): string {
  const [bg, fg] = palette[hashString(name) % palette.length]
  const label = initials(name)
  const fontSize = Math.round(size * 0.34)
  const ruleY = Math.round(size * 0.72)
  const ruleInset = Math.round(size * 0.32)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" fill="${bg}"/>` +
    `<text x="50%" y="47%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-weight="600" letter-spacing="${size * 0.01}" font-size="${fontSize}" fill="${fg}">${label}</text>` +
    `<line x1="${ruleInset}" y1="${ruleY}" x2="${size - ruleInset}" y2="${ruleY}" stroke="${fg}" stroke-opacity="0.45" stroke-width="${Math.max(1, size * 0.006)}"/>` +
    `</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
