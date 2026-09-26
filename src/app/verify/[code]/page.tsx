"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { getStoredMembers } from "@/lib/store";
import { CheckCircle2, XCircle, ShieldCheck, ArrowLeft } from "lucide-react";

export default function VerifyPage() {
  const params = useParams();
  const code = params?.code as string;
  const { language, t } = useLanguage();

  const members = getStoredMembers();
  const member = members.find((m) => m.memberCode === code || m.id === code);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl text-center space-y-6">
        
        {/* Header Icon */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-ndm-green p-1 bg-white mx-auto shadow-md">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {t.site.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "bn" ? "অফিশিয়াল সদস্যপদ যাচাইকরণ পোর্টাল" : "Official Member Verification System"}
          </p>
        </div>

        {member ? (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-ndm-green rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-emerald-900">
                {language === "bn" ? "বৈধ সদস্য হিসেবে প্রমাণিত" : "Verified Genuine Member"}
              </h3>
              <p className="text-xs text-emerald-700">
                {language === "bn"
                  ? "এই সদস্যপদ কোডটি কেন্দ্রীয় ডাটাবেজে সংরক্ষিত ও অনুমোদিত।"
                  : "This membership code is genuine and verified in the central registry."}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">সদস্য আইডি কোড:</span>
                <span className="font-mono font-bold text-ndm-green">{member.memberCode}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">নাম (বাংলা):</span>
                <span className="font-bold text-slate-800">{member.nameBn}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">Name (English):</span>
                <span className="font-bold text-slate-800">{member.nameEn}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">জেলা শাখা:</span>
                <span className="font-semibold text-slate-800">{member.district}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">উইং:</span>
                <span className="font-semibold text-slate-800">{member.wingInterest}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-slate-400">বর্তমান স্ট্যাটাস:</span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  member.status === "APPROVED" 
                    ? "bg-green-100 text-green-800" 
                    : member.status === "PENDING"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {member.status === "APPROVED" ? "অনুমোদিত সদস্য" : member.status === "PENDING" ? "প্রাথমিক যাচাইাধীন" : "স্থগিত"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-red-50 border border-red-200 space-y-3">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-red-900">
              {language === "bn" ? "অস্বীকৃত বা অবৈধ কোড" : "Unverified / Invalid Code"}
            </h3>
            <p className="text-xs text-red-700">
              {language === "bn"
                ? `কোড '${code}' কেন্দ্রীয় সদস্য ডাটাবেজে খুঁজে পাওয়া যায়নি।`
                : `Code '${code}' was not found in the official member registry.`}
            </p>
          </div>
        )}

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ndm-green hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "হোমপেজে ফিরে যান" : "Back to Home"}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
