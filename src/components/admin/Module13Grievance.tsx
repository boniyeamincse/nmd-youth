"use client";

import React, { useState } from "react";
import { GrievanceItem } from "@/types";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  FileText, 
  Plus, 
  MessageSquare, 
  UserX 
} from "lucide-react";

interface Props {
  grievances: GrievanceItem[];
  onAddGrievance: (g: GrievanceItem) => void;
  onUpdateStatus: (id: string, newStatus: GrievanceItem["status"]) => void;
}

export default function Module13Grievance({ grievances, onAddGrievance, onUpdateStatus }: Props) {
  const [filterStatus, setFilterStatus] = useState<"ALL" | GrievanceItem["status"]>("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<GrievanceItem | null>(null);

  // Form states
  const [titleBn, setTitleBn] = useState("");
  const [againstBn, setAgainstBn] = useState("");
  const [chapterBn, setChapterBn] = useState("ঢাকা মহানগর");
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("HIGH");
  const [summaryBn, setSummaryBn] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn || !summaryBn) return;

    const newCase: GrievanceItem = {
      id: `grv-${Date.now()}`,
      caseId: `CASE-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      titleBn,
      againstBn: againstBn || "অজ্ঞাত / নির্দিষ্ট নয়",
      filedBy: "গোপন অভিযোগ সেল",
      chapterBn,
      date: new Date().toISOString().split("T")[0],
      priority,
      status: "OPEN",
      summaryBn
    };

    onAddGrievance(newCase);
    setShowModal(false);
    setTitleBn("");
    setAgainstBn("");
    setSummaryBn("");
  };

  const filtered = grievances.filter((g) => {
    const matchStatus = filterStatus === "ALL" || g.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      g.titleBn.toLowerCase().includes(q) ||
      g.caseId.toLowerCase().includes(q) ||
      g.chapterBn.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১৩ • শৃঙ্খলা ও অভিযোগ
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
              ৩-সদস্যের তদন্ত কমিশন
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Issue & Complaint Management (শৃঙ্খলা ও অভিযোগ প্রতিকার সেল)
          </h1>
          <p className="text-xs text-slate-400">
            দলীয় আচরণবিধি লঙ্ঘন, তৃণমূল বিরোধ ও নাগরিক অভিযোগের নিরপেক্ষ ও গোপনীয় শুনানি
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কেস লিপিবদ্ধ করুন</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="কেস আইডি, বিষয় বা শাখা..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
            {(["ALL", "OPEN", "INVESTIGATION", "HEARING", "RESOLVED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filterStatus === st ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "ALL" && "সকল কেস"}
                {st === "OPEN" && "নতুন দাখিল"}
                {st === "INVESTIGATION" && "তদন্তাধীন"}
                {st === "HEARING" && "শুনানি"}
                {st === "RESOLVED" && "নিষ্পত্তিকৃত"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          মোট অভিযোগ কেস: <span className="font-bold text-white">{filtered.length}টি</span>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((g) => (
          <div
            key={g.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">{g.caseId}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  g.status === "RESOLVED"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : g.status === "HEARING"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : g.status === "INVESTIGATION"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {g.status === "RESOLVED" && "নিষ্পত্তি সমাপ্ত"}
                  {g.status === "HEARING" && "শুনানি পর্ব"}
                  {g.status === "INVESTIGATION" && "তদন্ত কমিশন গঠিত"}
                  {g.status === "OPEN" && "নতুন অভিযোগ"}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{g.titleBn}</h3>
                <p className="text-xs text-slate-400 mt-1">অভিযুক্ত পক্ষ: <span className="text-slate-200 font-semibold">{g.againstBn}</span></p>
                <p className="text-[11px] text-slate-500">শাখা: {g.chapterBn} • দাখিল: {g.date}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {g.summaryBn}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {g.status !== "RESOLVED" && (
                  <button
                    onClick={() => onUpdateStatus(g.id, "RESOLVED")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-[11px] font-bold transition-colors"
                  >
                    নিষ্পত্তি করুন
                  </button>
                )}
                {g.status === "OPEN" && (
                  <button
                    onClick={() => onUpdateStatus(g.id, "INVESTIGATION")}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-bold transition-colors"
                  >
                    তদন্তে প্রেরণ
                  </button>
                )}
              </div>

              <span className={`text-[10px] font-bold ${
                g.priority === "HIGH" ? "text-red-400" : "text-amber-400"
              }`}>
                অগ্রাধিকার: {g.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Grievance Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন সাংগঠনিক অভিযোগ কেস</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">অভিযোগের বিষয়বস্তু *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: দলীয় অনুমোদন ব্যতিরেকে সভা ডাকার অভিযোগ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">অভিযুক্ত ব্যক্তি বা কমিটি</label>
                <input
                  type="text"
                  value={againstBn}
                  onChange={(e) => setAgainstBn(e.target.value)}
                  placeholder="যেমন: স্থানীয় সমন্বয়ক"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">সংশ্লিষ্ট শাখা</label>
                  <input
                    type="text"
                    value={chapterBn}
                    onChange={(e) => setChapterBn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">অগ্রাধিকার</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="HIGH">উচ্চ (High)</option>
                    <option value="MEDIUM">সাধারণ (Medium)</option>
                    <option value="LOW">স্বল্প (Low)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">সংক্ষিপ্ত বিবরণ ও প্রাথমিক প্রমাণাদি *</label>
                <textarea
                  rows={3}
                  required
                  value={summaryBn}
                  onChange={(e) => setSummaryBn(e.target.value)}
                  placeholder="ঘটনার প্রেক্ষাপট ও সংশ্লিষ্ট তথ্য..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-ndm-green text-white font-bold hover:bg-ndm-green-dark"
                >
                  কেস দাখিল করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
