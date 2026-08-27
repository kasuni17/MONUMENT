import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Save, Send, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { ArticleDetail, Category, Tag, Author } from "@/types";
import { AdminButton, AdminInput, AdminSelect, AdminTextarea, AdminCard } from "@/components/admin/AdminUI";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useToast } from "@/contexts/ToastContext";
import { slugifyClient } from "@/lib/utils";

export default function ArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [status, setStatus] = useState("DRAFT");
  const [publishedAt, setPublishedAt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [preview, setPreview] = useState(false);

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: () => api.get<Category[]>("/categories") });
  const { data: authors } = useQuery({ queryKey: ["authors"], queryFn: () => api.get<Author[]>("/authors") });
  const { data: tags } = useQuery({ queryKey: ["tags"], queryFn: () => api.get<Tag[]>("/tags") });

  useEffect(() => {
    if (!isEdit || !id) return;
    (async () => {
      try {
        // Fetch a wide range and find by id (small demo dataset; avoids needing a dedicated by-id route)
        const statuses = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"];
        for (const s of statuses) {
          const res = await api.get<{ items: ArticleDetail[] }>(`/articles?status=${s}&pageSize=100`);
          const found = res.items.find((a) => a.id === id);
          if (found) {
            const full = await api.get<ArticleDetail>(`/articles/${found.slug}`);
            setTitle(full.title);
            setSlug(full.slug);
            setSlugTouched(true);
            setSubtitle(full.subtitle || "");
            setExcerpt(full.excerpt);
            setContent(full.content);
            setCoverImage(full.coverImage);
            setCategoryId(full.category.id);
            setAuthorId(full.author.id);
            setTagIds((full.tags || []).map((t) => t.id));
            setStatus(full.status || "DRAFT");
            setPublishedAt(full.publishedAt ? full.publishedAt.slice(0, 16) : "");
            setSeoTitle(full.seoTitle || "");
            setSeoDescription(full.seoDescription || "");
            setFeatured(!!full.featured);
            break;
          }
        }
      } catch {
        toast("Could not load article", "error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEdit]);

  useEffect(() => {
    if (!slugTouched) setSlug(slugifyClient(title));
  }, [title, slugTouched]);

  function buildPayload(overrideStatus?: string) {
    return {
      title,
      slug,
      subtitle: subtitle || null,
      excerpt,
      content,
      coverImage,
      categoryId,
      authorId,
      tagIds,
      status: overrideStatus || status,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      featured,
    };
  }

  const saveMutation = useMutation({
    mutationFn: (overrideStatus?: string) =>
      isEdit ? api.put(`/articles/${id}`, buildPayload(overrideStatus)) : api.post("/articles", buildPayload(overrideStatus)),
    onSuccess: (res: any) => {
      toast(isEdit ? "Article updated" : "Article created");
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      if (!isEdit && res?.id) navigate(`/admin/articles/${res.id}/edit`, { replace: true });
    },
    onError: () => toast("Failed to save article", "error"),
  });

  const canSubmit = title.trim() && excerpt.trim() && content.trim() && coverImage.trim() && categoryId && authorId;

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{isEdit ? "Edit Article" : "Create Article"}</h1>
          <p className="text-sm text-[#6B6B70] mt-1">{isEdit ? "Update story content and metadata." : "Draft a new story for MONUMENT."}</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="secondary" onClick={() => setPreview((v) => !v)}>
            <Eye size={15} /> {preview ? "Edit" : "Preview"}
          </AdminButton>
          <AdminButton variant="secondary" disabled={!canSubmit || saveMutation.isPending} onClick={() => saveMutation.mutate("DRAFT")}>
            <Save size={15} /> Save Draft
          </AdminButton>
          <AdminButton disabled={!canSubmit || saveMutation.isPending} onClick={() => saveMutation.mutate("PUBLISHED")}>
            <Send size={15} /> Publish
          </AdminButton>
        </div>
      </div>

      {preview ? (
        <AdminCard className="p-10 max-w-3xl">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#AE4B2D]">
            {categories?.find((c) => c.id === categoryId)?.name || "Category"}
          </span>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight">{title || "Untitled Story"}</h1>
          {subtitle && <p className="mt-4 text-lg text-[#6B6B70]">{subtitle}</p>}
          {coverImage && <img src={coverImage} alt="" className="w-full aspect-[16/9] object-cover my-8" />}
          <div className="article-prose text-[17px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: content }} />
        </AdminCard>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-4">
            <AdminCard className="p-5 space-y-4">
              <AdminInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Story headline" />
              <AdminInput
                label="Slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugifyClient(e.target.value));
                }}
              />
              <AdminInput label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Optional deck / subtitle" />
              <AdminTextarea label="Excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="A short summary shown on story cards" />
              <AdminInput label="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://…" />
            </AdminCard>

            <AdminCard className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-3">Content</p>
              <RichTextEditor content={content} onChange={setContent} />
            </AdminCard>

            <AdminCard className="p-5 space-y-4">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B70]">SEO</p>
              <AdminInput label="SEO Title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder={title} />
              <AdminTextarea label="SEO Description" rows={2} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder={excerpt} />
            </AdminCard>
          </div>

          <div className="space-y-4">
            <AdminCard className="p-5 space-y-4">
              <AdminSelect label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="ARCHIVED">Archived</option>
              </AdminSelect>
              {status === "SCHEDULED" && (
                <AdminInput
                  label="Publish Date"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
              )}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                Feature on homepage
              </label>
            </AdminCard>

            <AdminCard className="p-5 space-y-4">
              <AdminSelect label="Category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select category</option>
                {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </AdminSelect>
              <AdminSelect label="Author" value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
                <option value="">Select author</option>
                {authors?.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </AdminSelect>
            </AdminCard>

            <AdminCard className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-[#6B6B70] mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags?.map((t) => {
                  const active = tagIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTagIds((prev) => (active ? prev.filter((id) => id !== t.id) : [...prev, t.id]))}
                      className={`px-2.5 py-1 text-xs rounded-sm border ${active ? "bg-[#16161A] text-white border-[#16161A]" : "border-[#D8D8D4] hover:border-[#16161A]"}`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </AdminCard>

            {!canSubmit && (
              <p className="text-xs text-[#8B8B90] flex items-center gap-1.5">
                <Calendar size={12} /> Title, excerpt, content, cover image, category, and author are required.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
