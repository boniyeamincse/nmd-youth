# জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement - NDM)
## পূর্ণাঙ্গ মাস্টার টেকনিক্যাল ও অপারেশনাল ডকুমেন্টেশন
### Complete Master Technical, Architectural & Operational Documentation

---

## ১. ভূমিকা ও প্রযুক্তিগত সিদ্ধান্ত (Introduction & Technical Decisions)

এই ডকুমেন্টটি **জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement – NDM)**-এর অফিশিয়াল ওয়েব প্ল্যাটফর্ম ও সদস্য ব্যবস্থাপনা সিস্টেমের বিস্তারিত স্থাপত্য ও বাস্তবায়ন নির্দেশিকা।

### মূল প্রযুক্তিগত ও পরিচালনাগত সিদ্ধান্ত (Core Architectural Decisions)
- **অফিশিয়াল নাম**: **জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন (Youth Movement - NDM)**
- **ভাষা সাপোর্ট (Bilingual Support)**: **বাংলা (ডিফল্ট)** এবং **ইংরেজি (English)**। ওয়ান-ক্লিক ল্যাঙ্গুয়েজ সুইচার দ্বারা সমগ্র ওয়েবসাইটের টেক্সট ও ডাইনামিক কনটেন্ট তাৎক্ষণিকভাবে সুইচ হবে।
- **হোস্টিং প্ল্যাটফর্ম (Hosting)**: **Vercel** (Serverless Next.js Hosting, Global Edge CDN, Zero Server Maintenance, Git CI/CD)।
- **ডকার পলিসি (Containerization)**: **কঠোরভাবে ডকারমুক্ত (STRICTLY NO DOCKER)** — সম্পূর্ণ লোকাল ডেভেলপমেন্ট এবং ক্লাউড বিল্ড পিওর Node.js রানটাইমে সম্পন্ন হবে।
- **ডাটাবেজ কৌশল (Database Strategy)**:
  - **ডেভেলপমেন্ট (Local Dev)**: ডেভেলপারের নিজস্ব লোকাল মেশিনের ডাটাবেজ (`localhost`-এ PostgreSQL / SQLite via Prisma ORM)।
  - **প্রোডাকশন (Vercel Production)**: ক্লাউড ম্যানেজড PostgreSQL (Neon, Supabase বা Vercel Postgres) পুলড কানেকশনের মাধ্যমে যুক্ত থাকবে।
- **টেকনোলজি স্ট্যাক (Selected Stack: Option A - Custom Modern Web Application)**:
  - **Frontend / Fullstack**: Next.js (App Router), React, Tailwind CSS, Lucide Icons, Shadcn UI প্রিন্সিপালস।
  - **Backend**: Next.js Route Handlers & Server Actions।
  - **ORM & Data Layer**: Prisma ORM (টাইপ-সেফ কুয়েরি, অটোমেটেড মাইগ্রেশন)।
  - **Auth & Security**: NextAuth.js (Session Handling, Role-Based Access Control, CSRF Protection, Zod Input Sanitization)।
  - **Excel/CSV Export**: `xlsx` / `csv-writer` লাইব্রেরি দিয়ে ১-ক্লিকে সদস্য তালিকা এক্সপোর্ট।

---

## ১.১ অফিশিয়াল প্রতীক, লোগো ও ব্র্যান্ড আইডেন্টিটি (Brand Identity & Design System)

মূল দল **জাতীয়তাবাদী গণতান্ত্রিক আন্দোলন (NDM)**-এর অফিশিয়াল নির্বাচনী প্রতীক ও লোগো সংবলিত আইডেন্টিটি যুব আন্দোলনের ওয়েবসাইটে প্রধান ব্র্যান্ডিং উপাদান হিসেবে ব্যবহৃত হবে।

![NDM Official Logo](./assets/ndm-logo.png)

### ১. লোগো ফাইল সংরক্ষণ লোকেশন:
- **ডকুমেন্টেশন রেফারেন্স**: `docs/assets/ndm-logo.png`
- **ওয়েব প্ল্যাটফর্ম অ্যাসেট**: `public/images/ndm-logo.png` ও `public/logo.png`

### ২. প্রাতিষ্ঠানিক কালার প্যালেট (Brand Color Palette):
| উপাদান | হেক্স কোড (Hex Code) | তাৎপর্য ও ব্যবহার |
| :--- | :--- | :--- |
| **গাঢ় সবুজ (NDM Primary Green)** | `#0D6938` / `#115E3B` | জাতীয় চেতনা, সমৃদ্ধি, সার্বভৌমত্ব ও প্রধান থিম কালার (হেডার, ফুটার, প্রাইমারি বাটন) |
| **উজ্জ্বল লাল (Vibrant Red)** | `#E5242B` / `#DC2626` | তরুণ সমাজের তেজ, আন্দোলন, সংগ্রাম ও জরুরি অ্যাকশন বাটন / ব্যাজ |
| **শুভ্র সাদা (Pure White)** | `#FFFFFF` | সততা, শান্তি, স্বচ্ছতা ও ব্যাকগ্রাউন্ড কনট্রাস্ট |
| **চারকোল ও টেক্সট ব্ল্যাক (Dark Charcoal)** | `#1E293B` / `#0F172A` | স্পষ্ট পঠনযোগ্যতা ও আধুনিক টাইপোগ্রাফি |

### ৩. টাইপোগ্রাফি নির্দেশিকা (Typography):
- **বাংলা ফন্ট**: Google Fonts থেকে `Hind Siliguri` অথবা `Noto Sans Bengali` (সহজপাঠ্য, সুন্দর ও ফরমাল)।
- **ইংরেজি ফন্ট**: `Inter` বা `Geist Sans` (আধুনিক ও ক্লিন লুক)।

### ৪. যুব আন্দোলনের মূল স্লোগান ও মোটো (Motto):
```
                       কর্ম  -----  সততা  -----  সমৃদ্ধি
                ( Action / Work  —  Integrity  —  Prosperity )
```

### ৫. অফিশিয়াল সোশ্যাল মিডিয়া লিংক (Official Social Links):
- **ফেসবুক পেজ (Facebook Page)**: [https://www.facebook.com/ndmyouth/](https://www.facebook.com/ndmyouth/)

---

## ২. দ্বিভাষিক সিস্টেম আর্কিটেকচার (Bilingual Architecture)

```mermaid
graph TD
    UserBrowser[ইউজার ব্রাউজার / Visitor] --> LangToggle{ভাষা নির্বাচন: 'বাংলা' | 'English'}
    
    subgraph UI Localization
        LangToggle -->|Static Strings| Locales[locales/bn.json ও locales/en.json]
        Locales --> UIComp[ন্যাভবার, ফুটার, ফর্ম লেবেল, বাটন ও ফিল্টার]
    end

    subgraph Dynamic Content Localization
        LangToggle -->|Content Filter| DBQuery[Prisma ORM Queries]
        DBQuery --> DBData[নোটিশ, ইভেন্ট, নেতৃত্ব ও গ্যালারি ডাটা]
        DBData -->|bn/en fields| RenderedContent[দ্বিভাষিক ডাইনামিক পেজ]
    end

    UIComp --> FinalPage[চূড়ান্ত রেন্ডারকৃত পৃষ্ঠা]
    RenderedContent --> FinalPage
```

- **স্ট্যাটিক টেক্সট**: মেনু আইটেম, বাটন, প্লেসহোল্ডার, ভ্যালিডেশন মেসেজ ইত্যাদি `locales/bn.json` ও `locales/en.json` থেকে লোড হবে।
- **ডাইনামিক কনটেন্ট**: নোটিশ, ইভেন্ট, নেতৃত্বের বায়োগ্রাফির জন্য ডাটাবেজে `titleBn` / `titleEn`, `contentBn` / `contentEn` ফিল্ড সংরক্ষিত থাকবে।

---

## ৩. ওয়েবসাইটের প্রধান পেজ ও ফিচার স্পেসিফিকেশন (Site Architecture)

### ১. হোমপেজ (Home - `/`)
- **হিরো ব্যানার ও স্লাইডার**: 
  - শীর্ষ নেতৃত্বের ভিশনারি বক্তব্য, সাম্প্রতিক সমাবেশের স্লাইডার ও সংগঠনের স্লোগান।
- **সংগঠনের মূল লক্ষ্য ও মিশন**:
  - সংক্ষিপ্ত পরিচিতি এবং ৪টি মৌলিক স্তম্ভের প্রিভিউ কার্ড।
- **"সদস্য পদ আবেদন করুন" (Join Us) CTA**:
  - হোমপেজের প্রাইমারি ফোকাস কল-টু-অ্যাকশন বাটন, যা সরাসরি `/join`-এ নিয়ে যাবে।
- **লাইভ কাউন্টার পরিসংখ্যান**:
  - মোট নিবন্ধিত সদস্য, সক্রিয় জেলা ও ক্যাম্পাস চ্যাপ্টারের লাইভ সংখ্যা।
- **সাম্প্রতিক কার্যক্রম ও খবর (Recent News & Press Releases)**:
  - সর্বশেষ প্রেস রিলিজ এবং সংবাদ বিবৃতির গ্রিড।
- **ফটো ও ভিডিও গ্যালারির ঝলক (Gallery Preview)**:
  - আন্দোলন ও সমাজসেবামূলক কাজের নির্বাচিত ছবি ও ভিডিও প্রিভিউ।

---

### ২. আমাদের সম্পর্কে (About Us - `/about`)
- **সংগঠনের ৪টি মৌলিক নীতি (4 Core Principles)**:
  1. **জবাবদিহিতামূলক গণতন্ত্র (Accountable Democracy)**: জনগণের ক্ষমতায়ন, সুশাসন ও অবাধ গণতান্ত্রিক চর্চা।
  2. **বাংলাদেশী জাতীয়তাবাদ (Bangladeshi Nationalism)**: ধর্ম-বর্ণ নির্বিশেষে সকল নাগরিকের ঐক্যবদ্ধ জাতীয় পরিচয় ও অখণ্ড সার্বভৌমত্ব।
  3. **ধর্মীয় মূল্যবোধ (Religious & Moral Values)**: সাম্প্রদায়িক সম্প্রীতি, সামাজিক সুবিচার এবং মানবিক ও নৈতিক মূল্যবোধের প্রতিষ্ঠা।
  4. **সর্বজনীন সামাজিক সুরক্ষা (Universal Social Security)**: দারিদ্র্য বিমোচন, শিক্ষা, স্বাস্থ্যসেবা ও নাগরিক কল্যাণ রাষ্ট্রের প্রতিশ্রুতি।
- **সংগঠনের ইতিহাস ও পটভূমি**: যুব আন্দোলনের সূচনা, পটভূমি ও লক্ষ্য।
- **ঘোষণাপত্র ও গঠনতন্ত্র (Constitution & Manifesto)**: 
  - মূল গঠনতন্ত্রের সংক্ষিপ্ত রূপ ও **অফিশিয়াল গঠনতন্ত্রের PDF ডাউনলোড** বাটন।
- **ভিশন ও মিশন**: নীতি ও নৈতিক নেতৃত্বের বিশদ আলোচনা।
- **মূল দল (NDM - National Democratic Movement)-এর সাথে সংযোগ**:
  - জাতীয় গণতান্ত্রিক আন্দোলন (NDM)-এর মূল দর্শন, আদর্শিক সংযোগ ও সহায়ক যুব উইং হিসেবে এর স্বতন্ত্র ভূমিকা।

---

### ৩. নেতৃত্ব ও কমিটি (Leadership & Committees - `/leadership`)
- **কেন্দ্রীয় কমিটি (Central Committee)**:
  - কেন্দ্রীয় সভাপতি, সাধারণ সম্পাদক ও সম্পাদকমণ্ডলীর প্রোফাইল কার্ড (উচ্চমানের ছবি, পদবী, বায়োগ্রাফি ও কন্টাক্ট লিঙ্ক)।
- **বিভাগীয় ও জেলা আহ্বায়ক কমিটি (Divisional & District Committees)**:
  - ৮টি বিভাগ এবং ৬৪ জেলার আহ্বায়ক/যুগ্ম আহ্বায়কদের তথ্য ও চ্যাপ্টার স্ট্যাটাস।
- **ক্যাম্পাস চ্যাপ্টার সমন্বয়ক (Campus Coordinators)**:
  - পাবলিক বিশ্ববিদ্যালয়, মেডিকেল ও কলেজসমূহের প্রতিনিধি তালিকা।

---

### ৪. সংবাদ ও প্রেস বিজ্ঞপ্তি (News & Press Releases - `/notices` & `/notices/[slug]`)
- **ফিল্টারিং ও ক্যাটাগরাইজেশন**:
  - প্রেস বিজ্ঞপ্তি (Official Press Release)
  - শীর্ষ নেতৃত্বের বক্তব্য (Statements & Speeches)
  - মাঠপর্যায়ের আন্দোলন-সংগ্রাম (Field Movement & Rallies)
  - সাংগঠনিক সার্কুলার (Organizational Memos)
- **সার্চ ও আর্কাইভ**: তারিখ এবং জেলাভিত্তিক সার্চ ফিল্টার।
- **শেয়ারিং ও প্রিন্ট**: সোশ্যাল মিডিয়া শেয়ার বাটন ও পিডিএফ ডাউনলোড।

---

### ৫. ইভেন্ট ও কার্যক্রম (Activities & Events - `/events` & `/events/[slug]`)
- **আসন্ন কর্মসূচি ও সেমিনার ক্যালেন্ডার**:
  - তারিখ, সময়, স্থান (গুগল ম্যাপ লিঙ্কসহ) ও অনলাইন মিটিং লিঙ্ক (যদি থাকে)।
  - **ইভেন্ট RSVP বাটন**: সদস্যরা সরাসরি ১-ক্লিকে অংশগ্রহণের টিকিট কনফার্ম করতে পারবেন।
- **অতীত কর্মসূচির বিস্তারিত প্রতিবেদন (Past Events Archive)**:
  - সমাপ্ত হওয়া সমাবেশের উপস্থিতি রিপোর্ট, প্রেস ব্রিফিং ও ফটোগ্যালারি।

---

### ৬. যোগদান ফর্ম ও সদস্যপদ (Join the Movement / Membership - `/join`)
- **মাল্টি-স্টেপ অনলাইন আবেদন ফর্ম**:
  1. **ব্যক্তিগত তথ্য**: পূর্ণ নাম (বাংলা ও ইংরেজি), রক্তের গ্রুপ, জন্মতারিখ, ছবি।
  2. **পরিচয়পত্র যাচাই**: জাতীয় পরিচয়পত্র (NID) নম্বর অথবা জন্মনিবন্ধন নম্বর / স্টুডেন্ট আইডি।
  3. **যোগাযোগ ও ঠিকানা**: মোবাইল নম্বর (ওটিপি/ভেরিফিকেশন উপযোগী), ইমেইল, স্থায়ী ও বর্তমান ঠিকানা (বিভাগ, জেলা, উপজেলা/থানা)।
  4. **শিক্ষাগত ও পেশাগত যোগ্যতা**: সর্বশেষ শিক্ষাপ্রতিষ্ঠান, ডিগ্রি, পেশা, বিশেষ দক্ষতা (যেমন: আইটি, মিডিয়া, বক্তব্য, সংগঠন)।
  5. **পছন্দের কার্যবিভাগ**: স্বেচ্ছাসেবক শাখা, ছাত্র নেতৃত্ব, পলিসি গবেষণা, প্রচার ও প্রচারণা।
- **অটোমেটেড কনফার্মেশন ও ডিজিটাল আবেদন স্লিপ**:
  - ফর্ম সাবমিটের পর তাৎক্ষণিকভাবে একটি **ডিজিটাল আবেদন স্লিপ (Application Slip)** বা সাময়িক কিউআর কোড প্রস্তুত হবে, যা প্রিন্ট বা PDF হিসেবে সংরক্ষণ করা যাবে।

---

### ৭. মিডিয়া গ্যালারি (Media Gallery - `/gallery`)
- **ফটো অ্যালবাম (Photo Gallery)**: সমাবেশ, মিটিং, ত্রাণ বিতরণ ও বৃক্ষরোপণের হাই-রেজ্যুলেশন ছবি অ্যালবামভিত্তিক ক্যাটাগরিতে প্রদর্শন।
- **ভিডিও গ্যালারি (Video Hub)**: আন্দোলনের ইউটিউব ভিডিও, প্রেস কনফারেন্স এবং ডকুমেন্টারি সরাসরি এম্বেডেড প্লেয়ারে দেখার ব্যবস্থা।

---

### ৮. যোগাযোগ ও কেন্দ্রীয় কার্যালয় (Contact Us - `/contact`)
- **অফিসিয়াল যোগাযোগের তথ্য**: কেন্দ্রীয় কার্যালয়ের ঠিকানা, ২৪/৭ হটলাইন নম্বর, প্রাতিষ্ঠানিক ইমেইল।
- **ইন্টারেক্টিভ গুগল ম্যাপ**: দলীয় কার্যালয়ের ভৌগোলিক অবস্থান সরাসরি ওয়েবসাইটে এম্বেড থাকবে।
- **যোগাযোগ ফর্ম (Feedback / Inquiry Form)**: সাধারণ নাগরিক বা গণমাধ্যম প্রতিনিধিদের সরাসরি বার্তা পাঠানোর ফর্ম।
- **সোশ্যাল মিডিয়া চ্যানেল**: অফিশিয়াল ফেসবুক পেজ: [facebook.com/ndmyouth](https://www.facebook.com/ndmyouth/), ইউটিউব চ্যানেল ও টুইটার/এক্স প্রোফাইল লিঙ্ক।

---

## ৪. অ্যাডমিন প্যানেল ও সিকিউরিটি ফিচার স্পেসিফিকেশন

```mermaid
graph TD
    Admin[Admin Login: /admin/login] --> AuthCheck{Role Verification}
    
    AuthCheck -->|Super Admin| AllPrivileges[সম্পূর্ণ নিয়ন্ত্রণ: কনটেন্ট, সদস্য অনুমোদন, চ্যাপ্টার, সিস্টেম সেটিংস]
    AuthCheck -->|Editor / Media| ContentPrivileges[সংবাদ, প্রেস রিলিজ, ইভেন্ট ও গ্যালারি আপলোড]
    AuthCheck -->|Moderator / Scrutiny| MemberPrivileges[সদস্য আবেদন যাচাই, অনুমোদন ও এক্সেল এক্সপোর্ট]

    MemberPrivileges --> ExportCSV[Excel / CSV-তে মেম্বার ডাটা এক্সপোর্ট]
    MemberPrivileges --> ApprovalEngine[১-ক্লিকে সদস্য অনুমোদন ও ডিজিটাল কার্ড ইস্যু]
```

### ১. অ্যাডমিন ড্যাশবোর্ড ওভারভিউ (`/admin`)
- রিয়েলটাইম মেট্রিক্স: মোট আবেদনকারী, অনুমোদিত সক্রিয় সদস্য, জেলাভিত্তিক পরিসংখ্যান, আজকের নতুন ভিজিটর ও আবেদন।

### ২. সদস্য ডাটাবেস ব্যবস্থাপনা (`/admin/members`)
- **ফিল্টারিং ও সার্চিং**: জেলা, উপজেলা, শিক্ষাপ্রতিষ্ঠান, রক্তের গ্রুপ ও আবেদন স্ট্যাটাস (`PENDING`, `APPROVED`, `REJECTED`) অনুসারে ফিল্টার।
- **যাচাই ও অনুমোদন**: ১-ক্লিকে আবেদন যাচাই, এপ্রুভাল এবং সিস্টেম কর্তৃক স্বয়ংক্রিয় সদস্য আইডি (`NDM-Y-YYYY-XXXX`) তৈরি।
- **এক্সেল ও সিএসভি এক্সপোর্ট (Excel/CSV Export)**: নির্দিষ্ট জেলা বা সমগ্র দেশের সদস্যদের তালিকা ১-ক্লিকে এক্সেল শিটে ডাউনলোড করার সুবিধা।

### ৩. কনটেন্ট ম্যানেজমেন্ট ইঞ্জিন (`/admin/content`)
- রিচ টেক্সট এডিটর দিয়ে প্রেস বিজ্ঞপ্তি, নোটিশ ও বক্তব্যের বাংলা-ইংরেজি ড্রাফট তৈরি ও প্রকাশনা।
- ইভেন্ট শিডিউলিং ও গ্যালারি ফটো আপলোড।

### ৪. নিরাপত্তা ও সুরক্ষা ব্যবস্থা (Security Features)
- **রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC)**:
  - `SUPER_ADMIN`: সম্পূর্ণ সিস্টেম ও ডাটাবেজ এক্সেস।
  - `EDITOR`: শুধুমাত্র কনটেন্ট ও মিডিয়া প্রকাশ।
  - `MODERATOR`: শুধুমাত্র সদস্য আবেদন যাচাই ও এক্সপোর্ট।
- **রেট লিমিটিং (Rate Limiting)**: স্প্যাম ও বট আক্রমণ থেকে ফর্ম সুরক্ষিত রাখতে IP-ভিত্তিক রেট লিমিটিং।
- **ইনপুট স্যানিটাইজেশন**: XSS ও SQL Injection প্রতিরোধে Zod ভ্যালিডেশন স্কিমা।
- **ডাটা সুরক্ষা**: পাসওয়ার্ড সংরক্ষণ হবে ক্রিপ্টোগ্রাফিক Bcrypt হ্যাশিংয়ের মাধ্যমে।

---

## ৫. দ্বিভাষিক ডাটাবেজ স্কিমা (Prisma Models - Zero Docker Compatible)

```prisma
datasource db {
  provider = "postgresql" // লোকাল ডেভেলপমেন্টে লোকাল Postgres, প্রোডাকশনে Vercel Managed Postgres
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  EDITOR
  MODERATOR
  MEMBER
  VOLUNTEER
}

enum MemberStatus {
  PENDING
  APPROVED
  SUSPENDED
  REJECTED
}

enum NoticeCategory {
  PRESS_RELEASE       // প্রেস বিজ্ঞপ্তি
  STATEMENT           // শীর্ষ নেতৃত্বের বক্তব্য
  MOVEMENT_ACTION     // আন্দোলন-সংগ্রামের কর্মসূচি
  ORGANIZATIONAL_MEMO // সাংগঠনিক সার্কুলার
}

model User {
  id               String        @id @default(cuid())
  nameBn           String        // নাম (বাংলা)
  nameEn           String        // Name (English)
  email            String        @unique
  phone            String        @unique
  passwordHash     String
  role             Role          @default(VOLUNTEER)
  status           MemberStatus  @default(PENDING)
  memberCode       String?       @unique // e.g. "NDM-Y-2026-0001"
  nidOrBirthCert   String?       // NID বা জন্মনিবন্ধন
  institution      String?       // শিক্ষাপ্রতিষ্ঠান / কর্মক্ষেত্র
  bloodGroup       String?       // রক্তের গ্রুপ
  presentAddress   String?       // বর্তমান ঠিকানা
  permanentAddress String?       // স্থায়ী ঠিকানা
  district         String        // জেলা
  division         String        // বিভাগ
  wingInterest     String?       // পছন্দের কার্যবিভাগ
  skills           String?       // বিশেষ দক্ষতা
  avatarUrl        String?
  bioBn            String?
  bioEn            String?
  preferredLang    String        @default("bn")
  appliedAt        DateTime      @default(now())
  verifiedAt       DateTime?

  // Relations
  registrations    EventRegistration[]
  publishedNotices Notice[]
  auditLogs        AuditLog[]

  @@index([role, status, district])
}

model Notice {
  id            String          @id @default(cuid())
  titleBn       String          // শিরোনাম (বাংলা)
  titleEn       String          // Title (English)
  slug          String          @unique
  contentBn     String          // বিস্তারিত বিবরণ (বাংলা)
  contentEn     String          // Content (English)
  category      NoticeCategory  @default(PRESS_RELEASE)
  attachmentPdf String?         // পিডিএফ ডাউনলোড লিঙ্ক
  featuredImage String?
  isPinned      Boolean         @default(false)
  publishedAt   DateTime        @default(now())
  authorId      String
  author        User            @relation(fields: [authorId], references: [id])

  @@index([category, publishedAt])
}

model Event {
  id            String              @id @default(cuid())
  titleBn       String              // ইভেন্ট শিরোনাম (বাংলা)
  titleEn       String              // Event Title (English)
  slug          String              @unique
  summaryBn     String              // সংক্ষিপ্ত রূপ
  summaryEn     String
  descriptionBn String              // বিস্তারিত প্রতিবেদন / শিডিউল
  descriptionEn String
  bannerUrl     String?
  venueBn       String              // স্থান (বাংলা)
  venueEn       String              // Venue (English)
  mapLocation   String?             // গুগল ম্যাপ লিঙ্ক
  isOnline      Boolean             @default(false)
  meetingUrl    String?
  startDate     DateTime
  endDate       DateTime
  isCompleted   Boolean             @default(false)
  createdAt     DateTime            @default(now())

  // Relations
  registrations EventRegistration[]

  @@index([startDate, isCompleted])
}

model EventRegistration {
  id           String    @id @default(cuid())
  eventId      String
  event        Event     @relation(fields: [eventId], references: [id], onDelete: Cascade)
  userId       String
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  ticketCode   String    @unique @default(cuid())
  attended     Boolean   @default(false)
  registeredAt DateTime  @default(now())

  @@unique([eventId, userId])
}

model GalleryItem {
  id          String   @id @default(cuid())
  titleBn     String   // ছবির শিরোনাম (বাংলা)
  titleEn     String   // Title (English)
  type        String   // "PHOTO" বা "YOUTUBE_VIDEO"
  mediaUrl    String   // ইমেজ URL অথবা ইউটিউব ভিডিও লিঙ্ক
  albumName   String   // অ্যালবামের নাম (যেমন: "জাতীয় সমাবেশ ২০২৬")
  createdAt   DateTime @default(now())

  @@index([type, albumName])
}

model AuditLog {
  id            String   @id @default(cuid())
  action        String   // e.g., "MEMBER_VERIFIED", "NOTICE_PUBLISHED"
  targetEntity  String
  details       String?
  performedById String
  performedBy   User     @relation(fields: [performedById], references: [id])
  createdAt     DateTime @default(now())
}
```

---

## ৬. লোকাল ডেভেলপমেন্ট ও Vercel গাইড (কঠোরভাবে ডকারমুক্ত)

### লোকাল ডেভেলপমেন্ট প্রসেস
1. **ডিপেনডেন্সি ইনস্টল**:
   ```bash
   npm install
   ```
2. **পরিবেশ ভেরিয়েবল সেটআপ (`.env.local`)**:
   ```env
   # আপনার লোকাল PostgreSQL ডাটাবেজ
   DATABASE_URL="postgresql://boni:password@localhost:5432/ndm_youth_dev?schema=public"

   # নেক্সট-অথ ও নিরাপত্তা কি
   NEXTAUTH_SECRET="ndm-youth-movement-secure-jwt-secret-key-32chars"
   NEXTAUTH_URL="http://localhost:3000"

   # ডিফল্ট ল্যাঙ্গুয়েজ
   NEXT_PUBLIC_DEFAULT_LOCALE="bn"
   ```
3. **ডাটাবেজ মাইগ্রেশন ও স্কিমা সিঙ্ক**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **সার্ভার স্টার্ট**:
   ```bash
   npm run dev
   ```
   অ্যাপ্লিকেশন রান করবে: `http://localhost:3000`

### Vercel প্রোডাকশন ডেপ্লয়মেন্ট (জিরো ডকার)
1. **GitHub রিপোজিটরিতে কোড পুশ করুন**:
   ```bash
   git add .
   git commit -m "feat: complete production-ready NDM youth portal"
   git push origin main
   ```
2. **Vercel ড্যাশবোর্ডে প্রজেক্ট কানেক্ট করুন**:
   - Vercel-এ গিট রিপোজিটরি ইমপোর্ট করুন।
   - Environment Variables-এ প্রোডাকশন ক্লাউড ডাটাবেজ স্ট্রিং (`DATABASE_URL`) এবং `NEXTAUTH_SECRET` প্রদান করুন।
   - Build Command: `prisma generate && next build`
3. **তাত্ক্ষণিক ডেপ্লয়**: Vercel কয়েক সেকেন্ডের মধ্যে সম্পূর্ণ সাইট লাইভ করে দেবে। কোনো ডকার বা ম্যানুয়াল ক্লাউড ইঞ্জিন কনফিগার করতে হবে না।
