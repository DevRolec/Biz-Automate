"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingCart, FileText } from "lucide-react";

const nav = [
  {
    title: "Dashboard",
    items: [{ label: "Overview", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Management",
    items: [
      { label: "Leads", href: "/dashboard/leads", icon: Users },
      { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { label: "Logs", href: "/dashboard/logs", icon: FileText },
    ],
  },
];

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:relative z-50
          w-64 h-screen shrink-0
          bg-[#020617] border-r border-white/5
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="px-6 py-6 text-xl font-bold">
          Wap-Biz <span className="text-cyan-400">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-8">
          {nav.map((group) => (
            <div key={group.title}>
              <p className="text-xs uppercase text-gray-500 mb-3 px-2">
                {group.title}
              </p>

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg
                        text-sm transition
                        ${
                          active
                            ? "bg-cyan-500/15 text-cyan-400"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }
                      `}
                    >
                      <Icon size={18} />
                      {item.label}
                    </Link>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
