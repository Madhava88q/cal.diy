import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ImportRequestSchema = z.object({
  sourceId: z.string().min(1).max(100),
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

async function importPrivateData(sourceId: string) {
  throw new Error(
    `Import failed for source ${sourceId}: internal provider account acct_internal_123 rejected database table users_private`
  );
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!validateSameSiteRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const parsed = ImportRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await importPrivateData(parsed.data.sourceId);

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
