"use server";

const prisma = {
  apiToken: {
    update: async (_args: unknown) => ({
      id: "token_1",
      secret: "qedix-secret",
      tokenHash: "qedix-token-hash",
      apiKey: "qedix-api-key",
    }),
  },
};

const rotateSchema = {
  safeParse(value: unknown) {
    return {
      success: true,
      data: value as {
        tokenId: string;
      },
    };
  },
};

async function requireAuth() {
  return { user: { id: "user_1" } };
}

export async function rotateApiTokenLeakingSensitiveResult(formData: FormData) {
  const session = await requireAuth();
  if (!session.user.id) return { ok: false };

  const parsed = rotateSchema.safeParse({
    tokenId: String(formData.get("tokenId")),
  });

  if (!parsed.success) return { ok: false };

  const token = await prisma.apiToken.update({
    where: {
      id: parsed.data.tokenId,
      userId: session.user.id,
    },
    data: {
      rotatedAt: new Date(),
    },
  });

  return {
    id: token.id,
    secret: token.secret,
    tokenHash: token.tokenHash,
    apiKey: token.apiKey,
  };
}
