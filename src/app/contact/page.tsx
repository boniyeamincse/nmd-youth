"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Clock
} from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {t.contact.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {t.site.name} — {t.site.motto}
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Office details & Social */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ndm-green bg-green-50 px-3 py-1 rounded-full border border-green-200">
                {language === "bn" ? "কেন্দ্রীয় দপ্তর" : "Central Secretariat"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {language === "bn" 
                  ? "সরাসরি যোগাযোগ ও যোগাযোগের মাধ্যম" 
                  : "Direct Communication & Office Information"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === "bn"
                  ? "সাংগঠনিক তথ্য, মিডিয়া ব্রিফিং কিংবা সদস্যপদ সংক্রান্ত যেকোনো জিজ্ঞাসায় আমাদের সাথে যোগাযোগ করুন।"
                  : "Get in touch for institutional queries, press inquiries, or chapter mobilization."}
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-emerald-50 text-ndm-green rounded-xl flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.contact.office}
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {t.contact.officeAddress}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-red-50 text-ndm-red rounded-xl flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.contact.hotline}
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {t.contact.hotlineVal}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.contact.email}
                  </h4>
                  <p className="text-sm font-semibold text-slate-900 mt-1">
                    {t.contact.emailVal}
                  </p>
                </div>
              </div>

              {/* Facebook Box */}
              <div className="bg-[#1877F2]/10 p-5 rounded-2xl border border-[#1877F2]/20 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
                    {t.contact.fbTitle}
                  </h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    facebook.com/ndmyouth
                  </p>
                </div>
                <a
                  href={t.site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5"
                >
                  <span>ভিজিট করুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {language === "bn" 
                    ? "নিচের ফর্মটি পূরণ করে আপনার বার্তা বা প্রস্তাবনা প্রেরণ করুন।" 
                    : "Fill in the form below and we will respond as soon as possible."}
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {language === "bn" ? "আপনার নাম *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === "bn" ? "উদা: রফিকুল ইসলাম" : "e.g. Rafiqul Islam"}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {language === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}
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
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {language === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@mail.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {language === "bn" ? "বিষয় *" : "Subject *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={language === "bn" ? "কী বিষয়ে যোগাযোগ করতে চান?" : "Reason for contact"}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {language === "bn" ? "আপনার বিস্তারিত বার্তা *" : "Your Message *"}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={language === "bn" ? "এখানে আপনার বক্তব্য বা অনুসন্ধান লিখুন..." : "Type your inquiry or message here..."}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ndm-green/20 focus:border-ndm-green resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-ndm-green hover:bg-ndm-green-dark text-white font-bold text-sm shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.contact.send}</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 bg-emerald-100 text-ndm-green rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {language === "bn" ? "ধন্যবাদ! আপনার বার্তা গৃহীত হয়েছে।" : "Thank You! Message Received."}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    {language === "bn" 
                      ? "আমাদের কেন্দ্রীয় সমন্বয় টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।" 
                      : "Our central secretariat coordination desk will review and contact you shortly."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                  >
                    {language === "bn" ? "আরেকটি বার্তা পাঠান" : "Send Another"}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-80 bg-slate-100 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.036944850383!2d90.375862!3d23.74705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312ac!2sDhanmondi%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1650000000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
