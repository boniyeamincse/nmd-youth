import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/v1/committee-positions/[id] - Edit position
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nameBn, nameEn, rank, maxHolders, isRequired } = body;

    const updated = await prisma.committeePosition.update({
      where: { id },
      data: {
        ...(nameBn && { nameBn }),
        ...(nameEn && { nameEn }),
        ...(rank !== undefined && { rank: Number(rank) }),
        ...(maxHolders !== undefined && { maxHolders: Number(maxHolders) }),
        ...(isRequired !== undefined && { isRequired: Boolean(isRequired) }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "পদবী হালনাগাদ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}

// DELETE /api/v1/committee-positions/[id] - Delete position if unused
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const count = await prisma.committeeMember.count({ where: { positionId: id } });
    if (count > 0) {
      return NextResponse.json(
        { success: false, error: `এই পদবীতে বর্তমানে ${count} জন সদস্য পদায়িত রয়েছে। প্রথমে তাদের পদায়ন পরিবর্তন করুন।` },
        { status: 400 }
      );
    }

    await prisma.committeePosition.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "পদবী সফলভাবে অপসারিত হয়েছে।" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "পদবী অপসারণ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
