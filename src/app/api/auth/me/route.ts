import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "অননুমোদিত প্রবেশাধিকার। লগইন করুন।" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: {
      id: true,
      nameBn: true,
      nameEn: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      memberCode: true,
      division: true,
      district: true,
      institution: true,
      wingInterest: true,
      bloodGroup: true,
      appliedAt: true,
      verifiedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "ব্যবহারকারী পাওয়া যায়নি।" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
