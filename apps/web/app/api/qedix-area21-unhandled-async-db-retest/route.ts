const prisma = {
  maintenanceJob: {
    create: async (_input: unknown) => ({ id: "job_1" }),
  },
} as any;

async function rebuildSearchIndexes() {
  await refreshIndexShard("users");
  await refreshIndexShard("events");

  throw new Error("index rebuild failed");
}

async function refreshIndexShard(_name: string) {
  return { ok: true };
}

export async function POST() {
  await prisma.maintenanceJob.create({
    data: {
      type: "search-index-rebuild",
      status: "started",
    },
  });

  await rebuildSearchIndexes();

  return Response.json({
    ok: true,
  });
}
