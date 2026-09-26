"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { 
  ShieldCheck, 
  Flag, 
  HeartHandshake, 
  Users, 
  Download, 
  CheckCircle2, 
  ExternalLink,
  Award,
  BookOpen
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.about.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {t.about.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {t.site.name} — {t.site.motto}
          </p>
        </div>
      </section>

      {/* 2. History & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {t.about.historyTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {language === "bn"
                ? "তরুণদের মেধা ও নৈতিকতার সম্মিলনে আগামীর দেশ গড়ার প্রত্যয়"
                : "Uniting Youth Intellect and Ethics to Rebuild the Nation"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.about.historyDesc}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === "bn"
                ? "আমরা বিশ্বাস করি, প্রথাগত দলকানা রাজনীতির বৃত্ত ভেঙে তরুণদেরকে সুশিক্ষিত, আত্মবিশ্বাসী এবং দেশপ্রেমিক নাগরিকে রূপান্তর করাই বর্তমান সময়ের সবচেয়ে বড় জাতীয় অগ্রাধিকার।"
                : "We believe that breaking the cycle of partisan divide and empowering young minds with meritocracy and civic patriotism is our highest national priority."}
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-200 space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-ndm-green p-1 bg-white flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    {t.site.name}
                  </h3>
                  <p className="text-xs text-ndm-green font-semibold mt-0.5">
                    {t.site.motto}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{language === "bn" ? "সারাদেশের ৬৪ জেলায় কমিটি কার্যক্রম পরিচালিত" : "Active chapter network across all 64 districts"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{language === "bn" ? "বিশ্ববিদ্যালয় ও কলেজ শিক্ষার্থীদের মেধাভিত্তিক প্ল্যাটফর্ম" : "Merit-based platform for college & university students"}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{language === "bn" ? "প্রবাসে অবস্থানরত বাংলাদেশি তরুণদের আন্তর্জাতিক শাখা" : "Global chapters for diaspora youth participation"}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/join"
                  className="w-full block text-center py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow transition-colors"
                >
                  {t.nav.join}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 Core Principles Detailed */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {language === "bn" ? "মৌলিক আদর্শ" : "Foundational Tenets"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {language === "bn" ? "আন্দোলনের ৪টি মৌলিক নীতি" : "The 4 Core Principles"}
            </h2>
            <p className="text-sm text-slate-600">
              {language === "bn" 
                ? "আমাদের সংগঠনের সকল কর্মসূচি, নীতি ও সাংগঠনিক শৃঙ্খলা এই চারটি স্তম্ভের ওপর প্রতিষ্ঠিত:"
                : "Every activity, campaign, and guideline is rooted in these foundational principles:"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-ndm-green rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400">০১</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.principles.p1_title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.principles.p1_desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 text-ndm-red rounded-xl">
                  <Flag className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400">০২</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.principles.p2_title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.principles.p2_desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400">০৩</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.principles.p3_title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.principles.p3_desc}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400">০৪</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t.principles.p4_title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t.principles.p4_desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Relationship with Mother Party NDM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {t.about.motherPartyTitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {language === "bn"
                  ? "মূল দল NDM-এর সুশাসন ও সার্বভৌমত্বের আদর্শে উদ্বুদ্ধ"
                  : "Inspired by NDM's Core Pillars of Sovereignty & Good Governance"}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t.about.motherPartyDesc}
              </p>
              <div className="pt-2 flex items-center gap-4">
                <a
                  href="https://www.facebook.com/ndmyouth/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 hover:text-white"
                >
                  <span>{language === "bn" ? "অফিসিয়াল ফেসবুক পেজ দেখুন" : "Visit Official Facebook Page"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/10 rounded-2xl border border-white/20 text-center space-y-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/60 p-1 bg-white">
                <Image
                  src="/logo.png"
                  alt="NDM Symbol"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs font-bold text-emerald-300">
                {language === "bn" ? "জাতীয় গণতান্ত্রিক আন্দোলন" : "National Democratic Movement"}
              </div>
              <p className="text-[11px] text-slate-300">
                {language === "bn" ? "নির্বাচনী প্রতীক: সিংহ" : "Electoral Symbol: The Lion"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Constitution & Manifesto Download */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {t.about.constitutionTitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {language === "bn" 
                ? "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলনের অফিশিয়াল গঠনতন্ত্র" 
                : "Official Constitution & Code of Conduct"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {t.about.constitutionDesc}
            </p>
          </div>

          <a
            href="/docs/docs.md"
            download="NDM_Youth_Constitution.md"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow transition-all hover:scale-105 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>{t.about.downloadPdf}</span>
          </a>
        </div>
      </section>

    </div>
  );
}
