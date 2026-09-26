import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committees/[id]/history - Past terms for the same organizational unit
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const current = await prisma.committee.findUnique({ where: { id } });
    if (!current) {
      return NextResponse.json({ success: false, error: "কমিটি পাওয়া যায়নি।" }, { status: 404 });
    }

    const pastCommittees = await prisma.committee.findMany({
      where: {
        unitName: current.unitName,
        id: { not: id },
      },
      include: {
        members: {
          include: {
            user: { select: { id: true, nameBn: true, nameEn: true, memberCode: true } },
            position: true,
          },
          orderBy: { position: { rank: "asc" } },
        },
      },
      orderBy: { startDate: "desc" },
    });

    return NextResponse.json({
      success: true,
      currentCommittee: current,
      pastCommitteesCount: pastCommittees.length,
      pastCommittees,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "ইতিহাস লোড ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
