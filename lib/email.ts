import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const notificationTarget = process.env.CONTACT_NOTIFICATION_EMAIL || "sanghapal2006@gmail.com";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

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
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);
    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [notificationTarget],
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `You received a message through your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2b2013; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #d8c9a3; background: #efe4c9;">
            <h2 style="margin-top: 0; font-size: 18px; border-bottom: 2px solid #a83d1a; padding-bottom: 8px;">New Contact Note</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <div style="margin-top: 16px; padding: 16px; background: #fbf6e8; border: 1px solid #d8c9a3;">
              <p style="white-space: pre-wrap; margin: 0;">${safeMessage}</p>
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #655a3f;">Sent from sanghpal-bhakte-portfolio</p>
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
