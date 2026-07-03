"use server";

const prisma = {
  project: {
    update: async (_args: unknown) => ({ id: "project_1" }),
  },
};

const updateSchema = {
  safeParse(value: unknown) {
    return {
      success: true,
      data: value as {
        projectId: string;
        next: string;
      },
    };
  },
};

async function requireAuth() {
  return { user: { id: "user_1" } };
}

function redirect(destination: string): never {
  throw new Error("redirect:" + destination);
}

export async function updateProjectAndRedirectUnsafely(formData: FormData) {
  const session = await requireAuth();
  if (!session.user.id) return { ok: false };

  const parsed = updateSchema.safeParse({
    projectId: String(formData.get("projectId")),
    next: String(formData.get("next")),
  });

  if (!parsed.success) return { ok: false };

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
