import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/v1/committees/[id]/approve - Central leadership approval
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { approvedBy, approvalNote } = body;

    const committee = await prisma.committee.findUnique({ where: { id } });
    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    if (committee.status !== "SUBMITTED" && committee.status !== "UNDER_REVIEW") {
      return NextResponse.json(
        { success: false, error: `কেবলমাত্র পর্যালোচিত কমিটি অনুমোদন করা যায়। বর্তমান অবস্থা: ${committee.status}` },
        { status: 400 }
      );
    }

    const approver = approvedBy || "president@ndmyouth.org";
    const note = approvalNote || "কেন্দ্রীয় সভাপতি ও সাধারণ সম্পাদক কর্তৃক সর্বসম্মত অনুমোদন";

    const updated = await prisma.committee.update({
      where: { id },
      data: {
        status: "APPROVED",
        approvedBy: approver,
        approvedAt: new Date(),
        approvalNote: note,
        rejectionReason: null,
      },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "APPROVED",
        changedBy: approver,
        description: `কমিটি আনুষ্ঠানিকভাবে অনুমোদন (APPROVED) করা হয়েছে। স্মারক/নোট: ${note}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "কমিটি অনুমোদন প্রদান",
        admin: approver,
        target: `${committee.nameBn} (${committee.resolutionNo})`,
        timestamp: "এখন মাত্র",
        type: "success",
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি সফলভাবে অনুমোদিত হয়েছে।",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "অনুমোদন ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
