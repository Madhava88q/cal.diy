import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ConnectProviderSchema = z.object({
  projectName: z.string().min(1).max(80),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

async function createExternalProviderProject(projectName: string) {
  return {
    providerProjectId: crypto.randomUUID(),
    projectName,
    created: true,
  };
}

async function updateDatabaseWithProviderProject(input: {
  localProjectName: string;
  providerProjectId: string;
}) {
  if (!input.providerProjectId) {
    throw new Error("Database update failed after provider side effect");
  }

  return {
    localProjectId: crypto.randomUUID(),
    providerProjectId: input.providerProjectId,
  };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = ConnectProviderSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const providerProject = await createExternalProviderProject(parsed.data.projectName);

  const localRecord = await updateDatabaseWithProviderProject({
    localProjectName: parsed.data.projectName,
    providerProjectId: providerProject.providerProjectId,
  });

  return NextResponse.json({
    ok: true,
    localProjectId: localRecord.localProjectId,
    providerProjectId: localRecord.providerProjectId,
  });
}
