export type Role = "ADMIN" | "EDITOR" | "READER";
export type ArticleStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
  bio?: string | null;
}

export interface CategoryRef {
  id: string;
  name: string;
  slug: string;
}

export interface AuthorRef {
  id: string;
  name: string;
  slug: string;
  avatar?: string | null;
}

export interface TagRef {
  id: string;
  name: string;
  slug: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  slug: string;
  coverImage: string;
  coverImageAlt?: string | null;
  status?: ArticleStatus;
  publishedAt?: string | null;
  readingTimeMin: number;
  views: number;
  featured?: boolean;
  createdAt?: string;
  category: CategoryRef;
  author: AuthorRef;
  tags?: TagRef[];
  bookmarked?: boolean;
}

export interface ArticleDetail extends Story {
  content: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  updatedAt?: string;
  collections?: { id: string; title: string; slug: string }[];
  comments?: CommentItem[];
}

export interface CommentItem {
  id: string;
  body: string;
  status: CommentStatus;
  createdAt: string;
  user: { id: string; name: string; avatar?: string | null };
  article?: { id: string; title: string; slug: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  _count?: { articles: number };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  _count?: { articles: number };
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  avatar?: string | null;
  socialLinks?: string | null;
  _count?: { articles: number };
  articles?: Story[];
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImage?: string | null;
  _count?: { articles: number };
  articles?: Story[];
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
