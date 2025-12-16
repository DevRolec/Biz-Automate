"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Table from "../../components/Table";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Logs</h1>
      <Table
        headers={["Type", "Message", "Time"]}
        rows={logs.map((l: any) => [
          l.type,
          l.message,
          new Date(l.createdAt).toLocaleString(),
        ])}
      />
    </>
  );
}
