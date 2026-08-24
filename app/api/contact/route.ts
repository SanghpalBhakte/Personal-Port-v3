import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { saveContactSubmission } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { ContactResponse } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000, "Message cannot exceed 2000 characters"),
  _gotcha: z.string().optional(), // Honeypot field for bot detection
});

export async function POST(req: NextRequest): Promise<NextResponse<ContactResponse>> {
  try {
    // 1. Resolve client IP for rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // 2. Enforce Rate Limiting
    const rateLimit = await checkRateLimit(`contact:${ip}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Rate limit reached. Please wait a minute before sending another message.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parse and Validate Request Body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid JSON payload.",
        },
        { status: 400 }
      );
    }

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, _gotcha } = validationResult.data;

    // 4. Honeypot check (silently drop bot submissions)
    if (_gotcha && _gotcha.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Message received.",
      });
    }

    // 5. Persist submission
    const { id } = await saveContactSubmission({ name, email, message });

    // 6. Dispatch email notification asynchronously
    await sendContactNotification({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Thank you for the note. I will get back to you soon.",
      submissionId: id,
    });
  } catch (error) {
    console.error("[api/contact] Internal error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please email directly.",
      },
      { status: 500 }
    );
  }
}
