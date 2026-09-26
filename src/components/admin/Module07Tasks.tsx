"use client";

import React, { useState } from "react";
import { TaskWorkflowItem } from "@/types";
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  Plus, 
  CheckCircle2, 
  Layers, 
  Search,
  ArrowRight,
  TrendingUp
} from "lucide-react";

interface Props {
  tasks: TaskWorkflowItem[];
  onAddTask: (task: TaskWorkflowItem) => void;
  onUpdateStatus: (id: string, newStatus: TaskWorkflowItem["status"], progress: number) => void;
}

export default function Module07Tasks({ tasks, onAddTask, onUpdateStatus }: Props) {
  const [filterStatus, setFilterStatus] = useState<"ALL" | TaskWorkflowItem["status"]>("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [titleBn, setTitleBn] = useState("");
  const [assignedToBn, setAssignedToBn] = useState("");
  const [wing, setWing] = useState("ক্যাম্পাস ও তৃণমূল বিস্তার");
  const [priority, setPriority] = useState<"URGENT" | "HIGH" | "MEDIUM">("HIGH");
  const [deadline, setDeadline] = useState("২০২৬-০৪-১৫");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn || !assignedToBn) return;

    const newTask: TaskWorkflowItem = {
      id: `task-${Date.now()}`,
      titleBn,
      titleEn: titleBn,
      assignedToBn,
      wing,
      priority,
      deadline,
      status: "TODO",
      progress: 0
    };

    onAddTask(newTask);
    setShowModal(false);
    setTitleBn("");
    setAssignedToBn("");
  };

  const filtered = tasks.filter((t) => {
    const matchStatus = filterStatus === "ALL" || t.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      t.titleBn.toLowerCase().includes(q) ||
      t.assignedToBn.toLowerCase().includes(q) ||
      t.wing.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০৭ • দায়িত্ব ও প্রগ্রেস
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              কেন্দ্রীয় অ্যাকশন পাইপলাইন
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Task & Workflow (সাংগঠনিক দায়িত্ব ও অগ্রগতি)
          </h1>
          <p className="text-xs text-slate-400">
            কেন্দ্রীয় নেতৃত্ব কর্তৃক জেলা ও উইং সমূহকে অর্পিত দায়িত্বের পাইপলাইন ও ডেডলাইন পর্যবেক্ষণ
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন টাস্ক অর্পণ</span>
        </button>
      </div>

      {/* Task Status Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="টাস্ক বা শাখার নাম..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
            {(["ALL", "TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filterStatus === st ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "ALL" && "সকল"}
                {st === "TODO" && "পরিকল্পনাাধীন"}
                {st === "IN_PROGRESS" && "চলমান"}
                {st === "REVIEW" && "পর্যালোচনায়"}
                {st === "COMPLETED" && "সম্পন্ন"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          মোট টাস্ক: <span className="font-bold text-white">{filtered.length}টি</span>
        </div>
      </div>

      {/* Task List / Workflow Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                t.priority === "URGENT"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : t.priority === "HIGH"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              }`}>
                {t.priority === "URGENT" ? "জরুরি অগ্রাধিকার" : t.priority === "HIGH" ? "উচ্চ অগ্রাধিকার" : "সাধারণ"}
              </span>

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                t.status === "COMPLETED"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : t.status === "REVIEW"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : t.status === "IN_PROGRESS"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-slate-800 text-slate-400"
              }`}>
                {t.status === "COMPLETED" && "সম্পন্ন"}
                {t.status === "REVIEW" && "পর্যালোচনা"}
                {t.status === "IN_PROGRESS" && "চলমান"}
                {t.status === "TODO" && "পরিকল্পনা"}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white leading-snug">{t.titleBn}</h3>
              <p className="text-xs text-slate-400 mt-1">দায়িত্বপ্রাপ্ত: <span className="text-emerald-400 font-semibold">{t.assignedToBn}</span></p>
              <p className="text-[11px] text-slate-500">উইং: {t.wing}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">অগ্রগতি</span>
                <span className="font-mono font-bold text-white">{t.progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    t.progress >= 80 ? "bg-emerald-500" : t.progress >= 40 ? "bg-blue-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${t.progress}%` }}
                />
              </div>
            </div>

            {/* Footer with Deadline & Actions */}
            <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>সময়সীমা: {t.deadline}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {t.status !== "COMPLETED" && (
                  <button
                    onClick={() => onUpdateStatus(t.id, "COMPLETED", 100)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-[11px] font-bold transition-colors"
                  >
                    সম্পন্ন চিহ্নিত করুন
                  </button>
                )}
                {t.status === "TODO" && (
                  <button
                    onClick={() => onUpdateStatus(t.id, "IN_PROGRESS", 50)}
                    className="px-2.5 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-bold transition-colors"
                  >
                    শুরু করুন
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন সাংগঠনিক দায়িত্ব অর্পণ</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">দায়িত্ব বা কর্মসূচির বিবরণ *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: সিলেট অঞ্চলে ৫০০০ লিফলেট বিতরণ ও কর্মী সভা"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">দায়িত্বপ্রাপ্ত শাখা / ব্যক্তি *</label>
                <input
                  type="text"
                  required
                  value={assignedToBn}
                  onChange={(e) => setAssignedToBn(e.target.value)}
                  placeholder="যেমন: সিলেট জেলা সমন্বয় সেল"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">অগ্রাধিকার</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="URGENT">জরুরি (Urgent)</option>
                    <option value="HIGH">উচ্চ (High)</option>
                    <option value="MEDIUM">সাধারণ (Medium)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">সময়সীমা (ডেডলাইন)</label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="২০২৬-০৪-৩০"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
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
                  টাস্ক তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
