import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST /api/events/[id]/rsvp - Online RSVP booking and ticket code generation
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: "নাম ও ফোন নম্বর প্রদান করুন" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ success: false, error: "কর্মসূচি পাওয়া যায়নি" }, { status: 404 });
    }

    // Generate unique Ticket Code
    const ticketCode = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;

    const rsvp = await prisma.eventRsvp.create({
      data: {
        eventId: id,
        name,
        phone,
        email: email || "",
        ticketCode,
      },
    });

    // Increment attendee count
    await prisma.event.update({
      where: { id },
      data: {
        registeredCount: { increment: 1 },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "আপনার আসন সফলভাবে সংরক্ষিত হয়েছে।",
        ticketCode,
        data: rsvp,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "RSVP প্রক্রিয়াকরণ ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
