import { NextResponse } from "next/server";

type CreateProjectRequest = {
  name: string;
  workspaceId: string;
  billingPlanId: string;
  seatCount: number;
};

export async function POST(request: Request) {
  const body = (await request.json()) as CreateProjectRequest;

  // Qedix Area 12.2 controlled canary:
  // This intentionally represents a request contract change.
  // Old-style callers may only send { name }.
  // This route now requires workspaceId, billingPlanId, and seatCount.
  if (!body.name || !body.workspaceId || !body.billingPlanId || !body.seatCount) {
    return NextResponse.json(
      {
        error: "Missing required request contract fields",
        required: ["name", "workspaceId", "billingPlanId", "seatCount"],
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    projectId: "prj_area12_002",
    name: body.name,
    workspaceId: body.workspaceId,
    billingPlanId: body.billingPlanId,
    seatCount: body.seatCount,
  });
}
