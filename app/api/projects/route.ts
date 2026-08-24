import { NextResponse } from "next/server";
import { projects } from "@/lib/data";
import { ApiResponse, Project } from "@/types";

export async function GET(): Promise<NextResponse<ApiResponse<Project[]>>> {
  return NextResponse.json({
    success: true,
    data: projects,
  });
}
