import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/volunteers - List blood donors with instant blood group and district filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bloodGroup = searchParams.get("bloodGroup");
    const district = searchParams.get("district");
    const search = searchParams.get("search");

    const where: any = {};
    if (bloodGroup && bloodGroup !== "ALL") where.bloodGroup = bloodGroup;
    if (district && district !== "ALL") where.district = district;
    if (search) {
      where.OR = [
        { nameBn: { contains: search } },
        { phone: { contains: search } },
        { district: { contains: search } },
        { upazila: { contains: search } },
      ];
    }

    const donors = await prisma.volunteerDonor.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: donors.length, data: donors });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch blood donors" }, { status: 500 });
  }
}

// POST /api/volunteers - Register new blood donor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nameBn, bloodGroup, district, upazila, phone, disasterSquad } = body;

    if (!nameBn || !phone || !district) {
      return NextResponse.json({ success: false, error: "নাম, ফোন ও জেলা আবশ্যক" }, { status: 400 });
    }

    const donor = await prisma.volunteerDonor.create({
      data: {
        nameBn,
        bloodGroup: bloodGroup || "O+",
        district,
        upazila: upazila || "সদর",
        phone,
        lastDonationDate: new Date().toISOString().split("T")[0],
        isAvailable: true,
        disasterSquad: disasterSquad ?? false,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "রক্তদাতা / স্বেচ্ছাসেবক ভুক্তি",
        admin: "admin@ndmyouth.org",
        target: `${donor.nameBn} (${donor.bloodGroup}, ${donor.district})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({ success: true, data: donor }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to register donor" }, { status: 500 });
  }
}
