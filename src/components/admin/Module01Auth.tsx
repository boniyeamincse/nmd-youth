"use client";

import React, { useState } from "react";
import { ShieldCheck, Key, Lock, UserCheck, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Module01Auth() {
  const { data: session } = useSession();
  const [tokenCopied, setTokenCopied] = useState(false);

  const rbacMatrix = [
    { role: "SUPER_ADMIN", title: "কেন্দ্রীয় শীর্ষ নেতৃত্ব", members: "পূর্ণ নিয়ন্ত্রণ", committees: "অনুমোদন ও বাতিল", finance: "সর্বময় স্বাক্ষর", notices: "প্রকাশ ও সম্পাদনা", sysadmin: "অনুমোদিত" },
    { role: "MODERATOR", title: "বিভাগীয় সমন্বয়ক / স্ক্রুটিনার", members: "যাচাই ও অনুমোদন", committees: "তদারকি ভিউ", finance: "শুধুমাত্র রিপোর্ট", notices: "খসড়া তৈরি", sysadmin: "সীমাবদ্ধ" },
    { role: "EDITOR", title: "মিডিয়া ও প্রেস সচিব", members: "শুধুমাত্র ভিউ", committees: "ভিউ", finance: "অনুপলব্ধ", notices: "সরাসরি প্রকাশ", sysadmin: "অনুপলব্ধ" },
    { role: "MEMBER", title: "অনুমোদিত সক্রিয় সদস্য", members: "স্বীয় প্রোফাইল ও আইডি", committees: "তালিকা ভিউ", finance: "চাঁদা প্রদান", notices: "পাবলিক নোটিশ", sysadmin: "অনুপলব্ধ" },
    { role: "VOLUNTEER", title: "প্রাথমিক আবেদনকারী", members: "আবেদন স্লিপ ভিউ", committees: "অনুপলব্ধ", finance: "অনুপলব্ধ", notices: "পাবলিক নোটিশ", sysadmin: "অনুপলব্ধ" }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০১ • মূলভিত্তি ও নিরাপত্তা
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              NextAuth JWT + Bcrypt
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Foundation & Authentication (নিরাপত্তা প্রবেশাধিকার)
          </h1>
          <p className="text-xs text-slate-400">
            রোল-বেসড এক্সেস কন্ট্রোল (RBAC), সেশন পলিসি এবং ক্রিপ্টোগ্রাফিক সুরক্ষা মনিটরিং
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>সেশন স্ট্যাটাস: নিরাপদ এনক্রিপ্টেড</span>
        </div>
      </div>

      {/* Active Session & Security Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">বর্তমান লগইন সেশন</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white truncate">
              {session?.user?.email || "admin@ndmyouth.org"}
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-0.5">
              {(session?.user as any)?.role || "SUPER_ADMIN"} (কেন্দ্রীয় সুপার অ্যাডমিন)
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>সেশন মেয়াদ: ৩০ দিন</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">এনক্রিপশন ও হ্যাশিং মান</span>
            <Lock className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-base font-bold text-white">Bcrypt Salt Rounds: 10</div>
            <div className="text-xs text-slate-400 mt-0.5">
              পাসওয়ার্ড একমুখী ক্রিপ্টোগ্রাফিক হ্যাশে সংরক্ষিত
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>ব্রুট-ফোর্স প্রতিরোধ</span>
            <span className="text-blue-400 font-bold">সক্রিয়</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Vercel Edge টোকেন প্রটেকশন</span>
            <Key className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-base font-bold text-white">HttpOnly Cookie + CSRF</div>
            <div className="text-xs text-slate-400 mt-0.5">
              জাভাস্ক্রিপ্ট স্ক্রিপ্ট ইনজেকশন (XSS) প্রতিরোধক
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>প্রবেশস্থল</span>
            <span className="text-purple-400 font-mono">/admin, /dashboard</span>
          </div>
        </div>
      </div>

      {/* RBAC (Role-Based Access Control) Matrix Table */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">
              রোল-বেসড এক্সেস কন্ট্রোল পলিসি (RBAC Matrix)
            </h2>
            <p className="text-xs text-slate-400">
              সংগঠনের পদমর্যাদা অনুযায়ী বিভিন্ন মডিউলের অনুমতি ও নিয়ন্ত্রণ সীমা
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            ৫টি রোল স্তর
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/80">
                <th className="py-3 px-4">ব্যবহারকারী রোল</th>
                <th className="py-3 px-4">পদমর্যাদা</th>
                <th className="py-3 px-4">সদস্য ডাটাবেস</th>
                <th className="py-3 px-4">কমিটি ব্যবস্থাপনা</th>
                <th className="py-3 px-4">আর্থিক তহবিল</th>
                <th className="py-3 px-4">প্রেস নোটিশ</th>
                <th className="py-3 px-4">সিস্টেম কনফিগ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rbacMatrix.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    {r.role}
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{r.title}</td>
                  <td className="py-3 px-4 text-slate-300">{r.members}</td>
                  <td className="py-3 px-4 text-slate-300">{r.committees}</td>
                  <td className="py-3 px-4 text-slate-300">{r.finance}</td>
                  <td className="py-3 px-4 text-slate-300">{r.notices}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.sysadmin === "অনুমোদিত" 
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500"
                    }`}>
                      {r.sysadmin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
