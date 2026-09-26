"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TrainingItem } from "@/types";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search, 
  Printer, 
  Download 
} from "lucide-react";

interface Props {
  courses: TrainingItem[];
  onAddCourse: (c: TrainingItem) => void;
}

export default function Module11Training({ courses, onAddCourse }: Props) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCertCourse, setSelectedCertCourse] = useState<TrainingItem | null>(null);

  // Form states
  const [titleBn, setTitleBn] = useState("");
  const [instructorBn, setInstructorBn] = useState("");
  const [duration, setDuration] = useState("৪ সপ্তাহ");
  const [modulesCount, setModulesCount] = useState(6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn || !instructorBn) return;

    const newC: TrainingItem = {
      id: `trn-${Date.now()}`,
      code: `NDM-LMS-${Math.floor(100 + Math.random() * 900)}`,
      titleBn,
      titleEn: titleBn,
      instructorBn,
      duration,
      enrolledCount: 0,
      status: "OPEN",
      modulesCount: Number(modulesCount),
      certificateAvailable: true
    };

    onAddCourse(newC);
    setShowModal(false);
    setTitleBn("");
    setInstructorBn("");
  };

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return c.titleBn.toLowerCase().includes(q) || c.instructorBn.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১১ • ফিউচার লিডার্স একাডেমি
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              ডিজিটাল ক্যাপাসিটি বিল্ডিং
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Training & Leadership Academy (নেতৃত্ব বিকাশ ও প্রশিক্ষণ একাডেমি)
          </h1>
          <p className="text-xs text-slate-400">
            তরুণদের রাষ্ট্রবিজ্ঞান, জনবক্তৃতা, আইটি স্কিল ও নীতি সংস্কারের জন্য ডিজিটাল সার্টিফিকেট কোর্স
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কোর্স চালু করুন</span>
        </button>
      </div>

      {/* Academy KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>সক্রিয় কোর্স সংখ্যা</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{courses.length}টি</div>
          <div className="text-[11px] text-emerald-400">গণতান্ত্রিক মূল্যবোধ ও নেতৃত্ব</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>মোট প্রশিক্ষনার্থী তরুণ</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400 font-mono">
            {courses.reduce((acc, curr) => acc + curr.enrolledCount, 0).toLocaleString()} জন
          </div>
          <div className="text-[11px] text-slate-400">সারাদেশের ক্যাম্পাস ও জেলা হতে</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ইস্যুকৃত ডিজিটাল সনদ</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">৮৫০+</div>
          <div className="text-[11px] text-slate-400">ভেরিফায়েড লিডারশিপ সনদ</div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {c.code}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  c.status === "ONGOING"
                    ? "bg-blue-500/20 text-blue-300"
                    : c.status === "OPEN"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {c.status === "ONGOING" && "চলমান ক্লাস"}
                  {c.status === "OPEN" && "ভর্তি চলছে"}
                  {c.status === "COMPLETED" && "সম্পন্ন ব্যাচ"}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white leading-snug">{c.titleBn}</h3>
                <p className="text-xs text-slate-400 mt-1">প্রশিক্ষক: <span className="text-white font-medium">{c.instructorBn}</span></p>
              </div>

              <div className="space-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span>সময়কাল:</span>
                  <span className="font-semibold text-slate-300">{c.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>মডিউল সংখ্যা:</span>
                  <span className="font-semibold text-slate-300">{c.modulesCount}টি সেশন</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>নিবন্ধিত শিক্ষার্থী:</span>
                  <span className="font-mono font-bold text-emerald-400">{c.enrolledCount} জন</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedCertCourse(c)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>সার্টিফিকেট প্রিভিউ</span>
              </button>

              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>সনদ সক্রিয়</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Leadership Certificate Modal Preview */}
      {selectedCertCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-2xl space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">ডিজিটাল লিডারশিপ সার্টিফিকেট</h3>
              </div>
              <button onClick={() => setSelectedCertCourse(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Official Certificate Layout */}
            <div className="relative rounded-2xl border-4 border-amber-600/40 bg-gradient-to-b from-amber-50/95 via-white to-amber-50/95 p-8 text-slate-900 shadow-2xl space-y-6 font-serif">
              <div className="flex items-center justify-between border-b-2 border-amber-700/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-emerald-700">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-emerald-950 uppercase tracking-wider">
                      জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন
                    </h2>
                    <p className="text-[11px] font-sans font-bold text-amber-900">
                      ফিউচার লিডার্স একাডেমি • ঢাকা
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-slate-500">সনদ কোড: NDM-CERT-2026</div>
                  <div className="text-[10px] font-sans font-bold text-emerald-800">কর্ম • সততা • সমৃদ্ধি</div>
                </div>
              </div>

              <div className="text-center space-y-2 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-600 font-sans font-semibold">
                  এই মর্মে প্রত্যয়ন করা যাচ্ছে যে
                </p>
                <div className="text-2xl font-black text-slate-900 border-b border-slate-300 pb-2 max-w-sm mx-auto">
                  হাসিবুল ইসলাম শাওন
                </div>
                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed pt-2">
                  সফলতার সাথে ফিউচার লিডার্স একাডেমির অধীন <strong>&quot;{selectedCertCourse.titleBn}&quot;</strong> শীর্ষক নিবিড় রাজনৈতিক ও নীতি নির্ধারণ প্রশিক্ষণ কোর্স সম্পন্ন করেছেন।
                </p>
              </div>

              <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs font-sans">
                <div className="text-center">
                  <div className="font-bold text-slate-900">ববি হাজ্জাজ</div>
                  <div className="text-[10px] text-slate-600">চেয়ারম্যান ও প্রধান পৃষ্ঠপোষক</div>
                </div>
                <div className="w-16 h-16 rounded-full border-2 border-amber-700 flex items-center justify-center font-bold text-amber-900 text-[10px] uppercase rotate-12">
                  অফিশিয়াল সিল
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-900">মো: আরিফুল ইসলাম</div>
                  <div className="text-[10px] text-slate-600">সভাপতি, যুব আন্দোলন</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>সার্টিফিকেট প্রিন্ট / PDF সংরক্ষণ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন নেতৃত্ব কোর্স উদ্বোধন</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">কোর্সের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: নাগরিক কূটনীতি ও তরুণদের গণযোগাযোগ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">প্রধান প্রশিক্ষক / শিক্ষক *</label>
                <input
                  type="text"
                  required
                  value={instructorBn}
                  onChange={(e) => setInstructorBn(e.target.value)}
                  placeholder="যেমন: ড. রফিকুল ইসলাম ও জ্যেষ্ঠ নেতৃত্ব"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">কোর্স ব্যাপ্তি</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">মডিউল সংখ্যা</label>
                  <input
                    type="number"
                    value={modulesCount}
                    onChange={(e) => setModulesCount(Number(e.target.value))}
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
                  কোর্স উন্মোচন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
