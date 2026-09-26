"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { initialNotices } from "@/lib/mockData";
import { Search, Calendar, FileText, Download, Share2, Tag, ChevronRight } from "lucide-react";

export default function NoticesPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<any | null>(null);

  const categories = [
    { id: "ALL", labelBn: "সকল বিজ্ঞপ্তি", labelEn: "All Notices" },
    { id: "PRESS_RELEASE", labelBn: "প্রেস বিজ্ঞপ্তি", labelEn: "Press Releases" },
    { id: "STATEMENT", labelBn: "শীর্ষ বক্তব্য ও ইশতেহার", labelEn: "Speeches & Statements" },
    { id: "ORGANIZATIONAL_MEMO", labelBn: "সাংগঠনিক সার্কুলার", labelEn: "Circulars & Memos" },
  ];

  const filteredNotices = initialNotices.filter((n) => {
    const matchCategory = selectedCategory === "ALL" || n.category === selectedCategory;
    const title = language === "bn" ? n.titleBn : n.titleEn;
    const content = language === "bn" ? n.contentBn : n.contentEn;
    const matchSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {language === "bn" ? "অফিশিয়াল প্রেস ও মিডিয়া সেন্টার" : "Official Press & Media Center"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {language === "bn" ? "সংবাদ ও প্রেস বিজ্ঞপ্তি" : "News & Press Releases"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {language === "bn"
              ? "যুব আন্দোলনের অফিসিয়াল বিবৃতি, নীতি সংস্কার প্রস্তাবনা এবং সাম্প্রতিক কর্মসূচির খবর"
              : "Official statements, press briefings, and policy announcements from the Youth Movement."}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-ndm-green text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {language === "bn" ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "bn" ? "বিজ্ঞপ্তি খুঁজুন..." : "Search notices..."}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
            />
          </div>

        </div>
      </section>

      {/* Notices List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
            {language === "bn" ? "কোনো বিজ্ঞপ্তি পাওয়া যায়নি।" : "No notices found."}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="bg-emerald-50 text-ndm-green font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {n.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{n.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-ndm-green transition-colors">
                    {language === "bn" ? n.titleBn : n.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {language === "bn" ? n.contentBn : n.contentEn}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedNotice(n)}
                    className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-ndm-green hover:text-white text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{language === "bn" ? "সম্পূর্ণ পড়ুন" : "Read Full"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="bg-emerald-50 text-ndm-green font-bold px-3 py-1 rounded-full text-xs">
                {selectedNotice.category}
              </span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕ বন্ধ করুন
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{selectedNotice.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {language === "bn" ? selectedNotice.titleBn : selectedNotice.titleEn}
              </h2>
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-4">
              {language === "bn" ? selectedNotice.contentBn : selectedNotice.contentEn}
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span>জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন • কেন্দ্রীয় কার্যালয়</span>
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
              >
                ঠিক আছে
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
