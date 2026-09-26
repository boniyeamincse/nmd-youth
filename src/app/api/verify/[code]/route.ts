import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/verify/[code] - Public tamper-proof verification endpoint
export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const member = await prisma.user.findFirst({
      where: {
        memberCode: code,
      },
      select: {
        id: true,
        memberCode: true,
        nameBn: true,
        nameEn: true,
        district: true,
        division: true,
        bloodGroup: true,
        wingInterest: true,
        status: true,
        appliedAt: true,
        verifiedAt: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "অফিশিয়াল ডাটাবেসে এই কোডের কোনো বৈধ সদস্য বা আবেদন পাওয়া যায়নি।",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: member.status === "APPROVED",
      status: member.status,
      data: member,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "ভেরিফিকেশন প্রক্রিয়ায় সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
