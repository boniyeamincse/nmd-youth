"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { MemberApplication } from "@/types";
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Search, 
  ExternalLink,
  Filter
} from "lucide-react";

interface Props {
  members: MemberApplication[];
  onStatusChange: (id: string, status: "APPROVED" | "REJECTED" | "PENDING") => void;
}

export default function Module04Verification({ members, onStatusChange }: Props) {
  const [selectedMember, setSelectedMember] = useState<MemberApplication | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedMember) {
      const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${selectedMember.memberCode}`;
      QRCode.toDataURL(verifyUrl, {
        width: 140,
        margin: 1,
        color: { dark: "#0D6938", light: "#FFFFFF" },
      }).then(setQrDataUrl);
    }
  }, [selectedMember]);

  const filteredMembers = members.filter((m) => {
    const matchStatus = filter === "ALL" || m.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      m.nameBn.toLowerCase().includes(q) ||
      m.nameEn.toLowerCase().includes(q) ||
      m.memberCode.toLowerCase().includes(q) ||
      m.phone.includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = members.filter((m) => m.status === "PENDING").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ০৪ • সদস্য যাচাই ও ডিজিটাল আইডি
            </span>
            {pendingCount > 0 && (
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                {pendingCount}টি আবেদন স্ক্রুটিনির অপেক্ষায়
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Member Verification & Digital ID (যাচাই ও ডিজিটাল কার্ড)
          </h1>
          <p className="text-xs text-slate-400">
            এনআইডি যাচাই, ১-ক্লিকে অনুমোদন এবং টেম্পার-প্রুফ কিউআর কোড ডিজিটাল সদস্যপত্র জেনারেশন
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="সদস্যের নাম, আইডি বা ফোন নম্বর..."
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex rounded-xl bg-slate-800 p-0.5 border border-slate-700 text-xs">
            {(["PENDING", "APPROVED", "REJECTED", "ALL"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                  filter === st ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {st === "PENDING" && "অপেক্ষমাণ"}
                {st === "APPROVED" && "অনুমোদিত"}
                {st === "REJECTED" && "বাতিলকৃত"}
                {st === "ALL" && "সকল আবেদন"}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          মোট পাওয়া গেছে: <span className="font-bold text-white">{filteredMembers.length}</span> জন
        </div>
      </div>

      {/* Verification Queue Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/80">
                <th className="py-3 px-4">আইডি কোড</th>
                <th className="py-3 px-4">নাম ও ফোন</th>
                <th className="py-3 px-4">জেলা / বিভাগ</th>
                <th className="py-3 px-4">এনআইডি / জন্মনিবন্ধন</th>
                <th className="py-3 px-4">আবেদন তারিখ</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                    {m.memberCode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{m.nameBn}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{m.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    <div>{m.district}</div>
                    <div className="text-[10px] text-slate-500">{m.division} বিভাগ</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{m.nidOrBirthCert}</td>
                  <td className="py-3 px-4 text-slate-400">{m.appliedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      m.status === "APPROVED"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : m.status === "PENDING"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                      {m.status === "APPROVED" && "অনুমোদিত"}
                      {m.status === "PENDING" && "অপেক্ষমাণ"}
                      {m.status === "REJECTED" && "বাতিল"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="ডিজিটাল আইডি কার্ড প্রিভিউ"
                      >
                        <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      </button>

                      {m.status !== "APPROVED" && (
                        <button
                          onClick={() => onStatusChange(m.id, "APPROVED")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>অনুমোদন</span>
                        </button>
                      )}

                      {m.status !== "REJECTED" && (
                        <button
                          onClick={() => onStatusChange(m.id, "REJECTED")}
                          className="px-2.5 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-[11px] transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>বাতিল</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital ID Card Preview Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">ডিজিটাল মেম্বারশিপ পাস ও আইডি কার্ড</h3>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Official Card Mockup */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-5 shadow-xl text-white space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white p-0.5">
                    <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase text-emerald-400">জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন</div>
                    <div className="text-[9px] text-slate-300">YOUTH MOVEMENT - NDM</div>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  অফিশিয়াল সদস্য
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="text-sm font-black text-white">{selectedMember.nameBn}</div>
                  <div className="text-[11px] text-slate-300 font-mono">{selectedMember.nameEn}</div>
                  <div className="text-[11px] text-emerald-400 font-mono font-bold">
                    আইডি: {selectedMember.memberCode}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    জেলা: <span className="font-semibold text-white">{selectedMember.district}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    রক্তের গ্রুপ: <span className="font-bold text-red-400">{selectedMember.bloodGroup}</span>
                  </div>
                </div>

                {qrDataUrl && (
                  <div className="p-1.5 rounded-xl bg-white flex flex-col items-center justify-center flex-shrink-0 shadow">
                    <Image src={qrDataUrl} alt="QR Code" width={80} height={80} className="w-20 h-20" />
                    <span className="text-[8px] font-mono font-bold text-emerald-900 mt-0.5">VERIFIED</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[9px] text-slate-400">
                <span>কর্ম • সততা • সমৃদ্ধি</span>
                <span className="font-mono">যাচাই: /verify/{selectedMember.memberCode}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <a
                href={`/verify/${selectedMember.memberCode}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
              >
                <span>পাবলিক ভেরিফাই পেজ দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>প্রিন্ট</span>
                </button>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-1.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-colors"
                >
                  সম্পন্ন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
