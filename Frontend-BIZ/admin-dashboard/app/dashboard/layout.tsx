"use client";
import { useEffect } from "react";
import { requireAuth } from "../lib/auth";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    requireAuth();
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <main className="p-6 w-full">{children}</main>
    </div>
  );
}
