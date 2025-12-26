export default function Topbar() {
  return (
    <header className="h-16 bg-[#020617] border-b border-white/5 flex items-center px-6 justify-between">
      {/* Search */}
      <input
        placeholder="Search…"
        className="bg-[#020617] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none focus:border-cyan-400 w-80"
      />

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative">
          🔔
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1">
            5
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
            A
          </div>
          <span className="text-sm"></span>
        </div>
      </div>
    </header>
  );
}
