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
  _elapsed: z.number().optional(), // ms between opening the form and sending it
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
          message: "That’s a lot of messages at once. Please wait a minute and try again.",
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
          message: "Please fix the fields marked below.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message, _gotcha, _elapsed } = validationResult.data;

    // 4. Spam checks. Bots get a normal-looking "sent" reply so they don't retry.
    //    - honeypot field filled in
    //    - form sent less than 3 seconds after it was opened
    const looksLikeBot =
      (_gotcha && _gotcha.trim().length > 0) || (typeof _elapsed === "number" && _elapsed < 3000);
    if (looksLikeBot) {
      return NextResponse.json({
        success: true,
        message: "Thanks! I got your message and will reply soon.",
      });
    }

    //    - links in the name, or lots of links in the message (typical spam)
    const linkPattern = /(https?:\/\/|www\.)/gi;
    if (linkPattern.test(name)) {
      return NextResponse.json(
        { success: false, message: "Please enter just your name.", errors: { name: ["Please enter just your name."] } },
        { status: 400 }
      );
    }
    if ((message.match(linkPattern) || []).length > 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Please keep it to 2 links or fewer.",
          errors: { message: ["Please keep it to 2 links or fewer."] },
        },
        { status: 400 }
      );
    }

    // 5. Persist submission
    const { id, storage } = await saveContactSubmission({ name, email, message });

    // 6. Dispatch email notification
    const delivery = await sendContactNotification({ name, email, message });

    // 7. If the note was neither emailed nor stored durably, it would be lost on the
    //    next serverless cold start. Say so instead of pretending it was sent.
    if (!delivery.sent && storage === "memory") {
      return NextResponse.json(
        {
          success: false,
          code: "delivery_unavailable",
          message: "The form isn’t working right now, so I’m opening your email app instead.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! I got your message and will reply soon.",
      submissionId: id,
    });
  } catch (error) {
    console.error("[api/contact] Internal error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please email me directly.",
      },
      { status: 500 }
    );
  }
}
