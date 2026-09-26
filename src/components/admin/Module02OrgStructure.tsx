"use client";

import React, { useState } from "react";
import { Building2, Layers, MapPin, GraduationCap, Plus, Search, CheckCircle2, ChevronRight } from "lucide-react";

interface Chapter {
  id: string;
  nameBn: string;
  nameEn: string;
  type: "DISTRICT" | "CAMPUS";
  convener: string;
  phone: string;
  membersCount: number;
  status: "ACTIVE" | "AD_HOC";
}

interface Props {
  chapters: Chapter[];
  onAddChapter: (chap: Omit<Chapter, "id" | "membersCount">) => void;
}

export default function Module02OrgStructure({ chapters, onAddChapter }: Props) {
  const [filterType, setFilterType] = useState<"ALL" | "DISTRICT" | "CAMPUS">("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [type, setType] = useState<"DISTRICT" | "CAMPUS">("DISTRICT");
  const [convener, setConvener] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "AD_HOC">("AD_HOC");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !convener) return;
    onAddChapter({
      nameBn,
      nameEn: nameEn || nameBn,
      type,
      convener,
      phone: phone || "01700000000",
      status
    });
    setNameBn("");
    setNameEn("");
    setConvener("");
    setPhone("");
    setShowModal(false);
  };

  const filtered = chapters.filter((c) => {
    const matchType = filterType === "ALL" || c.type === filterType;
    const q = search.toLowerCase();
    const matchSearch = c.nameBn.toLowerCase().includes(q) || c.convener.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০২ • সাংগঠনিক কাঠামো
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              ৫-স্তরের পিরামিড আর্কিটেকচার
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Organization Structure (সাংগঠনিক স্তরবিন্যাস ও শাখা)
          </h1>
          <p className="text-xs text-slate-400">
            কেন্দ্রীয় সংসদ থেকে শুরু করে ৬৪ জেলা, তৃণমূল উপজেলা ও ক্যাম্পাস উইং পরিচালনা
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন চ্যাপ্টার সংযোজন</span>
        </button>
      </div>

      {/* 5-Tier Organizational Hierarchy Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">স্তর ১ • কেন্দ্র</div>
          <div className="text-sm font-bold text-white">কেন্দ্রীয় কার্যনির্বাহী সংসদ</div>
          <div className="text-xs text-slate-400">সভাপতি, সাধারণ সম্পাদক ও নির্বাহী সম্পাদকবৃন্দ</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400">স্তর ২ • বিভাগ</div>
          <div className="text-sm font-bold text-white">৮টি বিভাগীয় সমন্বয় সেল</div>
          <div className="text-xs text-slate-400">ঢাকা, চট্টগ্রাম, রাজশাহী, সিলেট, খুলনা, বরিশাল, রংপুর, ময়মনসিংহ</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">স্তর ৩ • জেলা ও মহানগর</div>
          <div className="text-sm font-bold text-white">৬৪ জেলা ও মহানগর কমিটি</div>
          <div className="text-xs text-slate-400">জেলা সভাপতি ও সাধারণ সম্পাদক কর্তৃক সমন্বিত</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">স্তর ৪ • তৃণমূল ইউনিট</div>
          <div className="text-sm font-bold text-white">উপজেলা ও পৌরসভা ইউনিট</div>
          <div className="text-xs text-slate-400">৪৯৫টি উপজেলা ও পৌরসভা তৃণমূল শাখা</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">স্তর ৫ • ক্যাম্পাস উইং</div>
          <div className="text-sm font-bold text-white">বিশ্ববিদ্যালয় ও কলেজ সংসদ</div>
          <div className="text-xs text-slate-400">পাবলিক, প্রাইভেট ও মেডিকেল ক্যাম্পাস চ্যাপ্টার</div>
        </div>
      </div>

      {/* Chapters Directory & Management */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">
              শাখা ও চ্যাপ্টার ডিরেক্টরি ({chapters.length}টি সক্রিয় ইউনিট)
            </h2>
            <p className="text-xs text-slate-400">
              জেলা ও বিশ্ববিদ্যালয় শাখার নেতৃত্ব ও সদস্য সংখ্যা
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="চ্যাপ্টার বা আহ্বায়ক খুঁজুন..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => setFilterType("ALL")}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filterType === "ALL" ? "bg-emerald-600 text-white" : "text-slate-400"
                }`}
              >
                সকল
              </button>
              <button
                onClick={() => setFilterType("DISTRICT")}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filterType === "DISTRICT" ? "bg-emerald-600 text-white" : "text-slate-400"
                }`}
              >
                জেলা শাখা
              </button>
              <button
                onClick={() => setFilterType("CAMPUS")}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filterType === "CAMPUS" ? "bg-emerald-600 text-white" : "text-slate-400"
                }`}
              >
                ক্যাম্পাস
              </button>
            </div>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl ${
                    c.type === "CAMPUS" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {c.type === "CAMPUS" ? <GraduationCap className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.nameBn}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{c.nameEn}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                  c.status === "ACTIVE"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {c.status === "ACTIVE" ? "পূর্ণাঙ্গ" : "আহ্বায়ক"}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>আহ্বায়ক / সভাপতি:</span>
                  <span className="font-semibold text-white">{c.convener}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>মোবাইল:</span>
                  <span className="font-mono text-slate-300">{c.phone}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>নিবন্ধিত কর্মী:</span>
                  <span className="font-bold text-emerald-400 font-mono">{c.membersCount}+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Chapter Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">নতুন চ্যাপ্টার / শাখা অনুমোদন</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">শাখার নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="যেমন: খুলনা জেলা শাখা বা বুয়েট উইং"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ক্যাটাগরি</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                >
                  <option value="DISTRICT">জেলা শাখা</option>
                  <option value="CAMPUS">বিশ্ববিদ্যালয় ক্যাম্পাস</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">আহ্বায়ক / সভাপতি *</label>
                <input
                  type="text"
                  required
                  value={convener}
                  onChange={(e) => setConvener(e.target.value)}
                  placeholder="দায়িত্বপ্রাপ্ত নেতার নাম"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">যোগাযোগ মোবাইল</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017xxxxxxxx"
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
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
