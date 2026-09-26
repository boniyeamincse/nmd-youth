import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committees/[id]/audit-logs - Granular change history and audits
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const logs = await prisma.committeeHistory.findMany({
      where: { committeeId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "অডিট লগ লোড ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
