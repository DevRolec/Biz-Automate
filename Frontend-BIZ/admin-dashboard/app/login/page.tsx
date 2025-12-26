"use client";

import { useState } from "react";
import api from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    console.log("API BASE URL:", process.env.NEXT_PUBLIC_API_URL);
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/admin/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#2b2d42] to-[#1f2033] px-4">
      <div className="w-full max-w-md bg-[#2f314a] rounded-2xl shadow-2xl p-8">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white">
            Wap-Biz <span className="text-cyan-400">Admin</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Sign in to manage your WhatsApp bot
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">
            Email address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              ✉️
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wapbiz.com"
              className="w-full pl-12 pr-4 py-3 rounded-xl
        bg-[#3a3c5c] text-white placeholder-gray-500
        border border-[#4b4e73]
        outline-none transition
        focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              🔒
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 rounded-xl
        bg-[#3a3c5c] text-white placeholder-gray-500
        border border-[#4b4e73]
        outline-none transition
        focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Need help?{" "}
          <a href="#" className="text-cyan-400 hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
