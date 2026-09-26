import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/v1/committee-positions - List all database-driven positions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "ALL") where.category = category;

    const positions = await prisma.committeePosition.findMany({
      where,
      orderBy: { rank: "asc" },
    });

    return NextResponse.json({ success: true, count: positions.length, data: positions });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch positions" }, { status: 500 });
  }
}

// POST /api/v1/committee-positions - Create custom position
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nameBn, nameEn, category, rank, maxHolders, isRequired } = body;

    if (!nameBn) {
      return NextResponse.json({ success: false, error: "পদবীর নাম আবশ্যক।" }, { status: 400 });
    }

    const position = await prisma.committeePosition.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        category: category || "GENERAL",
        rank: Number(rank) || 10,
        maxHolders: Number(maxHolders) || 1,
        isRequired: isRequired ?? false,
      },
    });

    return NextResponse.json({ success: true, data: position }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "পদবী তৈরিতে সমস্যা হয়েছে।" }, { status: 500 });
  }
}
