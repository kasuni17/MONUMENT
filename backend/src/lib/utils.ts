export function readingTimeFromHtml(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function paginate(page?: string, pageSize?: string) {
  const take = Math.min(Math.max(parseInt(pageSize || "12", 10) || 12, 1), 50);
  const currentPage = Math.max(parseInt(page || "1", 10) || 1, 1);
  const skip = (currentPage - 1) * take;
  return { take, skip, currentPage };
}
