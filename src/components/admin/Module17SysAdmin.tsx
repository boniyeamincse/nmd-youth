"use client";

import React, { useState } from "react";
import { 
  Server, 
  Database, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Users, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  Terminal, 
  SlidersHorizontal 
} from "lucide-react";

export default function Module17SysAdmin() {
  const [cacheFlushed, setCacheFlushed] = useState(false);

  const adminUsers = [
    { email: "admin@ndmyouth.org", role: "SUPER_ADMIN", name: "কেন্দ্রীয় সুপার অ্যাডমিন", status: "ACTIVE", lastLogin: "এখন মাত্র" },
    { email: "mod@ndmyouth.org", role: "MODERATOR", name: "বিভাগীয় মডারেটর সেল", status: "ACTIVE", lastLogin: "আজ, সকাল ০৯:১৫" },
    { email: "member@ndmyouth.org", role: "MEMBER", name: "পরীক্ষামূলক সক্রিয় সদস্য", status: "ACTIVE", lastLogin: "গতকাল" }
  ];

  const handleFlushCache = () => {
    setCacheFlushed(true);
    setTimeout(() => setCacheFlushed(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১৭ • সিস্টেম প্রশাসন
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
              Vercel Serverless Ready
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            System Administration (সিস্টেম প্রশাসন ও কনফিগারেশন)
          </h1>
          <p className="text-xs text-slate-400">
            ক্লাউড ইনফ্রাস্ট্রাকচার হেলথ, ডাটাবেস সমন্বয়, অ্যাডমিনিস্ট্রেটর অ্যাকাউন্ট এবং দ্বিভাষিক সেটিংস
          </p>
        </div>

        <button
          onClick={handleFlushCache}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
        >
          <RefreshCw className={`w-4 h-4 text-emerald-400 ${cacheFlushed ? "animate-spin" : ""}`} />
          <span>{cacheFlushed ? "ক্যাশ ফ্ল্যাশ সফল!" : "সিস্টেম ক্যাশ ফ্ল্যাশ"}</span>
        </button>
      </div>

      {/* System Health & Architecture Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>হোস্টিং আর্কিটেকচার</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-bold text-white">Vercel Serverless Edge</div>
          <div className="text-[11px] text-emerald-400 font-bold">Strictly Zero Docker</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ডাটাবেস কানেক্টিভিটি</span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-sm font-bold text-white">Prisma ORM • Synced</div>
          <div className="text-[11px] text-slate-400">SQLite (Dev) / Postgres (Prod)</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>দ্বিভাষিক ডিকশনারি</span>
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-bold text-white">বাংলা ও ইংরেজি (Bilingual)</div>
          <div className="text-[11px] text-purple-400 font-bold">১০০% синхронизированный</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Next.js ফ্রেমওয়ার্ক</span>
            <Cpu className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-sm font-bold text-white">Next.js 14.2 (App Router)</div>
          <div className="text-[11px] text-teal-400 font-bold">Fast SSR & Static Rendering</div>
        </div>
      </div>

      {/* Admin Users Management */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">অ্যাডমিন ব্যবহারকারী অ্যাকাউন্ট</h2>
            <p className="text-xs text-slate-400">সিস্টেমে প্রবেশাধিকারপ্রাপ্ত কেন্দ্রীয় নেতৃত্বের অ্যাকাউন্ট তালিকা</p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {adminUsers.length}টি অ্যাকাউন্ট
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/80">
                <th className="py-3 px-4">অ্যাডমিন নাম</th>
                <th className="py-3 px-4">ইমেইল ঠিকানা</th>
                <th className="py-3 px-4">অ্যাডমিন রোল</th>
                <th className="py-3 px-4">সর্বশেষ লগইন</th>
                <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {adminUsers.map((u, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{u.lastLogin}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      সক্রিয়
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment & Environment Health Checklist */}
      <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">উৎপাদন প্রস্তুতি ও ডিপ্লয়মেন্ট চেকলিস্ট</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">Vercel Git CI/CD ইন্টিগ্রেশন</div>
              <div className="text-[11px] text-slate-400">প্রতিটি গিট পুশে স্বয়ংক্রিয় বিল্ড ও ডেপ্লয়</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">জিরো ডকার (No Docker) নীতি প্রযোজ্য</div>
              <div className="text-[11px] text-slate-400">কোনোরূপ হেভিওয়েট কনটেইনারের নির্ভরতা নেই</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">মোবাইল ও রেটিনা ডিসপ্লে অপটিমাইজেশন</div>
              <div className="text-[11px] text-slate-400">স্মার্টফোন ও ট্যাবলেটে রেসপনসিভ অ্যাডমিন প্যানেল</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-white">অফিশিয়াল সিংহ ব্র্যান্ডিং ইন্টিগ্রিটি</div>
              <div className="text-[11px] text-slate-400">সকল মডিউলে লোগো, মূলনীতি ও কালার স্কিম সমন্বিত</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
