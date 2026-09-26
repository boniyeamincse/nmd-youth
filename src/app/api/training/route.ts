import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/training - List leadership academy courses
export async function GET() {
  try {
    const courses = await prisma.trainingCourse.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch courses" }, { status: 500 });
  }
}

// POST /api/training - Create course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, titleEn, instructorBn, duration, modulesCount } = body;

    if (!titleBn || !instructorBn) {
      return NextResponse.json({ success: false, error: "কোর্সের নাম ও প্রশিক্ষকের নাম আবশ্যক" }, { status: 400 });
    }

    const code = `NDM-LMS-${Math.floor(100 + Math.random() * 900)}`;

    const course = await prisma.trainingCourse.create({
      data: {
        code,
        titleBn,
        titleEn: titleEn || titleBn,
        instructorBn,
        duration: duration || "৪ সপ্তাহ",
        modulesCount: Number(modulesCount) || 6,
        status: "OPEN",
        enrolledCount: 0,
        certificateAvailable: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "নতুন একাডেমি কোর্স চালু",
        admin: "admin@ndmyouth.org",
        target: course.titleBn,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create course" }, { status: 500 });
  }
}
