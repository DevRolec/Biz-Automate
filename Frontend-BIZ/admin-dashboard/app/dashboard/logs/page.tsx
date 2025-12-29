"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";

type Log = {
  _id: string;
  phone?: string;
  type: string;
  message?: string;
  intent?: string;
  meta?: any;
  createdAt: string;
};

const COLORS: Record<string, string> = {
  INCOMING: "border-blue-500 text-blue-400",
  OUTGOING: "border-cyan-500 text-cyan-400",
  INTENT: "border-yellow-500 text-yellow-400",
  ORDER: "border-green-500 text-green-400",
  SYSTEM: "border-gray-500 text-gray-400",
};

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await api.get("/admin/logs", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        type: type || undefined,
        q: search || undefined,
      },
    });

    setLogs(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">System Logs</h1>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#1f2238] text-white px-4 py-2 rounded-lg border border-gray-700"
        >
          <option value="">All Types</option>
          <option value="INCOMING">INCOMING</option>
          <option value="OUTGOING">OUTGOING</option>
          <option value="INTENT">INTENT</option>
          <option value="ORDER">ORDER</option>
          <option value="SYSTEM">SYSTEM</option>
        </select>

        <input
          placeholder="Search phone, message, intent..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchLogs()}
          className="bg-[#1f2238] text-white px-4 py-2 rounded-lg border border-gray-700 w-72"
        />

        <button
          onClick={fetchLogs}
          className="bg-cyan-500 text-black px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-400">Loading logs…</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400">No logs found</p>
        ) : (
          logs.map((log) => (
            <div
              key={log._id}
              className={`border-l-4 ${
                COLORS[log.type]
              } bg-[#0f1224] p-4 rounded-lg`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{log.type}</span>
                <span className="text-xs text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

              {log.phone && (
                <p className="text-sm text-gray-400">📞 {log.phone}</p>
              )}

              {log.message && <p className="text-white mt-2">{log.message}</p>}

              {log.intent && (
                <p className="text-yellow-400 mt-2">Intent: {log.intent}</p>
              )}

              {log.meta && log.meta.orderId && (
                <p className="text-green-400 mt-2">
                  Order ID: {log.meta.orderId}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
