"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import { LogIn, Lock, Mail, ShieldCheck, ArrowRight, UserCheck, KeyRound } from "lucide-react";

export default function LoginPage() {
  const { language, t } = useLanguage();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      // Success redirect
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError("লগইন প্রক্রিয়ায় ত্রুটি দেখা দিয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  const handleDemoFill = (role: "admin" | "member") => {
    if (role === "admin") {
      setIdentifier("admin@ndmyouth.org");
      setPassword("admin123");
    } else {
      setIdentifier("member@ndmyouth.org");
      setPassword("member123");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-ndm-green p-1 bg-white mx-auto shadow-md">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {language === "bn" ? "অফিশিয়াল পোর্টাল লগইন" : "Official Portal Login"}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t.site.name} — {t.site.motto}
            </p>
          </div>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
            {language === "bn" ? "দ্রুত টেস্ট লগইন (Quick Fill)" : "Demo Credentials"}
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="py-1.5 px-2.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>অ্যাডমিন ডেমো</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("member")}
              className="py-1.5 px-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>সদস্য ডেমো</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {language === "bn" ? "ইমেইল অথবা মোবাইল নম্বর *" : "Email or Phone *"}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="admin@ndmyouth.org অথবা 017xxxxxxxx"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {language === "bn" ? "পাসওয়ার্ড *" : "Password *"}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? (language === "bn" ? "যাচাই হচ্ছে..." : "Signing in...") : (language === "bn" ? "লগইন করুন" : "Sign In")}</span>
          </button>
        </form>

        {/* Footer Links */}
        <div className="pt-2 border-t border-slate-100 text-center space-y-2 text-xs">
          <p className="text-slate-500">
            {language === "bn" ? "এখনো সদস্য হননি?" : "Not a member yet?"}{" "}
            <Link href="/join" className="text-ndm-green font-bold hover:underline">
              {language === "bn" ? "অনলাইনে আবেদন করুন" : "Apply online"}
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
