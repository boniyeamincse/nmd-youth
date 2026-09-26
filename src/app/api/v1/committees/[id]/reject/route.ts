import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/v1/committees/[id]/reject - Reject or return for revision
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { rejectionReason, adminEmail } = body;

    if (!rejectionReason) {
      return NextResponse.json(
        { success: false, error: "প্রত্যাখ্যানের বা সংশোধনের কারণ উল্লেখ করা আবশ্যক।" },
        { status: 400 }
      );
    }

    const committee = await prisma.committee.findUnique({ where: { id } });
    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    const reviewer = adminEmail || "scrutiny@ndmyouth.org";

    const updated = await prisma.committee.update({
      where: { id },
      data: {
        status: "REJECTED",
        rejectionReason,
      },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "REJECTED",
        changedBy: reviewer,
        description: `কমিটি প্রত্যাখ্যাত (REJECTED) ও সংশোধনের নির্দেশ দেওয়া হয়েছে। কারণ: ${rejectionReason}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "কমিটি প্রত্যাখ্যান ও ফেরত",
        admin: reviewer,
        target: `${committee.nameBn} -> ${rejectionReason}`,
        timestamp: "এখন মাত্র",
        type: "warning",
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি সংশোধনের জন্য ফেরত পাঠানো হয়েছে।",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "প্রত্যাখ্যান প্রক্রিয়াকরণ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
