const prisma = {
  session: {
    findUnique: async (_input: unknown) => ({
      id: "session_1",
      userId: "user_1",
      password: "plain_password",
      passwordHash: "hash_123",
      accessToken: "access_token_123",
      refreshToken: "refresh_token_123",
      sessionSecret: "session_secret_123",
    }),
  },
} as any;

export async function GET() {
  const session = await prisma.session.findUnique({
    where: { id: "session_1" },
  });

  return Response.json({
    session,
  });
}
