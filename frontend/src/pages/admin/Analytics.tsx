import { useQuery } from "@tanstack/react-query";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { api } from "@/lib/api";
import { AdminCard, AdminPageHeader, StatTile } from "@/components/admin/AdminUI";
import { formatDateShort } from "@/lib/utils";

interface Summary {
  totalArticles: number; published: number; totalUsers: number; totalBookmarks: number; totalComments: number; totalViews: number;
}
interface ViewPoint { date: string; views: number }
interface TopCategory { name: string; views: number; count: number }

export default function AdminAnalytics() {
  const { data: summary } = useQuery({ queryKey: ["admin-summary"], queryFn: () => api.get<Summary>("/analytics/summary") });
  const { data: views90 } = useQuery({ queryKey: ["admin-views-90"], queryFn: () => api.get<ViewPoint[]>("/analytics/views-over-time?days=90") });
  const { data: topCategories } = useQuery({ queryKey: ["admin-top-categories"], queryFn: () => api.get<TopCategory[]>("/analytics/top-categories") });

  const avgViewsPerArticle = summary && summary.published > 0 ? Math.round(summary.totalViews / summary.published) : 0;
  const engagementRate = summary && summary.totalViews > 0 ? (((summary.totalBookmarks + summary.totalComments) / summary.totalViews) * 100).toFixed(2) : "0";

  return (
    <div>
      <AdminPageHeader title="Analytics" description="Deeper performance metrics across the publication." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatTile label="Avg. Views / Article" value={avgViewsPerArticle.toLocaleString()} />
        <StatTile label="Engagement Rate" value={`${engagementRate}%`} sub="Bookmarks + comments / views" />
        <StatTile label="Total Bookmarks" value={summary?.totalBookmarks ?? "—"} />
        <StatTile label="Total Comments" value={summary?.totalComments ?? "—"} />
      </div>

      <AdminCard className="p-5 mb-6">
        <p className="text-sm font-semibold mb-4">Views Over 90 Days</p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={views90 || []}>
            <defs>
              <linearGradient id="views90Fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#AE4B2D" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#AE4B2D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tickFormatter={(d) => formatDateShort(d)} tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} minTickGap={40} />
            <YAxis tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip labelFormatter={(d) => formatDateShort(d as string)} contentStyle={{ fontSize: 12, borderRadius: 4 }} />
            <Area type="monotone" dataKey="views" stroke="#AE4B2D" strokeWidth={2} fill="url(#views90Fill)" />
          </AreaChart>
        </ResponsiveContainer>
      </AdminCard>

      <AdminCard className="p-5">
        <p className="text-sm font-semibold mb-4">Category Performance</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topCategories || []}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8B8B90" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
            <Bar dataKey="views" fill="#AE4B2D" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </AdminCard>
    </div>
  );
}
