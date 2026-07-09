const prisma = {
  document: {
    findMany: async (_input?: unknown) => [
      {
        id: "doc_1",
        tenantId: "tenant_a",
        organizationId: "org_a",
        title: "Tenant A private document",
      },
      {
        id: "doc_2",
        tenantId: "tenant_b",
        organizationId: "org_b",
        title: "Tenant B private document",
      },
    ],
  },
} as any;

export async function GET() {
  const documents = await prisma.document.findMany({});

  return Response.json({
    documents,
  });
}
