const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding comprehensive database across all enterprise models...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const memberPassword = await bcrypt.hash("member123", 10);

  // 1. Users & Admins
  const admin = await prisma.user.upsert({
    where: { email: "admin@ndmyouth.org" },
    update: {},
    create: {
      nameBn: "মো: আরিফুল ইসলাম",
      nameEn: "Md. Ariful Islam",
      email: "admin@ndmyouth.org",
      phone: "01700000000",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      status: "APPROVED",
      memberCode: "NDM-Y-ADMIN-01",
      division: "ঢাকা",
      district: "ঢাকা",
      institution: "কেন্দ্রীয় সচিবালয়",
      wingInterest: "প্রশাসনিক উইং",
      bloodGroup: "O+",
    },
  });

  const member1 = await prisma.user.upsert({
    where: { email: "member@ndmyouth.org" },
    update: {},
    create: {
      nameBn: "হাসিবুল ইসলাম শাওন",
      nameEn: "Hasibul Islam Shaon",
      email: "member@ndmyouth.org",
      phone: "01711223344",
      passwordHash: memberPassword,
      role: "MEMBER",
      status: "APPROVED",
      memberCode: "NDM-Y-2026-0001",
      nidOrBirthCert: "19982691234567890",
      bloodGroup: "B+",
      division: "ঢাকা",
      district: "ঢাকা",
      presentAddress: "মিরপুর-১০, ঢাকা",
      institution: "ঢাকা বিশ্ববিদ্যালয় (স্নাতকোত্তর)",
      wingInterest: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
      skills: "বিতর্ক, পলিসি ড্রাফটিং",
    },
  });

  const mod = await prisma.user.upsert({
    where: { email: "mod@ndmyouth.org" },
    update: {},
    create: {
      nameBn: "সানজিদা আক্তার নিপা",
      nameEn: "Sanjida Akter Nipa",
      email: "mod@ndmyouth.org",
      phone: "01812345678",
      passwordHash: memberPassword,
      role: "MODERATOR",
      status: "APPROVED",
      memberCode: "NDM-Y-2026-0002",
      nidOrBirthCert: "20011591234567891",
      bloodGroup: "O+",
      division: "চট্টগ্রাম",
      district: "চট্টগ্রাম",
      presentAddress: "জিইসি মোড়, চট্টগ্রাম",
      institution: "চট্টগ্রাম বিশ্ববিদ্যালয়",
      wingInterest: "ক্যাম্পাস ও ছাত্র নেতৃত্ব",
      skills: "সাংগঠনিক নেতৃত্ব, পাবলিক স্পিকিং",
    },
  });

  const member3 = await prisma.user.upsert({
    where: { email: "rakib@example.com" },
    update: {},
    create: {
      nameBn: "রাকিব হাসান সজীব",
      nameEn: "Rakib Hasan Sojib",
      email: "rakib@example.com",
      phone: "01999887766",
      passwordHash: memberPassword,
      role: "MEMBER",
      status: "PENDING",
      memberCode: "NDM-Y-2026-0003",
      nidOrBirthCert: "19998812345678922",
      bloodGroup: "A+",
      division: "রাজশাহী",
      district: "বগুড়া",
      presentAddress: "সাতমাথা, বগুড়া",
      institution: "সরকারি আজিজুল হক কলেজ",
      wingInterest: "প্রচার, মিডিয়া ও আইটি",
      skills: "গ্রাফিক ডিজাইন, ভিডিও এডিটিং",
    },
  });

  // 2. Chapters
  const chaptersData = [
    { nameBn: "ঢাকা মহানগর উত্তর", nameEn: "Dhaka North", type: "DISTRICT", division: "ঢাকা", convener: "আরিফুল ইসলাম", phone: "01711000111", membersCount: 1420, status: "ACTIVE" },
    { nameBn: "ঢাকা মহানগর দক্ষিণ", nameEn: "Dhaka South", type: "DISTRICT", division: "ঢাকা", convener: "তানভীর হাসান", phone: "01711000222", membersCount: 1180, status: "ACTIVE" },
    { nameBn: "চট্টগ্রাম জেলা শাখা", nameEn: "Chittagong District", type: "DISTRICT", division: "চট্টগ্রাম", convener: "কাজী রাকিবুল করিম", phone: "01811000333", membersCount: 950, status: "ACTIVE" },
    { nameBn: "ঢাকা বিশ্ববিদ্যালয় শাখা", nameEn: "Dhaka University Wing", type: "CAMPUS", division: "ঢাকা", convener: "মাহমুদুর রহমান", phone: "01911000444", membersCount: 420, status: "ACTIVE" },
    { nameBn: "রাজশাহী জেলা শাখা", nameEn: "Rajshahi District", type: "DISTRICT", division: "রাজশাহী", convener: "শামীম রেজা", phone: "01711000555", membersCount: 560, status: "AD_HOC" },
    { nameBn: "সিলেট জেলা শাখা", nameEn: "Sylhet District", type: "DISTRICT", division: "সিলেট", convener: "মাহিন চৌধুরী", phone: "01711000666", membersCount: 680, status: "ACTIVE" },
    { nameBn: "বগুড়া জেলা শাখা", nameEn: "Bogra District", type: "DISTRICT", division: "রাজশাহী", convener: "রাকিব হাসান", phone: "01911000777", membersCount: 390, status: "AD_HOC" },
  ];

  for (const c of chaptersData) {
    const existing = await prisma.chapter.findFirst({ where: { nameBn: c.nameBn } });
    if (!existing) {
      await prisma.chapter.create({ data: c });
    }
  }

  // 3. Database-driven Committee Positions
  const positionsData = [
    { nameBn: "সভাপতি", nameEn: "President", category: "GENERAL", rank: 1, maxHolders: 1, isRequired: true },
    { nameBn: "সহ-সভাপতি", nameEn: "Vice President", category: "GENERAL", rank: 2, maxHolders: 5, isRequired: false },
    { nameBn: "সাধারণ সম্পাদক", nameEn: "General Secretary", category: "GENERAL", rank: 3, maxHolders: 1, isRequired: true },
    { nameBn: "যুগ্ম সাধারণ সম্পাদক", nameEn: "Joint Secretary", category: "GENERAL", rank: 4, maxHolders: 3, isRequired: false },
    { nameBn: "সাংগঠনিক সম্পাদক", nameEn: "Organizing Secretary", category: "GENERAL", rank: 5, maxHolders: 1, isRequired: false },
    { nameBn: "সহ-সাংগঠনিক সম্পাদক", nameEn: "Assistant Organizing Secretary", category: "GENERAL", rank: 6, maxHolders: 2, isRequired: false },
    { nameBn: "অর্থ সম্পাদক", nameEn: "Treasurer", category: "GENERAL", rank: 7, maxHolders: 1, isRequired: false },
    { nameBn: "দপ্তর সম্পাদক", nameEn: "Office Secretary", category: "GENERAL", rank: 8, maxHolders: 1, isRequired: false },
    { nameBn: "প্রচার ও প্রকাশনা সম্পাদক", nameEn: "Publicity Secretary", category: "GENERAL", rank: 9, maxHolders: 1, isRequired: false },
    { nameBn: "তথ্য ও প্রযুক্তি সম্পাদক", nameEn: "IT Secretary", category: "GENERAL", rank: 10, maxHolders: 1, isRequired: false },
    { nameBn: "সমাজকল্যাণ সম্পাদক", nameEn: "Social Welfare Secretary", category: "GENERAL", rank: 11, maxHolders: 1, isRequired: false },
    { nameBn: "নির্বাহী সদস্য", nameEn: "Executive Member", category: "GENERAL", rank: 12, maxHolders: 25, isRequired: false },
    { nameBn: "সদস্য", nameEn: "Member", category: "GENERAL", rank: 13, maxHolders: 100, isRequired: false },
    // Campus / Ad-Hoc Positions
    { nameBn: "আহ্বায়ক", nameEn: "Convener", category: "CAMPUS", rank: 1, maxHolders: 1, isRequired: true },
    { nameBn: "যুগ্ম আহ্বায়ক", nameEn: "Joint Convener", category: "CAMPUS", rank: 2, maxHolders: 7, isRequired: false },
    { nameBn: "সদস্য সচিব", nameEn: "Member Secretary", category: "CAMPUS", rank: 3, maxHolders: 1, isRequired: true },
    { nameBn: "যুগ্ম সদস্য সচিব", nameEn: "Joint Member Secretary", category: "CAMPUS", rank: 4, maxHolders: 3, isRequired: false },
  ];

  const createdPositions = {};
  for (const pos of positionsData) {
    const p = await prisma.committeePosition.create({ data: pos });
    createdPositions[pos.nameEn] = p.id;
  }

  // 4. Governance Committees
  const com1 = await prisma.committee.create({
    data: {
      nameBn: "কেন্দ্রীয় কার্যনির্বাহী সংসদ (২০২৬-২০২৮)",
      nameEn: "Central Executive Committee",
      type: "CENTRAL",
      unitName: "কেন্দ্রীয় সংসদ • ঢাকা",
      formationMethod: "NATIONAL_CONVENTION",
      description: "জাতীয় কনভেনশনে অনুমোদিত পূর্ণাঙ্গ কেন্দ্রীয় নেতৃত্ব পরিষদ।",
      startDate: "2026-01-01",
      endDate: "2028-01-01",
      status: "ACTIVE",
      resolutionNo: "NDM-Y/CEC/2026-01",
      approvedBy: "chairman@ndmbd.org",
      approvedAt: new Date(),
      approvalNote: "চেয়ারম্যান কর্তৃক সর্বসম্মত অনুমোদন",
    },
  });

  const com2 = await prisma.committee.create({
    data: {
      nameBn: "ঢাকা মহানগর জেলা কার্যনির্বাহী কমিটি",
      nameEn: "Dhaka District Executive Committee",
      type: "DISTRICT",
      unitName: "ঢাকা জেলা শাখা",
      formationMethod: "CONVENING_ASSEMBLY",
      description: "ঢাকা জেলার তৃণমূল ও থানা পর্যায়ের সমন্বয়কারী কমিটি।",
      startDate: "2026-03-01",
      endDate: "2028-03-01",
      status: "ACTIVE",
      resolutionNo: "NDM-Y/DHK/2026-02",
      approvedBy: "president@ndmyouth.org",
      approvedAt: new Date(),
      approvalNote: "কেন্দ্রীয় সংসদ কর্তৃক অনুমোদিত",
    },
  });

  const com3 = await prisma.committee.create({
    data: {
      nameBn: "ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাস আহ্বায়ক সংসদ",
      nameEn: "Dhaka University Campus Convening Council",
      type: "CAMPUS",
      unitName: "ঢাকা বিশ্ববিদ্যালয়",
      formationMethod: "AD_HOC_APPOINTMENT",
      description: "ক্যাম্পাসে গণতান্ত্রিক বিতর্ক ও ছাত্র অধিকার রক্ষায় আহ্বায়ক কমিটি।",
      startDate: "2026-02-01",
      endDate: "2027-02-01",
      status: "ACTIVE",
      resolutionNo: "NDM-Y/DU/2026-01",
      approvedBy: "president@ndmyouth.org",
      approvedAt: new Date(),
      approvalNote: "১ বছরের জন্য অ্যাডহক অনুমোদন",
    },
  });

  const com4 = await prisma.committee.create({
    data: {
      nameBn: "বগুড়া জেলা আহ্বায়ক কমিটি (প্রস্তাবিত)",
      nameEn: "Bogra District Convening Committee (Proposed)",
      type: "TEMPORARY",
      unitName: "বগুড়া জেলা শাখা",
      formationMethod: "AD_HOC_APPOINTMENT",
      description: "বগুড়া জেলায় ১০০০ সদস্য সংগ্রহ ও কর্মী সম্মেলনের প্রস্তুতি সেল।",
      startDate: "2026-04-01",
      endDate: "2026-10-01",
      status: "UNDER_REVIEW",
      resolutionNo: "NDM-Y/BGR/2026-PROP",
    },
  });

  const com5Archived = await prisma.committee.create({
    data: {
      nameBn: "চট্টগ্রাম জেলা আহ্বায়ক কমিটি (২০২৪-২০২৬)",
      nameEn: "Chittagong District Convening Committee (Past)",
      type: "DISTRICT",
      unitName: "চট্টগ্রাম জেলা শাখা",
      formationMethod: "CONVENING_ASSEMBLY",
      description: "চট্টগ্রাম জেলা শাখার পূর্ববর্তী সমাপ্ত কমিটি।",
      startDate: "2024-01-01",
      endDate: "2026-01-01",
      status: "ARCHIVED",
      resolutionNo: "NDM-Y/CTG/2024-01",
      approvedBy: "chairman@ndmbd.org",
      approvedAt: new Date("2024-01-05"),
      approvalNote: "ঐতিহাসিক সফল মেয়াদ সম্পন্ন",
    },
  });

  // 5. Committee Member Assignments (Person -> Position Assignment)
  // Admin is President of Central Committee
  await prisma.committeeMember.create({
    data: {
      committeeId: com1.id,
      memberId: admin.id,
      positionId: createdPositions["President"],
      appointmentType: "REGULAR",
      startDate: "2026-01-01",
      status: "ACTIVE",
      notes: "কেন্দ্রীয় সভাপতি নির্বাচিত",
    },
  });

  // Shaon is General Secretary of Dhaka District Committee
  await prisma.committeeMember.create({
    data: {
      committeeId: com2.id,
      memberId: member1.id,
      positionId: createdPositions["General Secretary"],
      appointmentType: "REGULAR",
      startDate: "2026-03-01",
      status: "ACTIVE",
      notes: "ঢাকা জেলা সাধারণ সম্পাদক",
    },
  });

  // Nipa is Joint Secretary of Central Committee & Convener of Campus Wing
  await prisma.committeeMember.create({
    data: {
      committeeId: com1.id,
      memberId: mod.id,
      positionId: createdPositions["Joint Secretary"],
      appointmentType: "REGULAR",
      startDate: "2026-01-01",
      status: "ACTIVE",
      notes: "কেন্দ্রীয় নারী ও ক্যাম্পাস নেতৃত্ব",
    },
  });

  // 6. Committee Change History Records
  await prisma.committeeHistory.create({
    data: {
      committeeId: com1.id,
      eventType: "CREATED",
      changedBy: "admin@ndmyouth.org",
      description: "কেন্দ্রীয় কার্যনির্বাহী সংসদ (২০২৬-২০২৮) খসড়া তৈরি করা হয়েছে।",
    },
  });

  await prisma.committeeHistory.create({
    data: {
      committeeId: com1.id,
      eventType: "APPROVED",
      changedBy: "chairman@ndmbd.org",
      description: "চেয়ারম্যান কর্তৃক সর্বসম্মত অনুমোদন ও সক্রিয় ঘোষণা।",
    },
  });

  await prisma.committeeHistory.create({
    data: {
      committeeId: com2.id,
      eventType: "MEMBER_ASSIGNED",
      changedBy: "admin@ndmyouth.org",
      description: "হাসিবুল ইসলাম শাওন-কে সাধারণ সম্পাদক পদে পদায়ন করা হয়েছে।",
    },
  });

  // 7. Events
  const eventsData = [
    {
      slug: "national-youth-convention-2026",
      titleBn: "জাতীয় যুব কনভেনশন ২০২৬: তারুণ্যের নীতি সংলাপ",
      titleEn: "National Youth Convention 2026: Youth Policy Dialogue",
      summaryBn: "সারাদেশের ৬৪ জেলা ও ক্যাম্পাস প্রতিনিধিদের মিলনমেলা ও ভবিষ্যৎ নীতি প্রস্তাবনা।",
      summaryEn: "Grand national convention of youth leaders from all 64 districts.",
      descriptionBn: "বাংলাদেশের অর্থনৈতিক সংকট, বেকারত্ব দূরীকরণ এবং সুশাসন প্রতিষ্ঠার লক্ষ্যে তরুণদের সুস্পষ্ট প্রস্তাবনা তুলে ধরা হবে।",
      descriptionEn: "National convention presenting policy manifestos on education and employment.",
      venueBn: "বঙ্গবন্ধু আন্তর্জাতিক সম্মেলন কেন্দ্র (BICC), ঢাকা",
      venueEn: "BICC, Sher-e-Bangla Nagar, Dhaka",
      date: "২০২৬-০৪-১০",
      time: "সকাল ১০:০০ - বিকাল ৫:০০",
      isUpcoming: true,
      registeredCount: 850,
    },
    {
      slug: "chittagong-youth-rally",
      titleBn: "চট্টগ্রাম বিভাগীয় যুব পদযাত্রা ও সংহতি সমাবেশ",
      titleEn: "Chittagong Divisional Youth Rally & Solidarity Assembly",
      summaryBn: "চট্টগ্রাম বিভাগে তরুণদের অধিকার রক্ষা ও মাদকবিরোধী সামাজিক শপথ।",
      summaryEn: "Divisional assembly uniting youth against corruption and drugs.",
      descriptionBn: "বিভাগের সকল জেলা ও উপজেলার তরুণ নেতাকর্মীদের স্বতঃস্ফূর্ত অংশগ্রহণে সমাবেশ।",
      descriptionEn: "Divisional conference engaging district-level youth.",
      venueBn: "লালদীঘি ময়দান, চট্টগ্রাম",
      venueEn: "Laldighi Maidan, Chittagong",
      date: "২০২৬-০৪-২৫",
      time: "বিকাল ৩:০০",
      isUpcoming: true,
      registeredCount: 420,
    },
  ];

  for (const ev of eventsData) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {},
      create: ev,
    });
  }

  // 8. Notices
  const noticesData = [
    {
      slug: "youth-manifesto-2026",
      titleBn: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলনের আনুষ্ঠানিক আত্মপ্রকাশ ও লক্ষ্য ঘোষণা",
      titleEn: "Official Launch & Ideological Manifesto of Youth Movement - NDM",
      category: "STATEMENT",
      contentBn: "আজ এক সংবাদ সম্মেলনে যুব আন্দোলনের রূপরেখা ও ৪টি মূলনীতি ঘোষণা করা হয়। জবাবদিহিতামূলক গণতন্ত্র, বাংলাদেশী জাতীয়তাবাদ, ধর্মীয় মূল্যবোধ এবং সর্বজনীন সামাজিক সুরক্ষার ভিত্তিতে নতুন নেতৃত্বের সূচনা হলো।",
      contentEn: "At an official press conference, the core 4 principles of the Youth Movement were declared.",
      isPinned: true,
    },
    {
      slug: "press-release-youth-employment",
      titleBn: "প্রেস বিজ্ঞপ্তি: শিক্ষিত বেকারত্ব নিরসনে জরুরি নীতি সংস্কারের দাবি",
      titleEn: "Press Release: Urgent Demands for Youth Employment & Educational Reform",
      category: "PRESS_RELEASE",
      contentBn: "দেশের কর্মক্ষম যুবশক্তির যথাযথ মূল্যায়ন এবং স্টার্টআপ ও কারিগরি শিক্ষার জন্য জাতীয় বাজেট বরাদ্দের জোর দাবি জানিয়েছে যুব আন্দোলন।",
      contentEn: "Urgent policy reforms demanded for graduate employment and vocational budgets.",
      isPinned: false,
    },
  ];

  for (const not of noticesData) {
    await prisma.notice.upsert({
      where: { slug: not.slug },
      update: {},
      create: not,
    });
  }

  // 9. Tasks
  const tasksData = [
    {
      titleBn: "বগুড়া জেলায় ১০০০ নতুন তরুণ সদস্য অন্তর্ভুক্তি ক্যাম্পেইন",
      titleEn: "1000 Youth Members Drive in Bogra District",
      assignedToBn: "বগুড়া জেলা সমন্বয় টিম",
      wing: "ক্যাম্পাস ও তৃণমূল বিস্তার",
      priority: "URGENT",
      deadline: "২০২৬-০৪-১৫",
      status: "IN_PROGRESS",
      progress: 65,
    },
    {
      titleBn: "জাতীয় যুব কর্মসংস্থান পলিসি পেপার চূড়ান্তকরণ",
      titleEn: "National Youth Employment Policy Paper Drafting",
      assignedToBn: "পলিসি গবেষণা উইং",
      wing: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
      priority: "HIGH",
      deadline: "২০২৬-০৩-৩০",
      status: "REVIEW",
      progress: 90,
    },
  ];

  for (const t of tasksData) {
    const existing = await prisma.task.findFirst({ where: { titleBn: t.titleBn } });
    if (!existing) {
      await prisma.task.create({ data: t });
    }
  }

  // 10. Finance Records
  const financeData = [
    {
      voucherNo: "TR-2026-0101",
      titleBn: "মার্চ মাসের কেন্দ্রীয় কার্যালয় সদস্য চাঁদা সংগ্রহ",
      type: "INCOME",
      category: "MEMBERSHIP_DUES",
      amount: 145000,
      date: "2026-03-10",
      recordedBy: "ফারহানা ইয়াসমিন",
      status: "VERIFIED",
    },
    {
      voucherNo: "TR-2026-0102",
      titleBn: "প্রবাসী যুব ফোরাম হতে বিশেষ সাংগঠনিক অনুদান",
      type: "INCOME",
      category: "DONATION",
      amount: 250000,
      date: "2026-03-08",
      recordedBy: "ববি হাজ্জাজ",
      status: "VERIFIED",
    },
    {
      voucherNo: "EX-2026-0201",
      titleBn: "জাতীয় যুব কনভেনশন ভেন্যু বুকিং ও সাউন্ড সিস্টেম ব্যয়",
      type: "EXPENSE",
      category: "EVENT_EXPENSE",
      amount: 180000,
      date: "2026-03-12",
      recordedBy: "তানভীর হাসান",
      status: "VERIFIED",
    },
  ];

  for (const fin of financeData) {
    await prisma.financeRecord.upsert({
      where: { voucherNo: fin.voucherNo },
      update: {},
      create: fin,
    });
  }

  // 11. Training Courses
  const trainingData = [
    {
      code: "NDM-LMS-101",
      titleBn: "সংবিধান ও জবাবদিহিতামূলক গণতন্ত্রের ভিত্তি",
      titleEn: "Constitutional Governance & Accountable Democracy",
      instructorBn: "ববি হাজ্জাজ ও জ্যেষ্ঠ রাষ্ট্রবিজ্ঞানী প্যানেল",
      duration: "৪ সপ্তাহ (অনলাইন ও লাইভ সেমিনার)",
      enrolledCount: 340,
      status: "ONGOING",
      modulesCount: 8,
      certificateAvailable: true,
    },
    {
      code: "NDM-LMS-102",
      titleBn: "পাবলিক স্পিকিং, রাজনৈতিক বিতর্ক ও পলিসি বিশ্লেষণ",
      titleEn: "Public Speaking, Political Debate & Policy Formulation",
      instructorBn: "ফারহানা ইয়াসমিন ও জাতীয় বিতার্কিকবৃন্দ",
      duration: "৩ সপ্তাহ (ওয়ার্কশপ)",
      enrolledCount: 285,
      status: "OPEN",
      modulesCount: 6,
      certificateAvailable: true,
    },
  ];

  for (const trn of trainingData) {
    await prisma.trainingCourse.upsert({
      where: { code: trn.code },
      update: {},
      create: trn,
    });
  }

  // 12. Volunteers & Blood Donors
  const volunteerData = [
    {
      nameBn: "রাকিব হাসান সজীব",
      bloodGroup: "A+",
      district: "বগুড়া",
      upazila: "বগুড়া সদর",
      phone: "01999887766",
      lastDonationDate: "2026-01-15",
      isAvailable: true,
      disasterSquad: true,
    },
    {
      nameBn: "হাসিবুল ইসলাম শাওন",
      bloodGroup: "B+",
      district: "ঢাকা",
      upazila: "মিরপুর",
      phone: "01711223344",
      lastDonationDate: "2025-12-10",
      isAvailable: true,
      disasterSquad: false,
    },
    {
      nameBn: "সানজিদা আক্তার নিপা",
      bloodGroup: "O+",
      district: "চট্টগ্রাম",
      upazila: "পাঁচলাইশ",
      phone: "01812345678",
      lastDonationDate: "2026-02-01",
      isAvailable: true,
      disasterSquad: true,
    },
  ];

  for (const vol of volunteerData) {
    await prisma.volunteerDonor.upsert({
      where: { phone: vol.phone },
      update: {},
      create: vol,
    });
  }

  // 13. Grievances
  const grievancesData = [
    {
      caseId: "CASE-2026-004",
      titleBn: "ওয়ার্ড কমিটি গঠনে গঠনতান্ত্রিক প্রক্রিয়া লঙ্ঘনের অভিযোগ",
      againstBn: "উপজেলা আহ্বায়ক কমিটি",
      filedBy: "স্থানীয় সদস্যবৃন্দ",
      chapterBn: "গাজীপুর জেলা শাখা",
      date: "২০২৬-০৩-১০",
      priority: "HIGH",
      status: "INVESTIGATION",
      summaryBn: "তৃণমূল সদস্যদের মতামত ব্যতিরেকে ওয়ার্ড কমিটি ঘোষণার প্রাথমিক অভিযোগ। কেন্দ্রীয় ৩-সদস্যের তদন্ত টিম গঠিত হয়েছে।",
    },
  ];

  for (const grv of grievancesData) {
    await prisma.grievance.upsert({
      where: { caseId: grv.caseId },
      update: {},
      create: grv,
    });
  }

  // 14. Documents
  const documentsData = [
    {
      docCode: "NDM-DOC-CONST-01",
      titleBn: "জাতীয়তাবাদী গণতান্ত্রিক যুব আন্দোলন — অফিশিয়াল গঠনতন্ত্র ও ঘোষণাপত্র",
      titleEn: "Official Constitution & Declaration of Principles",
      category: "CONSTITUTION",
      fileType: "PDF",
      fileSize: "2.4 MB",
      version: "সংস্করণ ২.১",
      publishedDate: "২০২৬-০১-০১",
      downloadUrl: "#",
    },
    {
      docCode: "NDM-DOC-BRAND-01",
      titleBn: "অফিশিয়াল লোগো (সিংহ প্রতীক) ভেক্টর প্যাক ও ব্র্যান্ড গাইডলাইন",
      titleEn: "Official Lion Emblem Vector Pack & Brand Styleguide",
      category: "BRAND_ASSET",
      fileType: "ZIP",
      fileSize: "8.6 MB",
      version: "সংস্করণ ৩.০",
      publishedDate: "২০২৬-০২-১০",
      downloadUrl: "/logo.png",
    },
  ];

  for (const doc of documentsData) {
    await prisma.document.upsert({
      where: { docCode: doc.docCode },
      update: {},
      create: doc,
    });
  }

  // 15. Audit Logs
  await prisma.auditLog.create({
    data: {
      action: "সাংগঠনিক কমিটি সুশাসন আর্কিটেকচার সক্রিয়",
      admin: "admin@ndmyouth.org",
      target: "১৭টি পদবী ও কমিটি লাইফসাইকেল মডেল লোড সম্পন্ন",
      timestamp: "এখন মাত্র",
      type: "success",
    },
  });

  console.log("Seeding complete! Database initialized with complete Committee Governance structure.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
