const prisma = {
  event: {
    findMany: async (_input: unknown) => [{ id: "event_1" }],
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  const rows = await prisma.event.findMany({
    where: { organizationId: body.organizationId },
  });

  const rendered = await Promise.all(
    rows.map(async (row: unknown) => renderPdf(row))
  );

  return Response.json({
    ok: true,
    count: rendered.length,
  });
}

async function renderPdf(row: unknown) {
  return row;
}
