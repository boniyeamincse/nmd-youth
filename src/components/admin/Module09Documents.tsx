"use client";

import React, { useState } from "react";
import { DocumentArchiveItem } from "@/types";
import { 
  FileText, 
  Download, 
  FolderArchive, 
  Upload, 
  CheckCircle2, 
  Search, 
  FileCheck,
  ShieldAlert
} from "lucide-react";

interface Props {
  documents: DocumentArchiveItem[];
  onAddDocument: (doc: DocumentArchiveItem) => void;
}

export default function Module09Documents({ documents, onAddDocument }: Props) {
  const [filter, setFilter] = useState<"ALL" | DocumentArchiveItem["category"]>("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [titleBn, setTitleBn] = useState("");
  const [category, setCategory] = useState<DocumentArchiveItem["category"]>("RESOLUTION");
  const [version, setVersion] = useState("সংস্করণ ১.০");
  const [fileSize, setFileSize] = useState("1.5 MB");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn) return;

    const newDoc: DocumentArchiveItem = {
      id: `doc-${Date.now()}`,
      docCode: `NDM-DOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      titleBn,
      titleEn: titleBn,
      category,
      fileType: category === "BRAND_ASSET" ? "ZIP" : "PDF",
      fileSize,
      version,
      publishedDate: new Date().toISOString().split("T")[0],
      downloadUrl: category === "BRAND_ASSET" ? "/logo.png" : "#"
    };

    onAddDocument(newDoc);
    setShowModal(false);
    setTitleBn("");
  };

  const filtered = documents.filter((d) => {
    const matchCat = filter === "ALL" || d.category === filter;
    const q = search.toLowerCase();
    const matchSearch =
      d.titleBn.toLowerCase().includes(q) ||
      d.docCode.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০৯ • নথিপত্র সংরক্ষণাগার
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
              ডিজিটাল আর্কাইভ
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Document Management (গঠনতন্ত্র ও নথিপত্র সংরক্ষণাগার)
          </h1>
          <p className="text-xs text-slate-400">
            গঠনতন্ত্র, সভার কার্যবিবরণী (Minutes of Meeting), রেজুলেশন এবং দলের অফিশিয়াল ব্র্যান্ড কিট
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Upload className="w-4 h-4" />
          <span>নতুন নথি আপলোড</span>
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
              placeholder="নথির নাম বা কোড..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
            {(["ALL", "CONSTITUTION", "RESOLUTION", "BRAND_ASSET", "CIRCULAR_FORM"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filter === cat ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {cat === "ALL" && "সকল নথি"}
                {cat === "CONSTITUTION" && "গঠনতন্ত্র"}
                {cat === "RESOLUTION" && "কার্যবিবরণী"}
                {cat === "BRAND_ASSET" && "ব্র্যান্ড কিট"}
                {cat === "CIRCULAR_FORM" && "আবেদন ফরম"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          মোট সংরক্ষিত: <span className="font-bold text-white">{filtered.length}টি</span>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <FileText className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{d.docCode}</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {d.fileType} • {d.fileSize}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-snug">{d.titleBn}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{d.version} • প্রকাশিত: {d.publishedDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                d.category === "CONSTITUTION"
                  ? "bg-purple-500/20 text-purple-300"
                  : d.category === "BRAND_ASSET"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-emerald-500/20 text-emerald-300"
              }`}>
                {d.category === "CONSTITUTION" && "গঠনতন্ত্র ও ঘোষণাপত্র"}
                {d.category === "RESOLUTION" && "আনুষ্ঠানিক রেজুলেশন"}
                {d.category === "BRAND_ASSET" && "সিংহ প্রতীক লোগো ও ব্র্যান্ড"}
                {d.category === "CIRCULAR_FORM" && "প্রাতিষ্ঠানিক ফরম"}
              </span>

              <a
                href={d.downloadUrl}
                download
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">নতুন অফিশিয়াল নথি সংরক্ষণ</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">নথির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={titleBn}
                  onChange={(e) => setTitleBn(e.target.value)}
                  placeholder="যেমন: বিভাগীয় সমন্বয়ক সভার সিদ্ধান্ত সম্বলিত রেজুলেশন"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">ক্যাটাগরি</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                >
                  <option value="RESOLUTION">সভার রেজুলেশন ও কার্যবিবরণী</option>
                  <option value="CONSTITUTION">গঠনতন্ত্র ও ঘোষণাপত্র</option>
                  <option value="BRAND_ASSET">লোগো ও ব্যানার ব্র্যান্ড কিট</option>
                  <option value="CIRCULAR_FORM">সাংগঠনিক ফরম</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">সংস্করণ</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">সাইজ</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-slate-700 text-center text-slate-400 space-y-1">
                <Upload className="w-5 h-5 mx-auto text-emerald-400" />
                <div className="text-xs">ফাইল ড্রপ করুন অথবা নির্বাচন করুন (PDF, ZIP, PNG)</div>
                <div className="text-[10px] text-slate-500">সর্বোচ্চ সীমা ২৫ মেগাবাইট</div>
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
                  আর্কাইভে আপলোড
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
