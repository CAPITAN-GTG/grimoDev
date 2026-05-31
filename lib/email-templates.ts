const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://grimo-dev.vercel.app";
const SITE_LABEL = "grimo-dev.vercel.app";

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailShell(subtitle: string, bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GRIMO DEV</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Outfit', Arial, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                            <h1 style="margin: 0; font-family: 'Cormorant Unicase', Georgia, serif; font-size: 32px; font-weight: 400; color: #000000; letter-spacing: 2px;">
                                GRIMO DEV
                            </h1>
                            <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666; font-weight: 400; letter-spacing: 1px; text-transform: uppercase;">
                                ${subtitle}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px;">
                            ${bodyHtml}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 40px; text-align: center; border-top: 1px solid #f0f0f0; background-color: #fafafa;">
                            <p style="margin: 0; font-size: 12px; color: #666666;">GRIMO DEV — Websites, Meta &amp; Google Ads, Social Media</p>
                            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666666;">
                                <a href="${SITE_URL}" style="color: #000000; text-decoration: none;">${SITE_LABEL}</a>
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
}

export type InquiryEmailData = {
  name: string;
  business?: string;
  email: string;
  phone?: string;
  details: string;
};

export function buildInquiryEmail(data: InquiryEmailData): { html: string; text: string } {
  const { name, business, email, phone, details } = data;
  const safeName = escapeHtml(name);
  const safeBusiness = escapeHtml(business || "—");
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "—");
  const safeDetails = escapeHtml(details).replace(/\n/g, "<br>");

  const bodyHtml = `
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 16px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Name:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${safeName}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Business:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${safeBusiness}</td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Email:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">
                                                    <a href="mailto:${safeEmail}" style="color: #000000; text-decoration: none;">${safeEmail}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 140px; padding: 12px 0; font-weight: 600; color: #000000; font-size: 14px;">Phone:</td>
                                                <td style="padding: 12px 0; color: #333333; font-size: 14px;">${safePhone}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 8px; padding-bottom: 16px;">
                                        <h2 style="margin: 0 0 16px 0; font-family: 'Cormorant Unicase', Georgia, serif; font-size: 24px; font-weight: 400; color: #000000;">
                                            What they want &amp; what they do
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #000000;">
                                        <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6; font-weight: 400;">
                                            ${safeDetails}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-top: 32px; text-align: center;">
                                        <a href="mailto:${safeEmail}" style="display: inline-block; padding: 16px 32px; background-color: #000000; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 400; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px;">
                                            Reply to ${safeName}
                                        </a>
                                    </td>
                                </tr>
                            </table>
  `;

  const text = `
New inquiry — GRIMO DEV

Name: ${name}
Business: ${business || "—"}
Email: ${email}
Phone: ${phone || "—"}

What they want & what they do:
${details}

---
${SITE_URL}
  `.trim();

  return {
    html: emailShell("New inquiry", bodyHtml),
    text,
  };
}

export function buildThankYouEmail(name: string): { html: string; text: string } {
  const firstName = escapeHtml(name.trim().split(/\s+/)[0] || name);

  const bodyHtml = `
                            <h2 style="margin: 0 0 24px 0; font-family: 'Cormorant Unicase', Georgia, serif; font-size: 26px; font-weight: 400; color: #000000; line-height: 1.3;">
                                Thank you for reaching out, ${firstName}
                            </h2>
                            <p style="margin: 0 0 16px 0; color: #333333; font-size: 15px; line-height: 1.7;">
                                We received your message and appreciate you taking the time to contact GRIMO DEV.
                            </p>
                            <p style="margin: 0 0 16px 0; color: #333333; font-size: 15px; line-height: 1.7;">
                                A member of our team will call or email you as soon as we can. We will most likely want to set up a short meeting to learn more about your goals—whether by phone call, Zoom, Google Meet, or another option that works for you.
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border-left: 4px solid #000000;">
                                        <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.6; font-weight: 500;">
                                            Please stay alert in your mailbox (and spam folder) so you do not miss our reply.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 24px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                                Talk soon,<br>
                                <span style="color: #000000;">The GRIMO DEV team</span>
                            </p>
  `;

  const text = `
Thank you for reaching out — GRIMO DEV

Hi ${name},

We received your message and appreciate you taking the time to contact GRIMO DEV.

A member of our team will call or email you as soon as we can. We will most likely want to set up a short meeting to learn more about your goals—whether by phone call, Zoom, Google Meet, or another option that works for you.

Please stay alert in your mailbox (and spam folder) so you do not miss our reply.

Talk soon,
The GRIMO DEV team

---
${SITE_URL}
  `.trim();

  return {
    html: emailShell("Thank you", bodyHtml),
    text,
  };
}
