import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with initial users...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const memberPassword = await bcrypt.hash("member123", 10);

  // 1. Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@ndmyouth.org" },
    update: {},
    create: {
      nameBn: "কেন্দ্রীয় অ্যাডমিন",
      nameEn: "Central Administrator",
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

  // 2. Active Member
  const member = await prisma.user.upsert({
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
      institution: "ঢাকা বিশ্ববিদ্যালয়",
      wingInterest: "পলিসি গবেষণা ও থিংক-ট্যাঙ্ক",
      skills: "বিতর্ক, পলিসি ড্রাফটিং",
    },
  });

  // 3. Moderator
  const moderator = await prisma.user.upsert({
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
    },
  });

  console.log("Seeding finished successfully:", { admin: admin.email, member: member.email, mod: moderator.email });
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
