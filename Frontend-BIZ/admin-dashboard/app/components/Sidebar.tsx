import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#020617] border-r border-white/5 p-6">
      {/* Brand */}
      <div className="text-xl font-bold mb-10">
        Wap-Biz <span className="text-cyan-400">Admin</span>
      </div>

      {/* Menu */}
      <nav className="space-y-6">
        <div>
          <p className="text-xs uppercase text-gray-500 mb-3">Dashboard</p>
          <ul className="space-y-2">
            <SidebarLink href="/dashboard" label="Overview" />
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 mb-3">Management</p>
          <ul className="space-y-2">
            <SidebarLink href="/dashboard/leads" label="Leads" />
            <SidebarLink href="/dashboard/orders" label="Orders" />
            <SidebarLink href="/dashboard/logs" label="Logs" />
          </ul>
        </div>
      </nav>
    </aside>
  );
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
    >
      {label}
    </Link>
  );
}
