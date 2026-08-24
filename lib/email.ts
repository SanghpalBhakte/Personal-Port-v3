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
}): Promise<{ sent: boolean; messageId?: string }> {
  if (resend) {
    try {
      const data = await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [notificationTarget],
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `You received a new message through your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #202421; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #c7c7bf; background: #f4f2ed;">
            <h2 style="margin-top: 0; font-size: 20px; border-bottom: 2px solid #b94a32; padding-bottom: 8px;">New Contact Submission</h2>
            <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
            <div style="margin-top: 16px; padding: 16px; background: #ffffff; border: 1px solid #e7e6df; border-radius: 4px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #626863;">Sent from sanghpal-bhakte-portfolio</p>
          </div>
        `,
      });
      return { sent: true, messageId: data.data?.id };
    } catch (error) {
      console.error("Resend API error:", error);
    }
  }

  // Fallback logging if no API key is provided
  console.log(`[CONTACT SUBMISSION] Name: ${name} | Email: ${email} | Message: ${message}`);
  return { sent: false };
}
