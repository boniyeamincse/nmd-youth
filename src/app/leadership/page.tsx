"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { initialLeadership } from "@/lib/mockData";
import { Mail, Phone, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function LeadershipPage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"all" | "central" | "division" | "campus">("all");

  const filtered = activeTab === "all"
    ? initialLeadership
    : initialLeadership.filter((l) => l.category === activeTab);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.leadership.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {t.leadership.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {language === "bn" 
              ? "মেধা, সততা ও জবাবদিহিতার ভিত্তিতে গঠিত দায়িত্বপ্রাপ্ত নেতৃবৃন্দের পরিচিতি"
              : "Dedicated leadership committed to accountable governance, integrity, and youth empowerment."}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 pb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {language === "bn" ? "সকল নেতৃবৃন্দ" : "All Leaders"}
          </button>
          <button
            onClick={() => setActiveTab("central")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "central"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t.leadership.central}
          </button>
          <button
            onClick={() => setActiveTab("division")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "division"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t.leadership.divisional}
          </button>
          <button
            onClick={() => setActiveTab("campus")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "campus"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {t.leadership.campus}
          </button>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((person) => (
            <div
              key={person.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Photo & Role Tag */}
                <div className="relative h-64 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.nameBn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-ndm-green px-2.5 py-0.5 rounded-full shadow">
                      {person.category === "central" 
                        ? (language === "bn" ? "কেন্দ্রীয় পরিষদ" : "Central Council")
                        : person.category === "division"
                        ? (language === "bn" ? `বিভাগ: ${person.districtBn}` : `Division: ${person.districtEn}`)
                        : (language === "bn" ? `ক্যাম্পাস: ${person.districtBn}` : `Campus: ${person.districtEn}`)}
                    </span>
                    <h3 className="text-lg font-bold mt-1 text-white leading-tight">
                      {language === "bn" ? person.nameBn : person.nameEn}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="text-xs font-bold text-ndm-green">
                    {language === "bn" ? person.roleBn : person.roleEn}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === "bn" ? person.bioBn : person.bioEn}
                  </p>
                </div>
              </div>

              {/* Contact / Footer */}
              {person.email && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-ndm-green flex-shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
