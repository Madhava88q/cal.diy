import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateProjectSchema = z.object({
  projectName: z.string().min(1).max(80),
});

async function getServerSession() {
  return {
    user: {
      id: "user_123",
    },
  };
}

async function createProject(projectName: string) {
  return {
    id: crypto.randomUUID(),
    name: projectName,
  };
}

async function createDefaultBoard(projectId: string) {
  if (!projectId) {
    throw new Error("Default board creation failed");
  }

  return {
    id: crypto.randomUUID(),
    projectId,
  };
}

async function createInitialPermission(projectId: string, userId: string) {
  if (!projectId || !userId) {
    throw new Error("Permission creation failed");
  }

  return {
    id: crypto.randomUUID(),
    projectId,
  };
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = CreateProjectSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const project = await createProject(parsed.data.projectName);

  const board = await createDefaultBoard(project.id);

  const permission = await createInitialPermission(project.id, session.user.id);

  return NextResponse.json({
    ok: true,
    projectId: project.id,
    boardId: board.id,
    permissionId: permission.id,
  });
}
