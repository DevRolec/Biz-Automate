export default function Navbar() {
  return (
    <aside className="w-60 h-screen bg-gray-900 text-white p-4">
      <h2 className="font-bold mb-6">JBiz Admin</h2>
      <ul className="space-y-3">
        <li>
          <a href="/dashboard">Overview</a>
        </li>
        <li>
          <a href="/dashboard/leads">Leads</a>
        </li>
        <li>
          <a href="/dashboard/orders">Orders</a>
        </li>
        <li>
          <a href="/dashboard/logs">Logs</a>
        </li>
      </ul>
    </aside>
  );
}
