import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/v1/committees/[id]/activate - Activate committee & enforce single active policy
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { adminEmail, autoArchivePrevious } = body;

    const committee = await prisma.committee.findUnique({
      where: { id },
      include: {
        members: {
          include: { position: true },
        },
      },
    });

    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    if (committee.status !== "APPROVED") {
      return NextResponse.json(
        { success: false, error: `কমিটি সক্রিয় করতে হলে প্রথমে 'APPROVED' হতে হবে। বর্তমান অবস্থা: ${committee.status}` },
        { status: 400 }
      );
    }

    // Business Rule 6: Validate required leadership positions
    // Must have at least a top leadership assignment (President or Convener, General Secretary or Member Secretary)
    const hasTopLeader = committee.members.some(
      (m) => m.position.rank === 1 && m.status === "ACTIVE"
    );
    if (!hasTopLeader) {
      return NextResponse.json(
        { success: false, error: "কমিটি সক্রিয় করার পূর্বে শীর্ষ নেতৃত্ব (সভাপতি অথবা আহ্বায়ক) পদায়ন সম্পন্ন করা আবশ্যক।" },
        { status: 400 }
      );
    }

    // Business Rule 1: Single active committee per unit policy
    const existingActive = await prisma.committee.findFirst({
      where: {
        unitName: committee.unitName,
        status: "ACTIVE",
        id: { not: id },
      },
    });

    if (existingActive) {
      if (!autoArchivePrevious) {
        return NextResponse.json(
          {
            success: false,
            conflict: true,
            existingActiveId: existingActive.id,
            existingActiveName: existingActive.nameBn,
            error: `এই ইউনিটে('${committee.unitName}') ইতোমধ্যে একটি সক্রিয় কমিটি বিদ্যমান: '${existingActive.nameBn}'। নতুন কমিটি সক্রিয় করতে পূর্ববর্তী কমিটিকে স্বয়ংক্রিয়ভাবে আর্কাইভ করতে হবে।`,
          },
          { status: 409 }
        );
      }

      // Automatically archive previous active committee
      await prisma.committee.update({
        where: { id: existingActive.id },
        data: { status: "ARCHIVED" },
      });

      await prisma.committeeHistory.create({
        data: {
          committeeId: existingActive.id,
          eventType: "ARCHIVED",
          changedBy: adminEmail || "admin@ndmyouth.org",
          description: `নতুন কমিটি '${committee.nameBn}' সক্রিয় হওয়ায় এই কমিটি স্বয়ংক্রিয়ভাবে আর্কাইভ (ARCHIVED) করা হয়েছে।`,
        },
      });
    }

    // Activate target committee
    const activated = await prisma.committee.update({
      where: { id },
      data: { status: "ACTIVE" },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "STATUS_CHANGE",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `কমিটি আনুষ্ঠানিকভাবে সক্রিয় (ACTIVE) ঘোষণা করা হয়েছে।`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "কমিটি সক্রিয় ঘোষণা",
        admin: adminEmail || "admin@ndmyouth.org",
        target: `${activated.nameBn} (${activated.unitName})`,
        timestamp: "এখন মাত্র",
        type: "success",
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি সফলভাবে সক্রিয় (ACTIVE) করা হয়েছে।",
      data: activated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "সক্রিয়করণ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
