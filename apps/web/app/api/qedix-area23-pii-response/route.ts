const prisma = {
  profile: {
    findUnique: async (_input: unknown) => ({
      id: "profile_1",
      email: "user@example.com",
      phone: "+10000000000",
      address: "1 Internal Street",
      dateOfBirth: "1990-01-01",
    }),
  },
} as any;

export async function GET() {
  const profile = await prisma.profile.findUnique({
    where: { id: "profile_1" },
  });

  return Response.json({
    id: profile.id,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    dateOfBirth: profile.dateOfBirth,
  });
}
