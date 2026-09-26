import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/members/[id] - Fetch single member by ID or MemberCode
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const member = await prisma.user.findFirst({
      where: {
        OR: [{ id }, { memberCode: id }],
      },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "সদস্য পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: member });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/members/[id] - Update status or member profile
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, role, adminEmail } = body;

    const dataToUpdate: any = {};
    if (status) {
      dataToUpdate.status = status;
      if (status === "APPROVED") {
        dataToUpdate.verifiedAt = new Date();
      }
    }
    if (role) dataToUpdate.role = role;

    const updated = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    // Record Audit Log
    if (status) {
      await prisma.auditLog.create({
        data: {
          action: status === "APPROVED" ? "মেম্বারশিপ অনুমোদন" : "আবেদন স্ট্যাটাস পরিবর্তন",
          admin: adminEmail || "admin@ndmyouth.org",
          target: `${updated.nameBn} (${updated.memberCode}) -> ${status}`,
          timestamp: "এখন মাত্র",
          type: status === "APPROVED" ? "success" : "warning",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "সদস্য তথ্য সফলভাবে আপডেট হয়েছে।",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "আপডেট ব্যর্থ হয়েছে" },
      { status: 500 }
    );
  }
}

// DELETE /api/members/[id] - Delete member
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "সদস্য সফলভাবে অপসারিত হয়েছে।" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "মুছে ফেলা সম্ভব হয়নি" },
      { status: 500 }
    );
  }
}
