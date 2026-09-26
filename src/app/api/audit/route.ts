import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/audit - List audit trail logs
export async function GET() {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch audit logs" }, { status: 500 });
  }
}

// POST /api/audit - Record new audit action
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, admin, target, type } = body;

    if (!action || !target) {
      return NextResponse.json({ success: false, error: "Action and target are required" }, { status: 400 });
    }

    const log = await prisma.auditLog.create({
      data: {
        action,
        admin: admin || "admin@ndmyouth.org",
        target,
        timestamp: "এখন মাত্র",
        type: type || "info",
      },
    });

    return NextResponse.json({ success: true, data: log }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create audit log" }, { status: 500 });
  }
}
