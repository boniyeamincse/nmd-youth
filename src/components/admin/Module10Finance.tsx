"use client";

import React, { useState } from "react";
import { FinanceItem } from "@/types";
import * as XLSX from "xlsx";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  FileSpreadsheet, 
  Search, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

interface Props {
  financeRecords: FinanceItem[];
  onAddRecord: (rec: FinanceItem) => void;
}

export default function Module10Finance({ financeRecords, onAddRecord }: Props) {
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [titleBn, setTitleBn] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [category, setCategory] = useState<FinanceItem["category"]>("MEMBERSHIP_DUES");
  const [amount, setAmount] = useState<number>(5000);
  const [recordedBy, setRecordedBy] = useState("অর্থ সম্পাদক");

  const totalIncome = financeRecords
    .filter((r) => r.type === "INCOME")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = financeRecords
    .filter((r) => r.type === "EXPENSE")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn || !amount) return;

    const newRec: FinanceItem = {
      id: `fin-${Date.now()}`,
      voucherNo: `${type === "INCOME" ? "TR" : "EX"}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      titleBn,
      type,
      category,
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      recordedBy,
      status: "VERIFIED"
    };

    onAddRecord(newRec);
    setShowModal(false);
    setTitleBn("");
    setAmount(5000);
  };

  const handleExcelExport = () => {
    const dataToExport = financeRecords.map((r, idx) => ({
      "ক্রমিক": idx + 1,
      "ভাউচার নং": r.voucherNo,
      "বিবরণ": r.titleBn,
      "ধরন": r.type === "INCOME" ? "আয় / প্রাপ্তি" : "ব্যয় / খরচ",
      "খাত": r.category,
      "পরিমাণ (টাকা)": r.amount,
      "তারিখ": r.date,
      "দাখিলকারী": r.recordedBy,
      "অডিট স্ট্যাটাস": r.status === "VERIFIED" ? "যাচাইকৃত" : "অপেক্ষমাণ"
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Finance_Ledger");
    XLSX.writeFile(workbook, `NDM_Youth_Finance_Ledger_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const filtered = financeRecords.filter((r) => {
    const matchType = filterType === "ALL" || r.type === filterType;
    const q = search.toLowerCase();
    const matchSearch =
      r.titleBn.toLowerCase().includes(q) ||
      r.voucherNo.toLowerCase().includes(q) ||
      r.recordedBy.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১০ • আর্থিক স্বচ্ছতা ও অডিট
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              জবাবদিহিতামূলক ট্রেজারি
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Finance & Budgeting (আর্থিক তহবিল ও ব্যয় ব্যবস্থাপনা)
          </h1>
          <p className="text-xs text-slate-400">
            মাসিক সদস্য চাঁদা, প্রাতিষ্ঠানিক অনুদান, কর্মসূচি বাজেট এবং ভাউচারভিত্তিক আয়-ব্যয় ট্র্যাকিং
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExcelExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>আর্থিক লেজার এক্সপোর্ট</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন ভাউচার দাখিল</span>
          </button>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>মোট প্রাপ্তি ও চাঁদা সংগ্রহ</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ৳ {totalIncome.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">মাসিক চাঁদা ও দলীয় অনুদান</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>মোট সাংগঠনিক খরচ</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400 font-mono">
            ৳ {totalExpense.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">ভেন্যু, প্রচারণা ও অফিস পরিচালনা ব্যয়</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>বর্তমান নেট ট্রেজারি স্থিতি</span>
            <Wallet className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ৳ {netBalance.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400">অডিট কমপ্লায়েন্ট ব্যালেন্স</div>
        </div>
      </div>

      {/* Transactions Ledger */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ভাউচার নং বা বিবরণ..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
              {(["ALL", "INCOME", "EXPENSE"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                    filterType === t ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {t === "ALL" && "সকল লেনদেন"}
                  {t === "INCOME" && "আয় / চাঁদা"}
                  {t === "EXPENSE" && "ব্যয় / খরচ"}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-400">
            মোট ভাউচার: <span className="font-bold text-white">{filtered.length}টি</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/80">
                <th className="py-3 px-4">ভাউচার কোড</th>
                <th className="py-3 px-4">বিবরণ ও খাত</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">দাখিলকারী</th>
                <th className="py-3 px-4 text-right">পরিমাণ (BDT)</th>
                <th className="py-3 px-4 text-center">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">
                    {r.voucherNo}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{r.titleBn}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{r.category}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">{r.date}</td>
                  <td className="py-3 px-4 text-slate-300">{r.recordedBy}</td>
                  <td className={`py-3 px-4 text-right font-mono font-bold text-sm ${
                    r.type === "INCOME" ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {r.type === "INCOME" ? "+" : "-"}৳ {r.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>অডিটকৃত</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Voucher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন আয় / ব্যয় ভাউচার ভুক্তি</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("INCOME")}
                  className={`py-2 rounded-xl font-bold transition-colors ${
                    type === "INCOME" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  আয় / চাঁদা প্রাপ্তি
                </button>
                <button
                  type="button"
                  onClick={() => setType("EXPENSE")}
                  className={`py-2 rounded-xl font-bold transition-colors ${
                    type === "EXPENSE" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  সাংগঠনিক ব্যয়
                </button>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ভাউচারের বিবরণ *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: চট্টগ্রাম কর্মী সভার মাইক ও ব্যানার ভাড়া"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">টাকার পরিমাণ (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">হিসাব খাত</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="MEMBERSHIP_DUES">মাসিক সদস্য চাঁদা</option>
                    <option value="DONATION">সাংগঠনিক অনুদান</option>
                    <option value="EVENT_EXPENSE">কর্মসূচি ও সমাবেশ ব্যয়</option>
                    <option value="OFFICE_RENT">কার্যালয় পরিচালনা ও ভাড়া</option>
                    <option value="MEDIA_CAMPAIGN">প্রচার ও মিডিয়া উইং</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">দাখিলকারী কর্মকর্তার নাম</label>
                <input
                  type="text"
                  value={recordedBy}
                  onChange={(e) => setRecordedBy(e.target.value)}
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
                  ভাউচার রেকর্ড করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
