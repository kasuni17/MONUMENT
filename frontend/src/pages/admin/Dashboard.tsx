import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { api } from "@/lib/api";
import { AdminCard, AdminPageHeader, StatTile } from "@/components/admin/AdminUI";
import { formatDateShort } from "@/lib/utils";

interface Summary {
  totalArticles: number; published: number; drafts: number; scheduled: number;
  totalUsers: number; totalBookmarks: number; totalComments: number; totalViews: number;
}
interface ViewPoint { date: string; views: number }
interface TopArticle { id: string; title: string; views: number; category: { name: string } }
interface TopCategory { name: string; views: number; count: number }

const COLORS = ["#AE4B2D", "#C8724F", "#8A3A22", "#D9A98A", "#4A443C", "#8B8B90", "#D8D8D4", "#16161A"];

export default function Dashboard() {
  const { data: summary } = useQuery({ queryKey: ["admin-summary"], queryFn: () => api.get<Summary>("/analytics/summary") });
  const { data: viewsOverTime } = useQuery({ queryKey: ["admin-views"], queryFn: () => api.get<ViewPoint[]>("/analytics/views-over-time?days=30") });
  const { data: topArticles } = useQuery({ queryKey: ["admin-top-articles"], queryFn: () => api.get<TopArticle[]>("/analytics/top-articles") });
  const { data: topCategories } = useQuery({ queryKey: ["admin-top-categories"], queryFn: () => api.get<TopCategory[]>("/analytics/top-categories") });

  return (
    <div>
      <AdminPageHeader title="Dashboard" description="A real-time view into MONUMENT's publishing activity." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatTile label="Total Articles" value={summary?.totalArticles ?? "—"} />
        <StatTile label="Published" value={summary?.published ?? "—"} />
        <StatTile label="Drafts" value={summary?.drafts ?? "—"} />
        <StatTile label="Scheduled" value={summary?.scheduled ?? "—"} />
        <StatTile label="Total Views" value={summary?.totalViews?.toLocaleString() ?? "—"} />
        <StatTile label="Total Users" value={summary?.totalUsers ?? "—"} />
        <StatTile label="Bookmarks" value={summary?.totalBookmarks ?? "—"} />
        <StatTile label="Comments" value={summary?.totalComments ?? "—"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <AdminCard className="lg:col-span-2 p-5">
          <p className="text-sm font-semibold mb-4">Views Over Time (30 days)</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={viewsOverTime || []}>
              <defs>
                <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#AE4B2D" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#AE4B2D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(d) => formatDateShort(d)} tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} minTickGap={30} />
              <YAxis tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip labelFormatter={(d) => formatDateShort(d as string)} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
              <Area type="monotone" dataKey="views" stroke="#AE4B2D" strokeWidth={2} fill="url(#viewsFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </AdminCard>

        <AdminCard className="p-5">
          <p className="text-sm font-semibold mb-4">Top Categories</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={topCategories || []} dataKey="views" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {(topCategories || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5 max-h-24 overflow-y-auto">
            {(topCategories || []).slice(0, 5).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-[#8B8B90]">{c.views}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <AdminCard className="p-5">
        <p className="text-sm font-semibold mb-4">Top Performing Articles</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topArticles || []} layout="vertical" margin={{ left: 0 }}>
            <XAxis type="number" tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="title"
              width={220}
              tick={{ fontSize: 11, fill: "#16161A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(t: string) => (t.length > 32 ? t.slice(0, 32) + "…" : t)}
            />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
            <Bar dataKey="views" fill="#AE4B2D" radius={[0, 3, 3, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </AdminCard>
    </div>
  );
}
