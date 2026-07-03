"use server";

const prisma = {
  project: {
    update: async (_args: unknown) => ({ id: "project_1", ownerId: "user_2" }),
  },
};

const transferSchema = {
  safeParse(value: unknown) {
    return {
      success: true,
      data: value as {
        projectId: string;
        userId: string;
        organizationId: string;
      },
    };
  },
};

async function requireAuth() {
  return { user: { id: "user_1", organizationId: "org_1" } };
}

export async function transferProjectTrustingClientIdentity(formData: FormData) {
  const session = await requireAuth();
  if (!session.user.id) return { ok: false };

  const parsed = transferSchema.safeParse({
    projectId: String(formData.get("projectId")),
    userId: String(formData.get("userId")),
    organizationId: String(formData.get("organizationId")),
  });

  if (!parsed.success) return { ok: false };

  await prisma.project.update({
    where: {
      id: parsed.data.projectId,
      organizationId: parsed.data.organizationId,
    },
    data: {
      ownerId: parsed.data.userId,
      organizationId: parsed.data.organizationId,
    },
  });

  return { ok: true };
}
