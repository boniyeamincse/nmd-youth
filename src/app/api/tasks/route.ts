import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/tasks - List tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
  }
}

// POST /api/tasks - Create new directive
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, titleEn, assignedToBn, wing, priority, deadline } = body;

    if (!titleBn || !assignedToBn) {
      return NextResponse.json({ success: false, error: "দায়িত্বের বিবরণ ও শাখা আবশ্যক" }, { status: 400 });
    }

    const task = await prisma.task.create({
      data: {
        titleBn,
        titleEn: titleEn || titleBn,
        assignedToBn,
        wing: wing || "মাঠপর্যায়",
        priority: priority || "HIGH",
        deadline: deadline || "২০২৬-০৪-৩০",
        status: "TODO",
        progress: 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "সাংগঠনিক দায়িত্ব অর্পণ",
        admin: "admin@ndmyouth.org",
        target: task.titleBn,
        timestamp: "এখন মাত্র",
        type: "info",
      },
    });

    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 });
  }
}

// PATCH /api/tasks - Update status and progress
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, progress } = body;

    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (progress !== undefined) dataToUpdate.progress = progress;

    const updated = await prisma.task.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update task" }, { status: 500 });
  }
}
