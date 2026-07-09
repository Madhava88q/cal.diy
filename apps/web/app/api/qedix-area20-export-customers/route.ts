const prisma = {
  customer: {
    findMany: async (_input: unknown) => [
      { email: "a@example.com", name: "A" },
    ],
  },
} as any;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") ?? "";

  const customers = await prisma.customer.findMany({
    where: { email: { contains: search } },
  });

  const csv = customers
    .map((customer: any) => `${customer.email},${customer.name}`)
    .join("\n");

  return new Response(csv, {
    headers: { "content-type": "text/csv" },
  });
}
