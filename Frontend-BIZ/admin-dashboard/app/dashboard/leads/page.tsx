"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";

type Lead = {
  _id: string;
  phone: string;
  name?: string;
  email?: string;
  status: "NEW" | "ENGAGED" | "ORDERED";
  lastIntent?: string;
  lastMessage?: string;
  updatedAt: string;
};

/* ---------- Status Badge ---------- */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: "bg-blue-500/20 text-blue-400",
    ENGAGED: "bg-yellow-500/20 text-yellow-400",
    ORDERED: "bg-green-500/20 text-green-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-500/20 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await api.get("/admin/leads", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        status: status || undefined,
        q: search || undefined,
      },
    });

    setLeads(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Leads</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#1f2238] text-white px-4 py-2 rounded-lg border border-gray-700"
        >
          <option value="">All Status</option>
          <option value="NEW">NEW</option>
          <option value="ENGAGED">ENGAGED</option>
          <option value="ORDERED">ORDERED</option>
        </select>

        <input
          type="text"
          placeholder="Search phone, name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
          className="bg-[#1f2238] text-white px-4 py-2 rounded-lg border border-gray-700 w-72"
        />

        <button
          onClick={fetchLeads}
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg font-medium"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0f1224] rounded-xl overflow-hidden border border-gray-800">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <div className="p-6 text-gray-400">No leads found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#151836] text-gray-400">
              <tr>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Last Intent</th>
                <th className="p-3 text-left">Last Message</th>
                <th className="p-3 text-left">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr
                  key={l._id}
                  onClick={() => setSelectedLead(l)}
                  className={`border-t border-gray-800 cursor-pointer
    hover:bg-[#14173a]
    ${selectedLead?._id === l._id ? "bg-[#1a1e4a]" : ""}
  `}
                >
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3">{l.name || "-"}</td>
                  <td className="p-3">{l.email || "-"}</td>
                  <td className="p-3">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="p-3">{l.lastIntent || "-"}</td>
                  <td className="p-3 truncate max-w-xs">
                    {l.lastMessage || "-"}
                  </td>
                  <td className="p-3">
                    {new Date(l.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusUpdated={(updated) => {
            setLeads((prev) =>
              prev.map((l) => (l._id === updated._id ? updated : l))
            );
            setSelectedLead(updated);
          }}
        />
      )}
    </div>
  );
}

function LeadDrawer({
  lead,
  onClose,
  onStatusUpdated,
}: {
  lead: any;
  onClose: () => void;
  onStatusUpdated: (lead: any) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateStatus = async (status: string) => {
    setSaving(true);
    const token = localStorage.getItem("token");

    const res = await api.patch(
      `/admin/leads/${lead._id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onStatusUpdated(res.data);
    setSaving(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0f1224] h-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Lead Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Lead Info */}
        <div className="space-y-4 text-sm">
          <Info label="Phone" value={lead.phone} />
          <Info label="Name" value={lead.name || "-"} />
          <Info label="Email" value={lead.email || "-"} />
          <Info label="Last Intent" value={lead.lastIntent || "-"} />
          <Info label="Last Message" value={lead.lastMessage || "-"} />
          <Info
            label="Last Seen"
            value={new Date(lead.updatedAt).toLocaleString()}
          />
        </div>

        {/* Status */}
        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-3">Status</p>
          <div className="flex gap-3">
            {success && (
              <div className="mb-4 bg-green-500/10 text-green-400 text-sm p-3 rounded">
                ✅ Status updated successfully
              </div>
            )}

            {["NEW", "ENGAGED", "ORDERED"].map((s) => (
              <button
                key={s}
                disabled={saving}
                onClick={() => updateStatus(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  lead.status === s
                    ? "bg-cyan-500 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}
