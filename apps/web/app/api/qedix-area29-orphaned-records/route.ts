const prisma = {
  organization: {
    delete: async (_input: unknown) => ({ id: "org_1" }),
  },
  project: {
    create: async (_input: unknown) => ({ id: "project_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.organization.delete({
    where: { id: body.organizationId },
  });

  await prisma.project.create({
    data: {
      organizationId: body.organizationId,
      name: body.projectName,
    },
  });

  return Response.json({ ok: true });
}
