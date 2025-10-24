import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, reason, hosting, hostingPlan, message } = body;

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    // Format reason for display
    const formatReason = (reason: string) => {
      const reasonMap: { [key: string]: string } = {
        'starter': 'Starter Package ($750)',
        'business': 'Business Package ($1200)',
        'pro': 'Pro Package ($2500)',
        'portfolio': 'Portfolio Site',
        'event': 'Event Scheduling Page',
        'mini-business': 'Mini Business Page',
        'standalone': 'Standalone Site'
      };
      return reasonMap[reason] || reason;
    };

    // Create professional HTML email template
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
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                            <h1 style="margin: 0; font-family: 'Cormorant Unicase', serif; font-size: 32px; font-weight: 400; color: #000000; letter-spacing: 2px;">
                                GRIMO DEV
                            </h1>
                            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666; font-weight: 400; letter-spacing: 1px; text-transform: uppercase;">
                                New Contact Form Submission
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- Contact Information -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 24px;">
                                        <h2 style="margin: 0 0 16px 0; font-family: 'Cormorant Unicase', serif; font-size: 24px; font-weight: 400; color: #000000;">
                                            Contact Details
                                        </h2>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 120px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">
                                                    Name:
                                                </td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    ${name}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 120px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">
                                                    Email:
                                                </td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    <a href="mailto:${email}" style="color: #000000; text-decoration: none;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 120px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">
                                                    Service:
                                                </td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    ${formatReason(reason)}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                ${hosting ? `
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 120px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">
                                                    Hosting Interest:
                                                </td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    Yes
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 120px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">
                                                    Hosting Plan:
                                                </td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    ${hostingPlan || 'Not specified'}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                            
                            <!-- Message Section -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 24px; padding-bottom: 16px;">
                                        <h2 style="margin: 0 0 16px 0; font-family: 'Cormorant Unicase', serif; font-size: 24px; font-weight: 400; color: #000000;">
                                            Message
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #000000;">
                                        <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6; font-weight: 400;">
                                            ${message.replace(/\n/g, '<br>')}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Call to Action -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 32px; text-align: center;">
                                        <a href="mailto:${email}" style="display: inline-block; padding: 16px 32px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; transition: all 0.3s ease;">
                                            Reply to ${name}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #f0f0f0; background-color: #fafafa;">
                            <p style="margin: 0; font-size: 12px; color: #666666; font-weight: 400;">
                                This email was sent from the GRIMO DEV website contact form
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666666; font-weight: 400;">
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

    // Plain text version for email clients that don't support HTML
    const textEmail = `
New Contact Form Submission - GRIMO DEV

Contact Details:
Name: ${name}
Email: ${email}
Service: ${formatReason(reason)}
${hosting ? `Hosting Interest: Yes\nHosting Plan: ${hostingPlan || 'Not specified'}` : 'Hosting Interest: No'}

Message:
${message}

---
This email was sent from the GRIMO DEV website contact form
Visit: https://grimodev.com
    `.trim();

    // Send email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'grimodev@gmail.com',
      subject: `New Contact Form Submission from ${name} - ${formatReason(reason)}`,
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
