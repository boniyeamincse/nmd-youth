"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { initialGallery } from "@/lib/mockData";
import { GalleryMedia } from "@/types";
import { Play, Image as ImageIcon, Video, ExternalLink } from "lucide-react";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [filterType, setFilterType] = useState<"ALL" | "PHOTO" | "YOUTUBE_VIDEO">("ALL");
  const [activeMedia, setActiveMedia] = useState<GalleryMedia | null>(null);

  const items = filterType === "ALL"
    ? initialGallery
    : initialGallery.filter((g) => g.type === filterType);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {language === "bn" ? "আন্দোলন ও সমাজসেবার সচিত্র দলিল" : "Visual Chronicles of Movement & Service"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {language === "bn" ? "মিডিয়া ও ভিডিও গ্যালারি" : "Photo & Video Gallery"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {language === "bn"
              ? "মাঠপর্যায়ের সমাবেশ, ত্রাণ বিতরণ, গোলটেবিল সংলাপ ও জাতীয় কর্মসূচির স্থিরচিত্র ও ভিডিও"
              : "High-resolution photos and video statements capturing youth assemblies and social action drives."}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 pb-6 border-b border-slate-200">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filterType === "ALL"
                ? "bg-ndm-green text-white shadow"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {language === "bn" ? "সকল মিডিয়া" : "All Media"}
          </button>
          <button
            onClick={() => setFilterType("PHOTO")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              filterType === "PHOTO"
                ? "bg-ndm-green text-white shadow"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{language === "bn" ? "ফটোগ্যালারি" : "Photos"}</span>
          </button>
          <button
            onClick={() => setFilterType("YOUTUBE_VIDEO")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              filterType === "YOUTUBE_VIDEO"
                ? "bg-ndm-green text-white shadow"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{language === "bn" ? "ভিডিওসমূহ" : "Videos"}</span>
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full bg-slate-900 overflow-hidden">
                {item.type === "PHOTO" ? (
                  <Image
                    src={item.url}
                    alt={item.titleBn}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
                    <Image
                      src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80"
                      alt={item.titleBn}
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="relative w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                  </div>
                )}
                
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {language === "bn" ? item.albumBn : item.albumEn}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-ndm-green transition-colors line-clamp-2">
                  {language === "bn" ? item.titleBn : item.titleEn}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Video Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-ndm-green uppercase tracking-wider">
                {language === "bn" ? activeMedia.albumBn : activeMedia.albumEn}
              </span>
              <button
                onClick={() => setActiveMedia(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 text-sm"
              >
                ✕ বন্ধ করুন
              </button>
            </div>

            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
              {activeMedia.type === "PHOTO" ? (
                <Image
                  src={activeMedia.url}
                  alt={activeMedia.titleBn}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
                  <Play className="w-16 h-16 text-ndm-red" />
                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {language === "bn" ? activeMedia.titleBn : activeMedia.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      ভিডিওটি অফিশিয়াল ইউটিউব ও ফেসবুক চ্যানেলে সম্প্রচারিত
                    </p>
                  </div>
                  <a
                    href="https://www.facebook.com/ndmyouth/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ndm-red text-white text-xs font-bold shadow hover:bg-red-700"
                  >
                    <span>ফেসবুকে ভিডিওটি দেখুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 text-center">
              {language === "bn" ? activeMedia.titleBn : activeMedia.titleEn}
            </h3>
          </div>
        </div>
      )}

    </div>
  );
}
