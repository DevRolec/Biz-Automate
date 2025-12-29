export default function StatusBadge({ status }: { status: string }) {
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
