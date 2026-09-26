import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/documents - List documents
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "ALL") where.category = category;

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: documents.length, data: documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch documents" }, { status: 500 });
  }
}

// POST /api/documents - Archive new document
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, titleEn, category, version, fileSize, downloadUrl } = body;

    if (!titleBn) {
      return NextResponse.json({ success: false, error: "নথির শিরোনাম আবশ্যক" }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();
    const docCode = `NDM-DOC-${currentYear}-${Math.floor(100 + Math.random() * 900)}`;

    const document = await prisma.document.create({
      data: {
        docCode,
        titleBn,
        titleEn: titleEn || titleBn,
        category: category || "RESOLUTION",
        fileType: category === "BRAND_ASSET" ? "ZIP" : "PDF",
        fileSize: fileSize || "1.2 MB",
        version: version || "১.০",
        publishedDate: new Date().toISOString().split("T")[0],
        downloadUrl: downloadUrl || (category === "BRAND_ASSET" ? "/logo.png" : "#"),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "নথি সংরক্ষণ",
        admin: "admin@ndmyouth.org",
        target: `${document.titleBn} (${document.docCode})`,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({ success: true, data: document }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to archive document" }, { status: 500 });
  }
}
