import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন | Youth Movement - NDM",
  description: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement - NDM) - কর্ম, সততা ও সমৃদ্ধির প্রত্যয়ে গড়ে ওঠা তারুণ্যের ঐক্যবদ্ধ প্ল্যাটফর্ম।",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <SessionProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
