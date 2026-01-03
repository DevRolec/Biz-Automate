"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/lib/api";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") || "";

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q) return;

    const token = localStorage.getItem("token");

    api
      .get("/admin/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { q },
      })
      .then((res) => setResults(res.data))
      .finally(() => setLoading(false));
  }, [q]);

  if (loading) return <p className="text-gray-400">Searching…</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">
        Search results for <span className="text-cyan-400">“{q}”</span>
      </h1>

      <ResultBlock title="Leads" items={results?.leads} />
      <ResultBlock title="Orders" items={results?.orders} />
      <ResultBlock title="Logs" items={results?.logs} />
    </div>
  );
}

function ResultBlock({ title, items }: any) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#0f1224] rounded-xl border border-white/10">
      <h2 className="px-4 py-3 font-medium border-b border-white/10">
        {title}
      </h2>

      <div className="divide-y divide-white/5">
        {items.map((item: any) => (
          <div key={item._id} className="p-4 text-sm text-gray-300">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
