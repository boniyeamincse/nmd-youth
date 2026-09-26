import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/notices - List notices and statements
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: any = {};
    if (category && category !== "ALL") where.category = category;
    if (search) {
      where.OR = [
        { titleBn: { contains: search } },
        { titleEn: { contains: search } },
        { contentBn: { contains: search } },
      ];
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
    });

    return NextResponse.json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch notices" }, { status: 500 });
  }
}

// POST /api/notices - Publish new press release or circular
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, titleEn, contentBn, contentEn, category, isPinned } = body;

    if (!titleBn || !contentBn) {
      return NextResponse.json({ success: false, error: "শিরোনাম ও বিবরণ আবশ্যক" }, { status: 400 });
    }

    const slug = `notice-${Date.now()}`;

    const notice = await prisma.notice.create({
      data: {
        titleBn,
        titleEn: titleEn || titleBn,
        slug,
        contentBn,
        contentEn: contentEn || contentBn,
        category: category || "PRESS_RELEASE",
        isPinned: isPinned ?? false,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "প্রেস বিজ্ঞপ্তি প্রকাশ",
        admin: "admin@ndmyouth.org",
        target: notice.titleBn,
        timestamp: "এখন মাত্র",
        type: "success",
      },
    });

    return NextResponse.json({ success: true, data: notice }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "বিজ্ঞপ্তি প্রকাশ ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
