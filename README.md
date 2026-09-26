# জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement - NDM)

অফিশিয়াল ওয়েব প্ল্যাটফর্ম ও সাংগঠনিক পরিচালনা সিস্টেম।  
Official Web Platform & Organizational Management System.

> **মূলমন্ত্র / স্লোগান**: **কর্ম — সততা — সমৃদ্ধি**  
> **অফিশিয়াল ফেসবুক পেজ**: [facebook.com/ndmyouth](https://www.facebook.com/ndmyouth/)

---

## 🏛️ সংগঠনের ৪টি মৌলিক নীতি (Core Principles)
১. **জবাবদিহিতামূলক গণতন্ত্র (Accountable Democracy)**  
২. **বাংলাদেশী জাতীয়তাবাদ (Bangladeshi Nationalism)**  
৩. **ধর্মীয় মূল্যবোধ (Religious & Moral Values)**  
৪. **সর্বজনীন সামাজিক সুরক্ষা (Universal Social Security)**  

---

## 🌐 ভাষা ও প্রযুক্তিগত বৈশিষ্ট্য (Core Specifications)

- **অফিশিয়াল নাম**: **জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement - NDM)**
- **দ্বিভাষিক সমর্থন (Bilingual)**: বাংলা (ডিফল্ট) এবং ইংরেজি (English & Bengali UI with dynamic language switcher).
- **হোস্টিং প্ল্যাটফর্ম**: **Vercel** (Serverless, Edge CDN, Auto Git CI/CD).
- **ডকার পলিসি**: **Strictly No Docker** (Pure Node.js runtimes).
- **ডাটাবেজ আর্কিটেকচার**:
  - লোকাল ডেভেলপমেন্ট: ডেভেলপারের লোকাল ডাটাবেজ (`localhost`).
  - প্রোডাকশন: Vercel-এর সাথে যুক্ত ক্লাউড PostgreSQL (Neon / Supabase / Vercel Postgres).
  - ORM: **Prisma ORM** (দ্বিভাষিক স্কিমা সাপোর্টসহ).
- **ফ্রেমওয়ার্ক**: Next.js (App Router), React, Tailwind CSS, TypeScript, NextAuth.js.

---

## 📚 প্রজেক্ট ডকুমেন্টেশন (Documentation Links)

1. **[docs/idea.md](./docs/idea.md)**: **কৌশলগত রূপরেখা ও ধারণাপত্র (Strategic Blueprint)**
   - ভিশন, মিশন ও মূল আদর্শ
   - ৪টি প্রধান স্তম্ভ (নেতৃত্ব, তৃণমূল সংহতি, পলিসি গবেষণা, ডিজিটাল এক্টিভিজম)
   - টার্গেট অডিয়েন্স ও বার্ষিক কর্মপরিকল্পনা

2. **[docs/docs.md](./docs/docs.md)**: **মাস্টার টেকনিক্যাল ও অপারেশনাল গাইড (Master Tech & Ops Manual)**
   - দ্বিভাষিক (i18n) আর্কিটেকচার ও ডিকশনারি কাঠামো
   - সাংগঠনিক পদক্রম ও দায়িত্ব বণ্টন
   - সদস্য অনবোর্ডিং ও ভেরিফিকেশন ফ্লো
   - সম্পূর্ণ Prisma ডাটাবেজ স্কিমা (দ্বিভাষিক মডেলসহ)
   - সাইটম্যাপ ও প্রতিটি পৃষ্ঠার বিবরণ
   - লোকাল ডেভেলপমেন্ট ও Vercel ডেপ্লয়মেন্ট গাইড
