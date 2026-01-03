"use client";

import { useState } from "react";
import { User, Settings, LogOut } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-full bg-cyan-500 text-black font-bold"
      >
        A
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-[#0f1224] border border-white/10 rounded-lg shadow-lg">
          <button className="flex items-center gap-2 p-3 w-full hover:bg-white/5">
            <User size={16} /> Profile
          </button>
          <button className="flex items-center gap-2 p-3 w-full hover:bg-white/5">
            <Settings size={16} /> Settings
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 p-3 w-full text-red-400 hover:bg-white/5"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
