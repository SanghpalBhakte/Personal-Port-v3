import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const notificationTarget = process.env.CONTACT_NOTIFICATION_EMAIL || "sanghapal2006@gmail.com";

export async function sendContactNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<{ sent: boolean; messageId?: string; reason?: string }> {
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [notificationTarget],
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `You received a message through your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #202421; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #c7c7bf; background: #f4f2ed;">
            <h2 style="margin-top: 0; font-size: 18px; border-bottom: 2px solid #b94a32; padding-bottom: 8px;">New Contact Note</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #e7e6df;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #626863;">Sent from sanghpal-bhakte-portfolio</p>
          </div>
        `,
      });

      if (error) {
        console.warn("[email] Resend returned error:", error);
        return { sent: false, reason: error.message };
      }

      return { sent: true, messageId: data?.id };
    } catch (error) {
      console.error("[email] Resend delivery failed:", error);
      return { sent: false, reason: "resend_exception" };
    }
  }

  // Safe development logging fallback
  console.log(`[contact-note] From: ${name} (${email}) | Note: "${message}"`);
  return { sent: false, reason: "resend_not_configured" };
}
