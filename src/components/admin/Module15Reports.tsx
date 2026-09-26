"use client";

import React from "react";
import * as XLSX from "xlsx";
import { MemberApplication, CommitteeItem, FinanceItem, EventItem } from "@/types";
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  Users, 
  Building2, 
  Wallet, 
  Calendar, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react";
import { exportMembersToExcel, exportMembersToCsv } from "@/lib/store";

interface Props {
  members: MemberApplication[];
  committees: CommitteeItem[];
  financeRecords: FinanceItem[];
  events: EventItem[];
}

export default function Module15Reports({ members, committees, financeRecords, events }: Props) {

  // 1. Members Excel Export
  const handleMembersExcel = () => {
    exportMembersToExcel(members);
  };

  // 2. Members CSV Export (SMS format)
  const handleMembersCsv = () => {
    exportMembersToCsv(members);
  };

  // 3. Committees Excel Export
  const handleCommitteesExcel = () => {
    const data = committees.map((c, idx) => ({
      "ক্রমিক": idx + 1,
      "রেজুলেশন নং": c.resolutionNo,
      "কমিটির নাম": c.nameBn,
      "শাখা / চ্যাপ্টার": c.chapterBn,
      "কমিটির ধরন": c.chapterType,
      "আহ্বায়ক / সভাপতি": c.convenerBn,
      "মোবাইল": c.convenerPhone,
      "সদস্য সচিব": c.secretaryBn,
      "মোট সদস্য": c.membersCount,
      "মেয়াদকাল": c.termDuration,
      "মেয়াদ শেষ": c.expiryDate,
      "স্ট্যাটাস": c.status
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Committees");
    XLSX.writeFile(wb, `NDM_Youth_Committees_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // 4. Finance Ledger Excel Export
  const handleFinanceExcel = () => {
    const data = financeRecords.map((r, idx) => ({
      "ক্রমিক": idx + 1,
      "ভাউচার কোড": r.voucherNo,
      "বিবরণ": r.titleBn,
      "ধরন": r.type === "INCOME" ? "আয়" : "ব্যয়",
      "খাত": r.category,
      "পরিমাণ (টাকা)": r.amount,
      "তারিখ": r.date,
      "দাখিলকারী": r.recordedBy,
      "অডিট স্ট্যাটাস": r.status
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Finance_Ledger");
    XLSX.writeFile(wb, `NDM_Youth_Finance_Ledger_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // 5. Events Excel Export
  const handleEventsExcel = () => {
    const data = events.map((e, idx) => ({
      "ক্রমিক": idx + 1,
      "কর্মসূচি শিরোনাম": e.titleBn,
      "তারিখ": e.date,
      "সময়": e.time,
      "ভেন্যু": e.venueBn,
      "নিবন্ধিত অংশগ্রহণকারী": e.registeredCount,
      "অবস্থা": e.isUpcoming ? "আসন্ন" : "সম্পন্ন"
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Events_Attendance");
    XLSX.writeFile(wb, `NDM_Youth_Events_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১৫ • প্রতিবেদন ও এক্সপোর্ট
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              ১-ক্লিক এক্সেল ও সিএসভি ইঞ্জিন
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Reports & Data Export Center (প্রতিবেদন ও এক্সেল রিপোর্টিং)
          </h1>
          <p className="text-xs text-slate-400">
            কেন্দ্রীয় ডাটাবেস হতে ফরম্যাটেড এক্সেল শিট, জেলাভিত্তিক তালিকা এবং বাল্ক এসএমএস ফাইল ডাউনলোড
          </p>
        </div>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Complete Member Database */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">সদস্য ডাটাবেস এক্সেল শিট</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                নাম, এনআইডি, ফোন, জেলা, শিক্ষা ও উইং বিবরণসহ সম্পূর্ণ মেম্বারশিপ তালিকা ফরম্যাটেড কলামে।
              </p>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 font-bold">
              উপলব্ধ রেকর্ড: {members.length} জন
            </div>
          </div>

          <button
            onClick={handleMembersExcel}
            className="w-full py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Excel (.xlsx) ডাউনলোড</span>
          </button>
        </div>

        {/* 2. Bulk SMS CSV Format */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">বাল্ক এসএমএস উপযোগী CSV</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                মোবাইল অপারেটর গেটওয়ে ও ব্রডকাস্টের উপযোগী শুধুমাত্র নাম ও ফোন নম্বরের কমা-সেপারেটেড ফাইল।
              </p>
            </div>
            <div className="text-[11px] font-mono text-blue-400 font-bold">
              সক্রিয় মোবাইল: {members.length}টি
            </div>
          </div>

          <button
            onClick={handleMembersCsv}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>CSV ফাইল ডাউনলোড</span>
          </button>
        </div>

        {/* 3. Committees Directory */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">কমিটি ও মেয়াদকাল রিপোর্ট</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                ৬৪ জেলা, কেন্দ্রীয় সংসদ ও ক্যাম্পাস আহ্বায়ক কমিটির রেজুলেশন নম্বর, সভাপতি ও মেয়াদ তালিকা।
              </p>
            </div>
            <div className="text-[11px] font-mono text-amber-400 font-bold">
              অনুমোদিত কমিটি: {committees.length}টি
            </div>
          </div>

          <button
            onClick={handleCommitteesExcel}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-400" />
            <span>কমিটি শিট (.xlsx)</span>
          </button>
        </div>

        {/* 4. Financial Audit Ledger */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 w-fit">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">আর্থিক অডিট লেজার শিট</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                চাঁদা প্রাপ্তি, ব্যয়ের ভাউচার কোড, অনুমোদনকারী ও ব্যাংক স্টেটমেন্টের সমন্বয় শিট।
              </p>
            </div>
            <div className="text-[11px] font-mono text-teal-400 font-bold">
              ভাউচার এন্ট্রি: {financeRecords.length}টি
            </div>
          </div>

          <button
            onClick={handleFinanceExcel}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-teal-400" />
            <span>আর্থিক লেজার (.xlsx)</span>
          </button>
        </div>

        {/* 5. Events & Attendance */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">সমাবেশ ও ইভেন্ট উপস্থিতি</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                জাতীয় যুব কনভেনশন ও জেলা সমাবেশসমূহের তারিখ, ভেন্যু ও অনলাইন RSVP তালিকা।
              </p>
            </div>
            <div className="text-[11px] font-mono text-purple-400 font-bold">
              কর্মসূচি: {events.length}টি
            </div>
          </div>

          <button
            onClick={handleEventsExcel}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-400" />
            <span>ইভেন্ট রিপোর্ট (.xlsx)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
