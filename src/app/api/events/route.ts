import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/events - List events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        rsvps: {
          select: { id: true, name: true, phone: true, ticketCode: true, createdAt: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: events.length, data: events });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 });
  }
}

// POST /api/events - Create new event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      titleBn,
      titleEn,
      summaryBn,
      summaryEn,
      descriptionBn,
      descriptionEn,
      venueBn,
      venueEn,
      date,
      time,
      isUpcoming,
    } = body;

    if (!titleBn || !venueBn || !date) {
      return NextResponse.json({ success: false, error: "শিরোনাম, ভেন্যু ও তারিখ আবশ্যক" }, { status: 400 });
    }

    const slug = `event-${Date.now()}`;

    const event = await prisma.event.create({
      data: {
        titleBn,
        titleEn: titleEn || titleBn,
        slug,
        summaryBn: summaryBn || titleBn,
        summaryEn: summaryEn || titleBn,
        descriptionBn: descriptionBn || titleBn,
        descriptionEn: descriptionEn || titleBn,
        venueBn,
        venueEn: venueEn || venueBn,
        date,
        time: time || "বিকাল ৩:০০",
        isUpcoming: isUpcoming ?? true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "নতুন কর্মসূচি ঘোষণা",
        admin: "admin@ndmyouth.org",
        target: `${event.titleBn} (${event.date})`,
        timestamp: "এখন মাত্র",
        type: "success",
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 });
  }
}
