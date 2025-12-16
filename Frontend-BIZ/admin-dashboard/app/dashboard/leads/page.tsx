"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Table from "../../components/Table";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get("/admin/leads").then((res) => setLeads(res.data));
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Leads</h1>
      <Table
        headers={["Phone", "Name", "Email", "Status"]}
        rows={leads.map((l: any) => [
          l.phone,
          l.name || "-",
          l.email || "-",
          l.status,
        ])}
      />
    </>
  );
}
