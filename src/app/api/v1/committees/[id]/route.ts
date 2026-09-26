import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committees/[id] - Fetch single committee with leadership & histories
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const committee = await prisma.committee.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                nameBn: true,
                nameEn: true,
                phone: true,
                email: true,
                memberCode: true,
                bloodGroup: true,
                district: true,
                avatarUrl: true,
              },
            },
            position: true,
          },
          orderBy: { position: { rank: "asc" } },
        },
        histories: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!committee) {
      return NextResponse.json(
        { success: false, error: "কমিটি পাওয়া যায়নি।" },
        { status: 404 }
      );
    }

    // Also fetch historical past terms for the same organizational unit
    const pastCommittees = await prisma.committee.findMany({
      where: {
        unitName: committee.unitName,
        id: { not: committee.id },
      },
      select: {
        id: true,
        nameBn: true,
        startDate: true,
        endDate: true,
        status: true,
        resolutionNo: true,
      },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: committee,
      pastCommittees,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "অভ্যন্তরীণ ত্রুটি ঘটেছে।" },
      { status: 500 }
    );
  }
}

// PATCH /api/v1/committees/[id] - Update committee basic details
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nameBn, nameEn, description, startDate, endDate, formationMethod, adminEmail } = body;

    const existing = await prisma.committee.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    // Rule 3: Archived committee cannot be edited
    if (existing.status === "ARCHIVED") {
      return NextResponse.json(
        { success: false, error: "আর্কাইভকৃত (ARCHIVED) কমিটি সম্পাদন করা যাবে না।" },
        { status: 403 }
      );
    }

    // Date validation if provided
    const newStart = startDate || existing.startDate;
    const newEnd = endDate || existing.endDate;
    if (new Date(newStart) >= new Date(newEnd)) {
      return NextResponse.json(
        { success: false, error: "শুরুর তারিখ অবশ্যই শেষ তারিখের পূর্বে হতে হবে।" },
        { status: 400 }
      );
    }

    const updated = await prisma.committee.update({
      where: { id },
      data: {
        nameBn: nameBn || existing.nameBn,
        nameEn: nameEn || existing.nameEn,
        description: description !== undefined ? description : existing.description,
        startDate: newStart,
        endDate: newEnd,
        formationMethod: formationMethod || existing.formationMethod,
      },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "POSITION_CHANGED",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `কমিটির মৌলিক তথ্যাবলি হালনাগাদ করা হয়েছে।`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি তথ্য সফলভাবে হালনাগাদ হয়েছে।",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "আপডেট ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}

// DELETE /api/v1/committees/[id] - Delete only if DRAFT
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const existing = await prisma.committee.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    // Rule 8: Committees are archived, not deleted (unless in DRAFT)
    if (existing.status !== "DRAFT") {
      return NextResponse.json(
        {
          success: false,
          error: "কেবলমাত্র খসড়া (DRAFT) কমিটি মুছে ফেলা যায়। অনুমোদিত বা সক্রিয় কমিটি আর্কাইভ (Archive) করতে হবে।",
        },
        { status: 400 }
      );
    }

    await prisma.committee.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "খসড়া কমিটি সফলভাবে অপসারিত হয়েছে।" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "মুছে ফেলা সম্ভব হয়নি।" }, { status: 500 });
  }
}
