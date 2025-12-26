export default function DashboardPage() {
  const stats = [
    { label: "Conversations", value: "1,248" },
    { label: "Active Sessions", value: "32" },
    { label: "Leads Captured", value: "418" },
    { label: "Orders Started", value: "96" },
    { label: "Orders Completed", value: "41" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">WhatsApp Bot Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#020617] border border-white/5 rounded-xl p-5"
          >
            <p className="text-gray-400 text-sm">{s.label}</p>
            <p className="text-2xl font-bold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Activity + Funnel placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#020617] border border-white/5 rounded-xl p-5 h-80">
          <p className="font-medium mb-2">Conversation Funnel</p>
          <p className="text-gray-400 text-sm">
            Incoming → Intent → Lead → Order
          </p>
        </div>

        <div className="bg-[#020617] border border-white/5 rounded-xl p-5 h-80">
          <p className="font-medium mb-2">Recent Bot Activity</p>
          <p className="text-gray-400 text-sm">
            Live WhatsApp events will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
