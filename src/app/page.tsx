"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { initialNotices, initialEvents, initialGallery } from "@/lib/mockData";
import { 
  ShieldCheck, 
  Flag, 
  HeartHandshake, 
  Users, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Sparkles, 
  MapPin, 
  ChevronRight,
  Award,
  BookOpen,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();

  const principles = [
    {
      number: "০১",
      title: t.principles.p1_title,
      desc: t.principles.p1_desc,
      icon: ShieldCheck,
      color: "from-emerald-600 to-ndm-green",
      border: "border-emerald-200",
      bg: "bg-emerald-50/50",
    },
    {
      number: "০২",
      title: t.principles.p2_title,
      desc: t.principles.p2_desc,
      icon: Flag,
      color: "from-red-600 to-ndm-red",
      border: "border-red-200",
      bg: "bg-red-50/50",
    },
    {
      number: "০৩",
      title: t.principles.p3_title,
      desc: t.principles.p3_desc,
      icon: HeartHandshake,
      color: "from-emerald-600 to-teal-700",
      border: "border-teal-200",
      bg: "bg-teal-50/50",
    },
    {
      number: "০৪",
      title: t.principles.p4_title,
      desc: t.principles.p4_desc,
      icon: Users,
      color: "from-amber-600 to-amber-700",
      border: "border-amber-200",
      bg: "bg-amber-50/50",
    },
  ];

  const recentNotices = initialNotices.slice(0, 3);
  const upcomingEvents = initialEvents.filter(e => e.isUpcoming).slice(0, 2);
  const galleryPhotos = initialGallery.filter(g => g.type === "PHOTO").slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Decorative Grid and Background Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d693815_1px,transparent_1px),linear-gradient(to_bottom,#0d693815_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge with Motto */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-emerald-300 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.site.motto}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                {language === "bn" ? (
                  <>
                    তারুণ্যের শক্তিতেই রচিত হবে{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200 underline decoration-ndm-red decoration-4 underline-offset-8">
                      নতুন বাংলাদেশ
                    </span>
                  </>
                ) : (
                  <>
                    Empowering Youth to Build an{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200">
                      Ethical & Prosperous Nation
                    </span>
                  </>
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t.home.heroDesc}
              </p>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/join"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-ndm-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-900/40 hover:scale-[1.02] transition-all group border border-emerald-400/30"
                >
                  <span>{t.home.joinBtn}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-all hover:scale-[1.02]"
                >
                  <span>{t.home.exploreBtn}</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === "bn" ? "গণতান্ত্রিক মূল্যবোধ" : "Democratic Values"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === "bn" ? "ডিজিটাল আইডি ও ভেরিফিকেশন" : "Verified Digital ID"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{language === "bn" ? "মেধাভিত্তিক নেতৃত্ব" : "Merit-based Leadership"}</span>
                </div>
              </div>
            </div>

            {/* Emblem Card & Visual Banner */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-8 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-xl">
                {/* Glow ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-ndm-green to-ndm-red rounded-3xl opacity-30 blur-lg"></div>

                <div className="relative flex flex-col items-center text-center space-y-6">
                  {/* Big Circular Logo */}
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-emerald-500/80 p-1 bg-white shadow-xl shadow-emerald-950/60">
                    <Image
                      src="/logo.png"
                      alt="NDM Lion Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
                      {language === "bn" ? "অফিশিয়াল নির্বাচনী প্রতীক: সিংহ" : "Official Symbol: The Lion"}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      {t.site.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {t.site.subtitle}
                    </p>
                  </div>

                  {/* 4 Pillars pill tags */}
                  <div className="grid grid-cols-2 gap-2 w-full pt-2 text-xs font-semibold text-slate-300">
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                      ১. গণতন্ত্র
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                      ২. জাতীয়তাবাদ
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                      ৩. মূল্যবোধ
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700 text-center">
                      ৪. সামাজিক সুরক্ষা
                    </div>
                  </div>

                  <Link
                    href="/join"
                    className="w-full text-center py-2.5 rounded-xl bg-ndm-red hover:bg-ndm-red-dark text-white font-bold text-sm shadow transition-colors"
                  >
                    {t.nav.join}
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. Live Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            
            <div className="text-center pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-ndm-green">
                ১২,৫০০+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {t.home.statsMembers}
              </div>
            </div>

            <div className="text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-ndm-red">
                ৬৪
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {t.home.statsDistricts}
              </div>
            </div>

            <div className="text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                ৮৫+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {t.home.statsCampus}
              </div>
            </div>

            <div className="text-center pt-4 sm:pt-0 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-600">
                ১৫০+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {t.home.statsEvents}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. Four Core Principles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
            {language === "bn" ? "আদর্শিক ভিত্তি" : "Ideological Foundation"}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            {t.home.principlesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.home.principlesSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 ${p.bg} border ${p.border} shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-slate-500 transition-colors">
                      {p.number}
                    </span>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${p.color} text-white shadow`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-ndm-green transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-semibold text-ndm-green">
                  <span>{language === "bn" ? "মূল স্তম্ভ" : "Core Pillar"}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 4. Strategic Programs / What We Do */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ndm-red bg-red-50 px-3 py-1 rounded-full border border-red-200">
                {language === "bn" ? "কর্মসূচির রূপরেখা" : "Action Framework"}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                {language === "bn" 
                  ? "শুধুমাত্র স্লোগান নয়, কর্মের মাধ্যমেই নেতৃত্ব বিকাশ" 
                  : "Leadership Fostered Through Real Action, Not Just Rhetoric"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === "bn"
                  ? "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন তরুণদের কেবল রাজনীতির কর্মী নয়, বরং সুনাগরিক, উদ্ভাবক ও পলিসি চিন্তাবিদ হিসেবে গড়ে তোলে।"
                  : "We empower young citizens not merely as political cadres, but as policy innovators, ethical leaders, and dedicated social change-makers."}
              </p>
              
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-ndm-green hover:underline"
                >
                  <span>{language === "bn" ? "গঠনতন্ত্র ও বিস্তারিত জানুন" : "Read Constitution & Roadmap"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-ndm-green flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {language === "bn" ? "ফিউচার লিডার্স একাডেমি" : "Future Leaders Academy"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "bn" 
                    ? "শাসনব্যবস্থা, সংবিধান, পাবলিক স্পিকিং ও প্রকল্প পরিচালনার বিশেষ সার্টিফিকেট প্রশিক্ষণ।"
                    : "Certificate leadership training in governance, constitutional literacy, and public speaking."}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-ndm-red flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {language === "bn" ? "ক্যাম্পাস অ্যাম্বাসেডর উইং" : "Campus Ambassador Wing"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "bn" 
                    ? "বিশ্ববিদ্যালয় ও কলেজ ক্যাম্পাসে শিক্ষার্থীদের অধিকার ও মেধার বিকাশে মুক্ত নেটওয়ার্ক।"
                    : "University student network fostering debate, meritocracy, and student rights."}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {language === "bn" ? "পলিসি থিংক-ট্যাঙ্ক সেল" : "Youth Policy Think Tank"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "bn" 
                    ? "কর্মসংস্থান, স্বাস্থ্য ও শিক্ষা সংস্কারে তরুণদের প্রস্তাবিত জাতীয় নীতি শ্বেতপত্র প্রণয়ন।"
                    : "Formulating youth-focused national policy whitepapers on employment and education reform."}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">
                  {language === "bn" ? "সবুজ বাংলাদেশ ও সমাজসেবা" : "Green Vanguard Climate Action"}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "bn" 
                    ? "বৃক্ষরোপণ, দুর্যোগে জরুরি ত্রাণ সহায়তা, রক্তদান ক্যাম্প ও কমিউনিটি উন্নয়ন উদ্যোগ।"
                    : "Disaster relief mobilization, tree planting drives, blood donation banks, and climate advocacy."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Recent News & Press Releases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
              {language === "bn" ? "মিডিয়া ও প্রেস সেন্টার" : "Media & Press Room"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t.home.recentNews}
            </h2>
          </div>
          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ndm-green hover:underline"
          >
            <span>{t.home.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNotices.map((n) => (
            <article
              key={n.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
                    {n.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{n.date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-ndm-green transition-colors leading-snug">
                  {language === "bn" ? n.titleBn : n.titleEn}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {language === "bn" ? n.contentBn : n.contentEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/notices"
                  className="text-xs font-bold text-ndm-green group-hover:text-ndm-green-dark flex items-center gap-1"
                >
                  <span>{language === "bn" ? "বিস্তারিত পড়ুন" : "Read Full Notice"}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>


      {/* 6. Upcoming Events & Rallies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ndm-red bg-red-50 px-3 py-1 rounded-full border border-red-200">
              {language === "bn" ? "মাঠের কর্মসূচি" : "Field Mobilization"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t.home.upcomingEvents}
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ndm-red hover:underline"
          >
            <span>{t.home.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="bg-red-50 text-ndm-red px-2.5 py-0.5 rounded-full font-bold">
                    {language === "bn" ? "আসন্ন সমাবেশ" : "Upcoming"}
                  </span>
                  <span>{ev.date} • {ev.time}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {language === "bn" ? ev.titleBn : ev.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === "bn" ? ev.summaryBn : ev.summaryEn}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <MapPin className="w-4 h-4 text-ndm-red flex-shrink-0" />
                  <span>{language === "bn" ? ev.venueBn : ev.venueEn}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {language === "bn" ? `${ev.registeredCount} জন নিবন্ধিত` : `${ev.registeredCount} Registered`}
                </span>
                <Link
                  href="/events"
                  className="bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  {language === "bn" ? "অংশগ্রহণ নিশ্চিত করুন" : "RSVP Now"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. Gallery Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {language === "bn" ? "ফটোগ্যালারি" : "Photo Gallery"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {t.home.galleryTitle}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ndm-green hover:underline"
          >
            <span>{t.home.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryPhotos.map((g) => (
            <div
              key={g.id}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 bg-white"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={g.url}
                  alt={g.titleBn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded backdrop-blur">
                    {language === "bn" ? g.albumBn : g.albumEn}
                  </span>
                  <h4 className="text-xs font-bold mt-1 line-clamp-2">
                    {language === "bn" ? g.titleBn : g.titleEn}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 8. Bottom Final CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-ndm-green-dark via-ndm-green to-emerald-800 p-8 sm:p-12 text-white text-center shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              {t.site.motto}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              {language === "bn" 
                ? "আপনিও হতে পারেন আগামীর বাংলাদেশের পরিবর্তনের নায়ক" 
                : "You Can Be the Catalyst for a Reformed Bangladesh"}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {language === "bn"
                ? "আজই অনলাইনে জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলনের সদস্যপদের জন্য আবেদন করুন এবং আপনার ডিজিটাল সদস্য পাস সংগ্রহ করুন।"
                : "Join the Youth Movement - NDM online today and receive your verified digital membership pass."}
            </p>
            <div className="pt-2">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-ndm-red hover:bg-ndm-red-dark text-white font-bold text-base shadow-lg transition-transform hover:scale-105"
              >
                <span>{t.home.joinBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
