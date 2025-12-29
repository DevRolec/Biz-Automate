"use client";

import { Search, Bell, Settings, LogOut, User } from "lucide-react";
import { useState } from "react";
import NotificationBell from "./NotificationBell";

export default function Topbar() {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <header
      className="h-16 px-6 flex items-center justify-between
      bg-gradient-to-r from-[#0f1224] to-[#11152d]
      border-b border-white/10"
    >
      {/* LEFT: Global Search */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          placeholder="Search phone, lead, intent…"
          className="w-full bg-transparent text-sm text-white placeholder-gray-400
          outline-none"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <NotificationBell />

        {/* Profile */}
        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-full bg-cyan-500
              flex items-center justify-center text-black font-semibold"
            >
              A
            </div>
          </div>

          {/* Dropdown */}
          {openProfile && (
            <div
              className="absolute right-0 mt-3 w-44 rounded-xl
              bg-[#0f1224] border border-white/10 shadow-xl overflow-hidden"
            >
              <MenuItem icon={<User size={16} />} label="Profile" />
              <MenuItem icon={<Settings size={16} />} label="Settings" />
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
