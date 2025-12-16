"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Table from "../../components/Table";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/admin/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Orders</h1>
      <Table
        headers={["Phone", "Bot", "Package", "Amount", "Status"]}
        rows={orders.map((o: any) => [
          o.userPhone,
          o.botType,
          o.pkg,
          o.amount,
          o.status,
        ])}
      />
    </>
  );
}
