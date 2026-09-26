"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Heart,
  Calendar,
  FileText
} from "lucide-react";

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Identity & Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-ndm-green bg-white p-0.5 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="NDM Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {t.site.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {t.site.subtitle}
                </p>
              </div>
            </div>

            <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700/60">
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                {language === "bn" ? "সংগঠনের মূলমন্ত্র" : "Movement Motto"}
              </div>
              <p className="text-sm font-bold text-white tracking-wide">
                {t.site.motto}
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === "bn" 
                ? "তরুণদের মেধা, সততা ও গণতান্ত্রিক চেতনায় সমৃদ্ধ করে আত্মমর্যাদাশীল বাংলাদেশ বিনির্মাণের শপথ।"
                : "Empowering the youth through integrity, democratic ethos, and accountable governance."}
            </p>
          </div>

          {/* Col 2: 4 Core Principles */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-ndm-green pl-2.5">
              {t.home.principlesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>{t.principles.p1_title}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>{t.principles.p2_title}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>{t.principles.p3_title}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                <span>{t.principles.p4_title}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-ndm-red pl-2.5">
              {language === "bn" ? "গুরুত্বপূর্ণ লিঙ্ক" : "Quick Navigation"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.about}</span>
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.leadership}</span>
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.notices}</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.nav.events}</span>
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-emerald-400 font-semibold hover:underline flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span>{t.nav.join}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2.5">
              {t.contact.title}
            </h4>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{t.contact.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.contact.hotlineVal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{t.contact.emailVal}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={t.site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
              >
                <span>Facebook Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            © {new Date().getFullYear()} {t.site.name}. {language === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-400">
              {language === "bn" ? "গঠনতন্ত্র" : "Constitution"}
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-slate-400">
              {t.nav.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
