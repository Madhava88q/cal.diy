import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProvisionRequestSchema = z.object({
  workspaceName: z.string().min(1).max(80),
});

async function requireUser() {
  return {
    id: "user_123",
    tenantId: "tenant_123",
  };
}

async function createWorkspace(input: {
  tenantId: string;
  userId: string;
  workspaceName: string;
}) {
  return {
    id: crypto.randomUUID(),
    ...input,
  };
}

async function syncWorkspaceToProvider(workspaceId: string) {
  if (!workspaceId) {
    throw new Error("Provider sync failed");
  }

  return {
    providerId: crypto.randomUUID(),
  };
}

export async function POST(request: NextRequest) {
  const user = await requireUser();

  const parsed = ProvisionRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const workspace = await createWorkspace({
    tenantId: user.tenantId,
    userId: user.id,
    workspaceName: parsed.data.workspaceName,
  });

  const provider = await syncWorkspaceToProvider(workspace.id);

  return NextResponse.json({
    ok: true,
    workspaceId: workspace.id,
    providerId: provider.providerId,
  });
}
