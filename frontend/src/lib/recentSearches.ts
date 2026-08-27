const KEY = "monument-recent-searches";
const MAX = 6;

export function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string) {
  const trimmed = term.trim();
  if (!trimmed) return;
  try {
    const existing = getRecentSearches().filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...existing].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
