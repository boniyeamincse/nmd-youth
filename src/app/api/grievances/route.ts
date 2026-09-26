import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/grievances - List grievance and disciplinary cases
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where: any = {};
    if (status && status !== "ALL") where.status = status;

    const cases = await prisma.grievance.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: cases.length, data: cases });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch grievances" }, { status: 500 });
  }
}

// POST /api/grievances - File complaint
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, againstBn, chapterBn, priority, summaryBn } = body;

    if (!titleBn || !summaryBn) {
      return NextResponse.json({ success: false, error: "অভিযোগের বিষয় ও বিবরণ আবশ্যক" }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();
    const count = await prisma.grievance.count();
    const caseId = `CASE-${currentYear}-${String(count + 1).padStart(3, "0")}`;

    const grievance = await prisma.grievance.create({
      data: {
        caseId,
        titleBn,
        againstBn: againstBn || "অজ্ঞাত",
        chapterBn: chapterBn || "কেন্দ্রীয় কার্যালয়",
        date: new Date().toISOString().split("T")[0],
        priority: priority || "HIGH",
        status: "OPEN",
        summaryBn,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "শৃঙ্খলা কেস দাখিল",
        admin: "DISCIPLINARY_CELL",
        target: `${grievance.caseId}: ${grievance.titleBn}`,
        timestamp: "এখন মাত্র",
        type: "warning",
      },
    });

    return NextResponse.json({ success: true, data: grievance }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to file grievance" }, { status: 500 });
  }
}

// PATCH /api/grievances - Update status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const updated = await prisma.grievance.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update case" }, { status: 500 });
  }
}
