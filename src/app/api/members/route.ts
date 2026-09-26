import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// GET /api/members - List members with multi-criteria filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const district = searchParams.get("district");
    const division = searchParams.get("division");
    const status = searchParams.get("status");
    const wing = searchParams.get("wing");
    const bloodGroup = searchParams.get("bloodGroup");

    const where: any = {};

    if (district && district !== "ALL") where.district = district;
    if (division && division !== "ALL") where.division = division;
    if (status && status !== "ALL") where.status = status;
    if (wing && wing !== "ALL") where.wingInterest = { contains: wing };
    if (bloodGroup && bloodGroup !== "ALL") where.bloodGroup = bloodGroup;

    if (search) {
      where.OR = [
        { nameBn: { contains: search } },
        { nameEn: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
        { memberCode: { contains: search } },
        { nidOrBirthCert: { contains: search } },
      ];
    }

    const members = await prisma.user.findMany({
      where,
      orderBy: { appliedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error: any) {
    console.error("GET /api/members error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}

// POST /api/members - Register new member with auto-generated Member Code
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nameBn,
      nameEn,
      phone,
      email,
      nidOrBirthCert,
      bloodGroup,
      division,
      district,
      presentAddress,
      institution,
      wingInterest,
      skills,
      password,
    } = body;

    if (!nameBn || !phone || !email || !district || !division) {
      return NextResponse.json(
        { success: false, error: "নাম, ফোন, ইমেইল, জেলা ও বিভাগ আবশ্যক।" },
        { status: 400 }
      );
    }

    // Check unique email / phone
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "এই ইমেইল অথবা মোবাইল নম্বর দিয়ে ইতোমধ্যে আবেদন করা হয়েছে।" },
        { status: 409 }
      );
    }

    // Auto-generate Member Code: NDM-Y-YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const count = await prisma.user.count();
    const memberCode = `NDM-Y-${currentYear}-${String(count + 1).padStart(4, "0")}`;

    const passwordHash = await bcrypt.hash(password || "ndm12345", 10);

    const newMember = await prisma.user.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        phone,
        email,
        nidOrBirthCert: nidOrBirthCert || "",
        bloodGroup: bloodGroup || "O+",
        division,
        district,
        presentAddress: presentAddress || "",
        institution: institution || "",
        wingInterest: wingInterest || "সাধারণ",
        skills: skills || "",
        passwordHash,
        memberCode,
        role: "MEMBER",
        status: "PENDING",
      },
    });

    // Record Immutable Audit Log
    await prisma.auditLog.create({
      data: {
        action: "নতুন সদস্য আবেদন দাখিল",
        admin: "PUBLIC_PORTAL",
        target: `${newMember.nameBn} (${newMember.memberCode})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "মেম্বারশিপ আবেদন সফলভাবে গৃহীত হয়েছে।",
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/members error:", error);
    return NextResponse.json(
      { success: false, error: "আবেদন প্রক্রিয়াকরণে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
