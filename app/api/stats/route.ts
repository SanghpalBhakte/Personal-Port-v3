import { NextRequest, NextResponse } from "next/server";
import { getStats, incrementViews, incrementLikes } from "@/lib/db";

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || "view";

    if (action === "like") {
      const likes = await incrementLikes();
      return NextResponse.json({ success: true, likes });
    }

    const views = await incrementViews();
    return NextResponse.json({ success: true, views });
  } catch (error) {
    console.error("Error updating stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update stats" },
      { status: 500 }
    );
  }
}
