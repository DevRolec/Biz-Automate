"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import api from "@/app/lib/api";

export default function DashboardOverview() {
  const [stats, setStats] = useState<any>({});
  const [charts, setCharts] = useState<any>({ leads: [], orders: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");

    api
      .get("/admin/analytics/overview", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data));

    api
      .get("/admin/analytics/charts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCharts(res.data));
  }, []);

  return (
    <div className="space-y-10">
      {/* Counters */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Leads" value={stats.totalLeads} />
        <StatCard title="Orders" value={stats.totalOrders} />
        <StatCard title="Revenue" value={`₦${stats.totalRevenue}`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8">
        <ChartCard title="Leads Growth">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={charts.leads}>
              <XAxis dataKey="_id" />
              <Tooltip />
              <Line dataKey="count" stroke="#22d3ee" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders & Revenue">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={charts.orders}>
              <XAxis dataKey="_id" />
              <Tooltip />
              <Bar dataKey="count" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-[#0f1224] p-6 rounded-xl border border-white/10">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-[#0f1224] p-6 rounded-xl border border-white/10">
      <h3 className="text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}
