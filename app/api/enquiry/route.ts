import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, notes, dateFrom, dateTo, items } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // TODO: integrate with an email service (e.g. Nodemailer, Resend, SendGrid)
    // or submit directly to WooCommerce orders via the REST API.
    // For now, log the enquiry so the data flow can be verified.
    console.log('New booking enquiry:', {
      name,
      email,
      phone,
      notes,
      dateFrom,
      dateTo,
      items,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
