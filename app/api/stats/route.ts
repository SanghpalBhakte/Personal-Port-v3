import { NextRequest, NextResponse } from "next/server";
import { getStats, incrementViews, incrementProjectLike } from "@/lib/db";
import { ApiResponse, StatsData } from "@/types";

export async function GET(): Promise<NextResponse<ApiResponse<StatsData>>> {
  try {
    const stats = await getStats();
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("[api/stats] Fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: { action?: string; projectId?: string } = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const { action = "view", projectId } = body;

    if (action === "like" && projectId) {
      const result = await incrementProjectLike(projectId);
      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    const result = await incrementViews();
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("[api/stats] Increment error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update stats",
      },
      { status: 500 }
    );
  }
}
