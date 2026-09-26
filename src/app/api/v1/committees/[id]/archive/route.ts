import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/v1/committees/[id]/archive - Archive committee
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { adminEmail, reason } = body;

    const committee = await prisma.committee.findUnique({ where: { id } });
    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    if (committee.status === "ARCHIVED") {
      return NextResponse.json({ success: false, error: "কমিটি ইতোমধ্যে আর্কাইভে সংরক্ষিত।" }, { status: 400 });
    }

    const updated = await prisma.committee.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "ARCHIVED",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `কমিটি আর্কাইভে (ARCHIVED) স্থানান্তর করা হয়েছে। কারণ: ${reason || "মেয়াদোত্তীর্ণ বা পুনর্গঠন"}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "কমিটি আর্কাইভ সম্পন্ন",
        admin: adminEmail || "admin@ndmyouth.org",
        target: `${committee.nameBn} (${committee.resolutionNo})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি সফলভাবে আর্কাইভে সংরক্ষিত হয়েছে।",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "আর্কাইভ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
