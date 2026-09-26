import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nameBn,
      nameEn,
      phone,
      email,
      password,
      nidOrBirthCert,
      bloodGroup,
      division,
      district,
      presentAddress,
      institution,
      wingInterest,
      skills,
    } = body;

    if (!nameBn || !phone || !email || !password) {
      return NextResponse.json(
        { error: "প্রয়োজনীয় তথ্যসমূহ (নাম, মোবাইল, ইমেইল ও পাসওয়ার্ড) পূরণ করুন।" },
        { status: 400 }
      );
    }

    // Check existing email
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "এই ইমেইল ঠিকানা দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।" },
        { status: 409 }
      );
    }

    // Check existing phone
    const existingPhone = await prisma.user.findUnique({
      where: { phone },
    });
    if (existingPhone) {
      return NextResponse.json(
        { error: "এই মোবাইল নম্বরটি দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট নিবন্ধিত রয়েছে।" },
        { status: 409 }
      );
    }

    // Generate Member Code
    const count = await prisma.user.count();
    const year = new Date().getFullYear();
    const pad = String(count + 1).padStart(4, "0");
    const memberCode = `NDM-Y-${year}-${pad}`;

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        phone,
        email,
        passwordHash,
        memberCode,
        nidOrBirthCert: nidOrBirthCert || null,
        bloodGroup: bloodGroup || "B+",
        division: division || "ঢাকা",
        district: district || "ঢাকা",
        presentAddress: presentAddress || null,
        institution: institution || null,
        wingInterest: wingInterest || "পলিসি গবেষণা",
        skills: skills || null,
        role: "VOLUNTEER",
        status: "PENDING",
      },
    });

    const { passwordHash: _, ...safeUser } = newUser;

    return NextResponse.json(
      {
        message: "নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
