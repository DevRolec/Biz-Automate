export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>

      <div className="bg-[#0f1224] p-6 rounded-xl border border-white/10">
        <p className="text-gray-400">Email</p>
        <p className="text-white">admin@wapbiz.com</p>

        <p className="text-gray-400 mt-4">Username</p>
        <p className="text-white">wapbiz-admin</p>
      </div>
    </div>
  );
}
