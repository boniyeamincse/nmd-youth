import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committees/[id]/members - List assigned members
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const members = await prisma.committeeMember.findMany({
      where: { committeeId: id },
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
    });

    return NextResponse.json({ success: true, count: members.length, data: members });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch members" }, { status: 500 });
  }
}

// POST /api/v1/committees/[id]/members - Assign a member to a position in this committee
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      memberId,
      positionId,
      appointmentType,
      startDate,
      endDate,
      notes,
      adminEmail,
    } = body;

    // 1. Validation
    if (!memberId || !positionId) {
      return NextResponse.json(
        { success: false, error: "সদস্য (Member) এবং পদবী (Position) নির্বাচন আবশ্যক।" },
        { status: 400 }
      );
    }

    const committee = await prisma.committee.findUnique({ where: { id } });
    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    if (committee.status === "ARCHIVED") {
      return NextResponse.json(
        { success: false, error: "আর্কাইভকৃত কমিটিতে নতুন সদস্য পদায়ন করা যাবে না।" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: memberId } });
    if (!user) {
      return NextResponse.json({ success: false, error: "সদস্য পাওয়া যায়নি।" }, { status: 404 });
    }

    const position = await prisma.committeePosition.findUnique({ where: { id: positionId } });
    if (!position) {
      return NextResponse.json({ success: false, error: "পদবী পাওয়া যায়নি।" }, { status: 404 });
    }

    // Business Rule 4: Same member cannot have duplicate assignment in same committee
    const existingAssignment = await prisma.committeeMember.findFirst({
      where: {
        committeeId: id,
        memberId,
        status: "ACTIVE",
      },
      include: { position: true },
    });

    if (existingAssignment) {
      return NextResponse.json(
        {
          success: false,
          error: `${user.nameBn} ইতোমধ্যে এই কমিটিতে '${existingAssignment.position.nameBn}' পদে সক্রিয়ভাবে দায়িত্বপ্রাপ্ত। একই কমিটিতে দুটি ভিন্ন পদে নিয়োগ দেওয়া যাবে না।`,
        },
        { status: 409 }
      );
    }

    // Business Rule 5: Check maxHolders limit for position
    const currentHoldersCount = await prisma.committeeMember.count({
      where: {
        committeeId: id,
        positionId,
        status: "ACTIVE",
      },
    });

    if (currentHoldersCount >= position.maxHolders) {
      return NextResponse.json(
        {
          success: false,
          error: `'${position.nameBn}' পদে সর্বোচ্চ অনুমোদিত সংখ্যা (${position.maxHolders} জন) পূর্ণ হয়ে গেছে।`,
        },
        { status: 409 }
      );
    }

    // Create assignment
    const assignment = await prisma.committeeMember.create({
      data: {
        committeeId: id,
        memberId,
        positionId,
        appointmentType: appointmentType || "REGULAR",
        startDate: startDate || committee.startDate,
        endDate: endDate || committee.endDate,
        notes: notes || "",
        status: "ACTIVE",
      },
      include: { user: true, position: true },
    });

    // Record Granular Change History (Section 8)
    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "MEMBER_ASSIGNED",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `${user.nameBn} (${user.memberCode || user.phone}) কে '${position.nameBn}' পদে পদায়ন করা হয়েছে।`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `${user.nameBn} কে সফলভাবে '${position.nameBn}' পদে পদায়ন করা হয়েছে।`,
        data: assignment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/v1/committees/[id]/members error:", error);
    return NextResponse.json(
      { success: false, error: "সদস্য পদায়ন ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}
