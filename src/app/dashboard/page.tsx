"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import QRCode from "qrcode";
import { 
  UserCheck, 
  LogOut, 
  Printer, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Sparkles,
  QrCode as QrIcon,
  Award
} from "lucide-react";

export default function MemberDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { language, t } = useLanguage();
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      const code = (session.user as any).memberCode || "NDM-Y-2026-0001";
      const verifyUrl = `${window.location.origin}/verify/${code}`;
      QRCode.toDataURL(verifyUrl, {
        width: 160,
        margin: 1,
        color: { dark: "#0D6938", light: "#FFFFFF" },
      }).then(setQrUrl);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-ndm-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const user = session?.user as any;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-ndm-green flex items-center justify-center text-ndm-green font-bold text-xl flex-shrink-0">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {user?.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-ndm-green border border-emerald-200 px-2 py-0.5 rounded-full">
                {user?.role || "MEMBER"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              সদস্য আইডি: <span className="font-mono font-bold text-ndm-green">{user?.memberCode || "NDM-Y-2026-0001"}</span> • {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>আইডি কার্ড প্রিন্ট</span>
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Digital ID Card (Printable) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* The Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            id="printable-slip"
            className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-ndm-green shadow-xl bg-white relative flex flex-col justify-between"
          >
            {/* Header with Green Gradient */}
            <div className="bg-gradient-to-r from-ndm-green-dark via-ndm-green to-emerald-700 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white p-0.5 bg-white flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xs leading-tight">
                    {t.site.name}
                  </h3>
                  <p className="text-[10px] text-emerald-200">
                    {t.site.motto}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                MEMBER
              </span>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-ndm-green mx-auto flex items-center justify-center font-bold text-2xl text-ndm-green shadow-sm">
                {user?.name?.[0] || "M"}
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900">
                  {user?.name}
                </h4>
                <p className="text-xs font-mono font-bold text-ndm-green mt-0.5">
                  ID: {user?.memberCode || "NDM-Y-2026-0001"}
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                  সক্রিয় সদস্য (Active Member)
                </span>
              </div>

              {/* QR Code */}
              {qrUrl && (
                <div className="flex flex-col items-center pt-2">
                  <div className="p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <img src={qrUrl} alt="QR Code" className="w-24 h-24" />
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">ভেরিফিকেশনের জন্য স্ক্যান করুন</span>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="bg-slate-900 text-white text-[10px] py-2 px-4 flex items-center justify-between">
              <span>জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন</span>
              <span className="text-emerald-400 font-bold">OFFICIAL PASS</span>
            </div>
          </div>
        </div>

        {/* Member Options / Quick Info */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              আপনার সদস্যপদ বিবরণ
            </h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">নিবন্ধিত ইমেইল:</span>
                <span className="font-semibold text-slate-800">{user?.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">মোবাইল নম্বর:</span>
                <span className="font-semibold text-slate-800">{user?.phone || "০১৭০০০০০০০০"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">শাখা / জেলা:</span>
                <span className="font-semibold text-slate-800">ঢাকা মহানগর</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">কার্যউইং:</span>
                <span className="font-semibold text-ndm-green">পলিসি গবেষণা ও থিংক-ট্যাঙ্ক</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/events"
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-ndm-green transition-all block group"
            >
              <Calendar className="w-6 h-6 text-ndm-green mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xs text-slate-900">আসন্ন কর্মসূচি</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">সমাবেশে RSVP করুন</p>
            </Link>

            <Link
              href="/notices"
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-ndm-red transition-all block group"
            >
              <FileText className="w-6 h-6 text-ndm-red mb-2 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-xs text-slate-900">প্রেস বিজ্ঞপ্তি</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">সাংগঠনিক সার্কুলার</p>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
