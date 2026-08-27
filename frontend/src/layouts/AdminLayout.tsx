import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, PlusCircle, FolderTree, Tag, Users2, Layers,
  MessageSquare, Image as ImageIcon, Users, BarChart3, Settings, ExternalLink,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
  adminOnly?: boolean;
}

const NAV_SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard, end: true },
      { label: "Articles", href: "/admin/articles", icon: FileText },
      { label: "Create Article", href: "/admin/articles/new", icon: PlusCircle },
      { label: "Categories", href: "/admin/categories", icon: FolderTree },
      { label: "Tags", href: "/admin/tags", icon: Tag },
      { label: "Authors", href: "/admin/authors", icon: Users2 },
      { label: "Collections", href: "/admin/collections", icon: Layers },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Comments", href: "/admin/comments", icon: MessageSquare },
      { label: "Media", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Users", href: "/admin/users", icon: Users, adminOnly: true },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Settings", href: "/admin/settings", icon: Settings, adminOnly: true },
    ],
  },
];

function breadcrumbFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean).slice(1);
  if (parts.length === 0) return "Dashboard";
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" / ");
}

export function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#F5F5F3] text-[#16161A] font-sans">
      <aside className="w-64 shrink-0 bg-[#16161A] text-[#E9E9EC] flex flex-col fixed inset-y-0 left-0 overflow-y-auto">
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/" className="font-serif text-lg font-semibold tracking-tight">
            MONUMENT <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-white/40 align-middle ml-1">CMS</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-5 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-white/35 mb-2">{section.label}</p>
              <div className="space-y-0.5">
                {section.items
                  .filter((item) => !item.adminOnly || user?.role === "ADMIN")
                  .map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 text-sm rounded-sm transition-colors ${
                          isActive ? "bg-white/10 text-white font-medium" : "text-white/60 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <item.icon size={15} />
                      {item.label}
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 shrink-0">
          <Link to="/" target="_blank" className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors">
            <ExternalLink size={13} /> View public site
          </Link>
        </div>
      </aside>

      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-[#E4E4E1] flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <p className="text-sm text-[#6B6B70]">
            Admin <span className="mx-1.5">/</span> <span className="text-[#16161A] font-medium">{breadcrumbFromPath(location.pathname)}</span>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wide bg-[#16161A] text-white px-2 py-1 rounded-sm">
              {user?.role}
            </span>
          </div>
        </header>
        <main className="flex-1 p-8 max-w-[1400px] w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
