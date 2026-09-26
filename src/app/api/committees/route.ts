import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/committees - List committees
export async function GET() {
  try {
    const committees = await prisma.committee.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: committees.length, data: committees });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch committees" }, { status: 500 });
  }
}

// POST /api/committees - Create committee
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nameBn,
      nameEn,
      chapterBn,
      chapterType,
      convenerBn,
      convenerPhone,
      secretaryBn,
      membersCount,
      termDuration,
      expiryDate,
      status,
      resolutionNo,
    } = body;

    if (!nameBn || !convenerBn) {
      return NextResponse.json({ success: false, error: "কমিটির নাম ও আহ্বায়ক আবশ্যক" }, { status: 400 });
    }

    const resNo = resolutionNo || `NDM-Y/COM/${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const committee = await prisma.committee.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        chapterBn: chapterBn || nameBn,
        chapterType: chapterType || "DISTRICT",
        convenerBn,
        convenerPhone: convenerPhone || "01700000000",
        secretaryBn: secretaryBn || "সদস্য সচিব",
        membersCount: Number(membersCount) || 31,
        termDuration: termDuration || "২ বছর",
        expiryDate: expiryDate || "2028-03-30",
        status: status || "ACTIVE",
        resolutionNo: resNo,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "কমিটি অনুমোদন জারি",
        admin: "admin@ndmyouth.org",
        target: `${committee.nameBn} (${committee.resolutionNo})`,
        timestamp: "এখন মাত্র",
        type: "success",
      },
    });

    return NextResponse.json({ success: true, data: committee }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create committee" }, { status: 500 });
  }
}
