import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/chapters - List all 64 districts & campus chapters
export async function GET() {
  try {
    const chapters = await prisma.chapter.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, count: chapters.length, data: chapters });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch chapters" }, { status: 500 });
  }
}

// POST /api/chapters - Create new chapter
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nameBn, nameEn, type, division, convener, phone, status } = body;

    if (!nameBn || !convener) {
      return NextResponse.json({ success: false, error: "শাখার নাম ও আহ্বায়ক আবশ্যক" }, { status: 400 });
    }

    const chapter = await prisma.chapter.create({
      data: {
        nameBn,
        nameEn: nameEn || nameBn,
        type: type || "DISTRICT",
        division: division || "ঢাকা",
        convener,
        phone: phone || "01700000000",
        status: status || "AD_HOC",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "নতুন শাখা সনদ প্রদান",
        admin: "admin@ndmyouth.org",
        target: `${chapter.nameBn} (${chapter.type})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({ success: true, data: chapter }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create chapter" }, { status: 500 });
  }
}
