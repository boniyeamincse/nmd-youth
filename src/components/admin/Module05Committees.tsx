"use client";

import React, { useState } from "react";
import { CommitteeItem } from "@/types";
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  FileText, 
  Search,
  Download,
  Building2
} from "lucide-react";

interface Props {
  committees: CommitteeItem[];
  onAddCommittee: (com: CommitteeItem) => void;
}

export default function Module05Committees({ committees, onAddCommittee }: Props) {
  const [filter, setFilter] = useState<"ALL" | "CENTRAL" | "DISTRICT" | "CAMPUS" | "AD_HOC">("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCom, setSelectedCom] = useState<CommitteeItem | null>(null);

  // Form states
  const [nameBn, setNameBn] = useState("");
  const [chapterBn, setChapterBn] = useState("");
  const [chapterType, setChapterType] = useState<"CENTRAL" | "DISTRICT" | "CAMPUS" | "AD_HOC">("DISTRICT");
  const [convenerBn, setConvenerBn] = useState("");
  const [convenerPhone, setConvenerPhone] = useState("");
  const [secretaryBn, setSecretaryBn] = useState("");
  const [membersCount, setMembersCount] = useState(31);
  const [termDuration, setTermDuration] = useState("২ বছর");
  const [expiryDate, setExpiryDate] = useState("2028-03-30");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !convenerBn) return;

    const newCom: CommitteeItem = {
      id: `com-${Date.now()}`,
      nameBn,
      nameEn: nameBn,
      chapterBn: chapterBn || nameBn,
      chapterType,
      convenerBn,
      convenerPhone: convenerPhone || "01700000000",
      secretaryBn: secretaryBn || "সদস্য সচিব",
      membersCount: Number(membersCount) || 31,
      termDuration,
      expiryDate,
      status: chapterType === "AD_HOC" ? "AD_HOC" : "ACTIVE",
      resolutionNo: `NDM-Y/COM/${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`
    };

    onAddCommittee(newCom);
    setShowModal(false);
    setNameBn("");
    setConvenerBn("");
    setSecretaryBn("");
  };

  const filtered = committees.filter((c) => {
    const matchType = filter === "ALL" || c.chapterType === filter;
    const q = search.toLowerCase();
    const matchSearch =
      c.nameBn.toLowerCase().includes(q) ||
      c.convenerBn.toLowerCase().includes(q) ||
      c.chapterBn.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০৫ • কমিটি ও মেয়াদকাল
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              রেজুলেশন ট্র্যাকার
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Committee Management (কমিটি ও মেয়াদকাল ব্যবস্থাপনা)
          </h1>
          <p className="text-xs text-slate-400">
            কেন্দ্রীয়, জেলা ও ক্যাম্পাস কমিটির অনুমোদিত পোর্টফোলিও, মেয়াদকাল এবং সার্টিফাইড রেজুলেশন
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কমিটি অনুমোদন</span>
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
              placeholder="কমিটির নাম বা নেতার নাম..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
            {(["ALL", "CENTRAL", "DISTRICT", "CAMPUS", "AD_HOC"] as const).map((tp) => (
              <button
                key={tp}
                onClick={() => setFilter(tp)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filter === tp ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {tp === "ALL" && "সকল কমিটি"}
                {tp === "CENTRAL" && "কেন্দ্র"}
                {tp === "DISTRICT" && "জেলা"}
                {tp === "CAMPUS" && "ক্যাম্পাস"}
                {tp === "AD_HOC" && "আহ্বায়ক (অ্যাডহক)"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          মোট অনুমোদিত: <span className="font-bold text-white">{committees.length}টি</span>
        </div>
      </div>

      {/* Committees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    c.status === "ACTIVE"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {c.status === "ACTIVE" ? "পূর্ণাঙ্গ কমিটি" : "আহ্বায়ক কমিটি (অ্যাডহক)"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{c.resolutionNo}</span>
                </div>
                <h3 className="text-base font-bold text-white">{c.nameBn}</h3>
                <p className="text-xs text-slate-400 font-semibold">{c.chapterBn}</p>
              </div>

              <button
                onClick={() => setSelectedCom(c)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="অনুমোদন পত্র দেখুন"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            {/* Leadership Portfolios */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">আহ্বায়ক / সভাপতি:</span>
                <span className="font-bold text-white">{c.convenerBn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">সদস্য সচিব / সাধারণ সম্পাদক:</span>
                <span className="font-bold text-white">{c.secretaryBn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">সদস্য সংখ্যা:</span>
                <span className="font-mono font-bold text-emerald-400">{c.membersCount} জন</span>
              </div>
            </div>

            {/* Term and Expiry Alerts */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>মেয়াদকাল: {c.termDuration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>মেয়াদ শেষ: {c.expiryDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certified Resolution Modal Preview */}
      {selectedCom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">কমিটি অনুমোদন সনদপত্র ও রেজুলেশন</h3>
              </div>
              <button onClick={() => setSelectedCom(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 space-y-4 shadow font-serif">
              <div className="text-center space-y-1 border-b pb-3 border-slate-200">
                <div className="text-xs font-bold text-emerald-800 tracking-wider">জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন</div>
                <div className="text-[10px] text-slate-600">কেন্দ্রীয় সংসদ সচিবালয় • ঢাকা</div>
                <div className="text-[9px] font-mono text-slate-500 mt-1">স্মারক নং: {selectedCom.resolutionNo}</div>
              </div>

              <div className="text-center font-bold text-sm text-slate-900 py-1 bg-slate-100 rounded">
                সাংগঠনিক বিজ্ঞপ্তি ও কমিটি অনুমোদনপত্র
              </div>

              <p className="text-xs leading-relaxed text-slate-700">
                জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলনের গঠনতন্ত্রের ধারা মোতাবেক সংগঠনের গতিশীলতা বৃদ্ধির লক্ষ্যে <strong>{selectedCom.nameBn}</strong> নিম্নোক্ত নেতৃত্বের অনুকূলে অনুমোদন করা হলো।
              </p>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-800">
                <div>১. সভাপতি / আহ্বায়ক: <strong>{selectedCom.convenerBn}</strong></div>
                <div>২. সাধারণ সম্পাদক / সদস্য সচিব: <strong>{selectedCom.secretaryBn}</strong></div>
                <div>৩. মোট কার্যনির্বাহী সদস্য: <strong>{selectedCom.membersCount} জন</strong></div>
                <div>৪. অনুমোদিত মেয়াদকাল: <strong>{selectedCom.termDuration}</strong></div>
              </div>

              <div className="pt-6 flex items-center justify-between text-[10px] text-slate-600">
                <div>
                  <div className="font-bold">ফারহানা ইয়াসমিন</div>
                  <div>সাধারণ সম্পাদক, কেন্দ্রীয় সংসদ</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">মো: আরিফুল ইসলাম</div>
                  <div>সভাপতি, কেন্দ্রীয় সংসদ</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>প্রিন্ট / PDF ডাউনলোড</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Committee Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-lg space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন সাংগঠনিক কমিটি অনুমোদন</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">কমিটির পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder="যেমন: রাজশাহী জেলা আহ্বায়ক কমিটি"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">কমিটির ধরন</label>
                  <select
                    value={chapterType}
                    onChange={(e) => setChapterType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="DISTRICT">জেলা পূর্ণাঙ্গ কমিটি</option>
                    <option value="AD_HOC">আহ্বায়ক কমিটি (অ্যাডহক)</option>
                    <option value="CAMPUS">বিশ্ববিদ্যালয় ক্যাম্পাস সংসদ</option>
                    <option value="CENTRAL">কেন্দ্রীয় কমিটি</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">সভাপতি / আহ্বায়ক *</label>
                  <input
                    type="text"
                    required
                    value={convenerBn}
                    onChange={(e) => setConvenerBn(e.target.value)}
                    placeholder="নেতার পূর্ণ নাম"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">সাধারণ সম্পাদক / সদস্য সচিব</label>
                  <input
                    type="text"
                    value={secretaryBn}
                    onChange={(e) => setSecretaryBn(e.target.value)}
                    placeholder="নেতার পূর্ণ নাম"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">মোট সদস্য</label>
                  <input
                    type="number"
                    value={membersCount}
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">মেয়াদকাল</label>
                  <input
                    type="text"
                    value={termDuration}
                    onChange={(e) => setTermDuration(e.target.value)}
                    placeholder="যেমন: ২ বছর"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">মেয়াদ শেষ তারিখ</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
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
                  অনুমোদন জারি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
