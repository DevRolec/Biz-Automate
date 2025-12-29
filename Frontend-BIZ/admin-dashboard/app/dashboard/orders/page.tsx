"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";

type Order = {
  _id: string;
  userPhone: string;
  botType: string;
  pkg: string;
  quantity: number;
  amount: number;
  status: string;
  createdAt: string;
};

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400",
    PAID: "bg-green-500/20 text-green-400",
    CANCELLED: "bg-red-500/20 text-red-400",
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await api.get("/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Orders</h1>

      <div className="bg-[#0f1224] rounded-xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-6 text-gray-400">No orders yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#151836] text-gray-400">
              <tr>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Bot</th>
                <th className="p-3 text-left">Package</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o._id}
                  onClick={() => setSelectedOrder(o)}
                  className={`border-t border-gray-800 cursor-pointer hover:bg-[#14173a]
                    ${selectedOrder?._id === o._id ? "bg-[#1a1e4a]" : ""}
                  `}
                >
                  <td className="p-3">{o.userPhone}</td>
                  <td className="p-3">{o.botType}</td>
                  <td className="p-3">{o.pkg}</td>
                  <td className="p-3">{o.quantity}</td>
                  <td className="p-3">₦{o.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="p-3">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Drawer */}
      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

function OrderDrawer({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0f1224] h-full p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <Info label="Phone" value={order.userPhone} />
          <Info label="Bot Type" value={order.botType} />
          <Info label="Package" value={order.pkg} />
          <Info label="Quantity" value={String(order.quantity)} />
          <Info label="Amount" value={`₦${order.amount.toLocaleString()}`} />
          <Info label="Status" value={order.status} />
          <Info
            label="Created"
            value={new Date(order.createdAt).toLocaleString()}
          />
        </div>

        <div className="mt-8">
          <p className="text-gray-400 text-sm mb-3">Order Status</p>
          <div className="flex gap-3">
            {["PENDING", "PAID", "CANCELLED"].map((s) => (
              <button
                key={s}
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  const res = await api.patch(
                    `/admin/orders/${order._id}/status`,
                    { status: s },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  order.status = res.data.status;
                }}
                className={`px-4 py-2 rounded-lg text-sm ${
                  order.status === s
                    ? "bg-cyan-500 text-black"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-yellow-500/10 text-yellow-400 p-4 rounded text-sm">
          💳 Payment integration pending (Paystack / Flutterwave will be
          connected here)
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}
