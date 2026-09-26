"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { saveMemberApplication } from "@/lib/store";
import { MemberApplication } from "@/types";
import QRCode from "qrcode";
import { 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  Download, 
  ShieldCheck, 
  Award, 
  Sparkles,
  QrCode as QrIcon
} from "lucide-react";

export default function JoinPage() {
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    nameBn: "",
    nameEn: "",
    phone: "",
    email: "",
    nidOrBirthCert: "",
    bloodGroup: "B+",
    division: "ঢাকা",
    district: "ঢাকা",
    presentAddress: "",
    institution: "",
    wingInterest: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
    skills: "",
  });

  const [submittedMember, setSubmittedMember] = useState<MemberApplication | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const divisions = ["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const wings = [
    "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
    "ক্যাম্পাস ও ছাত্র নেতৃত্ব",
    "স্বেচ্ছাসেবক ও সমাজসেবা স্কোয়াড",
    "প্রচার, মিডিয়া ও আইটি উইং",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const saved = saveMemberApplication(formData);
      
      // Generate QR Code containing verification URL
      const verifyUrl = `${window.location.origin}/verify/${saved.memberCode}`;
      const qrUrl = await QRCode.toDataURL(verifyUrl, {
        width: 180,
        margin: 1,
        color: {
          dark: "#0D6938",
          light: "#FFFFFF",
        },
      });

      setQrDataUrl(qrUrl);
      setSubmittedMember(saved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.site.motto}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {t.join.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {t.join.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!submittedMember ? (
          /* Registration Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === "bn" ? "অনলাইন সদস্যপদ নিবন্ধন ফর্ম" : "Online Membership Application"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === "bn" 
                  ? "সঠিক ও পূর্ণাঙ্গ তথ্য প্রদান করুন। আবেদন সফল হলে অবিলম্বে একটি ডিজিটাল স্লিপ ইস্যু করা হবে।"
                  : "Please provide accurate information. A digital pass will be issued immediately upon submission."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section 1: Personal Info */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-ndm-green uppercase tracking-wider border-l-2 border-ndm-green pl-2">
                  {t.join.step1}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameBn}
                      onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                      placeholder="উদা: মোঃ আরিফুল ইসলাম"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.fullNameEn} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nameEn}
                      onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                      placeholder="e.g. Md. Ariful Islam"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.blood} *
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green bg-white"
                    >
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Identity & Location */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-ndm-red uppercase tracking-wider border-l-2 border-ndm-red pl-2">
                  {t.join.step2}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.nid} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nidOrBirthCert}
                      onChange={(e) => setFormData({ ...formData, nidOrBirthCert: e.target.value })}
                      placeholder="NID বা জন্মনিবন্ধন নম্বর"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.division} *
                    </label>
                    <select
                      value={formData.division}
                      onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green bg-white"
                    >
                      {divisions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.district} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="উদা: ঢাকা / চট্টগ্রাম / সিলেট"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {t.join.presentAddress} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.presentAddress}
                    onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                    placeholder="বর্তমান ঠিকানা (বাড়ি, রোড, এলাকা/উপজেলা)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                  />
                </div>
              </div>

              {/* Section 3: Education & Wing Preference */}
              <div className="space-y-4">
                <div className="text-sm font-bold text-amber-600 uppercase tracking-wider border-l-2 border-amber-500 pl-2">
                  {t.join.step3}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.institution} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="বিশ্ববিদ্যালয় / কলেজ / কর্মক্ষেত্র"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.join.wing} *
                    </label>
                    <select
                      value={formData.wingInterest}
                      onChange={(e) => setFormData({ ...formData, wingInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green bg-white"
                    >
                      {wings.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {t.join.skills}
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="উদা: গ্রাফিক ডিজাইন, বিতর্ক, ভিডিও এডিটিং, সোশ্যাল মিডিয়া ক্যাম্পেইন"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  {language === "bn" 
                    ? "আবেদন জমাদানের মাধ্যমে আপনি সংগঠনের গঠনতন্ত্র মেনে চলার অঙ্গীকার করছেন।"
                    : "By applying, you agree to abide by the constitution of the Youth Movement."}
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow-lg transition-transform hover:scale-105 disabled:opacity-50"
                >
                  {loading 
                    ? (language === "bn" ? "প্রক্রিয়াকরণ হচ্ছে..." : "Processing...") 
                    : t.join.submit}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Confirmation and Digital Application Slip */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-3">
              <div className="w-16 h-16 bg-ndm-green text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-emerald-900">
                {t.join.successTitle}
              </h2>
              <p className="text-sm text-emerald-800 max-w-lg mx-auto">
                {t.join.successDesc}
              </p>
              
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.join.printSlip}</span>
                </button>

                <button
                  onClick={() => setSubmittedMember(null)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  {language === "bn" ? "নতুন আবেদন" : "New Application"}
                </button>
              </div>
            </div>

            {/* Printable Digital Application Pass (Tamper-Proof) */}
            <div
              id="printable-slip"
              className="bg-white rounded-3xl border-2 border-ndm-green p-8 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Header Bar */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-ndm-green via-ndm-red to-ndm-green"></div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-slate-100 gap-4 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-ndm-green p-1 bg-white flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-ndm-green-dark uppercase">
                      {t.site.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {t.site.subtitle}
                    </p>
                    <p className="text-xs font-bold text-ndm-red mt-0.5">
                      {t.site.motto}
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                {qrDataUrl && (
                  <div className="flex flex-col items-center">
                    <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                      <img src={qrDataUrl} alt="Verification QR" className="w-20 h-20" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">স্ক্যান করে যাচাই করুন</span>
                  </div>
                )}
              </div>

              {/* Title Badge */}
              <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="px-4 py-1 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                  {t.join.slipTitle}
                </span>
                <span className="text-xs font-mono font-bold text-ndm-green bg-green-50 px-3 py-1 rounded-lg border border-green-200">
                  আইডি: {submittedMember.memberCode}
                </span>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">আবেদনকারীর নাম (বাংলা)</span>
                  <span className="font-bold text-slate-900 text-sm">{submittedMember.nameBn}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">Name in English</span>
                  <span className="font-bold text-slate-900 text-sm">{submittedMember.nameEn}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">মোবাইল নম্বর</span>
                  <span className="font-bold text-slate-900">{submittedMember.phone}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">ইমেইল ঠিকানা</span>
                  <span className="font-bold text-slate-900">{submittedMember.email}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">NID / জন্মনিবন্ধন নম্বর</span>
                  <span className="font-bold text-slate-900">{submittedMember.nidOrBirthCert}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">রক্তের গ্রুপ</span>
                  <span className="font-bold text-red-600">{submittedMember.bloodGroup}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">বিভাগ ও জেলা</span>
                  <span className="font-bold text-slate-900">{submittedMember.division}, {submittedMember.district}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">পছন্দের কার্যবিভাগ (উইং)</span>
                  <span className="font-bold text-ndm-green">{submittedMember.wingInterest}</span>
                </div>

                <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 block font-semibold">শিক্ষাপ্রতিষ্ঠান / কর্মক্ষেত্র</span>
                  <span className="font-bold text-slate-900">{submittedMember.institution}</span>
                </div>
              </div>

              {/* Footer with Seal */}
              <div className="pt-8 mt-6 border-t-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
                <div>
                  <p>আবেদনের তারিখ: {submittedMember.appliedAt}</p>
                  <p className="text-emerald-700 font-semibold mt-0.5">স্ট্যাটাস: প্রাথমিক যাচাই প্রক্রিয়াধীন (PENDING)</p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="w-28 border-b border-slate-400 mb-1 mx-auto sm:ml-auto"></div>
                  <span>অনুমোদনকারী স্বাক্ষর ও সিল</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </section>

    </div>
  );
}
