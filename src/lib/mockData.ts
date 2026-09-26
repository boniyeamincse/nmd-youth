import { 
  LeadershipPerson, 
  NoticeItem, 
  EventItem, 
  GalleryMedia, 
  MemberApplication,
  CommitteeItem,
  TaskWorkflowItem,
  FinanceItem,
  TrainingItem,
  VolunteerBloodItem,
  GrievanceItem,
  DocumentArchiveItem
} from "@/types";

export const initialLeadership: LeadershipPerson[] = [
  {
    id: "lead-1",
    nameBn: "ববি হাজ্জাজ",
    nameEn: "Bobby Hajjaj",
    roleBn: "চেয়ারম্যান, জাতীয়তাবাদী গণতান্ত্রিক আন্দোলন (NDM) ও প্রধান পৃষ্ঠপোষক",
    roleEn: "Chairman, NDM & Chief Patron",
    category: "central",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bioBn: "সুশাসন ও সার্বভৌমত্বের রাজনীতিতে তরুণদের মেধা ও নৈতিক নেতৃত্ব প্রতিষ্ঠার স্বপ্নদ্রষ্টা।",
    bioEn: "Visionary leader advocating for merit-based youth politics, good governance, and national sovereignty.",
    email: "chairman@ndmbd.org"
  },
  {
    id: "lead-2",
    nameBn: "মো: আরিফুল ইসলাম",
    nameEn: "Md. Ariful Islam",
    roleBn: "কেন্দ্রীয় সভাপতি, জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন",
    roleEn: "Central President, Youth Movement - NDM",
    category: "central",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bioBn: "তৃণমূল পর্যায়ে যুবসমাজকে সংগঠিত করা ও নীতি সংস্কারে নেতৃত্ব দিচ্ছেন।",
    bioEn: "Dedicated youth organizer leading grassroots mobilization and policy reforms.",
    email: "president@ndmyouth.org"
  },
  {
    id: "lead-3",
    nameBn: "ফারহানা ইয়াসমিন",
    nameEn: "Farhana Yasmin",
    roleBn: "কেন্দ্রীয় সাধারণ সম্পাদক",
    roleEn: "Central General Secretary",
    category: "central",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bioBn: "নারীর ক্ষমতায়ন, শিক্ষানীতি এবং নাগরিক অধিকার বিষয়ে তরুণদের প্ল্যাটফর্মে সক্রিয়।",
    bioEn: "Spearheading women empowerment, educational policy advocacy, and civic rights.",
    email: "gs@ndmyouth.org"
  },
  {
    id: "lead-4",
    nameBn: "তানভীর হাসান",
    nameEn: "Tanveer Hasan",
    roleBn: "যুগ্ম সাধারণ সম্পাদক ও আইটি উইং প্রধান",
    roleEn: "Joint General Secretary & IT Wing Lead",
    category: "central",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
    bioBn: "ডিজিটাল এক্টিভিজম ও তরুণ উদ্যোক্তাদের সংযোগ সাধনে নিবেদিত।",
    bioEn: "Focusing on civic tech, digital democracy, and young entrepreneurship networks.",
    email: "it@ndmyouth.org"
  },
  {
    id: "lead-5",
    nameBn: "কাজী রাকিবুল করিম",
    nameEn: "Kazi Rakibul Karim",
    roleBn: "বিভাগীয় সমন্বয়ক (চট্টগ্রাম বিভাগ)",
    roleEn: "Divisional Coordinator (Chittagong)",
    category: "division",
    districtBn: "চট্টগ্রাম",
    districtEn: "Chittagong",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bioBn: "চট্টগ্রাম অঞ্চলে জেলা ও উপজেলা পর্যায়ে তৃণমূল যুব কমিটি গঠনে অগ্রণী ভূমিকা পালন করছেন।",
    bioEn: "Spearheading district and upazila committee formations across Chittagong division."
  },
  {
    id: "lead-6",
    nameBn: "মাহমুদুর রহমান",
    nameEn: "Mahmudur Rahman",
    roleBn: "ক্যাম্পাস সমন্বয়ক (ঢাকা বিশ্ববিদ্যালয় শাখা)",
    roleEn: "Campus Coordinator (Dhaka University)",
    category: "campus",
    districtBn: "ঢাকা বিশ্ববিদ্যালয়",
    districtEn: "Dhaka University",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    bioBn: "ক্যাম্পাসে গণতান্ত্রিক বিতর্ক চর্চা ও শিক্ষার্থীদের ন্যায্য অধিকার প্রতিষ্ঠায় নেতৃত্ব দিচ্ছেন।",
    bioEn: "Leading student advocacy, campus debates, and merit-based leadership development."
  }
];

export const initialNotices: NoticeItem[] = [
  {
    id: "not-1",
    slug: "youth-manifesto-2026",
    titleBn: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলনের আনুষ্ঠানিক আত্মপ্রকাশ ও লক্ষ্য ঘোষণা",
    titleEn: "Official Launch & Ideological Manifesto of Youth Movement - NDM",
    category: "STATEMENT",
    date: "২০২৬-০৩-১৫",
    isPinned: true,
    contentBn: "আজ এক সংবাদ সম্মেলনে যুব আন্দোলনের রূপরেখা ও ৪টি মূলনীতি ঘোষণা করা হয়। জবাবদিহিতামূলক গণতন্ত্র, বাংলাদেশী জাতীয়তাবাদ, ধর্মীয় মূল্যবোধ এবং সর্বজনীন সামাজিক সুরক্ষার ভিত্তিতে নতুন নেতৃত্বের সূচনা হলো।",
    contentEn: "At an official press conference, the core 4 principles of the Youth Movement were declared: Accountable Democracy, Bangladeshi Nationalism, Moral Values, and Universal Social Security."
  },
  {
    id: "not-2",
    slug: "press-release-youth-employment",
    titleBn: "প্রেস বিজ্ঞপ্তি: শিক্ষিত বেকারত্ব নিরসনে জরুরি নীতি সংস্কারের দাবি",
    titleEn: "Press Release: Urgent Demands for Youth Employment & Educational Reform",
    category: "PRESS_RELEASE",
    date: "২০২৬-০৩-১০",
    isPinned: false,
    contentBn: "দেশের কর্মক্ষম যুবশক্তির যথাযথ মূল্যায়ন এবং স্টার্টআপ ও কারিগরি শিক্ষার জন্য জাতীয় বাজেট বরাদ্দের জোর দাবি জানিয়েছে যুব আন্দোলন।",
    contentEn: "The Youth Movement calls for enhanced budgetary allocation for vocational skill development and startup funding to tackle youth unemployment."
  },
  {
    id: "not-3",
    slug: "national-youth-assembly-call",
    titleBn: "সাংগঠনিক সার্কুলার: ৬৪ জেলায় যুব কাউন্সিল ও সদস্য সংগ্রহ অভিযান শুরু",
    titleEn: "Organizational Circular: Nationwide Membership Drive Across 64 Districts",
    category: "ORGANIZATIONAL_MEMO",
    date: "২০২৬-০২-২৮",
    isPinned: false,
    contentBn: "সকল বিভাগ ও জেলা শাখাকে অবিলম্বে নতুন সদস্য সংগ্রহ এবং ডিজিটাল আইডি কার্ড বিতরণের নির্দেশ দেওয়া হয়েছে।",
    contentEn: "All divisional and district units are instructed to accelerate the digital membership registration drive and distribute digital ID cards."
  }
];

export const initialEvents: EventItem[] = [
  {
    id: "ev-1",
    slug: "national-youth-congress-2026",
    titleBn: "জাতীয় যুব সমাবেশ ও পলিসি সম্মেলন ২০২৬",
    titleEn: "National Youth Congress & Policy Summit 2026",
    summaryBn: "সারাদেশের জেলা ও ক্যাম্পাস প্রতিনিধিদের মিলনমেলা ও আগামীর কর্মপরিকল্পনা প্রণয়ন।",
    summaryEn: "Grand convention of delegates from all 64 districts and universities to unveil national policy agenda.",
    descriptionBn: "এই সমাবেশে মূল দল NDM-এর শীর্ষ নেতৃবৃন্দ এবং দেশের বরেণ্য শিক্ষাবিদগণ তরুণদের দিকনির্দেশনা প্রদান করবেন। উপস্থিত সকল সদস্যকে বিশেষ প্রতিনিধি সম্মাননা দেওয়া হবে।",
    descriptionEn: "Top leadership of NDM alongside distinguished academics will address the gathering, focusing on governance reforms and youth participation.",
    date: "২০২৬-১০-১৫",
    time: "সকাল ১০:০০ টা",
    venueBn: "ইঞ্জিনিয়ার্স ইনস্টিটিউশন মিলনায়তন, ঢাকা",
    venueEn: "Engineers Institution Auditorium, Dhaka",
    isUpcoming: true,
    registeredCount: 342
  },
  {
    id: "ev-2",
    slug: "chittagong-youth-dialogue",
    titleBn: "চট্টগ্রাম বিভাগীয় তরুণের কণ্ঠস্বর গোলটেবিল",
    titleEn: "Chittagong Divisional Youth Voice Townhall",
    summaryBn: "চট্টগ্রামের কর্মসংস্থান ও শিল্পায়নে তরুণদের ভূমিকা বিষয়ক মুক্ত সংলাপ।",
    summaryEn: "Open dialogue on youth employment, port industrialization, and regional civic participation.",
    descriptionBn: "স্থানীয় বিশ্ববিদ্যালয়ের শিক্ষক, শিক্ষার্থী ও তরুণ পেশাজীবীদের সমন্বয়ে এই মুক্ত মতবিনিময় সভা অনুষ্ঠিত হবে।",
    descriptionEn: "Interactive roundtable bringing students, entrepreneurs, and policymakers together.",
    date: "২০২৬-১১-০২",
    time: "বিকাল ৩:৩০ টা",
    venueBn: "চট্টগ্রাম প্রেস ক্লাব কনফারেন্স হল",
    venueEn: "Chittagong Press Club Conference Hall",
    isUpcoming: true,
    registeredCount: 128
  },
  {
    id: "ev-3",
    slug: "tree-plantation-flood-relief-archive",
    titleBn: "সবুজ বাংলাদেশ অভিযান ও পরিবেশ রক্ষা কর্মসূচি",
    titleEn: "Green Bangladesh Vanguard & Climate Action Drive",
    summaryBn: "দেশব্যাপী ১০,০০০ ফলদ ও বনজ বৃক্ষরোপণ এবং বর্জ্য নিষ্কাশন সচেতনতা।",
    summaryEn: "Nationwide planting of 10,000 saplings and community environmental cleanup campaign.",
    descriptionBn: "যুব আন্দোলনের স্বেচ্ছাসেবক উইংয়ের উদ্যোগে দেশের বিভিন্ন জেলায় এই সামাজিক উদ্যোগ অত্যন্ত সফলভাবে সম্পন্ন হয়েছে।",
    descriptionEn: "Volunteers from the youth movement conducted large-scale tree planting and waste management drives.",
    date: "২০২৬-০২-২০",
    time: "সকাল ৯:০০ টা",
    venueBn: "দেশব্যাপী একযোগে",
    venueEn: "Simultaneously Nationwide",
    isUpcoming: false,
    registeredCount: 650
  }
];

export const initialGallery: GalleryMedia[] = [
  {
    id: "gal-1",
    titleBn: "জাতীয় প্রেস ক্লাবে কেন্দ্রীয় সংবাদ সম্মেলন ও যুব বার্তা প্রদান",
    titleEn: "Central Press Briefing at National Press Club",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop&q=80",
    albumBn: "সংবাদ সম্মেলন",
    albumEn: "Press Conferences"
  },
  {
    id: "gal-2",
    titleBn: "তারুণ্যের পদযাত্রা ও গণতান্ত্রিক অধিকার রক্ষার সমাবেশ",
    titleEn: "Youth March for Democratic Rights & Good Governance",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&auto=format&fit=crop&q=80",
    albumBn: "আন্দোলন ও কর্মসূচি",
    albumEn: "Rallies & Movements"
  },
  {
    id: "gal-3",
    titleBn: "তৃণমূল পর্যায়ে তরুণদের সাথে উন্মুক্ত নীতি সংলাপ ও মতবিনিময়",
    titleEn: "Grassroots Youth Policy Dialogue & Community Exchange",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&auto=format&fit=crop&q=80",
    albumBn: "গোলটেবিল বৈঠক",
    albumEn: "Roundtables"
  },
  {
    id: "gal-4",
    titleBn: "বন্যাদুর্গতদের মাঝে যুব আন্দোলনের জরুরি ত্রাণ ও চিকিৎসা সহায়তা বিতরণ",
    titleEn: "Disaster Relief and Medical Aid Distribution by Youth Corps",
    type: "PHOTO",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    albumBn: "সামাজিক সেবা",
    albumEn: "Social Services"
  },
  {
    id: "gal-5",
    titleBn: "যুব আন্দোলনের প্রতিষ্ঠা বার্ষিকীর পূর্ণাঙ্গ ভিডিও প্রতিবেদন",
    titleEn: "Anniversary Celebration & Keynote Speech Video",
    type: "YOUTUBE_VIDEO",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Embeddable reference
    albumBn: "ভিডিও বার্তা",
    albumEn: "Video Statements"
  }
];

export const initialMembers: MemberApplication[] = [
  {
    id: "mem-1",
    memberCode: "NDM-Y-2026-0001",
    nameBn: "হাসিবুল ইসলাম শাওন",
    nameEn: "Hasibul Islam Shaon",
    phone: "01711223344",
    email: "shaon@example.com",
    nidOrBirthCert: "19982691234567890",
    bloodGroup: "B+",
    division: "ঢাকা",
    district: "ঢাকা",
    presentAddress: "মিরপুর-১০, ঢাকা",
    institution: "ঢাকা বিশ্ববিদ্যালয় (স্নাতকোত্তর)",
    wingInterest: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
    skills: "বিতর্ক, পলিসি ড্রাফটিং, সমাজবিজ্ঞান",
    status: "APPROVED",
    appliedAt: "2026-03-01",
    verifiedAt: "2026-03-03"
  },
  {
    id: "mem-2",
    memberCode: "NDM-Y-2026-0002",
    nameBn: "সানজিদা আক্তার নিপা",
    nameEn: "Sanjida Akter Nipa",
    phone: "01812345678",
    email: "nipa@example.com",
    nidOrBirthCert: "20011591234567891",
    bloodGroup: "O+",
    division: "চট্টগ্রাম",
    district: "চট্টগ্রাম",
    presentAddress: "জিইসি মোড়, চট্টগ্রাম",
    institution: "চট্টগ্রাম বিশ্ববিদ্যালয়",
    wingInterest: "ক্যাম্পাস ও ছাত্র নেতৃত্ব",
    skills: "সাংগঠনিক নেতৃত্ব, পাবলিক স্পিকিং",
    status: "APPROVED",
    appliedAt: "2026-03-05",
    verifiedAt: "2026-03-06"
  },
  {
    id: "mem-3",
    memberCode: "NDM-Y-2026-0003",
    nameBn: "রাকিব হাসান সজীব",
    nameEn: "Rakib Hasan Sojib",
    phone: "01999887766",
    email: "rakib@example.com",
    nidOrBirthCert: "19998812345678922",
    bloodGroup: "A+",
    division: "রাজশাহী",
    district: "বগুড়া",
    presentAddress: "সাতমাথা, বগুড়া",
    institution: "সরকারি আজিজুল হক কলেজ",
    wingInterest: "প্রচার, মিডিয়া ও আইটি",
    skills: "গ্রাফিক ডিজাইন, ভিডিও এডিটিং, সোশ্যাল মিডিয়া",
    status: "PENDING",
    appliedAt: "2026-03-12"
  },
  {
    id: "mem-4",
    memberCode: "NDM-Y-2026-0004",
    nameBn: "মাহমুদা বেগম রেশমা",
    nameEn: "Mahmuda Begum Reshma",
    phone: "01611002233",
    email: "reshma@example.com",
    nidOrBirthCert: "20005512345678933",
    bloodGroup: "AB+",
    division: "সিলেট",
    district: "সিলেট",
    presentAddress: "আম্বরখানা, সিলেট",
    institution: "শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
    wingInterest: "স্বেচ্ছাসেবক ও দুর্যোগ ব্যবস্থাপনা",
    skills: "ফার্স্ট এইড, স্বেচ্ছাসেবা, মাঠপর্যায়ের সমন্বয়",
    status: "PENDING",
    appliedAt: "2026-03-14"
  }
];

export const initialCommittees: CommitteeItem[] = [
  {
    id: "com-1",
    nameBn: "কেন্দ্রীয় কার্যনির্বাহী সংসদ (২০২৬-২০২৮)",
    nameEn: "Central Executive Committee",
    chapterBn: "কেন্দ্রীয় সংসদ",
    chapterType: "CENTRAL",
    convenerBn: "মো: আরিফুল ইসলাম (সভাপতি)",
    convenerPhone: "01711000001",
    secretaryBn: "ফারহানা ইয়াসমিন (সাধারণ সম্পাদক)",
    membersCount: 51,
    termDuration: "২ বছর (২০২৬ - ২০২৮)",
    expiryDate: "2028-03-15",
    status: "ACTIVE",
    resolutionNo: "NDM-Y/CEC/2026-01"
  },
  {
    id: "com-2",
    nameBn: "ঢাকা মহানগর উত্তর আহ্বায়ক কমিটি",
    nameEn: "Dhaka North Convening Committee",
    chapterBn: "ঢাকা মহানগর উত্তর",
    chapterType: "AD_HOC",
    convenerBn: "আরিফুল ইসলাম শাওন (আহ্বায়ক)",
    convenerPhone: "01711000111",
    secretaryBn: "মাহবুব আলম (সদস্য সচিব)",
    membersCount: 31,
    termDuration: "৬ মাস (অ্যাডহক)",
    expiryDate: "2026-09-30",
    status: "AD_HOC",
    resolutionNo: "NDM-Y/DHK-N/2026-03"
  },
  {
    id: "com-3",
    nameBn: "চট্টগ্রাম জেলা নির্বাহী কমিটি",
    nameEn: "Chittagong District Committee",
    chapterBn: "চট্টগ্রাম জেলা শাখা",
    chapterType: "DISTRICT",
    convenerBn: "কাজী রাকিবুল করিম (সভাপতি)",
    convenerPhone: "01811000333",
    secretaryBn: "আহমেদ ফয়সাল (সাধারণ সম্পাদক)",
    membersCount: 45,
    termDuration: "২ বছর",
    expiryDate: "2027-11-20",
    status: "ACTIVE",
    resolutionNo: "NDM-Y/CTG/2025-11"
  },
  {
    id: "com-4",
    nameBn: "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস সংসদ",
    nameEn: "Dhaka University Campus Council",
    chapterBn: "ঢাকা বিশ্ববিদ্যালয়",
    chapterType: "CAMPUS",
    convenerBn: "মাহমুদুর রহমান (আহ্বায়ক)",
    convenerPhone: "01911000444",
    secretaryBn: "রাকিব হাসান (সদস্য সচিব)",
    membersCount: 25,
    termDuration: "১ বছর",
    expiryDate: "2026-12-31",
    status: "ACTIVE",
    resolutionNo: "NDM-Y/DU/2026-01"
  }
];

export const initialTasks: TaskWorkflowItem[] = [
  {
    id: "task-1",
    titleBn: "বগুড়া জেলায় ১০০০ নতুন তরুণ সদস্য অন্তর্ভুক্তি ক্যাম্পেইন",
    titleEn: "1000 Youth Members Drive in Bogra District",
    assignedToBn: "বগুড়া জেলা সমন্বয় টিম",
    wing: "ক্যাম্পাস ও তৃণমূল বিস্তার",
    priority: "URGENT",
    deadline: "২০২৬-০৪-১৫",
    status: "IN_PROGRESS",
    progress: 65
  },
  {
    id: "task-2",
    titleBn: "জাতীয় যুব কর্মসংস্থান পলিসি পেপার চূড়ান্তকরণ",
    titleEn: "National Youth Employment Policy Paper Drafting",
    assignedToBn: "পলিসি গবেষণা উইং",
    wing: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
    priority: "HIGH",
    deadline: "২০২৬-০৩-৩০",
    status: "REVIEW",
    progress: 90
  },
  {
    id: "task-3",
    titleBn: "ঢাকা বিশ্ববিদ্যালয় বিতর্ক উৎসবে যুব প্রতিনিধি দলের অংশগ্রহণ",
    titleEn: "DU Youth Debate Championship Delegation",
    assignedToBn: "ঢাবি ক্যাম্পাস উইং",
    wing: "ক্যাম্পাস ও ছাত্র নেতৃত্ব",
    priority: "MEDIUM",
    deadline: "২০২৬-০৪-০৫",
    status: "TODO",
    progress: 20
  },
  {
    id: "task-4",
    titleBn: "উপকূলীয় অঞ্চলে জরুরি দুর্যোগ ও সাইক্লোন রেসপন্স স্কোয়াড গঠন",
    titleEn: "Coastal Disaster Response Squad Mobilization",
    assignedToBn: "কেন্দ্রীয় সমাজসেবা উইং",
    wing: "স্বেচ্ছাসেবক ও দুর্যোগ ব্যবস্থাপনা",
    priority: "HIGH",
    deadline: "২০২৬-০৪-২০",
    status: "IN_PROGRESS",
    progress: 45
  }
];

export const initialFinance: FinanceItem[] = [
  {
    id: "fin-1",
    voucherNo: "TR-2026-0101",
    titleBn: "মার্চ মাসের কেন্দ্রীয় কার্যালয় সদস্য চাঁদা সংগ্রহ",
    type: "INCOME",
    category: "MEMBERSHIP_DUES",
    amount: 145000,
    date: "2026-03-10",
    recordedBy: "ফারহানা ইয়াসমিন",
    status: "VERIFIED"
  },
  {
    id: "fin-2",
    voucherNo: "TR-2026-0102",
    titleBn: "প্রবাসী যুব ফোরাম হতে বিশেষ সাংগঠনিক অনুদান",
    type: "INCOME",
    category: "DONATION",
    amount: 250000,
    date: "2026-03-08",
    recordedBy: "ববি হাজ্জাজ",
    status: "VERIFIED"
  },
  {
    id: "fin-3",
    voucherNo: "EX-2026-0201",
    titleBn: "জাতীয় যুব কনভেনশন ভেন্যু বুকিং ও সাউন্ড সিস্টেম ব্যয়",
    type: "EXPENSE",
    category: "EVENT_EXPENSE",
    amount: 180000,
    date: "2026-03-12",
    recordedBy: "তানভীর হাসান",
    status: "VERIFIED"
  },
  {
    id: "fin-4",
    voucherNo: "EX-2026-0202",
    titleBn: "কেন্দ্রীয় কার্যালয় মাসিক ভাড়া ও ইউটিলিটি বিল",
    type: "EXPENSE",
    category: "OFFICE_RENT",
    amount: 65000,
    date: "2026-03-01",
    recordedBy: "ফারহানা ইয়াসমিন",
    status: "VERIFIED"
  },
  {
    id: "fin-5",
    voucherNo: "EX-2026-0203",
    titleBn: "ডিজিটাল ব্যানার প্রিন্টিং ও পোস্টার বিতরণ প্রচারণা",
    type: "EXPENSE",
    category: "MEDIA_CAMPAIGN",
    amount: 42000,
    date: "2026-03-14",
    recordedBy: "তানভীর হাসান",
    status: "VERIFIED"
  }
];

export const initialTraining: TrainingItem[] = [
  {
    id: "trn-1",
    code: "NDM-LMS-101",
    titleBn: "সংবিধান ও জবাবদিহিতামূলক গণতন্ত্রের ভিত্তি",
    titleEn: "Constitutional Governance & Accountable Democracy",
    instructorBn: "ববি হাজ্জাজ ও জ্যেষ্ঠ রাষ্ট্রবিজ্ঞানী প্যানেল",
    duration: "৪ সপ্তাহ (অনলাইন ও লাইভ সেমিনার)",
    enrolledCount: 340,
    status: "ONGOING",
    modulesCount: 8,
    certificateAvailable: true
  },
  {
    id: "trn-2",
    code: "NDM-LMS-102",
    titleBn: "পাবলিক স্পিকিং, রাজনৈতিক বিতর্ক ও পলিসি বিশ্লেষণ",
    titleEn: "Public Speaking, Political Debate & Policy Formulation",
    instructorBn: "ফারহানা ইয়াসমিন ও জাতীয় বিতার্কিকবৃন্দ",
    duration: "৩ সপ্তাহ (ওয়ার্কশপ)",
    enrolledCount: 285,
    status: "OPEN",
    modulesCount: 6,
    certificateAvailable: true
  },
  {
    id: "trn-3",
    code: "NDM-LMS-103",
    titleBn: "জরুরি ফার্স্ট এইড ও দুর্যোগকালীন উদ্ধার ব্যবস্থাপনা",
    titleEn: "Disaster Preparedness & Emergency First Aid",
    instructorBn: "বাংলাদেশ রেড ক্রিসেন্ট ও যুব স্বেচ্ছাসেবী স্কোয়াড",
    duration: "২ সপ্তাহ (মাঠপর্যায়ের প্রশিক্ষণ)",
    enrolledCount: 410,
    status: "COMPLETED",
    modulesCount: 5,
    certificateAvailable: true
  }
];

export const initialVolunteers: VolunteerBloodItem[] = [
  {
    id: "vol-1",
    nameBn: "রাকিব হাসান সজীব",
    bloodGroup: "A+",
    district: "বগুড়া",
    upazila: "বগুড়া সদর",
    phone: "01999887766",
    lastDonationDate: "2026-01-15",
    isAvailable: true,
    disasterSquad: true
  },
  {
    id: "vol-2",
    nameBn: "মাহমুদা বেগম রেশমা",
    bloodGroup: "AB+",
    district: "সিলেট",
    upazila: "সিলেট সদর",
    phone: "01611002233",
    lastDonationDate: "2025-11-20",
    isAvailable: true,
    disasterSquad: true
  },
  {
    id: "vol-3",
    nameBn: "হাসিবুল ইসলাম শাওন",
    bloodGroup: "B+",
    district: "ঢাকা",
    upazila: "মিরপুর",
    phone: "01711223344",
    lastDonationDate: "2025-12-10",
    isAvailable: true,
    disasterSquad: false
  },
  {
    id: "vol-4",
    nameBn: "সানজিদা আক্তার নিপা",
    bloodGroup: "O+",
    district: "চট্টগ্রাম",
    upazila: "পাঁচলাইশ",
    phone: "01812345678",
    lastDonationDate: "2026-02-01",
    isAvailable: true,
    disasterSquad: true
  },
  {
    id: "vol-5",
    nameBn: "কাজী শামীম আহমেদ",
    bloodGroup: "O-",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    phone: "01755112233",
    lastDonationDate: "2025-10-05",
    isAvailable: true,
    disasterSquad: true
  },
  {
    id: "vol-6",
    nameBn: "তানিয়া সুলতানা",
    bloodGroup: "B-",
    district: "রাজশাহী",
    upazila: "বোয়ালিয়া",
    phone: "01944556677",
    lastDonationDate: "2025-09-12",
    isAvailable: true,
    disasterSquad: false
  }
];

export const initialGrievances: GrievanceItem[] = [
  {
    id: "grv-1",
    caseId: "CASE-2026-004",
    titleBn: "ওয়ার্ড কমিটি গঠনে গঠনতান্ত্রিক প্রক্রিয়া লঙ্ঘনের অভিযোগ",
    againstBn: "উপজেলা আহ্বায়ক কমিটি",
    filedBy: "স্থানীয় সদস্যবৃন্দ",
    chapterBn: "গাজীপুর জেলা শাখা",
    date: "২০২৬-০৩-১০",
    priority: "HIGH",
    status: "INVESTIGATION",
    summaryBn: "তৃণমূল সদস্যদের মতামত ব্যতিরেকে ওয়ার্ড কমিটি ঘোষণার প্রাথমিক অভিযোগ। কেন্দ্রীয় ৩-সদস্যের তদন্ত টিম গঠিত হয়েছে।"
  },
  {
    id: "grv-2",
    caseId: "CASE-2026-003",
    titleBn: "সামাজিক যোগাযোগ মাধ্যমে দলীয় নীতি পরিপন্থী বক্তব্য পর্যালোচনা",
    againstBn: "সদস্য (এনআইডি যাচাইাধীন)",
    filedBy: "মিডিয়া সেল পর্যবেক্ষণ",
    chapterBn: "চট্টগ্রাম মহানগর",
    date: "২০২৬-০৩-০৪",
    priority: "MEDIUM",
    status: "HEARING",
    summaryBn: "দলীয় শৃঙ্খলা ভঙ্গের বিষয়ে সংশ্লিষ্ট সদস্যকে কারণ দর্শানোর নোটিশ প্রদান ও শুনানি গ্রহণ।"
  },
  {
    id: "grv-3",
    caseId: "CASE-2026-001",
    titleBn: "ক্যাম্পাসে লিফলেট বিতরণে বাধা ও বহিরাগত হুমকি সংক্রান্ত রিপোর্ট",
    againstBn: "বহিরাগত গোষ্ঠী",
    filedBy: "ক্যাম্পাস সমন্বয়ক",
    chapterBn: "ঢাকা বিশ্ববিদ্যালয়",
    date: "২০২৬-০২-২৮",
    priority: "HIGH",
    status: "RESOLVED",
    summaryBn: "বিশ্ববিদ্যালয় প্রক্টর অফিসে আনুষ্ঠানিক স্মারকলিপি প্রদান ও শিক্ষার্থীদের নিরাপত্তা নিশ্চিতে কর্মসূচি সমাপ্ত।"
  }
];

export const initialDocuments: DocumentArchiveItem[] = [
  {
    id: "doc-1",
    docCode: "NDM-DOC-CONST-01",
    titleBn: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন — অফিশিয়াল গঠনতন্ত্র ও ঘোষণাপত্র",
    titleEn: "Official Constitution & Declaration of Principles",
    category: "CONSTITUTION",
    fileType: "PDF",
    fileSize: "2.4 MB",
    version: "সংস্করণ ২.১",
    publishedDate: "২০২৬-০১-০১",
    downloadUrl: "#"
  },
  {
    id: "doc-2",
    docCode: "NDM-DOC-RES-2601",
    titleBn: "কেন্দ্রীয় কার্যনির্বাহী সংসদের ১ম সভার আনুষ্ঠানিক কার্যবিবরণী ও রেজুলেশন",
    titleEn: "CEC First Assembly Formal Minutes of Meeting & Resolutions",
    category: "RESOLUTION",
    fileType: "PDF",
    fileSize: "1.1 MB",
    version: "সংস্করণ ১.০",
    publishedDate: "২০২৬-০৩-১৬",
    downloadUrl: "#"
  },
  {
    id: "doc-3",
    docCode: "NDM-DOC-BRAND-01",
    titleBn: "অফিশিয়াল লোগো (সিংহ প্রতীক) ভেক্টর প্যাক ও ব্র্যান্ড গাইডলাইন",
    titleEn: "Official Lion Emblem Vector Pack & Brand Styleguide",
    category: "BRAND_ASSET",
    fileType: "ZIP",
    fileSize: "8.6 MB",
    version: "সংস্করণ ৩.০",
    publishedDate: "২০২৬-০২-১০",
    downloadUrl: "/logo.png"
  },
  {
    id: "doc-4",
    docCode: "NDM-DOC-FORM-02",
    titleBn: "তৃণমূল শাখা ও আহ্বায়ক কমিটি গঠন অনুমোদন আবেদন ফরম",
    titleEn: "Grassroots Chapter Charter & Convening Application Form",
    category: "CIRCULAR_FORM",
    fileType: "PDF",
    fileSize: "680 KB",
    version: "সংস্করণ ১.২",
    publishedDate: "২০২৬-০২-১৫",
    downloadUrl: "#"
  }
];

