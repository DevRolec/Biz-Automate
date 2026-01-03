export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <div className="bg-[#0f1224] p-6 rounded-xl border border-white/10">
        <h3 className="text-white mb-4">Admin Profile</h3>
        <p className="text-gray-400">Email: admin@wapbiz.com</p>
        <p className="text-gray-400">Username: wapbiz-admin</p>
      </div>

      <div className="bg-[#0f1224] p-6 rounded-xl border border-white/10">
        <h3 className="text-white mb-4">Bot Settings</h3>
        <p className="text-gray-400">
          Default currency, automation toggles (coming next)
        </p>
      </div>
    </div>
  );
}
