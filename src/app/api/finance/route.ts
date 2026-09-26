import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/finance - List financial transactions & balance summaries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where: any = {};
    if (type && type !== "ALL") where.type = type;

    const records = await prisma.financeRecord.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const allRecords = await prisma.financeRecord.findMany();
    const totalIncome = allRecords
      .filter((r) => r.type === "INCOME")
      .reduce((sum, r) => sum + r.amount, 0);
    const totalExpense = allRecords
      .filter((r) => r.type === "EXPENSE")
      .reduce((sum, r) => sum + r.amount, 0);
    const netBalance = totalIncome - totalExpense;

    return NextResponse.json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,
        netBalance,
      },
      count: records.length,
      data: records,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch finance records" }, { status: 500 });
  }
}

// POST /api/finance - Record new income / expense voucher
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleBn, type, category, amount, recordedBy } = body;

    if (!titleBn || !amount) {
      return NextResponse.json({ success: false, error: "বিবরণ ও টাকার পরিমাণ আবশ্যক" }, { status: 400 });
    }

    const currentYear = new Date().getFullYear();
    const prefix = type === "INCOME" ? "TR" : "EX";
    const voucherNo = `${prefix}-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`;

    const record = await prisma.financeRecord.create({
      data: {
        voucherNo,
        titleBn,
        type: type || "INCOME",
        category: category || "MEMBERSHIP_DUES",
        amount: Number(amount),
        date: new Date().toISOString().split("T")[0],
        recordedBy: recordedBy || "অর্থ সম্পাদক",
        status: "VERIFIED",
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "আর্থিক ভাউচার দাখিল",
        admin: "admin@ndmyouth.org",
        target: `${record.titleBn} (৳${record.amount})`,
        timestamp: "এখন মাত্র",
        type: record.type === "INCOME" ? "success" : "warning",
      },
    });

    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create finance voucher" }, { status: 500 });
  }
}
