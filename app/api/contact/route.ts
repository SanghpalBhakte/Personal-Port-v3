import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { saveContactSubmission } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000),
  _gotcha: z.string().optional(), // Honeypot field
});

export async function POST(req: NextRequest) {
  try {
    // 1. Extract IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "127.0.0.1";

    // 2. Check Rate Limit
    const rateLimit = await checkRateLimit(`contact:${ip}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many messages sent. Please wait a few moments before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parse & Validate Payload
    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input. Please verify the form fields.",
          errors: formattedErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, _gotcha } = validationResult.data;

    // 4. Honeypot check (Spam bot detection)
    if (_gotcha && _gotcha.trim().length > 0) {
      // Return fake success response to trick bots without processing
      return NextResponse.json({
        success: true,
        message: "Your message has been received.",
      });
    }

    // 5. Save submission to persistent store
    const { id } = await saveContactSubmission({ name, email, message });

    // 6. Send email notification (async)
    await sendContactNotification({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! I'll get back to you soon.",
      submissionId: id,
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
