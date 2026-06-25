import Link from "next/link";
import { LayoutDashboard, Music, ShoppingBag, Users, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin — OldFresco",
};

const navItems = [
  { href: "/admin", label: "DASHBOARD", icon: <LayoutDashboard size={15} /> },
  { href: "/admin/conciertos", label: "CONCIERTOS", icon: <Music size={15} /> },
  { href: "/admin/ventas", label: "VENTAS", icon: <ShoppingBag size={15} /> },
  { href: "/admin/suscriptores", label: "SUSCRIPTORES", icon: <Users size={15} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0d0d0d] border-r border-[#1e1e1e] flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#ffe600] flex items-center justify-center">
              <span className="font-display text-[#080808] text-xs font-black">OF</span>
            </div>
            <span className="font-display text-sm tracking-widest">ADMIN</span>
          </div>
          <p className="text-xs text-[#444]">Panel de control</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 font-display text-xs tracking-widest text-[#888] hover:text-[#ffe600] hover:bg-[#141414] transition-all"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e1e1e]">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#444] hover:text-[#888] transition-colors font-display tracking-widest"
          >
            <ArrowLeft size={12} /> VOLVER AL SITIO
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
