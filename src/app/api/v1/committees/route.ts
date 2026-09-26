import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committees - Query committees with multi-criteria filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const unitName = searchParams.get("unitName");

    const where: any = {};
    if (type && type !== "ALL") where.type = type;
    if (status && status !== "ALL") where.status = status;
    if (unitName && unitName !== "ALL") where.unitName = { contains: unitName };

    if (search) {
      where.OR = [
        { nameBn: { contains: search } },
        { nameEn: { contains: search } },
        { unitName: { contains: search } },
        { resolutionNo: { contains: search } },
      ];
    }

    const committees = await prisma.committee.findMany({
      where,
      include: {
        members: {
          include: {
            user: {
              select: { id: true, nameBn: true, nameEn: true, phone: true, memberCode: true, avatarUrl: true },
            },
            position: true,
          },
          orderBy: { position: { rank: "asc" } },
        },
        _count: {
          select: { members: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: committees.length,
      data: committees,
    });
  } catch (error: any) {
    console.error("GET /api/v1/committees error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch committees" },
      { status: 500 }
    );
  }
}

// POST /api/v1/committees - Create new committee entity
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nameBn,
      nameEn,
      type,
      unitName,
      formationMethod,
      description,
      startDate,
      endDate,
      adminEmail,
    } = body;

    // 1. Validation
    if (!nameBn || !type || !unitName || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "কমিটির নাম, ধরন, সাংগঠনিক ইউনিট এবং মেয়াদকাল আবশ্যক।" },
        { status: 400 }
      );
    }

    // 2. Date constraint: startDate < endDate
    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { success: false, error: "কমিটির শুরুর তারিখ অবশ্যই শেষ তারিখের পূর্বে হতে হবে।" },
        { status: 400 }
      );
    }

    // 3. Generate Unique Resolution Code: NDM-Y/COM/YYYY-XXXX
    const currentYear = new Date().getFullYear();
    const count = await prisma.committee.count();
    const resolutionNo = `NDM-Y/COM/${currentYear}-${String(count + 1).padStart(3, "0")}`;

    // 4. Create in DRAFT status
    const committee = await prisma.committee.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        type,
        unitName,
        formationMethod: formationMethod || "CONVENING_ASSEMBLY",
        description: description || "",
        startDate,
        endDate,
        status: "DRAFT",
        resolutionNo,
      },
    });

    // 5. Record Creation in CommitteeHistory
    await prisma.committeeHistory.create({
      data: {
        committeeId: committee.id,
        eventType: "CREATED",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `নতুন কমিটি '${committee.nameBn}' খসড়া (DRAFT) হিসেবে তৈরি করা হয়েছে।`,
      },
    });

    // 6. Record System Audit Log
    await prisma.auditLog.create({
      data: {
        action: "কমিটি খসড়া প্রস্তুত",
        admin: adminEmail || "admin@ndmyouth.org",
        target: `${committee.nameBn} (${committee.resolutionNo})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "কমিটি খসড়া সফলভাবে তৈরি হয়েছে।",
        data: committee,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/v1/committees error:", error);
    return NextResponse.json(
      { success: false, error: "কমিটি তৈরিতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
