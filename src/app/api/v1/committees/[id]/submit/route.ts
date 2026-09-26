import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/v1/committees/[id]/submit - Submit draft for central review
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const { adminEmail, note } = body;

    const committee = await prisma.committee.findUnique({
      where: { id },
      include: { _count: { select: { members: true } } },
    });

    if (!committee) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    if (committee.status !== "DRAFT" && committee.status !== "REJECTED") {
      return NextResponse.json(
        { success: false, error: `বর্তমান স্ট্যাটাস '${committee.status}' থেকে সাবমিট করা যাবে না।` },
        { status: 400 }
      );
    }

    if (committee._count.members === 0) {
      return NextResponse.json(
        { success: false, error: "কমিটিতে অন্তত একজন সদস্য পদায়ন না করে সাবমিট করা যাবে না।" },
        { status: 400 }
      );
    }

    const updated = await prisma.committee.update({
      where: { id },
      data: { status: "SUBMITTED" },
    });

    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "STATUS_CHANGE",
        changedBy: adminEmail || "admin@ndmyouth.org",
        description: `কমিটি কেন্দ্রীয় অনুমোদনের জন্য দাখিল (SUBMITTED) করা হয়েছে। নোট: ${note || "নিয়মিত সাবমিশন"}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "কমিটি পর্যালোচনার জন্য সফলভাবে দাখিল করা হয়েছে।",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "সাবমিশন ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
