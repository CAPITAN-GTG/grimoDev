import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Outfit', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                            <h1 style="margin: 0; font-family: 'Cormorant Unicase', serif; font-size: 32px; font-weight: 400; color: #000000; letter-spacing: 2px;">
                                GRIMO DEV
                            </h1>
                            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666; font-weight: 400; letter-spacing: 1px; text-transform: uppercase;">
                                New inquiry
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Name:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${name}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Business:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${business || '—'}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Email:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Phone:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${phone || '—'}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 8px; padding-bottom: 16px;">
                                        <h2 style="margin: 0 0 16px 0; font-family: 'Cormorant Unicase', serif; font-size: 24px; font-weight: 400; color: #000000;">
                                            What they want &amp; what they do
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #000000;">
                                        <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6; font-weight: 400;">
                                            ${String(details).replace(/\n/g, '<br>')}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 32px; text-align: center;">
                                        <a href="mailto:${email}" style="display: inline-block; padding: 16px 32px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px;">
                                            Reply to ${name}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #f0f0f0; background-color: #fafafa;">
                            <p style="margin: 0; font-size: 12px; color: #666666;">This email was sent from the GRIMO DEV website contact form</p>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666666;">
                                <a href="https://grimodev.com" style="color: #000000; text-decoration: none;">grimodev.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();

    const textEmail = `
New inquiry — GRIMO DEV

Name: ${name}
Business: ${business || '—'}
Email: ${email}
Phone: ${phone || '—'}

What they want & what they do:
${details}

---
grimodev.com
    `.trim();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'grimodev@gmail.com',
      subject: `New inquiry from ${name}`,
      text: textEmail,
      html: htmlEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
