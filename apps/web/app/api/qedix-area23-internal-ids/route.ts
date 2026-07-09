const prisma = {
  account: {
    findUnique: async (_input: unknown) => ({
      publicId: "acct_public_123",
      internalId: "acct_internal_456",
      databaseId: 987,
      stripeCustomerId: "cus_123",
      githubInstallationId: 456,
      salesforceAccountId: "sf_789",
    }),
  },
} as any;

export async function GET() {
  const account = await prisma.account.findUnique({
    where: { publicId: "acct_public_123" },
  });

  return Response.json({
    publicId: account.publicId,
    internalId: account.internalId,
    databaseId: account.databaseId,
    stripeCustomerId: account.stripeCustomerId,
    githubInstallationId: account.githubInstallationId,
    salesforceAccountId: account.salesforceAccountId,
  });
}
