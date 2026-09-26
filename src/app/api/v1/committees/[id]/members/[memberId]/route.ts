import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PATCH /api/v1/committees/[id]/members/[memberId] - Update member status or position
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const { id, memberId } = params;
    const body = await request.json();
    const { status, positionId, notes, adminEmail } = body;

    const assignment = await prisma.committeeMember.findUnique({
      where: { id: memberId },
      include: { user: true, position: true },
    });

    if (!assignment || assignment.committeeId !== id) {
      return NextResponse.json({ success: false, error: "সদস্য পদায়ন পাওয়া যায়নি।" }, { status: 404 });
    }

    const dataToUpdate: any = {};
    let desc = "";

    if (status && status !== assignment.status) {
      dataToUpdate.status = status;
      desc += `স্ট্যাটাস পরিবর্তন: ${assignment.status} -> ${status}. `;
    }

    if (positionId && positionId !== assignment.positionId) {
      const newPos = await prisma.committeePosition.findUnique({ where: { id: positionId } });
      if (newPos) {
        dataToUpdate.positionId = positionId;
        desc += `পদবী পরিবর্তন: ${assignment.position.nameBn} -> ${newPos.nameBn}. `;
      }
    }

    if (notes !== undefined) dataToUpdate.notes = notes;

    const updated = await prisma.committeeMember.update({
      where: { id: memberId },
      data: dataToUpdate,
      include: { user: true, position: true },
    });

    if (desc) {
      await prisma.committeeHistory.create({
        data: {
          committeeId: id,
          eventType: "POSITION_CHANGED",
          changedBy: adminEmail || "admin@ndmyouth.org",
          description: `${assignment.user.nameBn} - ${desc}`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "সদস্য পদায়ন সফলভাবে হালনাগাদ হয়েছে।",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "হালনাগাদ ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}

// DELETE /api/v1/committees/[id]/members/[memberId] - Relieve or remove member from committee
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; memberId: string } }
) {
  try {
    const { id, memberId } = params;
    const { searchParams } = new URL(request.url);
    const adminEmail = searchParams.get("adminEmail") || "admin@ndmyouth.org";
    const reason = searchParams.get("reason") || "সাংগঠনিক সিদ্ধান্ত";

    const assignment = await prisma.committeeMember.findUnique({
      where: { id: memberId },
      include: { user: true, position: true },
    });

    if (!assignment || assignment.committeeId !== id) {
      return NextResponse.json({ success: false, error: "পদায়ন পাওয়া যায়নি।" }, { status: 404 });
    }

    await prisma.committeeMember.delete({ where: { id: memberId } });

    // Record Granular Change History (Section 8)
    await prisma.committeeHistory.create({
      data: {
        committeeId: id,
        eventType: "MEMBER_REMOVED",
        changedBy: adminEmail,
        description: `${assignment.user.nameBn} কে '${assignment.position.nameBn}' পদ হতে অব্যাহতি দেওয়া হয়েছে। কারণ: ${reason}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${assignment.user.nameBn} কে কমিটি পদায়ন হতে অব্যাহতি দেওয়া হয়েছে।`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "অব্যাহতি প্রক্রিয়া ব্যর্থ হয়েছে।" }, { status: 500 });
  }
}
