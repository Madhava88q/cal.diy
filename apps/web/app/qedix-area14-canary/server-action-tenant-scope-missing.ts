"use server";

const prisma = {
  project: {
    update: async (_args: unknown) => ({ id: "project_1", name: "unsafe" }),
  },
};

const inputSchema = {
  safeParse(value: unknown) {
    return {
      success: true,
      data: value as { projectId: string; name: string },
    };
  },
};

async function requireAuth() {
  return { user: { id: "user_1", organizationId: "org_1" } };
}

export async function updateProjectWithoutTenantScope(formData: FormData) {
  const session = await requireAuth();
  if (!session.user.id) return { ok: false };

  const parsed = inputSchema.safeParse({
    projectId: String(formData.get("projectId")),
    name: String(formData.get("name")),
  });

  if (!parsed.success) return { ok: false };

  await prisma.project.update({
    where: {
      id: parsed.data.projectId,
    },
    data: {
      name: parsed.data.name,
    },
  });

  return { ok: true };
}
