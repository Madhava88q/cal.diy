import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ProvisionRequestSchema = z.object({
  workspaceName: z.string().min(1).max(80),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

async function createWorkspace(workspaceName: string) {
  return {
    id: crypto.randomUUID(),
    workspaceName,
  };
}

async function provisionExternalResource(workspaceId: string) {
  if (!workspaceId) {
    throw new Error("External provisioning failed");
  }

  return {
    externalId: crypto.randomUUID(),
  };
}

async function sendProvisioningEmail(workspaceId: string) {
  if (!workspaceId) {
    throw new Error("Email delivery failed");
  }

  return {
    sent: true,
  };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = ProvisionRequestSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const workspace = await createWorkspace(parsed.data.workspaceName);

  const externalResource = await provisionExternalResource(workspace.id);

  const email = await sendProvisioningEmail(workspace.id);

  return NextResponse.json({
    ok: true,
    workspaceId: workspace.id,
    externalId: externalResource.externalId,
    emailSent: email.sent,
  });
}
