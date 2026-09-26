"use client";

import React, { useState } from "react";
import { VolunteerBloodItem } from "@/types";
import { 
  HeartHandshake, 
  Droplet, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

interface Props {
  volunteers: VolunteerBloodItem[];
  onAddVolunteer: (vol: VolunteerBloodItem) => void;
}

export default function Module12Volunteers({ volunteers, onAddVolunteer }: Props) {
  const [bloodFilter, setBloodFilter] = useState<string>("ALL");
  const [districtFilter, setDistrictFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [nameBn, setNameBn] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [district, setDistrict] = useState("ঢাকা");
  const [upazila, setUpazila] = useState("ধানমন্ডি");
  const [phone, setPhone] = useState("");
  const [disasterSquad, setDisasterSquad] = useState(true);

  const bloodGroups = ["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !phone) return;

    const newVol: VolunteerBloodItem = {
      id: `vol-${Date.now()}`,
      nameBn,
      bloodGroup,
      district,
      upazila,
      phone,
      lastDonationDate: new Date().toISOString().split("T")[0],
      isAvailable: true,
      disasterSquad
    };

    onAddVolunteer(newVol);
    setShowModal(false);
    setNameBn("");
    setPhone("");
  };

  const filtered = volunteers.filter((v) => {
    const matchBlood = bloodFilter === "ALL" || v.bloodGroup === bloodFilter;
    const matchDistrict = districtFilter === "ALL" || v.district === districtFilter;
    const q = search.toLowerCase();
    const matchSearch =
      v.nameBn.toLowerCase().includes(q) ||
      v.phone.includes(q) ||
      v.district.toLowerCase().includes(q) ||
      v.upazila.toLowerCase().includes(q);
    return matchBlood && matchDistrict && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
              মডিউল ১২ • স্বেচ্ছাসেবক ও রক্তদান
            </span>
            <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-800/40">
              জরুরি ব্লাড ব্যাংক
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Volunteer Management & Emergency Blood Bank (স্বেচ্ছাসেবক ও রক্তদান নেটওয়ার্ক)
          </h1>
          <p className="text-xs text-slate-400">
            জরুরি রক্তের প্রয়োজনে ৬৪ জেলার সক্রিয় ডোনার সার্চ এবং জাতীয় দুর্যোগে ত্রাণ বিতরণ স্কোয়াড
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন রক্তদাতা নিবন্ধন</span>
        </button>
      </div>

      {/* Filter Bar with Blood Group Pills */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="রক্তদাতার নাম, এলাকা বা ফোন..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">সকল জেলা</option>
              <option value="ঢাকা">ঢাকা</option>
              <option value="চট্টগ্রাম">চট্টগ্রাম</option>
              <option value="বগুড়া">বগুড়া</option>
              <option value="সিলেট">সিলেট</option>
              <option value="রাজশাহী">রাজশাহী</option>
            </select>
          </div>

          <div className="text-xs text-slate-400">
            উপলব্ধ ডোনার: <span className="font-bold text-white font-mono">{filtered.length} জন</span>
          </div>
        </div>

        {/* Blood Group Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-semibold mr-1">রক্তের গ্রুপ:</span>
          {bloodGroups.map((bg) => (
            <button
              key={bg}
              onClick={() => setBloodFilter(bg)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                bloodFilter === bg
                  ? "bg-red-600 text-white shadow-md shadow-red-950 scale-105"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteer Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <div
            key={v.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center font-black text-red-400 text-base font-mono shadow-inner">
                    {v.bloodGroup}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{v.nameBn}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{v.upazila}, {v.district}</span>
                    </p>
                  </div>
                </div>

                {v.disasterSquad && (
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ত্রাণ স্কোয়াড
                  </span>
                )}
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/60 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">সর্বশেষ রক্তদান:</span>
                  <span className="font-mono text-slate-300">{v.lastDonationDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">উপলব্ধতা:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>প্রস্তুত</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="font-mono text-xs text-slate-300 font-bold">{v.phone}</span>

              <a
                href={`tel:${v.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>কল করুন</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Donor Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">জরুরি রক্তদাতা নিবন্ধন</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">রক্তদাতার পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="যেমন: তানভীর আহমেদ"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">রক্তের গ্রুপ *</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">যোগাযোগ মোবাইল *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">জেলা *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">উপজেলা / থানা</label>
                  <input
                    type="text"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="disaster"
                  checked={disasterSquad}
                  onChange={(e) => setDisasterSquad(e.target.checked)}
                  className="rounded text-emerald-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="disaster" className="text-slate-300 cursor-pointer">
                  দুর্যোগকালীন ত্রাণ বিতরণ স্কোয়াডে অন্তর্ভুক্ত করতে সম্মত
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-ndm-green text-white font-bold hover:bg-ndm-green-dark"
                >
                  নিবন্ধন সম্পন্ন করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
