import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildInquiryEmail, buildThankYouEmail } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, email, phone, details } = body;

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const fromAddress = process.env.GMAIL_USER;
    const fromHeader = `"Grimo Dev" <${fromAddress}>`;

    const inquiry = buildInquiryEmail({ name, business, email, phone, details });
    const thankYou = buildThankYouEmail(name);

    await Promise.all([
      transporter.sendMail({
        from: fromAddress,
        to: 'grimodev@gmail.com',
        replyTo: email,
        subject: `New inquiry from ${name}`,
        text: inquiry.text,
        html: inquiry.html,
      }),
      transporter.sendMail({
        from: fromHeader,
        to: email,
        replyTo: 'grimodev@gmail.com',
        subject: 'Thank you for reaching out — Grimo Dev',
        text: thankYou.text,
        html: thankYou.html,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
