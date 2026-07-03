"use server";

import { redirect } from "next/navigation";

const prisma = {
  project: {
    update: async (_input: unknown) => ({ id: "project_1" }),
  },
};

const updateSchema = {
  safeParse(value: unknown) {
    return {
      success: true as const,
      data: value as { projectId: string; next: string },
    };
  },
};

async function requireAuth() {
  return { user: { id: "user_1" } };
}

export async function updateAndRedirect(formData: FormData) {
  const session = await requireAuth();
  if (!session?.user) throw new Error("Unauthorized");

  const parsed = updateSchema.safeParse({
    projectId: String(formData.get("projectId")),
    next: String(formData.get("next")),
  });

  if (!parsed.success) return;

  await prisma.project.update({
    where: {
      id: parsed.data.projectId,
      userId: session.user.id,
    },
    data: {
      updatedAt: new Date(),
    },
  });

  redirect(parsed.data.next);
}
