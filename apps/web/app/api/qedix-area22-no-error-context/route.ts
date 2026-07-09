const prisma = {
  exportJob: {
    create: async (_input: unknown) => ({ id: "export_1" }),
  },
} as any;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await prisma.exportJob.create({
      data: {
        userId: body.userId,
        status: "started",
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "failed" },
      { status: 500 }
    );
  }
}
