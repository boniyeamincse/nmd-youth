"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { initialEvents } from "@/lib/mockData";
import { EventItem } from "@/types";
import { Calendar, Clock, MapPin, Users, CheckCircle2, Ticket, Sparkles } from "lucide-react";

export default function EventsPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  const events = initialEvents.filter((e) =>
    activeTab === "upcoming" ? e.isUpcoming : !e.isUpcoming
  );

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) return;
    const code = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketCode(code);
    setRsvpSuccess(true);
  };

  const closeRsvpModal = () => {
    setRsvpEvent(null);
    setRsvpSuccess(false);
    setRsvpName("");
    setRsvpPhone("");
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {language === "bn" ? "মাঠের কর্মসূচি ও সম্মেলন" : "Field Mobilization & Assemblies"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {language === "bn" ? "কর্মসূচি ও সমাবেশ" : "Activities & Events"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {language === "bn"
              ? "যুব সমাবেশের তারিখ, স্থান ও অংশগ্রহণকারীদের জন্য অনলাইন রেজিস্ট্রেশন সুবিধা"
              : "Schedules, venues, and instant online RSVP for national and regional youth assemblies."}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 pb-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "upcoming"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {language === "bn" ? "আসন্ন সমাবেশ ও কর্মসূচি" : "Upcoming Events"}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "past"
                ? "bg-ndm-green text-white shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {language === "bn" ? "সম্পন্ন কর্মসূচির প্রতিবেদন" : "Past Event Reports"}
          </button>
        </div>
      </section>

      {/* Event Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    ev.isUpcoming ? "bg-red-50 text-ndm-red border border-red-200" : "bg-slate-100 text-slate-600"
                  }`}>
                    {ev.isUpcoming 
                      ? (language === "bn" ? "আসন্ন কর্মসূচি" : "Upcoming Event") 
                      : (language === "bn" ? "সম্পন্ন প্রতিবেদন" : "Completed Event")}
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Users className="w-4 h-4 text-ndm-green" />
                    <span>{ev.registeredCount} {language === "bn" ? "জন নিবন্ধিত" : "RSVPs"}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {language === "bn" ? ev.titleBn : ev.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === "bn" ? ev.descriptionBn : ev.descriptionEn}
                </p>

                {/* Event Meta Box */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-ndm-green flex-shrink-0" />
                    <span className="font-semibold">{ev.date}</span>
                    <span className="text-slate-400">•</span>
                    <Clock className="w-4 h-4 text-ndm-green flex-shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60">
                    <MapPin className="w-4 h-4 text-ndm-red flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{language === "bn" ? ev.venueBn : ev.venueEn}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {ev.isUpcoming ? (
                <button
                  onClick={() => setRsvpEvent(ev)}
                  className="w-full py-3 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>{language === "bn" ? "অংশগ্রহণ নিশ্চিত করুন (RSVP)" : "Register for Event"}</span>
                </button>
              ) : (
                <div className="w-full text-center py-2.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl">
                  {language === "bn" ? "কর্মসূচি সফলভাবে সম্পন্ন হয়েছে" : "Event Successfully Completed"}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-ndm-green uppercase tracking-wider">
                {language === "bn" ? "ইভেন্ট রেজিস্ট্রেশন" : "Event RSVP"}
              </span>
              <button onClick={closeRsvpModal} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {!rsvpSuccess ? (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {language === "bn" ? rsvpEvent.titleBn : rsvpEvent.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {rsvpEvent.date} • {language === "bn" ? rsvpEvent.venueBn : rsvpEvent.venueEn}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === "bn" ? "আপনার নাম *" : "Your Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder={language === "bn" ? "উদা: মোঃ তানভীর হাসান" : "e.g. Tanveer Hasan"}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {language === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow transition-colors"
                >
                  {language === "bn" ? "রেজিস্ট্রেশন কনফার্ম করুন" : "Confirm RSVP"}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 bg-emerald-100 text-ndm-green rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {language === "bn" ? "রেজিস্ট্রেশন সফল হয়েছে!" : "RSVP Confirmed!"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === "bn" 
                      ? "সমাবেশে প্রবেশের সময় নিচের ডিজিটাল টিকিট কোডটি প্রদর্শন করুন:"
                      : "Please present this digital ticket code upon arrival:"}
                  </p>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                    Digital Pass Code
                  </div>
                  <div className="text-xl font-mono font-extrabold tracking-wider text-white">
                    {ticketCode}
                  </div>
                </div>

                <button
                  onClick={closeRsvpModal}
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                >
                  {language === "bn" ? "সম্পন্ন" : "Done"}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
