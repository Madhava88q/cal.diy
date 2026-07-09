const prisma = {
  user: {
    findUnique: async (_input: unknown) => ({
      id: "user_1",
      name: "Test User",
      role: "admin",
      permissions: ["billing.write", "users.disable"],
      disabled: false,
      internalNotes: "fraud review note",
      riskScore: 91,
      supportFlags: ["manual-review"],
    }),
  },
} as any;

export async function GET() {
  const user = await prisma.user.findUnique({
    where: { id: "user_1" },
  });

  return Response.json({
    id: user.id,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    disabled: user.disabled,
    internalNotes: user.internalNotes,
    riskScore: user.riskScore,
    supportFlags: user.supportFlags,
  });
}
