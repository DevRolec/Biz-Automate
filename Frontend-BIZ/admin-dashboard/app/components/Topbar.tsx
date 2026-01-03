"use client";

import { Search, Menu, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NotificationBell from "./NotificationBell";

export default function Topbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  return (
    <header
      className="h-16 px-6 flex items-center justify-between
      bg-gradient-to-r from-[#0f1224] to-[#11152d]
      border-b border-white/10"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 w-full max-w-md">
        {/* Mobile menu */}
        <button onClick={onToggleSidebar} className="md:hidden text-gray-300">
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg w-72">
          <Search size={16} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearch}
            placeholder="Search leads, orders, logs…"
            className="bg-transparent text-sm outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <NotificationBell />

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="w-8 h-8 rounded-full bg-cyan-500
            flex items-center justify-center text-black
            font-semibold cursor-pointer"
          >
            A
          </div>

          {openProfile && (
            <div
              className="absolute right-0 mt-3 w-44 rounded-xl
              bg-[#0f1224] border border-white/10 shadow-xl"
            >
              <MenuItem
                icon={<User size={16} />}
                label="Profile"
                onClick={() => {
                  setOpenProfile(false);
                  router.push("/dashboard/profile");
                }}
              />
              <MenuItem
                icon={<Settings size={16} />}
                label="Settings"
                onClick={() => {
                  setOpenProfile(false);
                  router.push("/dashboard/settings");
                }}
              />
              <MenuItem
                icon={<LogOut size={16} />}
                label="Logout"
                danger
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({
  icon,
  label,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center gap-3 text-sm
      hover:bg-white/5 transition
      ${danger ? "text-red-400" : "text-gray-300"}`}
    >
      {icon}
      {label}
    </button>
  );
}
