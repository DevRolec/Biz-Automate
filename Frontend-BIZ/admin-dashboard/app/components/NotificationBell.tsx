"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/admin/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(res.data);
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // live refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="text-white" />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-[#0f1224] border border-white/10 rounded-lg shadow-lg z-50">
          <div className="p-3 font-semibold text-white border-b border-white/10">
            Notifications
          </div>

          {items.map((n) => (
            <div key={n._id} className="p-3 hover:bg-white/5">
              <p className="text-sm text-white">{n.type}</p>
              <p className="text-xs text-gray-400">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
