const prisma = {
  wallet: {
    update: async (_input: unknown) => ({ id: "wallet_1" }),
  },
} as any;

export async function POST(request: Request) {
  const body = await request.json();

  await prisma.wallet.update({
    where: { id: body.walletId },
    data: {
      balance: {
        decrement: body.amount,
      },
    },
  });

  return Response.json({ ok: true });
}
