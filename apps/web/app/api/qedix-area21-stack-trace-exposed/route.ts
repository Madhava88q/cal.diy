import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const JobRequestSchema = z.object({
  jobId: z.string().min(1).max(100),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

function validateSameSiteRequest(request: NextRequest) {
  const origin = request.headers.get("origin");

  return origin === "https://app.example.test";
}

async function runInternalJob(jobId: string) {
  const error = new Error(`Internal job ${jobId} failed while reading database shard primary_users`);

  error.stack = [
    `Error: Internal job ${jobId} failed while reading database shard primary_users`,
    "    at runInternalJob (apps/web/server/private/jobs/runInternalJob.ts:42:11)",
    "    at POST (apps/web/app/api/qedix-area21-stack-trace-exposed/route.ts:45:5)",
    "    at async NextRouteHandler.execute (node_modules/next/server/future/route-modules/app-route/module.js:195:37)",
  ].join("\n");

  throw error;
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!validateSameSiteRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const parsed = JobRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await runInternalJob(parsed.data.jobId);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        stackTrace: error instanceof Error ? error.stack : String(error),
      },
      { status: 500 }
    );
  }
}
