"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useSession, signOut } from "next-auth/react";
import { 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  UserPlus, 
  Calendar, 
  FileText, 
  Users, 
  Image as ImageIcon,
  PhoneCall,
  Home as HomeIcon,
  ExternalLink,
  LogIn,
  LogOut,
  User
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t.nav.home, icon: HomeIcon },
    { href: "/about", label: t.nav.about, icon: ShieldCheck },
    { href: "/leadership", label: t.nav.leadership, icon: Users },
    { href: "/notices", label: t.nav.notices, icon: FileText },
    { href: "/events", label: t.nav.events, icon: Calendar },
    { href: "/gallery", label: t.nav.gallery, icon: ImageIcon },
    { href: "/contact", label: t.nav.contact, icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-ndm-green-dark via-ndm-green to-ndm-green-dark text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Motto */}
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-ndm-red animate-pulse"></span>
            <span>{t.site.motto}</span>
          </div>

          {/* Social and Language */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://www.facebook.com/ndmyouth/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-green-200 transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <span>fb.com/ndmyouth</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-ndm-red hover:bg-ndm-red-dark text-white px-2.5 py-0.5 rounded-full font-medium transition-all shadow-sm"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "English" : "বাংলা"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-ndm-green shadow-sm group-hover:scale-105 transition-transform flex-shrink-0 bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="NDM Youth Movement Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-bold text-ndm-green-dark leading-tight group-hover:text-ndm-green transition-colors">
                {t.site.name}
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">
                {t.site.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "text-ndm-green bg-green-50 font-semibold"
                      : "text-gray-700 hover:text-ndm-green hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {session?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={(session.user as any).role === "SUPER_ADMIN" || (session.user as any).role === "MODERATOR" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-ndm-green border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{session.user.name || "ড্যাশবোর্ড"}</span>
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="লগআউট"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs text-gray-700 hover:text-ndm-green px-3 py-1.5 rounded-lg border border-gray-200 hover:border-ndm-green transition-colors font-semibold flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.nav.login}</span>
                </Link>

                <Link
                  href="/join"
                  className="bg-ndm-green hover:bg-ndm-green-dark text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow transition-all flex items-center gap-1.5 group"
                >
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{t.nav.join}</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-ndm-green hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-ndm-green bg-green-50 font-semibold"
                      : "text-gray-700 hover:text-ndm-green hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-ndm-green" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-ndm-green hover:bg-ndm-green-dark text-white py-2.5 rounded-lg font-semibold text-sm shadow text-center flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{t.nav.join}</span>
            </Link>

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {t.nav.admin}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
